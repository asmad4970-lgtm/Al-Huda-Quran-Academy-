import React, { useState } from 'react';
import { INITIAL_VIDEOS } from '../data/videosData';
import { VideoItem } from '../types';
import { Video, Play, Plus, X, Upload, Sparkles, Clock, Volume2 } from 'lucide-react';

export const VideoSection: React.FC = () => {
  const [videos, setVideos] = useState<VideoItem[]>(INITIAL_VIDEOS);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New video form state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<VideoItem['category']>('recitation');
  const [newVideoUrl, setNewVideoUrl] = useState('');
  const [newDuration, setNewDuration] = useState('03:30');
  const [newThumbnail, setNewThumbnail] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const categories = [
    { id: 'all', label: 'All Lessons & Recitations' },
    { id: 'recitation', label: 'Quran Recitation' },
    { id: 'tajweed', label: 'Tajweed Masterclass' },
    { id: 'qaida', label: 'Noorani Qaida' },
    { id: 'demo', label: 'Live Class Demo' }
  ];

  const filteredVideos = activeCategory === 'all'
    ? videos
    : videos.filter(v => v.category === activeCategory);

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setNewVideoUrl(url);
    }
  };

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          setNewThumbnail(uploadEvent.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newVideoUrl) return;

    const newEntry: VideoItem = {
      id: `vid-custom-${Date.now()}`,
      title: newTitle,
      category: newCategory,
      duration: newDuration || '04:00',
      thumbnail: newThumbnail || '/src/assets/images/course_quran_reading_1794166129477.jpg',
      videoUrl: newVideoUrl,
      description: newDesc || 'Custom academy video lesson',
      isCustom: true
    };

    setVideos([newEntry, ...videos]);
    setIsAddModalOpen(false);
    setNewTitle('');
    setNewVideoUrl('');
    setNewThumbnail('');
    setNewDesc('');
  };

  return (
    <section id="videos" className="py-20 sm:py-24 bg-neutral-950 text-white relative overflow-hidden border-t border-amber-500/20">
      {/* Background Subtle Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-xs font-bold uppercase tracking-wider text-amber-300">
              <Video className="w-3.5 h-3.5 text-amber-400" />
              <span className="italic font-bold">Video Lessons & Recitations</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black italic font-serif text-white tracking-tight">
              Watch Our Academy <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">Lessons & Demonstrations</span>
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 font-light">
              Sample our live teaching method, Tajweed articulation tutorials, Noorani Qaida lessons, and soulful Quran recitations. You can also upload your own video recordings.
            </p>
          </div>

          {/* Add / Upload Video Button */}
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="self-start md:self-auto px-5 py-3 rounded-xl font-bold italic text-xs sm:text-sm text-black bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-[0_0_20px_rgba(217,119,6,0.3)] transition-all flex items-center gap-2 cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4 text-black" />
            <span>Upload Academy Video</span>
          </button>
        </div>

        {/* Category Filters */}
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

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredVideos.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedVideo(item)}
              className="group rounded-3xl bg-neutral-900 border-2 border-amber-500/20 hover:border-amber-400 shadow-[0_0_25px_rgba(0,0,0,0.8)] hover:shadow-[0_0_35px_rgba(217,119,6,0.25)] transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
            >
              {/* Thumbnail with Play Trigger */}
              <div className="relative h-48 w-full overflow-hidden bg-neutral-950">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                {/* Central Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 group-hover:from-amber-300 group-hover:to-amber-400 text-black flex items-center justify-center shadow-[0_0_20px_rgba(217,119,6,0.4)] transform group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-black ml-0.5" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-black/85 border border-amber-400/40 text-[11px] font-mono font-bold text-amber-300 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-amber-400" />
                  <span>{item.duration}</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3 bg-neutral-950">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block mb-1 italic">
                    {item.category}
                  </span>
                  <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1 line-clamp-2 leading-normal font-light">
                    {item.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
                  <span className="flex items-center gap-1 text-amber-400 font-bold italic">
                    <Volume2 className="w-3 h-3" />
                    <span>Click to Play</span>
                  </span>
                  <span className="text-[11px] text-amber-300/80 italic">Al Huda Media</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Video Player Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative max-w-4xl w-full bg-neutral-950 rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-500/40">
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/80 hover:bg-black border border-amber-500/40 text-amber-300 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Video Player Container */}
            <div className="w-full aspect-video bg-black flex items-center justify-center">
              <video
                src={selectedVideo.videoUrl}
                controls
                autoPlay
                className="w-full h-full object-contain"
              >
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Video Details */}
            <div className="p-6 bg-neutral-950 text-white space-y-2 border-t border-neutral-800">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black italic font-serif text-amber-300">{selectedVideo.title}</h3>
                <span className="text-xs uppercase tracking-wider text-amber-400 font-bold italic">{selectedVideo.category}</span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                {selectedVideo.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Add / Upload Video Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm text-white">
          <div className="bg-neutral-950 rounded-3xl max-w-md w-full p-6 shadow-2xl border-2 border-amber-500/40 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <h3 className="text-base font-black italic font-serif text-white">Upload or Add Video</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddVideo} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-amber-300 mb-1">Video Title *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Surah Rahman Live Recitation"
                  className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-sm focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-amber-300 mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-sm focus:border-amber-400 focus:outline-none"
                  >
                    <option value="recitation">Quran Recitation</option>
                    <option value="tajweed">Tajweed Lessons</option>
                    <option value="qaida">Noorani Qaida</option>
                    <option value="demo">Class Demonstration</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-amber-300 mb-1">Duration</label>
                  <input
                    type="text"
                    value={newDuration}
                    onChange={(e) => setNewDuration(e.target.value)}
                    placeholder="05:20"
                    className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-sm focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-300 mb-1">Upload Video File (MP4, WebM)</label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoUpload}
                  className="w-full text-xs text-neutral-400 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-amber-400 file:text-black hover:file:bg-amber-300 cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-300 mb-1">Or Video Direct URL</label>
                <input
                  type="text"
                  value={newVideoUrl}
                  onChange={(e) => setNewVideoUrl(e.target.value)}
                  placeholder="https://example.com/video.mp4"
                  className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-sm focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-300 mb-1">Upload Video Thumbnail Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailUpload}
                  className="w-full text-xs text-neutral-400 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-amber-400 file:text-black hover:file:bg-amber-300 cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-300 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Short summary of this recitation or lesson"
                  className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-sm focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-neutral-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newTitle || !newVideoUrl}
                  className="px-5 py-2 rounded-xl text-xs font-bold italic text-black bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-[0_0_15px_rgba(217,119,6,0.3)] disabled:opacity-50 cursor-pointer"
                >
                  Add Video
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
