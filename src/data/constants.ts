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
    id: 'vn_mahayana', name: 'Việt Nam — Đại Thừa (Thiền Tông)', flag: '🇻🇳',
    voice_lang: 'Vietnamese', currency: 'VND',
    culture: 'Thiền Buddhism fusion with local traditions, ancestor veneration, Quan Âm devotion, pagoda culture, vegetarianism, mindfulness in daily life, compassionate living.',
    tradition: 'Đại Thừa (Mahayana)',
    key_practices: 'Thiền định, tụng kinh, ăn chay, thờ cúng tổ tiên.',
    philosophy: 'Con đường Bồ Tát, từ bi, hiếu đạo.',
    writing_style: 'Warm, poetic, respectful, storytelling.',
    human_element: 'Câu chuyện chùa làng, trí tuệ bà ngoại.'
  },
  vn_phatgiao: {
    id: 'vn_phatgiao', name: 'Việt Nam — Phật Học Ứng Dụng', flag: '🇻🇳',
    voice_lang: 'Vietnamese', currency: 'VND',
    culture: 'Phật học ứng dụng đời sống, tâm lý học Phật giáo, thiền trong công việc, chư Phật và Bồ Tát, giáo lý Nhân Quả, Nghiệp Báo.',
    tradition: 'Phật Học Ứng Dụng (Applied Buddhism)',
    key_practices: 'Thiền chánh niệm, Niệm Phật, tu tập hàng ngày, sám hối.',
    philosophy: 'Tứ Diệu Đế, Bát Chánh Đạo, Nhân Quả, Nghiệp Báo, Vô Thường.',
    writing_style: 'Gần gũi, thực tế, ứng dụng, dễ hiểu, truyền cảm hứng.',
    human_element: 'Người tu tại gia, ứng dụng Phật pháp trong đời sống hiện đại.'
  },
  vn_tinh_do: {
    id: 'vn_tinh_do', name: 'Việt Nam — Tịnh Độ Tông (Niệm Phật)', flag: '🇻🇳',
    voice_lang: 'Vietnamese', currency: 'VND',
    culture: 'Niệm Phật A Di Đà, cầu vãng sinh Cực Lạc, tụng kinh A Di Đà, lễ Phật, phóng sinh, cúng dường.',
    tradition: 'Tịnh Độ Tông (Pure Land)',
    key_practices: 'Niệm Phật A Di Đà, tụng kinh, trì chú, phóng sinh.',
    philosophy: 'Tín-Nguyện-Hạnh, cõi Tây Phương Cực Lạc, Phật A Di Đà.',
    writing_style: 'Thành kính, trang nghiêm, an lạc, thanh tịnh.',
    human_element: 'Phật tử niệm Phật, hộ niệm, câu chuyện vãng sinh.'
  },
  th_theravada: {
    id: 'th_theravada', name: 'Thái Lan — Theravada (Truyền Thống Rừng)', flag: '🇹🇭',
    voice_lang: 'Thai', currency: 'THB',
    culture: 'Vipassana meditation, monk ordination, merit-making (tam bun), Dhamma talks, forest monasteries, alms rounds.',
    tradition: 'Theravada (Nguyên Thủy)',
    key_practices: 'Thiền Vipassana, khất thực, tụng kinh Pali.',
    philosophy: 'Tứ Diệu Đế, Bát Chánh Đạo, Vô Thường.',
    writing_style: 'Gentle, respectful, practical wisdom, nature metaphors.',
    human_element: 'Tăng sĩ thiền trong rừng, gia đình làm phước.'
  },
  kh_theravada: {
    id: 'kh_theravada', name: 'Campuchia — Theravada (Phật Giáo Khmer)', flag: '🇰🇭',
    voice_lang: 'Khmer', currency: 'KHR',
    culture: 'Angkor Wat heritage, monk blessing ceremonies, Pchum Ben (ancestor festival), traditional Khmer chanting, pagoda life in rural villages.',
    tradition: 'Theravada (Phật Giáo Khmer)',
    key_practices: 'Tụng kinh, thiền định, cúng tổ tiên, thọ giới.',
    philosophy: 'Nghiệp, tạo phước, từ bi, kết nối tổ tiên.',
    writing_style: 'Respectful, traditional, deeply rooted in Khmer history, graceful.',
    human_element: 'Trưởng lão chia sẻ trí tuệ, tăng sĩ chúc phúc.'
  },
  tb_vajrayana: {
    id: 'tb_vajrayana', name: 'Tây Tạng — Kim Cương Thừa (Vajrayana)', flag: '🇨🇳',
    voice_lang: 'Tibetan', currency: 'CNY',
    culture: 'Tantric practices, mandala creation, prayer wheels, prayer flags, prostrations, sky burial, Dalai Lama lineage.',
    tradition: 'Kim Cương Thừa (Vajrayana)',
    key_practices: 'Trì chú Om Mani Padme Hum, quán tưởng, yoga thần chú, mandala.',
    philosophy: 'Tánh Không, Từ Bi, Phật Tánh.',
    writing_style: 'Mystical, profound, poetic, devotional, mountain imagery.',
    human_element: 'Lạt Ma giảng pháp trên Himalaya, hành giả hành hương.'
  },
  jp_zen: {
    id: 'jp_zen', name: 'Nhật Bản — Thiền Tông (Zen)', flag: '🇯🇵',
    voice_lang: 'Japanese', currency: 'JPY',
    culture: 'Zazen meditation, tea ceremony, rock gardens, calligraphy, haiku poetry, wabi-sabi aesthetics.',
    tradition: 'Thiền Tông (Zen) — Lâm Tế & Tào Động',
    key_practices: 'Tọa thiền, kinh hành, tham công án, chánh niệm lao động.',
    philosophy: 'Trực chỉ nhân tâm, kiến tánh thành Phật, bất nhị.',
    writing_style: 'Minimalist, precise, contemplative, haiku-like brevity, nature imagery.',
    human_element: 'Thiền sư chăm vườn đá, doanh nhân ngồi thiền.'
  },
  us_mindfulness: {
    id: 'us_mindfulness', name: 'Phương Tây — Chánh Niệm Ứng Dụng', flag: '🇺🇸',
    voice_lang: 'English', currency: 'USD',
    culture: 'MBSR, secular meditation, Buddhist psychology, engaged Buddhism, meditation apps, retreat centers.',
    tradition: 'Tổng Hợp (Theravada, Thiền, Mật Tông)',
    key_practices: 'Thiền chánh niệm, từ bi quán, body scan, thiền đi, ăn chánh niệm.',
    philosophy: 'Sống trong hiện tại, không phán xét, từ bi, kết hợp tâm lý học.',
    writing_style: 'Scientific, accessible, therapeutic, practical, modern language.',
    human_element: 'Chuyên gia tâm lý dùng MBSR, nhân viên IT thiền giữa giờ.'
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
  spy: { bg: 'bg-teal-950/40', border: 'border-teal-500/50', text: 'text-teal-300', shadow: 'shadow-[0_0_15px_rgba(13,148,136,0.15)]' },
  script: { bg: 'bg-amber-950/30', border: 'border-amber-500/50', text: 'text-amber-300', shadow: 'shadow-[0_0_15px_rgba(212,165,116,0.15)]' },
  studio: { bg: 'bg-violet-950/30', border: 'border-violet-500/50', text: 'text-violet-300', shadow: 'shadow-[0_0_15px_rgba(139,92,246,0.15)]' },
  seo: { bg: 'bg-orange-950/30', border: 'border-orange-500/50', text: 'text-orange-300', shadow: 'shadow-[0_0_15px_rgba(232,93,38,0.15)]' },
};

// ==================================================================================
// TAB NAMES — Centralized tab labels for Sidebar
// ==================================================================================
export const TAB_NAMES: Record<TabId, { name: string; desc: string; icon: string }> = {
  spy:    { name: '1. DHARMA SPY',   desc: 'Phân tích Video Phật Pháp',   icon: 'fa-brands fa-youtube' },
  script: { name: '2. PHÁP THOẠI',  desc: 'Viết Kịch Bản Giảng Pháp',   icon: 'fa-solid fa-dharmachakra' },
  studio: { name: '3. STUDIO',      desc: 'Prompt Video & Ảnh Reference', icon: 'fa-solid fa-place-of-worship' },
  seo:    { name: '4. SEO MASTER',   desc: 'Tối Ưu Nội Dung & Viral',    icon: 'fa-solid fa-magnifying-glass-chart' },
};

// ==================================================================================
// MODE OPTIONS — 3 chế độ video duration
// ==================================================================================
export const MODE_OPTIONS = [
  { id: 'quick', name: '🟢 PHÁP THOẠI NGẮN',  desc: '<60s — Hook nhanh, trọng tâm 1 ý',     scenes: 3, wpm: 130, icon: '⚡', color: 'teal' },
  { id: 'story', name: '🔵 GIẢNG KINH',        desc: '1-3m — Câu chuyện + giáo lý',          scenes: 5, wpm: 140, icon: '📖', color: 'cyan' },
  { id: 'deep',  name: '🟣 ĐẠI PHÁP THOẠI',   desc: '>3m — Phân tích sâu, nhiều góc nhìn', scenes: 8, wpm: 120, icon: '🎬', color: 'violet' },
];
