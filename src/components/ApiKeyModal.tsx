import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon, KeyIcon, CheckIcon, EyeIcon, EyeOffIcon } from './Icons';
import { resetAiInstance, MODEL_LIST, getSelectedModel, setSelectedModel } from '../services/geminiService';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const STORAGE_KEY = 'tuai-dharma-api-key';

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose }) => {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [selectedModelId, setSelectedModelId] = useState(getSelectedModel());

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setApiKey(stored);
    setSelectedModelId(getSelectedModel());
  }, [isOpen]);

  const handleSave = () => {
    const trimmed = apiKey.trim();
    if (!trimmed) { setError('Vui lòng nhập API Key.'); return; }
    if (!trimmed.startsWith('AIza')) { setError('API Key phải bắt đầu bằng "AIza..."'); return; }
    localStorage.setItem(STORAGE_KEY, trimmed);
    resetAiInstance();
    setError('');
    setSaved(true);
    setTimeout(() => { setSaved(false); onClose(); }, 1000);
  };

  const handleModelSelect = (modelId: string) => {
    setSelectedModelId(modelId);
    setSelectedModel(modelId);
  };

  const hasKey = !!localStorage.getItem(STORAGE_KEY);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && hasKey && onClose()}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#0a0e1a]/95 backdrop-blur-2xl border border-white/[0.06] rounded-2xl w-full max-w-md overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.6)]"
          >
            {/* Gold glow line */}
            <div className="h-[1px] bg-gradient-to-r from-transparent via-[#D4A574]/40 to-transparent" />

            {/* Content */}
            <div className="p-6 space-y-5">
              {/* Title row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#D4A574] to-[#C17D4A] flex items-center justify-center shadow-[0_0_20px_rgba(212,165,116,0.2)]">
                    <KeyIcon className="text-[#0a0e1a] w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-[#ECE6D8] font-bold text-sm">Cài Đặt AI</h3>
                    <p className="text-[#ECE6D8]/25 text-[10px]">Nhập key để sử dụng app</p>
                  </div>
                </div>
                {hasKey && (
                  <button onClick={onClose} className="w-7 h-7 rounded-full flex items-center justify-center text-[#ECE6D8]/20 hover:text-[#ECE6D8]/50 hover:bg-white/[0.04] transition-all">
                    <XIcon className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* API Key Input */}
              <div>
                <div className="relative">
                  <input
                    type={showKey ? 'text' : 'password'}
                    value={apiKey}
                    onChange={(e) => { setApiKey(e.target.value); setError(''); setSaved(false); }}
                    placeholder="Dán API Key vào đây (AIzaSy...)"
                    className="w-full !bg-white/[0.04] !border-white/[0.08] rounded-xl px-4 py-3.5 pr-12 text-[#ECE6D8] font-mono text-sm outline-none focus:!border-[#D4A574]/30"
                  />
                  <button onClick={() => setShowKey(!showKey)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#ECE6D8]/20 hover:text-[#D4A574]/60 transition-colors">
                    {showKey ? <EyeOffIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                  </button>
                </div>
                {error && <p className="text-red-400/80 text-xs mt-2 flex items-center gap-1"><i className="fa-solid fa-circle-exclamation"></i> {error}</p>}
              </div>

              {/* Link lấy API — đơn giản */}
              <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-sm text-[#D4A574]/70 font-bold hover:text-[#D4A574] transition-colors">
                <i className="fa-solid fa-arrow-up-right-from-square text-xs"></i> Lấy API tại đây
              </a>

              {/* Model Selection — compact */}
              <div>
                <label className="text-[10px] font-bold text-[#ECE6D8]/25 uppercase tracking-widest block mb-2">Chọn Model</label>
                <div className="flex gap-1.5">
                  {MODEL_LIST.map(model => {
                    const isSelected = selectedModelId === model.id;
                    return (
                      <button key={model.id} onClick={() => handleModelSelect(model.id)}
                        className={`flex-1 text-center py-2 px-2 rounded-lg text-[10px] font-bold transition-all duration-300 border ${
                          isSelected
                            ? 'bg-[#D4A574]/[0.08] border-[#D4A574]/20 text-[#D4A574]'
                            : 'bg-white/[0.02] border-white/[0.04] text-[#ECE6D8]/30 hover:text-[#ECE6D8]/50'
                        }`}>
                        {model.name.replace('Gemini ', '')}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Save Button */}
              <button onClick={handleSave}
                className={`w-full py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-all duration-300 ${
                  saved
                    ? 'bg-green-500/20 text-green-300 border border-green-500/20'
                    : 'dharma-btn-primary'
                }`}>
                {saved ? <span className="flex items-center justify-center gap-2"><CheckIcon className="w-4 h-4" /> Đã Lưu!</span> : 'Lưu & Sử Dụng'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ApiKeyModal;