# 📋 Prompts Refactoring Documentation

## Tổng Quan

File `prompts.ts` đã được cải tiến để cải thiện tính bảo trì, type-safety, và tổ chức code.

## 🔄 Các Thay Đổi Chính

### 1. **Tách Thành 3 File Riêng Biệt**

#### `promptTypes.ts` - TypeScript Interfaces
- Định nghĩa tất cả các types cho response JSON
- Bao gồm 20+ interfaces cho các modules khác nhau
- Cung cấp type-safety khi sử dụng prompts

**Interfaces chính:**
- `SpyAnalysisResponse` - Phân tích YouTube
- `ScriptResponse` - Kịch bản video
- `SEOResponse` - Tối ưu SEO
- `MarketAnalysisResponse` - Phân tích thị trường

#### `promptConstants.ts` - Constants & Enums
- Tách tất cả hardcoded values ra constants
- Dễ dàng cập nhật giá trị mà không sửa prompts
- Bao gồm:
  - `REVENUE_CONSTANTS` - CPM, RPM, earnings
  - `ENGAGEMENT_METRICS` - CTR, retention ranges
  - `MARKET_CONSTANTS` - Market size, growth rate
  - `PRODUCT_PRICE_RANGES` - Giá sản phẩm
  - Và nhiều constants khác

#### `prompts.ts` - System Prompts (Cải tiến)
- Import types từ `promptTypes.ts`
- Import constants từ `promptConstants.ts`
- Thêm JSDoc documentation cho mỗi prompt
- Thống nhất ngôn ngữ (tiếng Việt cho tất cả)

### 2. **Thêm JSDoc Documentation**

Mỗi prompt giờ có JSDoc comment chi tiết:

```typescript
/**
 * SPY MODULE - Phân Tích Đối Thủ Cạnh Tranh YouTube
 *
 * Vai trò: Chuyên Gia Phân Tích YouTube + Chiến Lược Gia Nội Dung Phật Giáo
 * Kinh nghiệm: 10+ năm phân tích video Phật Pháp/Thiền Định viral
 *
 * Mục đích: Cung cấp phân tích ĐỐI THỦ CẠNH TRANH chuyên sâu...
 *
 * Output: JSON với cấu trúc SpyAnalysisResponse
 *
 * @see SpyAnalysisResponse
 * @see REVENUE_CONSTANTS
 */
```

### 3. **Thống Nhất Ngôn Ngữ**

- **Trước:** 3 prompts tiếng Việt, 1 prompt tiếng Anh
- **Sau:** Tất cả 4 prompts đều tiếng Việt
- Giữ nguyên tiếng Anh cho tên trường JSON (best practice)

### 4. **Cấu Trúc Mới**

```
src/data/
├── prompts.ts              (System prompts - cải tiến)
├── promptTypes.ts          (TypeScript interfaces - MỚI)
├── promptConstants.ts      (Constants & enums - MỚI)
├── constants.ts            (Existing - không thay đổi)
└── PROMPTS_REFACTORING.md  (Documentation - MỚI)
```

## 📊 Lợi Ích

### ✅ Type Safety
```typescript
// Trước: Không có type checking
const response = JSON.parse(aiOutput);

// Sau: Full type checking
const response: SpyAnalysisResponse = JSON.parse(aiOutput);
```

### ✅ Dễ Bảo Trì
```typescript
// Trước: Hardcoded trong prompt
"estimated_cpm": "$4-8 (ngách Phật giáo/Tâm linh)"

// Sau: Từ constants
REVENUE_CONSTANTS.buddhist_niche.min_cpm // 4
REVENUE_CONSTANTS.buddhist_niche.max_cpm // 8
```

### ✅ Tốt Hơn Cho IDE
- Auto-complete cho types
- JSDoc hints khi hover
- Refactoring tools hoạt động tốt hơn

### ✅ Dễ Mở Rộng
- Thêm prompt mới: chỉ cần thêm interface + JSDoc
- Cập nhật constants: không cần sửa prompts
- Thêm validation: dễ dàng với types

## 🔧 Cách Sử Dụng

### Import Types
```typescript
import type { SpyAnalysisResponse, ScriptResponse } from '@/data/promptTypes';
```

### Import Constants
```typescript
import { REVENUE_CONSTANTS, ENGAGEMENT_METRICS } from '@/data/promptConstants';
```

### Import Prompts
```typescript
import { SYSTEM_PROMPT_IQ160_SPY, SYSTEM_PROMPT_SCRIPT_WRITER } from '@/data/prompts';
```

### Sử Dụng Trong Code
```typescript
// Type-safe response handling
const response: SpyAnalysisResponse = JSON.parse(aiOutput);

// Access constants
const cpmRange = `$${REVENUE_CONSTANTS.buddhist_niche.min_cpm}-${REVENUE_CONSTANTS.buddhist_niche.max_cpm}`;
```

## 📝 Modules

### 1. SPY MODULE (Phân Tích YouTube)
- **Prompt:** `SYSTEM_PROMPT_IQ160_SPY`
- **Type:** `SpyAnalysisResponse`
- **Mục đích:** Phân tích video YouTube, doanh thu, engagement
- **Output:** JSON với 10+ fields phân tích

### 2. SCRIPT MODULE (Viết Kịch Bản)
- **Prompt:** `SYSTEM_PROMPT_SCRIPT_WRITER`
- **Type:** `ScriptResponse`
- **Mục đích:** Tạo kịch bản video Phật giáo
- **Output:** JSON với scenes, voice text, visual descriptions

### 3. SEO MODULE (Tối Ưu SEO)
- **Prompt:** `SYSTEM_PROMPT_SEO_MASTER`
- **Type:** `SEOResponse`
- **Mục đích:** Tạo chiến lược SEO YouTube
- **Output:** JSON với keywords, titles, descriptions, thumbnails

### 4. MARKET ANALYST MODULE (Phân Tích Thị Trường)
- **Prompt:** `SYSTEM_PROMPT_MARKET_ANALYST`
- **Type:** `MarketAnalysisResponse`
- **Mục đích:** Phân tích thị trường Phật giáo
- **Output:** JSON với customer persona, market potential, products

## 🚀 Next Steps (Tùy Chọn)

### Cấp độ 1: Validation
```typescript
// Thêm Zod schemas để validate AI responses
import { z } from 'zod';

export const SpyAnalysisSchema = z.object({
  meta_seo: z.object({...}),
  content_quality: z.object({...}),
  // ...
});
```

### Cấp độ 2: Prompt Builder
```typescript
// Tạo builder pattern cho dynamic prompts
class PromptBuilder {
  withContext(context: BuddhismContext) { ... }
  withLanguage(lang: string) { ... }
  build(): string { ... }
}
```

### Cấp độ 3: Testing
```typescript
// Unit tests cho prompts
describe('SYSTEM_PROMPT_IQ160_SPY', () => {
  it('should return valid SpyAnalysisResponse', () => { ... });
});
```

## ✨ Tóm Tắt

| Aspect | Trước | Sau |
|--------|-------|-----|
| **Files** | 1 file | 3 files (organized) |
| **Type Safety** | ❌ | ✅ |
| **Documentation** | ❌ | ✅ (JSDoc) |
| **Constants** | Hardcoded | ✅ Centralized |
| **Language** | Mixed | ✅ Unified (Tiếng Việt) |
| **Maintainability** | Khó | ✅ Dễ |
| **IDE Support** | Yếu | ✅ Tốt |

---

**Last Updated:** 2026-05-11  
**Status:** ✅ Build Successful
