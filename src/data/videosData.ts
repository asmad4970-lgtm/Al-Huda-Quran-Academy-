import { VideoItem } from '../types';

export const INITIAL_VIDEOS: VideoItem[] = [
  {
    id: 'vid-1',
    title: 'Surah Al-Mulk Beautiful Tajweed Recitation',
    category: 'recitation',
    duration: '04:15',
    thumbnail: '/src/assets/images/course_quran_reading_1794166129477.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    description: 'Listen to a measured, heart-soothing recitation demonstrating precise Tajweed rules, Madd elongation, and respectful Waqf stops.'
  },
  {
    id: 'vid-2',
    title: 'Noorani Qaida Lesson 1: Pronouncing Arabic Alphabet',
    category: 'qaida',
    duration: '06:30',
    thumbnail: '/src/assets/images/course_noorani_qaida_1794166130110.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    description: 'A step-by-step beginner demonstration teaching young children how to pronounce individual letters from their accurate vocal organs.'
  },
  {
    id: 'vid-3',
    title: 'Live 1-on-1 Online Quran Classroom Demonstration',
    category: 'demo',
    duration: '05:12',
    thumbnail: '/src/assets/images/academy_online_classroom_1794166130612.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    description: 'An exclusive walkthrough showing how our live interactive screen-sharing, digital pen, and audio feedback work during real lessons.'
  },
  {
    id: 'vid-4',
    title: 'Mastering the Rules of Noon Sakin & Tanween (Tajweed)',
    category: 'tajweed',
    duration: '07:45',
    thumbnail: '/src/assets/images/teacher_male_mentor_1794166131536.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    description: 'In-depth explanation with live examples of Izhar, Ikhfa, Idgham, and Iqlab for intermediate students seeking Tajweed perfection.'
  }
];
