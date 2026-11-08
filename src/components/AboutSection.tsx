import React from 'react';
import { Users, Clock, BookOpen, Award, CheckCircle2, ShieldCheck, Globe2, Sparkles, MessageCircle } from 'lucide-react';

interface AboutSectionProps {
  onEnrollClick: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onEnrollClick }) => {
  return (
    <section id="about" className="py-20 sm:py-24 bg-neutral-950 relative overflow-hidden border-t border-amber-500/20">
      {/* Decorative Subtle Background Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-xs font-bold uppercase tracking-wider text-amber-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="italic font-bold">Excellence in Islamic Education</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black italic text-white tracking-tight font-serif">
            About <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">Al Huda Quran Academy</span>
          </h2>

          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-light">
            A premier international online Quran academy empowering families, children, and adults worldwide to connect with the divine words of Allah through authentic, personalized, and compassionate mentorship.
          </p>
        </div>

        {/* 2-Column Story / Narrative with Academy Photo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Visual Showcase with Academy Online Classroom Photo */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border-2 border-amber-500/30 shadow-[0_0_30px_rgba(217,119,6,0.15)] bg-neutral-900 group">
              <img
                src="/src/assets/images/academy_online_classroom_1794166130612.jpg"
                alt="Al Huda Online Quran Academy Classroom Environment"
                className="w-full h-[400px] sm:h-[480px] object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              
              {/* Overlay Gradient for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

              {/* Inset Badge */}
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold italic text-amber-400">
                  <Globe2 className="w-4 h-4" />
                  <span>Serving Students Worldwide: UK, USA, Canada, Australia & Gulf</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black italic text-white font-serif">Personalized 1-on-1 Online Classrooms</h3>
                <p className="text-xs sm:text-sm text-neutral-300">
                  Real-time video & audio guidance with interactive digital screen sharing and pronunciation drills.
                </p>
              </div>

              {/* Floating Quality Seal */}
              <div className="absolute top-4 left-4 bg-black/85 backdrop-blur-md px-4 py-2 rounded-full border border-amber-400/40 shadow-xl flex items-center gap-2.5">
                <img src="/logo.png" alt="Logo" className="w-6 h-6 rounded-full border border-amber-400/60 object-cover" />
                <span className="text-xs font-bold text-amber-300 italic">Al Huda Academy</span>
              </div>
            </div>
          </div>

          {/* Narrative Content & Highlights */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-4 text-neutral-200 leading-relaxed">
              <p className="text-base sm:text-lg">
                At <strong className="text-amber-400 font-bold italic">Al Huda Quran Academy</strong>, we believe every Muslim deserves the opportunity to recite the Holy Quran with correct Tajweed, deep understanding, and heartfelt spiritual connection—no matter where they live.
              </p>
              <p className="text-sm sm:text-base text-neutral-400">
                Whether starting from the fundamental Arabic alphabet with <em className="text-amber-300">Noorani Qaida</em>, developing fluent recitation (<em className="text-amber-300">Nazra Quran</em>), perfecting advanced <em className="text-amber-300">Tajweed</em> rules, or embarking on the noble journey of <em className="text-amber-300">Hifz-ul-Quran</em>, our structured methodology is designed for steady progress without overwhelm.
              </p>
            </div>

            {/* Core Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-neutral-900/90 border border-amber-500/20 hover:border-amber-400/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(217,119,6,0.15)]">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center mb-3">
                  <Users className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold italic text-white mb-1">One-to-One & Group Learning</h4>
                <p className="text-xs text-neutral-400 leading-normal">
                  Dedicated 100% personalized attention for children and sisters, plus small engaging groups for collaborative learning.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-900/90 border border-amber-500/20 hover:border-amber-400/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(217,119,6,0.15)]">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center mb-3">
                  <Clock className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold italic text-white mb-1">Flexible 24/7 Class Timings</h4>
                <p className="text-xs text-neutral-400 leading-normal">
                  Custom schedule tailored to your family's timezone across morning, afternoon, evening, and night slots.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-900/90 border border-amber-500/20 hover:border-amber-400/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(217,119,6,0.15)]">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center mb-3">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold italic text-white mb-1">Noorani Qaida to Tajweed</h4>
                <p className="text-xs text-neutral-400 leading-normal">
                  Proven progressive curriculum starting from zero letter articulation up to classical Qira'at rules.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-900/90 border border-amber-500/20 hover:border-amber-400/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(217,119,6,0.15)]">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center mb-3">
                  <Award className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold italic text-white mb-1">Welcoming for Kids & Adults</h4>
                <p className="text-xs text-neutral-400 leading-normal">
                  Patient, encouraging environment free of harsh criticism, designed to build lifelong love for the Quran.
                </p>
              </div>
            </div>

            {/* Quick Action CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onEnrollClick}
                className="px-6 py-3 rounded-xl font-bold italic text-black bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-[0_0_20px_rgba(217,119,6,0.3)] transition-all cursor-pointer"
              >
                Join Free Trial Class
              </button>

              <a
                href="https://wa.me/923299866560?text=Assalam%20o%20Alaikum!%20I%20would%20like%20to%20know%20more%20about%20Al%20Huda%20Quran%20Academy."
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl font-bold italic text-white bg-[#25D366] hover:bg-[#20ba59] shadow-[0_0_20px_rgba(37,211,102,0.3)] flex items-center gap-2 transition-all"
              >
                <MessageCircle className="w-4 h-4 text-white fill-white" />
                <span>Talk on WhatsApp</span>
              </a>
            </div>

          </div>

        </div>

        {/* 4-Column Stat / Trust Banner */}
        <div className="rounded-3xl bg-gradient-to-br from-neutral-900 via-black to-neutral-900 border-2 border-amber-500/30 p-8 sm:p-10 text-white shadow-[0_0_40px_rgba(0,0,0,0.8)] relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:20px_20px] opacity-10 pointer-events-none" />

          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-amber-500/20">
            <div className="space-y-1 pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-black italic font-serif text-amber-400">100%</div>
              <p className="text-xs sm:text-sm text-neutral-200 font-bold italic">Qualified Quran Tutors</p>
              <p className="text-[11px] text-amber-300/80">Sanad & Ijazah Certified</p>
            </div>

            <div className="space-y-1 pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-black italic font-serif text-amber-400">1-on-1</div>
              <p className="text-xs sm:text-sm text-neutral-200 font-bold italic">Private Focused Class</p>
              <p className="text-[11px] text-amber-300/80">Dedicated Individual Pace</p>
            </div>

            <div className="space-y-1 pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-black italic font-serif text-amber-400">3-Day</div>
              <p className="text-xs sm:text-sm text-neutral-200 font-bold italic">Risk-Free Trial Class</p>
              <p className="text-[11px] text-amber-300/80">Experience Before Enrolling</p>
            </div>

            <div className="space-y-1 pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-black italic font-serif text-amber-400">24 / 7</div>
              <p className="text-xs sm:text-sm text-neutral-200 font-bold italic">Global Timezones</p>
              <p className="text-[11px] text-amber-300/80">UK, USA, Gulf & Worldwide</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
