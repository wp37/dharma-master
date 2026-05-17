// ==================================================================================
// PROMPT CONSTANTS — TUAI Dharma Master
// ==================================================================================

/**
 * CPM (Cost Per Mille) - Giá quảng cáo trên 1000 lượt xem
 * Dành cho nội dung Phật giáo/Tâm linh
 */
export const REVENUE_CONSTANTS = {
  // CPM ranges by niche
  buddhist_niche: {
    min_cpm: 4,
    max_cpm: 8,
    currency: "USD",
    description: "Ngách Phật giáo/Tâm linh",
  },

  // RPM (Revenue Per Mille) - Thu nhập sau khi YouTube cắt 45%
  rpm: {
    min_rpm: 2,
    max_rpm: 4,
    currency: "USD",
    youtube_cut_percentage: 45,
    description: "Sau khi YouTube cắt 45%",
  },

  // Estimated earnings for 1000 views
  estimated_earnings_per_1k_views: {
    min: 1200,
    max: 4800,
    currency: "USD",
    description: "Dựa trên lượt xem",
  },

  // Monetization tiers
  monetization_tiers: {
    cao_cap: "Cao Cấp",
    cao: "Cao",
    trung_binh: "Trung Bình",
    thap: "Thấp",
  },
};

/**
 * Revenue factors for Buddhist content
 */
export const REVENUE_FACTORS = [
  "Ngách Thiền định",
  "Thời gian xem dài",
  "Khán giả trưởng thành 25-55",
  "Nội dung chất lượng cao",
  "Engagement tốt",
];

/**
 * Engagement metrics ranges
 */
export const ENGAGEMENT_METRICS = {
  ctr: {
    min: 6,
    max: 10,
    unit: "%",
    description: "Click-Through Rate",
  },
  retention_levels: {
    cao: "Cao",
    trung_binh: "Trung Bình",
    thap: "Thấp",
  },
  viral_potential: {
    cao: "Cao",
    trung_binh_cao: "Trung Bình-Cao",
    trung_binh: "Trung Bình",
    thap: "Thấp",
  },
  share_worthiness_max: 10,
};

/**
 * Impact levels for analysis
 */
export const IMPACT_LEVELS = {
  cao: "Cao",
  trung_binh: "Trung Bình",
  thap: "Thấp",
};

/**
 * Commercialization risk levels
 */
export const COMMERCIALIZATION_RISK = {
  cao: "Cao",
  trung_binh: "Trung Bình",
  thap: "Thấp",
};

/**
 * Market analysis constants
 */
export const MARKET_CONSTANTS = {
  buddhist_market: {
    market_size: "$200M+",
    growth_rate: "20-25% YoY",
    competition_level: "Low-Medium",
  },
  customer_age_range: "25-55",
  customer_gender_split: {
    female: 55,
    male: 45,
  },
};

/**
 * Product price ranges for Buddhist niche
 */
export const PRODUCT_PRICE_RANGES = {
  meditation_course: {
    min: 20,
    max: 50,
    currency: "USD",
    margin: "80%",
  },
  retreat_packages: {
    min: 500,
    max: 2000,
    currency: "USD",
    margin: "60%",
  },
  online_coaching: {
    min: 100,
    max: 500,
    currency: "USD",
    margin: "85%",
  },
};

/**
 * Hook timing recommendations
 */
export const HOOK_TIMING = {
  initial_hook: {
    start: 0,
    end: 3,
    unit: "seconds",
    description: "Hình ảnh + Âm thanh",
  },
  attention_window: {
    start: 0,
    end: 8,
    unit: "seconds",
    description: "Cửa sổ chú ý ban đầu",
  },
};

/**
 * Audio strategy recommendations
 */
export const AUDIO_STRATEGY_DEFAULTS = {
  voice_style: "Giọng nói bình tĩnh, nhẹ nhàng. Nhịp chậm.",
  music_style: "Nhạc Thiền / chuông bát",
  sound_effects: ["Chuông chùa", "Tiếng thiên nhiên"],
  hook_sound: "Tiếng chuông bát tại 0:03 để tập trung sự chú ý",
};

/**
 * Comment sentiment types
 */
export const COMMENT_SENTIMENTS = {
  positive: "Tích cực",
  grateful: "Biết ơn",
  thoughtful: "Suy tư",
  inspired: "Truyền cảm hứng",
};

/**
 * Script section types
 */
export const SCRIPT_SECTIONS = {
  hook: "HOOK",
  body: "BODY",
  cta: "CTA",
  outro: "OUTRO",
};

/**
 * Script modes
 */
export const SCRIPT_MODES = {
  dharma_talk: "Dharma Talk",
  meditation_guide: "Meditation Guide",
  sutra_study: "Sutra Study",
  buddhist_history: "Buddhist History",
};
