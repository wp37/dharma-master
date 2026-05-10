import React from 'react';
type TabId = 'spy' | 'script' | 'studio';

interface SidebarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const tabs = [
  {
    id: 'spy' as TabId,
    icon: 'fa-brands fa-youtube',
    label: 'PHÂN TÍCH KÊNH',
    step: '01',
    desc: 'Phân tích Video Phật Pháp & Thiền Định',
    accentColor: 'from-red-400 to-orange-500',
    dotColor: 'bg-red-400',
    glowColor: 'rgba(239,68,68,0.1)',
  },
  {
    id: 'script' as TabId,
    icon: 'fa-solid fa-dharmachakra',
    label: 'VIẾT KỊCH BẢN',
    step: '02',
    desc: 'Kịch bản giảng Phật pháp & thiền định',
    accentColor: 'from-amber-400 to-yellow-500',
    dotColor: 'bg-amber-400',
    glowColor: 'rgba(245,158,11,0.1)',
  },
  {
    id: 'studio' as TabId,
    icon: 'fa-solid fa-place-of-worship',
    label: 'STUDIO SÁNG TẠO',
    step: '03',
    desc: 'Prompt Video & Ảnh Phật Giáo',
    accentColor: 'from-purple-400 to-indigo-500',
    dotColor: 'bg-purple-400',
    glowColor: 'rgba(139,92,246,0.1)',
  },
];

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="sidebar-nav w-full md:w-[280px] flex md:flex-col gap-2.5 shrink-0 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
      {tabs.map((tab, index) => {
        const isActive = activeTab === tab.id;
        return (
          <button key={tab.id} onClick={() => onTabChange(tab.id)}
            className={`sidebar-tab relative p-4 md:p-[18px] rounded-2xl text-left transition-all duration-300 shrink-0 min-w-[200px] md:min-w-0 group ${
              isActive ? 'sidebar-tab-active' : 'sidebar-tab-inactive'
            }`}
            style={{
              animationDelay: `${index * 80}ms`,
              ...(isActive ? { boxShadow: `0 8px 32px ${tab.glowColor}, 0 2px 8px rgba(0,0,0,0.3)` } : {}),
            }}>
            {/* Gold Left Bar for Active */}
            {isActive && (
              <div className={`absolute top-0 left-0 w-full md:w-[3px] h-[3px] md:h-full rounded-full bg-gradient-to-r md:bg-gradient-to-b ${tab.accentColor}`}></div>
            )}

            <div className="flex items-center gap-3.5">
              {/* Icon */}
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                isActive
                  ? `bg-gradient-to-br ${tab.accentColor} text-white shadow-lg`
                  : 'bg-white/[0.04] text-[#ECE6D8]/30 group-hover:bg-white/[0.06] group-hover:text-[#ECE6D8]/50'
              }`}>
                <i className={`${tab.icon} text-base`}></i>
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={`text-[9px] font-black tracking-widest ${isActive ? 'text-[#D4A574]/80' : 'text-[#D4A574]/25'}`}>
                    {tab.step}
                  </span>
                  {/* Pulsing active dot */}
                  {isActive && (
                    <div className={`w-1.5 h-1.5 rounded-full ${tab.dotColor}`}
                      style={{ animation: 'activeDotPulse 2s ease-in-out infinite' }} />
                  )}
                  <span className={`font-extrabold text-[11px] tracking-wide truncate ${isActive ? 'text-[#ECE6D8]' : 'text-[#ECE6D8]/35 group-hover:text-[#ECE6D8]/55'}`}>
                    {tab.label}
                  </span>
                </div>
                <p className={`text-[10px] leading-relaxed truncate ${isActive ? 'text-[#ECE6D8]/45' : 'text-[#ECE6D8]/20 group-hover:text-[#ECE6D8]/30'}`}>
                  {tab.desc}
                </p>
              </div>

              {/* Active chevron */}
              {isActive && (
                <i className="fa-solid fa-chevron-right text-[8px] text-[#D4A574]/40 hidden md:block"></i>
              )}
            </div>
          </button>
        );
      })}
    </nav>
  );
};

export default Sidebar;