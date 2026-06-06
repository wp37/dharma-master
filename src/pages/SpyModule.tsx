import React, { useState } from 'react';
import { callAI, fetchYoutubeMeta } from '../services/aiService';
import { SYSTEM_PROMPT_SPY_INSPIRE } from '../data/prompts';
import { showToast } from '../components/Toast';
import { buildSpyPrompt } from '../services/promptBuilder';
import { safeCallAI } from '../services/safeCall';
import { arr, str } from '../services/safe';

interface SpyModuleProps {
  onUseStrategy?: (title: string) => void;
}

const SpyModule: React.FC<SpyModuleProps> = ({ onUseStrategy }) => {
  const [url, setUrl] = useState('');
  const [transcript, setTranscript] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [meta, setMeta] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!url) return showToast('⚠️ Vui lòng nhập link YouTube!');
    
    // 1. Fetch Youtube Meta with safety wrapper
    const m = await safeCallAI(async () => {
      const metaData = await fetchYoutubeMeta(url);
      if (!metaData || metaData.title === "Invalid URL") {
        throw new Error("Không thể lấy thông tin video. Hãy chắc chắn URL YouTube chính xác.");
      }
      return metaData;
    }, setLoading);

    if (!m) return;
    setMeta(m);

    // 2. Build Prompt and call AI using safeCallAI
    const prompt = buildSpyPrompt(m, url, transcript);
    const res = await safeCallAI(async () => {
      return await callAI(prompt, SYSTEM_PROMPT_SPY_INSPIRE);
    }, setLoading);

    if (res) {
      setResult(res);
      showToast('🎉 Đã khai thác ý tưởng thành công!', 'success');
    }
  };

  const getDifficultyColor = (diff: string) => {
    const d = (diff || '').toLowerCase().trim();
    if (d.includes('easy') || d.includes('dễ')) {
      return 'bg-emerald-950/40 text-emerald-400 border-emerald-500/20';
    }
    if (d.includes('hard') || d.includes('khó')) {
      return 'bg-rose-950/40 text-rose-400 border-rose-500/20';
    }
    return 'bg-amber-950/40 text-amber-400 border-amber-500/20'; // Med / Medium / Trung bình
  };

  const getCategoryIcon = (category: string) => {
    const cat = (category || '').toLowerCase();
    if (cat.includes('hook')) return 'fa-solid fa-anchor text-cyan-400';
    if (cat.includes('cấu trúc') || cat.includes('structure')) return 'fa-solid fa-sitemap text-violet-400';
    if (cat.includes('storytelling') || cat.includes('kể chuyện')) return 'fa-solid fa-book-open text-emerald-400';
    if (cat.includes('visual') || cat.includes('hình ảnh')) return 'fa-solid fa-image text-amber-400';
    if (cat.includes('authority') || cat.includes('uy tín')) return 'fa-solid fa-certificate text-purple-400';
    return 'fa-solid fa-star text-teal-400';
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-[slideIn_0.4s_ease-out]">
      {/* Search and Inputs Card */}
      <div className="cosmic-card p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <i className="fa-brands fa-youtube text-red-500 animate-pulse" /> Phân Tích Đối Thủ & Khai Thác Ý Tưởng
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase mb-1.5 block">
              Đường dẫn video YouTube / Shorts
            </label>
            <div className="flex gap-2">
              <input 
                value={url} 
                onChange={e => setUrl(e.target.value)} 
                placeholder="Dán link Video (hoặc Shorts) YouTube..." 
                className="flex-1 bg-[#060810] border border-white/10 rounded-xl p-3 text-sm text-white outline-none focus:border-teal-500/50 placeholder-white/20 transition-colors" 
              />
              <button 
                onClick={() => { setUrl(''); setResult(null); setMeta(null); setTranscript(''); }} 
                className="p-3 bg-[#0a0e1a] rounded-xl hover:bg-[#111827] border border-white/5 transition-colors"
                title="Xóa tất cả"
              >
                <i className="fa-solid fa-trash text-slate-400" />
              </button>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase block">
                Phụ đề / Transcript video (Tùy chọn)
              </label>
              <span className="text-[10px] text-slate-500">Dán transcript từ YouTube giúp AI phân tích hook chi tiết hơn</span>
            </div>
            <textarea 
              value={transcript} 
              onChange={e => setTranscript(e.target.value)} 
              placeholder="Dán transcript có timestamp ở đây (ví dụ: 0:00 Giới thiệu...)" 
              rows={4} 
              className="w-full bg-[#060810] border border-white/10 rounded-xl p-3 text-sm text-white outline-none focus:border-teal-500/50 placeholder-white/20 transition-colors font-mono resize-y"
            />
          </div>
        </div>

        <button 
          onClick={handleAnalyze} 
          disabled={loading} 
          className="w-full py-4 mt-5 btn-sacred font-bold rounded-xl flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            <><i className="fa-solid fa-sync animate-spin" /> ĐANG PHÂN TÍCH VÀ KHAI THÁC...</>
          ) : (
            <><i className="fa-solid fa-dharmachakra" /> PHÂN TÍCH & KHAI THÁC Ý TƯỞNG</>
          )}
        </button>
      </div>

      {meta && result && (
        <div className="space-y-6 pb-10">
          {/* Metadata Card & Summary Header */}
          <div className="cosmic-card p-5 rounded-xl flex flex-col md:flex-row gap-5 items-start">
            {meta.thumb && (
              <img 
                src={meta.thumb} 
                alt="Video Thumbnail"
                className="w-full md:w-56 rounded-lg shadow-lg border border-white/10 object-cover aspect-video shrink-0" 
              />
            )}
            <div className="flex-1 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-0.5 rounded-full text-xs font-semibold bg-teal-950 text-teal-300 border border-teal-500/20">
                  <i className="fa-solid fa-dharmachakra text-[10px] mr-1" />
                  {str(result.tradition_detected, 'Chưa xác định truyền thống')}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <i className="fa-solid fa-user text-[10px]" /> {str(meta.author)}
                </span>
                {meta.fullData && (
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <i className="fa-solid fa-eye text-[10px]" /> {str(meta.viewCount)} lượt xem
                  </span>
                )}
              </div>
              <h3 className="text-lg font-bold text-white leading-tight">
                {str(meta.title)}
              </h3>
              <div className="bg-[#060810]/60 border-l-2 border-teal-500 p-3 rounded-r-lg">
                <p className="text-xs text-slate-300 italic leading-relaxed">
                  "{str(result.summary, 'Không có tóm tắt chi tiết.')}"
                </p>
              </div>
            </div>
          </div>

          {/* Red Flags Alert Section */}
          {arr(result.red_flags).length > 0 && (
            <div className="bg-rose-950/20 border border-rose-500/30 rounded-xl p-5 shadow-[0_0_15px_rgba(239,68,68,0.05)]">
              <h4 className="text-sm font-bold text-red-400 mb-3 uppercase flex items-center gap-2">
                <i className="fa-solid fa-triangle-exclamation text-red-500 animate-pulse" /> Cảnh Báo Cờ Đỏ Giáo Lý (Cần Tránh Khi Làm Lại)
              </h4>
              <ul className="space-y-2 text-xs text-rose-200/90 list-disc pl-5">
                {arr(result.red_flags).map((flag: any, i: number) => (
                  <li key={i}>{str(flag)}</li>
                ))}
              </ul>
            </div>
          )}

          {/* 10 Content Ideas */}
          {arr(result.content_ideas).length > 0 && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-amber-400 uppercase flex items-center gap-2 pl-1">
                <i className="fa-solid fa-lightbulb text-amber-400 animate-pulse" /> 10 Ý Tưởng Nội Dung Phật Pháp Độc Đáo
              </h4>
              <div className="grid grid-cols-1 gap-4">
                {arr(result.content_ideas).map((idea: any, idx: number) => (
                  <div key={idx} className="cosmic-card p-5 rounded-xl border border-white/5 hover:border-amber-500/30 transition-all duration-300 relative group flex flex-col md:flex-row gap-5">
                    {/* Index & Difficulty Badge */}
                    <div className="md:w-28 shrink-0 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/5 pb-3 md:pb-0 md:pr-4 text-center items-center md:items-stretch">
                      <div>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center font-black text-white text-base shadow-[0_4px_12px_rgba(245,158,11,0.3)] mx-auto mb-2">
                          {idx + 1}
                        </div>
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${getDifficultyColor(idea.difficulty)}`}>
                          {str(idea.difficulty, 'Easy')}
                        </span>
                      </div>
                      {idea.unique_angle && (
                        <div className="hidden md:block mt-3 text-[10px] text-slate-500 text-left italic">
                          <span className="font-bold text-slate-400 block not-italic uppercase mb-0.5">Góc Tiếp Cận:</span>
                          "{str(idea.unique_angle)}"
                        </div>
                      )}
                    </div>

                    {/* Main Info */}
                    <div className="flex-1 space-y-3">
                      <div className="flex justify-between items-start gap-4">
                        <h5 className="text-base font-bold text-white leading-snug group-hover:text-amber-300 transition-colors">
                          {str(idea.title)}
                        </h5>
                        <button 
                          onClick={() => {
                            if (onUseStrategy) {
                              onUseStrategy(idea.title);
                              showToast('🚀 Đã chuyển ý tưởng sang Trình viết kịch bản!', 'success');
                            }
                          }}
                          className="shrink-0 btn-sacred px-4 py-2 rounded-lg font-bold text-[11px] flex items-center gap-1.5 hover:scale-105"
                        >
                          <i className="fa-solid fa-bolt text-xs" /> KÍCH HOẠT
                        </button>
                      </div>

                      {/* Hook Bubble */}
                      <div className="bg-[#060810]/70 border border-white/5 rounded-lg p-3 relative overflow-hidden">
                        <span className="absolute top-1 right-2 text-[8px] uppercase tracking-wider text-teal-400 font-bold bg-teal-950/40 px-1.5 py-0.5 rounded border border-teal-500/10">Hook 15s</span>
                        <p className="text-xs text-indigo-100 leading-relaxed italic pr-12">
                          "{str(idea.hook_15s)}"
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="bg-[#0a0e1a]/50 p-2.5 rounded border border-teal-500/10">
                          <span className="text-[10px] uppercase font-bold text-teal-400 block mb-0.5">💎 Kết Quả Khán Giả Nhận Được (Payoff)</span>
                          <p className="text-slate-300 leading-relaxed">{str(idea.payoff)}</p>
                        </div>
                        <div className="bg-[#0a0e1a]/50 p-2.5 rounded border border-amber-500/10">
                          <span className="text-[10px] uppercase font-bold text-amber-400 block mb-0.5">📿 Nền Tảng Giáo Lý (Dharma Basis)</span>
                          <p className="text-slate-300 leading-relaxed font-medium">{str(idea.dharma_basis)}</p>
                        </div>
                      </div>

                      {/* Mobile-only unique angle */}
                      {idea.unique_angle && (
                        <div className="block md:hidden text-[10px] text-slate-500 italic bg-black/10 p-2 rounded">
                          <span className="font-bold text-slate-400 not-italic uppercase mr-1">Góc Tiếp Cận:</span>
                          "{str(idea.unique_angle)}"
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hook Recipes */}
          {arr(result.hook_recipes).length > 0 && (
            <div className="bg-[#0a0e1a]/80 border border-teal-900/20 rounded-xl p-5 space-y-4">
              <h4 className="text-sm font-bold text-teal-400 uppercase flex items-center gap-2">
                <i className="fa-solid fa-wand-magic-sparkles text-teal-400" /> Công Thức Hook Thành Công
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {arr(result.hook_recipes).map((recipe: any, i: number) => (
                  <div key={i} className="bg-[#060810]/50 p-4 rounded-lg border border-teal-500/10 hover:border-teal-500/20 transition-colors flex flex-col justify-between">
                    <div>
                      <div className="text-xs text-teal-300 font-bold mb-1.5 flex items-center gap-1.5">
                        <i className="fa-solid fa-check text-[10px] text-teal-400" />
                        {str(recipe.name)}
                      </div>
                      <div className="font-mono text-[11px] text-slate-400 bg-black/30 p-2 rounded mb-2 border border-white/5">
                        {str(recipe.template)}
                      </div>
                    </div>
                    <div className="text-[11px] text-indigo-200 italic mt-1 bg-indigo-950/20 p-2 rounded border border-indigo-500/10">
                      Ví dụ: "{str(recipe.example)}"
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Winning Patterns */}
          {arr(result.winning_patterns).length > 0 && (
            <div className="bg-[#0a0e1a]/80 border border-teal-900/20 rounded-xl p-5 space-y-4">
              <h4 className="text-sm font-bold text-teal-400 uppercase flex items-center gap-2 animate-pulse">
                <i className="fa-solid fa-award text-teal-400" /> Chiến Thuật Thành Công (Winning Patterns)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {arr(result.winning_patterns).map((pattern: any, i: number) => (
                  <div key={i} className="bg-[#060810]/50 p-4 rounded-lg border border-white/5 hover:border-teal-500/20 transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-bold text-white flex items-center gap-2">
                          <i className={getCategoryIcon(pattern.category)} />
                          {str(pattern.category)}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 font-medium mb-2">{str(pattern.pattern)}</p>
                    </div>
                    <div>
                      {pattern.evidence && (
                        <div className="text-[10px] text-slate-500 italic mb-2">
                          Dẫn chứng: {str(pattern.evidence)}
                        </div>
                      )}
                      {pattern.why_works && (
                        <div className="text-[10px] text-teal-400/90 bg-teal-950/20 border border-teal-500/10 p-2 rounded">
                          💡 {str(pattern.why_works)}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Gaps and Opportunities */}
          {arr(result.gaps_and_opportunities).length > 0 && (
            <div className="bg-[#0a0e1a]/80 border border-teal-900/20 rounded-xl p-5 space-y-4">
              <h4 className="text-sm font-bold text-teal-400 uppercase flex items-center gap-2">
                <i className="fa-solid fa-arrows-to-eye text-teal-400" /> Cơ Hội Cải Tiến & Lấp Đầy Khoảng Trống
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {arr(result.gaps_and_opportunities).map((item: any, i: number) => (
                  <div key={i} className="bg-[#060810]/50 p-4 rounded-lg border border-white/5 hover:border-teal-500/20 transition-all flex flex-col justify-between">
                    <div className="mb-3">
                      <span className="text-[10px] uppercase font-bold text-red-400 flex items-center gap-1.5 mb-1">
                        <i className="fa-solid fa-circle-xmark text-xs" /> Điểm Yếu / Khoảng Trống
                      </span>
                      <p className="text-xs text-slate-300 leading-relaxed">{str(item.gap)}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-teal-950/20 border border-teal-500/15">
                      <span className="text-[10px] uppercase font-bold text-teal-400 flex items-center gap-1.5 mb-1">
                        <i className="fa-solid fa-circle-check text-xs" /> Đề Xuất Cải Tiến Của Bạn
                      </span>
                      <p className="text-xs text-teal-200 leading-relaxed">{str(item.your_opportunity)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Takeaways Section */}
          {arr(result.takeaways).length > 0 && (
            <div className="bg-gradient-to-br from-teal-950/15 to-emerald-950/15 border border-teal-500/20 rounded-xl p-5">
              <h4 className="text-sm font-bold text-teal-400 mb-4 uppercase flex items-center gap-2">
                <i className="fa-solid fa-list-check text-teal-400" /> Hành Động Trong Tuần Này
              </h4>
              <div className="space-y-2.5">
                {arr(result.takeaways).map((takeaway: any, i: number) => (
                  <div key={i} className="flex items-start gap-3 bg-[#060810]/50 p-3 rounded-lg border border-teal-500/5 hover:border-teal-500/15 transition-all">
                    <input 
                      type="checkbox" 
                      id={`takeaway-${i}`} 
                      className="mt-0.5 rounded border-teal-500/30 text-teal-500 focus:ring-teal-500/50 bg-[#060810] h-4 w-4 shrink-0 cursor-pointer" 
                    />
                    <label htmlFor={`takeaway-${i}`} className="text-xs text-slate-300 cursor-pointer leading-normal select-none flex-1">
                      {str(takeaway)}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SpyModule;