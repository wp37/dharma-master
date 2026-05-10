import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CopyIcon } from '../components/Icons';
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
    if (!currentScript?.script) { showToast('Chưa có kịch bản.', 'error'); return; }
    let csv = 'Scene,Time,Section';
    csv += type === 'video' ? ',Video Prompt\n' : ',Image Prompt\n';
    currentScript.script.forEach((s: any) => {
      const prompt = type === 'video' ? (s.video_prompt || '') : (s.image_prompt || '');
      csv += `${s.scene_number},"${s.time}","${s.section}","${prompt.replace(/"/g, '""')}"\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `dharma_${type}_prompts_${Date.now()}.csv`; a.click();
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
    a.href = url; a.download = `dharma_${type}_prompts_${Date.now()}.txt`; a.click();
    URL.revokeObjectURL(url);
    showToast('Đã tải file TXT!', 'success');
    setShowExport(false);
  };

  return (
    <div className="h-full flex flex-col animate-slide-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-5">
        <h2 className="text-lg font-extrabold text-[#ECE6D8] flex items-center gap-2.5 font-display">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-400 to-indigo-400 flex items-center justify-center shadow-[0_0_16px_rgba(139,92,246,0.15)]">
            <i className="fa-solid fa-clapperboard text-white text-sm"></i>
          </div>
          Studio Sáng Tạo Phật Giáo
        </h2>
        <div className="flex items-center gap-2">
          <div className="flex bg-white/[0.03] rounded-xl p-1 border border-white/[0.06]">
            <button onClick={() => setMode('video')}
              className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all duration-300 ${
                mode === 'video' ? 'bg-cyan-500/[0.08] text-cyan-300 border border-cyan-500/20' : 'text-[#ECE6D8]/30 hover:text-[#ECE6D8]/50'
              }`}>
              <i className="fa-solid fa-video"></i> VIDEO
            </button>
            <button onClick={() => setMode('image')}
              className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all duration-300 ${
                mode === 'image' ? 'bg-purple-500/[0.08] text-purple-300 border border-purple-500/20' : 'text-[#ECE6D8]/30 hover:text-[#ECE6D8]/50'
              }`}>
              <i className="fa-solid fa-image"></i> ẢNH
            </button>
          </div>
          <div className="relative">
            <button onClick={() => setShowExport(!showExport)}
              className="px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all duration-300 bg-green-500/[0.06] text-green-300/70 hover:bg-green-500/[0.1] border border-green-500/15">
              <i className="fa-solid fa-download"></i> Tải <i className="fa-solid fa-chevron-down text-[10px]"></i>
            </button>
            <AnimatePresence>
              {showExport && (
                <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute right-0 top-full mt-2 w-52 bg-[#0a0e1a]/95 backdrop-blur-2xl border border-white/[0.06] rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] z-50 overflow-hidden">
                  <button onClick={() => exportCSV('video')} className="w-full text-left px-4 py-2.5 text-xs text-[#ECE6D8]/50 hover:bg-white/[0.04] hover:text-green-300 border-b border-white/[0.03] flex items-center gap-2 transition-colors">
                    <i className="fa-solid fa-file-excel text-green-400/50"></i> CSV Video Prompts
                  </button>
                  <button onClick={() => exportCSV('image')} className="w-full text-left px-4 py-2.5 text-xs text-[#ECE6D8]/50 hover:bg-white/[0.04] hover:text-purple-300 border-b border-white/[0.03] flex items-center gap-2 transition-colors">
                    <i className="fa-solid fa-file-excel text-purple-400/50"></i> CSV Image Prompts
                  </button>
                  <button onClick={() => exportTXT('video')} className="w-full text-left px-4 py-2.5 text-xs text-[#ECE6D8]/50 hover:bg-white/[0.04] hover:text-green-300 border-b border-white/[0.03] flex items-center gap-2 transition-colors">
                    <i className="fa-regular fa-file-lines text-green-400/50"></i> TXT Video Prompts
                  </button>
                  <button onClick={() => exportTXT('image')} className="w-full text-left px-4 py-2.5 text-xs text-[#ECE6D8]/50 hover:bg-white/[0.04] hover:text-purple-300 flex items-center gap-2 transition-colors">
                    <i className="fa-regular fa-file-lines text-purple-400/50"></i> TXT Image Prompts
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pb-10">
        {!currentScript?.script ? (
          <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-[#ECE6D8]/20 py-20 border border-dashed border-white/[0.06] rounded-2xl bg-white/[0.01]">
            <div className="w-16 h-16 rounded-2xl bg-white/[0.03] flex items-center justify-center mb-4 animate-float">
              <i className="fa-solid fa-scroll text-3xl text-[#D4A574]/20"></i>
            </div>
            <p className="text-sm text-center leading-relaxed">
              Chưa có dữ liệu kịch bản.<br/>
              Hãy tạo kịch bản ở tab <strong className="text-[#D4A574]/60">"Viết Kịch Bản"</strong> trước.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {currentScript.script.map((scene: any, i: number) => {
              const prompt = mode === 'video' ? scene.video_prompt : scene.image_prompt;
              if (!prompt) return null;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                  className="dharma-card overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.04] bg-white/[0.02]">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="dharma-tag bg-[#D4A574]/10 text-[#D4A574]/70">#{scene.scene_number}</span>
                      <span className="text-[#ECE6D8]/20 text-xs">{scene.time}</span>
                      <span className="dharma-tag bg-purple-500/10 text-purple-400/70">{scene.section}</span>
                    </div>
                    <button onClick={() => copyToClipboard(prompt)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.06] rounded-lg text-xs text-[#ECE6D8]/40 transition-all font-bold hover:text-[#D4A574]/70">
                      <CopyIcon className="w-3 h-3" /> Copy
                    </button>
                  </div>
                  <div className="p-4">
                    <p className="text-[#ECE6D8]/50 text-sm leading-relaxed">{prompt}</p>
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