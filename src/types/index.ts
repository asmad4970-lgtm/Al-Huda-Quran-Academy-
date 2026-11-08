export interface Course {
  id: string;
  title: string;
  arabicTitle: string;
  category: 'beginner' | 'reading' | 'tajweed' | 'hifz' | 'supplication' | 'islamic';
  shortDesc: string;
  fullDesc: string;
  duration: string;
  ageGroup: string;
  keyOutcomes: string[];
  syllabusTopics: string[];
  image: string;
  featured?: boolean;
}

export interface Teacher {
  id: string;
  name: string;
  role: string;
  gender: 'male' | 'female';
  experience: string;
  qualifications: string;
  specialties: string[];
  bio: string;
  image: string;
  languages: string[];
}

export interface AdmissionFormData {
  studentName: string;
  parentName: string;
  whatsappNumber: string;
  email: string;
  country: string;
  studentAge: string;
  gender: 'Male' | 'Female' | '';
  course: string;
  classType: 'One-to-One Class' | 'Group Class' | '';
  preferredTiming: 'Morning' | 'Afternoon' | 'Evening' | 'Night' | '';
  weeklyDays: '2 Days' | '3 Days' | '4 Days' | '5 Days' | '6 Days' | '7 Days' | '';
  selectedDays: string[];
  additionalMessage: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'classroom' | 'quran' | 'activities' | 'students';
  image: string;
  description: string;
  uploadedAt?: string;
  isCustom?: boolean;
}

export interface VideoItem {
  id: string;
  title: string;
  category: 'recitation' | 'tajweed' | 'qaida' | 'demo';
  duration: string;
  thumbnail: string;
  videoUrl: string;
  description: string;
  isCustom?: boolean;
}
