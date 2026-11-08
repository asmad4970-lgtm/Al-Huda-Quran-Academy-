import { Teacher } from '../types';

export const INITIAL_TEACHERS: Teacher[] = [
  {
    id: 'teacher-1',
    name: 'Qari Muhammad Bilal',
    role: 'Senior Tajweed & Qira’at Instructor',
    gender: 'male',
    experience: '8+ Years Online Teaching',
    qualifications: 'Certified Qari (Ijazah in Hafs ‘an ‘Asim), Wifaq-ul-Madaris Al-Arabiyyah Graduate',
    specialties: ['Tajweed Rules (Makharij & Sifaat)', 'Tarteel & Melodious Recitation', 'Adults & Advanced Reciters'],
    bio: 'Dedicated Islamic scholar with over 8 years of international online teaching experience. Specializes in helping students overcome pronunciation barriers and recite with calm, measured reverence.',
    image: '/src/assets/images/teacher_male_mentor_1794166131536.jpg',
    languages: ['English', 'Urdu', 'Arabic']
  },
  {
    id: 'teacher-2',
    name: 'Ustadha Fatima Zahra',
    role: 'Lead Female Quran & Noorani Qaida Tutor',
    gender: 'female',
    experience: '6+ Years Online Experience',
    qualifications: 'Alimah Degree & Certified Tajweed Instructor, Specialist in Child Pedagogy',
    specialties: ['Noorani Qaida for Kids', 'Female Students & Sisters Classes', 'Patient & Encouraging Method'],
    bio: 'Specialized in gentle, interactive teaching for young children and female students worldwide. Creates an encouraging, joyful classroom atmosphere where children look forward to every lesson.',
    image: '/src/assets/images/teacher_female_mentor_1794166131086.jpg',
    languages: ['English', 'Urdu', 'Basic Arabic']
  },
  {
    id: 'teacher-3',
    name: 'Hafiz Abdullah Tariq',
    role: 'Hifz-ul-Quran & Revision Mentor',
    gender: 'male',
    experience: '7+ Years Online Mentorship',
    qualifications: 'Hafiz-ul-Quran (Sanad-e-Hifz), Certified in Quranic Memorization Pedagogy',
    specialties: ['Systematic Sabaq / Sabqi / Manzil Routine', 'Mental Retention Techniques', 'Youth Mentorship'],
    bio: 'Guides aspiring Huffaz with structured daily benchmarks and compassionate discipline. Experienced in mentoring students residing in the UK, USA, Australia, and Gulf regions.',
    image: '/src/assets/images/teacher_male_mentor_1794166131536.jpg',
    languages: ['English', 'Urdu']
  },
  {
    id: 'teacher-4',
    name: 'Ustadha Maryam Siddiqui',
    role: 'Islamic Studies & Masnoon Duain Educator',
    gender: 'female',
    experience: '5+ Years Teaching Experience',
    qualifications: 'MA in Islamic Studies, Certified Child Islamic Curriculum Specialist',
    specialties: ['Daily Sunnah Duas & Salah Correction', 'Seerah & Prophetic Stories for Youth', 'Interactive Visual Slides'],
    bio: 'Passionate about nurturing love for Allah and His Messenger ﷺ in the hearts of children. Uses engaging storytelling, visual slides, and practical Sunnah habits.',
    image: '/src/assets/images/teacher_female_mentor_1794166131086.jpg',
    languages: ['English', 'Urdu']
  }
];
