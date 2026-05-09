import { GoogleGenerativeAI } from '@google/generative-ai';

const USER_API_KEY_STORAGE = 'tuai-dharma-api-key';

const getApiKey = (): string => {
  const userKey = localStorage.getItem(USER_API_KEY_STORAGE);
  if (userKey && userKey.trim().startsWith('AIza')) {
    return userKey.trim();
  }
  return process.env.GEMINI_API_KEY || '';
};

let aiInstance: GoogleGenerativeAI | null = null;

const getAi = (): GoogleGenerativeAI => {
  const key = getApiKey();
  if (!key) {
    throw new Error('Không tìm thấy Gemini API Key. Vui lòng nhập API Key.');
  }
  if (!aiInstance) {
    aiInstance = new GoogleGenerativeAI({ apiKey: key });
  }
  return aiInstance;
};

export const resetAiInstance = () => {
  aiInstance = null;
};

export const callGemini = async (prompt: string, systemPrompt?: string): Promise<any> => {
  const ai = getAi();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [{ text: prompt }] },
      config: {
        systemInstruction: systemPrompt ? { parts: [{ text: systemPrompt }] } : undefined,
        responseMimeType: 'application/json',
      },
    });
    const text = response.candidates?.[0]?.content?.parts?.[0]?.text || '';
    return safeJSONParse(text);
  } catch (error: any) {
    const msg = error?.message || '';
    if (msg.includes('429') || msg.includes('quota')) {
      throw new Error('Hệ thống AI đang quá tải. Vui lòng đợi giây lát và thử lại.');
    }
    if (msg.includes('api key') || msg.includes('permission')) {
      throw new Error('API Key không hợp lệ. Vui lòng kiểm tra API Key.');
    }
    throw new Error(msg || 'Đã xảy ra lỗi. Vui lòng thử lại.');
  }
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
  try { return JSON.parse(clean); }
  catch (e) {
    if (clean.startsWith('{')) return JSON.parse(clean + '}');
    if (clean.startsWith('[')) return JSON.parse(clean + ']');
    throw new Error('Invalid JSON response from AI');
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
