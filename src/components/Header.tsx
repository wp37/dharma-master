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
    <header className="bg-[#060810]/95 backdrop-blur-md border-b border-teal-900/30 sticky top-0 z-50 shadow-[0_4px_30px_rgba(0,0,0,0.9)] flame-border">
      <div className="max-w-[1800px] mx-auto px-4 md:px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-teal-900 to-indigo-900 p-2.5 rounded-xl shadow-[0_0_20px_rgba(13,148,136,0.3)] border border-teal-500/20">
            <i className="fa-solid fa-dharmachakra text-teal-200 text-lg sacred-glow"></i>
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-black tracking-tighter text-white">
              TUAI <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-300 to-teal-400">DHARMA MASTER</span>
            </h1>
            <p className="text-[9px] text-teal-400/80 tracking-widest font-mono font-bold">V50.0 • PHẬT PHÁP & TRÍ TUỆ GIÁC NGỘ ✨</p>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          <a href="https://zalo.me/0814666040" target="_blank" rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold bg-teal-900/20 text-teal-300 border border-teal-500/20 hover:bg-teal-900/30 transition-all shadow-[0_0_15px_rgba(13,148,136,0.15)] group">
            <i className="fa-solid fa-headset sacred-glow"></i>
            <span className="group-hover:scale-105 transition-transform">Hỗ trợ: 08.14.666.040</span>
          </a>

          {/* Language Switcher */}
          <button onClick={onToggleLang}
            className="flex items-center gap-2 px-3 py-2 rounded-full text-xs font-bold bg-[#0a0e1a] text-slate-300 border border-white/10 hover:bg-[#111827] transition-all hover:text-white hover:border-teal-500/20">
            <span>{uiLang === 'vi' ? '🇻🇳' : '🇺🇸'}</span>
            <span>{uiLang === 'vi' ? 'VI' : 'EN'}</span>
          </button>

          {/* Config Button */}
          <button onClick={onOpenConfig}
            className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-full text-xs font-bold bg-[#0a0e1a] text-teal-200/50 border border-teal-900/30 hover:bg-[#111827] transition-all hover:text-teal-200 hover:border-teal-500/30">
            <i className="fa-solid fa-key"></i>
            <span className="hidden md:inline">Cấu Hình</span>
            <span className={`ml-1 px-1.5 py-0.5 rounded-full text-[9px] font-bold ${keyCount > 0 ? 'bg-teal-500/20 text-teal-400 border border-teal-500/30' : 'bg-slate-800 text-slate-400'}`}>
              {keyCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;