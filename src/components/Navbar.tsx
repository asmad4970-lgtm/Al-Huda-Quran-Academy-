import React, { useState, useEffect } from 'react';
import { Menu, X, MessageCircle, GraduationCap } from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, activeSection, onOpenAdmin }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);
  const [showClickBadge, setShowClickBadge] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoPress = (e: React.MouseEvent) => {
    e.preventDefault();
    const nextClicks = logoClicks + 1;
    setLogoClicks(nextClicks);
    setShowClickBadge(true);

    if (nextClicks >= 5) {
      setLogoClicks(0);
      setShowClickBadge(false);
      onOpenAdmin();
    } else {
      setTimeout(() => {
        setLogoClicks(0);
        setShowClickBadge(false);
      }, 3000);
    }
  };

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About Us', id: 'about' },
    { name: 'Our Courses', id: 'courses' },
    { name: 'Our Teachers', id: 'teachers' },
    { name: 'Gallery', id: 'gallery' },
    { name: 'Videos', id: 'videos' },
    { name: 'Admission', id: 'admission' },
    { name: 'Contact Us', id: 'contact' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/95 backdrop-blur-md shadow-xl border-b border-amber-400/25 py-3'
          : 'bg-black/90 backdrop-blur-md border-b border-amber-400/15 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6">
          
          {/* Brand Zone: 5-Click Logo Secret Admin Trigger & Bold Italic White Fonts */}
          <div className="flex items-center gap-2 relative">
            <button
              onClick={handleLogoPress}
              title="AL HUDA QURAN ACADEMY (Click 5 times for Admin Panel)"
              className="flex items-center gap-3 shrink-0 group focus:outline-hidden cursor-pointer text-left"
            >
              <div className="relative">
                <img
                  src="/logo.png"
                  alt="Al Huda Quran Academy Official Logo"
                  className="w-11 h-11 sm:w-12 sm:h-12 object-contain rounded-full border-2 border-amber-400 shadow-md group-hover:scale-105 transition-transform bg-white"
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-black" title="Official Academy" />
              </div>
              <div>
                <span className="font-cinzel text-lg sm:text-xl font-extrabold italic tracking-wider text-white group-hover:text-amber-300 transition-colors whitespace-nowrap block leading-tight drop-shadow-sm">
                  AL HUDA
                </span>
                <span className="text-[10px] sm:text-xs font-bold italic tracking-widest uppercase text-amber-400 block">
                  Quran Academy
                </span>
              </div>
            </button>

            {/* Secret Click Counter Badge */}
            {showClickBadge && logoClicks > 1 && (
              <span className="absolute -bottom-6 left-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400 text-black shadow-lg animate-bounce">
                Admin: {logoClicks}/5
              </span>
            )}
          </div>

          {/* Nav Links Zone (Desktop with Bold Italic White Fonts) */}
          <nav className="hidden xl:flex items-center gap-6 text-sm font-semibold">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`relative py-1 transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'text-white font-bold italic drop-shadow-sm'
                      : 'text-white/80 hover:text-white hover:italic'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Zone: WhatsApp Contact Button + Admission Button */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            {/* Prominent WhatsApp Button as requested */}
            <a
              href="https://wa.me/923299866560"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-white bg-[#25D366] hover:bg-[#20bd5a] rounded-xl shadow-md shadow-[#25D366]/25 hover:shadow-lg transition-all duration-200 whitespace-nowrap active:scale-95 cursor-pointer"
              title="Chat with Al Huda Academy on WhatsApp"
            >
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <MessageCircle className="w-3.5 h-3.5 text-white fill-white" />
              </div>
              <span className="tracking-wide">WhatsApp</span>
            </a>

            <button
              onClick={() => handleLinkClick('admission')}
              className="px-4 py-2 text-xs font-bold italic text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-md transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Enroll Now</span>
            </button>
          </div>

          {/* Mobile Hamburger & Mobile WhatsApp Button */}
          <div className="flex items-center gap-2 xl:hidden">
            <a
              href="https://wa.me/923299866560"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-white bg-[#25D366] hover:bg-[#20bd5a] rounded-xl shadow-xs"
              aria-label="Direct WhatsApp Contact"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
            </a>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-white hover:bg-white/10 focus:outline-hidden cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div className="xl:hidden bg-black/98 border-b border-white/20 px-4 pt-4 pb-6 shadow-2xl backdrop-blur-xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`text-left px-3 py-2.5 rounded-xl text-sm transition-all cursor-pointer flex items-center justify-between ${
                    isActive
                      ? 'bg-white/15 text-white font-bold italic border-l-3 border-amber-400'
                      : 'text-white/85 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span className="font-semibold italic">{link.name}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-amber-400" />}
                </button>
              );
            })}

            <div className="pt-3 mt-2 border-t border-white/15 flex flex-col gap-2.5">
              <a
                href="https://wa.me/923299866560"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl text-center text-sm font-bold text-white bg-[#25D366] hover:bg-[#20bd5a] shadow-lg flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>WhatsApp: +92 329 9866560</span>
              </a>

              <button
                onClick={() => handleLinkClick('admission')}
                className="w-full py-3 rounded-xl text-center text-sm font-bold italic text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <GraduationCap className="w-4 h-4" />
                <span>Start Online Admission</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

