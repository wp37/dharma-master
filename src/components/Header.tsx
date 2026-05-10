import React from 'react';
import type { TabId } from '../data/constants';

interface HeaderProps {
  uiLang: 'vi' | 'en';
  onToggleLang: () => void;
  onOpenConfig: () => void;
  keyCount: number;
}

const Header: React.FC<HeaderProps> = ({ uiLang, onToggleLang, onOpenConfig, keyCount }) => {
  return (
    <header className="bg-[#0f0c05]/95 backdrop-blur-md border-b border-yellow-900/20 sticky top-0 z-50 shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
      <div className="max-w-[1800px] mx-auto px-4 md:px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-yellow-900 to-slate-900 p-2 rounded-lg shadow-[0_0_15px_rgba(234,179,8,0.3)] border border-yellow-500/20">
            <i className="fa-solid fa-dharmachakra text-yellow-100 text-lg pulse-glow"></i>
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-black tracking-tighter text-yellow-50">
              TUAI <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-400">DHARMA MASTER</span>
            </h1>
            <p className="text-[9px] text-yellow-500/80 tracking-widest font-mono font-bold">V50.0 • PHẬT PHÁP & TRÍ TUỆ GIÁC NGỘ ✨</p>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          <a href="https://zalo.me/0814666040" target="_blank" rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold bg-yellow-900/20 text-yellow-400 border border-yellow-500/20 hover:bg-yellow-900/30 transition-all shadow-[0_0_15px_rgba(234,179,8,0.2)] group">
            <i className="fa-solid fa-headset pulse-glow"></i>
            <span className="group-hover:scale-105 transition-transform">Hỗ trợ: 08.14.666.040</span>
          </a>

          {/* Language Switcher */}
          <button onClick={onToggleLang}
            className="flex items-center gap-2 px-3 py-2 rounded-full text-xs font-bold bg-[#1a1508] text-slate-300 border border-white/10 hover:bg-[#2a2510] transition-all hover:text-white">
            <span>{uiLang === 'vi' ? '🇻🇳' : '🇺🇸'}</span>
            <span>{uiLang === 'vi' ? 'VI' : 'EN'}</span>
          </button>

          {/* Config Button */}
          <button onClick={onOpenConfig}
            className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-full text-xs font-bold bg-[#1a1508] text-yellow-200/50 border border-yellow-900/30 hover:bg-[#2a2510] transition-all hover:text-yellow-200">
            <i className="fa-solid fa-key"></i>
            <span className="hidden md:inline">Config</span>
            <span className={`ml-1 px-1.5 py-0.5 rounded-full text-[9px] font-bold ${keyCount > 0 ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-slate-800 text-slate-400'}`}>
              {keyCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;