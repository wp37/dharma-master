import React, { useState, useEffect } from 'react';
import type { TabId } from './data/constants';
import { loadApiConfig, getValidKeyCount, hasAnyApiKey } from './services/aiService';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ApiKeyModal from './components/ApiKeyModal';
import ToastContainer from './components/Toast';
import SpyModule from './pages/SpyModule';
import ScriptModule from './pages/ScriptModule';
import StudioModule from './pages/StudioModule';
import SeoModule from './pages/SeoModule';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('spy');
  const [showConfig, setShowConfig] = useState(false);
  const [uiLang, setUiLang] = useState<'vi' | 'en'>('vi');
  const [keyCount, setKeyCount] = useState(0);
  const [scriptSegments, setScriptSegments] = useState<any[]>([]);
  const [strategyTopic, setStrategyTopic] = useState('');

  useEffect(() => {
    loadApiConfig();
    setKeyCount(getValidKeyCount());
    if (!hasAnyApiKey()) setShowConfig(true);
  }, []);

  const handleConfigClose = () => {
    setShowConfig(false);
    setKeyCount(getValidKeyCount());
  };

  const handleScriptGenerated = (segs: any[], _style: string) => {
    setScriptSegments(segs);
    setActiveTab('studio');
  };

  const handleUseStrategy = (title: string) => {
    setStrategyTopic(title);
    setActiveTab('script');
  };

  const renderPage = () => {
    switch (activeTab) {
      case 'spy': return <SpyModule onUseStrategy={handleUseStrategy} />;
      case 'script': return <ScriptModule onScriptGenerated={handleScriptGenerated} initialTopic={strategyTopic} />;
      case 'studio': return <StudioModule segments={scriptSegments} />;
      case 'seo': return <SeoModule initialTopic={strategyTopic} />;
      default: return <SpyModule onUseStrategy={handleUseStrategy} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
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
        <div className="flex-1 bg-[#0a0a0a]/60 rounded-2xl border border-white/5 p-4 md:p-6 md:overflow-y-auto relative min-h-[500px] backdrop-blur-md shadow-[inset_0_0_50px_-20px_rgba(234,179,8,0.05)]">
          {renderPage()}
        </div>
      </main>

      <footer className="relative border-t border-yellow-900/20 py-6 bg-[#0a0805]">
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