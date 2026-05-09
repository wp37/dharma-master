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
  }
];