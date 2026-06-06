# 🛠️ REFACTOR PLAN — TUAI Dharma Master

> Tài liệu này là một playbook hoàn chỉnh. Bạn (hoặc Antigravity) thực thi tuần tự từ P0 → P4. Mỗi bước có: **file ảnh hưởng**, **việc cần làm**, **lý do**, **code drop-in**.

---

## 🎯 TÓM TẮT

**Tình trạng hiện tại:** App có ý tưởng tốt, cấu trúc 4 module (Spy/Script/Studio/SEO) hợp lý, code TypeScript readable. Nhưng dính 3 nhóm vấn đề chính:

1. **Code chết khoảng 25%** — toàn bộ license/admin/payment do bạn không bán nữa. Đang chiếm chỗ, gây bug tiềm ẩn, làm UI rối.
2. **Prompts AI có lỗ hổng nghiêm trọng** — không tuyên bố input, không có rule chống bịa, không có rubric chấm điểm. Đây là chỗ ảnh hưởng trực tiếp đến chất lượng nội dung bạn làm.
3. **Vài bug nhỏ trong service layer** — API key trong URL, round-robin lệch, JSON parser yếu, regex YouTube không cover Shorts.

**Mục tiêu sau refactor:** App gọn 25%, prompts chống bịa hoàn toàn, mọi data flow rõ ràng, sẵn sàng cho bạn vibe code thêm tính năng mới.

**Thứ tự ưu tiên:**
- **P0**: Dọn dẹp code chết (license/admin) — làm trước vì sẽ ảnh hưởng các file khác.
- **P1**: Fix bug critical trong `aiService.ts`.
- **P2**: Viết lại 4 prompts AI (cốt lõi nhất — content quality phụ thuộc 100% vào đây).
- **P3**: Cải thiện kiến trúc (input contract, error handling).
- **P4**: Cải thiện README, repo, dev workflow.

---

## P0 · DỌN DẸP CODE CHẾT

### P0.1 · Xóa hệ thống license

**Vấn đề:** Bạn không bán → không cần license. Hiện code có:
- `src/services/licenseService.ts` (173 dòng) — toàn bộ là dead code
- `src/components/LicenseGate.tsx` (176 dòng) — popup yêu cầu nhập key
- `src/pages/AdminModule.tsx` (170 dòng) — admin panel tạo/quản lý key
- Lệnh check trong `App.tsx`
- Tab "admin" trong Sidebar
- Hard-code STK ngân hàng cá nhân trong `LicenseGate.tsx` (lộ thông tin)
- Hard-code password admin trong `licenseService.ts` (`AdminTung@123` — đã public trên GitHub)

**Việc cần làm:**

```bash
# Xóa file
rm src/services/licenseService.ts
rm src/components/LicenseGate.tsx
rm src/pages/AdminModule.tsx
```

**Sửa `src/App.tsx`** — xóa tất cả import/state/JSX liên quan license. File mới hoàn chỉnh:

```tsx
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

  const handleScriptGenerated = (segs: any[]) => {
    setScriptSegments(segs);
    setActiveTab('seo');
  };

  const handleUseStrategy = (title: string) => {
    setStrategyTopic(title);
    setActiveTab('script');
  };

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
        </div>
      </main>

      <footer className="relative border-t border-teal-900/20 py-6 bg-[#060810] flame-border">
        <div className="relative max-w-6xl mx-auto px-4 text-center z-10">
          <div className="text-slate-500 text-xs font-light tracking-wide">
            TUAI DHARMA MASTER © {new Date().getFullYear()}
          </div>
        </div>
      </footer>

      <ApiKeyModal isOpen={showConfig} onClose={handleConfigClose} />
      <ToastContainer />
    </div>
  );
};

export default App;
```

**Sửa `src/data/constants.ts`** — xóa `'admin'` khỏi `TabId`:

```ts
// Tìm dòng cũ:
// export type TabId = 'spy' | 'script' | 'studio' | 'seo' | 'admin';
// Sửa thành:
export type TabId = 'spy' | 'script' | 'studio' | 'seo';
```

**Sửa `src/components/Sidebar.tsx`** — xóa entry "admin" trong danh sách tab.

### P0.2 · Xóa file rác

```bash
# File text bị track nhầm (gitignore đã có *.txt nhưng file đã commit trước đó)
git rm --cached "Buddhist Golden Dharma Re.txt"
rm "Buddhist Golden Dharma Re.txt"
```

### P0.3 · Dọn dẹp `huongdan.md`

File này public trên GitHub, chứa thông tin cá nhân:
- Path local Windows của bạn: `c:\Users\Vo Tung\Downloads\PSY\`
- Username Windows: `Vo Tung`

**Việc cần làm:** Replace tất cả `c:\Users\Vo Tung\Downloads\` thành `<YOUR_LOCAL_PATH>` trước khi commit. Hoặc đơn giản hơn: đưa `huongdan.md` vào `.gitignore` (file hướng dẫn nội bộ không cần public).

---

## P1 · FIX BUG CRITICAL — `aiService.ts`

File này là trái tim của app. Mình tìm thấy 4 bug:

### Bug 1: Gemini API key truyền qua URL query string

**Code cũ (dòng ~111 và ~245):**
```ts
const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODELS.text}:generateContent?key=${apiKey}`;
```

**Vấn đề:** Key xuất hiện trong browser history, Referer header, server logs, DevTools Network tab khi screen-share.

**Fix:** Đưa key vào header `x-goog-api-key`:

```ts
const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODELS.text}:generateContent`;
// ... rồi:
const res = await fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-goog-api-key': apiKey,
  },
  body: JSON.stringify(body),
});
```

Áp dụng tương tự cho `generateImage` (line ~245).

### Bug 2: Round-robin bỏ qua key đầu tiên

**Code cũ:**
```ts
function getNextKey(): string {
  const validKeys = config.keyPool.filter(k => k && k.trim() !== '');
  if (validKeys.length === 0) return '';
  config.currentKeyIndex = (config.currentKeyIndex + 1) % validKeys.length;
  return validKeys[config.currentKeyIndex];
}
```

**Vấn đề:** Tăng index TRƯỚC khi return → key[0] gần như không bao giờ được dùng ở lần gọi đầu. Với 3 key:
- Call 1: index=1, dùng key[1] (key[0] bị skip)
- Call 2: index=2, dùng key[2]
- Call 3: index=0, dùng key[0]

**Fix:**
```ts
function getNextKey(): string {
  const validKeys = config.keyPool.filter(k => k && k.trim() !== '');
  if (validKeys.length === 0) return '';
  const key = validKeys[config.currentKeyIndex % validKeys.length];
  config.currentKeyIndex = (config.currentKeyIndex + 1) % validKeys.length;
  return key;
}
```

### Bug 3: `safeJSONParse` xử lý không đủ chặt

**Code cũ:** Khi JSON đóng thiếu, fallback chỉ thêm `}` hoặc `]` ở cuối — không xử lý nested.

**Fix:** Đếm độ sâu brace để tự đóng đúng:

```ts
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
```

### Bug 4: `fetchYoutubeMeta` không nhận URL Shorts dạng mới

**Code cũ regex chỉ cover `youtube.com/watch`, `youtu.be/`, `youtube.com/embed/`.** Không cover:
- `youtube.com/shorts/VIDEO_ID`
- `m.youtube.com/...` (mobile)
- `music.youtube.com/...`
- URL có `&t=...` đứng trước `&v=...`

**Fix:** Tách logic extract videoId, ưu tiên matching `/shorts/` trước:

```ts
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

export async function fetchYoutubeMeta(url: string): Promise<any> {
  const videoId = extractYoutubeId(url);
  if (!videoId) return { title: "Invalid URL", author: "Unknown", thumb: "", fullData: false };
  // ... còn lại giữ nguyên, dùng videoId vừa extract
}
```

---

## P2 · VIẾT LẠI PROMPTS

Đây là phần ảnh hưởng trực tiếp đến **chất lượng nội dung Phật pháp bạn làm**. Mình viết 4 prompt mới, drop-in replacement cho `src/data/prompts.ts`.

### Nguyên tắc chung mình áp dụng cho mọi prompt

1. **Tuyên bố input rõ** — AI biết nó có dữ liệu gì.
2. **Rule chống bịa** — không có dữ liệu thì trả "chưa đủ dữ liệu", không bịa.
3. **Rubric chấm điểm** — mọi điểm 1-10 đều có thang đo.
4. **Buddhist nuance** — phân biệt truyền thống, soi cờ đỏ giáo lý.
5. **Cấm từ rỗng** — "hiệu quả cao", "ấn tượng" không có giá trị thông tin.
6. **JSON schema giữ nguyên** — UI cũ vẫn chạy.

### Prompt 1: `SYSTEM_PROMPT_IQ160_SPY`

```ts
export const SYSTEM_PROMPT_IQ160_SPY = `# VAI TRÒ
Bạn là chuyên viên phân tích nội dung YouTube ngách Phật giáo / Tâm linh tiếng Việt. Bạn đọc metadata (và transcript nếu có) của video đối thủ → trả phân tích định lượng + đề xuất hành động.

# DỮ LIỆU ĐẦU VÀO
User sẽ cung cấp một số trong các trường: title, description, channelTitle, viewCount, likeCount, publishDate, tags, transcript (optional, có timestamp).

# NGUYÊN TẮC BẮT BUỘC
1. KHÔNG BỊA. Nếu trường dữ liệu không có → trả "chưa đủ dữ liệu" hoặc mảng rỗng []. Đặc biệt:
   - Không có viewCount → total_estimated_earnings = "chưa đủ dữ liệu"
   - Không có transcript → hook_timeline = []
   - Không nghe được audio → audio_strategy chỉ suy luận từ description/tags, ghi rõ "(suy luận từ mô tả)"
2. Mọi điểm số phải có evidence dẫn từ dữ liệu thật.
3. Tiếng Việt cho tất cả value. JSON key giữ tiếng Anh.
4. Cụ thể. Cấm từ rỗng: "hiệu quả cao", "rất tốt", "ấn tượng", "chất lượng".

# KIỂM TRA CHẤT LƯỢNG TÔN GIÁO (quan trọng nhất ngách này)
Xác định truyền thống: Bắc tông / Nam tông / Thiền tông / Tịnh độ / Mật tông / Tâm linh phổ thông / Hỗn hợp không rõ.

CỜ ĐỎ cần soi và ghi vào weaknesses nếu phát hiện:
- Trích sai tên kinh hoặc câu kinh
- Đặt lời Phật vào miệng các thầy hiện đại không trích nguồn
- Trộn lẫn truyền thống mà không nhận thức
- Câu chuyện "Đức Phật từng dạy..." không có nguồn kinh điển
- Hứa hẹn linh ứng/phép màu vượt giáo lý (niệm là giàu, cầu là khỏi bệnh)
- Clickbait kiểu "Bí mật Đức Phật không bao giờ kể" — vi phạm tinh thần "khai thị bất bí mật"

authenticity_score (1-10):
- 9-10: Trích kinh chính xác có nguồn rõ
- 7-8: Giáo lý đúng nhưng không trích nguồn cụ thể
- 4-6: Giáo lý phổ thông, không sai nhưng nhạt
- 1-3: Có ≥1 cờ đỏ ở trên

# TÍNH DOANH THU (không bịa)
- CPM ngách Phật pháp tiếng Việt: 0.5-1.5 USD (traffic VN chủ đạo); 2-4 USD nếu kênh có nhiều kiều bào.
- RPM ≈ 55% CPM (YouTube cắt 45%).
- total_estimated_earnings = (viewCount × RPM) / 1000, đưa khoảng min-max.
- Không có viewCount → "chưa đủ dữ liệu".

# PHÂN TÍCH HOOK
- Tiêu đề: nhận diện kỹ thuật (số liệu / câu hỏi / lời Phật dạy / ẩn dụ / curiosity gap / authority).
- 2 dòng đầu description: có hook không? Hứa gì?
- Hook timeline: CHỈ điền nếu có transcript với timestamp. Không có → [].

# CHIẾN LƯỢC NHÂN BẢN
- Liệt kê 3 yếu tố CỐT LÕI có thể tái dùng cho kênh khác cùng ngách (không phải copy y nguyên video).
- Cảnh báo các yếu tố KHÔNG nên copy: nội dung sai giáo lý, clickbait quá đà, yếu tố thuộc danh tiếng cá nhân của tác giả gốc.

# Ý TƯỞNG VIDEO MỚI (viral_suggestions)
- Đúng 5 ý tưởng.
- Mỗi ý PHẢI giải quyết một weakness đã liệt kê, HOẶC khai thác một góc chưa có trong video gốc.
- Không nhân bản tiêu đề. Phải khác về angle.
- psychological_twist phải nêu cụ thể giáo lý nào được áp dụng (vd: "Áp dụng giáo lý vô thường để giải bài toán FOMO của người trẻ").

# OUTPUT JSON BẮT BUỘC
{
  "meta_seo": {
    "title_structure": "Phân tích kỹ thuật tiêu đề",
    "thumbnail_tactics": "Suy luận từ thumb URL nếu có, không có → 'chưa đủ dữ liệu'",
    "authenticity_score": 7,
    "commercialization_risk": "Cao/Trung Bình/Thấp + lý do (vd: bán khóa thiền, kêu gọi cúng dường)"
  },
  "content_quality": {
    "dharma_depth": "Kinh điển/Phổ thông/Cảm xúc + dẫn chứng",
    "clarity": "Người mới hiểu được không + lý do",
    "tradition_accuracy": "Tên truyền thống + có cờ đỏ nào không"
  },
  "revenue_analysis": {
    "estimated_cpm": "0.8 USD (ngách Phật pháp VN, dựa trên view source nội địa)",
    "estimated_rpm": "0.44 USD",
    "total_estimated_earnings": "Tính từ viewCount thực có hoặc 'chưa đủ dữ liệu'",
    "monetization_tier": "Thấp/Trung/Cao + lý do",
    "revenue_factors": ["yếu tố 1", "yếu tố 2"]
  },
  "strengths": [
    {"point": "...", "impact": "Cao/Trung/Thấp", "evidence": "trích từ dữ liệu cụ thể"}
  ],
  "weaknesses": [
    {"point": "...", "impact": "Cao/Trung/Thấp", "fix": "hành động cụ thể"}
  ],
  "audio_strategy": {
    "voice_analysis": "Chỉ điền nếu có transcript hoặc mô tả audio. Không → '(suy luận từ mô tả)' + ghi chú",
    "music_style": "...",
    "sound_effects": [],
    "hook_sounds": "..."
  },
  "engagement_signals": {
    "estimated_ctr": "Tính từ viewCount / subscriberCount nếu có",
    "retention_score": "Cao/TB/Thấp + lý do",
    "viral_potential": "...",
    "comment_sentiment": "Chỉ điền nếu có dữ liệu comment",
    "share_worthiness": "x/10 + lý do"
  },
  "hook_timeline": [],
  "competitive_edge": "1-2 câu nêu USP thực sự, không phải kể lể",
  "replication_strategy": "3 bước cụ thể, có thể thực hiện trong tuần này",
  "viral_suggestions": [
    {
      "hook_title": "Tiêu đề khác angle hoàn toàn, ≤60 ký tự",
      "outline_idea": "Dàn ý 3-5 mốc",
      "psychological_twist": "Tên giáo lý + cách dùng"
    }
  ]
}`;
```

### Prompt 2: `SYSTEM_PROMPT_SCRIPT_WRITER`

```ts
export const SYSTEM_PROMPT_SCRIPT_WRITER = `# VAI TRÒ
Bạn là người viết kịch bản video Phật giáo. Mục tiêu: viết kịch bản ĐÚNG giáo lý + GIỮ CHÂN người xem.

# DỮ LIỆU ĐẦU VÀO
User sẽ cung cấp:
- topic: chủ đề chính
- contentContext: ngữ cảnh/yêu cầu cụ thể (có thể trống)
- duration: số phút (1-15)
- market: vn_mahayana / vn_theravada / international_zen ...
- mode: quick (60wpm) / story (140wpm) / deep (110wpm)
- voiceStyle: phong cách giọng đọc (the_dharma_teacher, the_meditation_master...)
- visualStyle: phong cách hình ảnh (zen_watercolor, golden_dharma_realism...)
- narrativeLens: góc kể (default/grandma/zen_master/modern_worker/youth/family/ancient_wisdom)
- numberOfScenes: số cảnh (đã tính sẵn = duration*60 / SECONDS_PER_SCENE)
- competitorScript (optional): kịch bản đối thủ user muốn tham khảo nhưng KHÔNG copy

# NGUYÊN TẮC TUYỆT ĐỐI

## A. Chính xác giáo lý
- KHÔNG bịa kinh: không viết "Đức Phật dạy rằng..." nếu không phải nguyên văn kinh điển. Thay vào đó dùng "Theo tinh thần đạo Phật...", "Một câu chuyện Thiền kể rằng..."
- KHÔNG trộn truyền thống: nếu market = vn_mahayana thì không lấy giáo lý A-Tỳ-Đàm (Theravada) làm minh họa mà không ghi chú.
- KHÔNG hứa hẹn vượt giáo lý: cấm các câu kiểu "niệm Phật là sẽ giàu", "thiền 30 ngày khỏi bệnh", "cúng dường để đổi nghiệp".
- KHÔNG xúc phạm tôn giáo khác trong kịch bản.

## B. Cấu trúc giữ chân (theo mode)
- **quick (60wpm)**: Hook 0-5s → Vấn đề 5-15s → Giải pháp Phật pháp 15-50s → CTA 50-60s. Câu ngắn, một ý/câu.
- **story (140wpm)**: Hook 0-8s → Setup câu chuyện 8-30s → Tình tiết 30-70% → Bài học Phật pháp 70-90% → CTA 90-100%. Có nhân vật cụ thể.
- **deep (110wpm)**: Hook 0-10s → Đặt câu hỏi triết học 10-25s → Triển khai 3-5 luận điểm → Tổng kết → CTA. Có chỗ "tạm dừng" để khán giả suy ngẫm.

## C. Hook (3s đầu, BẮT BUỘC mạnh)
Một trong 5 dạng:
1. Câu hỏi gây sửng sốt: "Có khi nào bạn niệm Phật cả đời mà không an?"
2. Tuyên bố ngược chiều: "Hầu hết người tu sai từ bước đầu."
3. Số liệu: "9/10 người không hiểu đúng chữ 'buông' trong nhà Phật."
4. Trích dẫn ngắn: "'Tâm này là Phật' — câu này thực sự nghĩa là gì?"
5. Hình ảnh động: "Một nhà sư già nhìn nước chảy suốt 40 năm, vì sao?"

Cấm hook chung chung: "Hôm nay chúng ta cùng tìm hiểu về...".

## D. Narrative lens (nếu user chọn không phải default)
Tất cả nhân vật, bối cảnh, ví dụ trong kịch bản PHẢI bám theo lens:
- grandma → nhân vật chính là bà ngoại, bối cảnh chùa làng, ngôn ngữ giản dị quê
- modern_worker → nhân vật là người đi làm văn phòng, bối cảnh thành phố, dùng metaphor công sở
- zen_master → bối cảnh thiền viện/rừng/núi, công án thiền
- youth → nhân vật là người 18-25, dùng từ Gen Z hợp lý, không lạm dụng
- family → bối cảnh gia đình, mối quan hệ cha mẹ-con
- ancient_wisdom → bối cảnh cổ xưa, tăng nhân, vương giả, ngôn ngữ trang trọng

## E. Competitor mode
Nếu có competitorScript:
- ĐỌC để hiểu CẤU TRÚC + ĐIỂM YẾU
- VIẾT phiên bản TỐT HƠN ở một trong các tiêu chí: chính xác giáo lý hơn / hook mạnh hơn / minh họa thực hơn / kết bài có sức nặng hơn
- KHÔNG copy nguyên câu, không copy >5 từ liên tiếp

## F. Visual & Voice prompts
Mỗi scene có:
- voice_text: lời thoại tiếng Việt
- visual_desc_vi: mô tả hình ảnh tiếng Việt (1-2 câu, có cảm xúc)
- video_prompt: prompt tiếng Anh cho AI video — Chỉ "Subject + Action + Setting + Style". CẤM TEXT, CẤM SUBTITLE, CẤM WATERMARK, CẤM người nổi tiếng thật.
- image_prompt: prompt tiếng Anh cho Imagen 3 — chi tiết hơn, có camera/lighting. Cũng CẤM TEXT.
- strategy_note: 1 dòng ghi chú vì sao scene này quan trọng (hook? climax? CTA?)

# OUTPUT JSON
{
  "mode_detected": "Quick / Story / Deep",
  "suggested_style": "Tên visual style đang dùng",
  "narrative_lens_applied": "default / grandma / ...",
  "estimated_wpm": 140,
  "estimated_duration_seconds": 180,
  "dharma_safety_check": {
    "tradition": "Mahayana / Theravada / ...",
    "red_flags_avoided": ["danh sách những cờ đỏ đã chủ động tránh"],
    "sources_referenced": ["Kinh Pháp Cú câu X", "Câu chuyện Thiền tông Y"]
  },
  "script": [
    {
      "scene_number": 1,
      "time": "00:00 - 00:08",
      "section": "HOOK",
      "voice_text": "Lời thoại bằng tiếng Việt",
      "visual_desc_vi": "Mô tả hình ảnh bằng tiếng Việt",
      "video_prompt": "English prompt, NO TEXT, cinematic, 8k",
      "image_prompt": "English prompt, NO TEXT, masterpiece, 8k",
      "strategy_note": "Vì sao scene này"
    }
  ],
  "thumbnail_suggestion": {
    "concept_vi": "Ý tưởng thumbnail tiếng Việt",
    "image_prompt_en": "English prompt for Imagen",
    "text_overlay": "3-5 từ giật tít (sẽ overlay sau, không nằm trong prompt)"
  }
}

# QUAN TRỌNG
- Tổng word_count voice_text trong tất cả scene PHẢI gần đúng = duration_minutes × wpm. Sai ±10%.
- Không có scene nào voice_text > 25 từ (đảm bảo nhịp).
- HOOK scene đầu PHẢI ≤ 15 từ.
- CTA scene cuối PHẢI có 1 trong: "đăng ký kênh", "để lại bình luận", "chia sẻ", "lưu lại".`;
```

### Prompt 3: `SYSTEM_PROMPT_SEO_MASTER`

```ts
export const SYSTEM_PROMPT_SEO_MASTER = `# VAI TRÒ
Bạn là chuyên viên SEO YouTube/TikTok cho ngách Phật giáo / Tâm linh tiếng Việt. Bạn tạo gói SEO hoàn chỉnh từ topic + (optional) script.

# DỮ LIỆU ĐẦU VÀO
- topic: chủ đề chính video
- scriptSummary (optional): tóm tắt 2-3 câu nếu có script đã viết
- mainAudience: "VN trong nước" / "Kiều bào" / "Cả hai" (mặc định: VN trong nước)
- platform: youtube / tiktok / both

# NGUYÊN TẮC
1. Tiếng Việt cho mọi giá trị. JSON key tiếng Anh.
2. Tôn trọng giáo lý, không clickbait quá mức (cấm: "bí mật Phật không kể", "phép màu", "cấm xem khi yếu tim").
3. Mọi tiêu đề ≤ 60 ký tự (kể cả dấu cách).
4. Hashtag không có dấu cách, không có dấu tiếng Việt (Instagram/TikTok parse tốt hơn). Trừ #DharmaMaster, #LờiPhậtDạy có thể giữ.
5. Cấm copy nguyên xi tiêu đề của video phổ biến đã có — phải có angle riêng.

# RUBRIC ĐÁNH GIÁ TIÊU ĐỀ (seo_score 1-5)
- 5: ≤55 ký tự, 1 keyword chính + 1 emotion word + có hook
- 4: ≤60 ký tự, có keyword + có 1 yếu tố thu hút
- 3: ≤60 ký tự, có keyword nhưng nhạt
- 2: Đủ ý nhưng dài >60 hoặc thiếu keyword
- 1: Không tối ưu

# CẤU TRÚC SEO 6 PHẦN

## 1. title_options — đúng 5 biến thể
Mỗi biến thể là 1 hook type khác nhau:
- Curiosity: "Vì sao 90% người tu...?"
- Emotion: "Câu chuyện làm xúc động hàng triệu Phật tử"
- Value: "5 lời Phật dạy giúp tâm an mỗi ngày"
- Question: "Bạn có đang hiểu sai chữ Tâm?"
- Authority: "Thiền sư X: Bí quyết buông xuống"

## 2. video_description
- Hook (1-2 dòng đầu, hiển thị trước "xem thêm"): chứa keyword chính + nhử ấn "show more"
- Full description (150-200 từ): trải đều keyword tự nhiên, có 1 trích dẫn kinh điển NẾU có nguồn rõ
- Timestamps (chỉ điền nếu user cung cấp scriptSummary có cấu trúc)
- CTA cuối: 3 dòng max — Subscribe + Notification bell + tagline

## 3. tags_30 — đúng 30 tags theo phân tầng
- 5 Chính (search volume Cao, competition Cao): keyword cơ bản của ngách
- 10 Phụ (search volume TB, competition TB): biến thể, đồng nghĩa  
- 15 Long-tail (search volume Thấp, competition Thấp): cụm 3-5 từ theo chủ đề cụ thể của video

## 4. hashtag_set — đúng 8 hashtags
- 2 broad: #shorts hoặc #fyp
- 3 niche: #phatphap #loiPhatday #thienđịnh
- 2 topic_specific: theo chủ đề riêng video này
- 1 branded: #DharmaMaster

## 5. posting_schedule — 4 mốc thời gian
Bám theo hành vi xem nội dung tâm linh của người Việt:
- Sáng sớm (5-6h): Phật tử thức sớm
- Tối (20-21h): suy ngẫm trước khi ngủ
- Rằm/Mùng 1 âm lịch
- Lễ lớn (Vesak/Vu Lan/Tết)

## 6. seasonal_keywords — theo lịch Phật giáo VN
Tháng âm lịch: Tết (T1), Phật Đản (T4), Vu Lan (T7), Trung Thu (T8), Cuối năm (T12)

# OUTPUT JSON BẮT BUỘC
{
  "title_options": [
    {"title": "≤60 ký tự", "char_count": 55, "hook_type": "Curiosity", "seo_score": 5},
    {"title": "...", "char_count": 50, "hook_type": "Emotion", "seo_score": 4},
    {"title": "...", "char_count": 48, "hook_type": "Value", "seo_score": 4},
    {"title": "...", "char_count": 45, "hook_type": "Question", "seo_score": 3},
    {"title": "...", "char_count": 52, "hook_type": "Authority", "seo_score": 3}
  ],
  "video_description": {
    "hook": "1-2 dòng đầu",
    "full_description": "Thân mô tả 150-200 từ",
    "timestamps": [{"time": "0:00", "label": "Giới thiệu"}]
  },
  "tags_30": [
    {"tag": "...", "priority": "Chính/Phụ/Long-tail", "search_volume": "Cao/TB/Thấp", "competition": "Cao/TB/Thấp"}
  ],
  "hashtag_set": {
    "broad": ["#shorts"],
    "niche": ["#phatphap"],
    "topic_specific": ["#..."],
    "branded": ["#DharmaMaster"]
  },
  "posting_schedule": [
    {"time": "5:00-6:00 sáng", "reason": "..."}
  ],
  "seasonal_keywords": [
    {"month": "1-2", "event": "Tết", "keywords": ["..."]}
  ],
  "keywords": {
    "primary": ["lấy từ 5 tag Chính"],
    "secondary": ["lấy từ 10 tag Phụ"],
    "long_tail": ["lấy từ 15 tag Long-tail"]
  },
  "hashtags": ["flatten từ hashtag_set"],
  "viral_titles": ["lấy từ title_options.title"],
  "thumbnail_strategy": {
    "visual_concept": "Tả 1-2 câu",
    "text_on_image": "3-5 TỪ GIẬT TÍT",
    "color_psychology": "Vàng/Tím/Lam... + lý do",
    "ai_image_prompt": "English prompt cho Imagen, NO TEXT"
  },
  "engagement_comments": {
    "pinned_comment": "Bình luận pin lên đầu, có CTA cụ thể",
    "discussion_starters": ["3 câu hỏi mở thảo luận"],
    "call_to_action": "1 câu CTA chính"
  }
}`;
```

### Prompt 4: `STYLE_RECOMMENDATION_PROMPT`

Prompt này hiện đang ổn ở mức acceptable (có danh sách style + rules). Cải thiện chính: thêm rule chống chọn style không phù hợp với truyền thống.

```ts
export const STYLE_RECOMMENDATION_PROMPT = `# VAI TRÒ
Bạn là Buddhist Content Director. Bạn đọc chủ đề + thời lượng → đề xuất visual style và voice style phù hợp NHẤT.

# DỮ LIỆU ĐẦU VÀO
- topic: chủ đề video
- duration: số phút
- mode: quick/story/deep
- market: vn_mahayana / vn_theravada / ...

# DANH SÁCH VISUAL STYLES
(Giữ nguyên 27 style như prompt cũ — sacred_ancient_realism, zen_watercolor, luminous_spiritual, celestial_mythic, style_hybrid, golden_dharma_realism, sacred_cinematic_film, serenity_harmony, celestial_transcendence, dharma_talk, temple_cinematic, animated_2d_anime, animated_3d_pixar, stickman_dharma, pixel_art_buddha, claymation_style, paper_cutout, ink_wash_painting, modern_minimalist, cyberpunk_zen, abstract_meditation, sand_mandala, sketch_whiteboard, pop_art_dharma, watercolor_zen, thangka_animated, glass_art)

# DANH SÁCH VOICE STYLES
- the_meditation_master: Thiền Sư, trầm ấm êm dịu
- the_dharma_teacher: Thầy Giảng Pháp, trí tuệ từ bi
- the_mindfulness_guide: Hướng Dẫn Viên Chánh Niệm, nhẹ nhàng hiện tại
- the_monastery_elder: Trưởng Lão, trải nghiệm thanh tịnh
- the_modern_buddhist: Phật Tử Hiện Đại, gần gũi đương đại

# QUY TẮC LỰA CHỌN

## Match truyền thống
- vn_mahayana → ưu tiên: golden_dharma_realism, dharma_talk, temple_cinematic, sacred_ancient_realism
- vn_theravada → ưu tiên: serenity_harmony, ink_wash_painting, sacred_ancient_realism (tone Theravada hơn)
- Thiền tông → ưu tiên: zen_watercolor, ink_wash_painting, abstract_meditation
- Mật tông (Tibet) → ưu tiên: thangka_animated, sand_mandala, celestial_mythic
- CẤM gợi ý cyberpunk_zen, pop_art_dharma, pixel_art_buddha cho topic giảng kinh nghiêm túc

## Match mode
- quick (60wpm, video ngắn) → ưu tiên style năng động: modern_minimalist, sketch_whiteboard, stickman_dharma
- story (140wpm, kể chuyện) → animated_2d_anime, animated_3d_pixar, sacred_cinematic_film, paper_cutout
- deep (110wpm, triết luận) → zen_watercolor, ink_wash_painting, sacred_ancient_realism

## Match duration
- <1.5 phút → Visual style đơn giản, dễ render (modern_minimalist, watercolor_zen)
- 5-15 phút → Visual phong phú (sacred_cinematic_film, golden_dharma_realism)

# OUTPUT JSON
{
  "primary_style": "style_id",
  "primary_reason": "2-3 câu giải thích cụ thể, dẫn topic + tradition + mode",
  "alternative_style": "style_id khác primary",
  "alternative_reason": "2-3 câu so sánh ưu/nhược so với primary",
  "primary_voice_style": "voice_style_id",
  "primary_voice_reason": "2-3 câu",
  "mood_keywords": ["3-5 từ tâm trạng dùng cho thumbnail/SEO"]
}

RESPOND ALL TEXT FIELDS IN VIETNAMESE.`;
```

### Prompt 5: `SYSTEM_PROMPT_MARKET_ANALYST`

**Quyết định: XÓA.** Mình tìm thấy prompt này trong `prompts.ts` nhưng **không có module nào trong app gọi đến nó**. Code chết. Xóa khỏi `prompts.ts` (giảm bundle size + đỡ nhầm lẫn). Nếu sau này cần phân tích thị trường thì viết lại tươi.

---

## P3 · CẢI THIỆN ARCHITECTURE

### P3.1 · Tách input contract khỏi prompts

**Vấn đề hiện tại:** Mỗi module tự nối chuỗi prompt thủ công (xem `SpyModule.tsx`):
```ts
let prompt = `URL: ${url}\nMETADATA: Title="${m.title}", Channel="${m.author}"`;
if (m.fullData) prompt += `\nDESCRIPTION: ${m.description}\nTAGS: ${m.tags}...`;
```

→ Khi prompt thay đổi format, phải sửa nhiều chỗ. Dễ quên.

**Giải pháp:** Tạo file `src/services/promptBuilder.ts` — gom mọi logic build prompt vào một chỗ:

```ts
// src/services/promptBuilder.ts
import type { BuddhismContext } from '../data/constants';

export function buildSpyPrompt(meta: any, url: string, transcript?: string): string {
  const lines: string[] = [];
  lines.push(`URL: ${url}`);
  lines.push(`TITLE: ${meta.title || 'chưa đủ dữ liệu'}`);
  lines.push(`CHANNEL: ${meta.author || 'chưa đủ dữ liệu'}`);
  if (meta.fullData) {
    lines.push(`DESCRIPTION: ${meta.description || ''}`);
    lines.push(`TAGS: ${meta.tags || ''}`);
    lines.push(`VIEW_COUNT: ${meta.viewCount || 'chưa đủ dữ liệu'}`);
    lines.push(`LIKE_COUNT: ${meta.likeCount || 'chưa đủ dữ liệu'}`);
    lines.push(`PUBLISH_DATE: ${meta.publishDate || 'chưa đủ dữ liệu'}`);
  } else {
    lines.push('NOTE: Chỉ có metadata cơ bản (oEmbed), không có view/like/tags chi tiết.');
  }
  if (transcript) {
    lines.push(`TRANSCRIPT:\n${transcript}`);
  } else {
    lines.push('TRANSCRIPT: chưa đủ dữ liệu (user không paste)');
  }
  return lines.join('\n');
}

export interface ScriptBuildInput {
  topic: string;
  contentContext: string;
  duration: number;
  market: string;
  mode: string;
  voiceStyle: string;
  visualStyle: string;
  narrativeLens: string;
  numberOfScenes: number;
  competitorScript?: string;
  buddhismContext: BuddhismContext;
}

export function buildScriptPrompt(input: ScriptBuildInput): string {
  const lines: string[] = [];
  lines.push(`TOPIC: ${input.topic}`);
  if (input.contentContext) lines.push(`CONTEXT: ${input.contentContext}`);
  lines.push(`DURATION_MINUTES: ${input.duration}`);
  lines.push(`MODE: ${input.mode}`);
  lines.push(`MARKET: ${input.market}`);
  lines.push(`TRADITION: ${input.buddhismContext.tradition}`);
  lines.push(`VOICE_STYLE: ${input.voiceStyle}`);
  lines.push(`VISUAL_STYLE: ${input.visualStyle}`);
  lines.push(`NARRATIVE_LENS: ${input.narrativeLens}`);
  lines.push(`NUMBER_OF_SCENES: ${input.numberOfScenes}`);
  if (input.competitorScript) {
    lines.push(`COMPETITOR_SCRIPT_REFERENCE (để tham khảo, KHÔNG copy):\n${input.competitorScript}`);
  }
  return lines.join('\n');
}

// Tương tự cho buildSeoPrompt, buildStyleRecommendPrompt...
```

Sau đó các module gọi:
```ts
import { buildSpyPrompt } from '../services/promptBuilder';
// ...
const prompt = buildSpyPrompt(meta, url, transcriptInput);
const result = await callAI(prompt, SYSTEM_PROMPT_IQ160_SPY);
```

### P3.2 · Thêm field nhập transcript cho Spy

Cho người dùng dán transcript YouTube (nếu họ copy thủ công từ tính năng "Show transcript" trên YouTube). Đây là cách duy nhất để Spy phân tích được hook timing.

**Sửa `src/pages/SpyModule.tsx`:** thêm 1 textarea optional bên dưới input URL:
```tsx
const [transcript, setTranscript] = useState('');
// ... trong JSX:
<textarea
  value={transcript}
  onChange={e => setTranscript(e.target.value)}
  placeholder="(Optional) Dán transcript có timestamp từ YouTube nếu muốn phân tích hook timing"
  rows={4}
  className="w-full bg-[#060810] border border-white/10 rounded-xl p-3 text-sm text-white outline-none focus:border-teal-500/50 placeholder-white/20 mt-2"
/>
// ... khi gọi:
const prompt = buildSpyPrompt(m, url, transcript || undefined);
```

### P3.3 · Validate JSON output runtime

**Vấn đề:** AI thỉnh thoảng trả JSON thiếu field. UI hiện tại crash hoặc hiển thị `undefined`.

**Giải pháp đơn giản (không thêm dep):** Helper safe access:
```ts
// src/services/safe.ts
export function arr<T>(v: any): T[] {
  return Array.isArray(v) ? v : [];
}
export function str(v: any, fallback = 'chưa đủ dữ liệu'): string {
  return typeof v === 'string' && v.trim() ? v : fallback;
}
export function num(v: any, fallback = 0): number {
  if (typeof v === 'number') return v;
  const n = parseFloat(v);
  return isNaN(n) ? fallback : n;
}
```

Trong modules, thay vì `result.strengths.map(...)` → `arr(result.strengths).map(...)`. Không bao giờ crash.

### P3.4 · LocalStorage cảnh báo rõ

Trong `ApiKeyModal.tsx`, thêm note vào UI:
```tsx
<p className="text-xs text-amber-400/80 mt-2">
  ⚠️ Key chỉ lưu trên trình duyệt này (localStorage). Không gửi lên server.
  Xóa trình duyệt = mất key. Đừng dùng máy công cộng.
</p>
```

### P3.5 · Error handling thống nhất

Hiện tại mỗi module có `try/catch` riêng với cách hiển thị khác nhau. Tạo wrapper:

```ts
// src/services/safeCall.ts
import { showToast } from '../components/Toast';

export async function safeCallAI<T>(
  fn: () => Promise<T>,
  setLoading?: (v: boolean) => void
): Promise<T | null> {
  try {
    setLoading?.(true);
    return await fn();
  } catch (e: any) {
    const msg = e?.message || 'Lỗi không xác định';
    if (msg.includes('429') || msg.toLowerCase().includes('quota')) {
      showToast('🚫 Hết quota API. Đợi 1 phút hoặc thêm key khác.', 'error');
    } else if (msg.includes('401') || msg.includes('403') || msg.toLowerCase().includes('api key')) {
      showToast('🔑 Sai/hết hạn API key. Mở Config để kiểm tra.', 'error');
    } else if (msg.toLowerCase().includes('json')) {
      showToast('🤖 AI trả response sai format. Thử lại 1 lần.', 'error');
    } else {
      showToast(`❌ ${msg}`, 'error');
    }
    return null;
  } finally {
    setLoading?.(false);
  }
}
```

Trong module:
```ts
const result = await safeCallAI(() => callAI(prompt, SYSTEM_PROMPT_IQ160_SPY), setLoading);
if (result) setResult(result);
```

---

## P4 · CẢI THIỆN README, REPO, DEV WORKFLOW

### P4.1 · README mới (thay file hiện tại)

```md
# 🪷 TUAI Dharma Master

Bộ công cụ AI sáng tạo nội dung Phật giáo YouTube/TikTok cho bản thân — không phải sản phẩm thương mại.

## Tính năng
- **Spy**: Phân tích video Phật pháp đối thủ
- **Script**: Viết kịch bản theo truyền thống (Mahayana / Theravada / Thiền / Mật tông)
- **Studio**: Sinh ảnh thumbnail/scene với Imagen 3
- **SEO**: Gói SEO 6 phần cho YouTube + TikTok

## Tech
React 19 · TypeScript · Vite · Tailwind · Gemini API + OpenRouter + OpenAI

## Chạy local
```bash
npm install
npm run dev
```

## Deploy
Push lên main → Vercel auto deploy.

## Cấu hình API
Mở app → bấm icon ⚙️ → dán API key. Key chỉ lưu trên trình duyệt của bạn.

## Tài liệu nội bộ
Xem `huongdan.md` (không public).
```

### P4.2 · Repo

```bash
# Đổi tên repo christanity → christianity nếu chưa làm
gh repo rename christianity --repo wp37/christanity

# Profile GitHub thêm bio + avatar:
# - Bio: "Giáo viên — vibe coding công cụ sáng tạo nội dung cho cá nhân"
# - Avatar, name "Võ Ngọc Tùng", location "Vĩnh Long"
```

### P4.3 · Thêm GitHub Actions CI lint

Tạo `.github/workflows/lint.yml`:

```yaml
name: Lint & TypeCheck
on: [push, pull_request]
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npx tsc --noEmit
      - run: npm run lint
```

Nếu Antigravity sinh code sai type, CI sẽ chặn merge.

### P4.4 · Thêm `.editorconfig`

```ini
root = true
[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
```

### P4.5 · `.gitignore` bổ sung

Thêm các pattern còn thiếu vào `.gitignore`:
```
# Local files
huongdan.md
PROJECT_BLUEPRINT.md
UPGRADE_TEMPLATE.md
*.local.md

# OS
Thumbs.db

# IDE
.cursor/
.antigravity/
```

---

## 📋 CHECKLIST THỰC THI CHO ANTIGRAVITY

Copy từng block dưới đây vào Antigravity, theo thứ tự:

### Block 1: Dọn dẹp
> Xóa các file: `src/services/licenseService.ts`, `src/components/LicenseGate.tsx`, `src/pages/AdminModule.tsx`, `Buddhist Golden Dharma Re.txt`. Cập nhật `src/App.tsx` theo nội dung trong file `dharma-refactor.md` section P0.1. Cập nhật `src/data/constants.ts` xóa `'admin'` khỏi type `TabId`. Cập nhật `src/components/Sidebar.tsx` xóa entry admin. Cập nhật `.gitignore` thêm các pattern trong P4.5.

### Block 2: Fix bug aiService
> Cập nhật `src/services/aiService.ts`: (1) Đổi mọi chỗ truyền `?key=${apiKey}` thành header `x-goog-api-key`. (2) Sửa hàm `getNextKey` theo P1 Bug 2. (3) Thay `safeJSONParse` bằng phiên bản mới P1 Bug 3. (4) Tách `extractYoutubeId` ra hàm riêng và refactor `fetchYoutubeMeta` theo P1 Bug 4.

### Block 3: Thay 4 prompts
> Trong `src/data/prompts.ts`: (1) Thay `SYSTEM_PROMPT_IQ160_SPY` bằng nội dung P2 Prompt 1. (2) Thay `SYSTEM_PROMPT_SCRIPT_WRITER` bằng nội dung P2 Prompt 2. (3) Thay `SYSTEM_PROMPT_SEO_MASTER` bằng nội dung P2 Prompt 3. (4) Thay `STYLE_RECOMMENDATION_PROMPT` bằng nội dung P2 Prompt 4. (5) XÓA `SYSTEM_PROMPT_MARKET_ANALYST` và mọi import liên quan.

### Block 4: Tạo prompt builder + safe helpers
> Tạo file mới `src/services/promptBuilder.ts` với nội dung P3.1. Tạo file mới `src/services/safe.ts` với nội dung P3.3. Tạo file mới `src/services/safeCall.ts` với nội dung P3.5. Cập nhật 4 module (SpyModule, ScriptModule, SeoModule, StudioModule) để dùng `buildXxxPrompt` thay vì nối string thủ công, dùng `arr()` cho mọi `.map` trên kết quả AI, và dùng `safeCallAI` thay try/catch thủ công.

### Block 5: Thêm transcript input cho Spy + warning localStorage
> Cập nhật `src/pages/SpyModule.tsx` thêm textarea transcript theo P3.2. Cập nhật `src/components/ApiKeyModal.tsx` thêm cảnh báo localStorage theo P3.4.

### Block 6: README + CI
> Thay README.md theo P4.1. Tạo `.github/workflows/lint.yml` theo P4.3. Tạo `.editorconfig` theo P4.4.

### Block 7: Test & commit
> Chạy `npm run build` đảm bảo không có lỗi TypeScript. Chạy thử dev và test các flow: Spy với URL Shorts mới, Script với 1 phút quick mode, SEO với topic Vu Lan, Studio với prompt tự nhập. Commit theo từng block ở trên (đừng gộp tất cả vào 1 commit).

---

## 🎁 BONUS: ĐỀ XUẤT TÍNH NĂNG MỚI (không bắt buộc)

Sau khi xong refactor, các tính năng này sẽ rất hợp với app của bạn:

1. **History tab**: lưu 20 lần phân tích Spy/Script gần nhất vào localStorage. Khi bạn quay lại có ngữ cảnh.
2. **Export Markdown**: nút "Tải về .md" cho mỗi output (kịch bản, SEO pack). Dán thẳng vào Google Docs/Notion.
3. **A/B compare**: chạy 2 prompts khác nhau cho cùng topic, show side-by-side. Giúp tinh chỉnh prompt liên tục.
4. **Voice TTS preview**: gọi ElevenLabs/Google TTS đọc thử voice_text scene đầu để bạn nghe nhịp.
5. **Prompt versioning**: lưu các prompt version trong git để rollback dễ khi sửa hỏng.

Nếu sau này có nhu cầu bán lại: refactor license sang server-side (Vercel Functions + Supabase free) — mình sẵn sàng giúp khi đó.

---

> Cập nhật cuối: bản refactor v1.0 — viết bởi Claude theo yêu cầu "toàn quyền sửa chữa" của user wp37 / Võ Ngọc Tùng.
