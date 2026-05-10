import React from 'react';
import { KeyIcon } from './Icons';

interface HeaderProps {
  uiLang: 'vi' | 'en';
  onToggleLang: () => void;
  onOpenApiKey: () => void;
  hasApiKey: boolean;
}

const Header: React.FC<HeaderProps> = ({ uiLang, onToggleLang, onOpenApiKey, hasApiKey }) => {
  return (
    <header className="relative bg-black/30 backdrop-blur-2xl border-b border-white/[0.04] sticky top-0 z-50">
      {/* Glowing top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4A574]/40 to-transparent" />

      <div className="max-w-[1800px] mx-auto px-4 md:px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-[#D4A574]/90 via-[#D89B6A]/85 to-[#C17D4A]/90 p-2.5 rounded-2xl shadow-[0_0_24px_rgba(212,165,116,0.2)] border border-[#D4A574]/20 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <i className="fa-solid fa-spa text-white text-lg drop-shadow-md relative z-10"></i>
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight font-display">
              <span className="text-[#ECE6D8] drop-shadow-sm">TUAI</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4A574] via-[#D89B6A] to-[#C17D4A]"> DHARMA MASTER</span>
            </h1>
            <p className="text-[9px] md:text-[10px] text-[#D4A574]/40 tracking-[0.15em] font-semibold mt-0.5">V1.0 • PHẬT PHÁP & TRÍ TUỆ GIÁC NGỘ ✨</p>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* API Key Settings Button */}
          <button onClick={onOpenApiKey}
            className={`flex items-center gap-2 px-3 py-2 md:px-4 md:py-2.5 rounded-xl text-xs font-bold transition-all duration-300 border group relative overflow-hidden ${
              hasApiKey
                ? 'bg-green-500/[0.08] border-green-500/20 hover:bg-green-500/[0.12] hover:border-green-500/30'
                : 'bg-red-500/[0.08] border-red-500/20 hover:bg-red-500/[0.12] hover:border-red-500/30'
            }`}>
            <div className={`w-2 h-2 rounded-full ${hasApiKey ? 'bg-green-400 animate-pulse' : 'bg-red-400 animate-pulse'}`}></div>
            <KeyIcon className={`w-3.5 h-3.5 ${hasApiKey ? 'text-green-400' : 'text-red-400'}`} />
            <span className={`hidden md:inline ${hasApiKey ? 'text-green-300' : 'text-red-300 font-extrabold'}`}>
              {hasApiKey ? 'API Key ✓' : 'Lấy API Key để sử dụng app'}
            </span>
            <span className={`md:hidden ${hasApiKey ? 'text-green-300' : 'text-red-300'}`}>
              {hasApiKey ? '✓' : 'API Key'}
            </span>
          </button>

          {/* Support */}
          <a href="https://zalo.me/0814666040" target="_blank" rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-teal-400/[0.06] text-teal-300/70 border border-teal-400/10 hover:bg-teal-400/[0.1] hover:border-teal-400/20 hover:text-teal-200 transition-all duration-300 group">
            <i className="fa-solid fa-headset text-teal-400/60"></i>
            <span>Hỗ trợ: 0814666040</span>
          </a>

          {/* Language Toggle */}
          <button onClick={onToggleLang}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-white/[0.04] text-[#ECE6D8]/60 border border-white/[0.06] hover:bg-white/[0.07] hover:border-[#D4A574]/15 hover:text-[#ECE6D8]/80 transition-all duration-300">
            <span>{uiLang === 'vi' ? '🇻🇳' : '🇺🇸'}</span>
            <span>{uiLang === 'vi' ? 'VI' : 'EN'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;