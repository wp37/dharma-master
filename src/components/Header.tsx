import React from 'react';

interface HeaderProps {
  uiLang: 'vi' | 'en';
  onToggleLang: () => void;
}

const Header: React.FC<HeaderProps> = ({ uiLang, onToggleLang }) => {
  return (
    <header className="bg-gradient-to-r from-amber-50/80 via-orange-50/70 to-purple-50/60 backdrop-blur-xl border-b border-amber-200/40 sticky top-0 z-50 shadow-[0_4px_20px_rgba(212,165,116,0.12)]">
      <div className="max-w-[1800px] mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-br from-amber-400/90 via-orange-400/85 to-amber-500/90 p-3 rounded-2xl shadow-[0_0_20px_rgba(212,165,116,0.3)] border border-amber-300/30 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <i className="fa-solid fa-spa text-white text-xl drop-shadow-md relative z-10"></i>
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight">
              <span className="text-amber-900 drop-shadow-sm">TUAI</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 drop-shadow-sm"> DHARMA MASTER</span>
            </h1>
            <p className="text-[10px] text-amber-700/80 tracking-[0.15em] font-semibold mt-0.5">V1.0 • PHẬT PHÁP & TRÍ TUỆ GIÁC NGỘ ✨</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <a href="https://zalo.me/0814666040" target="_blank" rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold bg-teal-600 text-white border border-teal-500 hover:bg-teal-700 transition-all shadow-[0_2px_12px_rgba(20,184,166,0.3)] hover:shadow-[0_4px_20px_rgba(20,184,166,0.5)] group">
            <i className="fa-solid fa-headset text-white"></i>
            <span className="group-hover:scale-105 transition-transform">Hỗ trợ: 0814666040</span>
          </a>
          <button onClick={onToggleLang}
            className="flex items-center gap-2 px-3 py-2 rounded-full text-xs font-bold bg-[#260a0a] text-slate-300 border border-white/10 hover:bg-[#3d1212] transition-all hover:text-white">
            <span>{uiLang === 'vi' ? '🇻🇳' : '🇺🇸'}</span>
            <span>{uiLang === 'vi' ? 'VI' : 'EN'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;