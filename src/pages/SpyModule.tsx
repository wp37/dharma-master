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
    <div className="max-w-5xl mx-auto space-y-6 animate-slide-in">
      <div className="bg-[#0f0f11] border border-white/10 p-6 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <i className="fa-brands fa-youtube text-red-600"></i> Phân Tích Kênh Phật Pháp & Thiền Định
        </h2>
        <div className="space-y-4">
          <div className="flex gap-2">
            <input value={url} onChange={e => setUrl(e.target.value)} placeholder="Dán link Video Phật Pháp / Thiền Định / Pháp Thoại..."
              className="flex-1 bg-black border border-white/10 rounded-xl p-3 text-sm text-white outline-none focus:border-amber-500/50 placeholder-white/20"
              onKeyDown={e => e.key === 'Enter' && handleAnalyze()} />
            <button onClick={() => { setUrl(''); setResult(null); setMeta(null); }}
              className="p-3 bg-[#1a1a1a] rounded-xl hover:bg-[#252525] border border-white/5">
              <i className="fa-solid fa-trash text-slate-400"></i>
            </button>
          </div>
          <button onClick={handleAnalyze} disabled={loading}
            className="w-full py-4 bg-amber-900/40 hover:bg-amber-800/40 border border-amber-500/30 text-amber-100 font-bold rounded-xl shadow-[0_0_20px_rgba(251,191,36,0.2)] flex items-center justify-center gap-2 transition-all disabled:opacity-50">
            {loading ? <LoaderIcon className="w-5 h-5 animate-spin" /> : <i className="fa-solid fa-lotus text-lg"></i>}
            {loading ? 'Đang phân tích...' : 'PHÂN TÍCH PHÁP MÔN'}
          </button>
        </div>
      </div>

      {meta && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-[#151515] border border-white/5 rounded-xl p-4 flex gap-4">
          <img src={meta.thumb} alt={meta.title} className="w-40 h-24 object-cover rounded-lg" onError={e => { (e.target as HTMLImageElement).src = ''; }} />
          <div>
            <h3 className="text-white font-bold text-sm">{meta.title}</h3>
            <p className="text-amber-400/60 text-xs mt-1">{meta.author}</p>
          </div>
        </motion.div>
      )}

      {result && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 pb-10">
          {result.meta_seo && (
            <div className="bg-[#151515] border border-white/5 rounded-xl p-5">
              <h3 className="text-amber-400 font-bold text-sm mb-3 flex items-center gap-2"><i className="fa-solid fa-chart-line"></i> SEO & Chiến Lược</h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-black/40 p-3 rounded-lg"><span className="text-slate-500">Authentic Score:</span> <span className="text-green-400 font-bold">{result.meta_seo.authenticity_score}/10</span></div>
                <div className="bg-black/40 p-3 rounded-lg"><span className="text-slate-500">Commercial Risk:</span> <span className={`font-bold ${result.meta_seo.commercialization_risk === 'Low' ? 'text-green-400' : result.meta_seo.commercialization_risk === 'High' ? 'text-red-400' : 'text-yellow-400'}`}>{result.meta_seo.commercialization_risk}</span></div>
                <div className="col-span-2 bg-black/40 p-3 rounded-lg"><span className="text-slate-500">Title Structure:</span> <span className="text-white font-medium">{result.meta_seo.title_structure}</span></div>
                <div className="col-span-2 bg-black/40 p-3 rounded-lg"><span className="text-slate-500">Thumbnail Tactics:</span> <span className="text-white font-medium">{result.meta_seo.thumbnail_tactics}</span></div>
              </div>
            </div>
          )}
          {result.strengths?.length > 0 && (
            <div className="bg-[#151515] border border-white/5 rounded-xl p-5">
              <h3 className="text-green-400 font-bold text-sm mb-3 flex items-center gap-2"><i className="fa-solid fa-thumbs-up"></i> Điểm Mạnh</h3>
              <div className="space-y-2">
                {result.strengths.map((s: any, i: number) => (
                  <div key={i} className="bg-green-900/10 border border-green-500/20 rounded-lg p-3 text-xs">
                    <span className="text-green-300 font-bold">{s.point}</span>
                    <span className="text-slate-500 ml-2">[{s.impact}]</span>
                    <p className="text-slate-400 mt-1">{s.evidence}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {result.weaknesses?.length > 0 && (
            <div className="bg-[#151515] border border-white/5 rounded-xl p-5">
              <h3 className="text-red-400 font-bold text-sm mb-3 flex items-center gap-2"><i className="fa-solid fa-thumbs-down"></i> Điểm Yếu</h3>
              <div className="space-y-2">
                {result.weaknesses.map((w: any, i: number) => (
                  <div key={i} className="bg-red-900/10 border border-red-500/20 rounded-lg p-3 text-xs">
                    <span className="text-red-300 font-bold">{w.point}</span>
                    <span className="text-slate-500 ml-2">[{w.impact}]</span>
                    <p className="text-slate-400 mt-1"><span className="text-yellow-400">Fix:</span> {w.fix}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {result.viral_suggestions?.length > 0 && (
            <div className="bg-[#151515] border border-white/5 rounded-xl p-5">
              <h3 className="text-purple-400 font-bold text-sm mb-3 flex items-center gap-2"><i className="fa-solid fa-fire"></i> Gợi Ý Viral</h3>
              <div className="space-y-2">
                {result.viral_suggestions.map((v: any, i: number) => (
                  <div key={i} className="bg-purple-900/10 border border-purple-500/20 rounded-lg p-3 text-xs">
                    <div className="text-purple-300 font-bold mb-1">{v.hook_title}</div>
                    <p className="text-slate-400">{v.outline_idea}</p>
                    <p className="text-slate-500 mt-1 italic">{v.psychological_twist}</p>
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