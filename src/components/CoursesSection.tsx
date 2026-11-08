import React, { useState } from 'react';
import { COURSES } from '../data/coursesData';
import { Course } from '../types';
import { BookOpen, Check, Clock, Users, ArrowRight, Sparkles, X, MessageCircle, GraduationCap } from 'lucide-react';

interface CoursesSectionProps {
  onSelectCourseForAdmission: (courseTitle: string) => void;
}

export const CoursesSection: React.FC<CoursesSectionProps> = ({
  onSelectCourseForAdmission
}) => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Courses' },
    { id: 'beginner', label: 'Noorani Qaida' },
    { id: 'tajweed', label: 'Tajweed & Reading' },
    { id: 'hifz', label: 'Hifz-ul-Quran' },
    { id: 'supplication', label: 'Duain & Islamic' }
  ];

  const filteredCourses = activeCategory === 'all'
    ? COURSES
    : COURSES.filter(c => {
        if (activeCategory === 'beginner') return c.category === 'beginner';
        if (activeCategory === 'tajweed') return c.category === 'tajweed' || c.category === 'reading';
        if (activeCategory === 'hifz') return c.category === 'hifz';
        if (activeCategory === 'supplication') return c.category === 'supplication' || c.category === 'islamic';
        return true;
      });

  const handleEnrollCourse = (course: Course) => {
    setSelectedCourse(null);
    onSelectCourseForAdmission(course.title);
  };

  return (
    <section id="courses" className="py-20 sm:py-24 bg-black relative border-t border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-400/30 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span className="italic">Structured Islamic Curriculum</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black italic text-white tracking-tight font-serif">
            Our Certified <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">Quran & Islamic Courses</span>
          </h2>

          <p className="text-base sm:text-lg text-neutral-300 font-light">
            Choose from comprehensive courses tailored for young children, sisters, and adult learners worldwide with individual 1-on-1 pacing.
          </p>

          {/* Interactive Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs sm:text-sm font-bold italic rounded-xl transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-black shadow-[0_0_20px_rgba(217,119,6,0.3)]'
                    : 'bg-neutral-900 text-neutral-300 hover:text-white hover:bg-neutral-800 border border-amber-500/20'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="rounded-3xl bg-neutral-950 border-2 border-amber-500/20 hover:border-amber-400 shadow-[0_0_25px_rgba(0,0,0,0.8)] hover:shadow-[0_0_35px_rgba(217,119,6,0.25)] transition-all duration-300 flex flex-col overflow-hidden group"
            >
              {/* Image Container with Fallback */}
              <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-neutral-900">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                {/* Arabic Calligraphy Header overlay */}
                <div className="absolute top-4 right-4 bg-black/85 backdrop-blur-md px-3.5 py-1 rounded-full border border-amber-400/50 shadow-md">
                  <span className="font-amiri text-base font-bold text-amber-300" dir="rtl">
                    {course.arabicTitle}
                  </span>
                </div>

                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-0.5 italic">
                    {course.ageGroup}
                  </div>
                  <h3 className="text-xl font-black italic font-serif leading-tight text-white drop-shadow-md">
                    {course.title}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-5 bg-neutral-950">
                <div className="space-y-4">
                  <p className="text-sm text-neutral-300 leading-relaxed line-clamp-3">
                    {course.shortDesc}
                  </p>

                  {/* Highlights list */}
                  <div className="space-y-2 pt-1 border-t border-neutral-800">
                    {course.keyOutcomes.slice(0, 2).map((outcome, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-neutral-300">
                        <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{outcome}</span>
                      </div>
                    ))}
                  </div>

                  {/* Metadata Row */}
                  <div className="flex items-center justify-between text-xs text-neutral-400 pt-2 border-t border-neutral-800">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>{course.duration}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-emerald-400" />
                      <span>1-on-1 Personalized</span>
                    </span>
                  </div>
                </div>

                {/* Card Action Buttons: Learn More & Admission */}
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    onClick={() => setSelectedCourse(course)}
                    className="py-2.5 px-3 rounded-xl text-xs font-bold italic text-neutral-200 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-amber-500/30 transition-all text-center cursor-pointer"
                  >
                    Learn More
                  </button>

                  <button
                    onClick={() => handleEnrollCourse(course)}
                    className="py-2.5 px-3 rounded-xl text-xs font-bold italic text-black bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-sm transition-all text-center flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>Admission</span>
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Comprehensive Course Details Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-neutral-950 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-amber-500/40 relative text-white">
            
            {/* Modal Header */}
            <div className="relative h-48 sm:h-56 bg-black overflow-hidden">
              <img
                src={selectedCourse.image}
                alt={selectedCourse.title}
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
              
              <button
                onClick={() => setSelectedCourse(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-neutral-800 border border-amber-500/40 text-amber-300 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-5 left-6 right-6 text-white">
                <span className="font-amiri text-2xl text-amber-400 font-bold block mb-1" dir="rtl">
                  {selectedCourse.arabicTitle}
                </span>
                <h3 className="text-2xl font-black italic font-serif text-white">{selectedCourse.title}</h3>
                <p className="text-xs text-amber-300/80">Duration: {selectedCourse.duration} · For: {selectedCourse.ageGroup}</p>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2 italic">
                  Course Overview
                </h4>
                <p className="text-sm text-neutral-300 leading-relaxed font-light">
                  {selectedCourse.fullDesc}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2 italic">
                  Key Learning Outcomes
                </h4>
                <div className="space-y-2">
                  {selectedCourse.keyOutcomes.map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300">
                      <div className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2 italic">
                  Curriculum & Syllabus Highlights
                </h4>
                <div className="space-y-2">
                  {selectedCourse.syllabusTopics.map((topic, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-neutral-900 border border-amber-500/20 text-xs text-neutral-300 font-medium">
                      {topic}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons in Modal */}
              <div className="pt-4 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-3">
                <a
                  href={`https://wa.me/923299866560?text=${encodeURIComponent(`Assalam o Alaikum! I want to inquire about the ${selectedCourse.title} course at Al Huda Quran Academy.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl text-xs font-bold italic text-white bg-[#25D366] hover:bg-[#20ba59] shadow-[0_0_15px_rgba(37,211,102,0.3)] flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-white fill-white" />
                  <span>Inquire on WhatsApp</span>
                </a>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedCourse(null)}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold text-neutral-400 hover:text-white cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => handleEnrollCourse(selectedCourse)}
                    className="px-6 py-2.5 rounded-xl text-xs font-bold italic text-black bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-[0_0_20px_rgba(217,119,6,0.3)] cursor-pointer flex items-center gap-1.5"
                  >
                    <GraduationCap className="w-4 h-4" />
                    <span>Proceed to Admission</span>
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
};
