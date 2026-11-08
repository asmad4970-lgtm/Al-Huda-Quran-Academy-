import { Course } from '../types';

export const COURSES: Course[] = [
  {
    id: 'noorani-qaida',
    title: 'Noorani Qaida',
    arabicTitle: 'نورانی قاعدہ',
    category: 'beginner',
    shortDesc: 'The essential foundational course for children and beginners to master Arabic alphabet articulation, recognition, and pronunciation rules.',
    fullDesc: 'Designed specifically for beginners of all ages, our Noorani Qaida course lays the unshakeable foundation for correct Quranic recitation. Students learn the shapes of isolated and connected letters, exact Makharij (points of vocal articulation), short and long vowels (Harkat, Tanween, Madd), Sukoon, Tashdeed, and basic Waqf signs. By completing this course, students transition seamlessly into reading the Holy Quran with phonetic precision.',
    duration: '3 to 6 Months',
    ageGroup: 'Kids (4+) & Adult Beginners',
    keyOutcomes: [
      'Master all 29 Arabic letters with correct phonetics & Makharij',
      'Understand letter connections, joint forms, and vowel signs',
      'Learn fundamental rules of Madd, Tanween, and Tashdeed',
      'Read compound Quranic words smoothly and confidently'
    ],
    syllabusTopics: [
      'Lesson 1-3: Arabic Alphabets & Compound Letters (Huroof Mufradat & Murakkabat)',
      'Lesson 4-6: Short Vowels (Zabar, Zair, Paish) & Standing Harakat',
      'Lesson 7-9: Letters of Leen & Tanween (Double Vowels)',
      'Lesson 10-12: Sukoon (Jazm) and Rules of Noon Sakin',
      'Lesson 13-15: Tashdeed & Comprehensive Practice Drills'
    ],
    image: '/src/assets/images/course_noorani_qaida_1794166130110.jpg',
    featured: true
  },
  {
    id: 'quran-reading',
    title: 'Quran Reading (Nazra)',
    arabicTitle: 'ناظرہ قرآن کریم',
    category: 'reading',
    shortDesc: 'Fluent recitation of the complete Holy Quran with continuous teacher guidance, voice modulation, and stop sign recognition.',
    fullDesc: 'The Nazra Quran course enables students who have finished Noorani Qaida to recite the Holy Quran smoothly, effortlessly, and with reverence. Under the one-on-one supervision of our patient teachers, students build reading momentum, eliminate hesitation, correct recurring pronunciation errors, and practice reading large paragraphs and surahs smoothly from Surah Al-Fatiha to Surah An-Nas.',
    duration: '6 to 12 Months',
    ageGroup: 'Children & Adults',
    keyOutcomes: [
      'Achieve continuous, fluent recitation of the 30 Paras of the Quran',
      'Recognize and respect Quranic pause & punctuation symbols (Waqf)',
      'Develop a beautiful, measured rhythm and emotional connection',
      'Overcome stuttering, hesitation, and mispronunciations'
    ],
    syllabusTopics: [
      'Recitation of short Surahs from Juz 30 (Juz Amma)',
      'Gradual progression through Surah Al-Baqarah and early chapters',
      'Practical identification of pause marks (Meem, Jeem, Taa, Qaf-Laam)',
      'Daily reading stamina development and speed calibration',
      'Recitation review and graduation completion exam'
    ],
    image: '/src/assets/images/course_quran_reading_1794166129477.jpg',
    featured: true
  },
  {
    id: 'quran-tajweed',
    title: 'Quran with Tajweed',
    arabicTitle: 'تجوید قرآن مع القراءۃ',
    category: 'tajweed',
    shortDesc: 'Master the classical rules of Tajweed: Makharij, Sifaat, Ghunnah, Ikhfa, Idgham, and Qalqalah to recite as revealed.',
    fullDesc: 'Reciting the Quran with Tajweed is a spiritual obligation and an art. Our certified Tajweed scholars guide students through the comprehensive theoretical and practical rules codified by Imam Al-Jazari. Students learn the intrinsic and conditional characteristics of letters, throat letters, tongue positioning, nasal sounds (Ghunnah), heavy vs light letters (Tafkheem & Tarqeeq), and rules of stopping, turning recitation into a melodious worship.',
    duration: '6 to 9 Months',
    ageGroup: 'Intermediate & Advanced (All Ages)',
    keyOutcomes: [
      'Apply practical rules of Noon Sakin & Meem Sakin (Izhar, Ikhfa, Idgham, Iqlab)',
      'Perfect the five major Makharij (Halq, Lisaan, Shafatan, Khayshum, Jawf)',
      'Master the echoing bounce of Qalqalah letters (ق ط ب ج د)',
      'Understand rules of elongation (Madd Munfasil, Muttasil, Lazim)'
    ],
    syllabusTopics: [
      'Introduction to Tajweed & Virtues of Beautiful Recitation',
      'Makharij al-Huroof (Vocal Tract Anatomy & Articulation)',
      'Sifaat al-Huroof (Permanent & Temporary Characteristics)',
      'Rules of Nun & Meem Sakin and Tanween',
      'Rules of Ra and Laam of Jalalah (Tafkheem and Tarqeeq)',
      'Types of Madd and Stopping Rules (Ahkam al-Waqf)'
    ],
    image: '/src/assets/images/course_quran_reading_1794166129477.jpg',
    featured: true
  },
  {
    id: 'hifz-ul-quran',
    title: 'Hifz-ul-Quran (Memorization)',
    arabicTitle: 'حفظ القرآن الکریم',
    category: 'hifz',
    shortDesc: 'Structured memorization of selected Surahs or the complete Holy Quran with proven daily revision (Sabaq, Sabqi, Manzil) techniques.',
    fullDesc: 'Becoming a Hafiz of the Holy Quran is one of the highest honors in Islam. Al Huda Quran Academy offers a structured, supportive online Hifz program overseen by experienced Huffaz. We employ the classical 3-part methodology: Sabaq (new daily memorization), Sabqi (recent Juz revision), and Manzil (cumulative systematic revision). Classes are conducted strictly one-on-one to ensure personalized pacing and zero memory fatigue.',
    duration: 'Flexible (Part-time or Full-time)',
    ageGroup: 'Dedicated Children (7+) & Adults',
    keyOutcomes: [
      'Systematic memorization of Juz 30, selected Surahs (Yaseen, Mulk, Rahman), or complete 30 Juz',
      'Solidified retention through daily 3-tier revision methodology',
      'Consistent daily tracking with personalized online progress logs',
      'Mentorship on mental focus, Quranic lifestyle, and discipline'
    ],
    syllabusTopics: [
      'Daily Sabaq (New lesson memorization under live supervision)',
      'Daily Sabqi (Consolidation of previous 5-10 pages)',
      'Manzil Routine (Weekly circular review of memorized chapters)',
      'Tajweed perfection during rapid and slow revision',
      'Monthly oral assessment and parent consultation'
    ],
    image: '/src/assets/images/academy_online_classroom_1794166130612.jpg'
  },
  {
    id: 'masnoon-duain',
    title: 'Masnoon Duain & Daily Prayers',
    arabicTitle: 'مسنون دعائیں و اذکار',
    category: 'supplication',
    shortDesc: 'Learn authentic daily supplications, 40 Rabbana Duas, Salah steps, and morning/evening Azkar from the Sunnah of Prophet Muhammad ﷺ.',
    fullDesc: 'Revive the Sunnah in your family daily routine. This heartwarming course teaches children and adults the authentic supplications taught by the Prophet Muhammad ﷺ for every occasion of life. From waking up, eating, leaving home, entering the mosque, to supplications for protection, anxiety, exams, and illness. Students also learn the complete words, translation, and posture etiquette of Salah (Namaz) and Janazah prayer.',
    duration: '2 to 4 Months',
    ageGroup: 'Children (5+) & Adults',
    keyOutcomes: [
      'Memorize 50+ essential daily Duas with correct Arabic pronunciation',
      'Understand the beautiful translations and spiritual meaning of each Dua',
      'Learn complete prayer steps: Wudu, Azan, Takbeer, Ruku, Sujood, Tashahhud',
      'Incorporate morning and evening protective Azkar (Hisn al-Muslim)'
    ],
    syllabusTopics: [
      'Module 1: Daily Routine Duas (Sleep, Morning, Eating, Dressing, Travel)',
      'Module 2: Complete Salah Step-by-Step with meaning and posture rules',
      'Module 3: 40 Rabbana Duas from the Holy Quran',
      'Module 4: Morning & Evening Protection Duas (Ayat al-Kursi, 3 Quls)',
      'Module 5: Etiquette of making Dua and answering calls to prayer'
    ],
    image: '/src/assets/images/course_noorani_qaida_1794166130110.jpg'
  },
  {
    id: 'islamic-studies',
    title: 'Islamic Studies & Character Building',
    arabicTitle: 'اسلامیات و تربیت',
    category: 'islamic',
    shortDesc: 'Holistic Islamic education covering Pillars of Islam, Seerah of the Prophet ﷺ, Stories of the Prophets, and noble moral character (Akhlaq).',
    fullDesc: 'Equip your children with sound Islamic identity and moral excellence in a modern world. This interactive course covers the Five Pillars of Islam, Six Articles of Faith, inspiring biographical stories of Prophet Muhammad ﷺ and previous prophets, basic Fiqh of Taharah and Halal/Haram, and core values of honesty, kindness to parents, respect for elders, and charity. Taught with engaging storytelling and age-appropriate discussions.',
    duration: '4 to 6 Months',
    ageGroup: 'Youth & Children',
    keyOutcomes: [
      'Comprehensive understanding of Tawheed, Prophethood, and Akhirah',
      'Deep love for the Prophet Muhammad ﷺ through inspiring Seerah narratives',
      'Practical understanding of Halal, Haram, cleanliness, and honest conduct',
      'Strong moral foundation, Islamic identity, and empathy'
    ],
    syllabusTopics: [
      'Pillars of Iman and Islam (Shahadah, Salah, Zakat, Sawm, Hajj)',
      'The Blessed Life of Prophet Muhammad ﷺ (Makkan & Madinan periods)',
      'Stories of Prophets (Adam, Nuh, Ibrahim, Musa, Isa - peace be upon them)',
      'Islamic Manners (Adab): Respecting parents, honesty, speech etiquette',
      'Contemporary questions & building Islamic resilience for youth'
    ],
    image: '/src/assets/images/academy_online_classroom_1794166130612.jpg'
  }
];
