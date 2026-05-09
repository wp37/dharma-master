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
    setLoading(true);
    setResult(null);
    try {
      const prompt = PROMPT_SCRIPT_WRITER(topic, duration, selectedContext, selectedStyle, '');
      const data = await callGemini(prompt);
      setResult(data);
      if (data) onScriptGenerated(data);
    } catch (e: any) {
      showToast(e.message || 'Lỗi khi tạo kịch bản.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast('Đã sao chép!', 'success');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-slide-in">
      <div className="bg-[#0f0f11] border border-white/10 p-6 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <i className="fa-solid fa-pen-fancy text-amber-400"></i> Quy Trình Sáng Tạo Kịch Bản Pháp Thoại
        </h2>

        <div className="space-y-4 mb-6">
          {/* Topic */}
          <div>
            <label className="text-[10px] font-bold text-amber-500 uppercase mb-1 block">CHỦ ĐỀ PHẬT PHÁP</label>
            <input value={topic} onChange={e => setTopic(e.target.value)} placeholder="VD: Tứ Diệu Đế, Thiền Vipassana, Từ Bi Quán, Bát Chánh Đạo..."
              className="w-full bg-black border border-amber-900/40 rounded-lg p-3 text-sm text-white outline-none focus:border-amber-500/50" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Duration */}
            <div className="bg-[#151515] border border-white/5 rounded-xl p-4 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/50"></div>
              <label className="text-xs font-bold text-slate-400 uppercase mb-3 flex items-center gap-2">
                <i className="fa-solid fa-clock text-blue-400"></i> THỜI LƯỢNG (PHÚT)
              </label>
              <div className="flex items-center gap-5">
                <input type="number" value={duration} onChange={e => setDuration(parseFloat(e.target.value) || 1)}
                  step="0.5" min="0.5" max="240"
                  className="w-20 bg-black border border-white/10 rounded-lg p-3 text-2xl font-black text-white text-center outline-none focus:border-blue-500/50" />
                <div className="flex flex-col gap-1.5 text-xs">
                  <div><span className="text-slate-500">Cảnh quay:</span> <span className="font-bold text-green-400 text-base">~{estimatedScenes} Cảnh</span></div>
                  <div><span className="text-slate-500">Voice:</span> <span className="font-bold text-purple-400 text-base">~{estimatedWords} từ</span></div>
                </div>
              </div>
            </div>

            {/* Context Selector */}
            <div className="bg-[#151515] border border-white/5 rounded-xl p-4">
              <label className="text-xs font-bold text-slate-400 uppercase mb-2 flex items-center gap-2">
                <i className="fa-solid fa-globe text-orange-400"></i> TRUYỀN THỐNG / VĂN HÓA
              </label>
              <button onClick={() => setContextOpen(!contextOpen)}
                className="w-full bg-black border border-white/10 rounded-lg p-3 text-left text-sm text-white flex items-center justify-between hover:border-amber-500/30 transition-colors">
                <span>{selectedContext.flag} {selectedContext.name.split('(')[0].trim()}</span>
                <ChevronDownIcon className={`w-4 h-4 text-slate-400 transition-transform ${contextOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {contextOpen && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    className="border-t border-white/5 mt-2 max-h-48 overflow-y-auto">
                    {CONTEXT_LIST.map(ctx => (
                      <button key={ctx.id} onClick={() => { setSelectedContext(ctx); setContextOpen(false); }}
                        className={`w-full text-left p-3 text-xs border-b border-white/5 hover:bg-white/5 transition-colors ${selectedContext.id === ctx.id ? 'text-amber-400 bg-amber-900/10' : 'text-slate-300'}`}>
                        <span className="mr-2">{ctx.flag}</span>{ctx.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Visual Style */}
          <div className="bg-[#151515] border border-white/5 rounded-xl p-4">
            <label className="text-xs font-bold text-slate-400 uppercase mb-2 flex items-center gap-2">
              <i className="fa-solid fa-palette text-pink-400"></i> PHONG CÁCH VISUAL
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {VISUAL_STYLES.map(style => (
                <button key={style.id} onClick={() => setSelectedStyle(style)}
                  className={`text-left p-3 rounded-lg border transition-all text-xs ${selectedStyle.id === style.id ? 'bg-pink-900/20 border-pink-500/40 text-pink-300' : 'bg-black border-white/5 text-slate-400 hover:border-pink-500/30'}`}>
                  <div className="font-bold mb-0.5">{style.name}</div>
                  <div className="opacity-60 text-[10px] leading-tight">{style.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <button onClick={handleGenerate} disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-amber-600 to-orange-600 border border-amber-400/30 rounded-xl text-white font-bold shadow-[0_0_25px_rgba(251,191,36,0.3)] hover:shadow-[0_0_35px_rgba(251,191,36,0.5)] transition-all flex items-center justify-center gap-3 text-lg disabled:opacity-50">
            {loading ? <LoaderIcon className="w-5 h-5 animate-spin" /> : <i className="fa-solid fa-om"></i>}
            {loading ? 'Đang viết kịch bản...' : 'VIẾT KỊCH BẢN PHÁP THOẠI'}
          </button>
        </div>
      </div>

      {/* Results */}
      {result && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 pb-10">
          <div className="bg-[#151515] border border-amber-500/20 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-amber-400 font-bold text-sm flex items-center gap-2">
                <i className="fa-solid fa-scroll"></i> Kịch Bản: {result.mode_detected || topic}
              </h3>
              <button onClick={() => copyText(JSON.stringify(result.script, null, 2))}
                className="px-3 py-1.5 bg-amber-900/30 hover:bg-amber-900/50 border border-amber-600/30 rounded-lg text-xs text-amber-300 flex items-center gap-1 transition-colors">
                <i className="fa-solid fa-copy"></i> Copy All
              </button>
            </div>
            <div className="space-y-3">
              {result.script?.map((scene: any, i: number) => (
                <div key={i} className="bg-black/40 border border-white/5 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded-full bg-amber-600/20 text-amber-400 text-xs font-bold">Cảnh {scene.scene_number}</span>
                    <span className="text-slate-500 text-xs">{scene.time}</span>
                    <span className="px-2 py-0.5 rounded-full bg-purple-600/20 text-purple-300 text-xs">{scene.section}</span>
                  </div>
                  <div className="space-y-2">
                    {scene.voice_text && (
                      <div className="bg-blue-900/10 border border-blue-500/20 rounded-lg p-3">
                        <div className="text-[10px] text-blue-400 font-bold uppercase mb-1 flex items-center gap-1">
                          <i className="fa-solid fa-microphone"></i> Voice
                        </div>
                        <p className="text-blue-200 text-sm italic">"{scene.voice_text}"</p>
                      </div>
                    )}
                    {scene.video_prompt && (
                      <div className="bg-green-900/10 border border-green-500/20 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-1">
                          <div className="text-[10px] text-green-400 font-bold uppercase flex items-center gap-1">
                            <i className="fa-solid fa-video"></i> Video Prompt
                          </div>
                          <button onClick={() => copyText(scene.video_prompt)} className="text-green-400/50 hover:text-green-300 text-xs"><i className="fa-solid fa-copy"></i></button>
                        </div>
                        <p className="text-green-200/80 text-xs">{scene.video_prompt}</p>
                      </div>
                    )}
                    {scene.image_prompt && (
                      <div className="bg-purple-900/10 border border-purple-500/20 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-1">
                          <div className="text-[10px] text-purple-400 font-bold uppercase flex items-center gap-1">
                            <i className="fa-solid fa-image"></i> Image Prompt
                          </div>
                          <button onClick={() => copyText(scene.image_prompt)} className="text-purple-400/50 hover:text-purple-300 text-xs"><i className="fa-solid fa-copy"></i></button>
                        </div>
                        <p className="text-purple-200/80 text-xs">{scene.image_prompt}</p>
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