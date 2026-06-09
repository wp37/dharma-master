// ==================================================================================
// AI SERVICE — Multi-Key Pool with Round Robin & Fallback
// TUAI Dharma Master
// ==================================================================================
import { MODELS } from '../data/constants';

const STORAGE_KEYS = {
  keyPool: 'dharma_key_pool',
  openRouterKey: 'dharma_openrouter_key',
  openRouterModel: 'dharma_openrouter_model',
  openAiKey: 'dharma_openai_key',
  openAiModel: 'dharma_openai_model',
  youtubeKey: 'dharma_youtube_key',
  apiEnabled: 'dharma_api_enabled',
  uiLanguage: 'dharma_ui_language',
};

export interface ApiEnabledFlags {
  google: boolean;
  openrouter: boolean;
  openai: boolean;
  youtube: boolean;
}

export interface ApiConfig {
  keyPool: string[];
  currentKeyIndex: number;
  openRouterKey: string;
  openRouterModel: string;
  openAiKey: string;
  openAiModel: string;
  youtubeApiKey: string;
  apiEnabled: ApiEnabledFlags;
}

const defaultConfig: ApiConfig = {
  keyPool: [],
  currentKeyIndex: 0,
  openRouterKey: '',
  openRouterModel: MODELS.openrouter_default,
  openAiKey: '',
  openAiModel: 'gpt-4-turbo-preview',
  youtubeApiKey: '',
  apiEnabled: { google: true, openrouter: false, openai: false, youtube: false },
};

let config: ApiConfig = { ...defaultConfig };

export function loadApiConfig(): ApiConfig {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.keyPool);
    config.keyPool = stored ? JSON.parse(stored) : [];
  } catch { config.keyPool = []; }

  config.openRouterKey = localStorage.getItem(STORAGE_KEYS.openRouterKey) || '';
  config.openRouterModel = localStorage.getItem(STORAGE_KEYS.openRouterModel) || MODELS.openrouter_default;
  config.openAiKey = localStorage.getItem(STORAGE_KEYS.openAiKey) || '';
  config.openAiModel = localStorage.getItem(STORAGE_KEYS.openAiModel) || 'gpt-4-turbo-preview';
  config.youtubeApiKey = localStorage.getItem(STORAGE_KEYS.youtubeKey) || '';

  try {
    const flags = localStorage.getItem(STORAGE_KEYS.apiEnabled);
    if (flags) config.apiEnabled = JSON.parse(flags);
  } catch { /* keep defaults */ }

  return config;
}

export function saveApiConfig(newConfig: Partial<ApiConfig>) {
  config = { ...config, ...newConfig };
  localStorage.setItem(STORAGE_KEYS.keyPool, JSON.stringify(config.keyPool));
  localStorage.setItem(STORAGE_KEYS.openRouterKey, config.openRouterKey);
  localStorage.setItem(STORAGE_KEYS.openRouterModel, config.openRouterModel);
  localStorage.setItem(STORAGE_KEYS.openAiKey, config.openAiKey);
  localStorage.setItem(STORAGE_KEYS.openAiModel, config.openAiModel);
  localStorage.setItem(STORAGE_KEYS.youtubeKey, config.youtubeApiKey);
  localStorage.setItem(STORAGE_KEYS.apiEnabled, JSON.stringify(config.apiEnabled));
}

export function getApiConfig(): ApiConfig { return config; }

export function getValidKeyCount(): number {
  return config.keyPool.filter(k => k && k.trim() !== '').length;
}

// ==================================================================================
// API HEALTH CHECK — Kiểm tra liên tục từng key / provider
// ==================================================================================
export interface ApiTestResult {
  ok: boolean;
  latencyMs?: number;
  error?: string;
}

/** Ping một Gemini key cụ thể bằng model text nhỏ nhất */
export async function testGeminiKey(apiKey: string): Promise<ApiTestResult> {
  const start = Date.now();
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent`;
    const body = {
      contents: [{ role: 'user', parts: [{ text: 'hi' }] }],
      generationConfig: { maxOutputTokens: 1 },
    };
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
      body: JSON.stringify(body),
    });
    const latencyMs = Date.now() - start;
    if (res.status === 429) return { ok: false, latencyMs, error: '429 — Hết quota' };
    if (res.status === 400) return { ok: false, latencyMs, error: '400 — Key không hợp lệ' };
    if (res.status === 403) return { ok: false, latencyMs, error: '403 — Key bị từ chối' };
    if (!res.ok) {
      const t = await res.text();
      return { ok: false, latencyMs, error: `HTTP ${res.status}` };
    }
    return { ok: true, latencyMs };
  } catch (e: any) {
    return { ok: false, latencyMs: Date.now() - start, error: e.message || 'Network error' };
  }
}

/** Ping OpenRouter bằng prompt tối giản */
export async function testOpenRouterKey(apiKey: string, model: string): Promise<ApiTestResult> {
  const start = Date.now();
  try {
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'TUAI Dharma Master',
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'user', content: 'hi' }],
        max_tokens: 1,
      }),
    });
    const latencyMs = Date.now() - start;
    if (!res.ok) {
      const t = await res.text();
      let msg = `HTTP ${res.status}`;
      try { msg = JSON.parse(t)?.error?.message || msg; } catch {}
      return { ok: false, latencyMs, error: msg };
    }
    return { ok: true, latencyMs };
  } catch (e: any) {
    return { ok: false, latencyMs: Date.now() - start, error: e.message || 'Network error' };
  }
}

/** Ping OpenAI bằng prompt tối giản */
export async function testOpenAIKey(apiKey: string, model: string): Promise<ApiTestResult> {
  const start = Date.now();
  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'user', content: 'hi' }],
        max_tokens: 1,
      }),
    });
    const latencyMs = Date.now() - start;
    if (!res.ok) {
      const t = await res.text();
      let msg = `HTTP ${res.status}`;
      try { msg = JSON.parse(t)?.error?.message || msg; } catch {}
      return { ok: false, latencyMs, error: msg };
    }
    return { ok: true, latencyMs };
  } catch (e: any) {
    return { ok: false, latencyMs: Date.now() - start, error: e.message || 'Network error' };
  }
}

/** Ping YouTube Data API */
export async function testYouTubeKey(apiKey: string): Promise<ApiTestResult> {
  const start = Date.now();
  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=id&id=dQw4w9WgXcQ&key=${apiKey}`
    );
    const latencyMs = Date.now() - start;
    if (res.status === 400) return { ok: false, latencyMs, error: '400 — Key không hợp lệ' };
    if (res.status === 403) return { ok: false, latencyMs, error: '403 — API chưa được bật hoặc hết quota' };
    if (!res.ok) return { ok: false, latencyMs, error: `HTTP ${res.status}` };
    return { ok: true, latencyMs };
  } catch (e: any) {
    return { ok: false, latencyMs: Date.now() - start, error: e.message || 'Network error' };
  }
}

export function hasAnyApiKey(): boolean {
  return getValidKeyCount() > 0 || !!config.openRouterKey || !!config.openAiKey;
}

// ==================================================================================
// QUOTA COUNTDOWN — Event system để UI hiện countdown khi hết quota
// ==================================================================================
type QuotaListener = (secondsLeft: number) => void;
const quotaListeners: QuotaListener[] = [];

export function onQuotaCountdown(fn: QuotaListener) {
  quotaListeners.push(fn);
  return () => { const i = quotaListeners.indexOf(fn); if (i >= 0) quotaListeners.splice(i, 1); };
}

function emitQuota(s: number) { quotaListeners.forEach(fn => fn(s)); }

/** Chờ N giây, emit countdown mỗi giây */
async function waitWithCountdown(seconds: number) {
  for (let s = seconds; s > 0; s--) {
    emitQuota(s);
    await new Promise(r => setTimeout(r, 1000));
  }
  emitQuota(0);
}

// Lớp lỗi đặc biệt để phân biệt quota exhausted
class QuotaExhaustedError extends Error {
  constructor() { super('QUOTA_EXHAUSTED'); this.name = 'QuotaExhaustedError'; }
}

function getNextKey(): string {
  const validKeys = config.keyPool.filter(k => k && k.trim() !== '');
  if (validKeys.length === 0) return '';
  const key = validKeys[config.currentKeyIndex % validKeys.length];
  config.currentKeyIndex = (config.currentKeyIndex + 1) % validKeys.length;
  return key;
}

// === JSON Parser ===
function safeJSONParse(str: string): any {
  if (!str) return null;
  
  // Strip markdown fences
  let clean = str.replace(/```json/gi, '').replace(/```/g, '').trim();
  
  // Find JSON block
  const firstBrace = clean.indexOf('{');
  const firstBracket = clean.indexOf('[');
  let start = -1, end = -1;
  
  if (firstBrace !== -1 && (firstBracket === -1 || firstBrace < firstBracket)) {
    start = firstBrace; end = clean.lastIndexOf('}');
  } else if (firstBracket !== -1) {
    start = firstBracket; end = clean.lastIndexOf(']');
  }
  
  if (start === -1) throw new Error("No JSON found in response");
  if (end === -1) end = clean.length - 1;
  clean = clean.substring(start, end + 1);
  
  try {
    return JSON.parse(clean);
  } catch (e) {
    // Try to auto-close missing braces/brackets
    let depth = 0, bracketDepth = 0;
    let inString = false, escape = false;
    for (const ch of clean) {
      if (escape) { escape = false; continue; }
      if (ch === '\\') { escape = true; continue; }
      if (ch === '"') { inString = !inString; continue; }
      if (inString) continue;
      if (ch === '{') depth++;
      else if (ch === '}') depth--;
      else if (ch === '[') bracketDepth++;
      else if (ch === ']') bracketDepth--;
    }
    let repaired = clean;
    while (bracketDepth-- > 0) repaired += ']';
    while (depth-- > 0) repaired += '}';
    try { return JSON.parse(repaired); }
    catch { throw new Error(`JSON Parse Error: ${(e as Error).message}`); }
  }
}

// === Google Gemini with Round-Robin + Model Fallback ===
// Thứ tự ưu tiên model: 2.5-flash → 2.5-flash-lite → 1.5-flash (fallback khi 503 overload)
// NOTE: gemini-2.0-flash đã bị Google tắt từ 1/6/2026 — KHÔNG dùng model này!
const GEMINI_MODEL_FALLBACKS = [
  MODELS.text,                  // gemini-2.5-flash (primary)
  'gemini-2.5-flash-lite',      // fallback khi 2.5 quá tải (15 RPM, 1000 req/ngày free)
  'gemini-1.5-flash',           // fallback cuối
];

async function callGoogleWithRetry(prompt: string, systemPrompt: string, retries = 6): Promise<any> {
  let lastError: any;
  let modelIndex = 0;
  let quotaCount = 0; // đếm số lần bị 429

  for (let i = 0; i < retries; i++) {
    const apiKey = getNextKey();
    if (!apiKey) continue;

    const currentModel = GEMINI_MODEL_FALLBACKS[modelIndex] || GEMINI_MODEL_FALLBACKS[GEMINI_MODEL_FALLBACKS.length - 1];

    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${currentModel}:generateContent`;
      const body = {
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        systemInstruction: { parts: [{ text: systemPrompt }] },
        generationConfig: { responseMimeType: "application/json" },
      };
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey,
        },
        body: JSON.stringify(body)
      });

      if (res.status === 429) {
        quotaCount++;
        throw new Error("429 Quota Exceeded");
      }

      // 503 = server quá tải → thử model nhẹ hơn ngay
      if (res.status === 503) {
        await res.text(); // drain
        console.warn(`[Gemini] ${currentModel} quá tải (503), đổi model...`);
        if (modelIndex < GEMINI_MODEL_FALLBACKS.length - 1) modelIndex++;
        throw new Error('503 Server Overloaded');
      }

      if (!res.ok) {
        const errText = await res.text();
        // Lấy message sạch từ JSON nếu có
        let cleanMsg = `Lỗi ${res.status}`;
        try { cleanMsg = JSON.parse(errText)?.error?.message || cleanMsg; } catch {}
        throw new Error(`Google Error ${res.status}: ${cleanMsg}`);
      }

      const data = await res.json();
      if (!data.candidates?.[0]?.content) throw new Error("Gemini không trả về nội dung hợp lệ");
      if (currentModel !== MODELS.text) {
        console.info(`[Gemini] Thành công với model dự phòng: ${currentModel}`);
      }
      return safeJSONParse(data.candidates[0].content.parts[0].text);

    } catch (e: any) {
      lastError = e;
      const isQuota = e.message?.includes('429');
      const isOverload = e.message?.includes('503');
      console.warn(`Attempt ${i + 1}/${retries} [${currentModel}] failed:`, e.message);
      if (i < retries - 1) {
        const waitTime = isQuota ? 800 : isOverload ? 400 : 800;
        await new Promise(r => setTimeout(r, waitTime));
      }
    }
  }

  // Nếu phần lớn lỗi là quota → ném QuotaExhaustedError để tầng trên xử lý
  if (quotaCount >= Math.ceil(retries / 2)) {
    throw new QuotaExhaustedError();
  }
  throw lastError || new Error('Gemini thất bại sau tất cả các lần thử.');
}

// === OpenRouter API ===
async function callOpenRouter(prompt: string, systemPrompt: string): Promise<any> {
  const url = "https://openrouter.ai/api/v1/chat/completions";
  const body = {
    model: config.openRouterModel || MODELS.openrouter_default,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: prompt }
    ],
    response_format: { type: "json_object" } 
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${config.openRouterKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': window.location.origin,
      'X-Title': 'TUAI Dharma Master'
    },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenRouter Error: ${err}`);
  }

  const data = await res.json();
  return safeJSONParse(data.choices?.[0]?.message?.content);
}

// === OpenAI API ===
async function callOpenAI(prompt: string, systemPrompt: string): Promise<any> {
  const url = "https://api.openai.com/v1/chat/completions";
  const body = {
    model: config.openAiModel || 'gpt-4-turbo-preview',
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: prompt }
    ],
    response_format: { type: "json_object" },
    temperature: 0.7
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${config.openAiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenAI Error: ${err}`);
  }

  const data = await res.json();
  return safeJSONParse(data.choices?.[0]?.message?.content);
}

// === Main AI Caller with Fallbacks + Quota Auto-Retry ===
async function _callAIOnce(prompt: string, systemPrompt: string): Promise<any> {
  const { apiEnabled, keyPool } = config;
  const hasGoogleKeys = keyPool.some(k => k && k.trim() !== '');

  // Priority 1: Google Gemini
  if (apiEnabled.google && hasGoogleKeys) {
    try {
      return await callGoogleWithRetry(prompt, systemPrompt);
    } catch (e: any) {
      if (e instanceof QuotaExhaustedError) throw e; // đẩy lên để xử lý countdown
      console.warn('Google Gemini Failed:', e.message);
      if (!apiEnabled.openrouter && !apiEnabled.openai) throw e;
    }
  } else if (apiEnabled.google && !hasGoogleKeys && !apiEnabled.openrouter && !apiEnabled.openai) {
    throw new Error('❌ Vui lòng nhập ít nhất 1 Gemini API Key!');
  }

  // Priority 2: OpenRouter
  if (apiEnabled.openrouter && config.openRouterKey) {
    try {
      return await callOpenRouter(prompt, systemPrompt);
    } catch (e: any) {
      console.warn('OpenRouter Failed:', e.message);
      if (!apiEnabled.openai) throw e;
    }
  } else if (apiEnabled.openrouter && !config.openRouterKey && !apiEnabled.openai) {
    throw new Error('❌ OpenRouter đã bật nhưng chưa có API key!');
  }

  // Priority 3: OpenAI
  if (apiEnabled.openai && config.openAiKey) {
    return await callOpenAI(prompt, systemPrompt);
  } else if (apiEnabled.openai && !config.openAiKey) {
    throw new Error('❌ OpenAI đã bật nhưng chưa có API key!');
  }

  throw new Error('❌ Tất cả các API đều thất bại hoặc thiếu key hợp lệ!');
}

// === Exported callAI với auto-retry khi hết quota ===
export async function callAI(prompt: string, systemPrompt: string): Promise<any> {
  const { apiEnabled } = config;
  const anyEnabled = apiEnabled.google || apiEnabled.openrouter || apiEnabled.openai;
  if (!anyEnabled) {
    throw new Error('❌ Vui lòng bật ít nhất 1 API trong Config!');
  }

  try {
    return await _callAIOnce(prompt, systemPrompt);
  } catch (e: any) {
    // Nếu hết quota Google → tự chờ 60 giây rồi thử lại
    if (e instanceof QuotaExhaustedError) {
      console.warn('[Quota] Tất cả keys hết quota. Chờ 60 giây rồi thử lại...');
      await waitWithCountdown(60);
      // Retry lần 2 — nếu vẫn lỗi thì throw thật
      try {
        return await _callAIOnce(prompt, systemPrompt);
      } catch (e2: any) {
        if (e2 instanceof QuotaExhaustedError) {
          throw new Error('⏱️ Vẫn hết quota sau khi đợi 60 giây. Vui lòng thêm API key hoặc thử lại sau.');
        }
        throw e2;
      }
    }
    throw e;
  }
}

function extractYoutubeId(url: string): string | null {
  if (!url) return null;
  // /shorts/ID
  let m = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/);
  if (m) return m[1];
  // youtu.be/ID
  m = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (m) return m[1];
  // ?v=ID or &v=ID  
  m = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (m) return m[1];
  // /embed/ID or /v/ID
  m = url.match(/youtube\.com\/(?:embed|v|e)\/([a-zA-Z0-9_-]{11})/);
  if (m) return m[1];
  return null;
}

// === YouTube Meta Fetcher ===
export async function fetchYoutubeMeta(url: string): Promise<any> {
  const videoId = extractYoutubeId(url);
  if (!videoId) return { title: "Invalid URL", author: "Unknown", thumb: "" };

  // Try YouTube Data API first
  if (config.youtubeApiKey) {
    try {
      const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${config.youtubeApiKey}`;
      const res = await fetch(apiUrl);
      if (res.ok) {
        const data = await res.json();
        if (data.items?.length > 0) {
          const item = data.items[0];
          return {
            title: item.snippet.title,
            author: item.snippet.channelTitle,
            thumb: item.snippet.thumbnails.maxres?.url || item.snippet.thumbnails.high.url,
            description: item.snippet.description,
            tags: item.snippet.tags?.join(', ') || '',
            viewCount: item.statistics.viewCount,
            likeCount: item.statistics.likeCount,
            publishDate: item.statistics.publishedAt,
            fullData: true,
          };
        }
      }
    } catch (e) { console.warn("YouTube Data API failed:", e); }
  }

  // Fallback: oEmbed
  try {
    const res = await fetch(`https://www.youtube.com/oembed?url=${url}&format=json`);
    if (res.ok) {
      const data = await res.json();
      return { title: data.title, author: data.author_name, thumb: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`, fullData: false };
    }
  } catch { /* ignore */ }
  return { title: "YouTube Video", author: "YouTube Channel", thumb: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`, fullData: false };
}

// === Image Generation ===
export async function generateImage(prompt: string, aspectRatio: string = "16:9"): Promise<string | null> {
  const apiKey = getNextKey();
  if (!apiKey) throw new Error("Nhập API Key!");

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODELS.image}:predict`;
  const body = { instances: [{ prompt }], parameters: { sampleCount: 1, aspectRatio } };
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': apiKey,
    },
    body: JSON.stringify(body)
  });
  const data = await res.json();

  if (data.predictions?.[0]?.bytesBase64Encoded) {
    return `data:image/png;base64,${data.predictions[0].bytesBase64Encoded}`;
  }
  return null;
}
