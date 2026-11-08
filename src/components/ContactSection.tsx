import React, { useState } from 'react';
import { saveInquiry } from '../lib/supabase';
import { Phone, Mail, MessageCircle, Send, CheckCircle2, Globe, Clock, MapPin, Edit3, X, ExternalLink, Sparkles } from 'lucide-react';

interface ContactSectionProps {
  facebookUrl: string;
  onUpdateFacebookUrl: (newUrl: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  facebookUrl,
  onUpdateFacebookUrl
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [isEditingFb, setIsEditingFb] = useState(false);
  const [tempFbUrl, setTempFbUrl] = useState(facebookUrl);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;

    // Save inquiry to Supabase & local DB
    saveInquiry({ name, email, phone, message });

    // Build WhatsApp message for direct inquiry
    const inquiryText = encodeURIComponent(
`*AL HUDA QURAN ACADEMY — GENERAL INQUIRY*
━━━━━━━━━━━━━━━━━━━━━━
👤 *Name:* ${name}
📱 *Phone:* ${phone || 'Not provided'}
✉️ *Email:* ${email || 'Not provided'}
💬 *Message:*
${message}
━━━━━━━━━━━━━━━━━━━━━━`
    );

    window.open(`https://wa.me/923299866560?text=${inquiryText}`, '_blank');
    setSent(true);
  };

  const handleSaveFb = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempFbUrl.trim()) {
      onUpdateFacebookUrl(tempFbUrl.trim());
      setIsEditingFb(false);
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-24 bg-neutral-950 text-white relative border-t border-amber-400/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-xs font-bold italic uppercase tracking-wider text-amber-300">
            <MessageCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>24/7 Global Student Support</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold italic text-white tracking-tight font-cinzel">
            Contact Al Huda Quran Academy
          </h2>

          <p className="text-base sm:text-lg text-neutral-300 font-normal">
            Have questions about courses, class timings, or custom learning plans? Connect directly with our academy administration via WhatsApp or send an inquiry.
          </p>
        </div>

        {/* 2-Column Contact Info & Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Contact Details Card */}
          <div className="lg:col-span-5 rounded-3xl bg-slate-900 text-white p-6 sm:p-8 shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 islamic-pattern-dark opacity-35 pointer-events-none" />

            <div className="relative z-10 space-y-6">
              
              {/* Brand Header */}
              <div className="flex items-center gap-3 pb-6 border-b border-white/10">
                <img
                  src="/logo.png"
                  alt="Al Huda Logo"
                  className="w-14 h-14 rounded-full border border-amber-300 p-0.5 bg-white shrink-0"
                />
                <div>
                  <h3 className="font-cinzel text-lg font-bold text-amber-300">AL HUDA</h3>
                  <p className="text-xs uppercase tracking-widest text-slate-300 font-medium">Quran Academy</p>
                </div>
              </div>

              {/* Direct Channels */}
              <div className="space-y-4">
                
                {/* WhatsApp */}
                <a
                  href="https://wa.me/923299866560"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 transition-all group"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-lg group-hover:scale-105 transition-transform">
                    <MessageCircle className="w-6 h-6 fill-white text-white" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-[#25D366] uppercase tracking-wider block">Official WhatsApp (Direct Chat)</span>
                    <span className="text-base font-extrabold italic text-white group-hover:text-emerald-300 transition-colors font-mono">+92 329 9866560</span>
                    <p className="text-[11px] text-neutral-300">Instant response · Voice notes, video calls & questions</p>
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:asmad4970@gmail.com"
                  className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-md">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">Official Email</span>
                    <span className="text-sm font-semibold text-white group-hover:text-amber-200 transition-colors break-all">asmad4970@gmail.com</span>
                    <p className="text-[11px] text-slate-400">Admissions, evaluations & parent support</p>
                  </div>
                </a>

                {/* Facebook Page (Editable as requested) */}
                <div className="flex items-start justify-between gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md">
                      <Globe className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider block">Facebook Page</span>
                      <a
                        href={facebookUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-white hover:text-blue-300 underline flex items-center gap-1 mt-0.5"
                      >
                        <span>Official Academy Page</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <p className="text-[10px] text-slate-400 truncate max-w-[190px]">{facebookUrl}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setTempFbUrl(facebookUrl);
                      setIsEditingFb(true);
                    }}
                    title="Edit Facebook Page Link"
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>

              </div>

              {/* Working Hours & Availability */}
              <div className="pt-4 border-t border-white/10 space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Classes Available 24 Hours / 7 Days a Week</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Serving Students Worldwide across All Time Zones</span>
                </div>
              </div>

            </div>
          </div>

          {/* Contact Inquiry Form in Black & Gold */}
          <div className="lg:col-span-7 rounded-3xl bg-black border border-amber-400/30 p-6 sm:p-8 shadow-2xl">
            <h3 className="text-xl font-bold italic text-white font-cinzel mb-2">Send an Inquiry</h3>
            <p className="text-xs sm:text-sm text-neutral-400 mb-6">
              Fill out this form and our student coordinator will get back to you promptly. Auto-synced to database.
            </p>

            {sent ? (
              <div className="p-6 rounded-2xl bg-neutral-900 border border-amber-400/40 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-amber-400 mx-auto" />
                <h4 className="text-base font-bold text-white font-cinzel italic">Message Saved & Ready on WhatsApp!</h4>
                <p className="text-xs text-neutral-300">
                  Thank you for reaching out. Your inquiry has been saved in our academy database and prepared for WhatsApp: <strong className="text-white">+92 329 9866560</strong>.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold italic bg-amber-400 text-black cursor-pointer shadow-md"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Brother Farhan"
                    className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-neutral-900 text-white text-sm focus:border-amber-400 focus:outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. farhan@gmail.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-neutral-900 text-white text-sm focus:border-amber-400 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">WhatsApp / Phone Number</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+92 300 0000000"
                      className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-neutral-900 text-white text-sm focus:border-amber-400 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Your Message / Question *</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what you'd like to ask (e.g. course fees, available evening slots for kids, trial class confirmation)..."
                    className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-neutral-900 text-white text-sm focus:border-amber-400 focus:outline-hidden"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl font-extrabold italic text-sm text-black bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:brightness-110 shadow-lg shadow-amber-400/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4 text-black" />
                  <span>Send Message via WhatsApp (+92 329 9866560)</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>

      {/* Edit Facebook URL Modal */}
      {isEditingFb && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 font-cinzel">Edit Official Facebook Link</h3>
              <button
                onClick={() => setIsEditingFb(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveFb} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Facebook Page URL
                </label>
                <input
                  type="url"
                  required
                  value={tempFbUrl}
                  onChange={(e) => setTempFbUrl(e.target.value)}
                  placeholder="https://facebook.com/your-academy-page"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:border-emerald-600"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  This will update the Facebook icon and links across the header, contact section, and footer.
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditingFb(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 cursor-pointer"
                >
                  Save URL
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
