import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LoaderIcon } from '../components/Icons';
import { fetchYoutubeMeta } from '../services/geminiService';
import { callGemini } from '../services/geminiService';
import { PROMPT_SPY } from '../data/prompts';
import { showToast } from '../components/Toast';

const SpyModule: React.FC = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [meta, setMeta] = useState<{ title: string; author: string; thumb: string } | null>(null);

  const handleAnalyze = async () => {
    if (!url.trim()) { showToast('Vui lòng nhập link video YouTube.', 'error'); return; }
    setLoading(true);
    setResult(null);
    try {
      const videoMeta = await fetchYoutubeMeta(url);
      setMeta(videoMeta);
      const data = await callGemini(
        `Phân tích video: ${videoMeta.title} bởi ${videoMeta.author}\nURL: ${url}`,
        PROMPT_SPY
      );
      setResult(data);
    } catch (e: any) {
      showToast(e.message || 'Lỗi khi phân tích video.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-5 animate-slide-in">
      {/* Input Card */}
      <div className="dharma-card p-6">
        <h2 className="text-lg font-extrabold text-[#ECE6D8] mb-4 flex items-center gap-2.5 font-display">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-red-400 to-orange-400 flex items-center justify-center shadow-[0_0_16px_rgba(239,68,68,0.15)]">
            <i className="fa-brands fa-youtube text-white text-sm"></i>
          </div>
          Phân Tích Kênh Phật Pháp & Thiền Định
        </h2>
        <div className="space-y-3">
          <div className="flex gap-2">
            <input value={url} onChange={e => setUrl(e.target.value)}
              placeholder="Dán link Video Phật Pháp / Thiền Định / Pháp Thoại..."
              className="flex-1 !bg-white/[0.03] !border-white/[0.06] rounded-xl p-3 text-sm text-[#ECE6D8] outline-none focus:!border-[#D4A574]/30 placeholder:text-[#ECE6D8]/20"
              onKeyDown={e => e.key === 'Enter' && handleAnalyze()} />
            <button onClick={() => { setUrl(''); setResult(null); setMeta(null); }}
              className="p-3 bg-white/[0.03] rounded-xl hover:bg-white/[0.06] border border-white/[0.04] hover:border-white/[0.08] transition-all duration-300">
              <i className="fa-solid fa-trash text-[#ECE6D8]/20 hover:text-red-400/60"></i>
            </button>
          </div>
          <button onClick={handleAnalyze} disabled={loading}
            className="w-full py-4 dharma-btn-primary rounded-xl flex items-center justify-center gap-2.5 text-sm disabled:opacity-40">
            {loading ? <LoaderIcon className="w-5 h-5 animate-spin" /> : <i className="fa-solid fa-dharmachakra text-lg"></i>}
            {loading ? 'Đang phân tích...' : 'PHÂN TÍCH PHÁP MÔN'}
          </button>
        </div>
      </div>

      {/* Video Meta Preview */}
      {meta && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ ease: [0.22, 1, 0.36, 1] }}
          className="dharma-card p-4 flex gap-4">
          <img src={meta.thumb} alt={meta.title}
            className="w-36 h-22 object-cover rounded-xl border border-white/[0.06] shadow-sm"
            onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          <div className="flex-1 min-w-0">
            <h3 className="text-[#ECE6D8] font-bold text-sm leading-snug line-clamp-2">{meta.title}</h3>
            <p className="text-[#ECE6D8]/30 text-xs mt-1 flex items-center gap-1">
              <i className="fa-solid fa-user text-[10px]"></i> {meta.author}
            </p>
          </div>
        </motion.div>
      )}

      {/* Analysis Results */}
      {result && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ ease: [0.22, 1, 0.36, 1] }}
          className="space-y-4 pb-10">
          {/* SEO & Strategy */}
          {result.meta_seo && (
            <div className="dharma-card p-5">
              <h3 className="text-[#ECE6D8]/80 font-bold text-sm mb-3.5 flex items-center gap-2">
                <i className="fa-solid fa-chart-line text-[#D4A574]/60"></i> SEO & Chiến Lược
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                <div className="dharma-card-inner p-3">
                  <span className="text-[#ECE6D8]/30">Authentic Score:</span>{' '}
                  <span className="text-green-400 font-bold">{result.meta_seo.authenticity_score}/10</span>
                </div>
                <div className="dharma-card-inner p-3">
                  <span className="text-[#ECE6D8]/30">Commercial Risk:</span>{' '}
                  <span className={`font-bold ${result.meta_seo.commercialization_risk === 'Low' ? 'text-green-400' : result.meta_seo.commercialization_risk === 'High' ? 'text-red-400' : 'text-yellow-400'}`}>
                    {result.meta_seo.commercialization_risk}
                  </span>
                </div>
                <div className="sm:col-span-2 dharma-card-inner p-3">
                  <span className="text-[#ECE6D8]/30">Title Structure:</span>{' '}
                  <span className="text-[#ECE6D8]/70 font-medium">{result.meta_seo.title_structure}</span>
                </div>
                <div className="sm:col-span-2 dharma-card-inner p-3">
                  <span className="text-[#ECE6D8]/30">Thumbnail Tactics:</span>{' '}
                  <span className="text-[#ECE6D8]/70 font-medium">{result.meta_seo.thumbnail_tactics}</span>
                </div>
              </div>
            </div>
          )}

          {/* Strengths */}
          {result.strengths?.length > 0 && (
            <div className="dharma-card p-5">
              <h3 className="text-green-400/80 font-bold text-sm mb-3 flex items-center gap-2">
                <i className="fa-solid fa-thumbs-up text-green-400/60"></i> Điểm Mạnh
              </h3>
              <div className="space-y-2">
                {result.strengths.map((s: any, i: number) => (
                  <div key={i} className="bg-green-500/[0.04] border border-green-500/10 rounded-xl p-3 text-xs">
                    <span className="text-green-300/80 font-bold">{s.point}</span>
                    <span className="dharma-tag bg-green-500/10 text-green-400/70 ml-2">{s.impact}</span>
                    <p className="text-[#ECE6D8]/35 mt-1.5 leading-relaxed">{s.evidence}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Weaknesses */}
          {result.weaknesses?.length > 0 && (
            <div className="dharma-card p-5">
              <h3 className="text-red-400/80 font-bold text-sm mb-3 flex items-center gap-2">
                <i className="fa-solid fa-thumbs-down text-red-400/60"></i> Điểm Yếu
              </h3>
              <div className="space-y-2">
                {result.weaknesses.map((w: any, i: number) => (
                  <div key={i} className="bg-red-500/[0.04] border border-red-500/10 rounded-xl p-3 text-xs">
                    <span className="text-red-300/80 font-bold">{w.point}</span>
                    <span className="dharma-tag bg-red-500/10 text-red-400/70 ml-2">{w.impact}</span>
                    <p className="text-[#ECE6D8]/35 mt-1.5 leading-relaxed">
                      <span className="text-[#D4A574]/60 font-semibold">Fix:</span> {w.fix}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Viral Suggestions */}
          {result.viral_suggestions?.length > 0 && (
            <div className="dharma-card p-5">
              <h3 className="text-purple-400/80 font-bold text-sm mb-3 flex items-center gap-2">
                <i className="fa-solid fa-fire text-purple-400/60"></i> Gợi Ý Viral
              </h3>
              <div className="space-y-2">
                {result.viral_suggestions.map((v: any, i: number) => (
                  <div key={i} className="bg-purple-500/[0.04] border border-purple-500/10 rounded-xl p-3 text-xs">
                    <div className="text-purple-300/80 font-bold mb-1">{v.hook_title}</div>
                    <p className="text-[#ECE6D8]/35 leading-relaxed">{v.outline_idea}</p>
                    <p className="text-purple-400/40 mt-1.5 italic text-[11px]">{v.psychological_twist}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default SpyModule;