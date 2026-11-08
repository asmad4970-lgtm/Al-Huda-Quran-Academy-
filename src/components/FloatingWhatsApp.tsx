import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  const defaultMsg = encodeURIComponent("Assalam o Alaikum! I would like to inquire about Al Huda Quran Academy classes.");

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-auto">
      
      {/* Quick Greeting Bubble */}
      {showTooltip && (
        <div className="mb-3 w-72 sm:w-80 rounded-2xl bg-neutral-950 border-2 border-amber-500/40 shadow-[0_0_30px_rgba(0,0,0,0.9)] p-4 text-white animate-in slide-in-from-bottom-2 duration-200 relative">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-2.5 right-2.5 p-1 rounded-full text-neutral-400 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2.5 pb-2 border-b border-neutral-800">
            <div className="relative">
              <img src="/logo.png" alt="Logo" className="w-8 h-8 rounded-full border border-amber-400 bg-black object-cover" />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#25D366] rounded-full border-2 border-black" />
            </div>
            <div>
              <p className="text-xs font-black italic font-serif text-white">Al Huda Quran Academy</p>
              <p className="text-[10px] text-amber-300 font-medium">Online · Typically replies in minutes</p>
            </div>
          </div>

          <div className="py-2.5 text-xs text-neutral-300 leading-relaxed font-light">
            <p className="font-amiri text-base text-amber-300 font-bold mb-1" dir="rtl">
              السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ
            </p>
            <p>Welcome! How can we help you or your child with Quran learning today?</p>
          </div>

          <div className="space-y-1.5 pt-1">
            <a
              href={`https://wa.me/923299866560?text=${encodeURIComponent('Assalam o Alaikum! I want to book a 3-Day Free Trial Class.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-left p-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-amber-500/30 text-[11px] font-bold italic text-amber-300 flex items-center justify-between transition-colors"
            >
              <span>Book 3-Day Free Trial Class</span>
              <Send className="w-3 h-3 text-amber-400" />
            </a>

            <a
              href={`https://wa.me/923299866560?text=${encodeURIComponent('Assalam o Alaikum! I would like to inquire about course fee and timings.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-left p-2.5 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/40 text-[11px] font-bold italic text-emerald-300 flex items-center justify-between transition-colors"
            >
              <span>Inquire About Monthly Fees & Timings</span>
              <Send className="w-3 h-3 text-[#25D366]" />
            </a>
          </div>
        </div>
      )}

      {/* Main Floating Button */}
      <div className="relative group">
        
        {/* Pulsating Ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-40 group-hover:opacity-75 blur-xs animate-ping duration-1000 pointer-events-none" />

        <a
          href={`https://wa.me/923299866560?text=${defaultMsg}`}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setShowTooltip(true)}
          className="relative flex items-center gap-2.5 px-4 py-3 sm:py-3.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-2xl shadow-[#25D366]/40 hover:scale-105 transition-all duration-300 cursor-pointer"
          title="Direct WhatsApp: +92 329 9866560"
        >
          {/* WhatsApp Icon */}
          <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <MessageCircle className="w-5 h-5 text-white fill-white" />
          </div>

          <div className="hidden sm:block text-left pr-1">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-100 block leading-none">
              Chat on WhatsApp
            </span>
            <span className="text-xs font-bold font-mono tracking-tight text-white block mt-0.5">
              +92 329 9866560
            </span>
          </div>

          <span className="sm:hidden font-bold text-xs">WhatsApp</span>
        </a>

      </div>

    </div>
  );
};
