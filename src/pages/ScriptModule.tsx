import React, { useState } from 'react';
import { callAI } from '../services/aiService';
import { SYSTEM_PROMPT_SCRIPT_WRITER, STYLE_RECOMMENDATION_PROMPT } from '../data/prompts';
import { BUDDHISM_CONTEXTS, VISUAL_STYLES, SECONDS_PER_SCENE, MODE_OPTIONS, VOICE_STYLES } from '../data/constants';
import { showToast } from '../components/Toast';
import { buildScriptPrompt, buildStyleRecommendPrompt } from '../services/promptBuilder';
import { arr } from '../services/safe';
import { safeCallAI } from '../services/safeCall';

interface Props { onScriptGenerated: (segments: any[], style: string) => void; initialTopic?: string; }

export const NARRATIVE_LENSES = [
  { id: 'default', name: '📦 Mặc định theo Truyền thống', desc: 'Dùng bối cảnh nhân vật mặc định của Phật giáo đã chọn.' },
  { id: 'random', name: '🎲 Xoay tua ngẫu nhiên (AI tự chọn)', desc: 'AI tự động đổi mới bối cảnh: lúc bà ngoại, lúc thiền sư, lúc công sở...' },
  { id: 'grandma', name: '👵 Bà ngoại & Chùa làng', desc: 'Trí tuệ mộc mạc, gần gũi từ những lời răn của bà nơi mái chùa quê.' },
  { id: 'modern_worker', name: '💼 Người đi làm & Đời sống hiện đại', desc: 'Chánh niệm giải tỏa stress chốn văn phòng và gánh nặng mưu sinh.' },
  { id: 'zen_master', name: '🧘 Thiền sư & Rừng trúc', desc: 'Sự khai ngộ từ những câu hỏi tu tập nơi thâm sơn cùng cốc tịch mịch.' },
  { id: 'youth', name: '🌱 Bạn trẻ & Áp lực đồng lứa', desc: 'Vượt qua lo âu tuổi trẻ, định vị bản thân và chữa lành tâm hồn.' },
  { id: 'family', name: '👨‍👩‍👧‍👦 Tình thâm & Hiếu đạo', desc: 'Lòng biết ơn, sự bao dung cha mẹ và chuyển hóa nghịch cảnh gia đình.' },
  { id: 'ancient_wisdom', name: '📜 Bậc Hiền Triết & Điển tích xưa', desc: 'Lời vàng dạy của hiền triết cổ nhân và thánh nhân xưa đầy uy nghiêm.' }
];

const ScriptModule: React.FC<Props> = ({ onScriptGenerated, initialTopic = '' }) => {
  const [topic, setTopic] = useState(initialTopic);
  const [contentContext, setContentContext] = useState('');
  const [duration, setDuration] = useState(1);
  const [durationStr, setDurationStr] = useState('1');
  const [market, setMarket] = useState('vn_mahayana');
  const [style, setStyle] = useState('auto');
  const [selectedMode, setSelectedMode] = useState('quick');
  const [voiceOnly, setVoiceOnly] = useState(false);
  const [narrativeLens, setNarrativeLens] = useState('default');

  const handleDurationChange = (valStr: string) => {
    if (valStr === '' || /^[0-9]*\.?[0-9]*$/.test(valStr)) {
      setDurationStr(valStr);
      const parsed = parseFloat(valStr);
      if (!isNaN(parsed) && parsed > 0) {
        setDuration(parsed);
        if (parsed > 5) {
          setVoiceOnly(true);
        }
      } else if (valStr === '') {
        setDuration(0);
      }
    }
  };
  const [voiceStyle, setVoiceStyle] = useState(() => {
    try {
      return localStorage.getItem('dharma_last_voice_style') || 'the_dharma_teacher';
    } catch {
      return 'the_dharma_teacher';
    }
  });
  const [loading, setLoading] = useState(false);
  const [segments, setSegments] = useState<any[]>([]);
  const [styleRec, setStyleRec] = useState<any>(null);
  const [isRecommending, setIsRecommending] = useState(false);
  const [genMode, setGenMode] = useState<'creative' | 'competitor'>('creative');
  const [competitorScript, setCompetitorScript] = useState('');

  React.useEffect(() => { if (initialTopic) setTopic(initialTopic); }, [initialTopic]);

  // Sync duration with mode selection
  const activeMode = MODE_OPTIONS.find(m => m.id === selectedMode) || MODE_OPTIONS[0];
  const scenes = Math.ceil((Math.max(0.1, duration) * 60) / SECONDS_PER_SCENE);
  const words = Math.floor(duration * activeMode.wpm);
  const modeColor = selectedMode === 'quick' ? 'teal' : selectedMode === 'story' ? 'cyan' : selectedMode === 'deep' ? 'violet' : 'amber';

  // AI Style Recommendation
  const handleStyleRecommend = async () => {
    if (!topic) return showToast('Nhập chủ đề trước khi đề xuất style!');
    const mk = BUDDHISM_CONTEXTS[market] || BUDDHISM_CONTEXTS['vn_mahayana'];
    
    const prompt = buildStyleRecommendPrompt({
      topic,
      duration,
      mode: activeMode.name,
      market,
      buddhismContext: mk
    });
    
    const rec = await safeCallAI(() => callAI(prompt, STYLE_RECOMMENDATION_PROMPT), setIsRecommending);
    if (rec) {
      setStyleRec(rec);
      if (rec.primary_style) {
        setStyle(rec.primary_style);
        showToast(`✨ AI đề xuất: ${VISUAL_STYLES.find(s => s.id === rec.primary_style)?.name || rec.primary_style}`, 'success');
      }
      if (rec.primary_voice_style) {
        setVoiceStyle(rec.primary_voice_style);
        showToast(`🎙️ AI đề xuất giọng: ${VOICE_STYLES.find(v => v.id === rec.primary_voice_style)?.name || rec.primary_voice_style}`, 'success');
      }
    }
  };

  const handleGenerate = async () => {
    if (!topic) return showToast('Nhập chủ đề Phật pháp!');
    if (genMode === 'competitor' && !competitorScript.trim()) {
      return showToast('Vui lòng nhập kịch bản của đối thủ!');
    }
    
    const styleObj = VISUAL_STYLES.find(s => s.id === style);
    const voiceObj = VOICE_STYLES.find(v => v.id === voiceStyle);
    const mk = BUDDHISM_CONTEXTS[market] || BUDDHISM_CONTEXTS['vn_mahayana'];
    
    let selectedHumanElement = mk.human_element;
    if (narrativeLens === 'random') {
      selectedHumanElement = 'Hãy tự động chọn ngẫu nhiên một chất liệu nhân văn/nhân vật độc đáo: có thể là câu chuyện bà ngoại chùa làng mộc mạc, người trẻ hiện đại vượt qua áp lực đồng lứa và căng thẳng cuộc sống, vị thiền sư tu tập chốn thanh tịnh sâu lắng rừng trúc, tình cảm mẫu tử/gia đình thiêng liêng hiếu thảo, hoặc châm ngôn điển tích của các bậc hiền triết cổ đức xưa dạy truyền đời... Hãy biến hóa xoay tua linh hoạt để kịch bản không bị lặp lại.';
    } else if (narrativeLens === 'grandma') {
      selectedHumanElement = 'Câu chuyện chùa làng ấm áp, những lời dặn mộc mạc mang đầy trí tuệ nhân sinh của bà ngoại.';
    } else if (narrativeLens === 'modern_worker') {
      selectedHumanElement = 'Người tu tại gia, nhân viên văn phòng bận rộn đối mặt áp lực công sở, cơm áo gạo tiền và cách tìm bình an chánh niệm giữa đời thường.';
    } else if (narrativeLens === 'zen_master') {
      selectedHumanElement = 'Vị thiền sư tu tập chốn thanh tịnh, rừng trúc, tiếng chuông chùa xa xăm, các cuộc đối thoại khai ngộ sâu sắc.';
    } else if (narrativeLens === 'youth') {
      selectedHumanElement = 'Người trẻ hiện đại đối mặt với áp lực đồng lứa (peer pressure), hoang mang tương lai và cách tìm lại điểm tựa tinh thần từ chánh niệm.';
    } else if (narrativeLens === 'family') {
      selectedHumanElement = 'Tình cảm gia đình, lòng biết ơn cha mẹ, sự hiếu thuận và cách chuyển hóa nỗi đau thế hệ bằng tình thương chánh niệm.';
    } else if (narrativeLens === 'ancient_wisdom') {
      selectedHumanElement = 'Bậc cổ đức truyền thừa, điển tích cổ nhân xưa dạy truyền đời đầy uy nghiêm và triết lý sâu sắc.';
    }
    
    const scenesToUse = voiceOnly 
      ? Math.min(10, Math.max(3, Math.ceil(duration / 2))) // 3-10 chapters
      : scenes;

    const prompt = buildScriptPrompt({
      topic,
      contentContext,
      duration,
      market,
      mode: selectedMode,
      voiceStyle,
      visualStyle: style,
      narrativeLens,
      numberOfScenes: scenesToUse,
      competitorScript: genMode === 'competitor' ? competitorScript : undefined,
      buddhismContext: mk
    });
    
    const json = await safeCallAI(() => callAI(prompt, SYSTEM_PROMPT_SCRIPT_WRITER), setLoading);
    if (!json) return;
    
    let segs = json.script || (Array.isArray(json) ? json : []);
    
    let enforce = '';
    const shouldApplyStyle = !voiceOnly || (voiceOnly && duration >= 10);
    if (styleObj && styleObj.id !== 'auto' && shouldApplyStyle) enforce = styleObj.prompt_enforce;
    else if (json.suggested_style && shouldApplyStyle) enforce = `, Visual Style: ${json.suggested_style}`;
    
    if (enforce && shouldApplyStyle) {
      segs = arr(segs).map((s: any) => ({
        ...s,
        video_prompt: s.video_prompt && !s.video_prompt.includes('Visual Style:') ? `${s.video_prompt} ${enforce}` : (s.video_prompt || ''),
        image_prompt: s.image_prompt && !s.image_prompt.includes('Visual Style:') ? `${s.image_prompt} ${enforce}` : (s.image_prompt || ''),
      }));
    }
    setSegments(segs);
    onScriptGenerated(segs, (voiceOnly && duration < 10) ? '' : (json.suggested_style || ''));

    // localStorage sharing — Studio & SEO tabs can read this
    try {
      localStorage.setItem('dharma_last_script', JSON.stringify(segs));
      localStorage.setItem('dharma_last_topic', topic);
      localStorage.setItem('dharma_last_style', style);
      localStorage.setItem('dharma_last_voice_style', voiceStyle);
    } catch { /* quota exceeded — ignore */ }
  };

  const copyAll = () => {
    const text = arr(segments).map(s => s.chapter_voice_block || s.voice_text).join('\n\n');
    navigator.clipboard.writeText(text);
    showToast('✅ Đã copy voice toàn bộ!', 'success');
  };

  const markets = Object.values(BUDDHISM_CONTEXTS);

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-[slideIn_0.4s_ease-out]">
      <div className="cosmic-card p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><i className="fa-solid fa-pen-nib text-amber-400" /> Soạn Kịch Bản Pháp Thoại</h2>
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase mb-1.5 block">Chủ Đề Phật Pháp</label>
            <input value={topic} onChange={e => setTopic(e.target.value)} className="w-full bg-[#060810] border border-white/10 rounded-lg p-3 text-sm text-white outline-none focus:border-teal-500/50 placeholder-white/20 transition-colors" placeholder="VD: Tứ Diệu Đế, Thiền Vipassana, Từ Bi Quán..." />
          </div>

          {/* === NỘI DUNG / BỐI CẢNH === */}
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase mb-1.5 block flex items-center gap-2">
              <i className="fa-solid fa-scroll text-amber-400" /> NỘI DUNG / BỐI CẢNH (TÙY CHỌN)
            </label>
            <textarea
              value={contentContext}
              onChange={e => setContentContext(e.target.value)}
              className="w-full bg-[#060810] border border-white/10 rounded-lg p-3 text-sm text-white outline-none focus:border-amber-500/50 placeholder-white/20 transition-colors min-h-[100px] resize-y leading-relaxed"
              placeholder="Dán nội dung bài viết, trích đoạn kinh điển, câu chuyện, hoặc bối cảnh bạn muốn AI dựa vào để viết kịch bản... AI sẽ dùng nội dung này làm nguồn tư liệu chính."
            />
            <div className="text-[10px] text-slate-600 mt-1 flex items-center gap-1">
              <i className="fa-solid fa-info-circle" /> Nhập nội dung gốc để AI viết kịch bản sát ý hơn. Để trống nếu muốn AI tự sáng tạo.
            </div>
          </div>

          {/* === GENERATION MODE (CREATIVE VS COMPETITOR) === */}
          <div className="bg-[#0a0e1a] border border-white/5 rounded-xl p-4 animate-scale-in">
            <label className="text-xs font-bold text-slate-400 uppercase mb-3 block flex items-center gap-2">
              <i className="fa-solid fa-wand-magic-sparkles text-amber-400" /> ĐỊNH HƯỚNG NỘI DUNG SÁNG TẠO
            </label>
            <div className="grid grid-cols-2 gap-3 mb-1">
              <button 
                type="button"
                onClick={() => setGenMode('creative')}
                className={`p-3 rounded-lg border text-center transition-all font-bold text-[11px] flex items-center justify-center gap-2 ${
                  genMode === 'creative' 
                    ? 'bg-amber-950/30 border-amber-500/50 text-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.15)]' 
                    : 'bg-[#0f1424] border-white/5 text-slate-400 hover:bg-[#111827] hover:text-white'
                }`}
              >
                <i className="fa-solid fa-compass text-[13px]" /> Sáng Tạo Mới
              </button>
              <button 
                type="button"
                onClick={() => setGenMode('competitor')}
                className={`p-3 rounded-lg border text-center transition-all font-bold text-[11px] flex items-center justify-center gap-2 ${
                  genMode === 'competitor' 
                    ? 'bg-violet-950/20 border-violet-500/50 text-violet-300 shadow-[0_0_10px_rgba(139,92,246,0.15)]' 
                    : 'bg-[#0f1424] border-white/5 text-slate-400 hover:bg-[#111827] hover:text-white'
                }`}
              >
                <i className="fa-solid fa-copy text-[13px]" /> Bám Sát Đối Thủ
              </button>
            </div>
            {genMode === 'competitor' && (
              <div className="space-y-1.5 animate-[fadeIn_0.3s_ease-out] mt-3">
                <label className="text-[10px] font-bold text-violet-400 uppercase block">Dán Kịch Bản Gốc / Transcript Đối Thủ</label>
                <textarea 
                  value={competitorScript} 
                  onChange={e => setCompetitorScript(e.target.value)} 
                  className="w-full bg-[#060810] border border-violet-500/20 rounded-lg p-3 text-xs text-white outline-none focus:border-violet-500/50 placeholder-white/20 min-h-[100px] resize-none"
                  placeholder="Dán kịch bản video viral của đối thủ vào đây. AI sẽ bóc tách cấu trúc để tạo ra kịch bản mới cho bạn..."
                />
              </div>
            )}
          </div>

          {/* === MODE SELECTION GRID === */}
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase mb-2 block flex items-center gap-2"><i className="fa-solid fa-sliders text-teal-400" /> CHẾ ĐỘ VIDEO</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {MODE_OPTIONS.map(mode => (
                <button key={mode.id} onClick={() => {
                  setSelectedMode(mode.id);
                  if (mode.id === 'quick') {
                    setDuration(1);
                    setDurationStr('1');
                    setVoiceOnly(false);
                  } else if (mode.id === 'story') {
                    setDuration(2);
                    setDurationStr('2');
                    setVoiceOnly(false);
                  } else if (mode.id === 'deep') {
                    setDuration(5);
                    setDurationStr('5');
                    setVoiceOnly(false);
                  } else if (mode.id === 'long_voice') {
                    setDuration(15);
                    setDurationStr('15');
                    setVoiceOnly(true);
                  }
                }}
                  className={`p-4 rounded-xl border text-left transition-all group ${
                    selectedMode === mode.id
                      ? `bg-${mode.color}-900/20 border-${mode.color}-500/50 text-${mode.color}-300 shadow-[0_0_15px_rgba(13,148,136,0.1)]`
                      : 'bg-[#0a0e1a] border-white/5 text-slate-400 hover:bg-[#111827] hover:text-white hover:border-white/10'
                  }`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">{mode.icon}</span>
                    <span className="font-bold text-sm">{mode.name}</span>
                  </div>
                  <div className="text-[10px] opacity-70 leading-relaxed">{mode.desc}</div>
                  <div className="text-[10px] opacity-50 mt-1">~{mode.scenes} cảnh</div>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#0a0e1a] border border-white/5 rounded-xl p-4 relative overflow-hidden flex flex-col justify-between min-h-[140px]">
              <div className={`absolute top-0 left-0 w-1 h-full bg-${modeColor}-500/50`} />
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase mb-3 block flex items-center gap-2">
                  <i className="fa-solid fa-clock text-teal-400" /> THỜI LƯỢNG (PHÚT)
                </label>
                <div className="flex items-center gap-5 mb-3">
                  <input 
                    type="text" 
                    inputMode="decimal"
                    value={durationStr} 
                    onChange={e => handleDurationChange(e.target.value)} 
                    className="w-20 bg-[#060810] border border-white/10 rounded-lg p-3 text-2xl font-black text-white text-center outline-none focus:border-teal-500/50" 
                  />
                  <div className="flex flex-col gap-1.5 text-xs">
                    <div>
                      <span className="text-slate-500">{voiceOnly ? "Số chương/phần:" : "Số cảnh:"}</span>{' '}
                      <span className="font-bold text-teal-400 text-base">
                        ~{voiceOnly ? Math.min(10, Math.max(3, Math.ceil(duration / 2))) : scenes}
                      </span>
                    </div>
                    <div><span className="text-slate-500">Lời thoại:</span> <span className="font-bold text-violet-400 text-base">~{words} từ</span></div>
                  </div>
                </div>
              </div>
              <div className="pt-2.5 border-t border-white/5 flex items-center gap-2.5">
                <input 
                  type="checkbox" 
                  id="voiceOnlyToggle" 
                  checked={voiceOnly} 
                  onChange={e => setVoiceOnly(e.target.checked)} 
                  className="w-4 h-4 rounded border-white/10 bg-[#060810] text-teal-500 focus:ring-0 cursor-pointer"
                />
                <label htmlFor="voiceOnlyToggle" className="text-[11px] font-bold text-slate-300 cursor-pointer select-none flex items-center gap-1.5">
                  <i className="fa-solid fa-microphone text-amber-400 text-xs animate-pulse" />
                  Chỉ tạo lời thoại (Không kèm prompt hình ảnh/video)
                </label>
              </div>
            </div>
            
            <div className="bg-[#0a0e1a] border border-white/5 rounded-xl p-4 flex flex-col justify-between min-h-[140px]">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase mb-2 block flex items-center gap-2"><i className="fa-solid fa-globe text-orange-400" /> TRUYỀN THỐNG PHẬT GIÁO</label>
                <select value={market} onChange={e => setMarket(e.target.value)} className="w-full bg-[#060810] border border-white/10 rounded-lg p-3 text-sm text-white outline-none cursor-pointer focus:border-orange-500/50">
                  {markets.map(m => <option key={m.id} value={m.id}>{m.flag} {m.name}</option>)}
                </select>
              </div>
              <div className="text-[10px] text-slate-600 mt-2 leading-relaxed italic">
                💡 {BUDDHISM_CONTEXTS[market]?.tradition || 'Truyền thống Phật giáo'}
              </div>
            </div>

            <div className="bg-[#0a0e1a] border border-white/5 rounded-xl p-4 flex flex-col justify-between min-h-[140px]">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase mb-2 block flex items-center gap-2">
                  <i className="fa-solid fa-people-group text-amber-400" /> CHẤT LIỆU KỂ CHUYỆN
                </label>
                <select 
                  value={narrativeLens} 
                  onChange={e => setNarrativeLens(e.target.value)} 
                  className="w-full bg-[#060810] border border-white/10 rounded-lg p-3 text-sm text-white outline-none cursor-pointer focus:border-amber-500/50"
                >
                  {NARRATIVE_LENSES.map(l => (
                    <option key={l.id} value={l.id}>{l.name}</option>
                  ))}
                </select>
              </div>
              <div className="text-[10px] text-slate-500 mt-2 leading-relaxed italic">
                💡 {NARRATIVE_LENSES.find(l => l.id === narrativeLens)?.desc}
              </div>
            </div>
          </div>

          {/* === VISUAL STYLE + AI RECOMMEND === */}
          <div className={`bg-[#0a0e1a] border border-white/5 rounded-xl p-4 transition-all duration-300 ${voiceOnly ? 'opacity-40 pointer-events-none select-none relative' : ''}`}>
            {voiceOnly && (
              <div className="absolute inset-0 bg-[#060810]/40 rounded-xl flex items-center justify-center z-10">
                <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-[0_0_15px_rgba(245,158,11,0.1)]">
                  <i className="fa-solid fa-shield-halved animate-pulse" /> Phong cách Visual được bỏ qua ở chế độ Lời Thoại
                </span>
              </div>
            )}
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-slate-400 uppercase flex items-center gap-2"><i className="fa-solid fa-palette text-violet-400" /> PHONG CÁCH VISUAL</label>
              <button onClick={handleStyleRecommend} disabled={isRecommending || voiceOnly}
                className="px-3 py-1.5 rounded-lg text-[11px] font-bold flex items-center gap-1.5 bg-gradient-to-r from-amber-900/30 to-teal-900/30 text-amber-300 border border-amber-500/20 hover:border-amber-500/40 transition-all disabled:opacity-50 hover:shadow-[0_0_15px_rgba(212,165,116,0.15)]">
                {isRecommending ? <><i className="fa-solid fa-sync animate-spin" /> Đang phân tích...</> : <><i className="fa-solid fa-wand-magic-sparkles" /> 🪄 AI Đề Xuất Style</>}
              </button>
            </div>

            {/* AI Recommendation Result */}
            {styleRec && (
              <div className="mb-3 p-3 rounded-lg bg-gradient-to-r from-amber-900/10 to-teal-900/10 border border-amber-500/15 animate-[slideIn_0.3s_ease-out]">
                <div className="flex items-start gap-2 mb-2">
                  <i className="fa-solid fa-lightbulb text-amber-400 mt-0.5" />
                  <div className="flex-1">
                    <div className="text-[11px] font-bold text-amber-300 mb-0.5">AI ĐỀ XUẤT VISUAL: {VISUAL_STYLES.find(s => s.id === styleRec.primary_style)?.name || styleRec.primary_style}</div>
                    <div className="text-[10px] text-slate-400">{styleRec.primary_reason}</div>
                  </div>
                </div>
                {styleRec.primary_voice_style && (
                  <div className="flex items-start gap-2 mb-2 pt-2 border-t border-white/5">
                    <i className="fa-solid fa-microphone-lines text-violet-400 mt-0.5" />
                    <div className="flex-1">
                      <div className="text-[11px] font-bold text-violet-300 mb-0.5">AI ĐỀ XUẤT GIỌNG ĐỌC: {VOICE_STYLES.find(v => v.id === styleRec.primary_voice_style)?.name || styleRec.primary_voice_style}</div>
                      <div className="text-[10px] text-slate-400">{styleRec.primary_voice_reason}</div>
                    </div>
                  </div>
                )}
                {styleRec.alternative_style && (
                  <div className="flex items-start gap-2 pt-2 border-t border-white/5">
                    <i className="fa-solid fa-shuffle text-teal-400 mt-0.5 text-[10px]" />
                    <div className="flex-1">
                      <div className="text-[10px] text-teal-300">Thay thế: {VISUAL_STYLES.find(s => s.id === styleRec.alternative_style)?.name || styleRec.alternative_style}</div>
                      <div className="text-[9px] text-slate-500">{styleRec.alternative_reason}</div>
                    </div>
                    <button onClick={() => { setStyle(styleRec.alternative_style); showToast('✅ Đã đổi style!', 'success'); }}
                      className="text-[9px] px-2 py-1 rounded bg-teal-900/30 text-teal-300 border border-teal-500/20 hover:bg-teal-900/50 shrink-0">Dùng style này</button>
                  </div>
                )}
                {Array.isArray(styleRec.mood_keywords) && styleRec.mood_keywords.length > 0 && (
                  <div className="flex gap-1.5 mt-2 flex-wrap">
                    {styleRec.mood_keywords.map((kw: string, i: number) => (
                      <span key={i} className="bg-[#060810] text-[9px] text-slate-400 px-2 py-0.5 rounded-full border border-white/5">{kw}</span>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {VISUAL_STYLES.map(s => (
                <button key={s.id} onClick={() => setStyle(s.id)}
                  className={`text-[10px] p-2 rounded border text-left transition-all ${style === s.id ? 'bg-teal-900/30 border-teal-500/50 text-white shadow-[0_0_10px_rgba(13,148,136,0.2)]' : 'bg-[#0f1424] border-white/5 text-slate-400 hover:bg-[#111827] hover:text-white'}`}>
                  <div className="font-bold mb-0.5">{s.name}</div>
                  <div className="text-[9px] opacity-70 truncate">{s.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* === VOICE STYLE === */}
          <div className="bg-[#0a0e1a] border border-white/5 rounded-xl p-4 animate-scale-in">
            <label className="text-xs font-bold text-slate-400 uppercase mb-2 block flex items-center gap-2">
              <i className="fa-solid fa-microphone-lines text-violet-400" /> GIỌNG ĐỌC & TONE DIỄN TẢ (VOICE STYLE)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {VOICE_STYLES.map(v => (
                <button key={v.id} onClick={() => setVoiceStyle(v.id)}
                  className={`text-[10px] p-2.5 rounded border text-left transition-all relative ${voiceStyle === v.id ? 'bg-violet-900/20 border-violet-500/50 text-white shadow-[0_0_10px_rgba(139,92,246,0.15)] animate-glow-pulse' : 'bg-[#0f1424] border-white/5 text-slate-400 hover:bg-[#111827] hover:text-white'}`}>
                  <div className="font-bold mb-0.5 flex items-center gap-1.5">
                    <span>{v.name}</span>
                    {voiceStyle === v.id && <span className="absolute top-1 right-1 text-[8px] bg-violet-600 text-violet-100 px-1 rounded-sm scale-90">Selected</span>}
                  </div>
                  <div className="text-[9px] opacity-70 leading-normal">{v.desc}</div>
                </button>
              ))}
            </div>
          </div>
          <button onClick={handleGenerate} disabled={loading}
            className="w-full py-4 btn-sacred font-bold rounded-xl flex items-center justify-center gap-2 disabled:opacity-50">
            {loading ? <><i className="fa-solid fa-sync animate-spin" /> ĐANG VIẾT...</> : <><i className="fa-solid fa-om" /> VIẾT KỊCH BẢN PHÁP THOẠI</>}
          </button>
        </div>
      </div>
      {arr(segments).length > 0 && (
        <div className="space-y-4 pb-10">
          <div className="flex justify-between items-center px-2">
            <div className="text-xs text-slate-500 font-bold">Đã tạo: {arr(segments).length} phân đoạn</div>
            <button onClick={copyAll} className="text-xs font-bold px-3 py-1.5 rounded flex items-center gap-2 bg-white text-black hover:bg-slate-200"><i className="fa-solid fa-copy" /> Copy Lời Thoại</button>
          </div>
          {arr(segments).map((seg, idx) => {
            const isVoiceOnlySeg = !seg.visual_desc_vi && !seg.visual_desc && !seg.video_prompt;
            return (
              <div key={idx} className="cosmic-card p-4 rounded-xl flex flex-col sm:flex-row gap-4 hover:!border-teal-500/20 transition-colors relative">
                <div className="w-full sm:w-24 shrink-0 text-center pt-1 border-r border-white/5 pr-2">
                  <div className="text-[10px] bg-[#0a0e1a] px-2 py-1 rounded font-bold text-white mb-1">
                    {isVoiceOnlySeg ? `PHẦN ${seg.scene_number || idx + 1}` : `CẢNH ${seg.scene_number || idx + 1}`}
                  </div>
                  <div className="text-[9px] text-slate-500 font-mono mb-1">{seg.time}</div>
                  <div className="text-[9px] text-amber-400 font-bold uppercase break-words">{seg.section}</div>
                </div>
                <div className="flex-1">
                  {isVoiceOnlySeg ? (
                    <div className="bg-[#0a0e1a]/50 p-4 rounded border border-white/5 h-full flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <div className="text-[10px] text-violet-400 font-bold flex items-center gap-1.5">
                            <i className="fa-solid fa-microphone-lines text-xs animate-pulse text-violet-400" /> LỜI THOẠI PHÁP THOẠI
                          </div>
                          <button onClick={() => { navigator.clipboard.writeText(seg.voice_text || ''); showToast('✅ Đã copy thoại phân đoạn!', 'success'); }} className="text-slate-500 hover:text-white transition-colors">
                            <i className="fa-regular fa-copy" />
                          </button>
                        </div>
                        <p className="text-sm text-indigo-100 font-medium italic leading-relaxed text-justify whitespace-pre-line">
                          "{seg.chapter_voice_block || seg.voice_text || '(Trống)'}"
                        </p>
                      </div>
                      {seg.strategy_note && (
                        <div className="mt-3 p-2 rounded bg-amber-900/10 border border-amber-500/10 text-[10px] text-amber-200/80 italic flex items-start gap-1.5">
                          <span>💡</span> <span>{seg.strategy_note}</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-[#0a0e1a]/50 p-3 rounded border border-white/5">
                        <div className="text-[10px] text-cyan-400 font-bold flex items-center gap-1 mb-1"><i className="fa-solid fa-eye" /> HÌNH ẢNH</div>
                        <p className="text-xs text-slate-300 mb-2">{seg.visual_desc_vi || seg.visual_desc || ''}</p>
                        {seg.strategy_note && <div className="mt-2 p-2 rounded bg-amber-900/10 border border-amber-500/20 text-[10px] text-amber-200/80 italic">💡 {seg.strategy_note}</div>}
                      </div>
                      <div className="bg-[#0a0e1a]/50 p-3 rounded border border-white/5">
                        <div className="flex justify-between items-center mb-1">
                          <div className="text-[10px] text-violet-400 font-bold flex items-center gap-1"><i className="fa-solid fa-microphone-alt" /> LỜI THOẠI</div>
                          <button onClick={() => { navigator.clipboard.writeText(seg.voice_text || ''); showToast('✅ Đã copy!', 'success'); }} className="text-slate-500 hover:text-white"><i className="fa-regular fa-copy" /></button>
                        </div>
                        <p className="text-sm text-indigo-100 font-medium italic leading-relaxed text-justify">"{seg.chapter_voice_block || seg.voice_text || '(Đọc tiếp...)'}"</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ScriptModule;