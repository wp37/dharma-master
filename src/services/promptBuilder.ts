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
    lines.push('NOTE: Chỉ có metadata cơ bản, không có view/like/tags chi tiết.');
  }
  if (transcript && transcript.trim()) {
    lines.push(`TRANSCRIPT:\n${transcript.trim()}`);
  }
  lines.push('\nMỤC TIÊU: Khai thác 10 ý tưởng content mới. Đừng đánh giá doanh thu, đừng chấm điểm chất lượng.');
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

export interface SeoBuildInput {
  topic: string;
  platform: string;
  buddhismContext: BuddhismContext;
}

export function buildSeoPrompt(input: SeoBuildInput): string {
  const lines: string[] = [];
  lines.push(`TOPIC: "${input.topic}"`);
  lines.push(`PLATFORM: ${input.platform}`);
  lines.push(`TARGET_LANGUAGE: ${input.buddhismContext.voice_lang}`);
  lines.push(`TARGET_MARKET: ${input.buddhismContext.name}`);
  lines.push(`TRADITION: ${input.buddhismContext.tradition}`);
  lines.push(`CULTURE: ${input.buddhismContext.culture}`);
  lines.push(`NICHE: Buddhist/Dharma/Meditation`);
  lines.push(`GENERATE JSON. RESPOND IN VIETNAMESE WHERE APPLICABLE.`);
  return lines.join('\n');
}

export interface StyleRecommendBuildInput {
  topic: string;
  duration: number;
  mode: string;
  market: string;
  buddhismContext: BuddhismContext;
}

export function buildStyleRecommendPrompt(input: StyleRecommendBuildInput): string {
  const lines: string[] = [];
  lines.push(`CHỦ ĐỀ: "${input.topic}"`);
  lines.push(`THỜI LƯỢNG: ${input.duration} phút`);
  lines.push(`CHẾ ĐỘ: ${input.mode}`);
  lines.push(`TRUYỀN THỐNG: ${input.buddhismContext.tradition}`);
  lines.push(`BỐI CẢNH CỦA THỊ TRƯỜNG: ${input.buddhismContext.name}`);
  lines.push(`ĐỀ XUẤT PHONG CÁCH PHÙ HỢP.`);
  return lines.join('\n');
}
