import React from 'react';
import { TAB_COLORS, TAB_NAMES, type TabId } from '../data/constants';

interface SidebarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  hasScriptData: boolean;
}

const CONTENT_TABS: TabId[] = ['spy', 'script', 'studio', 'seo'];

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, hasScriptData }) => {
  const renderTab = (tabId: TabId) => {
    const isActive = activeTab === tabId;
    const isStudioDisabled = tabId === 'studio' && !hasScriptData && !isActive;
    const colors = TAB_COLORS[tabId];
    const info = TAB_NAMES[tabId];

    return (
      <button
        key={tabId}
        onClick={() => onTabChange(tabId)}
        disabled={isStudioDisabled}
        className={`sidebar-item p-4 rounded-xl text-left border transition-all shrink-0 min-w-[200px] md:min-w-0 ${
          isActive
            ? `active ${colors.bg} ${colors.border} ${colors.text} ${colors.shadow} backdrop-blur-sm`
            : `bg-transparent border-transparent text-slate-500 hover:bg-[#0a0e1a] hover:text-teal-200/80 hover:border-teal-900/20 ${isStudioDisabled ? 'opacity-30 cursor-not-allowed' : ''}`
        }`}
      >
        <div className="flex items-center gap-3 mb-1">
          <i className={`${info.icon} text-lg`}></i>
          <span className="font-bold text-sm">{info.name}</span>
        </div>
        <p className="text-[10px] opacity-60">{info.desc}</p>
      </button>
    );
  };

  return (
    <div className="w-full md:w-64 flex md:flex-col gap-2 shrink-0 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
      {CONTENT_TABS.map(renderTab)}
      {/* Admin separator */}
      <div className="hidden md:block border-t border-white/5 my-1"></div>
      {renderTab('admin')}
    </div>
  );
};

export default Sidebar;