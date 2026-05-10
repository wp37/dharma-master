// ==================================================================================
// CONFIGURATION & CONSTANTS — TUAI Dharma Master
// ==================================================================================

export const MODELS = {
  text: "gemini-2.5-flash",
  image: "imagen-3.0-generate-002",
  openrouter_default: "google/gemini-2.0-flash-exp:free",
};

export const GOOGLE_LABS_URLS = {
  video: "https://aitestkitchen.withgoogle.com/tools/video-fx",
  image: "https://aitestkitchen.withgoogle.com/tools/image-fx",
};

export interface BuddhismContext {
  id: string;
  name: string;
  flag: string;
  voice_lang: string;
  currency: string;
  culture: string;
  tradition: string;
  key_practices: string;
  philosophy: string;
  writing_style: string;
  human_element: string;
}

export const BUDDHISM_CONTEXTS: Record<string, BuddhismContext> = {
  vn_mahayana: {
    id: 'vn_mahayana', name: 'Vietnam (Mahayana - Thiền Tông)', flag: '🇻🇳',
    voice_lang: 'Vietnamese', currency: 'VND',
    culture: 'Thiền Buddhism fusion with local traditions, ancestor veneration, Quan Âm devotion, pagoda culture, vegetarianism, mindfulness in daily life, compassionate living.',
    tradition: 'Mahayana (Đại Thừa)',
    key_practices: 'Thiền meditation, chanting, vegetarian diet, ancestor worship.',
    philosophy: 'Bodhisattva path, compassion, filial piety.',
    writing_style: 'Warm, poetic, respectful, storytelling.',
    human_element: 'Stories of village pagoda life, grandmother\'s wisdom.'
  },
  th_theravada: {
    id: 'th_theravada', name: 'Thailand (Theravada - Forest Tradition)', flag: '🇹🇭',
    voice_lang: 'Thai', currency: 'THB',
    culture: 'Vipassana meditation, monk ordination, merit-making (tam bun), Dhamma talks, forest monasteries, alms rounds.',
    tradition: 'Theravada (เถรวาท)',
    key_practices: 'Vipassana, alms giving, Pali chanting.',
    philosophy: 'Four Noble Truths, Noble Eightfold Path, impermanence.',
    writing_style: 'Gentle, respectful, practical wisdom, nature metaphors.',
    human_element: 'Monk\'s forest meditation, family merit-making.'
  },
  kh_theravada: {
    id: 'kh_theravada', name: 'Cambodia (Theravada - Khmer Buddhism)', flag: '🇰🇭',
    voice_lang: 'Khmer', currency: 'KHR',
    culture: 'Angkor Wat heritage, monk blessing ceremonies, Pchum Ben (ancestor festival), traditional Khmer chanting, pagoda life in rural villages.',
    tradition: 'Theravada (ព្រះពុទ្ធសាសនាថេរវាទ)',
    key_practices: 'Chanting, meditation, ancestor offerings, monk ordination.',
    philosophy: 'Karma, merit-making, loving-kindness, ancestral connection.',
    writing_style: 'Respectful, traditional, deeply rooted in Khmer history, graceful.',
    human_element: 'Village elder sharing wisdom, monk blessing family.'
  },
  tb_vajrayana: {
    id: 'tb_vajrayana', name: 'Tibet (Vajrayana Buddhism)', flag: '🇨🇳',
    voice_lang: 'Tibetan', currency: 'CNY',
    culture: 'Tantric practices, mandala creation, prayer wheels, prayer flags, prostrations, sky burial, Dalai Lama lineage.',
    tradition: 'Vajrayana (རྡོ་རྗེ་ཐེག་པ)',
    key_practices: 'Mantra recitation (Om Mani Padme Hum), visualization, deity yoga, sand mandalas.',
    philosophy: 'Emptiness (śūnyatā), compassion (karuna), Buddha nature.',
    writing_style: 'Mystical, profound, poetic, devotional, mountain imagery.',
    human_element: 'Lama\'s teachings in Himalayas, pilgrim\'s journey to Mt. Kailash.'
  },
  jp_zen: {
    id: 'jp_zen', name: 'Japan (Zen Buddhism)', flag: '🇯🇵',
    voice_lang: 'Japanese', currency: 'JPY',
    culture: 'Zazen meditation, tea ceremony, rock gardens, calligraphy, haiku poetry, wabi-sabi aesthetics.',
    tradition: 'Zen (禅宗) - Rinzai & Soto',
    key_practices: 'Zazen (sitting meditation), kinhin (walking meditation), koan study, mindful work.',
    philosophy: 'Direct pointing to mind, satori (enlightenment), non-duality, present moment awareness.',
    writing_style: 'Minimalist, precise, contemplative, haiku-like brevity, nature imagery.',
    human_element: 'Monk raking zen garden, businessman\'s zazen practice.'
  },
  us_mindfulness: {
    id: 'us_mindfulness', name: 'USA (Mindfulness & Engaged Buddhism)', flag: '🇺🇸',
    voice_lang: 'English', currency: 'USD',
    culture: 'MBSR, secular meditation, Buddhist psychology, engaged Buddhism, meditation apps, retreat centers.',
    tradition: 'Eclectic (Theravada, Zen, Tibetan fusion)',
    key_practices: 'Mindfulness meditation, loving-kindness, body scan, walking meditation, mindful eating.',
    philosophy: 'Present moment awareness, non-judgment, compassion, integration with psychology.',
    writing_style: 'Scientific, accessible, therapeutic, practical, modern language.',
    human_element: 'Therapist using MBSR, tech worker\'s meditation break.'
  },
};

export const CONTEXT_LIST = Object.values(BUDDHISM_CONTEXTS);

export interface VisualStyle {
  id: string;
  name: string;
  desc: string;
  prompt_enforce: string;
}

export const VISUAL_STYLES: VisualStyle[] = [
  { id: 'auto', name: '✨ AI Director Auto', desc: 'AI tự chọn phong cách phù hợp nhất.', prompt_enforce: '' },
  { id: 'celestial_mythic', name: '🌌 Celestial Mythic Realism', desc: 'Baroque vàng, tinh vân, huyền ảo thiêng liêng — PREMIUM.', prompt_enforce: ', Visual Style: Buddhist Celestial Mythic Realism blended with mythic celestial baroque rococo golden luxury, rendered like a high-budget cinematic fantasy film with sacred Eastern spiritual atmosphere. Divine, majestic, peaceful, meditative, otherworldly, grounded in believable materials and real light behavior. Painterly mythic realism, golden baroque ornamentation, rococo filigree, jewel-encrusted sacred design, floating pagodas, white marble bridges, dragon-carved pillars, glowing Dharma wheels, rotating mandalas, pink lotus fields, golden crystalline trees, nebula skies, cosmic mist, incense smoke, cloud oceans, mandala portals, silk-like light ribbons. Gold looks like real polished metal with reflections, subtle roughness, micro-scratches, natural tarnish. Gemstones vivid but realistic with refraction and depth. Silk robes soft, layered, physically responsive. Characters have realistic skin pores, subsurface scattering, natural hair, realistic eyes with catchlight, never waxy. Cinematic lighting with key light, soft fill, rim light, volumetric haze, golden-hour warmth, sacred white-gold glow, subtle bloom. Epic wide shots, low-angle divine hero shots, macro close-ups, shallow depth of field, soft anamorphic, natural bokeh, slight film grain. Color palette: sacred gold, warm ivory, cinnabar red, teal, turquoise, ruby, sapphire blue, jade green, peach glow, deep indigo nebula, violet cosmic shadows. 8k masterpiece. NEGATIVE: no text, no watermark, no logo, no subtitles, no blurry, no plastic CGI, no cartoon, no anime, no waxy skin, no fake gold, no horror, no modern objects, no anatomy errors.' },
  { id: 'golden_dharma_realism', name: '🏛️ Golden Dharma Realism', desc: 'Vàng ròng thiêng liêng, hào quang Phật — PREMIUM.', prompt_enforce: ', Visual Style: Buddhist Celestial Golden Dharma Realism blended with sacred mythic celestial fantasy and luminous golden devotional grandeur, rendered like a high-budget cinematic spiritual film with holy Eastern Buddhist atmosphere. Divine, majestic, compassionate, peaceful, awe-inspiring, grounded in believable materials and realistic light. Radiant golden aura design, heavenly cloud realms, colossal circular halos, divine sunburst backlight, benevolent golden dragon guardians, lotus thrones, floating Dharma symbols, glowing mandalas, celestial mist, rainbow lens flares, incense haze, golden particles, warm spiritual radiance. Gold looks like real polished sacred metal with strong reflections, micro-scratches, edge wear. Divine characters have serene compassionate faces, realistic skin, luminous moist eyes, elegant hand mudras, believable anatomy. Sacred creatures like golden dragons with realistic scale texture, muscle structure, moist eyes. Cinematic lighting with powerful white-gold backlight, clear halo source, volumetric god rays, atmospheric haze, subtle bloom. Epic wide shots, centered devotional compositions, low-angle divine hero shots, macro close-ups, shallow depth of field. Color palette: sacred gold, radiant white-gold, warm ivory, pearl white, sunrise amber, lotus pink, turquoise, jade green, sapphire blue, violet haze, celestial indigo. 8k masterpiece. NEGATIVE: no text, no watermark, no logo, no plastic CGI, no cartoon, no anime, no waxy skin, no fake gold, no horror, no anatomy errors.' },
  { id: 'sacred_cinematic_film', name: '🎬 Sacred Cinematic Film', desc: 'Phim điện ảnh Phật giáo cao cấp — PREMIUM.', prompt_enforce: ', Visual Style: Sacred Cinematic Buddhist Film, high-budget cinematic spiritual film with sacred Eastern Buddhist atmosphere. Thick viscous golden fluid oozes through fissures revealing glowing sacred Thangka mandalas beneath. Celestial temples ascend through golden mists with shimmering roofs in iridescent cloud kingdoms. Cosmic crystal tunnels with rotating facets catching colored light. Starry mandala nebulae rotating around central cores. Multi-arm divine figures in meditative stillness with conch-white skin, five-pointed jeweled crowns, serene compassionate faces, luminous moist eyes, elegant hand mudras holding translucent Mani jewels pulsing with light, crystal mala beads refracting starlight. Colossal circular lunar halos pulsing with rhythmic white-gold light. Dark sacred lakes with floating mirrors, white lotus flowers opening on calm waters. Golden Sanskrit syllables pulsating with rhythmic golden light revolving in clockwise mandala patterns. Wisdom-fire flaming swords severing chains of ignorance. Slow forward tracking shots, rapid zoom-outs, slow upward tilts, flying POV motions, extreme close-ups, macro shots, orbiting camera movements. Color palette: sacred gold, molten amber, cosmic indigo, deep nebula violet, conch-white, pearl moonlight, lotus pink, wisdom-fire orange, crystal refraction rainbows. 8k masterpiece. NEGATIVE: no text, no watermark, no logo, no plastic CGI, no cartoon, no anime, no waxy skin, no anatomy errors, no modern objects, no horror.' },
  { id: 'dharma_talk', name: '🙏 Dharma Talk Truyền Thống', desc: 'Không gian giảng pháp truyền thống.', prompt_enforce: ', Visual Style: Cinematic Dharma Talk, traditional monk attire, temple interior, Buddha statue, incense smoke, soft warm lighting, 8k documentary quality, no text, no watermark.' },
  { id: 'temple_cinematic', name: '🏯 Đền Chùa Điện Ảnh', desc: 'Shot hoành tráng kiến trúc Phật giáo.', prompt_enforce: ', Visual Style: Cinematic Architecture, majestic temples, pagodas, stupas, misty mountains, golden hour lighting, National Geographic style, 8k, no text.' },
  { id: 'animated_2d_anime', name: '🎨 2D Anime Style', desc: 'Phong cách anime Nhật Bản.', prompt_enforce: ', Visual Style: 2D Anime, high-quality Japanese animation style, Ghibli-inspired backgrounds, clean line art, no text, no subtitles.' },
  { id: 'ink_wash_painting', name: '🖌️ Tranh Mực Nước', desc: 'Phong cách sumi-e Đông Á.', prompt_enforce: ', Visual Style: Traditional Chinese Ink Wash Painting, sumi-e style, brush strokes, watercolor textures, minimalist composition, Zen aesthetic, no text.' },
  { id: 'modern_minimalist', name: '🌿 Modern Minimalist', desc: 'Thẩm mỹ đương đại sạch sẽ.', prompt_enforce: ', Visual Style: Modern Minimalist, Apple-style aesthetic, soft neutral colors, clean spaces, natural light, 8k, no text, no watermark.' },
  { id: 'abstract_meditation', name: '🌀 Abstract Meditation', desc: 'Hình dạng chảy, ánh sáng thiền.', prompt_enforce: ', Visual Style: Abstract Spiritual Art, fluid energy, light particles, sacred geometry, ethereal atmosphere, 8k, no text.' },
];

export const SEO_CHECKLIST_DATA: Record<string, { id: string; label: string }[]> = {
  "Phần 1: Tâm Linh & Chánh Pháp (BẮT BUỘC)": [
    { id: "eth_1", label: "Giáo lý chính thống, không biến tướng" },
    { id: "eth_2", label: "Tôn trọng Tam Bảo (Phật, Pháp, Tăng)" },
    { id: "eth_3", label: "Không mê tín, cuồng tín" },
    { id: "eth_4", label: "Hướng thiện, lan tỏa trí tuệ" },
  ],
  "Phần 2: SEO Phật Pháp": [
    { id: "seo_1", label: "Keywords: 'Phật pháp', 'Thiền định', 'Giác ngộ'" },
    { id: "seo_2", label: "Thumbnail: Hoa sen / Phật / Chùa / Thiền" },
    { id: "seo_3", label: "Hook: Bạn đã biết điều này về nhân quả?" },
    { id: "seo_4", label: "Mô tả: Trí tuệ Phật giáo ứng dụng đời sống" },
  ],
  "Phần 3: Cộng Đồng & Tương Tác": [
    { id: "com_1", label: "Hỏi: 'Bạn nghĩ thế nào về Nhân Quả?'" },
    { id: "com_2", label: "Discussion: Giáo lý vs Ứng dụng thực tế" },
  ],
};

export const SECONDS_PER_SCENE = 8;

export type TabId = 'spy' | 'script' | 'studio' | 'seo';

export const TAB_COLORS: Record<TabId, { bg: string; border: string; text: string; shadow: string }> = {
  spy: { bg: 'bg-[#1a1508]', border: 'border-amber-500/50', text: 'text-amber-300', shadow: 'shadow-[0_0_15px_rgba(245,158,11,0.1)]' },
  script: { bg: 'bg-[#1a1a08]', border: 'border-yellow-500/50', text: 'text-yellow-300', shadow: 'shadow-[0_0_15px_rgba(234,179,8,0.15)]' },
  studio: { bg: 'bg-[#150f1a]', border: 'border-purple-500/50', text: 'text-purple-300', shadow: 'shadow-[0_0_15px_rgba(139,92,246,0.15)]' },
  seo: { bg: 'bg-[#0f1a15]', border: 'border-green-500/50', text: 'text-green-300', shadow: 'shadow-[0_0_15px_rgba(34,197,94,0.15)]' },
};
