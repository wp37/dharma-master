import React, { useState } from 'react';
import { generateImage } from '../services/aiService';
import { showToast } from '../components/Toast';
import { arr } from '../services/safe';
import { safeCallAI } from '../services/safeCall';

interface Props { segments: any[]; }

function downloadFile(content: string, fileName: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = fileName; document.body.appendChild(a); a.click(); document.body.removeChild(a);
}

const StudioModule: React.FC<Props> = ({ segments: propSegments }) => {
  const [media, setMedia] = useState<Record<string, string>>({});
  const [generatingMap, setGeneratingMap] = useState<Record<string, boolean>>({});
  const [showExport, setShowExport] = useState(false);

  // localStorage fallback — read saved script if no prop data
  const segments = React.useMemo(() => {
    if (arr(propSegments).length > 0) return arr(propSegments);
    try {
      const saved = localStorage.getItem('dharma_last_script');
      return arr(saved ? JSON.parse(saved) : []);
    } catch { return []; }
  }, [propSegments]);

  const initialMode = React.useMemo(() => {
    const hasVideo = arr(segments).some(s => s.video_prompt && s.video_prompt.trim() !== '');
    const hasImage = arr(segments).some(s => s.image_prompt && s.image_prompt.trim() !== '');
    if (!hasVideo && hasImage) return 'image';
    return 'video';
  }, [segments]);

  const [mode, setMode] = useState<'video' | 'image'>(initialMode);

  React.useEffect(() => {
    const hasVideo = arr(segments).some(s => s.video_prompt && s.video_prompt.trim() !== '');
    const hasImage = arr(segments).some(s => s.image_prompt && s.image_prompt.trim() !== '');
    if (!hasVideo && hasImage) {
      setMode('image');
    } else {
      setMode('video');
    }
  }, [segments]);

  const copy = (t: string) => { navigator.clipboard.writeText(t); showToast('✅ Đã copy!', 'success'); };

  const genMedia = async (idx: number, isParallelCall = false) => {
    const key = `${idx}_${mode}`;
    if (generatingMap[key]) return;
    
    setGeneratingMap(prev => ({ ...prev, [key]: true }));
    try {
      const seg = segments[idx];
      let prompt = mode === 'video' ? seg.video_prompt : seg.image_prompt;
      if (!prompt) {
        if (!isParallelCall) showToast('Không tìm thấy prompt cho phân cảnh này.');
        return;
      }
      prompt += mode === 'video' ? ', 8k, cinematic lighting --no text' : ', masterpiece, 8k';
      
      const result = await safeCallAI(() => generateImage(prompt, mode === 'video' ? '16:9' : '1:1'));
      if (result) {
        setMedia(prev => ({ ...prev, [key]: result }));
      } else {
        if (!isParallelCall) showToast('Không vẽ được ảnh từ Google API.', 'error');
      }
    } catch (e: any) {
      if (!isParallelCall) showToast(e.message || 'Lỗi sinh ảnh', 'error');
    } finally {
      setGeneratingMap(prev => ({ ...prev, [key]: false }));
    }
  };

  const genAllParallel = async () => {
    const activeGenerating = Object.values(generatingMap).some(Boolean);
    if (activeGenerating) return;
    
    showToast('🚀 Bắt đầu vẽ song song tất cả các phân cảnh kịch bản...', 'success');
    const promises = arr(segments).map((_, idx) => genMedia(idx, true));
    await Promise.all(promises);
    showToast('✨ Hoàn thành vẽ toàn bộ phân cảnh song song!', 'success');
  };

  const exportCSV = () => {
    if (!arr(segments).length) return;
    let csv = '\uFEFFCảnh,Thời Gian,Phần,Lời Thoại,Video Prompt,Image Prompt\n';
    arr(segments).forEach((s, i) => {
      csv += `${i + 1},"${s.time}","${s.section}","${(s.voice_text || '').replace(/"/g, '""')}","${(s.video_prompt || '').replace(/"/g, '""')}","${(s.image_prompt || '').replace(/"/g, '""')}"\n`;
    });
    downloadFile(csv, `dharma_kich_ban_${Date.now()}.csv`, 'text/csv;charset=utf-8;');
    setShowExport(false);
  };

  const exportPrompts = (type: 'video' | 'image', format: 'csv' | 'txt') => {
    if (!arr(segments).length) return;
    if (format === 'csv') {
      let csv = `\uFEFFCảnh,${type} Prompt\n`;
      arr(segments).forEach((s, i) => { csv += `${i + 1},"${((type === 'video' ? s.video_prompt : s.image_prompt) || '').replace(/"/g, '""')}"\n`; });
      downloadFile(csv, `prompts_${type}_${Date.now()}.csv`, 'text/csv;charset=utf-8;');
    } else {
      const content = arr(segments).map(s => (type === 'video' ? s.video_prompt : s.image_prompt) || '').filter(Boolean).join('\n\n');
      downloadFile(content, `prompts_${type}_${Date.now()}.txt`, 'text/plain;charset=utf-8;');
    }
    setShowExport(false);
  };

  if (!arr(segments).length) return (
    <div className="h-full flex flex-col items-center justify-center animate-[slideIn_0.4s_ease-out]">
      <div className="text-center text-slate-500 py-10 italic">Chưa có dữ liệu kịch bản.<br/>Hãy tạo kịch bản ở tab <strong>"Pháp Thoại"</strong> trước.</div>
    </div>
  );

  return (
    <div className="flex flex-col h-full animate-[slideIn_0.4s_ease-out]">
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <h2 className="text-xl font-bold text-white flex items-center gap-2"><i className="fa-solid fa-place-of-worship text-violet-400" /> Xưởng Sáng Tạo Phật Giáo</h2>
        <div className="flex items-center gap-2">
          {/* Nút Tạo ảnh song song hàng loạt */}
          <button 
            onClick={genAllParallel} 
            disabled={Object.values(generatingMap).some(Boolean)}
            className="px-4 py-1.5 rounded text-xs font-bold flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-500 hover:to-amber-700 text-white border border-amber-500/30 transition-all shadow-[0_0_15px_rgba(245,158,11,0.2)] disabled:opacity-50"
          >
            {Object.values(generatingMap).some(Boolean) ? (
              <><i className="fa-solid fa-spinner animate-spin" /> Đang vẽ song song...</>
            ) : (
              <><i className="fa-solid fa-wand-magic-sparkles animate-pulse" /> Vẽ tất cả song song</>
            )}
          </button>
          
          <div className="flex bg-[#0a0e1a] rounded p-1 border border-white/5">
            <button onClick={() => setMode('video')} className={`px-4 py-1.5 rounded text-xs font-bold flex items-center gap-2 transition-colors ${mode === 'video' ? 'bg-cyan-900/50 text-cyan-100 shadow' : 'text-slate-400 hover:text-white'}`}><i className="fa-solid fa-video" /> VIDEO</button>
            <button onClick={() => setMode('image')} className={`px-4 py-1.5 rounded text-xs font-bold flex items-center gap-2 transition-colors ${mode === 'image' ? 'bg-purple-900/50 text-purple-100 shadow' : 'text-slate-400 hover:text-white'}`}><i className="fa-solid fa-image" /> ẢNH</button>
          </div>
          <div className="relative">
            <button onClick={() => setShowExport(!showExport)} className="px-4 py-1.5 rounded text-xs font-bold flex items-center gap-2 bg-teal-900/30 text-teal-300 hover:bg-teal-800/40 border border-teal-500/20"><i className="fa-solid fa-download" /> Tải Xuống <i className="fa-solid fa-chevron-down text-[10px]" /></button>
            {showExport && (
              <div className="absolute right-0 top-full mt-2 w-52 bg-[#0f1424] border border-white/10 rounded-xl shadow-xl z-50 overflow-hidden">
                <button onClick={exportCSV} className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:bg-white/5 border-b border-white/5 flex items-center gap-2"><i className="fa-solid fa-file-excel text-green-500" /> Excel Kịch Bản</button>
                <button onClick={() => exportPrompts('video', 'csv')} className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:bg-white/5 border-b border-white/5 flex items-center gap-2"><i className="fa-solid fa-file-video text-cyan-500" /> Excel Prompt Video</button>
                <button onClick={() => exportPrompts('image', 'csv')} className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:bg-white/5 border-b border-white/5 flex items-center gap-2"><i className="fa-solid fa-file-image text-purple-500" /> Excel Prompt Ảnh</button>
                <button onClick={() => exportPrompts('video', 'txt')} className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:bg-white/5 border-b border-white/5 flex items-center gap-2"><i className="fa-regular fa-file-lines text-cyan-500" /> TXT Prompt Video</button>
                <button onClick={() => exportPrompts('image', 'txt')} className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:bg-white/5 flex items-center gap-2"><i className="fa-regular fa-file-lines text-purple-500" /> TXT Prompt Ảnh</button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto space-y-4 pb-10">
        {arr(segments).map((seg: any, idx: number) => {
          const prompt = mode === 'video' ? seg.video_prompt : seg.image_prompt;
          const result = media[`${idx}_${mode}`];
          const isGenerating = generatingMap[`${idx}_${mode}`];
          
          return (
            <div key={idx} className="cosmic-card p-4 rounded-xl flex flex-col sm:flex-row gap-4 items-start hover:!border-teal-500/20 transition-colors relative overflow-hidden">
              <div className={`px-3 py-1.5 rounded text-xs font-bold text-white h-fit shadow-lg ${mode === 'video' ? 'bg-cyan-900/50' : 'bg-purple-900/50'}`}>CẢNH {idx + 1}</div>
              <div className="flex-1 w-full">
                <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">{mode === 'video' ? '🎬 PROMPT VIDEO' : '🖼️ PROMPT HÌNH ẢNH'}</div>
                <div className="relative group">
                  <p className="text-xs text-slate-300 font-mono mb-3 bg-[#060810]/50 p-3 rounded border border-white/5 leading-relaxed pr-10">{prompt || 'Chưa có prompt'}</p>
                  <button onClick={() => copy(prompt || '')} className="absolute top-2 right-2 p-1.5 bg-[#0a0e1a] text-slate-300 rounded hover:bg-teal-900/50 hover:text-white border border-white/5"><i className="fa-solid fa-copy" /></button>
                </div>
                <button 
                  onClick={() => genMedia(idx)} 
                  disabled={isGenerating}
                  className={`px-3 py-1.5 rounded border text-xs font-bold flex items-center gap-1 transition-colors disabled:opacity-50 ${mode === 'video' ? 'bg-cyan-900/20 text-cyan-400 border-cyan-500/20' : 'bg-purple-900/20 text-purple-400 border-purple-500/20'}`}
                >
                  {isGenerating ? (
                    <><i className="fa-solid fa-sync animate-spin" /> Đang vẽ...</>
                  ) : (
                    <><i className="fa-solid fa-magic" /> Vẽ {mode === 'video' ? 'Video' : 'Ảnh'}</>
                  )}
                </button>
              </div>
              <div className={`w-full sm:w-64 bg-black rounded border border-white/10 overflow-hidden shrink-0 flex items-center justify-center relative group ${mode === 'video' ? 'aspect-video' : 'aspect-square'}`}>
                {result ? (
                  <div className="relative group w-full h-full">
                    <img src={result} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <a href={result} download={`dharma_canh_${idx}.png`} className="px-3 py-1.5 bg-white text-black rounded text-xs font-bold flex items-center gap-1"><i className="fa-solid fa-cloud-download-alt" /> Tải Xuống</a>
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-4">
                    <i className={`fa-solid ${mode === 'video' ? 'fa-film' : 'fa-image'} text-2xl mb-2 opacity-50`} />
                    <div className="text-[10px] text-slate-500">Chưa có dữ liệu</div>
                  </div>
                )}
                
                {isGenerating && (
                  <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center space-y-2">
                    <i className="fa-solid fa-circle-notch text-amber-400 animate-spin text-2xl" />
                    <p className="text-[10px] text-amber-200 animate-pulse font-medium">Đang phác họa cảnh thiền...</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StudioModule;