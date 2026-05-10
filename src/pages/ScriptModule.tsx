import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LoaderIcon, ChevronDownIcon } from '../components/Icons';
import { callGemini } from '../services/geminiService';
import { PROMPT_SCRIPT_WRITER } from '../data/prompts';
import { CONTEXT_LIST } from '../data/buddhismContexts';
import { VISUAL_STYLES } from '../data/visualStyles';
import { showToast } from '../components/Toast';

interface ScriptModuleProps {
  onScriptGenerated: (script: any) => void;
}

const ease = [0.22, 1, 0.36, 1] as const;

const ScriptModule: React.FC<ScriptModuleProps> = ({ onScriptGenerated }) => {
  const [topic, setTopic] = useState('');
  const [duration, setDuration] = useState(1);
  const [selectedContext, setSelectedContext] = useState(CONTEXT_LIST[0]);
  const [selectedStyle, setSelectedStyle] = useState(VISUAL_STYLES[0]);
  const [contextOpen, setContextOpen] = useState(false);
  const [styleOpen, setStyleOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const estimatedScenes = Math.ceil(duration * 60 / 8);
  const estimatedWords = Math.ceil(duration * 130);

  const handleGenerate = async () => {
    if (!topic.trim()) { showToast('Vui lòng nhập chủ đề Phật pháp.', 'error'); return; }
    setLoading(true); setResult(null);
    try {
      const prompt = PROMPT_SCRIPT_WRITER(topic, duration, selectedContext, selectedStyle, '');
      const data = await callGemini(prompt);
      setResult(data);
      if (data) onScriptGenerated(data);
    } catch (e: any) {
      showToast(e.message || 'Lỗi khi tạo kịch bản.', 'error');
    } finally { setLoading(false); }
  };

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast('Đã sao chép!', 'success');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-5 animate-slide-in">
      <div className="dharma-card p-6">
        <h2 className="text-lg font-extrabold text-[#ECE6D8] mb-5 flex items-center gap-2.5 font-display">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-400 flex items-center justify-center shadow-[0_0_16px_rgba(245,158,11,0.15)]">
            <i className="fa-solid fa-pen-fancy text-white text-sm"></i>
          </div>
          Quy Trình Sáng Tạo Kịch Bản Pháp Thoại
        </h2>
        <div className="space-y-4 mb-5">
          <div>
            <label className="text-[10px] font-bold text-[#D4A574]/50 uppercase tracking-wider mb-1.5 block">
              <i className="fa-solid fa-feather mr-1"></i> CHỦ ĐỀ PHẬT PHÁP
            </label>
            <input value={topic} onChange={e => setTopic(e.target.value)}
              placeholder="VD: Tứ Diệu Đế, Thiền Vipassana, Từ Bi Quán..."
              className="w-full !bg-white/[0.03] !border-white/[0.06] rounded-xl p-3 text-sm text-[#ECE6D8] outline-none focus:!border-[#D4A574]/30 placeholder:text-[#ECE6D8]/20" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="dharma-card-inner p-4 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-400 to-blue-500 rounded-full"></div>
              <label className="text-xs font-bold text-[#ECE6D8]/40 uppercase mb-3 flex items-center gap-2">
                <i className="fa-solid fa-clock text-blue-400/60"></i> THỜI LƯỢNG (PHÚT)
              </label>
              <div className="flex items-center gap-5">
                <input type="number" value={duration} onChange={e => setDuration(parseFloat(e.target.value) || 1)}
                  step="0.5" min="0.5" max="240"
                  className="w-20 !bg-white/[0.04] !border-white/[0.06] rounded-lg p-3 text-2xl font-black text-[#ECE6D8] text-center outline-none focus:!border-blue-400/30" />
                <div className="flex flex-col gap-1.5 text-xs">
                  <div><span className="text-[#ECE6D8]/25">Cảnh:</span> <span className="font-bold text-green-400 text-base">~{estimatedScenes}</span></div>
                  <div><span className="text-[#ECE6D8]/25">Voice:</span> <span className="font-bold text-purple-400 text-base">~{estimatedWords} từ</span></div>
                </div>
              </div>
            </div>
            <div className="dharma-card-inner p-4">
              <label className="text-xs font-bold text-[#ECE6D8]/40 uppercase mb-2 flex items-center gap-2">
                <i className="fa-solid fa-globe text-orange-400/60"></i> TRUYỀN THỐNG
              </label>
              <button onClick={() => setContextOpen(!contextOpen)}
                className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl p-3 text-left text-sm text-[#ECE6D8]/70 flex items-center justify-between hover:border-[#D4A574]/15 transition-all duration-300">
                <span>{selectedContext.flag} {selectedContext.name.split('(')[0].trim()}</span>
                <ChevronDownIcon className={`w-4 h-4 text-[#D4A574]/40 transition-transform duration-300 ${contextOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {contextOpen && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease }}
                    className="border-t border-white/[0.04] mt-2 max-h-48 overflow-y-auto rounded-xl bg-[#0a0e1a]/80 backdrop-blur-xl">
                    {CONTEXT_LIST.map(ctx => (
                      <button key={ctx.id} onClick={() => { setSelectedContext(ctx); setContextOpen(false); }}
                        className={`w-full text-left p-3 text-xs border-b border-white/[0.03] hover:bg-white/[0.04] transition-colors ${selectedContext.id === ctx.id ? 'text-[#D4A574] bg-[#D4A574]/[0.04] font-bold' : 'text-[#ECE6D8]/50'}`}>
                        <span className="mr-2">{ctx.flag}</span>{ctx.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <div className="dharma-card-inner p-4">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-bold text-[#ECE6D8]/40 uppercase flex items-center gap-2">
                <i className="fa-solid fa-palette text-pink-400/60"></i> PHONG CÁCH VISUAL
              </label>
              <button onClick={() => setStyleOpen(!styleOpen)}
                className="text-[10px] text-[#D4A574]/50 hover:text-[#D4A574]/80 font-bold transition-colors">
                {styleOpen ? 'Thu gọn ▲' : `Xem tất cả (${VISUAL_STYLES.length}) ▼`}
              </button>
            </div>
            <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 ${!styleOpen ? 'max-h-[180px] overflow-hidden' : ''}`}>
              {VISUAL_STYLES.map(style => (
                <button key={style.id} onClick={() => setSelectedStyle(style)}
                  className={`text-left p-3 rounded-xl border transition-all duration-300 text-xs ${
                    selectedStyle.id === style.id
                      ? 'bg-pink-500/[0.06] border-pink-500/20 text-pink-300/80'
                      : 'bg-white/[0.02] border-white/[0.04] text-[#ECE6D8]/35 hover:border-pink-500/10'
                  }`}>
                  <div className="font-bold mb-0.5 text-[11px] leading-tight">{style.name}</div>
                  <div className="opacity-50 text-[9px] leading-tight line-clamp-2">{style.desc}</div>
                </button>
              ))}
            </div>
          </div>
          <button onClick={handleGenerate} disabled={loading}
            className="w-full py-4 dharma-btn-primary rounded-xl flex items-center justify-center gap-3 text-base disabled:opacity-40">
            {loading ? <LoaderIcon className="w-5 h-5 animate-spin" /> : <i className="fa-solid fa-om text-lg"></i>}
            {loading ? 'Đang viết kịch bản...' : 'VIẾT KỊCH BẢN PHÁP THOẠI'}
          </button>
        </div>
      </div>

      {result && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ ease }} className="space-y-4 pb-10">
          <div className="dharma-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#ECE6D8]/80 font-bold text-sm flex items-center gap-2">
                <i className="fa-solid fa-scroll text-[#D4A574]/60"></i> Kịch Bản: {result.mode_detected || topic}
              </h3>
              <button onClick={() => copyText(JSON.stringify(result.script, null, 2))}
                className="px-3 py-1.5 bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.06] rounded-lg text-xs text-[#ECE6D8]/50 flex items-center gap-1.5 transition-all font-bold hover:text-[#D4A574]/70">
                <i className="fa-solid fa-copy"></i> Copy All
              </button>
            </div>
            <div className="space-y-3">
              {result.script?.map((scene: any, i: number) => (
                <div key={i} className="dharma-card-inner p-4">
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className="dharma-tag bg-[#D4A574]/10 text-[#D4A574]/70">Cảnh {scene.scene_number}</span>
                    <span className="text-[#ECE6D8]/20 text-xs">{scene.time}</span>
                    <span className="dharma-tag bg-purple-500/10 text-purple-400/70">{scene.section}</span>
                  </div>
                  <div className="space-y-2.5">
                    {scene.voice_text && (
                      <div className="bg-blue-500/[0.04] border border-blue-500/10 rounded-xl p-3">
                        <div className="text-[10px] text-blue-400/60 font-bold uppercase mb-1 flex items-center gap-1"><i className="fa-solid fa-microphone"></i> Voice</div>
                        <p className="text-blue-200/60 text-sm italic leading-relaxed">"{scene.voice_text}"</p>
                      </div>
                    )}
                    {scene.video_prompt && (
                      <div className="bg-green-500/[0.04] border border-green-500/10 rounded-xl p-3">
                        <div className="flex items-center justify-between mb-1">
                          <div className="text-[10px] text-green-400/60 font-bold uppercase flex items-center gap-1"><i className="fa-solid fa-video"></i> Video Prompt</div>
                          <button onClick={() => copyText(scene.video_prompt)} className="text-green-400/30 hover:text-green-400/60 text-xs transition-colors"><i className="fa-solid fa-copy"></i></button>
                        </div>
                        <p className="text-green-200/40 text-xs leading-relaxed">{scene.video_prompt}</p>
                      </div>
                    )}
                    {scene.image_prompt && (
                      <div className="bg-purple-500/[0.04] border border-purple-500/10 rounded-xl p-3">
                        <div className="flex items-center justify-between mb-1">
                          <div className="text-[10px] text-purple-400/60 font-bold uppercase flex items-center gap-1"><i className="fa-solid fa-image"></i> Image Prompt</div>
                          <button onClick={() => copyText(scene.image_prompt)} className="text-purple-400/30 hover:text-purple-400/60 text-xs transition-colors"><i className="fa-solid fa-copy"></i></button>
                        </div>
                        <p className="text-purple-200/40 text-xs leading-relaxed">{scene.image_prompt}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ScriptModule;