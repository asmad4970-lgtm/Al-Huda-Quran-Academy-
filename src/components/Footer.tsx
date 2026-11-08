import React from 'react';
import { MessageCircle, Mail, Globe, ArrowUp, Send, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

interface FooterProps {
  facebookUrl: string;
  onNavigate: (sectionId: string) => void;
  onCourseClick: (courseTitle: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  facebookUrl,
  onNavigate,
  onCourseClick
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black text-white relative overflow-hidden pt-20 pb-12 border-t-2 border-white/20 selection:bg-white selection:text-black">
      {/* Subtle Monochrome Geometric Grid Lines */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Prominent Black & White + WhatsApp Callout Strip */}
        <div className="mb-16 p-6 sm:p-10 rounded-3xl bg-neutral-950 border border-white/20 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold italic uppercase tracking-wider text-white">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Direct WhatsApp Admissions & Inquiries</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold italic text-white font-cinzel tracking-wide">
              Connect With Academy On WhatsApp
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-xl font-normal">
              Get immediate answers regarding fee structure, flexible timings, child curriculum, and schedule your <strong>3-Day Free Trial Class</strong> within minutes.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto shrink-0">
            <a
              href="https://wa.me/923299866560?text=Assalam%20o%20Alaikum!%20I%20want%20to%20enroll%20in%20Al%20Huda%20Quran%20Academy."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-4 rounded-2xl font-extrabold italic text-sm text-white bg-[#25D366] hover:bg-[#20bd5a] shadow-xl shadow-[#25D366]/30 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer"
            >
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <MessageCircle className="w-4 h-4 text-white fill-white" />
              </div>
              <span className="tracking-wide">Chat on WhatsApp: +92 329 9866560</span>
            </a>

            <button
              onClick={() => onNavigate('admission')}
              className="w-full sm:w-auto px-5 py-4 rounded-2xl font-bold italic text-sm text-black bg-white hover:bg-neutral-200 transition-colors cursor-pointer text-center"
            >
              Online Admission Form
            </button>
          </div>
        </div>

        {/* Top Quranic Blessing Banner with Bold Italic Header */}
        <div className="text-center pb-12 border-b border-white/15 max-w-3xl mx-auto space-y-3">
          <p className="font-amiri text-2xl sm:text-3xl text-white font-bold tracking-wide" dir="rtl">
            رَبَّنَا تَقَبَّلْ مِنَّا ۖ إِنَّكَ أَنتَ السَّمِيعُ الْعَلِيمُ
          </p>
          <p className="text-xs sm:text-sm text-neutral-300 italic font-medium">
            “Our Lord! Accept from us: for You are the All-Hearing, the All-Knowing.” — (Surah Al-Baqarah 2:127)
          </p>
        </div>

        {/* 4-Column Footer Navigation with Bold Italic White Headers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 py-14">
          
          {/* Col 1: Brand & Bio (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3.5">
              <img
                src="/logo.png"
                alt="Al Huda Quran Academy Logo"
                className="w-14 h-14 rounded-full border-2 border-white p-0.5 bg-white shrink-0 shadow-lg"
              />
              <div>
                <h3 className="font-cinzel text-xl font-extrabold italic text-white tracking-wider leading-tight">
                  AL HUDA
                </h3>
                <p className="text-xs font-bold italic uppercase tracking-widest text-neutral-300">
                  Online Quran Academy
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal">
              An international online Quran academy providing authentic Tajweed, Noorani Qaida, Hifz, and Islamic education to children and adults globally with dedicated male and female certified scholars.
            </p>

            <div className="pt-2 flex items-center gap-3">
              {/* WhatsApp direct */}
              <a
                href="https://wa.me/923299866560"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center transition-transform hover:scale-110 shadow-lg"
                title="WhatsApp Direct: +92 329 9866560"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
              </a>

              {/* Email direct */}
              <a
                href="mailto:asmad4970@gmail.com"
                className="w-10 h-10 rounded-xl bg-white hover:bg-neutral-200 text-black flex items-center justify-center transition-transform hover:scale-110 shadow-lg"
                title="Email Us: asmad4970@gmail.com"
              >
                <Mail className="w-5 h-5" />
              </a>

              {/* Facebook direct */}
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-neutral-900 border border-white/20 hover:border-white text-white flex items-center justify-center transition-transform hover:scale-110 shadow-lg"
                title="Official Facebook Page"
              >
                <Globe className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links with Bold Italic White Header (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs sm:text-sm font-extrabold italic uppercase tracking-wider text-white border-b border-white/20 pb-2">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-medium">
              <li>
                <button onClick={() => onNavigate('home')} className="text-neutral-400 hover:text-white hover:italic transition-colors cursor-pointer text-left">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="text-neutral-400 hover:text-white hover:italic transition-colors cursor-pointer text-left">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('courses')} className="text-neutral-400 hover:text-white hover:italic transition-colors cursor-pointer text-left">
                  Our Courses
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('teachers')} className="text-neutral-400 hover:text-white hover:italic transition-colors cursor-pointer text-left">
                  Our Teachers
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('gallery')} className="text-neutral-400 hover:text-white hover:italic transition-colors cursor-pointer text-left">
                  Academy Gallery
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('videos')} className="text-neutral-400 hover:text-white hover:italic transition-colors cursor-pointer text-left">
                  Video Lessons
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('admission')} className="text-neutral-400 hover:text-white hover:italic transition-colors cursor-pointer text-left">
                  Admission Form
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="text-neutral-400 hover:text-white hover:italic transition-colors cursor-pointer text-left">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Courses with Bold Italic White Header (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs sm:text-sm font-extrabold italic uppercase tracking-wider text-white border-b border-white/20 pb-2">
              Our Courses
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-medium">
              <li>
                <button onClick={() => onCourseClick('Noorani Qaida')} className="text-neutral-400 hover:text-white hover:italic transition-colors cursor-pointer text-left block">
                  Noorani Qaida (نورانی قاعدہ)
                </button>
              </li>
              <li>
                <button onClick={() => onCourseClick('Quran Reading (Nazra)')} className="text-neutral-400 hover:text-white hover:italic transition-colors cursor-pointer text-left block">
                  Quran Reading (ناظرہ قرآن)
                </button>
              </li>
              <li>
                <button onClick={() => onCourseClick('Quran with Tajweed')} className="text-neutral-400 hover:text-white hover:italic transition-colors cursor-pointer text-left block">
                  Quran with Tajweed (تجوید قرآن)
                </button>
              </li>
              <li>
                <button onClick={() => onCourseClick('Hifz-ul-Quran (Memorization)')} className="text-neutral-400 hover:text-white hover:italic transition-colors cursor-pointer text-left block">
                  Hifz-ul-Quran (حفظ القرآن)
                </button>
              </li>
              <li>
                <button onClick={() => onCourseClick('Masnoon Duain & Daily Prayers')} className="text-neutral-400 hover:text-white hover:italic transition-colors cursor-pointer text-left block">
                  Masnoon Duain (مسنون دعائیں)
                </button>
              </li>
              <li>
                <button onClick={() => onCourseClick('Islamic Studies & Character Building')} className="text-neutral-400 hover:text-white hover:italic transition-colors cursor-pointer text-left block">
                  Islamic Studies (اسلامیات)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Academy Info with Bold Italic White Header (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs sm:text-sm font-extrabold italic uppercase tracking-wider text-white border-b border-white/20 pb-2">
              Contact & Support
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-neutral-300">
              <p className="flex items-start gap-2.5">
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0 mt-0.5 fill-[#25D366]" />
                <span>
                  WhatsApp: <a href="https://wa.me/923299866560" target="_blank" rel="noopener noreferrer" className="text-white font-bold hover:underline font-mono">+92 329 9866560</a>
                </span>
              </p>
              <p className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <span className="break-all">
                  Email: <a href="mailto:asmad4970@gmail.com" className="text-white hover:underline">asmad4970@gmail.com</a>
                </span>
              </p>
              <p className="flex items-start gap-2.5">
                <Globe className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <span className="break-all">
                  Facebook: <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:underline">Official Academy Page</a>
                </span>
              </p>
              <div className="p-3.5 rounded-2xl bg-neutral-900 border border-white/15 text-xs text-neutral-400 mt-3">
                <p className="font-semibold text-white mb-1">Global 24/7 Availability</p>
                <p>One-on-One classes scheduled at times convenient for UK, USA, Canada, Australia, UAE & worldwide.</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <p className="font-medium">
            © {new Date().getFullYear()} <strong className="text-white font-bold italic">AL HUDA QURAN ACADEMY</strong>. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-white/15 text-white transition-colors cursor-pointer"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span className="font-bold italic">Back to top</span>
          </button>
        </div>

      </div>
    </footer>
  );
};

