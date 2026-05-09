import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon, KeyIcon, CheckIcon, EyeIcon, EyeOffIcon } from './Icons';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const STORAGE_KEY = 'tuai-dharma-api-key';

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose }) => {
  const [apiKey, setApiKey] = useState('');
  const [savedKey, setSavedKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setApiKey(stored);
      setSavedKey(stored);
    }
  }, [isOpen]);

  const handleSave = () => {
    const trimmed = apiKey.trim();
    if (!trimmed) { setError('Vui lòng nhập API Key.'); return; }
    if (!trimmed.startsWith('AIza')) { setError('API Key phải bắt đầu bằng "AIza..."'); return; }
    localStorage.setItem(STORAGE_KEY, trimmed);
    setSavedKey(trimmed);
    setError('');
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleClear = () => {
    localStorage.removeItem(STORAGE_KEY);
    setApiKey('');
    setSavedKey('');
    setError('');
  };

  const maskedKey = savedKey ? savedKey.slice(0, 8) + '...' + savedKey.slice(-4) : '';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}
            className="bg-[#1A1410] border border-amber-900/40 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl"
          >
            <div className="p-6 border-b border-amber-900/30 flex items-center justify-between bg-[#2C2419]/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-900/30 flex items-center justify-center border border-amber-600/20">
                  <KeyIcon className="text-amber-400 w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-amber-100 font-bold">API Key Gemini</h3>
                  <p className="text-amber-400/50 text-xs">Kết nối AI với key riêng của bạn</p>
                </div>
              </div>
              <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center text-amber-500/50 hover:text-amber-200 hover:bg-amber-900/20 transition-colors">
                <XIcon className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {savedKey && (
                <div className="bg-green-900/20 border border-green-600/20 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckIcon className="text-green-400 w-4 h-4" />
                    <span className="text-green-400 text-sm font-bold">API Key đang hoạt động</span>
                  </div>
                  <p className="text-green-400/60 text-xs font-mono ml-6">{maskedKey}</p>
                </div>
              )}

              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-amber-400/70 block mb-2">Nhập Gemini API Key</label>
                <div className="relative">
                  <input
                    type={showKey ? 'text' : 'password'}
                    value={apiKey}
                    onChange={(e) => { setApiKey(e.target.value); setError(''); setSaved(false); }}
                    placeholder="AIzaSy..."
                    className="w-full bg-black border border-amber-900/40 rounded-xl px-4 py-3 pr-12 text-amber-100 font-mono text-sm outline-none focus:border-amber-500/50 transition-all"
                  />
                  <button onClick={() => setShowKey(!showKey)} className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-500/50 hover:text-amber-200 transition-colors">
                    {showKey ? <EyeOffIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                  </button>
                </div>
                {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
              </div>

              <div className="bg-[#2C2419]/50 border border-amber-900/20 rounded-xl p-4 space-y-2">
                <p className="text-amber-400/60 text-xs font-bold uppercase tracking-wider mb-2">Cách lấy API Key:</p>
                <ol className="text-amber-400/40 text-xs space-y-1.5 list-decimal list-inside">
                  <li>Vào <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline">aistudio.google.com/app/apikey</a></li>
                  <li>Đăng nhập Google → Create API Key</li>
                  <li>Sao chép và dán vào ô bên trên</li>
                </ol>
              </div>
            </div>

            <div className="p-6 border-t border-amber-900/30 flex gap-3">
              <button onClick={handleSave} className={`flex-1 py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-all ${saved ? 'bg-green-500 text-white' : 'bg-amber-600 hover:bg-amber-500 text-white'}`}>
                {saved ? <span className="flex items-center justify-center gap-2"><CheckIcon className="w-4 h-4" /> Đã Lưu</span> : 'Lưu & Sử Dụng'}
              </button>
              {savedKey && (
                <button onClick={handleClear} className="px-5 py-3 bg-[#2C2419] hover:bg-red-900/30 hover:text-red-400 border border-amber-900/20 hover:border-red-500/30 text-amber-400 rounded-xl font-bold uppercase tracking-widest text-xs transition-all">Xóa Key</button>
              )}
              <button onClick={onClose} className="px-5 py-3 bg-[#2C2419] hover:bg-[#3C3429] text-amber-400/70 rounded-xl font-bold text-xs transition-all">Đóng</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ApiKeyModal;