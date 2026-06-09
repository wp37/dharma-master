import React, { useState, useEffect, useCallback } from 'react';
import { loadApiConfig, saveApiConfig } from '../services/aiService';
import type { ApiConfig, ApiTestResult } from '../services/aiService';
import {
  testGeminiKey,
  testOpenRouterKey,
  testOpenAIKey,
  testYouTubeKey,
} from '../services/aiService';

interface Props { isOpen: boolean; onClose: () => void; }

type TabId = 'gemini' | 'openrouter' | 'openai' | 'youtube';

type TestStatus = 'idle' | 'loading' | 'ok' | 'error';
interface KeyStatus { status: TestStatus; result?: ApiTestResult }

const OPENROUTER_MODELS = [
  { value: 'google/gemini-2.5-flash-lite', label: 'Gemini 2.5 Flash Lite (Free)' },
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

/* ── Helper badge ── */
function StatusBadge({ ks }: { ks: KeyStatus }) {
  if (ks.status === 'loading') return (
    <span className="flex items-center gap-1 text-[10px] text-amber-300 font-bold animate-pulse">
      <i className="fa-solid fa-circle-notch fa-spin text-[9px]" /> Đang test…
    </span>
  );
  if (ks.status === 'ok') return (
    <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold">
      <i className="fa-solid fa-circle-check text-[10px]" />
      OK {ks.result?.latencyMs != null && <span className="text-emerald-600">{ks.result.latencyMs}ms</span>}
    </span>
  );
  if (ks.status === 'error') return (
    <span className="flex items-center gap-1 text-[10px] text-red-400 font-bold max-w-[180px] truncate" title={ks.result?.error}>
      <i className="fa-solid fa-circle-xmark text-[10px]" /> {ks.result?.error || 'Lỗi'}
    </span>
  );
  return null;
}

function TestButton({ onClick, loading }: { onClick: () => void; loading: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      title="Kiểm tra key ngay"
      className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-bold border transition-all select-none
        ${loading
          ? 'bg-slate-700/60 border-white/10 text-slate-500 cursor-not-allowed'
          : 'bg-teal-900/20 border-teal-500/30 text-teal-300 hover:bg-teal-900/40 hover:border-teal-400/50 active:scale-95'
        }`}
    >
      {loading
        ? <><i className="fa-solid fa-circle-notch fa-spin" /> Test…</>
        : <><i className="fa-solid fa-satellite-dish" /> Test</>
      }
    </button>
  );
}

/* ── Main Component ── */
const ApiKeyModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<TabId>('gemini');
  const [cfg, setCfg] = useState<ApiConfig | null>(null);
  const [keys, setKeys] = useState<string[]>(['']);

  // Test state
  const [geminiStatuses, setGeminiStatuses] = useState<KeyStatus[]>([{ status: 'idle' }]);
  const [orStatus, setOrStatus] = useState<KeyStatus>({ status: 'idle' });
  const [oaiStatus, setOaiStatus] = useState<KeyStatus>({ status: 'idle' });
  const [ytStatus, setYtStatus] = useState<KeyStatus>({ status: 'idle' });

  useEffect(() => {
    if (isOpen) {
      const loaded = loadApiConfig();
      setCfg(loaded);
      const ks = loaded.keyPool.length > 0 ? loaded.keyPool : [''];
      setKeys(ks);
      setGeminiStatuses(ks.map(() => ({ status: 'idle' as TestStatus })));
      setOrStatus({ status: 'idle' });
      setOaiStatus({ status: 'idle' });
      setYtStatus({ status: 'idle' });
    }
  }, [isOpen]);

  if (!isOpen || !cfg) return null;

  /* ── GEMINI ── */
  const updateGeminiKey = (i: number, v: string) => {
    const k = [...keys]; k[i] = v; setKeys(k);
    saveApiConfig({ keyPool: k });
    const s = [...geminiStatuses]; s[i] = { status: 'idle' }; setGeminiStatuses(s);
  };
  const addKey = () => {
    setKeys([...keys, '']);
    setGeminiStatuses([...geminiStatuses, { status: 'idle' }]);
  };
  const removeKey = (i: number) => {
    const k = keys.filter((_, x) => x !== i);
    const next = k.length ? k : [''];
    setKeys(next);
    saveApiConfig({ keyPool: next });
    const s = geminiStatuses.filter((_, x) => x !== i);
    setGeminiStatuses(s.length ? s : [{ status: 'idle' }]);
  };

  const handleTestGemini = async (i: number) => {
    const key = keys[i];
    if (!key.trim()) return;
    const s = [...geminiStatuses]; s[i] = { status: 'loading' }; setGeminiStatuses(s);
    const result = await testGeminiKey(key);
    const s2 = [...geminiStatuses]; s2[i] = { status: result.ok ? 'ok' : 'error', result }; setGeminiStatuses(s2);
  };

  const handleTestAllGemini = async () => {
    const validIdxs = keys.map((k, i) => (k.trim().startsWith('AIza') ? i : -1)).filter(x => x >= 0);
    if (validIdxs.length === 0) return;
    const s = [...geminiStatuses];
    validIdxs.forEach(i => { s[i] = { status: 'loading' }; });
    setGeminiStatuses([...s]);
    await Promise.all(validIdxs.map(async (i) => {
      const result = await testGeminiKey(keys[i]);
      s[i] = { status: result.ok ? 'ok' : 'error', result };
    }));
    setGeminiStatuses([...s]);
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

  const TABS: { id: TabId; icon: string; label: string; active: boolean }[] = [
    { id: 'gemini', icon: 'fa-brands fa-google', label: 'Gemini', active: cfg.apiEnabled.google },
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
        <div className="px-6 py-5 space-y-4 max-h-[420px] overflow-y-auto">

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
                  <div key={i} className="space-y-1">
                    <div className="flex gap-2">
                      <input type="password" value={k} onChange={e => updateGeminiKey(i, e.target.value)}
                        className={`flex-1 bg-[#060810] border rounded-lg p-2.5 text-sm font-mono placeholder-white/20 outline-none transition-colors ${
                          k.trim().startsWith('AIza') ? 'border-teal-500/40 text-teal-200' : 'border-white/10 text-white focus:border-teal-500/40'
                        }`}
                        placeholder="AIzaSy..." />
                      {k.trim().startsWith('AIza') && (
                        <TestButton
                          onClick={() => handleTestGemini(i)}
                          loading={geminiStatuses[i]?.status === 'loading'}
                        />
                      )}
                      {keys.length > 1 && (
                        <button onClick={() => removeKey(i)} className="text-red-500/50 hover:text-red-300 p-2">
                          <i className="fa-solid fa-trash text-sm" />
                        </button>
                      )}
                    </div>
                    {geminiStatuses[i] && geminiStatuses[i].status !== 'idle' && (
                      <div className="pl-1">
                        <StatusBadge ks={geminiStatuses[i]} />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <button onClick={addKey} className="text-xs text-teal-400 hover:text-teal-300 flex items-center gap-1.5 hover:underline">
                  <i className="fa-solid fa-plus" /> Thêm Key Gmail khác (tăng hạn mức)
                </button>
                {geminiValid && (
                  <button
                    onClick={handleTestAllGemini}
                    disabled={geminiStatuses.some(s => s.status === 'loading')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold bg-teal-900/20 border border-teal-500/30 text-teal-300 hover:bg-teal-900/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <i className="fa-solid fa-satellite-dish" /> Test Tất Cả
                  </button>
                )}
              </div>

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
                <div className="flex gap-2">
                  <input type="password" value={cfg.openRouterKey}
                    onChange={e => { updateField({ openRouterKey: e.target.value }); setOrStatus({ status: 'idle' }); }}
                    className="flex-1 bg-[#060810] border border-white/10 rounded-lg p-2.5 text-sm font-mono text-white placeholder-white/20 outline-none focus:border-blue-500/40"
                    placeholder="sk-or-..." />
                  {cfg.openRouterKey.trim().length > 10 && (
                    <TestButton
                      onClick={async () => {
                        setOrStatus({ status: 'loading' });
                        const r = await testOpenRouterKey(cfg.openRouterKey, cfg.openRouterModel);
                        setOrStatus({ status: r.ok ? 'ok' : 'error', result: r });
                      }}
                      loading={orStatus.status === 'loading'}
                    />
                  )}
                </div>
                {orStatus.status !== 'idle' && <div className="mt-1 pl-1"><StatusBadge ks={orStatus} /></div>}
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
                💡 Gemini 2.5 Flash Lite (Free) hoạt động rất tốt cho kịch bản Phật pháp, không tốn phí và hạn mức cao.
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
                <div className="flex gap-2">
                  <input type="password" value={cfg.openAiKey}
                    onChange={e => { updateField({ openAiKey: e.target.value }); setOaiStatus({ status: 'idle' }); }}
                    className={`flex-1 bg-[#060810] border rounded-lg p-2.5 text-sm font-mono placeholder-white/20 outline-none transition-colors ${
                      cfg.openAiKey.startsWith('sk-') ? 'border-green-500/40 text-green-200' : 'border-white/10 text-white focus:border-green-500/40'
                    }`}
                    placeholder="sk-..." />
                  {cfg.openAiKey.startsWith('sk-') && (
                    <TestButton
                      onClick={async () => {
                        setOaiStatus({ status: 'loading' });
                        const r = await testOpenAIKey(cfg.openAiKey, cfg.openAiModel);
                        setOaiStatus({ status: r.ok ? 'ok' : 'error', result: r });
                      }}
                      loading={oaiStatus.status === 'loading'}
                    />
                  )}
                </div>
                {oaiStatus.status !== 'idle' && <div className="mt-1 pl-1"><StatusBadge ks={oaiStatus} /></div>}
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
                <div className="flex gap-2">
                  <input type="password" value={cfg.youtubeApiKey}
                    onChange={e => { updateField({ youtubeApiKey: e.target.value }); setYtStatus({ status: 'idle' }); }}
                    className="flex-1 bg-[#060810] border border-white/10 rounded-lg p-2.5 text-sm font-mono text-white placeholder-white/20 outline-none focus:border-red-500/40"
                    placeholder="AIzaSy... (Gemini key cũng hoạt động nếu đã bật YouTube API)" />
                  {cfg.youtubeApiKey.trim().length > 5 && (
                    <TestButton
                      onClick={async () => {
                        setYtStatus({ status: 'loading' });
                        const r = await testYouTubeKey(cfg.youtubeApiKey);
                        setYtStatus({ status: r.ok ? 'ok' : 'error', result: r });
                      }}
                      loading={ytStatus.status === 'loading'}
                    />
                  )}
                </div>
                {ytStatus.status !== 'idle' && <div className="mt-1 pl-1"><StatusBadge ks={ytStatus} /></div>}
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