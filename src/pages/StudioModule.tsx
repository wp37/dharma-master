import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CopyIcon, DownloadIcon } from '../components/Icons';
import { showToast } from '../components/Toast';

interface StudioModuleProps {
  currentScript: any;
}

const StudioModule: React.FC<StudioModuleProps> = ({ currentScript }) => {
  const [mode, setMode] = useState<'video' | 'image'>('video');
  const [showExport, setShowExport] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast('Đã sao chép!', 'success');
  };

  const exportCSV = (type: 'video' | 'image') => {
    if (!currentScript?.script) { showToast('Chưa có kịch bản. Hãy tạo kịch bản trước.', 'error'); return; }
    let csv = 'Scene,Time,Section';
    if (type === 'video') csv += ',Video Prompt\n';
    else csv += ',Image Prompt\n';
    currentScript.script.forEach((s: any) => {
      const prompt = type === 'video' ? (s.video_prompt || '') : (s.image_prompt || '');
      csv += `${s.scene_number},"${s.time}","${s.section}","${prompt.replace(/"/g, '""')}"\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dharma_${type}_prompts_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Đã tải file CSV!', 'success');
    setShowExport(false);
  };

  const exportTXT = (type: 'video' | 'image') => {
    if (!currentScript?.script) { showToast('Chưa có kịch bản.', 'error'); return; }
    let txt = '=== DHARMA MASTER PROMPTS ===\n\n';
    currentScript.script.forEach((s: any) => {
      const prompt = type === 'video' ? (s.video_prompt || '') : (s.image_prompt || '');
      txt += `[Scene ${s.scene_number}] ${s.time} - ${s.section}\n${prompt}\n\n`;
    });
    const blob = new Blob([txt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dharma_${type}_prompts_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Đã tải file TXT!', 'success');
    setShowExport(false);
  };

  return (
    <div className="h-full flex flex-col animate-slide-in">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <i className="fa-solid fa-clapperboard text-cyan-500"></i> Studio Sáng Tạo Phật Giáo
        </h2>
        <div className="flex bg-[#1a1a1a] rounded p-1 border border-white/5">
          <button onClick={() => setMode('video')}
            className={`px-4 py-1.5 rounded text-xs font-bold flex items-center gap-2 transition-colors ${mode === 'video' ? 'bg-cyan-900/50 text-cyan-100 shadow' : 'text-slate-400 hover:text-white'}`}>
            <i className="fa-solid fa-video"></i> VIDEO
          </button>
          <button onClick={() => setMode('image')}
            className={`px-4 py-1.5 rounded text-xs font-bold flex items-center gap-2 transition-colors ${mode === 'image' ? 'bg-purple-900/50 text-purple-100 shadow' : 'text-slate-400 hover:text-white'}`}>
            <i className="fa-solid fa-image"></i> ẢNH
          </button>
          <div className="relative ml-2">
            <button onClick={() => setShowExport(!showExport)}
              className="px-4 py-1.5 rounded text-xs font-bold flex items-center gap-2 transition-colors bg-green-900/40 text-green-300 hover:bg-green-800/50 border border-green-500/20">
              <i className="fa-solid fa-download"></i> Tải Dữ Liệu <i className="fa-solid fa-chevron-down text-[10px]"></i>
            </button>
            <AnimatePresence>
              {showExport && (
                <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 top-full mt-2 w-48 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-xl z-50 overflow-hidden">
                  <button onClick={() => exportCSV('video')} className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:bg-white/5 border-b border-white/5 flex items-center gap-2">
                    <i className="fa-solid fa-file-excel text-green-500"></i> CSV Video Prompts
                  </button>
                  <button onClick={() => exportCSV('image')} className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:bg-white/5 border-b border-white/5 flex items-center gap-2">
                    <i className="fa-solid fa-file-excel text-purple-500"></i> CSV Image Prompts
                  </button>
                  <button onClick={() => exportTXT('video')} className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:bg-white/5 border-b border-white/5 flex items-center gap-2">
                    <i className="fa-regular fa-file-lines text-green-500"></i> TXT Video Prompts
                  </button>
                  <button onClick={() => exportTXT('image')} className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:bg-white/5 flex items-center gap-2">
                    <i className="fa-regular fa-file-lines text-purple-500"></i> TXT Image Prompts
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin space-y-4 pb-10">
        {!currentScript?.script ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-500 py-20 border border-white/10 border-dashed rounded-xl bg-white/5">
            <i className="fa-solid fa-scroll text-4xl mb-3 opacity-30"></i>
            <p className="text-sm">Chưa có dữ liệu kịch bản.<br/>Hãy tạo kịch bản ở tab <strong className="text-amber-400">"Viết Kịch Bản"</strong> trước.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {currentScript.script.map((scene: any, i: number) => {
              const prompt = mode === 'video' ? scene.video_prompt : scene.image_prompt;
              if (!prompt) return null;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="bg-[#151515] border border-white/5 rounded-xl overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-[#1a1a1a]">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full bg-amber-600/20 text-amber-400 text-xs font-bold">
                        #{scene.scene_number}
                      </span>
                      <span className="text-slate-500 text-xs">{scene.time}</span>
                      <span className="px-2 py-0.5 rounded-full bg-purple-600/20 text-purple-300 text-xs">{scene.section}</span>
                    </div>
                    <button onClick={() => copyToClipboard(prompt)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-amber-900/20 hover:bg-amber-900/40 border border-amber-600/20 rounded-lg text-xs text-amber-300 transition-colors">
                      <CopyIcon className="w-3 h-3" /> Copy
                    </button>
                  </div>
                  <div className="p-4">
                    <p className="text-slate-300 text-sm leading-relaxed">{prompt}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudioModule;