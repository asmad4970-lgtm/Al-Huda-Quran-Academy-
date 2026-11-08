import React, { useState } from 'react';
import { INITIAL_GALLERY } from '../data/galleryData';
import { GalleryPhoto } from '../types';
import { Image as ImageIcon, Plus, X, ZoomIn, Upload, Sparkles, Eye } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [photos, setPhotos] = useState<GalleryPhoto[]>(INITIAL_GALLERY);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activePhoto, setActivePhoto] = useState<GalleryPhoto | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  
  // New photo form state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<GalleryPhoto['category']>('classroom');
  const [newImage, setNewImage] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const categories = [
    { id: 'all', label: 'All Photographs' },
    { id: 'classroom', label: 'Online Classroom' },
    { id: 'quran', label: 'Quran Learning' },
    { id: 'students', label: 'Student Environment' },
    { id: 'activities', label: 'Academy Activities' }
  ];

  const filteredPhotos = activeCategory === 'all'
    ? photos
    : photos.filter(p => p.category === activeCategory);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          setNewImage(uploadEvent.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImage || !newTitle) return;

    const newEntry: GalleryPhoto = {
      id: `custom-gal-${Date.now()}`,
      title: newTitle,
      category: newCategory,
      image: newImage,
      description: newDesc || 'Photo added from academy collection',
      isCustom: true
    };

    setPhotos([newEntry, ...photos]);
    setIsUploadModalOpen(false);
    setNewTitle('');
    setNewImage('');
    setNewDesc('');
  };

  return (
    <section id="gallery" className="py-20 sm:py-24 bg-black relative border-t border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-xs font-bold uppercase tracking-wider text-amber-300">
              <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
              <span className="italic font-bold">Academy Moments & Learning</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black italic text-white tracking-tight font-serif">
              Academy <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">Photo Gallery</span>
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 font-light">
              Explore our classrooms, Quranic study environments, student progress, and Islamic educational activities. You can also upload your own mobile photos.
            </p>
          </div>

          {/* Upload Button */}
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="self-start md:self-auto px-5 py-3 rounded-xl font-bold italic text-xs sm:text-sm text-black bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-[0_0_20px_rgba(217,119,6,0.3)] transition-all flex items-center gap-2 cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4 text-black" />
            <span>Add / Upload Mobile Photos</span>
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-xs font-bold italic rounded-xl transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-black shadow-[0_0_15px_rgba(217,119,6,0.25)]'
                  : 'bg-neutral-900 text-neutral-300 hover:text-white border border-amber-500/20'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setActivePhoto(photo)}
              className="group relative h-72 rounded-3xl overflow-hidden cursor-pointer bg-neutral-900 border-2 border-amber-500/20 hover:border-amber-400 shadow-[0_0_25px_rgba(0,0,0,0.8)] hover:shadow-[0_0_35px_rgba(217,119,6,0.25)] transition-all duration-300"
            >
              <img
                src={photo.image}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />

              {/* Inset content */}
              <div className="absolute bottom-4 left-4 right-4 text-white transform group-hover:-translate-y-1 transition-transform">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block mb-1 italic">
                  {photo.category}
                </span>
                <h3 className="text-base font-black italic font-serif leading-snug line-clamp-2 text-white">
                  {photo.title}
                </h3>
              </div>

              {/* View Icon Badge */}
              <div className="absolute top-3 right-3 p-2 rounded-full bg-black/70 border border-amber-400/50 backdrop-blur-md text-amber-300 opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Preview Modal */}
      {activePhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative max-w-4xl w-full bg-neutral-950 rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-500/40">
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/80 hover:bg-black border border-amber-500/40 text-amber-300 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[70vh] flex items-center justify-center bg-black/60">
              <img
                src={activePhoto.image}
                alt={activePhoto.title}
                className="max-h-[70vh] w-auto max-w-full object-contain"
              />
            </div>

            <div className="p-6 bg-neutral-950 text-white space-y-2 border-t border-neutral-800">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black italic font-serif text-white">{activePhoto.title}</h3>
                <span className="text-xs uppercase tracking-wider text-amber-400 font-bold italic">{activePhoto.category}</span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                {activePhoto.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Upload Mobile Photo Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-neutral-950 rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border-2 border-amber-500/40 space-y-5 text-white">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <h3 className="text-base font-black italic font-serif text-white">Add Photo to Gallery</h3>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddPhoto} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-amber-300 mb-1">Photo Title *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. My Child's Daily Lesson"
                  className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-sm focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-300 mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-sm focus:border-amber-400 focus:outline-none"
                >
                  <option value="classroom">Online Classroom</option>
                  <option value="quran">Quran Learning</option>
                  <option value="students">Student Environment</option>
                  <option value="activities">Academy Activities</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-300 mb-1">Upload Image File (from Mobile / Desktop) *</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="w-full text-xs text-neutral-400 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-amber-400 file:text-black hover:file:bg-amber-300 cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-300 mb-1">Or Image URL</label>
                <input
                  type="text"
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  placeholder="https://example.com/photo.jpg"
                  className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-sm focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-300 mb-1">Brief Description</label>
                <textarea
                  rows={2}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Short note about this photograph"
                  className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-sm focus:border-amber-400 focus:outline-none"
                />
              </div>

              {newImage && (
                <div className="text-center pt-1">
                  <p className="text-[11px] text-neutral-400 mb-1">Image Preview</p>
                  <img src={newImage} alt="Preview" className="h-28 w-auto mx-auto rounded-xl border-2 border-amber-500/40" />
                </div>
              )}

              <div className="flex justify-end gap-2 pt-3 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-neutral-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newImage || !newTitle}
                  className="px-5 py-2 rounded-xl text-xs font-bold italic text-black bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-[0_0_15px_rgba(217,119,6,0.3)] disabled:opacity-50 cursor-pointer"
                >
                  Add to Gallery
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
