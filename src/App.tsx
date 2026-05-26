import React, { useState, useEffect } from 'react';
import type { TabId } from './data/constants';
import { loadApiConfig, getValidKeyCount, hasAnyApiKey } from './services/aiService';
import { getCurrentLicense } from './services/licenseService';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ApiKeyModal from './components/ApiKeyModal';
import LicenseGate from './components/LicenseGate';
import ToastContainer from './components/Toast';
import SpyModule from './pages/SpyModule';
import ScriptModule from './pages/ScriptModule';
import StudioModule from './pages/StudioModule';
import SeoModule from './pages/SeoModule';
import AdminModule from './pages/AdminModule';

const App: React.FC = () => {
  // Detect /admin URL path for direct admin access
  const isAdminUrl = window.location.pathname.toLowerCase().includes('/admin');
  const [activeTab, setActiveTab] = useState<TabId>(isAdminUrl ? 'admin' : 'spy');
  const [licensed, setLicensed] = useState(true); // TODO: set back to false for commercial release
  const [showConfig, setShowConfig] = useState(false);
  const [uiLang, setUiLang] = useState<'vi' | 'en'>('vi');
  const [keyCount, setKeyCount] = useState(0);
  const [scriptSegments, setScriptSegments] = useState<any[]>([]);
  const [strategyTopic, setStrategyTopic] = useState('');

  useEffect(() => {
    loadApiConfig();
    setKeyCount(getValidKeyCount());
    if (!hasAnyApiKey()) setShowConfig(true);
    // Check license status on mount
    // setLicensed(getCurrentLicense().valid); // TODO: uncomment for commercial release
  }, []);

  const handleConfigClose = () => {
    setShowConfig(false);
    setKeyCount(getValidKeyCount());
  };

  const handleScriptGenerated = (segs: any[], _style: string) => {
    setScriptSegments(segs);
    setActiveTab('seo');
  };

  const handleUseStrategy = (title: string) => {
    setStrategyTopic(title);
    setActiveTab('script');
  };

  // License Gate — block content tabs, always allow admin tab
  if (!licensed && activeTab !== 'admin') {
    return (
      <div className="min-h-screen flex flex-col relative z-10">
        <LicenseGate onActivated={() => setLicensed(true)} />
        <ToastContainer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col relative z-10">
      <Header
        uiLang={uiLang}
        onToggleLang={() => setUiLang(p => p === 'vi' ? 'en' : 'vi')}
        onOpenConfig={() => setShowConfig(true)}
        keyCount={keyCount}
      />

      <main className="flex-1 max-w-[1800px] mx-auto w-full p-4 md:p-6 flex flex-col md:flex-row gap-4 md:gap-6 md:h-[calc(100vh-70px)] h-auto">
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          hasScriptData={scriptSegments.length > 0}
        />
        <div className="flex-1 bg-[#0a0e1a]/60 rounded-2xl border border-teal-900/10 p-4 md:p-6 md:overflow-y-auto relative min-h-[500px] backdrop-blur-md shadow-[inset_0_0_60px_-20px_rgba(13,148,136,0.04)]">
          <div style={{ display: activeTab === 'spy' ? 'block' : 'none' }}>
            <SpyModule onUseStrategy={handleUseStrategy} />
          </div>
          <div style={{ display: activeTab === 'script' ? 'block' : 'none' }}>
            <ScriptModule onScriptGenerated={handleScriptGenerated} initialTopic={strategyTopic} />
          </div>
          <div style={{ display: activeTab === 'studio' ? 'block' : 'none' }}>
            <StudioModule segments={scriptSegments} />
          </div>
          <div style={{ display: activeTab === 'seo' ? 'block' : 'none' }}>
            <SeoModule initialTopic={strategyTopic} />
          </div>
          <div style={{ display: activeTab === 'admin' ? 'block' : 'none' }}>
            <AdminModule />
          </div>
        </div>
      </main>

      <footer className="relative border-t border-teal-900/20 py-6 bg-[#060810] flame-border">
        <div className="relative max-w-6xl mx-auto px-4 text-center z-10">
          <div className="text-slate-500 text-xs font-light tracking-wide">
            TUAI DHARMA MASTER © {new Date().getFullYear()} | Hỗ trợ: 0814666040 | zalo.me/0814666040
          </div>
        </div>
      </footer>

      <ApiKeyModal isOpen={showConfig} onClose={handleConfigClose} />
      <ToastContainer />
    </div>
  );
};

export default App;