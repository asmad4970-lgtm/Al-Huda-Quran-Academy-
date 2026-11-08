import React, { useState, useEffect } from 'react';
import { AdmissionFormData } from '../types';
import { saveAdmission } from '../lib/supabase';
import confetti from 'canvas-confetti';
import { 
  GraduationCap, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  MessageCircle, 
  Copy, 
  Calendar, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  Globe, 
  AlertCircle 
} from 'lucide-react';

interface AdmissionSectionProps {
  preselectedCourse?: string;
  onClearPreselectedCourse?: () => void;
}

const COUNTRIES = [
  'United Kingdom (UK)',
  'United States (USA)',
  'Canada',
  'Australia',
  'Pakistan',
  'United Arab Emirates (UAE)',
  'Saudi Arabia',
  'Qatar',
  'Kuwait',
  'Bahrain',
  'Oman',
  'Germany',
  'France',
  'Norway',
  'Sweden',
  'Denmark',
  'Netherlands',
  'Ireland',
  'New Zealand',
  'Malaysia',
  'Singapore',
  'South Africa',
  'Other Country'
];

const WEEKDAYS = [
  { id: 'Monday', label: 'Mon' },
  { id: 'Tuesday', label: 'Tue' },
  { id: 'Wednesday', label: 'Wed' },
  { id: 'Thursday', label: 'Thu' },
  { id: 'Friday', label: 'Fri' },
  { id: 'Saturday', label: 'Sat' },
  { id: 'Sunday', label: 'Sun' }
];

export const AdmissionSection: React.FC<AdmissionSectionProps> = ({
  preselectedCourse,
  onClearPreselectedCourse
}) => {
  const [formData, setFormData] = useState<AdmissionFormData>({
    studentName: '',
    parentName: '',
    whatsappNumber: '',
    email: '',
    country: 'United Kingdom (UK)',
    studentAge: '',
    gender: 'Male',
    course: 'تجوید قرآن (Quran with Tajweed)',
    classType: 'One-to-One Class',
    preferredTiming: 'Evening',
    weeklyDays: '3 Days',
    selectedDays: ['Monday', 'Wednesday', 'Friday'],
    additionalMessage: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof AdmissionFormData, string>>>({});
  const [submittedData, setSubmittedData] = useState<{
    whatsappUrl: string;
    rawMessage: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (preselectedCourse) {
      // Map to course option
      if (preselectedCourse.includes('Tajweed')) {
        setFormData(prev => ({ ...prev, course: 'تجوید قرآن (Quran with Tajweed)' }));
      } else if (preselectedCourse.includes('Qaida')) {
        setFormData(prev => ({ ...prev, course: 'نورانی قاعدہ (Noorani Qaida)' }));
      } else if (preselectedCourse.includes('Duain')) {
        setFormData(prev => ({ ...prev, course: 'مسنون دعائیں (Masnoon Duain)' }));
      } else if (preselectedCourse.includes('Hifz')) {
        setFormData(prev => ({ ...prev, course: 'حفظ القرآن (Hifz-ul-Quran)' }));
      } else if (preselectedCourse.includes('Reading') || preselectedCourse.includes('Nazra')) {
        setFormData(prev => ({ ...prev, course: 'ناظرہ قرآن (Quran Reading)' }));
      } else {
        setFormData(prev => ({ ...prev, course: preselectedCourse }));
      }
    }
  }, [preselectedCourse]);

  const handleWeekdayToggle = (day: string) => {
    setFormData(prev => {
      const exists = prev.selectedDays.includes(day);
      if (exists) {
        return { ...prev, selectedDays: prev.selectedDays.filter(d => d !== day) };
      } else {
        return { ...prev, selectedDays: [...prev.selectedDays, day] };
      }
    });
  };

  const validate = (): boolean => {
    const errs: Partial<Record<keyof AdmissionFormData, string>> = {};

    if (!formData.studentName.trim()) {
      errs.studentName = 'Student full name is required';
    }
    if (!formData.parentName.trim()) {
      errs.parentName = 'Parent or guardian name is required';
    }
    if (!formData.whatsappNumber.trim()) {
      errs.whatsappNumber = 'WhatsApp contact number is required';
    } else if (formData.whatsappNumber.replace(/\D/g, '').length < 8) {
      errs.whatsappNumber = 'Please enter a valid phone number with country code';
    }
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email address';
    }
    if (!formData.studentAge.trim()) {
      errs.studentAge = 'Student age is required';
    }
    if (!formData.gender) {
      errs.gender = 'Please select student gender';
    }
    if (!formData.course) {
      errs.course = 'Please select a course';
    }
    if (!formData.classType) {
      errs.classType = 'Please select class type';
    }
    if (!formData.preferredTiming) {
      errs.preferredTiming = 'Please select preferred class timing';
    }
    if (!formData.weeklyDays) {
      errs.weeklyDays = 'Please select weekly class days';
    }
    if (formData.selectedDays.length === 0) {
      errs.selectedDays = 'Please select at least one preferred weekday';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    // Format professional WhatsApp message with all required details
    const msg = 
`*NEW ADMISSION APPLICATION — AL HUDA QURAN ACADEMY*
━━━━━━━━━━━━━━━━━━━━━━
👤 *Student Name:* ${formData.studentName}
👨‍👩‍👧 *Parent/Guardian:* ${formData.parentName}
🎂 *Student Age:* ${formData.studentAge} Years
⚧ *Gender:* ${formData.gender}
🌍 *Country:* ${formData.country}
📱 *WhatsApp:* ${formData.whatsappNumber}
✉️ *Email:* ${formData.email}
━━━━━━━━━━━━━━━━━━━━━━
📖 *Selected Course:* ${formData.course}
👥 *Class Type:* ${formData.classType}
⏰ *Preferred Timing:* ${formData.preferredTiming}
📅 *Weekly Days:* ${formData.weeklyDays}
🗓 *Preferred Weekdays:* ${formData.selectedDays.join(', ')}
${formData.additionalMessage ? `\n📝 *Additional Notes / Goals:*\n${formData.additionalMessage}` : ''}
━━━━━━━━━━━━━━━━━━━━━━
_Sent via Al Huda Quran Academy Online Portal_`;

    const encodedMsg = encodeURIComponent(msg);
    const whatsappUrl = `https://wa.me/923299866560?text=${encodedMsg}`;

    // Save record to Supabase and local storage database
    saveAdmission(formData);

    // Confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // fallback
    }

    setSubmittedData({
      whatsappUrl,
      rawMessage: msg
    });

    // Auto open WhatsApp destination
    window.open(whatsappUrl, '_blank');
  };

  const handleCopyMessage = () => {
    if (!submittedData) return;
    navigator.clipboard.writeText(submittedData.rawMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="admission" className="py-20 sm:py-24 bg-black text-white relative overflow-hidden border-t border-amber-400/20">
      {/* Background accents */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold italic uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
            <span>Fast & Simple Registration</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold italic text-white tracking-tight font-cinzel">
            Online Admission Application
          </h2>

          <p className="text-base sm:text-lg text-neutral-300 font-normal">
            Begin your or your child's blessed Quranic journey today. Complete the application below and connect directly with the Academy on WhatsApp to schedule your <strong className="text-amber-300 font-bold">3-Day Free Trial Class</strong>.
          </p>
        </div>

        {/* Admission Form Box in Black & Gold */}
        <div className="rounded-3xl bg-neutral-950 border border-amber-400/30 shadow-2xl p-6 sm:p-10 relative">
          
          {/* Top Form Banner */}
          <div className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-neutral-900 via-neutral-950 to-black border border-amber-400/30 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <img src="/logo.png" alt="Logo" className="w-12 h-12 rounded-full border-2 border-amber-400 p-0.5 bg-white shrink-0" />
              <div>
                <h3 className="font-cinzel text-base font-bold italic text-amber-300">Al Huda Quran Academy Official Admissions</h3>
                <p className="text-xs text-neutral-400">WhatsApp: +92 329 9866560 · Auto-synced to Supabase Database</p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-amber-400 text-black text-[11px] font-extrabold italic uppercase tracking-wider shrink-0 shadow-md">
              3-Day Free Trial Included
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Step 1: Student & Parent Profile */}
            <div>
              <div className="flex items-center gap-2 mb-5 pb-2.5 border-b border-amber-400/20">
                <span className="w-6 h-6 rounded-full bg-amber-400 text-black text-xs font-extrabold flex items-center justify-center">1</span>
                <h4 className="text-sm font-bold italic text-white uppercase tracking-wider font-cinzel">
                  Student & Parent Information
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Student Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Student Full Name <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.studentName}
                      onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                      placeholder="e.g. Rayan Ahmed"
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-colors bg-neutral-900 text-white placeholder:text-neutral-500 ${
                        errors.studentName ? 'border-red-400 bg-red-950/20' : 'border-white/15 hover:border-amber-400/40 focus:border-amber-400 focus:outline-hidden'
                      }`}
                    />
                    <User className="w-4 h-4 text-neutral-400 absolute right-3 top-3" />
                  </div>
                  {errors.studentName && <p className="text-[11px] text-red-400 mt-1">{errors.studentName}</p>}
                </div>

                {/* Parent / Guardian Name */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Parent / Guardian Name <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.parentName}
                      onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                      placeholder="e.g. Tariq Mehmood"
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-colors bg-neutral-900 text-white placeholder:text-neutral-500 ${
                        errors.parentName ? 'border-red-400 bg-red-950/20' : 'border-white/15 hover:border-amber-400/40 focus:border-amber-400 focus:outline-hidden'
                      }`}
                    />
                    <User className="w-4 h-4 text-neutral-400 absolute right-3 top-3" />
                  </div>
                  {errors.parentName && <p className="text-[11px] text-red-400 mt-1">{errors.parentName}</p>}
                </div>

                {/* WhatsApp Number with Country Code */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    WhatsApp Number (with Country Code) <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={formData.whatsappNumber}
                      onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                      placeholder="e.g. +44 7123 456789 or +92 300 1234567"
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-colors bg-neutral-900 text-white placeholder:text-neutral-500 ${
                        errors.whatsappNumber ? 'border-red-400 bg-red-950/20' : 'border-white/15 hover:border-amber-400/40 focus:border-amber-400 focus:outline-hidden'
                      }`}
                    />
                    <Phone className="w-4 h-4 text-neutral-400 absolute right-3 top-3" />
                  </div>
                  {errors.whatsappNumber && <p className="text-[11px] text-red-400 mt-1">{errors.whatsappNumber}</p>}
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Email Address <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. family@example.com"
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-colors bg-neutral-900 text-white placeholder:text-neutral-500 ${
                        errors.email ? 'border-red-400 bg-red-950/20' : 'border-white/15 hover:border-amber-400/40 focus:border-amber-400 focus:outline-hidden'
                      }`}
                    />
                    <Mail className="w-4 h-4 text-neutral-400 absolute right-3 top-3" />
                  </div>
                  {errors.email && <p className="text-[11px] text-red-400 mt-1">{errors.email}</p>}
                </div>

                {/* Country */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Country of Residence <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-white/15 text-sm bg-neutral-900 text-white focus:border-amber-400 focus:outline-hidden appearance-none"
                    >
                      {COUNTRIES.map((c) => (
                        <option key={c} value={c} className="bg-neutral-900 text-white">{c}</option>
                      ))}
                    </select>
                    <Globe className="w-4 h-4 text-neutral-400 absolute right-3 top-3 pointer-events-none" />
                  </div>
                </div>

                {/* Age & Gender Row */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                      Student Age <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="number"
                      min="3"
                      max="90"
                      value={formData.studentAge}
                      onChange={(e) => setFormData({ ...formData, studentAge: e.target.value })}
                      placeholder="e.g. 7"
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-neutral-900 text-white ${
                        errors.studentAge ? 'border-red-400 bg-red-950/20' : 'border-white/15 focus:border-amber-400 focus:outline-hidden'
                      }`}
                    />
                    {errors.studentAge && <p className="text-[11px] text-red-400 mt-1">{errors.studentAge}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                      Gender <span className="text-amber-400">*</span>
                    </label>
                    <div className="flex gap-2">
                      {(['Male', 'Female'] as const).map((g) => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => setFormData({ ...formData, gender: g })}
                          className={`flex-1 py-2 rounded-xl text-xs font-bold italic border transition-all cursor-pointer ${
                            formData.gender === g
                              ? 'bg-amber-400 text-black border-amber-400 shadow-md'
                              : 'bg-neutral-900 text-neutral-300 border-white/15 hover:bg-neutral-800'
                          }`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Step 2: Course Selection & Class Mode */}
            <div>
              <div className="flex items-center gap-2 mb-5 pb-2.5 border-b border-amber-400/20">
                <span className="w-6 h-6 rounded-full bg-amber-400 text-black text-xs font-extrabold flex items-center justify-center">2</span>
                <h4 className="text-sm font-bold italic text-white uppercase tracking-wider font-cinzel">
                  Course & Learning Preferences
                </h4>
              </div>

              {/* Course Selector */}
              <div className="mb-6">
                <label className="block text-xs font-semibold text-neutral-300 mb-2.5">
                  Select Course <span className="text-amber-400">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { label: 'تجوید قرآن', sub: 'Quran with Tajweed' },
                    { label: 'مسنون دعائیں', sub: 'Masnoon Duain & Prayers' },
                    { label: 'نورانی قاعدہ', sub: 'Noorani Qaida for Beginners' },
                    { label: 'حفظ القرآن', sub: 'Hifz-ul-Quran Memorization' },
                    { label: 'ناظرہ قرآن', sub: 'Fluent Quran Reading' },
                    { label: 'اسلامیات', sub: 'Islamic Studies & Character' },
                  ].map((c) => {
                    const value = `${c.label} (${c.sub})`;
                    const isSelected = formData.course.includes(c.label);
                    return (
                      <button
                        key={c.label}
                        type="button"
                        onClick={() => setFormData({ ...formData, course: value })}
                        className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-neutral-900 border-amber-400 shadow-lg ring-1 ring-amber-400'
                            : 'bg-neutral-900/60 border-white/10 hover:border-amber-400/40'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-amiri text-lg font-bold text-amber-300" dir="rtl">{c.label}</span>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
                        </div>
                        <span className="text-xs font-medium text-neutral-300 mt-1">{c.sub}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Class Type: One-to-One vs Group Class */}
              <div className="mb-6">
                <label className="block text-xs font-semibold text-neutral-300 mb-2">
                  Class Type <span className="text-amber-400">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { type: 'One-to-One Class', desc: '100% individual attention from teacher. Ideal for personalized pace & Tajweed.' },
                    { type: 'Group Class', desc: 'Small interactive group of 3-4 students. Collaborative & social learning.' }
                  ].map((item) => (
                    <button
                      key={item.type}
                      type="button"
                      onClick={() => setFormData({ ...formData, classType: item.type as any })}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                        formData.classType === item.type
                          ? 'bg-neutral-900 border-amber-400 shadow-lg ring-1 ring-amber-400'
                          : 'bg-neutral-900/60 border-white/10 hover:border-amber-400/40'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-bold text-white">{item.type}</span>
                        {formData.classType === item.type && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
                      </div>
                      <p className="text-xs text-neutral-400 leading-normal">{item.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Preferred Class Timing */}
              <div className="mb-6">
                <label className="block text-xs font-semibold text-neutral-300 mb-2">
                  Preferred Class Timing <span className="text-amber-400">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {(['Morning', 'Afternoon', 'Evening', 'Night'] as const).map((timing) => (
                    <button
                      key={timing}
                      type="button"
                      onClick={() => setFormData({ ...formData, preferredTiming: timing })}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-bold italic transition-all cursor-pointer text-center ${
                        formData.preferredTiming === timing
                          ? 'bg-amber-400 text-black border-amber-400 shadow-md'
                          : 'bg-neutral-900 text-neutral-300 border-white/15 hover:bg-neutral-800'
                      }`}
                    >
                      {timing}
                    </button>
                  ))}
                </div>
              </div>

              {/* Weekly Class Days */}
              <div className="mb-6">
                <label className="block text-xs font-semibold text-neutral-300 mb-2">
                  Weekly Class Frequency <span className="text-amber-400">*</span>
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {(['2 Days', '3 Days', '4 Days', '5 Days', '6 Days', '7 Days'] as const).map((days) => (
                    <button
                      key={days}
                      type="button"
                      onClick={() => setFormData({ ...formData, weeklyDays: days })}
                      className={`py-2 px-2 rounded-xl border text-xs font-bold italic transition-all cursor-pointer text-center ${
                        formData.weeklyDays === days
                          ? 'bg-amber-400 text-black border-amber-400 shadow-md'
                          : 'bg-neutral-900 text-neutral-300 border-white/15 hover:bg-neutral-800'
                      }`}
                    >
                      {days}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preferred Weekdays Selection */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-2">
                  Select Preferred Weekdays <span className="text-amber-400">*</span>
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                  {WEEKDAYS.map((day) => {
                    const isSelected = formData.selectedDays.includes(day.id);
                    return (
                      <button
                        key={day.id}
                        type="button"
                        onClick={() => handleWeekdayToggle(day.id)}
                        className={`py-2 px-1 rounded-xl border text-xs font-bold transition-all cursor-pointer text-center ${
                          isSelected
                            ? 'bg-amber-400 text-black border-amber-400 shadow-md'
                            : 'bg-neutral-900 text-neutral-400 border-white/15 hover:bg-neutral-800 hover:text-white'
                        }`}
                      >
                        {day.label}
                      </button>
                    );
                  })}
                </div>
                {errors.selectedDays && <p className="text-[11px] text-red-400 mt-1">{errors.selectedDays}</p>}
              </div>

            </div>

            {/* Additional Message */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                Additional Message / Notes for Teacher
              </label>
              <textarea
                rows={3}
                value={formData.additionalMessage}
                onChange={(e) => setFormData({ ...formData, additionalMessage: e.target.value })}
                placeholder="Mention any specific student background (e.g. knows Urdu alphabet, prefers a female teacher, flexible on weekends, etc.)"
                className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-neutral-900 text-white text-sm focus:border-amber-400 focus:outline-hidden"
              />
            </div>

            {/* Submit Application Button in Gleaming Gold */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-4 rounded-2xl font-extrabold italic text-base text-black bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:brightness-110 shadow-xl shadow-amber-400/25 hover:scale-[1.01] transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer"
              >
                <Send className="w-5 h-5 text-black" />
                <span>Submit Application & Open WhatsApp Chat</span>
              </button>
              <p className="text-center text-xs text-neutral-400 mt-2.5">
                Your application details are saved directly into the Academy database and sent to WhatsApp number: <strong className="text-white font-mono">+92 329 9866560</strong>
              </p>
            </div>

          </form>

        </div>

        {/* Post-Submission Success Dialog */}
        {submittedData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
            <div className="bg-neutral-950 text-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-amber-400/40 text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white font-cinzel italic">Application Ready & Saved!</h3>
                <p className="text-xs sm:text-sm text-neutral-300 mt-1">
                  We have saved your admission application in the <strong className="text-amber-400">Al Huda Academy Database</strong> and launched WhatsApp.
                </p>
              </div>

              {/* Formatted Message Preview */}
              <div className="p-4 rounded-2xl bg-black border border-white/15 text-left text-xs text-neutral-300 max-h-48 overflow-y-auto font-mono whitespace-pre-wrap">
                {submittedData.rawMessage}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={submittedData.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl font-extrabold italic text-xs text-black bg-[#25D366] hover:bg-[#20bd5a] flex items-center justify-center gap-2 shadow-lg"
                >
                  <MessageCircle className="w-4 h-4 fill-black" />
                  <span>Open WhatsApp Again</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyMessage}
                  className="py-3 px-4 rounded-xl font-bold italic text-xs text-black bg-amber-400 hover:bg-amber-300 flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Copy className="w-4 h-4 text-black" />
                  <span>{copied ? 'Copied!' : 'Copy Text'}</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => setSubmittedData(null)}
                className="text-xs text-neutral-400 hover:text-white cursor-pointer pt-2"
              >
                Close Window
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
