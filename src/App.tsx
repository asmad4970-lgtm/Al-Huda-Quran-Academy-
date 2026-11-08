import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero3DQuran } from './components/Hero3DQuran';
import { AboutSection } from './components/AboutSection';
import { CoursesSection } from './components/CoursesSection';
import { TeachersSection } from './components/TeachersSection';
import { GallerySection } from './components/GallerySection';
import { VideoSection } from './components/VideoSection';
import { AdmissionSection } from './components/AdmissionSection';
import { ContactSection } from './components/ContactSection';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';
import { AdminPanel } from './components/AdminPanel';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [preselectedCourse, setPreselectedCourse] = useState<string>('');
  const [facebookUrl, setFacebookUrl] = useState<string>(() => {
    return localStorage.getItem('alhuda_fb_url') || 'https://facebook.com/alhudaquranacademy';
  });

  const handleUpdateFacebookUrl = (newUrl: string) => {
    setFacebookUrl(newUrl);
    localStorage.setItem('alhuda_fb_url', newUrl);
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const navOffset = 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleSelectCourseForAdmission = (courseTitle: string) => {
    setPreselectedCourse(courseTitle);
    handleNavigate('admission');
  };

  // Scroll spy to update active section in navbar
  useEffect(() => {
    const sections = ['home', 'about', 'courses', 'teachers', 'gallery', 'videos', 'admission', 'contact'];
    
    const handleScroll = () => {
      const scrollY = window.pageYOffset;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop - 120;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col selection:bg-amber-500/30 selection:text-amber-300 font-sans">
      {/* 1. Global Navigation Bar with 5-click logo trigger */}
      <Navbar
        onNavigate={handleNavigate}
        activeSection={activeSection}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* 2. Main Body with All Core Sections */}
      <main className="flex-1 bg-black">
        {/* Hero Section with Interactive 3D Holy Quran */}
        <Hero3DQuran
          onEnrollClick={() => handleNavigate('admission')}
          onExploreCoursesClick={() => handleNavigate('courses')}
        />

        {/* About Al Huda Quran Academy Section */}
        <AboutSection
          onEnrollClick={() => handleNavigate('admission')}
        />

        {/* Our Courses Section */}
        <CoursesSection
          onSelectCourseForAdmission={handleSelectCourseForAdmission}
        />

        {/* Our Teachers Section */}
        <TeachersSection />

        {/* Gallery Section */}
        <GallerySection />

        {/* Videos Section */}
        <VideoSection />

        {/* Online Admission Application Section */}
        <AdmissionSection
          preselectedCourse={preselectedCourse}
          onClearPreselectedCourse={() => setPreselectedCourse('')}
        />

        {/* Contact Us Section */}
        <ContactSection
          facebookUrl={facebookUrl}
          onUpdateFacebookUrl={handleUpdateFacebookUrl}
        />
      </main>

      {/* 3. Global Floating WhatsApp Button */}
      <FloatingWhatsApp />

      {/* 4. Islamic Footer */}
      <Footer
        facebookUrl={facebookUrl}
        onNavigate={handleNavigate}
        onCourseClick={handleSelectCourseForAdmission}
      />

      {/* 5. Secret Admin Panel Modal (Activated by 5 clicks on Academy Logo) */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        facebookUrl={facebookUrl}
        onUpdateFacebookUrl={handleUpdateFacebookUrl}
      />
    </div>
  );
}
