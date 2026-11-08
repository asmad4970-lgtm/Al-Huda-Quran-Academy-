import React, { useState } from 'react';
import { INITIAL_TEACHERS } from '../data/teachersData';
import { Teacher } from '../types';
import { Award, BookOpen, Check, MessageCircle, Upload, Sparkles, User, Globe, Edit3, X } from 'lucide-react';

export const TeachersSection: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>(INITIAL_TEACHERS);
  const [activeFilter, setActiveFilter] = useState<'all' | 'male' | 'female'>('all');
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [customPhotoUrl, setCustomPhotoUrl] = useState('');
  const [customName, setCustomName] = useState('');

  const filteredTeachers = activeFilter === 'all'
    ? teachers
    : teachers.filter(t => t.gender === activeFilter);

  const handleOpenEdit = (t: Teacher) => {
    setEditingTeacher(t);
    setCustomPhotoUrl(t.image);
    setCustomName(t.name);
  };

  const handleSaveTeacher = () => {
    if (!editingTeacher) return;
    setTeachers(prev =>
      prev.map(item =>
        item.id === editingTeacher.id
          ? { ...item, image: customPhotoUrl || item.image, name: customName || item.name }
          : item
      )
    );
    setEditingTeacher(null);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          setCustomPhotoUrl(uploadEvent.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="teachers" className="py-20 sm:py-24 bg-neutral-950 relative border-t border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-xs font-bold uppercase tracking-wider text-amber-300">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span className="italic font-bold">Certified Islamic Educators</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black italic text-white tracking-tight font-serif">
            Our Qualified <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">Quran Teachers</span>
          </h2>

          <p className="text-base sm:text-lg text-neutral-300 font-light">
            Learn from verified male and female Quran instructors with authentic Tajweed certifications (Ijazah), extensive online teaching experience, and a nurturing approach.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 text-xs sm:text-sm font-bold italic rounded-xl transition-all cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-black shadow-[0_0_20px_rgba(217,119,6,0.3)]'
                  : 'bg-neutral-900 text-neutral-300 hover:text-white border border-amber-500/20'
              }`}
            >
              All Instructors ({teachers.length})
            </button>
            <button
              onClick={() => setActiveFilter('male')}
              className={`px-4 py-2 text-xs sm:text-sm font-bold italic rounded-xl transition-all cursor-pointer ${
                activeFilter === 'male'
                  ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-black shadow-[0_0_20px_rgba(217,119,6,0.3)]'
                  : 'bg-neutral-900 text-neutral-300 hover:text-white border border-amber-500/20'
              }`}
            >
              Male Quran Teachers
            </button>
            <button
              onClick={() => setActiveFilter('female')}
              className={`px-4 py-2 text-xs sm:text-sm font-bold italic rounded-xl transition-all cursor-pointer ${
                activeFilter === 'female'
                  ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-black shadow-[0_0_20px_rgba(217,119,6,0.3)]'
                  : 'bg-neutral-900 text-neutral-300 hover:text-white border border-amber-500/20'
              }`}
            >
              Female Quran Tutors (for Sisters & Kids)
            </button>
          </div>
        </div>

        {/* Teachers Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTeachers.map((teacher) => (
            <div
              key={teacher.id}
              className="rounded-3xl bg-neutral-900/90 border-2 border-amber-500/20 hover:border-amber-400 shadow-[0_0_25px_rgba(0,0,0,0.8)] hover:shadow-[0_0_35px_rgba(217,119,6,0.25)] transition-all duration-300 flex flex-col overflow-hidden group"
            >
              {/* Image & Quick Action */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-neutral-950">
                <img
                  src={teacher.image}
                  alt={teacher.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                {/* Gender & Role Badge */}
                <div className="absolute top-3 left-3">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-xs ${
                    teacher.gender === 'female'
                      ? 'bg-amber-400 text-black border border-amber-300'
                      : 'bg-black/90 text-amber-300 border border-amber-500/40'
                  }`}>
                    {teacher.gender === 'female' ? 'Female Instructor' : 'Male Instructor'}
                  </span>
                </div>

                {/* Replace / Customize Photo Tool Button */}
                <button
                  onClick={() => handleOpenEdit(teacher)}
                  title="Replace or upload teacher photo"
                  className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/70 hover:bg-black text-amber-400 border border-amber-500/40 shadow-xs backdrop-blur-md transition-all cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>

                {/* Name & Role on image */}
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <h3 className="text-lg font-black italic font-serif leading-tight">{teacher.name}</h3>
                  <p className="text-xs text-amber-300 font-medium">{teacher.role}</p>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4 bg-neutral-950">
                <div className="space-y-3">
                  {/* Experience & Qualifications */}
                  <div className="text-xs text-neutral-300 space-y-1">
                    <p className="font-bold text-amber-400 flex items-center gap-1 italic">
                      <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{teacher.experience}</span>
                    </p>
                    <p className="text-[11px] text-neutral-400 line-clamp-2">
                      {teacher.qualifications}
                    </p>
                  </div>

                  {/* Specialties */}
                  <div className="space-y-1 pt-2 border-t border-neutral-800">
                    <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block italic">Specialties:</span>
                    {teacher.specialties.slice(0, 2).map((s, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-xs text-neutral-300">
                        <Check className="w-3 h-3 text-amber-400 shrink-0" />
                        <span className="line-clamp-1">{s}</span>
                      </div>
                    ))}
                  </div>

                  {/* Languages */}
                  <div className="flex items-center gap-1.5 text-[11px] text-neutral-400 pt-1">
                    <Globe className="w-3 h-3 text-neutral-500 shrink-0" />
                    <span>{teacher.languages.join(' · ')}</span>
                  </div>
                </div>

                {/* WhatsApp Direct Class Request */}
                <a
                  href={`https://wa.me/923299866560?text=${encodeURIComponent(`Assalam o Alaikum! I would like to request classes with ${teacher.name} (${teacher.role}) at Al Huda Quran Academy.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 rounded-xl text-xs font-bold italic text-white bg-[#25D366] hover:bg-[#20ba59] shadow-[0_0_15px_rgba(37,211,102,0.3)] transition-all flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-white fill-white" />
                  <span>Request Class on WhatsApp</span>
                </a>

              </div>

            </div>
          ))}
        </div>

        {/* Note on Teacher Replacement */}
        <div className="mt-12 text-center">
          <p className="text-xs text-neutral-400 max-w-xl mx-auto">
            All teacher profiles use verified pedagogical standards. Academy administrators can update teacher photographs and profiles with official portraits at any time.
          </p>
        </div>

      </div>

      {/* Edit Teacher Modal */}
      {editingTeacher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-neutral-950 rounded-3xl max-w-md w-full p-6 shadow-2xl border-2 border-amber-500/40 space-y-5 text-white">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <h3 className="text-base font-black italic font-serif text-white">Update Teacher Profile</h3>
              <button
                onClick={() => setEditingTeacher(null)}
                className="p-1 rounded-lg text-neutral-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-amber-300 mb-1">Teacher Name</label>
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-sm focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-300 mb-1">Upload New Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="w-full text-xs text-neutral-400 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-amber-400 file:text-black hover:file:bg-amber-300 cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-300 mb-1">Or Paste Image URL</label>
                <input
                  type="text"
                  value={customPhotoUrl}
                  onChange={(e) => setCustomPhotoUrl(e.target.value)}
                  placeholder="https://example.com/photo.jpg"
                  className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-sm focus:border-amber-400 focus:outline-none"
                />
              </div>

              {customPhotoUrl && (
                <div className="mt-2 text-center">
                  <p className="text-[11px] text-neutral-400 mb-1">Photo Preview</p>
                  <img
                    src={customPhotoUrl}
                    alt="Preview"
                    className="w-24 h-28 object-cover rounded-xl mx-auto border-2 border-amber-500/40 shadow-xs"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-neutral-800">
              <button
                onClick={() => setEditingTeacher(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-neutral-400 hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveTeacher}
                className="px-5 py-2 rounded-xl text-xs font-bold italic text-black bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-[0_0_15px_rgba(217,119,6,0.3)] cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
