export type BuddhismContext = {
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
};

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
  la_theravada: {
    id: 'la_theravada', name: 'Laos (Theravada - Lao Buddhism)', flag: '🇱🇦',
    voice_lang: 'Lao', currency: 'LAK',
    culture: 'Luang Prabang traditions, morning alms (Sai Bat), That Luang stupa, gentle and slow-paced life, deep devotion to Sangha.',
    tradition: 'Theravada (Lao Buddhism)',
    key_practices: 'Morning alms giving, temple attendance, chanting, meditation.',
    philosophy: 'Simplicity, gentleness, community spirit, Buddhist ethics.',
    writing_style: 'Simple, peaceful, heart-centered, appreciative of nature.',
    human_element: 'Youth joining alms round, grandmother weaving for temple.'
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
    culture: 'Zazen (座禅) meditation, tea ceremony (茶道), rock gardens (枯山水), calligraphy (書道), haiku poetry, wabi-sabi aesthetics.',
    tradition: 'Zen (禅宗) - Rinzai & Soto',
    key_practices: 'Zazen (sitting meditation), kinhin (walking meditation), koan study, mindful work (作務 - samu).',
    philosophy: 'Direct pointing to mind, satori (enlightenment), non-duality, present moment awareness.',
    writing_style: 'Minimalist, precise, contemplative, haiku-like brevity, nature imagery.',
    human_element: 'Monk raking zen garden, businessman\'s zazen practice.'
  },
  cn_pure_land: {
    id: 'cn_pure_land', name: 'China (Pure Land & Chan Buddhism)', flag: '🇨🇳',
    voice_lang: 'Chinese (Mandarin)', currency: 'CNY',
    culture: 'Amitabha Buddha devotion, nianfo (recitation), Pure Land aspiration, temple fairs, vegetarian cuisine, incense culture.',
    tradition: 'Pure Land (净土宗) & Chan (禅宗)',
    key_practices: 'Nianfo recitation, sutra chanting, prostrations, vegetarian offerings.',
    philosophy: 'Faith in Amitabha, rebirth in Pure Land, compassion (慈悲), karma and merit.',
    writing_style: 'Accessible, devotional, story-rich, Confucian values, proverbs.',
    human_element: 'Grandmother\'s daily nianfo, temple volunteer\'s service.'
  },
  lk_theravada: {
    id: 'lk_theravada', name: 'Sri Lanka (Theravada - Sinhala Buddhism)', flag: '🇱🇰',
    voice_lang: 'Sinhala', currency: 'LKR',
    culture: 'Poya days (full moon), Vesak celebrations, bodhi tree veneration, stupa worship, Pali canon preservation.',
    tradition: 'Theravada (Sinhala: ථෙරවාද)',
    key_practices: 'Meditation (භාවනා), dana offerings, sil (precepts), pirith chanting.',
    philosophy: 'Dhamma preservation, monastic purity, lay support, merit-making.',
    writing_style: 'Scholarly, traditional, devotional, Pali terms, historical depth.',
    human_element: 'Monk studying ancient texts, family Vesak lanterns.'
  },
  mm_theravada: {
    id: 'mm_theravada', name: 'Myanmar (Theravada - Burmese Buddhism)', flag: '🇲🇲',
    voice_lang: 'Burmese', currency: 'MMK',
    culture: 'Vipassana meditation centers, Shwedagon Pagoda, monk alms rounds, Shinbyu (novice ordination), pagoda festivals.',
    tradition: 'Theravada (ထေရဝါဒ)',
    key_practices: 'Vipassana (insight meditation), metta (loving-kindness), dana, pagoda worship.',
    philosophy: 'Mindfulness (သတိ), impermanence, suffering cessation, practical meditation.',
    writing_style: 'Meditative, practical, gentle, rural imagery, golden pagoda symbolism.',
    human_element: 'Meditator\'s 10-day retreat, child\'s Shinbyu ceremony.'
  },
  kr_seon: {
    id: 'kr_seon', name: 'South Korea (Seon Buddhism)', flag: '🇰🇷',
    voice_lang: 'Korean', currency: 'KRW',
    culture: 'Seon (선) meditation, temple stay programs, mountain monasteries, lotus lantern festival, 108 prostrations.',
    tradition: 'Seon (선종) - Korean Zen',
    key_practices: 'Hwadu (화두) meditation, prostrations, chanting, temple stay.',
    philosophy: 'Sudden enlightenment, hwadu investigation, integration with daily life.',
    writing_style: 'Earnest, diligent, mountain temple imagery, seasonal beauty.',
    human_element: 'Office worker\'s temple stay, monk\'s winter retreat.'
  },
  in_vipassana: {
    id: 'in_vipassana', name: 'India (Vipassana & Ancient Sites)', flag: '🇮🇳',
    voice_lang: 'Hindi', currency: 'INR',
    culture: 'Vipassana meditation revival, Bodh Gaya pilgrimage, Buddhist circuit, Ambedkar Buddhism.',
    tradition: 'Vipassana & Navayana',
    key_practices: '10-day Vipassana courses, Anapana, body scanning, metta practice.',
    philosophy: 'Non-sectarian Dhamma, experiential wisdom, equanimity (उपेक्षा).',
    writing_style: 'Universal, inclusive, practical, ancient wisdom meets modern science.',
    human_element: 'Engineer\'s first Vipassana course, pilgrim at Bodhi tree.'
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
  global_secular: {
    id: 'global_secular', name: 'Global (Secular Mindfulness)', flag: '🌍',
    voice_lang: 'English (International)', currency: 'USD',
    culture: 'App-based meditation, workplace mindfulness, scientific research, secular ethics, global sangha.',
    tradition: 'Secular/Non-denominational',
    key_practices: 'Guided meditation, breath awareness, stress reduction, focus training.',
    philosophy: 'Universal well-being, evidence-based practice, practical life skills.',
    writing_style: 'Clear, modern, scientific, inclusive, globally relatable.',
    human_element: 'Student managing stress, healthcare worker\'s resilience.'
  },
  vn_theravada: {
    id: 'vn_theravada', name: 'Vietnam (Theravada - Nam Tông)', flag: '🇻🇳',
    voice_lang: 'Vietnamese', currency: 'VND',
    culture: 'Theravada tradition in Southern Vietnam, Khmer influence, focus on Pali canon and Vipassana meditation, beautiful forest temples.',
    tradition: 'Theravada (Nam Tông)',
    key_practices: 'Vipassana meditation, chanting in Pali, monk alms rounds.',
    philosophy: 'Purity, original Dhamma, mindfulness, wisdom.',
    writing_style: 'Calm, traditional, precise, meditative.',
    human_element: 'Monk in a forest temple, lay person practicing Vipassana.'
  }
};

export const CONTEXT_LIST = Object.values(BUDDHISM_CONTEXTS);
