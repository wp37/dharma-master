// ==================================================================================
// PROMPT TYPES & INTERFACES — TUAI Dharma Master
// ==================================================================================

/**
 * SEO Meta Information for YouTube Videos
 */
export interface MetaSEO {
  title_structure: string;
  thumbnail_tactics: string;
  authenticity_score: string;
  commercialization_risk: "Cao" | "Trung Bình" | "Thấp";
}

/**
 * Content Quality Assessment
 */
export interface ContentQuality {
  dharma_depth: string;
  clarity: string;
  tradition_accuracy: string;
}

/**
 * Revenue Analysis for Buddhist Content
 */
export interface RevenueAnalysis {
  estimated_cpm: string;
  estimated_rpm: string;
  total_estimated_earnings: string;
  monetization_tier: "Cao Cấp" | "Cao" | "Trung Bình" | "Thấp";
  revenue_factors: string[];
}

/**
 * Content Strength Point
 */
export interface StrengthPoint {
  point: string;
  impact: "Cao" | "Trung Bình" | "Thấp";
  evidence: string;
}

/**
 * Content Weakness Point
 */
export interface WeaknessPoint {
  point: string;
  impact: "Cao" | "Trung Bình" | "Thấp";
  fix: string;
}

/**
 * Audio Strategy Analysis
 */
export interface AudioStrategy {
  voice_analysis: string;
  music_style: string;
  sound_effects: string[];
  hook_sounds: string;
}

/**
 * Engagement Signals
 */
export interface EngagementSignals {
  estimated_ctr: string;
  retention_score: "Cao" | "Trung Bình" | "Thấp";
  viral_potential: string;
  comment_sentiment: string;
  share_worthiness: string;
}

/**
 * Hook Timeline Entry
 */
export interface HookTimeline {
  timestamp: string;
  hook_type: string;
  description: string;
}

/**
 * Viral Suggestion
 */
export interface ViralSuggestion {
  hook_title: string;
  outline_idea: string;
  psychological_twist: string;
}

/**
 * Complete Spy Analysis Response
 */
export interface SpyAnalysisResponse {
  meta_seo: MetaSEO;
  content_quality: ContentQuality;
  revenue_analysis: RevenueAnalysis;
  strengths: StrengthPoint[];
  weaknesses: WeaknessPoint[];
  audio_strategy: AudioStrategy;
  engagement_signals: EngagementSignals;
  hook_timeline: HookTimeline[];
  competitive_edge: string;
  replication_strategy: string;
  viral_suggestions: ViralSuggestion[];
}

/**
 * Script Scene
 */
export interface ScriptScene {
  scene_number: number;
  time: string;
  section: "HOOK" | "BODY" | "CTA" | "OUTRO";
  voice_text: string;
  visual_desc_vi: string;
  video_prompt: string;
  image_prompt: string;
  strategy_note: string;
}

/**
 * Complete Script Response
 */
export interface ScriptResponse {
  mode_detected: "Dharma Talk" | "Meditation Guide" | "Sutra Study" | "Buddhist History";
  suggested_style: string;
  script: ScriptScene[];
}

/**
 * SEO Keywords
 */
export interface SEOKeywords {
  primary: string[];
  secondary: string[];
  long_tail: string[];
}

/**
 * Video Description
 */
export interface VideoDescription {
  hook: string;
  full_description: string;
  timestamps: Array<{ time: string; label: string }>;
}

/**
 * Thumbnail Strategy
 */
export interface ThumbnailStrategy {
  visual_concept: string;
  text_on_image: string;
  color_psychology: string;
  ai_image_prompt: string;
}

/**
 * Engagement Comments
 */
export interface EngagementComments {
  pinned_comment: string;
  discussion_starters: string[];
  call_to_action: string;
}

/**
 * Complete SEO Response
 */
export interface SEOResponse {
  keywords: SEOKeywords;
  hashtags: string[];
  video_description: VideoDescription;
  viral_titles: string[];
  thumbnail_strategy: ThumbnailStrategy;
  engagement_comments: EngagementComments;
}

/**
 * Customer Demographics
 */
export interface CustomerDemographics {
  age_range: string;
  gender_split: string;
}

/**
 * Customer Psychographics
 */
export interface CustomerPsychographics {
  interests: string[];
  values: string[];
  pain_points: string[];
  buying_triggers: string[];
}

/**
 * Customer Persona
 */
export interface CustomerPersona {
  demographics: CustomerDemographics;
  psychographics: CustomerPsychographics;
}

/**
 * Market Potential
 */
export interface MarketPotential {
  market_size: string;
  growth_rate: string;
  competition_level: "Low" | "Low-Medium" | "Medium" | "Medium-High" | "High";
}

/**
 * Product Recommendation
 */
export interface ProductRecommendation {
  name: string;
  price_range: string;
  margin: string;
}

/**
 * Product Category
 */
export interface ProductCategory {
  category: string;
  products: ProductRecommendation[];
}

/**
 * Complete Market Analysis Response
 */
export interface MarketAnalysisResponse {
  customer_persona: CustomerPersona;
  market_potential: MarketPotential;
  product_recommendations: ProductCategory[];
}
