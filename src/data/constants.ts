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
  co_nhan_nhan_sinh: {
    id: 'co_nhan_nhan_sinh', name: 'Cổ Nhân — Triết Lý Nhân Sinh', flag: '📜',
    voice_lang: 'Vietnamese', currency: 'VND',
    culture: 'Trí tuệ nhân sinh cổ nhân, răn dạy làm người, tu thân dưỡng tính, châm ngôn hiền triết, đối nhân xử thế, luật nhân quả.',
    tradition: 'Triết Lý Cổ Nhân (Ancient Wisdom)',
    key_practices: 'Tu thân, dưỡng tính, tĩnh tâm, chánh niệm, chiêm nghiệm sách thánh hiền.',
    philosophy: 'Đạo làm người, đối nhân xử thế, tùy duyên an lạc, khiêm nhường nhẫn nại, nhân quả.',
    writing_style: 'Trang trọng, cổ phong, trầm lắng, mang âm hưởng ngôn ngữ cổ nhân dạy truyền đời.',
    human_element: 'Bậc hiền triết xưa, trưởng lão răn dạy hậu thế.'
  },
  co_nhan_phat_phap: {
    id: 'co_nhan_phat_phap', name: 'Cổ Nhân — Triết Lý Phật Giáo', flag: '📿',
    voice_lang: 'Vietnamese', currency: 'VND',
    culture: 'Giáo lý Phật pháp nguyên bản kết hợp lời dạy của các bậc Tổ sư thiền, cổ đức, danh tăng xưa, chú trọng tu tập chuyển hóa chướng ngại.',
    tradition: 'Lời Phật Cổ Đức (Ancient Buddhist Teachings)',
    key_practices: 'Niệm Phật, quán tâm, trì giới, buông bỏ vọng tưởng, lắng nghe lời Tổ dạy.',
    philosophy: 'Nhân quả luân hồi, Tứ Diệu Đế, Vô thường, Phật tánh, lòng từ bi rộng lớn.',
    writing_style: 'Thành kính, cổ phong, uy nghiêm nhưng từ ái, đúc kết sâu sắc từ kinh điển cổ xưa.',
    human_element: 'Các bậc Cổ đức truyền thừa, thiền sư đắc đạo ngày xưa.'
  },
};

export const CONTEXT_LIST = Object.values(BUDDHISM_CONTEXTS);

export interface VisualStyle {
  id: string;
  name: string;
  desc: string;
  prompt_enforce: string;
  reference_prompt: string;
}

export interface VoiceStyle {
  id: string;
  name: string;
  desc: string;
  prompt_modifier: string;
}

export const VISUAL_STYLES: VisualStyle[] = [
  // ── CATEGORY 0: AUTO ──
  { id: 'auto', name: '✨ AI Director Auto', desc: 'AI tự chọn phong cách phù hợp nhất.', prompt_enforce: '', reference_prompt: 'AI will determine the best visual style based on the cultural context provided.' },

  // ── CATEGORY 1: PREMIUM CINEMATIC ──
  { id: 'sacred_ancient_realism', name: '🏛️ Sacred Ancient Realism', desc: 'Chân thực cổ kính, tượng Phật rêu phong, nắng mai — PREMIUM.', prompt_enforce: ', Visual Style: Ancient temple garden, majestic Buddha statue in the background covered in soft moss, gentle morning mist, volumetric light rays (god rays) filtering through old bodhi trees, deep orange and gold color palette, photorealistic, 8k, highly serene.', reference_prompt: 'Visual Style: Ancient temple garden, majestic Buddha statue covered in soft moss, gentle morning mist, volumetric light rays, 8k, photorealistic.' },
  { id: 'zen_watercolor', name: '🎨 Zen Watercolor', desc: 'Tranh màu nước tối giản, mực loang trên giấy gạo — PREMIUM.', prompt_enforce: ', Visual Style: Minimalist Zen watercolor painting, soft sweeping brush strokes, high-quality ink bleed on textured rice paper, a solitary monk meditating near a calm misty lake with lotus flowers, serene pastel colors, peaceful ink art.', reference_prompt: 'Visual Style: Minimalist Zen watercolor, soft brush strokes, ink bleed on rice paper, monk meditating near misty lake with lotus, peaceful ink art.' },
  { id: 'luminous_spiritual', name: '✨ Luminous Spiritual Art', desc: 'Tranh vẽ hào quang, bụi vàng thiền định lấp lánh — PREMIUM.', prompt_enforce: ', Visual Style: Golden light illustration, ethereal spiritual glow, a radiant glowing lotus flower floating in dark still water emitting golden dust particles of mindfulness, cosmic energy, warm and divine atmospheric lighting.', reference_prompt: 'Visual Style: Golden light illustration, ethereal spiritual glow, glowing lotus floating in dark water, golden dust particles, divine warm lighting.' },
  { id: 'celestial_mythic', name: '🌌 Celestial Mythic Realism', desc: 'Baroque vàng, tinh vân, huyền ảo thiêng liêng — PREMIUM.', prompt_enforce: ', Visual Style: Buddhist Celestial Mythic Realism blended with mythic celestial baroque rococo golden luxury, rendered like a high-budget cinematic fantasy film with sacred Eastern spiritual atmosphere. Divine, majestic, peaceful, meditative, otherworldly, grounded in believable materials and real light behavior. Painterly mythic realism, golden baroque ornamentation, rococo filigree, jewel-encrusted sacred design, floating pagodas, white marble bridges, dragon-carved pillars, glowing Dharma wheels, rotating mandalas, pink lotus fields, golden crystalline trees, nebula skies, cosmic mist, incense smoke, cloud oceans, mandala portals, silk-like light ribbons. Gold looks like real polished metal with reflections, subtle roughness, micro-scratches, natural tarnish. Gemstones vivid but realistic with refraction and depth. Silk robes soft, layered, physically responsive. Characters have realistic skin pores, subsurface scattering, natural hair, realistic eyes with catchlight, never waxy. Cinematic lighting with key light, soft fill, rim light, volumetric haze, golden-hour warmth, sacred white-gold glow, subtle bloom. Epic wide shots, low-angle divine hero shots, macro close-ups, shallow depth of field, soft anamorphic, natural bokeh, slight film grain. Color palette: sacred gold, warm ivory, cinnabar red, teal, turquoise, ruby, sapphire blue, jade green, peach glow, deep indigo nebula, violet cosmic shadows. 8k masterpiece. NEGATIVE: no text, no watermark, no logo, no subtitles, no blurry, no plastic CGI, no cartoon, no anime, no waxy skin, no fake gold, no horror, no modern objects, no anatomy errors.', reference_prompt: 'Visual Style: Buddhist Celestial Mythic Realism, golden baroque ornamentation, floating pagodas in nebula skies, glowing Dharma wheels, pink lotus fields, cosmic mist, 8k masterpiece.' },
  { id: 'golden_dharma_realism', name: '🏛️ Golden Dharma Realism', desc: 'Vàng ròng thiêng liêng, hào quang Phật — PREMIUM.', prompt_enforce: ', Visual Style: Buddhist Celestial Golden Dharma Realism blended with sacred mythic celestial fantasy and luminous golden devotional grandeur, rendered like a high-budget cinematic spiritual film with holy Eastern Buddhist atmosphere. Divine, majestic, compassionate, peaceful, awe-inspiring, grounded in believable materials and realistic light. Radiant golden aura design, heavenly cloud realms, colossal circular halos, divine sunburst backlight, benevolent golden dragon guardians, lotus thrones, floating Dharma symbols, glowing mandalas, celestial mist, rainbow lens flares, incense haze, golden particles, warm spiritual radiance. Gold looks like real polished sacred metal with strong reflections, micro-scratches, edge wear. Divine characters have serene compassionate faces, realistic skin, luminous moist eyes, elegant hand mudras, believable anatomy. Sacred creatures like golden dragons with realistic scale texture, muscle structure, moist eyes. Cinematic lighting with powerful white-gold backlight, clear halo source, volumetric god rays, atmospheric haze, subtle bloom. Epic wide shots, centered devotional compositions, low-angle divine hero shots, macro close-ups, shallow depth of field. Color palette: sacred gold, radiant white-gold, warm ivory, pearl white, sunrise amber, lotus pink, turquoise, jade green, sapphire blue, violet haze, celestial indigo. 8k masterpiece. NEGATIVE: no text, no watermark, no logo, no plastic CGI, no cartoon, no anime, no waxy skin, no fake gold, no horror, no anatomy errors.', reference_prompt: 'Visual Style: Golden Dharma Realism, radiant golden aura, colossal halos, divine sunburst backlight, golden dragon guardians, lotus thrones, volumetric god rays, 8k masterpiece.' },
  { id: 'sacred_cinematic_film', name: '🎬 Sacred Cinematic Film', desc: 'Phim điện ảnh Phật giáo cao cấp — PREMIUM.', prompt_enforce: ', Visual Style: Sacred Cinematic Buddhist Film, high-budget cinematic spiritual film with sacred Eastern Buddhist atmosphere. Thick viscous golden fluid oozes through fissures revealing glowing sacred Thangka mandalas beneath. Celestial temples ascend through golden mists with shimmering roofs in iridescent cloud kingdoms. Cosmic crystal tunnels with rotating facets catching colored light. Starry mandala nebulae rotating around central cores. Multi-arm divine figures in meditative stillness with conch-white skin, five-pointed jeweled crowns, serene compassionate faces, luminous moist eyes, elegant hand mudras holding translucent Mani jewels pulsing with light, crystal mala beads refracting starlight. Colossal circular lunar halos pulsing with rhythmic white-gold light. Dark sacred lakes with floating mirrors, white lotus flowers opening on calm waters. Golden Sanskrit syllables pulsating with rhythmic golden light revolving in clockwise mandala patterns. Wisdom-fire flaming swords severing chains of ignorance. Slow forward tracking shots, rapid zoom-outs, slow upward tilts, flying POV motions, extreme close-ups, macro shots, orbiting camera movements. Color palette: sacred gold, molten amber, cosmic indigo, deep nebula violet, conch-white, pearl moonlight, lotus pink, wisdom-fire orange, crystal refraction rainbows. 8k masterpiece. NEGATIVE: no text, no watermark, no logo, no plastic CGI, no cartoon, no anime, no waxy skin, no anatomy errors, no modern objects, no horror.', reference_prompt: 'Visual Style: Sacred Cinematic Buddhist Film, celestial temples in golden mists, cosmic crystal tunnels, divine figures with jeweled crowns, sacred Thangka mandalas, 8k masterpiece.' },
  { id: 'serenity_harmony', name: '🧘 Serenity & Harmony', desc: 'Thiền định tĩnh lặng, hòa quyện thiên nhiên — PREMIUM.', prompt_enforce: ', Visual Style: Meditative Serenity and Environmental Harmony, rendered like high-end cinematic concept art with painterly softness and controlled organic texture. Balanced, breathable composition, organic framing, layered environmental depth, smooth visual flow of natural lines, architecture, mist, and foliage. Wide and medium-wide cinematic framing, calm observational camera language, stable perspectives, minimal visual aggression. Soft, diffuse, atmospheric lighting, warm golden-hour illumination, volumetric light rays, gentle haze, subtle bloom, low-contrast shadows. Emotionally transcendental, meditative, sacred atmosphere. Muted natural color palette: bamboo green, moss, jade, soft earth browns, mist gray, warm cream sunlight, desaturated pastel accents, cool ambient environment with restrained warm highlights. High-end cinematic concept art polish, painterly softness, controlled organic texture, atmospheric perspective, layered fog depth, soft edge transitions, selective foreground clarity, subtle environmental diffusion. Natural, calm, breathable materials. Subjects seamlessly integrated into environments of contemplative silence, spaciousness, and spiritual calm, preserving visual stillness, soft cinematic transcendence, and a meditative emotional tone. 8k masterpiece. NEGATIVE: no text, no watermark, no logo, no subtitles, no blurry, no plastic CGI, no cartoon, no anime, no waxy skin, no fake elements, no horror, no modern objects, no anatomy errors, no extreme saturation, no sharp tonal separation, no heavy contrast, no hyperrealistic grit, no harsh shadows.', reference_prompt: 'Visual Style: Meditative Serenity and Environmental Harmony, balanced compositions, soft diffuse warm golden-hour lighting, bamboo green and moss jade tones, misty layered environmental depth, painterly softness, 8k masterpiece.' },
  { id: 'celestial_transcendence', name: '✨ Celestial Transcendence', desc: 'Hào quang vũ trụ, huyền ảo siêu việt — PREMIUM.', prompt_enforce: ', Visual Style: Celestial Spiritual Fantasy Illustration, rendered with high-end fantasy illustration polish, painterly softness, and glow-heavy cinematic compositing. Emphasizing divine radiance, sacred symmetry, and cosmic transcendence. Iconic centered composition, radial geometry, glowing halo structures, strong visual hierarchy, transforming subjects into mythic spiritual presences in sacred cosmic environments. Intensely luminous and atmospheric lighting, halo backlighting, emissive glow effects, volumetric aura, radiant rim light, floating sparkles, bloom diffusion, layered celestial illumination behaving as pure spiritual energy. Color palette: glowing gold, warm white, celestial blue, deep cosmic navy, cyan highlights, nebula violet, ethereal luminous gradients with high luminous contrast and smooth transitions. Nebula clouds, energy ribbons, flowing luminous fabrics, cosmic depth layering, radiant particles, ethereal atmospheric structures. Surfaces appear refined, sacred, luminous, and idealized. Subjects feel calm, transcendent, compassionate, spiritually elevated, functioning as the energetic center. Stable, reverent eye-level or low-angle camera perspective, reinforcing divine presence and sacred stillness, halo-centered geometry, sacred symmetry, emissive spiritual lighting, cosmic atmosphere, and mythic stillness. 8k masterpiece. NEGATIVE: no text, no watermark, no logo, no subtitles, no blurry, no plastic CGI, no cartoon, no anime, no waxy skin, no fake elements, no horror, no modern objects, no anatomy errors, no gritty realism, no harsh textures, no grounded earthly tonality.', reference_prompt: 'Visual Style: Celestial Spiritual Fantasy Illustration, centered composition, sacred symmetry, glowing halo structures, intensely luminous halo backlighting, glowing gold and celestial blue gradients, 8k masterpiece.' },
  { id: 'co_phong_oil_painting', name: '🏮 Cổ Phong Sơn Dầu', desc: 'Tranh sơn dầu cổ phong Trung Hoa, sáng bóng huyền ảo — PREMIUM.', prompt_enforce: ', Visual Style: Ancient Chinese Classical Oil Painting (Cổ Phong), rendered as a luminous glossy oil painting masterpiece with rich impasto texture, glazed varnish sheen, and the majestic grandeur of traditional Chinese classical art. Exquisite ancient Chinese aesthetic blended with Western oil painting techniques — thick layered brushstrokes with visible paint texture, glossy reflective surface as if freshly varnished, deep saturated pigments with jewel-like luminosity. Ancient Chinese palatial architecture with curved eave roofs, red lacquered pillars, golden dragon carvings, jade balustrades, moon gates, stone bridges over koi ponds, misty mountain peaks (sơn thủy), cascading waterfalls, ancient pine trees, bamboo groves, plum blossoms, peach blossom forests in full bloom, floating silk lanterns, incense smoke spiraling upward. Characters wearing flowing hanfu robes with elaborate embroidery, hair ornaments with jade and gold hairpins, serene noble expressions. Traditional Chinese calligraphy (thư pháp Hán/漢字書法) as decorative scrolls and carved inscriptions on pillars — elegant kaishu and xingshu brush calligraphy rendered as part of the scene architecture, NOT overlaid text. Cinematic lighting with warm golden-hour glow, volumetric god rays through temple windows, soft atmospheric haze, candlelight reflections on lacquered surfaces, moonlight silver highlights, dramatic chiaroscuro shadows. Rich oil painting color palette: imperial gold, vermillion red, cinnabar orange, jade green, celadon, lapis lazuli blue, indigo night sky, ivory white, warm amber, rosewood brown, peach blossom pink, plum purple. Glossy varnished finish with specular highlights, visible thick paint texture on fabric folds and architectural details, soft sfumato transitions on skin and distant mountains. Camera: epic wide establishing shots of palatial complexes, intimate medium shots of characters in contemplation, dramatic low-angle shots of towering pagodas, bird-eye views of vast landscapes, shallow depth of field for portrait moments. 8k masterpiece, museum-quality oil painting. NEGATIVE: no Vietnamese calligraphy, no modern Vietnamese text, no chữ Quốc ngữ, no Latin alphabet text, no watermark, no logo, no subtitles, no blurry, no plastic CGI, no cartoon, no anime, no waxy skin, no modern objects, no anatomy errors, no flat digital look, no matte finish, no horror, no grotesque.', reference_prompt: 'Visual Style: Ancient Chinese Classical Oil Painting (Cổ Phong), luminous glossy varnished oil painting, thick impasto brushstrokes, imperial palatial architecture, misty mountain landscapes, flowing hanfu robes, traditional Chinese Han calligraphy scrolls, warm golden-hour lighting, vermillion and jade green palette, museum-quality 8k masterpiece.' },
  { id: 'thangka_kim_quang', name: '🪷 Thangka Kim Quang', desc: 'Tranh Thangka Tây Tạng kim sa rực rỡ, hào quang vàng ròng — PREMIUM.', prompt_enforce: ', Visual Style: Sacred Tibetan Thangka Golden Radiance (Kim Quang Thangka), rendered as a museum-quality traditional Tibetan Thangka scroll painting masterpiece with radiant luminous golden illumination and supreme sacred artistry. Exquisite hand-painted Thangka technique with ultra-fine brushwork, real gold leaf gilding, mineral pigment richness, and sacred geometric precision. Central divine Buddhist figure (Buddha, Bodhisattva, or deity) seated in perfect meditative stillness on an ornate multi-layered lotus throne with intricate petal detailing in pink, green, turquoise, and gold. Colossal radiant circular halo behind the figure — concentric rings of intricate golden filigree mandala patterns radiating outward with increasing complexity, inner rings glowing with pure warm white-gold light gradually transitioning to elaborate scrollwork and sacred motifs. Five-pointed jeweled crown (ngũ Phật miện) with turquoise, ruby, sapphire, and pearl inlays, ornate golden earrings, multi-strand sacred necklaces with precious gems, elaborate arm bangles and wrist ornaments. Flowing golden-white ceremonial robes with delicate floral brocade patterns, draped silk scarves (khata) with realistic fabric folds. Elegant hand mudras with realistic finger proportions — Anjali mudra (prayer), Dhyana mudra (meditation), Varada mudra (blessing), or Abhaya mudra (fearlessness). Serene compassionate face with half-closed meditative eyes, gentle smile, elongated earlobes, ushnisha (cranial protuberance), urna (third-eye dot). Background: deep midnight indigo-navy sky filled with swirling celestial clouds in gold and teal, floating smaller Buddha figures in clouds, dharma wheels, sacred vases, victory banners, parasols, conch shells, endless knots, golden fish pairs, lotus flowers — the Eight Auspicious Symbols (Ashtamangala). Corner mandala medallions with intricate geometric patterns. Decorative border: elaborate brocade textile frame with traditional Tibetan cloud-scroll patterns, corner ornaments, and color bands in crimson red, royal blue, gold, and forest green. Lighting: emanating sacred golden radiance from the central figure outward, warm ambient glow, subtle sparkle effects on gold surfaces, soft luminous particles floating in the atmosphere. Rich Thangka color palette: pure gold leaf, radiant amber, sacred saffron yellow, deep midnight indigo, royal cobalt blue, turquoise teal, cinnabar vermillion red, forest green, lotus pink, conch white, pearl cream, ruby crimson, emerald jade. Rendering: ultra-fine detailed brushwork visible at macro level, smooth mineral pigment gradients, precise linework for mandala geometry, realistic gold leaf texture with subtle hammered sheen, fabric texture on silk and brocade. 8k masterpiece, sacred Thangka painting. NEGATIVE: no text, no watermark, no logo, no modern elements, no 3D rendering, no photography, no cartoon, no anime, no abstract art, no minimalism, no horror, no anatomy errors, no blurry, no low quality, no Western religious imagery, no modern clothing.', reference_prompt: 'Visual Style: Sacred Tibetan Thangka Golden Radiance (Kim Quang), radiant golden mandala halo, divine Buddhist figure on lotus throne, jeweled crown, ornate gold filigree, deep indigo background with celestial clouds, Eight Auspicious Symbols, elaborate brocade border, ultra-fine mineral pigment brushwork, gold leaf gilding, 8k sacred Thangka masterpiece.' },
  { id: 'style_hybrid', name: '✨ Style Hybrid Majestic', desc: 'Bậc thầy oai linh, da sứ cẩm thạch oai nghiêm không tì vết, hào quang Pháp luân lơ lửng — PREMIUM.', prompt_enforce: ', Visual Style: Buddhist Hybrid Majestic Realism, hyper-realistic, ethereal, semi-translucent skin texture with inner golden glow, flawless marble-like porcelain finish, no cracks, majestic posture, eternal beauty. Serene face, long white beard, opulent pristine earth-toned silk Kassaya robe with intricate golden embroidery of a Lotus. Character physical anchor: floating, glowing golden Dharma wheel halo. Lighting: cinematic God rays, slow-motion golden stardust motes. Safety: (perfect human anatomy:1.2), exactly two arms, exactly two legs, perfect hands.', reference_prompt: 'Visual Style: Buddhist Hybrid Majestic Realism, a majestic 70-year-old Buddhist Master with flawless marble-like porcelain skin, floating glowing golden Dharma wheel halo, cinematic God rays, golden stardust motes, 8k masterpiece.' },


  // ── CATEGORY 2: TRADITIONAL & CINEMATIC ──
  { id: 'dharma_talk', name: '🙏 Dharma Talk Truyền Thống', desc: 'Không gian giảng pháp truyền thống.', prompt_enforce: ', Visual Style: Cinematic Dharma Talk, traditional monk attire, temple interior, Buddha statue, incense smoke, soft warm lighting, 8k documentary quality, no text, no watermark.', reference_prompt: 'Visual Style: Cinematic Documentary, close-up of a wise elderly monk in orange robes, serene expression, peaceful monastery interior, soft morning light through windows, incense smoke, shallow depth of field, 8k professional photography, National Geographic style.' },
  { id: 'temple_cinematic', name: '🏯 Đền Chùa Điện Ảnh', desc: 'Shot hoành tráng kiến trúc Phật giáo.', prompt_enforce: ', Visual Style: Cinematic Architecture, majestic temples, pagodas, stupas, misty mountains, golden hour lighting, National Geographic style, 8k, no text, no captions.', reference_prompt: 'Visual Style: Epic Landscape Cinematography, ancient golden pagodas and misty mountain peaks, sunset golden hour lighting, vast majestic atmosphere, birds flying in distance, National Geographic quality, 8k ultra-detailed.' },

  // ── CATEGORY 3: ANIMATION STYLES ──
  { id: 'animated_2d_anime', name: '🎨 2D Anime Style', desc: 'Phong cách anime Nhật Bản, màu sắc tươi sáng.', prompt_enforce: ', Visual Style: 2D Anime, high-quality Japanese animation style, expressive characters, vibrant scenery, Ghibli-inspired backgrounds, clean line art, no text, no subtitles.', reference_prompt: 'Visual Style: High-quality 2D Anime, Studio Ghibli inspired, hand-drawn aesthetic, clean vibrant colors, expressive character eyes, detailed natural backgrounds, lush landscapes, peaceful atmosphere, professional animation.' },
  { id: 'animated_3d_pixar', name: '🧸 3D Pixar Style', desc: 'Pixar/Disney 3D animation, dễ thương, thân thiện.', prompt_enforce: ', Visual Style: 3D Animation, Pixar style, Disney-inspired character design, soft lighting, detailed textures, expressive facial features, friendly atmosphere, 8k render, no text, no watermark.', reference_prompt: 'Visual Style: 3D Pixar Animation, Disney-inspired character design, soft subsurface scattering on skin, big expressive eyes, cinematic lighting, clay-like smooth textures, vibrant colors, 8k render, professional character model, no text, no watermark.' },
  { id: 'stickman_dharma', name: '👤 Stickman Buddhism', desc: 'Stickman đơn giản, truyền tải giáo lý rõ ràng.', prompt_enforce: ', Visual Style: Minimalist Stickman Animation, clean white background, black stick figures, smooth motion, simple visual metaphors, educational clarity, professional motion graphics, no text, no captions.', reference_prompt: 'Visual Style: Minimalist Stickman Animation, clean white background, black bold stick figures, simple circular heads, smooth vector motion, clear visual storytelling metaphors, educational clarity.' },
  { id: 'pixel_art_buddha', name: '👾 Pixel Art Retro', desc: '8-bit/16-bit retro game style, hoài cổ.', prompt_enforce: ', Visual Style: 16-bit Pixel Art, retro video game aesthetic, vibrant palette, detailed pixel environments, nostalgic atmosphere, clean pixels, no text, no UI elements.', reference_prompt: 'Visual Style: 16-bit Retro Pixel Art, vibrant limited palette, clean grid-based pixel characters, detailed pixelated environments, nostalgic 90s video game aesthetic, sharp pixel edges.' },
  { id: 'claymation_style', name: '🧱 Claymation / Stop-Motion', desc: 'Đất sét thủ công, stop-motion, ấm áp.', prompt_enforce: ', Visual Style: Claymation, stop-motion animation, handcrafted textures, tactile clay look, warm domestic lighting, unique artistic feel, no text, no watermark.', reference_prompt: 'Visual Style: Tactile Claymation Stop-Motion, handcrafted clay textures with visible fingerprints, slightly jittery organic movement, warm practical lighting, physical miniature set feel.' },
  { id: 'paper_cutout', name: '✂️ Paper Cutout', desc: 'Cắt giấy nhiều lớp, stop-motion nghệ thuật.', prompt_enforce: ', Visual Style: Paper Cutout Animation, layered textures, handcrafted feel, soft shadows, vibrant paper colors, artistic and unique, no text, no captions.', reference_prompt: 'Visual Style: Layered Paper Cutout Animation, textured craft paper, distinct sharp edges, drop shadows between paper layers, stop-motion aesthetic, vibrant paper colors, handcrafted artisanal look.' },
  { id: 'co_phong_thuy_mac', name: '🖌️ Cổ Phong Thủy Mặc (Signature)', desc: 'Tranh thủy mặc cổ phong, thư pháp Hán, sơn thủy hữu tình — PREMIUM.', prompt_enforce: ', Visual Style: Ancient Chinese Ink Wash Painting (Cổ Phong Thủy Mặc / 古風水墨畫), rendered as a museum-quality traditional Chinese ink wash masterpiece with luminous ink gradients, delicate brushwork, and the timeless elegance of Song Dynasty and Yuan Dynasty landscape painting masters. Exquisite sumi-e and shui-mo-hua technique with dynamic brush strokes varying from bold splashing ink to hair-thin detail lines, wet-on-wet ink bleeding effects, controlled ink wash gradients from deep black to ethereal pale gray, textured xuan rice paper background with visible fiber and natural aging. Majestic Chinese landscape (sơn thủy / 山水): towering misty mountain peaks shrouded in clouds, cascading waterfalls plunging into deep gorges, ancient twisted pine trees clinging to cliff edges, bamboo groves swaying in wind, plum blossoms on gnarled branches, willow trees by river banks, tranquil lakes reflecting mountains, small fishing boats in morning mist, stone bridges over streams, secluded scholars pavilions, ancient temples on mountainsides. Traditional Chinese calligraphy (thư pháp Hán / 漢字書法 / 中國書法) as integral artistic elements — elegant cursive caoshu (草書), flowing running xingshu (行書), or dignified regular kaishu (楷書) brush calligraphy rendered as poem inscriptions, title cartouches, and red cinnabar seal stamps (篆刻印章) placed in traditional composition positions. Characters wearing flowing ancient Chinese scholar robes, Daoist priest robes, or Buddhist monk robes in ink wash rendering. Monochromatic ink palette with selective color accents: deep black ink, charcoal gray, silver mist, ivory white rice paper, with occasional touches of cinnabar red (seal stamps and plum blossoms), pale jade green (bamboo), soft gold (autumn leaves), lotus pink. Atmospheric perspective with layered depth — dark foreground elements, mid-ground details fading to pale washes, distant mountains barely visible in mist. Composition following traditional Chinese scroll painting principles — vertical hanging scroll or horizontal hand scroll format, generous negative space (留白) for breathing room, asymmetric balance. 8k masterpiece, museum-quality ink wash painting. NEGATIVE: no Vietnamese calligraphy, no Vietnamese text, no chữ Quốc ngữ, no Latin alphabet, no modern text, no watermark, no logo, no photography, no 3D rendering, no cartoon, no anime, no vibrant saturated colors, no modern objects, no anatomy errors, no blurry, no horror.', reference_prompt: 'Visual Style: Ancient Chinese Ink Wash Painting (Cổ Phong Thủy Mặc), dynamic brush strokes on xuan rice paper, misty mountain landscapes, cascading waterfalls, ancient pine trees, traditional Chinese Han calligraphy inscriptions with red seal stamps, monochromatic ink palette with cinnabar accents, museum-quality 8k masterpiece.' },

  // ── CATEGORY 4: CONTEMPORARY & ABSTRACT ──
  { id: 'modern_minimalist', name: '🌿 Modern Minimalist', desc: 'Thẩm mỹ đương đại, sạch sẽ, Apple-style.', prompt_enforce: ', Visual Style: Modern Minimalist, Apple-style aesthetic, soft neutral colors, clean spaces, natural light, high-end lifestyle cinematography, 8k, no text, no watermark.', reference_prompt: 'Visual Style: High-end Modern Minimalist, Apple-style clean aesthetic, soft neutral colors, vast white spaces, natural soft light, high-end lifestyle cinematography, 8k crisp details.' },
  { id: 'cyberpunk_zen', name: '⚡ Cyberpunk Zen', desc: 'Neon tương lai + trí tuệ cổ đại.', prompt_enforce: ', Visual Style: Cyberpunk Aesthetic, neon lights, futuristic city temple, holographic Buddha, high contrast, cinematic lighting, synthwave vibe, 8k, no text, no watermark.', reference_prompt: 'Visual Style: Cyberpunk Aesthetic, glowing neon lights in teal and magenta, futuristic city temple with traditional roofs, holographic Buddha statue, rainy street reflections, synthwave color palette.' },
  { id: 'abstract_meditation', name: '🌀 Abstract Meditation', desc: 'Hình dạng chảy, ánh sáng thiền, năng lượng.', prompt_enforce: ', Visual Style: Abstract Spiritual Art, fluid energy, light particles, sacred geometry, ethereal atmosphere, deep meditative visuals, calming motion, 8k, no text, no captions.', reference_prompt: 'Visual Style: Abstract Spiritual Visualization, fluid flowing energy, glowing light particles, sacred geometry patterns, ethereal dreamlike atmosphere, deep blue and gold tones, slow motion.' },
  { id: 'sand_mandala', name: '⏳ Sand Mandala Art', desc: 'Nghệ thuật mandala cát, vô thường, thiền.', prompt_enforce: ', Visual Style: Sand Art Animation, intricate mandala patterns, flowing sand textures, spiritual transience, tactile feel, 8k, no text, no watermark.', reference_prompt: 'Visual Style: Intricate Sand Mandala Art, highly detailed colorful sand patterns, granular sand texture, top-down perspective, spiritual craftsmanship, vibrant sacred pigments.' },

  // ── CATEGORY 5: EDUCATIONAL & ARTISTIC ──
  { id: 'sketch_whiteboard', name: '🖍️ Whiteboard Sketch', desc: 'Vẽ tay trên bảng trắng, giáo dục trực quan.', prompt_enforce: ', Visual Style: Whiteboard Drawing, hand-drawn sketch, marker lines, clean white background, educational storytelling, simplified icons, no text, no handwriting.', reference_prompt: 'Visual Style: Hand-drawn Whiteboard Drawing, marker lines on clean white background, simple black sketches, educational icons, minimalist storytelling, clean high-contrast drawing.' },
  { id: 'pop_art_dharma', name: '💥 Pop Art Style', desc: 'Màu sắc đậm, comic, năng lượng cao.', prompt_enforce: ', Visual Style: Pop Art, Andy Warhol inspired, bold primary colors, comic book half-tones, high contrast, striking visual impact, no text, no speech bubbles.', reference_prompt: 'Visual Style: Pop Art, Andy Warhol inspired, bold primary colors, comic book halftone dots, high contrast, striking visual impact, repeating patterns, vibrant modern art.' },
  { id: 'watercolor_zen', name: '🎨 Watercolor Illustration', desc: 'Màu nước mềm, loang, nghệ thuật, yên bình.', prompt_enforce: ', Visual Style: Watercolor Illustration, soft edges, bleeding colors, paper texture, dreamy atmosphere, peaceful Zen aesthetic, no text, no signatures.', reference_prompt: 'Visual Style: Delicate Watercolor Painting, soft bleeding edges, wet-on-wet technique, textured paper background, peaceful pastel colors, artistic and dreamy Zen aesthetic.' },
  { id: 'thangka_animated', name: '📜 Animated Thangka', desc: 'Tranh cuộn Tây Tạng truyền thống, sống động.', prompt_enforce: ', Visual Style: Tibetan Thangka Art, intricate details, gold leaf accents, sacred geometry, traditional pigments, spiritual depth, 8k, no text, no captions.', reference_prompt: 'Visual Style: Traditional Tibetan Thangka Painting, extremely intricate gold-leaf detailing, vibrant sacred pigments, divine proportions, spiritual iconography, ancient scroll aesthetic.' },
  { id: 'glass_art', name: '💎 Stained Glass Art', desc: 'Kính màu, ánh sáng khúc xạ, thần thánh.', prompt_enforce: ', Visual Style: Stained Glass Art, luminous colors, light refraction, crystal textures, divine light, spiritual brilliance, 8k, no text, no watermark.', reference_prompt: 'Visual Style: Luminous Stained Glass Art, intricate lead lines, glowing translucent colors, light refracting through glass, divine cathedral atmosphere, crystalline textures.' },
];

// ==================================================================================
// VOICE STYLES — Nhịp / Tone / Pace cho lời thoại
// ==================================================================================
export const VOICE_STYLES: VoiceStyle[] = [
  { id: 'the_meditation_master', name: '🙏 Thiền Sư', desc: 'Giọng trầm ấm, êm dịu, hướng dẫn thiền định sâu sắc (như Thích Nhất Hạnh).', prompt_modifier: 'Narration by a serene meditation master, calm soothing voice with gentle pacing, speaking from a peaceful meditation hall, compassionate and mindful tone, guiding listeners with loving presence.' },
  { id: 'the_dharma_teacher', name: '📿 Thầy Giảng Pháp', desc: 'Giọng trí tuệ, từ bi, giải thích kinh điển sâu sắc.', prompt_modifier: 'Dharma teacher delivering Buddhist teachings, wise and compassionate voice, seated on teaching throne, explaining sutras with clarity and depth, respectful and scholarly tone with warmth.' },
  { id: 'the_mindfulness_guide', name: '🧘 Hướng Dẫn Viên Chánh Niệm', desc: 'Giọng nhẹ nhàng, hiện tại, thực tế, dễ tiếp cận.', prompt_modifier: 'Mindfulness guide with gentle present-moment awareness, soft encouraging voice, guiding daily practice, practical and accessible tone, modern yet grounded in tradition.' },
  { id: 'the_monastery_elder', name: '🏯 Trưởng Lão Tu Viện', desc: 'Giọng trải nghiệm, thanh tịnh, truyền thống, sâu lắng.', prompt_modifier: 'Monastery elder with decades of practice, weathered voice full of experience, speaking from mountain temple, traditional teachings with deep authenticity, serene and timeless wisdom.' },
  { id: 'the_modern_buddhist', name: '🌸 Phật Tử Hiện Đại', desc: 'Giọng dễ hiểu, gần gũi, đương đại, cầu nối cổ-kim.', prompt_modifier: 'Modern Buddhist practitioner, relatable contemporary voice, speaking from everyday life, accessible language, bridging ancient wisdom with modern challenges, friendly and inclusive tone.' },
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
  { id: 'long_voice', name: '👑 PHÁP THOẠI DÀI', desc: '5-20m — Chỉ viết lời thoại chất lượng cao, tối ưu biên tập', scenes: 6, wpm: 200, icon: '🎙️', color: 'amber' },
];
