# 🛠️ SKILL — DHARMA MASTER BUILD GUIDE
> Cập nhật: 2026-05-10 | Tham chiếu mỗi lần build/deploy.

---

## 1. CẤU TRÚC DỰ ÁN

```
dharma-master/
├── src/                          # Vite root (config: root: 'src')
│   ├── index.html                # Entry HTML (DUY NHẤT)
│   ├── index.tsx                 # React entry point
│   ├── main.tsx                  # Alt entry
│   ├── App.tsx                   # Main App (3 tabs: spy/script/studio)
│   ├── types.ts                  # TabId type
│   ├── index.css                 # Global CSS
│   ├── vite-env.d.ts             # TypeScript types cho import.meta.env
│   ├── services/
│   │   └── geminiService.ts      # ⭐ Gemini API client
│   ├── components/
│   │   ├── ApiKeyModal.tsx        # Modal nhập API key
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Icons.tsx
│   │   └── Toast.tsx
│   ├── pages/
│   │   ├── SpyModule.tsx          # Phân tích video YouTube
│   │   ├── ScriptModule.tsx       # Viết kịch bản AI
│   │   └── StudioModule.tsx       # Quản lý & export prompts
│   └── data/
│       ├── prompts.ts             # System prompts
│       ├── buddhismContexts.ts    # 14 truyền thống Phật giáo
│       └── visualStyles.ts        # 17 phong cách visual
├── .env.example                   # Template env
├── .gitignore                     # Có rule bảo vệ .env
├── vite.config.ts                 # root: 'src', port: 5173
├── vercel.json                    # Deploy config
├── package.json
└── SKILL.md                       # File này
```

---

## 2. TECH STACK

| Layer | Công nghệ | Version |
|---|---|---|
| Framework | React | 19.x |
| Build | Vite | 8.x |
| Language | TypeScript | 6.x |
| **AI SDK** | **`@google/genai`** | latest |
| **AI Model** | **`gemini-2.5-flash`** | stable |
| Animation | Framer Motion | 12.x |
| Icons | Lucide React + Font Awesome 6 CDN |
| CSS | TailwindCSS CDN |
| Deploy | Vercel |

> ⚠️ SDK cũ `@google/generative-ai` đã **DEPRECATED**. Chỉ dùng `@google/genai`.

---

## 3. QUY TẮC API (BẮT BUỘC)

### 3.1 SDK — `@google/genai`

```typescript
import { GoogleGenAI } from '@google/genai';

// ✅ Constructor — nhận object { apiKey }
const ai = new GoogleGenAI({ apiKey: key });

// ✅ Gọi API — dùng ai.models.generateContent()
const response = await ai.models.generateContent({
  model: 'gemini-2.5-flash',
  contents: 'prompt text',
  config: {
    systemInstruction: 'system prompt',
    responseMimeType: 'application/json',
  },
});

// ✅ Lấy text — dùng response.text (property, không phải method)
const text = response.text;
```

### 3.2 Environment Variable

```
⛔ KHÔNG dùng:  process.env.ANYTHING     (không hoạt động trong Vite)
✅ LUÔN dùng:   import.meta.env.VITE_*   (Vite chỉ expose prefix VITE_)
```

### 3.3 API Key Priority

```
1. localStorage['tuai-dharma-api-key']    →  User nhập qua Modal
2. import.meta.env.VITE_GEMINI_API_KEY    →  .env (dev) / Vercel env (prod)
```

### 3.4 Singleton + Auto-Reset

```
- Service cache instance + cachedKey
- Tự detect key thay đổi → reset instance
- ApiKeyModal gọi resetAiInstance() khi Save/Clear
```

### 3.5 Retry Logic

```
429/503 (rate limit)  →  Auto retry 3 lần, backoff 3s → 6s → 12s
400/403 (api key)     →  Throw ngay + resetAiInstance()
Network error         →  Retry 1 lần
Lỗi khác             →  Throw ngay
```

---

## 4. COMMANDS

```bash
npm run dev          # Dev server (port 5173)
npm run build        # Build → /dist
npx vercel --prod    # Deploy production
npm run lint         # ESLint
```

---

## 5. ENV SETUP

**Local** — tạo file `.env` ở root:
```
VITE_GEMINI_API_KEY=AIzaSy_YOUR_KEY_HERE
```

**Vercel** — Project Settings → Environment Variables:
```
Key:   VITE_GEMINI_API_KEY
Value: AIzaSy_YOUR_KEY_HERE
```

> `.env` đã có trong `.gitignore`. KHÔNG commit key thật.

---

## 6. CHECKLIST TRƯỚC DEPLOY

- [ ] Chỉ dùng `@google/genai` (không phải `@google/generative-ai`)
- [ ] Model: `gemini-2.5-flash`
- [ ] Không có `process.env` trong code
- [ ] `resetAiInstance()` được gọi khi Save/Clear key
- [ ] Chỉ có 1 file `index.html` trong `/src/`
- [ ] `npm run build` thành công
- [ ] `.env` có trong `.gitignore`

---

## 7. TROUBLESHOOTING

| Lỗi | Fix |
|---|---|
| API Key không hợp lệ | Lấy key mới tại aistudio.google.com/app/apikey |
| Không tìm thấy API Key | Nhập qua Modal hoặc set VITE_GEMINI_API_KEY |
| AI quá tải (429) | Đợi 30s, thử lại. Kiểm tra quota tại aistudio.google.com |
| Phản hồi AI không hợp lệ | Thử lại. Nếu lặp lại → sửa prompt |
| Build fail `process.env` | Đổi thành `import.meta.env.VITE_*` |

---

## 8. VERCEL CONFIG

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "framework": "vite"
}
```

```typescript
// vite.config.ts
{
  root: 'src',
  server: { port: 5173, host: true },
  resolve: { alias: { '@': path.resolve(__dirname, 'src') } },
  build: { outDir: '../dist', emptyOutDir: true }
}
```

---

> 📌 Mọi tính năng cần AI → dùng `callGemini()` từ `geminiService.ts`. KHÔNG tạo instance `GoogleGenAI` trực tiếp ở nơi khác.
