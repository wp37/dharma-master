import React, { useState, useEffect } from 'react';
import { loadApiConfig, saveApiConfig } from '../services/aiService';
import type { ApiConfig } from '../services/aiService';

interface Props { isOpen: boolean; onClose: () => void; }

type TabId = 'gemini' | 'openrouter' | 'openai' | 'youtube';

const OPENROUTER_MODELS = [
  { value: 'google/gemini-2.0-flash-exp:free', label: 'Gemini 2.0 Flash (Free)' },
  { value: 'google/gemini-flash-1.5', label: 'Gemini 1.5 Flash' },
  { value: 'anthropic/claude-3.5-sonnet', label: 'Claude 3.5 Sonnet' },
  { value: 'meta-llama/llama-3.3-70b-instruct:free', label: 'Llama 3.3 70B (Free)' },
  { value: 'deepseek/deepseek-chat', label: 'DeepSeek Chat' },
  { value: 'mistralai/mistral-7b-instruct:free', label: 'Mistral 7B (Free)' },
];

const OPENAI_MODELS = [
  { value: 'gpt-4-turbo-preview', label: 'GPT-4 Turbo' },
  { value: 'gpt-4o', label: 'GPT-4o' },
  { value: 'gpt-4o-mini', label: 'GPT-4o Mini' },
  { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
];

const ApiKeyModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<TabId>('gemini');
  const [cfg, setCfg] = useState<ApiConfig | null>(null);
  const [keys, setKeys] = useState<string[]>(['']);

  useEffect(() => {
    if (isOpen) {
      const loaded = loadApiConfig();
      setCfg(loaded);
      setKeys(loaded.keyPool.length > 0 ? loaded.keyPool : ['']);
    }
  }, [isOpen]);

  if (!isOpen || !cfg) return null;

  const updateGeminiKey = (i: number, v: string) => {
    const k = [...keys]; k[i] = v; setKeys(k);
    saveApiConfig({ keyPool: k });
  };
  const addKey = () => setKeys([...keys, '']);
  const removeKey = (i: number) => {
    const k = keys.filter((_, x) => x !== i);
    const next = k.length ? k : [''];
    setKeys(next);
    saveApiConfig({ keyPool: next });
  };

  const updateField = (field: Partial<ApiConfig>) => {
    const next = { ...cfg, ...field };
    setCfg(next);
    saveApiConfig(field);
  };

  const toggleProvider = (provider: 'google' | 'openrouter' | 'openai' | 'youtube') => {
    const next = { ...cfg.apiEnabled, [provider]: !cfg.apiEnabled[provider] };
    updateField({ apiEnabled: next });
  };

  const geminiValid = keys.filter(k => k.trim().startsWith('AIza')).length > 0;
  const openRouterValid = cfg.apiEnabled.openrouter && cfg.openRouterKey.trim().length > 10;
  const openAiValid = cfg.apiEnabled.openai && cfg.openAiKey.trim().startsWith('sk-');
  const canClose = geminiValid || openRouterValid || openAiValid;

  const TABS: { id: TabId; icon: string; label: string; badge?: string; active: boolean }[] = [
    { id: 'gemini', icon: 'fa-brands fa-google', label: 'Gemini', badge: keys.filter(k=>k.trim().startsWith('AIza')).length.toString(), active: cfg.apiEnabled.google },
    { id: 'openrouter', icon: 'fa-solid fa-route', label: 'OpenRouter', active: cfg.apiEnabled.openrouter },
    { id: 'openai', icon: 'fa-solid fa-robot', label: 'OpenAI', active: cfg.apiEnabled.openai },
    { id: 'youtube', icon: 'fa-brands fa-youtube', label: 'YouTube', active: cfg.apiEnabled.youtube },
  ];

  return (
    <div className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={e => e.target === e.currentTarget && canClose && onClose()}>
      <div className="bg-[#0f1424] border border-teal-900/30 w-full max-w-lg rounded-2xl shadow-[0_0_60px_rgba(13,148,136,0.15)] overflow-hidden">

        {/* Header */}
        <div className="px-6 pt-5 pb-4 border-b border-white/5">
          <div className="flex items-center gap-3 mb-1">
            <div className="bg-teal-900/30 p-2 rounded-lg border border-teal-500/20">
              <i className="fa-solid fa-key text-teal-400" />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">Cấu Hình API</h3>
              <p className="text-[11px] text-slate-500">Bật ít nhất 1 provider để sử dụng AI</p>
            </div>
          </div>

          {/* Provider Status Bar */}
          <div className="flex gap-2 mt-3">
            {TABS.map(t => (
              <div key={t.id}
                className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-bold border transition-all ${
                  t.id === 'gemini' && geminiValid ? 'bg-teal-900/30 border-teal-500/40 text-teal-300' :
                  t.id === 'openrouter' && openRouterValid ? 'bg-blue-900/30 border-blue-500/40 text-blue-300' :
                  t.id === 'openai' && openAiValid ? 'bg-green-900/30 border-green-500/40 text-green-300' :
                  t.active ? 'bg-amber-900/20 border-amber-500/30 text-amber-400' :
                  'bg-white/5 border-white/10 text-slate-500'
                }`}
              >
                <i className={`${t.icon} text-[9px]`} />
                {t.label}
                {((t.id === 'gemini' && geminiValid) || (t.id === 'openrouter' && openRouterValid) || (t.id === 'openai' && openAiValid)) && (
                  <i className="fa-solid fa-circle-check text-[9px]" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Tab Nav */}
        <div className="flex border-b border-white/5">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className={`flex-1 py-2.5 text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all ${
                activeTab === t.id
                  ? 'text-teal-300 border-b-2 border-teal-500 bg-teal-900/10'
                  : 'text-slate-500 hover:text-white border-b-2 border-transparent'
              }`}>
              <i className={`${t.icon} text-[11px]`} />
              {t.label}
              {t.id === 'gemini' && geminiValid && <span className="bg-teal-500 text-white text-[8px] px-1 rounded-full">{keys.filter(k=>k.trim().startsWith('AIza')).length}</span>}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="px-6 py-5 space-y-4 max-h-[380px] overflow-y-auto">

          {/* ── GEMINI TAB ── */}
          {activeTab === 'gemini' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-white">Google Gemini</div>
                  <div className="text-[10px] text-slate-500">Pool nhiều keys → Round Robin tự động</div>
                </div>
                <button onClick={() => toggleProvider('google')}
                  className={`w-10 h-5 rounded-full transition-all relative ${cfg.apiEnabled.google ? 'bg-teal-500' : 'bg-slate-700'}`}>
                  <div className={`w-3.5 h-3.5 rounded-full bg-white absolute top-0.5 transition-all ${cfg.apiEnabled.google ? 'left-5' : 'left-0.5'}`} />
                </button>
              </div>
              <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer"
                className="block text-center py-1.5 px-4 bg-teal-900/10 border border-teal-500/20 rounded-lg text-[11px] text-teal-400 font-bold hover:bg-teal-900/20 transition-all">
                🔑 Lấy Gemini API Key miễn phí tại đây
              </a>
              <div className="space-y-2">
                {keys.map((k, i) => (
                  <div key={i} className="flex gap-2">
                    <input type="password" value={k} onChange={e => updateGeminiKey(i, e.target.value)}
                      className={`flex-1 bg-[#060810] border rounded-lg p-2.5 text-sm font-mono placeholder-white/20 outline-none transition-colors ${
                        k.trim().startsWith('AIza') ? 'border-teal-500/40 text-teal-200' : 'border-white/10 text-white focus:border-teal-500/40'
                      }`}
                      placeholder="AIzaSy..." />
                    {k.trim().startsWith('AIza') && <i className="fa-solid fa-circle-check text-teal-400 self-center text-sm" />}
                    {keys.length > 1 && (
                      <button onClick={() => removeKey(i)} className="text-red-500/50 hover:text-red-300 p-2">
                        <i className="fa-solid fa-trash text-sm" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button onClick={addKey} className="text-xs text-teal-400 hover:text-teal-300 flex items-center gap-1.5 hover:underline">
                <i className="fa-solid fa-plus" /> Thêm Key Gmail khác (để tăng hạn mức)
              </button>
              {!geminiValid && (
                <div className="text-[11px] text-amber-400 bg-amber-900/10 border border-amber-500/20 rounded-lg p-2 flex items-center gap-2">
                  <i className="fa-solid fa-triangle-exclamation" /> Key phải bắt đầu bằng "AIzaSy..."
                </div>
              )}
            </div>
          )}

          {/* ── OPENROUTER TAB ── */}
          {activeTab === 'openrouter' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-white">OpenRouter</div>
                  <div className="text-[10px] text-slate-500">Dự phòng tự động khi Gemini hết quota</div>
                </div>
                <button onClick={() => toggleProvider('openrouter')}
                  className={`w-10 h-5 rounded-full transition-all relative ${cfg.apiEnabled.openrouter ? 'bg-blue-500' : 'bg-slate-700'}`}>
                  <div className={`w-3.5 h-3.5 rounded-full bg-white absolute top-0.5 transition-all ${cfg.apiEnabled.openrouter ? 'left-5' : 'left-0.5'}`} />
                </button>
              </div>
              <a href="https://openrouter.ai/keys" target="_blank" rel="noopener noreferrer"
                className="block text-center py-1.5 px-4 bg-blue-900/10 border border-blue-500/20 rounded-lg text-[11px] text-blue-400 font-bold hover:bg-blue-900/20 transition-all">
                🔑 Lấy OpenRouter API Key tại đây
              </a>
              <div>
                <label className="text-[10px] text-slate-400 font-bold uppercase mb-1.5 block">API Key</label>
                <input type="password" value={cfg.openRouterKey}
                  onChange={e => updateField({ openRouterKey: e.target.value })}
                  className="w-full bg-[#060810] border border-white/10 rounded-lg p-2.5 text-sm font-mono text-white placeholder-white/20 outline-none focus:border-blue-500/40"
                  placeholder="sk-or-..." />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 font-bold uppercase mb-1.5 block">Model</label>
                <select value={cfg.openRouterModel}
                  onChange={e => updateField({ openRouterModel: e.target.value })}
                  className="w-full bg-[#060810] border border-white/10 rounded-lg p-2.5 text-sm text-white outline-none focus:border-blue-500/40 cursor-pointer">
                  {OPENROUTER_MODELS.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
                </select>
              </div>
              <div className="text-[10px] text-slate-500 bg-white/5 rounded-lg p-2 border border-white/5">
                💡 Gemini 2.0 Flash (Free) hoạt động rất tốt cho kịch bản Phật pháp và không tốn phí.
              </div>
            </div>
          )}

          {/* ── OPENAI TAB ── */}
          {activeTab === 'openai' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-white">OpenAI</div>
                  <div className="text-[10px] text-slate-500">Dự phòng cuối khi tất cả API khác thất bại</div>
                </div>
                <button onClick={() => toggleProvider('openai')}
                  className={`w-10 h-5 rounded-full transition-all relative ${cfg.apiEnabled.openai ? 'bg-green-500' : 'bg-slate-700'}`}>
                  <div className={`w-3.5 h-3.5 rounded-full bg-white absolute top-0.5 transition-all ${cfg.apiEnabled.openai ? 'left-5' : 'left-0.5'}`} />
                </button>
              </div>
              <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer"
                className="block text-center py-1.5 px-4 bg-green-900/10 border border-green-500/20 rounded-lg text-[11px] text-green-400 font-bold hover:bg-green-900/20 transition-all">
                🔑 Lấy OpenAI API Key tại đây
              </a>
              <div>
                <label className="text-[10px] text-slate-400 font-bold uppercase mb-1.5 block">API Key</label>
                <input type="password" value={cfg.openAiKey}
                  onChange={e => updateField({ openAiKey: e.target.value })}
                  className={`w-full bg-[#060810] border rounded-lg p-2.5 text-sm font-mono placeholder-white/20 outline-none transition-colors ${
                    cfg.openAiKey.startsWith('sk-') ? 'border-green-500/40 text-green-200' : 'border-white/10 text-white focus:border-green-500/40'
                  }`}
                  placeholder="sk-..." />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 font-bold uppercase mb-1.5 block">Model</label>
                <select value={cfg.openAiModel}
                  onChange={e => updateField({ openAiModel: e.target.value })}
                  className="w-full bg-[#060810] border border-white/10 rounded-lg p-2.5 text-sm text-white outline-none focus:border-green-500/40 cursor-pointer">
                  {OPENAI_MODELS.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
                </select>
              </div>
            </div>
          )}

          {/* ── YOUTUBE TAB ── */}
          {activeTab === 'youtube' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-white">YouTube Data API</div>
                  <div className="text-[10px] text-slate-500">Bật để phân tích đối thủ với dữ liệu đầy đủ (views, likes, tags)</div>
                </div>
                <button onClick={() => toggleProvider('youtube')}
                  className={`w-10 h-5 rounded-full transition-all relative ${cfg.apiEnabled.youtube ? 'bg-red-500' : 'bg-slate-700'}`}>
                  <div className={`w-3.5 h-3.5 rounded-full bg-white absolute top-0.5 transition-all ${cfg.apiEnabled.youtube ? 'left-5' : 'left-0.5'}`} />
                </button>
              </div>
              <a href="https://console.cloud.google.com/apis/library/youtube.googleapis.com" target="_blank" rel="noopener noreferrer"
                className="block text-center py-1.5 px-4 bg-red-900/10 border border-red-500/20 rounded-lg text-[11px] text-red-400 font-bold hover:bg-red-900/20 transition-all">
                🔑 Bật YouTube Data API tại Google Console
              </a>
              <div>
                <label className="text-[10px] text-slate-400 font-bold uppercase mb-1.5 block">YouTube API Key</label>
                <input type="password" value={cfg.youtubeApiKey}
                  onChange={e => updateField({ youtubeApiKey: e.target.value })}
                  className="w-full bg-[#060810] border border-white/10 rounded-lg p-2.5 text-sm font-mono text-white placeholder-white/20 outline-none focus:border-red-500/40"
                  placeholder="AIzaSy... (Gemini key cũng hoạt động nếu đã bật YouTube API)" />
              </div>
              <div className="text-[10px] text-slate-500 bg-white/5 rounded-lg p-2 border border-white/5">
                💡 Nếu không có key này, Spy Module vẫn hoạt động nhưng chỉ lấy được tiêu đề và thumbnail (oEmbed fallback).
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 pb-5 border-t border-white/5 pt-4">
          {!canClose && (
            <div className="text-[11px] text-amber-400 bg-amber-900/10 border border-amber-500/20 rounded-lg p-2 mb-3 flex items-center gap-2">
              <i className="fa-solid fa-triangle-exclamation" />
              Cần ít nhất 1 provider hợp lệ: Gemini (AIzaSy...), OpenRouter, hoặc OpenAI (sk-...)
            </div>
          )}
          <button onClick={onClose} disabled={!canClose}
            className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
              canClose ? 'btn-sacred hover:scale-[1.01]' : 'bg-slate-800 text-slate-500 border border-white/5 cursor-not-allowed'
            }`}>
            <i className={`fa-solid ${canClose ? 'fa-check-circle' : 'fa-lock'}`} />
            {canClose ? 'LƯU CẤU HÌNH & TIẾP TỤC' : 'NHẬP API KEY ĐỂ TIẾP TỤC'}
          </button>
          <p className="text-[10px] text-slate-600 mt-2 text-center">🔒 Keys lưu an toàn trong trình duyệt của bạn, không gửi về server</p>
          <p className="text-[11px] text-amber-400/80 mt-2 text-center bg-amber-950/20 p-2 rounded-lg border border-amber-500/10">
            ⚠️ Key chỉ lưu trên trình duyệt này (localStorage). Không gửi lên server. Xóa dữ liệu trình duyệt = mất key. Đừng sử dụng máy công cộng.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyModal;