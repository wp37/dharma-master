import { GoogleGenAI } from '@google/genai';

const USER_API_KEY_STORAGE = 'tuai-dharma-api-key';
const USER_MODEL_STORAGE = 'tuai-dharma-model';

// === Model Registry ===
export interface ModelInfo {
  id: string;
  name: string;
  desc: string;
  badge: string;
  badgeColor: string;
}

export const MODEL_LIST: ModelInfo[] = [
  { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash', desc: 'Nhanh, ổn định — mặc định', badge: 'FREE', badgeColor: 'green' },
  { id: 'gemini-2.5-flash-lite', name: 'Gemini 2.5 Flash Lite', desc: 'Nhẹ, tiết kiệm quota', badge: 'FREE', badgeColor: 'green' },
  { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro', desc: 'Chất lượng cao nhất — cần trả phí', badge: 'PRO', badgeColor: 'purple' },
];

const DEFAULT_MODEL = 'gemini-2.5-flash';

export const getSelectedModel = (): string => {
  return localStorage.getItem(USER_MODEL_STORAGE) || DEFAULT_MODEL;
};

export const setSelectedModel = (modelId: string) => {
  localStorage.setItem(USER_MODEL_STORAGE, modelId);
};

// === API Key ===
const getApiKey = (): string => {
  const userKey = localStorage.getItem(USER_API_KEY_STORAGE);
  if (userKey && userKey.trim().startsWith('AIza')) {
    return userKey.trim();
  }
  return import.meta.env.VITE_GEMINI_API_KEY || '';
};

export const hasApiKey = (): boolean => {
  return !!getApiKey();
};

// === Singleton Instance ===
let aiInstance: GoogleGenAI | null = null;
let cachedKey: string | null = null;

const getAi = (): GoogleGenAI => {
  const key = getApiKey();
  if (!key) {
    throw new Error('Không tìm thấy Gemini API Key. Vui lòng nhập API Key.');
  }
  // Tự động reset nếu key thay đổi
  if (aiInstance && cachedKey !== key) {
    aiInstance = null;
  }
  if (!aiInstance) {
    aiInstance = new GoogleGenAI({ apiKey: key });
    cachedKey = key;
  }
  return aiInstance;
};

export const resetAiInstance = () => {
  aiInstance = null;
  cachedKey = null;
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// === Fallback Chain ===
const FALLBACK_MODELS = ['gemini-2.5-flash', 'gemini-2.5-flash-lite'];

export const callGemini = async (prompt: string, systemPrompt?: string, maxRetries = 3): Promise<any> => {
  const ai = getAi();
  if (!prompt || !prompt.trim()) {
    throw new Error('Prompt không được để trống.');
  }

  const selectedModel = getSelectedModel();
  // Build model chain: selected model first, then fallbacks
  const modelChain = [selectedModel, ...FALLBACK_MODELS.filter(m => m !== selectedModel)];

  let lastError: any = null;

  for (const model of modelChain) {
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model: model,
          contents: prompt.trim(),
          config: {
            systemInstruction: systemPrompt || undefined,
            responseMimeType: 'application/json',
          },
        });

        const text = response.text;
        if (!text) throw new Error('AI không trả về nội dung.');
        return safeJSONParse(text);
      } catch (error: any) {
        lastError = error;
        const msg = (error?.message || '').toLowerCase();
        const status = error?.status || error?.httpStatusCode;

        // Lỗi API Key → không retry, không fallback
        if (msg.includes('api key') || msg.includes('permission') || msg.includes('api_key_invalid') || msg.includes('denied') || status === 400 || status === 403) {
          resetAiInstance();
          throw new Error('API Key không hợp lệ hoặc hết hạn. Vui lòng kiểm tra lại API Key tại aistudio.google.com/app/apikey');
        }

        // Lỗi 429/503 → retry với backoff, then fallback to next model
        if (msg.includes('429') || msg.includes('quota') || msg.includes('rate') || msg.includes('resource') || msg.includes('overloaded') || status === 429 || status === 503) {
          if (attempt < maxRetries) {
            const waitTime = Math.pow(2, attempt + 1) * 1500; // 3s, 6s, 12s
            console.warn(`[Gemini] Rate limited on ${model}. Retrying in ${waitTime / 1000}s... (attempt ${attempt + 1}/${maxRetries})`);
            await delay(waitTime);
            continue;
          }
          // Exhausted retries for this model → try next model
          console.warn(`[Gemini] Model ${model} exhausted retries. Trying next model...`);
          break;
        }

        // Lỗi mạng → retry 1 lần
        if (msg.includes('fetch') || msg.includes('network') || msg.includes('timeout')) {
          if (attempt < 1) {
            console.warn('[Gemini] Network error. Retrying...');
            await delay(2000);
            continue;
          }
          throw new Error('Lỗi kết nối mạng. Vui lòng kiểm tra internet và thử lại.');
        }

        // Lỗi model not found → try next model
        if (msg.includes('not found') || msg.includes('not supported') || status === 404) {
          console.warn(`[Gemini] Model ${model} not available. Trying next...`);
          break;
        }

        // Lỗi khác → không retry
        console.error('[Gemini API Error]', error);
        throw new Error(error?.message || 'Đã xảy ra lỗi không xác định. Vui lòng thử lại.');
      }
    }
  }

  // All models exhausted
  throw new Error(lastError?.message || 'Gemini API đang quá tải. Vui lòng đợi 30 giây rồi thử lại, hoặc dùng API Key từ Gmail khác.');
};

function safeJSONParse(str: string): any {
  if (!str) return null;
  let clean = str.replace(/```json/gi, '').replace(/```/g, '').trim();
  const firstBrace = clean.indexOf('{');
  const firstBracket = clean.indexOf('[');
  let start = -1, end = -1;
  if (firstBrace !== -1 && (firstBracket === -1 || firstBrace < firstBracket)) {
    start = firstBrace; end = clean.lastIndexOf('}');
  } else if (firstBracket !== -1) {
    start = firstBracket; end = clean.lastIndexOf(']');
  }
  if (start !== -1 && end !== -1) clean = clean.substring(start, end + 1);
  try {
    return JSON.parse(clean);
  } catch (e) {
    console.error('[safeJSONParse] Failed to parse:', clean.substring(0, 200));
    throw new Error('Phản hồi AI không hợp lệ. Vui lòng thử lại.');
  }
}

export const fetchYoutubeMeta = async (url: string) => {
  const videoIdMatch = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  const videoId = videoIdMatch ? videoIdMatch[1] : null;
  if (!videoId) return { title: 'Video không hợp lệ', author: 'Unknown', thumb: '' };
  try {
    const res = await fetch(`https://www.youtube.com/oembed?url=${url}&format=json`);
    if (res.ok) {
      const data = await res.json();
      return { title: data.title, author: data.author_name, thumb: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` };
    }
  } catch (e) {}
  return { title: 'YouTube Video', author: 'YouTube Channel', thumb: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` };
};
