import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
type TabId = 'spy' | 'script' | 'studio';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ApiKeyModal from './components/ApiKeyModal';
import ToastContainer from './components/Toast';
import SpyModule from './pages/SpyModule';
import ScriptModule from './pages/ScriptModule';
import StudioModule from './pages/StudioModule';
import { hasApiKey as checkApiKey } from './services/geminiService';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('spy');
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [uiLang, setUiLang] = useState<'vi' | 'en'>('vi');
  const [currentScript, setCurrentScript] = useState<any>(null);
  const [apiKeyExists, setApiKeyExists] = useState(false);

  // Check API key on mount and after modal closes
  useEffect(() => {
    const exists = checkApiKey();
    setApiKeyExists(exists);
    // Auto-show modal if no key
    if (!exists) {
      setShowApiKeyModal(true);
    }
  }, []);

  const handleModalClose = () => {
    setShowApiKeyModal(false);
    setApiKeyExists(checkApiKey());
  };

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
    <div className="flex flex-col min-h-screen selection:bg-amber-400/10 overflow-hidden relative">
      {/* Aurora Ambient Glow Layers */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[10%] w-[500px] h-[400px] bg-[radial-gradient(ellipse,rgba(212,165,116,0.05)_0%,transparent_70%)] blur-[60px] rounded-full" />
        <div className="absolute bottom-[-5%] right-[5%] w-[400px] h-[350px] bg-[radial-gradient(ellipse,rgba(139,92,246,0.04)_0%,transparent_70%)] blur-[60px] rounded-full" />
        <div className="absolute top-[40%] left-[50%] w-[300px] h-[250px] bg-[radial-gradient(ellipse,rgba(212,165,116,0.03)_0%,transparent_60%)] blur-[50px] rounded-full" />
      </div>

      <Header
        uiLang={uiLang}
        onToggleLang={handleToggleLang}
        onOpenApiKey={() => setShowApiKeyModal(true)}
        hasApiKey={apiKeyExists}
      />

      <div className="flex-1 flex flex-col md:flex-row overflow-y-auto relative z-10 max-w-[1800px] mx-auto w-full">
        {/* Sidebar */}
        <div className="flex md:flex-col gap-2.5 p-4 md:p-6 md:pr-2 md:py-8">
          <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 md:px-8 md:py-8 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab}
              initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="w-full">
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/[0.04] bg-black/20 backdrop-blur-md text-[#ECE6D8]/30 py-3 px-6 text-center text-xs relative z-10">
        <p>TUAI DHARMA MASTER © 2025 | Hỗ trợ: 0814666040 | <a href="https://zalo.me/0814666040" className="text-[#D4A574]/60 hover:text-[#D4A574] hover:underline font-medium transition-colors">zalo.me/0814666040</a></p>
      </footer>

      {/* API Key Modal */}
      <ApiKeyModal isOpen={showApiKeyModal} onClose={handleModalClose} />

      {/* Toast */}
      <ToastContainer />
    </div>
  );
};

export default App;