import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
type TabId = 'spy' | 'script' | 'studio';
import ApiKeyModal from './components/ApiKeyModal';
import ToastContainer from './components/Toast';
import SpyModule from './pages/SpyModule';
import ScriptModule from './pages/ScriptModule';
import StudioModule from './pages/StudioModule';
import { KeyIcon } from './components/Icons';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('spy');
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [uiLang, setUiLang] = useState<'vi' | 'en'>('vi');
  const [currentScript, setCurrentScript] = useState<any>(null);

  const handleToggleLang = () => {
    setUiLang(prev => prev === 'vi' ? 'en' : 'vi');
  };

  const renderPage = () => {
    switch (activeTab) {
      case 'spy': return <SpyModule />;
      case 'script': return <ScriptModule onScriptGenerated={setCurrentScript} />;
      case 'studio': return <StudioModule currentScript={currentScript} />;
      default: return <SpyModule />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#EDE8DC] selection:bg-amber-200/30 overflow-hidden relative">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-1/2 h-[250px] bg-[#D4A574]/5 blur-[100px] rounded-full" />
      </div>

      <Header uiLang={uiLang} onToggleLang={handleToggleLang} />

      <div className="flex-1 flex flex-col md:flex-row overflow-y-auto relative z-10">
        <div className="flex md:flex-col gap-2 p-4 md:p-6 md:pr-0">
          <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        <div className="flex-1 p-4 md:p-6 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
              className="w-full">
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-amber-200/20 bg-[#2C2419]/80 text-amber-400/60 py-4 px-6 text-center text-xs relative z-10">
        <p>TUAI DHARMA MASTER © 2025 | Hỗ trợ: 0814666040 | <a href="https://zalo.me/0814666040" className="text-amber-400 hover:underline">zalo.me/0814666040</a></p>
      </footer>

      {/* API Key Modal */}
      <ApiKeyModal isOpen={showApiKeyModal} onClose={() => setShowApiKeyModal(false)} />

      {/* Toast */}
      <ToastContainer />

      {/* Floating API Button */}
      <button onClick={() => setShowApiKeyModal(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-[#2C2419]/90 backdrop-blur-xl border border-amber-900/50 hover:border-amber-600/50 rounded-2xl shadow-2xl transition-all hover:scale-105 group">
        <KeyIcon className="w-4 h-4 text-amber-400 group-hover:animate-pulse" />
        <span className="text-xs font-bold text-amber-200 group-hover:text-white">API Key</span>
      </button>
    </div>
  );
};

export default App;