export type VisualStyle = {
  id: string;
  name: string;
  desc: string;
  prompt_enforce: string;
  reference_prompt: string;
};

export const VISUAL_STYLES: VisualStyle[] = [
  {
    id: 'auto', name: '✨ AI Director Auto',
    desc: 'AI tự động chọn phong cách phù hợp nhất.',
    prompt_enforce: '',
    reference_prompt: 'AI will determine the best visual style based on the cultural context provided.'
  },
  {
    id: 'dharma_talk', name: '🙏 Dharma Talk Truyền Thống',
    desc: 'Không gian giảng pháp truyền thống với thầy và học trò.',
    prompt_enforce: ', Visual Style: Cinematic Dharma Talk, traditional monk attire, temple interior, Buddha statue, incense smoke, soft warm lighting, 8k documentary quality, no text, no watermark.',
    reference_prompt: 'Visual Style: Cinematic Documentary, close-up of a wise elderly monk in orange robes, serene expression, peaceful monastery interior, soft morning light through windows, incense smoke, shallow depth of field, 8k professional photography, National Geographic style.'
  },
  {
    id: 'temple_cinematic', name: '🏯 Đền Chùa Điện Ảnh',
    desc: 'Những shot hoành tráng về kiến trúc và cảnh quan Phật giáo.',
    prompt_enforce: ', Visual Style: Cinematic Architecture, majestic temples, pagodas, stupas, misty mountains, golden hour lighting, National Geographic style, 8k, no text, no captions.',
    reference_prompt: 'Visual Style: Epic Landscape Cinematography, ancient golden pagodas and misty mountain peaks, sunset golden hour lighting, vast majestic atmosphere, birds flying in distance, National Geographic quality, 8k ultra-detailed.'
  },
  {
    id: 'animated_2d_anime', name: '🎨 2D Anime Style',
    desc: 'Phong cách anime Nhật, đường nét sạch, màu sắc rực rỡ.',
    prompt_enforce: ', Visual Style: 2D Anime, high-quality Japanese animation style, expressive characters, vibrant scenery, Ghibli-inspired backgrounds, clean line art, no text, no subtitles.',
    reference_prompt: 'Visual Style: High-quality 2D Anime, Studio Ghibli inspired, hand-drawn aesthetic, clean vibrant colors, expressive character eyes, detailed natural backgrounds, lush landscapes, peaceful atmosphere, professional animation.'
  },
  {
    id: 'animated_3d_pixar', name: '🧸 3D Pixar Style',
    desc: 'Animation 3D theo phong cách Pixar/Disney, dễ thương và thân thiện.',
    prompt_enforce: ', Visual Style: 3D Animation, Pixar style, Disney-inspired character design, soft lighting, detailed textures, expressive facial features, friendly atmosphere, 8k render, no text, no watermark.',
    reference_prompt: 'Visual Style: 3D Pixar Animation, Disney-inspired character design, soft subsurface scattering on skin, big expressive eyes, cinematic lighting, clay-like smooth textures, vibrant colors, 8k render, professional character model, no text, no watermark.'
  },
  {
    id: 'stickman_dharma', name: '👤 Stickman Buddhism',
    desc: 'Animation stickman đơn giản cho việc giảng dạy rõ ràng.',
    prompt_enforce: ', Visual Style: Minimalist Stickman Animation, clean white background, black stick figures, smooth motion, simple visual metaphors, educational clarity, professional motion graphics, no text, no captions.',
    reference_prompt: 'Visual Style: Minimalist Stickman Animation, clean white background, black bold stick figures, simple circular heads, smooth vector motion, clear visual storytelling metaphors, educational clarity.'
  },
  {
    id: 'ink_wash_painting', name: '🖌️ Tranh Mực Nước',
    desc: 'Phong cách sumi-e truyền thống Đông Á, nghệ thuật và mềm mại.',
    prompt_enforce: ', Visual Style: Traditional Chinese Ink Wash Painting, sumi-e style, brush strokes, watercolor textures, minimalist composition, Zen aesthetic, fluid motion, paper texture, no text, no signatures.',
    reference_prompt: 'Visual Style: Traditional East Asian Ink Wash Painting, sumi-e style, dynamic brush strokes, varying shades of black ink on textured rice paper, minimalist composition, fluid motion, Zen aesthetic.'
  },
  {
    id: 'pixel_art_buddha', name: '👾 Pixel Art Retro',
    desc: 'Phong cách game retro 8-bit/16-bit, hoài cổ và độc đáo.',
    prompt_enforce: ', Visual Style: 16-bit Pixel Art, retro video game aesthetic, vibrant palette, detailed pixel environments, nostalgic atmosphere, clean pixels, no text, no UI elements.',
    reference_prompt: 'Visual Style: 16-bit Retro Pixel Art, vibrant limited palette, clean grid-based pixel characters, detailed pixelated environments, nostalgic 90s video game aesthetic, sharp pixel edges.'
  },
  {
    id: 'claymation_style', name: '🧱 Claymation / Stop-Motion',
    desc: 'Phong cách đất sét/thủ công, ấm áp và thực tế.',
    prompt_enforce: ', Visual Style: Claymation, stop-motion animation, handcrafted textures, tactile clay look, warm domestic lighting, unique artistic feel, no text, no watermark.',
    reference_prompt: 'Visual Style: Tactile Claymation Stop-Motion, handcrafted clay textures with visible fingerprints, slightly jittery organic movement, warm practical lighting, physical miniature set feel.'
  },
  {
    id: 'paper_cutout', name: '✂️ Paper Cutout',
    desc: 'Animation stop-motion với kết cấu giấy lớp.',
    prompt_enforce: ', Visual Style: Paper Cutout Animation, layered textures, handcrafted feel, soft shadows, vibrant paper colors, artistic and unique, no text, no captions.',
    reference_prompt: 'Visual Style: Layered Paper Cutout Animation, textured craft paper, distinct sharp edges, drop shadows between paper layers, stop-motion aesthetic, vibrant paper colors, handcrafted artisanal look.'
  },
  {
    id: 'modern_minimalist', name: '🌿 Modern Minimalist',
    desc: 'Thẩm mỹ đương đại sạch sẽ cho chánh niệm hiện đại.',
    prompt_enforce: ', Visual Style: Modern Minimalist, Apple-style aesthetic, soft neutral colors, clean spaces, natural light, high-end lifestyle cinematography, 8k, no text, no watermark.',
    reference_prompt: 'Visual Style: High-end Modern Minimalist, Apple-style clean aesthetic, soft neutral colors, vast white spaces, natural soft light, high-end lifestyle cinematography, 8k crisp details.'
  },
  {
    id: 'cyberpunk_zen', name: '⚡ Cyberpunk Zen',
    desc: 'Thẩm mỹ neon tương lai kết hợp với trí tuệ cổ xưa.',
    prompt_enforce: ', Visual Style: Cyberpunk Aesthetic, neon lights, futuristic city temple, holographic Buddha, high contrast, cinematic lighting, synthwave vibe, 8k, no text, no watermark.',
    reference_prompt: 'Visual Style: Cyberpunk Aesthetic, glowing neon lights in teal and magenta, futuristic city temple with traditional roofs, holographic Buddha statue, rainy street reflections, synthwave color palette.'
  },
  {
    id: 'abstract_meditation', name: '🌀 Abstract Meditation',
    desc: 'Hình dạng chảy, mẫu ánh sáng, tập trung vào trải nghiệm bên trong.',
    prompt_enforce: ', Visual Style: Abstract Spiritual Art, fluid energy, light particles, sacred geometry, ethereal atmosphere, deep meditative visuals, calming motion, 8k, no text, no captions.',
    reference_prompt: 'Visual Style: Abstract Spiritual Visualization, fluid flowing energy, glowing light particles, sacred geometry patterns, ethereal dreamlike atmosphere, deep blue and gold tones, slow motion.'
  },
  {
    id: 'sand_mandala', name: '⏳ Sand Mandala Art',
    desc: 'Nghệ thuật cát ẩn dụ được tạo ra và tan biến.',
    prompt_enforce: ', Visual Style: Sand Art Animation, intricate mandala patterns, flowing sand textures, spiritual transience, tactile feel, 8k, no text, no watermark.',
    reference_prompt: 'Visual Style: Intricate Sand Mandala Art, highly detailed colorful sand patterns, granular sand texture, top-down perspective, spiritual craftsmanship, vibrant sacred pigments.'
  },
  {
    id: 'watercolor_zen', name: '🎨 Watercolor Illustration',
    desc: 'Màu mờ chảy, bầu không khí hòa bình và nghệ thuật.',
    prompt_enforce: ', Visual Style: Watercolor Illustration, soft edges, bleeding colors, paper texture, dreamy atmosphere, peaceful Zen aesthetic, no text, no signatures.',
    reference_prompt: 'Visual Style: Delicate Watercolor Painting, soft bleeding edges, wet-on-wet technique, textured paper background, peaceful pastel colors, artistic and dreamy Zen aesthetic.'
  },
  {
    id: 'thangka_animated', name: '📜 Animated Thangka',
    desc: 'Nghệ thuật cuộn phù điêu Tây Tạng được làm sống động.',
    prompt_enforce: ', Visual Style: Tibetan Thangka Art, intricate details, gold leaf accents, sacred geometry, traditional pigments, spiritual depth, 8k, no text, no captions.',
    reference_prompt: 'Visual Style: Traditional Tibetan Thangka Painting, extremely intricate gold-leaf detailing, vibrant sacred pigments, divine proportions, spiritual iconography, ancient scroll aesthetic.'
  },
  {
    id: 'glass_art', name: '💎 Stained Glass Art',
    desc: 'Kết cấu kính phát sáng, khúc xạ ánh sáng, cảm giác thiêng liêng.',
    prompt_enforce: ', Visual Style: Stained Glass Art, luminous colors, light refraction, crystal textures, divine light, spiritual brilliance, 8k, no text, no watermark.',
    reference_prompt: 'Visual Style: Luminous Stained Glass Art, intricate lead lines, glowing translucent colors, light refracting through glass, divine cathedral atmosphere, crystalline textures.'
  },
  {
    id: 'golden_dharma_realism', name: '🏛️ Golden Dharma Realism',
    desc: 'Phật giáo thiêng liêng với vàng ròng, hào quang tròn, tia sáng thần thánh.',
    prompt_enforce: ', Visual Style: Buddhist Celestial Golden Dharma Realism, sacred polished gold metal with strong reflections and micro-scratches, colossal circular halos, divine sunburst backlight, luminous golden aura, volumetric god rays through incense haze, sacred light beams, golden floating particles, warm spiritual radiance, cinematic physically plausible lighting, epic composition, 8k, no text, no watermark, no cartoon, no anime, no plastic CGI.',
    reference_prompt: 'Visual Style: Buddhist Celestial Golden Dharma Realism, a serene divine Buddha figure seated on an elaborate lotus throne, massive radiant circular halo behind with sunburst golden rays, polished sacred gold with realistic reflections and subtle roughness and micro-scratches, volumetric god rays streaming through clouds of incense haze, floating golden dust particles, sacred gemstones with refraction and translucency, flowing silk kasaya robes responsive to gravity, realistic skin with pores and subsurface scattering, luminous moist eyes with catchlights, elegant hand mudra, cloud ocean below, temple silhouettes in warm golden-hour atmosphere, sacred gold and white-gold and sunrise amber and lotus pink color palette, cinematic shallow depth of field, soft anamorphic character, natural bokeh, slight film grain, 8k masterpiece.'
  },
  {
    id: 'celestial_mythic', name: '🌌 Celestial Mythic Baroque',
    desc: 'Phật giáo huyền ảo với kiến trúc baroque vàng, bảo thạch, tinh vân.',
    prompt_enforce: ', Visual Style: Buddhist Celestial Mythic Realism with baroque rococo golden luxury, floating pagodas, white marble bridges, dragon-carved pillars, golden crystalline trees, nebula skies, cosmic mist, jewel-encrusted sacred design, golden filigree ornamentation, cinematic fantasy film quality, 8k, no text, no watermark, no cartoon, no anime, no plastic CGI.',
    reference_prompt: 'Visual Style: Buddhist Celestial Mythic Realism, a majestic floating golden pagoda above a vast cloud ocean, connected by white marble bridges with dragon-carved pillars, golden crystalline trees with glowing leaves, rotating glowing mandala portal in the sky, nebula skies with deep indigo and violet cosmic shadows, pink lotus fields on cloud platforms, golden baroque filigree ornamentation and rococo scrollwork on architecture, jewel-encrusted sacred design with turquoise ruby sapphire jade gemstones showing realistic refraction, silk-like light ribbons flowing through cosmic mist, Sanskrit books glowing with divine golden script, sacred gold and warm ivory and cinnabar red and teal silk color palette, epic wide establishing shot, volumetric haze, atmospheric depth, 8k cinematic masterpiece.'
  },
  {
    id: 'golden_dragon_guardian', name: '🐉 Long Thần Hộ Pháp',
    desc: 'Rồng vàng hộ pháp, linh thú thiêng liêng, sống động như thật.',
    prompt_enforce: ', Visual Style: Sacred Golden Dragon Guardian, benevolent golden dragon with realistic scale texture and muscle structure, coiling protectively around sacred temple or Buddha, sacred cranes and celestial deer, mythic creature realism with moist eyes and natural joints and subtle dirt, divine golden aura, cloud ocean backdrop, cinematic lighting, 8k, no text, no watermark, no cartoon, no anime.',
    reference_prompt: 'Visual Style: Sacred Mythic Creature Realism, a magnificent benevolent golden dragon guardian coiling majestically around a sacred lotus pillar, realistic polished gold scales with micro-scratches and natural tarnish variation, powerful muscle structure visible under scales, moist luminous dragon eyes with catchlights, subtle golden dust on body, sacred cranes with detailed white feathers flying through incense haze, peaceful celestial deer with soft fur texture standing on marble platform, golden particles floating in warm volumetric god rays, colossal circular halo behind the scene, cloud ocean below, sacred gold and radiant white-gold and sunrise amber palette, low-angle divine hero shot, shallow depth of field, cinematic rim light, 8k.'
  },
  {
    id: 'lotus_cloudscape', name: '🌸 Liên Hoa Vân Hải',
    desc: 'Biển mây hồng sen, chùa nổi, cảnh giới Tịnh Độ huy hoàng.',
    prompt_enforce: ', Visual Style: Celestial Lotus Cloudscape Pure Land, vast pink lotus fields on cloud oceans, floating temple architecture, sacred light beams, golden hour divine atmosphere, peaceful and transcendent, white marble lotus pedestals, incense smoke, soft heavenly horizons, cinematic composition, 8k, no text, no watermark, no cartoon, no anime.',
    reference_prompt: 'Visual Style: Celestial Pure Land Lotus Cloudscape, a breathtaking vast ocean of soft luminous clouds with endless pink and white lotus fields blooming on cloud platforms, floating golden pagodas and temples in the distance connected by white marble bridges, sacred light beams streaming down from a radiant celestial sun, golden floating dust particles in warm atmospheric haze, lotus pedestals with carved sacred motifs, flowing silk ribbons and celestial drapery in gentle wind, peach cloud glow and soft pearl white and lotus pink and sunrise amber color palette, centered devotional composition, epic wide shot, soft atmospheric perspective, heavenly warm light, natural bokeh, 8k divine masterpiece.'
  },
  {
    id: 'dharma_treasures', name: '📿 Pháp Khí Linh Bảo',
    desc: 'Cận cảnh pháp khí: bảo bình, bánh xe pháp, mạn-đà-la, kinh sách phát sáng.',
    prompt_enforce: ', Visual Style: Sacred Dharma Treasures Close-up, macro cinematic shots of glowing Dharma wheels, treasure vases with jewel inlays, rotating golden mandalas, Sanskrit books with divine glowing script, sacred gemstones with refraction, polished gold with realistic texture, incense smoke, cinematic lighting, 8k, no text, no watermark, no cartoon.',
    reference_prompt: 'Visual Style: Sacred Dharma Instrument Macro Realism, an extreme close-up cinematic shot of a magnificent rotating golden Dharma wheel with intricate carved lotus and dragon motifs, surrounded by floating sacred objects: a jewel-encrusted treasure vase with turquoise and ruby gemstones showing realistic refraction and inner depth, an ancient Sanskrit book with pages glowing divine golden script, a rotating three-dimensional mandala made of golden light particles and sacred geometry, polished gold surfaces with strong reflections and subtle roughness and fine dust and micro-scratches, incense smoke curling through warm volumetric light, sacred gold and radiant amber and turquoise and sapphire blue accents, shallow depth of field, soft anamorphic character, macro lens, warm cinematic lighting, 8k.'
  },
  {
    id: 'celestial_mythic_ultra', name: '🌌✨ Celestial Mythic ULTRA',
    desc: 'Bản nâng cao — Phật giáo huyền ảo baroque cực chi tiết, chất lượng phim fantasy cao cấp.',
    prompt_enforce: ', Visual Style: Buddhist Celestial Mythic Realism blended with mythic celestial baroque rococo golden luxury, rendered like high-budget cinematic fantasy film with sacred Eastern spiritual atmosphere, divine majestic peaceful meditative otherworldly, painterly mythic realism, golden baroque ornamentation, rococo filigree, jewel-encrusted sacred design, floating pagodas, nebula skies, cosmic mist, cloud oceans, 8k, no text, no watermark, no cartoon, no anime, no plastic CGI.',
    reference_prompt: 'Buddhist Celestial Mythic Realism blended with mythic celestial baroque / rococo golden luxury, rendered like a high-budget cinematic fantasy film with sacred Eastern spiritual atmosphere. The world must feel divine, majestic, peaceful, meditative, and otherworldly, but grounded in believable materials, real light behavior, and physically plausible camera optics. Use painterly mythic realism, Buddhist celestial fantasy art, divine spiritual realism, golden baroque ornamentation, rococo filigree, jewel-encrusted sacred design, floating pagodas, white marble bridges, dragon-carved pillars, glowing Dharma wheels, rotating mandalas, pink lotus fields, golden crystalline trees, nebula skies, cosmic mist, incense smoke, cloud oceans, Sanskrit books glowing with divine script, mandala portals, and silk-like light ribbons. Gold must look like real polished metal with bright reflections, subtle roughness, tiny scratches, micro-dust, soft fingerprints, and natural tarnish variation, never flat yellow plastic. Gemstones such as turquoise, ruby, sapphire, jade, and crystal must be vivid but realistic, with refraction, reflection, tiny imperfections, and natural depth. Silk robes, hanfu, ribbons, embroidery, and sacred cloth must look soft, layered, flexible, and physically responsive to folds, gravity, wind, and movement. Stone, marble, pillars, floors, temples, and pagodas must show chips, tiny cracks, dust, weathering, worn edges, and realistic roughness. Characters must have realistic skin pores, soft subsurface scattering, tiny wrinkles, natural hair strands, realistic eyes with moisture and catchlight, imperfect beautiful makeup, and believable facial structure, never waxy or doll-like. Sacred animals such as cranes, deer, or horses must look like real living creatures with feather or fur texture, muscles, moist eyes, natural joints, subtle dirt, and realistic shadows. Lighting must be cinematic and physically plausible with clear key light, soft fill, rim light, bounce light, volumetric haze, golden-hour warmth, sacred white-gold glow, subtle bloom, and natural atmospheric diffusion. Camera language should use epic wide establishing shots, low-angle divine hero shots, eye-level portraits, macro close-ups, shallow depth of field, soft anamorphic feel, natural bokeh, subtle lens flare, atmospheric depth, and slight film grain. Color palette: sacred gold, warm ivory, soft white, cinnabar red, teal silk, turquoise, ruby, sapphire blue, jade green, peach cloud glow, deep indigo nebula, violet cosmic shadows. NEGATIVE: no text, no watermark, no logo, no subtitles, no blurry, no low resolution, no plastic CGI, no toy-like render, no cartoon, no anime, no game asset, no waxy skin, no over-smoothed face, no fake gold, no flat yellow material, no messy composition, no random extra people, no horror mood, no gore, no modern objects, no sci-fi machines, no neon cyberpunk, no anatomy errors.'
  },
  {
    id: 'golden_dharma_ultra', name: '🏛️✨ Golden Dharma ULTRA',
    desc: 'Bản nâng cao — Phật giáo vàng ròng thiêng liêng cực chi tiết, hào quang & long thần.',
    prompt_enforce: ', Visual Style: Buddhist Celestial Golden Dharma Realism blended with sacred mythic celestial fantasy and luminous golden devotional grandeur, rendered like high-budget cinematic spiritual film, sacred compassionate peaceful divine awe-inspiring, radiant golden aura design, colossal circular halos, divine sunburst backlight, benevolent golden dragon guardians, lotus thrones, floating Dharma symbols, 8k, no text, no watermark, no cartoon, no anime, no plastic CGI.',
    reference_prompt: 'Buddhist Celestial Golden Dharma Realism blended with sacred mythic celestial fantasy and luminous golden devotional grandeur, rendered like a high-budget cinematic spiritual film with a holy Eastern Buddhist atmosphere. The world must feel divine, majestic, compassionate, peaceful, meditative, and awe-inspiring, but still grounded in believable materials, realistic light behavior, atmospheric depth, and physically plausible camera optics. Use painterly mythic realism, Buddhist celestial fantasy art, sacred devotional realism, radiant golden aura design, heavenly cloud realms, colossal circular halos, divine sunburst backlight, benevolent golden dragon guardians, lotus thrones, floating Dharma symbols, glowing mandalas, celestial mist, rainbow lens flares, incense haze, cloud oceans, sacred light beams, golden particles, soft heavenly horizons, temple silhouettes, and warm spiritual radiance. Gold must look like real polished sacred metal with strong reflections, subtle roughness, micro-scratches, fine dust, soft fingerprints, edge wear, and natural tonal variation, never flat yellow plastic. Sacred gemstones, crystals, treasure vases, ornaments, and halo decorations must appear vivid yet realistic, with refraction, reflection, translucency, tiny imperfections, and believable inner depth. Silk robes, kasaya, celestial drapery, ribbons, embroidery, and sacred cloth must look layered, flowing, soft, and physically responsive to gravity, wind, folds, and movement. Divine characters must have serene compassionate faces, realistic skin pores, subtle subsurface scattering, soft facial lines, natural hair strands, luminous moist eyes with catchlights, elegant hand mudras, believable anatomy, and spiritually elevated presence, never waxy, doll-like, or over-smoothed. Sacred creatures such as golden dragons, cranes, deer, or celestial birds must look like living mythic beings with realistic scale texture, feather or fur detail, muscle structure, natural joints, moist eyes, subtle dirt, and believable shadows. Lighting must be cinematic and physically plausible with a powerful white-gold backlight, clear halo source, soft fill, luminous rim light, bounce light from gold surfaces, volumetric god rays, atmospheric haze, subtle bloom, and natural diffusion through clouds and mist. Camera language should use epic wide establishing shots, centered devotional compositions, low-angle divine hero shots, slow push-ins, eye-level sacred portraits, macro close-ups of ornaments and hands, shallow depth of field, soft anamorphic character, natural bokeh, subtle lens flare, atmospheric perspective, and slight cinematic film grain. Color palette: sacred gold, radiant white-gold, warm ivory, soft pearl white, sunrise amber, peach cloud glow, cinnabar accents, lotus pink, warm orange light, subtle rainbow highlights, turquoise gemstones, jade green details, sapphire blue accents, soft violet haze, and deep celestial indigo in distant skies. NEGATIVE: no text, no watermark, no logo, no subtitles, no blurry, no low resolution, no plastic CGI, no toy-like render, no flat fake gold, no cartoon, no anime, no game asset, no waxy skin, no over-smoothed face, no horror mood, no gore, no demonic distortion, no messy composition, no random extra people, no modern objects, no sci-fi machinery, no cyberpunk neon, no anatomy errors.'
  },
  {
    id: 'sacred_cinematic_storyboard', name: '🎬 Sacred Cinematic Film',
    desc: 'Phong cách phim điện ảnh Phật giáo cao cấp — vàng lỏng, đền nổi, tinh vân mandala, long thần, kiếm trí tuệ.',
    prompt_enforce: ', Visual Style: Sacred Cinematic Buddhist Film, high-budget cinematic spiritual film quality, viscous molten gold flowing through cracked earth, floating celestial temples with golden spires in iridescent clouds, cosmic crystal tunnels with refracting light, cascading light-water shimmering streams, starry mandala nebulae rotating in geometric sacred patterns, multi-arm divine figures in profound meditation with conch-white skin and jeweled crowns, colossal circular lunar halos, dark lake reflections with floating mirrors, blooming pink and white lotus flowers on sacred waters, golden Sanskrit syllables orbiting divine figures, wisdom-fire flaming swords severing chains of ignorance, royal blue lions as divine mounts, crystal mala beads refracting starlight, Prajnaparamita Sutra books with glowing golden text, pulsing Mani jewels, zero-gravity floating debris and gemstones, cinematic camera language with slow push-ins and macro close-ups and epic crane shots, volumetric god rays, atmospheric haze, shallow depth of field, anamorphic bokeh, slight film grain, 8k masterpiece, no text, no watermark, no cartoon, no anime, no plastic CGI.',
    reference_prompt: 'Visual Style: Sacred Cinematic Buddhist Film. A high-budget cinematic spiritual film with sacred Eastern Buddhist atmosphere. Thick viscous golden fluid oozes through jagged fissures in dry earth revealing glowing sacred Thangka mandalas beneath. Celestial temples ascend through golden mists with shimmering roofs, floating in iridescent cloud kingdoms connected by white marble bridges with prayer flags fluttering on distant spires. Cosmic crystal tunnels with rotating facets catching colored light, cascading light-water flowing in continuous shimmering streams with mist and glowing particles. Starry mandala nebulae rotating slowly around central cores tightening into geometric sacred shapes with pulsing starlight and cosmic dust. Multi-arm divine figures in profound meditative stillness with conch-white skin, five-pointed jeweled crowns, serene compassionate faces with golden moles, luminous moist eyes with catchlights, elegant hand mudras holding translucent blue Mani jewels pulsing with breathing light, crystal mala beads refracting starlight, blooming blue lotuses with golden pollen dust. Colossal circular lunar halos pulsing with rhythmic white-gold light. Dark sacred lakes with floating mirrors capturing divine reflections, white lotus flowers opening on calm waters with moonlight reflections, pink lotus petals unfurling in fluid rapid blooming revealing cores of pure white light. Golden Sanskrit syllables fading into existence pulsating with rhythmic golden light, revolving around central divine figures in clockwise mandala patterns. Wisdom-fire flaming double-edged swords with dancing painterly flames severing heavy iron chains of ignorance into crumbling embers. Royal blue lions as divine mounts with liquid silk manes, breathing chests, tossing heads in silent powerful roars. Prajnaparamita Sutra books levitating with pages fluttering and golden text pulsing with light. Sacred stone tablets rising into curved formations glowing with ancient symbols. Transformative sequences of dark tangled thorny roots being swept by white light into flowing white water. Golden mountains of wisdom ascending through roaring infernos with golden light pulsing from peaks. Camera language: slow forward tracking shots, rapid zoom-outs, slow upward tilts, continuous forward dolly-in motions, slow downward crane shots, fast smooth dolly-in zooms, flying POV motions, static locked shots with subtle lens breathing, extreme close-ups, macro shots, wide sweeping pans, orbiting camera movements, low-angle divine hero shots, dynamic tracking following sword arcs, overhead top-down zoom-ins. Color palette: sacred gold, molten amber, cosmic indigo, deep nebula violet, conch-white, pearl moonlight, teal atmosphere, lotus pink, wisdom-fire orange, crystal refraction rainbows. NEGATIVE: no text, no watermark, no logo, no subtitles, no blurry, no low resolution, no plastic CGI, no cartoon, no anime, no game asset, no waxy skin, no anatomy errors, no duplicate limbs beyond approved divine form, no modern objects, no horror mood.'
  }
];