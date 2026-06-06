import React, { useState } from 'react';
import { callAI } from '../services/aiService';
import { SYSTEM_PROMPT_SEO_MASTER } from '../data/prompts';
import { BUDDHISM_CONTEXTS, SEO_CHECKLIST_DATA } from '../data/constants';
import { showToast } from '../components/Toast';
import { buildSeoPrompt } from '../services/promptBuilder';
import { arr } from '../services/safe';
import { safeCallAI } from '../services/safeCall';

interface Props { initialTopic?: string; }

type Platform = 'YouTube Shorts' | 'TikTok' | 'YouTube Long-form' | 'Facebook Reels' | 'Instagram Reels';

const HOOK_ICONS: Record<string, string> = {
  Curiosity: '🔍', Emotion: '💛', Value: '📊', Question: '❓', Authority: '📿',
};

const PRIORITY_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  'Chính': { bg: 'bg-amber-900/20', border: 'border-amber-500/30', text: 'text-amber-300' },
  'Phụ': { bg: 'bg-teal-900/20', border: 'border-teal-500/30', text: 'text-teal-300' },
  'Long-tail': { bg: 'bg-indigo-900/20', border: 'border-indigo-500/30', text: 'text-indigo-300' },
};

const VOLUME_BADGE: Record<string, string> = {
  'Cao': 'text-green-400', 'Trung bình': 'text-yellow-400', 'Thấp': 'text-slate-500',
};

const SeoModule: React.FC<Props> = ({ initialTopic = '' }) => {
  const effectiveTopic = React.useMemo(() => {
    if (initialTopic) return initialTopic;
    try { return localStorage.getItem('dharma_last_topic') || ''; }
    catch { return ''; }
  }, [initialTopic]);

  const defaultMarket = React.useMemo(() => {
    try { return localStorage.getItem('dharma_last_market') || 'vn_mahayana'; }
    catch { return 'vn_mahayana'; }
  }, []);

  const [topic, setTopic] = useState(effectiveTopic);
  const [platform, setPlatform] = useState<Platform>('YouTube Shorts');
  const [market, setMarket] = useState(defaultMarket);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [checks, setChecks] = useState<Record<string, boolean>>({});

  React.useEffect(() => { if (initialTopic) setTopic(initialTopic); }, [initialTopic]);
  React.useEffect(() => { if (effectiveTopic && !topic) setTopic(effectiveTopic); }, [effectiveTopic]);

  const copy = (t: string) => { navigator.clipboard.writeText(t); showToast('✅ Đã copy!', 'success'); };
  const toggle = (id: string) => setChecks(p => ({ ...p, [id]: !p[id] }));

  const stars = (n: number) => '⭐'.repeat(Math.min(n, 5));

  const handleGenerate = async () => {
    if (!topic) return showToast('Nhập chủ đề SEO!');
    const mk = BUDDHISM_CONTEXTS[market] || BUDDHISM_CONTEXTS['vn_mahayana'];
    try { localStorage.setItem('dharma_last_market', market); } catch { /* ignore */ }

    const prompt = buildSeoPrompt({
      topic,
      platform,
      buddhismContext: mk,
    });

    const res = await safeCallAI(() => callAI(prompt, SYSTEM_PROMPT_SEO_MASTER), setLoading);
    if (res) setResult(res);
  };

  // ─── Render helpers ────────────────────────────────────
  const renderTitleOptions = () => {
    if (!result?.title_options || arr(result.title_options).length === 0) return null;
    return (
      <div className="bg-amber-900/10 border border-amber-500/20 rounded-xl p-4 animate-fade-in">
        <h4 className="text-xs font-bold text-amber-400 mb-3 uppercase flex items-center gap-2">
          <i className="fa-solid fa-heading" /> 1. TIÊU ĐỀ VIDEO (5 BIẾN THỂ)
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-slate-500 border-b border-white/5">
                <th className="text-left py-2 pr-2">#</th>
                <th className="text-left py-2 pr-2">Tiêu Đề</th>
                <th className="text-center py-2 pr-2">Ký Tự</th>
                <th className="text-center py-2 pr-2">Hook</th>
                <th className="text-center py-2 pr-2">SEO</th>
                <th className="text-center py-2"></th>
              </tr>
            </thead>
            <tbody>
              {arr(result.title_options).map((opt: any, i: number) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                  <td className="py-2 pr-2 text-slate-500 font-mono">{i + 1}</td>
                  <td className="py-2 pr-2 text-white font-medium max-w-[300px]">{opt.title}</td>
                  <td className="py-2 pr-2 text-center">
                    <span className={`font-mono ${(opt.char_count || opt.title?.length || 0) <= 60 ? 'text-green-400' : 'text-red-400'}`}>
                      {opt.char_count || opt.title?.length || '?'}
                    </span>
                  </td>
                  <td className="py-2 pr-2 text-center">
                    <span className="bg-white/5 px-2 py-0.5 rounded-full text-[10px]">
                      {HOOK_ICONS[opt.hook_type] || '🔹'} {opt.hook_type}
                    </span>
                  </td>
                  <td className="py-2 pr-2 text-center text-[10px]">{stars(opt.seo_score)}</td>
                  <td className="py-2 text-center">
                    <button onClick={() => copy(opt.title)} className="text-slate-600 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <i className="fa-solid fa-copy" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderDescription = () => {
    if (!result?.video_description?.full_description) return null;
    return (
      <div className="bg-green-900/10 border border-green-500/20 rounded-xl p-4 animate-fade-in">
        <h4 className="text-xs font-bold text-green-400 mb-3 uppercase flex items-center gap-2">
          <i className="fa-solid fa-file-lines" /> 2. MÔ TẢ VIDEO (SEO-OPTIMIZED)
        </h4>
        {result.video_description.hook && (
          <div className="bg-green-900/20 p-3 rounded-lg border border-green-500/20 mb-3">
            <div className="text-[10px] text-green-500 font-bold mb-1">HOOK (HIỂN THỊ TRƯỚC "XEM THÊM")</div>
            <p className="text-sm text-white font-medium leading-relaxed">{result.video_description.hook}</p>
          </div>
        )}
        <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line mb-3">{result.video_description.full_description}</p>
        <button onClick={() => copy(`${result.video_description.hook}\n\n${result.video_description.full_description}`)} className="text-xs text-green-400 hover:underline flex items-center gap-1">
          <i className="fa-solid fa-copy" /> Copy Toàn Bộ Mô Tả
        </button>
      </div>
    );
  };

  const renderTags30 = () => {
    if (!result?.tags_30 || arr(result.tags_30).length === 0) return null;
    const grouped: Record<string, any[]> = { 'Chính': [], 'Phụ': [], 'Long-tail': [] };
    arr(result.tags_30).forEach((t: any) => {
      const p = t.priority || 'Long-tail';
      if (!grouped[p]) grouped[p] = [];
      grouped[p].push(t);
    });
    return (
      <div className="bg-blue-900/10 border border-blue-500/20 rounded-xl p-4 animate-fade-in">
        <h4 className="text-xs font-bold text-blue-400 mb-3 uppercase flex items-center gap-2">
          <i className="fa-solid fa-tags" /> 3. TAGS ({arr(result.tags_30).length} TAGS)
        </h4>
        <div className="space-y-3">
          {Object.entries(grouped).map(([priority, tags]) => tags.length > 0 && (
            <div key={priority}>
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${PRIORITY_COLORS[priority]?.bg || 'bg-white/5'} ${PRIORITY_COLORS[priority]?.border || 'border-white/10'} ${PRIORITY_COLORS[priority]?.text || 'text-slate-400'} border`}>
                  {priority} ({tags.length})
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {tags.map((t: any, i: number) => (
                  <button key={i} onClick={() => copy(t.tag)} className={`group relative px-2.5 py-1 rounded-lg text-[11px] border transition-all hover:scale-105 ${PRIORITY_COLORS[priority]?.bg || 'bg-white/5'} ${PRIORITY_COLORS[priority]?.border || 'border-white/10'} ${PRIORITY_COLORS[priority]?.text || 'text-slate-300'}`}>
                    {t.tag}
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black/90 text-[9px] text-white px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                      <span className={VOLUME_BADGE[t.search_volume] || 'text-slate-400'}>●</span> {t.search_volume} | Cạnh tranh: {t.competition}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button onClick={() => copy(arr(result.tags_30).map((t: any) => t.tag).join(', '))} className="mt-3 text-xs text-blue-400 hover:underline flex items-center gap-1">
          <i className="fa-solid fa-copy" /> Copy Tất Cả Tags
        </button>
      </div>
    );
  };

  const renderHashtags = () => {
    const hs = result?.hashtag_set;
    if (!hs) return null;
    const categories = [
      { key: 'broad', label: 'Broad', icon: '🌐', color: 'text-slate-300' },
      { key: 'niche', label: 'Niche', icon: '🙏', color: 'text-purple-300' },
      { key: 'topic_specific', label: 'Topic', icon: '🎯', color: 'text-orange-300' },
      { key: 'branded', label: 'Brand', icon: '✨', color: 'text-amber-300' },
    ];
    const allHashtags = [...arr(hs.broad), ...arr(hs.niche), ...arr(hs.topic_specific), ...arr(hs.branded)];
    return (
      <div className="bg-purple-900/10 border border-purple-500/20 rounded-xl p-4 animate-fade-in">
        <h4 className="text-xs font-bold text-purple-400 mb-3 uppercase flex items-center gap-2">
          <i className="fa-solid fa-hashtag" /> 4. HASHTAGS ({allHashtags.length})
        </h4>
        <div className="space-y-2">
          {categories.map(cat => {
            const tags = hs[cat.key];
            if (!Array.isArray(tags) || tags.length === 0) return null;
            return (
              <div key={cat.key} className="flex items-start gap-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase w-14 shrink-0 pt-1">{cat.icon} {cat.label}</span>
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((h: string, i: number) => (
                    <button key={i} onClick={() => copy(h)} className={`bg-purple-900/20 ${cat.color} px-3 py-1 rounded-lg text-sm border border-purple-500/20 hover:bg-purple-900/40 transition-colors`}>
                      {h}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <button onClick={() => copy(allHashtags.join(' '))} className="mt-3 text-xs text-purple-400 hover:underline flex items-center gap-1">
          <i className="fa-solid fa-copy" /> Copy Tất Cả Hashtags
        </button>
      </div>
    );
  };

  const renderPostingSchedule = () => {
    if (!result?.posting_schedule || arr(result.posting_schedule).length === 0) return null;
    return (
      <div className="bg-cyan-900/10 border border-cyan-500/20 rounded-xl p-4 animate-fade-in">
        <h4 className="text-xs font-bold text-cyan-400 mb-3 uppercase flex items-center gap-2">
          <i className="fa-solid fa-clock" /> 5. THỜI ĐIỂM ĐĂNG TỐI ƯU
        </h4>
        <div className="space-y-2">
          {arr(result.posting_schedule).map((item: any, i: number) => (
            <div key={i} className="flex items-start gap-3 bg-[#060810] p-3 rounded-lg border border-white/5 hover:border-cyan-500/20 transition-colors">
              <div className="w-8 h-8 rounded-full bg-cyan-900/30 border border-cyan-500/20 flex items-center justify-center shrink-0">
                <span className="text-sm">{i < 2 ? '🕐' : i === 2 ? '🌕' : '🎊'}</span>
              </div>
              <div className="flex-1">
                <div className="text-sm text-white font-semibold">{item.time}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{item.reason}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderSeasonalKeywords = () => {
    if (!result?.seasonal_keywords || arr(result.seasonal_keywords).length === 0) return null;
    const monthIcons: Record<string, string> = { '1-2': '🧧', '4': '🪷', '7': '🙏', '8': '🏮', '12': '🎄' };
    return (
      <div className="bg-rose-900/10 border border-rose-500/20 rounded-xl p-4 animate-fade-in">
        <h4 className="text-xs font-bold text-rose-400 mb-3 uppercase flex items-center gap-2">
          <i className="fa-solid fa-calendar-alt" /> 6. TỪ KHÓA MÙA VỤ (SEASONAL)
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-slate-500 border-b border-white/5">
                <th className="text-left py-2 pr-2">Tháng</th>
                <th className="text-left py-2 pr-2">Sự Kiện</th>
                <th className="text-left py-2">Từ Khóa Nên Dùng</th>
              </tr>
            </thead>
            <tbody>
              {arr(result.seasonal_keywords).map((s: any, i: number) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-2.5 pr-2">
                    <span className="bg-rose-900/20 text-rose-300 px-2 py-0.5 rounded-full text-[10px] border border-rose-500/20 font-mono">
                      {monthIcons[s.month] || '📅'} T{s.month}
                    </span>
                  </td>
                  <td className="py-2.5 pr-2 text-white font-medium">{s.event}</td>
                  <td className="py-2.5">
                    <div className="flex flex-wrap gap-1">
                      {arr(s.keywords).map((kw: any, j: number) => (
                        <button key={j} onClick={() => copy(kw)} className="bg-rose-900/15 text-rose-200 px-2 py-0.5 rounded text-[10px] border border-rose-500/15 hover:bg-rose-900/30 transition-colors">
                          {kw}
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // Legacy sections fallback
  const renderLegacyKeywords = () => {
    if (result?.tags_30) return null; // New format takes priority
    if (!result?.keywords) return null;
    return (
      <div className="bg-blue-900/10 border border-blue-500/20 rounded-xl p-4">
        <h4 className="text-xs font-bold text-blue-400 mb-3 uppercase">🔑 TỪ KHÓA</h4>
        {['primary', 'secondary', 'long_tail'].map(type => Array.isArray(result.keywords[type]) && (
          <div key={type} className="mb-2">
            <div className="text-[10px] text-slate-400 mb-1 font-bold">{type === 'primary' ? 'Từ khóa chính' : type === 'secondary' ? 'Từ khóa phụ' : 'Từ khóa dài'}</div>
            <div className="flex flex-wrap gap-1">{arr(result.keywords[type]).map((k: any, i: number) => <span key={i} className="bg-blue-900/20 text-blue-200 px-2 py-0.5 rounded-full text-[10px] border border-blue-500/20">{k}</span>)}</div>
          </div>
        ))}
      </div>
    );
  };

  const renderLegacyHashtags = () => {
    if (result?.hashtag_set) return null; // New format takes priority
    if (!Array.isArray(result?.hashtags)) return null;
    return (
      <div className="bg-purple-900/10 border border-purple-500/20 rounded-xl p-4">
        <h4 className="text-xs font-bold text-purple-400 mb-3 uppercase">#️⃣ HASHTAG</h4>
        <div className="flex flex-wrap gap-2">{arr(result.hashtags).map((h: any, i: number) => <button key={i} onClick={() => copy(h)} className="bg-purple-900/20 text-purple-300 px-3 py-1 rounded-lg text-sm border border-purple-500/20 hover:bg-purple-900/30">{h}</button>)}</div>
        <button onClick={() => copy(arr(result.hashtags).join(' '))} className="mt-2 text-xs text-purple-400 hover:underline flex items-center gap-1"><i className="fa-solid fa-copy" /> Copy Tất Cả</button>
      </div>
    );
  };

  const renderLegacyTitles = () => {
    if (result?.title_options) return null; // New format takes priority
    if (!Array.isArray(result?.viral_titles)) return null;
    return (
      <div className="bg-[#0a0e1a] border border-white/5 rounded-xl p-4">
        <h4 className="text-xs font-bold text-amber-400 mb-3 uppercase">⚡ TIÊU ĐỀ VIRAL</h4>
        <div className="space-y-2">{arr(result.viral_titles).map((t: any, i: number) => (
          <div key={i} className="flex justify-between items-center bg-[#060810] p-2 rounded border border-white/10">
            <span className="text-sm text-white font-medium flex-1">{i + 1}. {t}</span>
            <button onClick={() => copy(t)} className="text-slate-500 hover:text-white ml-2"><i className="fa-solid fa-copy" /></button>
          </div>
        ))}</div>
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-[slideIn_0.4s_ease-out]">
      <div className="cosmic-card p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><i className="fa-solid fa-magnifying-glass-chart text-orange-400" /> Tối Ưu SEO Phật Pháp</h2>

        {/* ── Input Row ── */}
        <div className="flex gap-2 mb-4 flex-col sm:flex-row flex-wrap">
          <input value={topic} onChange={e => setTopic(e.target.value)} className="flex-1 min-w-[180px] bg-[#060810] border border-white/10 rounded-lg p-3 text-sm text-white outline-none focus:border-teal-500/50 placeholder-white/20 transition-colors" placeholder="Nhập chủ đề video Phật pháp..." />
          <select value={market} onChange={e => setMarket(e.target.value)} className="bg-[#060810] border border-white/10 rounded-lg px-3 py-3 text-sm text-white outline-none focus:border-orange-500/50 cursor-pointer shrink-0">
            {Object.values(BUDDHISM_CONTEXTS).map(m => (
              <option key={m.id} value={m.id}>{m.flag} {m.name}</option>
            ))}
          </select>
          <select value={platform} onChange={e => setPlatform(e.target.value as Platform)} className="bg-[#060810] border border-white/10 rounded-lg px-3 py-3 text-sm text-white outline-none focus:border-teal-500/50 cursor-pointer shrink-0">
            <option value="YouTube Shorts">📺 YouTube Shorts</option>
            <option value="TikTok">🎵 TikTok</option>
            <option value="YouTube Long-form">🎬 YouTube Long-form</option>
            <option value="Facebook Reels">📘 Facebook Reels</option>
            <option value="Instagram Reels">📸 Instagram Reels</option>
          </select>
          <button onClick={handleGenerate} disabled={loading} className="px-6 py-3 btn-sacred font-bold rounded-lg flex items-center gap-2 disabled:opacity-50 shrink-0">
            {loading ? <><i className="fa-solid fa-sync animate-spin" /> ĐANG TỐI ƯU...</> : <><i className="fa-solid fa-magic" /> Tối Ưu SEO</>}
          </button>
        </div>

        {/* ── Market + Platform Badge ── */}
        <div className="flex items-center gap-2 mb-5 flex-wrap">
          <span className="text-[10px] text-slate-500">Tối ưu cho:</span>
          <span className="bg-orange-900/20 text-orange-300 px-2.5 py-0.5 rounded-full text-[10px] border border-orange-500/20 font-medium">
            {BUDDHISM_CONTEXTS[market]?.flag} {BUDDHISM_CONTEXTS[market]?.name}
          </span>
          <span className="bg-white/5 text-white px-2.5 py-0.5 rounded-full text-[10px] border border-white/10 font-medium">
            {platform === 'YouTube Shorts' ? '📺' : platform === 'TikTok' ? '🎵' : platform === 'YouTube Long-form' ? '🎬' : platform === 'Facebook Reels' ? '📘' : '📸'} {platform}
          </span>
        </div>

        {/* ── Main Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* ── Left: Checklist ── */}
          <div className="bg-[#0a0e1a] border border-white/5 rounded-xl p-4">
            <h3 className="text-sm font-bold text-slate-300 mb-3 flex items-center gap-2"><i className="fa-solid fa-check-square" /> DANH SÁCH KIỂM TRA</h3>
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {Object.entries(SEO_CHECKLIST_DATA).map(([sec, items]) => (
                <div key={sec} className="bg-[#0f1424]/50 rounded-lg p-3 border border-white/5">
                  <div className="text-[10px] font-bold text-slate-500 uppercase mb-2">{sec}</div>
                  <div className="space-y-2">
                    {items.map(item => (
                      <label key={item.id} className="flex items-start gap-2 cursor-pointer group" onClick={() => toggle(item.id)}>
                        <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 mt-0.5 ${checks[item.id] ? 'bg-teal-500 border-teal-500' : 'border-white/20 bg-[#060810]'}`}>
                          {checks[item.id] && <i className="fa-solid fa-check text-white text-[10px]" />}
                        </div>
                        <span className={`text-xs ${checks[item.id] ? 'text-slate-500 line-through' : 'text-slate-400 group-hover:text-white'}`}>{item.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Results ── */}
          <div className="space-y-4">
            {!result ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 p-10 bg-white/5 border border-white/10 border-dashed rounded-xl">
                <i className="fa-solid fa-dharmachakra text-3xl mb-3 opacity-30 mandala-spin" />
                <p className="text-sm mb-1">Nhập chủ đề để phân tích SEO</p>
                <p className="text-[10px] text-slate-600">6 phần: Tiêu đề • Mô tả • Tags • Hashtags • Thời điểm • Mùa vụ</p>
              </div>
            ) : (
              <>
                {renderTitleOptions()}
                {renderDescription()}
                {renderTags30()}
                {renderHashtags()}
                {renderPostingSchedule()}
                {renderSeasonalKeywords()}
                {/* Legacy fallbacks */}
                {renderLegacyTitles()}
                {renderLegacyKeywords()}
                {renderLegacyHashtags()}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeoModule;
