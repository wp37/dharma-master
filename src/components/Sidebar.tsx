import React from 'react';
type TabId = 'spy' | 'script' | 'studio';

interface SidebarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const tabs = [
  { id: 'spy' as TabId, icon: 'fa-brands fa-youtube', color: 'red', label: '1. PHÂN TÍCH KÊNH PHẬT PHÁP', desc: 'Phân Tích Kênh Thiền Định & Pháp Thoại', activeColor: 'amber', activeBg: 'amber-400/50', activeText: 'amber-900', inactiveBg: 'white/50', inactiveBorder: 'amber-200/30', inactiveText: 'amber-800/80' },
  { id: 'script' as TabId, icon: 'fa-solid fa-dharmachakra', color: 'teal', label: '2. VIẾT KỊCH BẢN PHÁP THOẠI', desc: 'Kịch bản giảng Phật pháp & thiền định', activeColor: 'amber', activeBg: 'amber-400/50', activeText: 'amber-900', inactiveBg: 'white/50', inactiveBorder: 'amber-200/30', inactiveText: 'amber-800/80' },
  { id: 'studio' as TabId, icon: 'fa-solid fa-place-of-worship', color: 'purple', label: '3. STUDIO SÁNG TẠO PHẬT GIÁO', desc: 'Prompt Video & Ảnh Phật Giáo', activeColor: 'purple', activeBg: 'purple-300/50', activeText: 'purple-900', inactiveBg: 'white/50', inactiveBorder: 'amber-200/30', inactiveText: 'amber-800/80' },
];

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="w-full md:w-64 flex md:flex-col gap-2 shrink-0 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
      {tabs.map(tab => {
        const isActive = activeTab === tab.id;
        return (
          <button key={tab.id} onClick={() => onTabChange(tab.id)}
            className={`p-5 rounded-2xl text-left border-2 transition-all duration-200 shrink-0 min-w-[200px] md:min-w-0 animate-slide-in ${
              isActive
                ? `bg-white/70 backdrop-blur-sm border-amber-400/50 text-amber-900 shadow-[0_2px_12px_rgba(212,165,116,0.2)] hover:bg-white/85 hover:border-amber-500/60`
                : `bg-white/50 backdrop-blur-sm border-amber-200/30 text-amber-800/80 shadow-[0_2px_8px_rgba(212,165,116,0.1)] hover:bg-white/70 hover:border-orange-300/40 hover:text-amber-900`
            }`}>
            <div className={`flex items-center gap-3 mb-2 ${isActive ? 'text-amber-700' : ''}`}>
              <i className={`${tab.icon} text-xl`}></i>
              <span className="font-black text-sm">{tab.label}</span>
            </div>
            <p className="text-[10px] opacity-60">{tab.desc}</p>
          </button>
        );
      })}
    </div>
  );
};

export default Sidebar;