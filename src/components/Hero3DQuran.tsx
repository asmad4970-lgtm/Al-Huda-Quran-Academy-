import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, MessageCircle, ArrowRight, BookOpen, RotateCcw, Play, CheckCircle2 } from 'lucide-react';

interface Hero3DQuranProps {
  onEnrollClick: () => void;
  onExploreCoursesClick: () => void;
}

export const Hero3DQuran: React.FC<Hero3DQuranProps> = ({
  onEnrollClick,
  onExploreCoursesClick
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isRotating, setIsRotating] = useState(true);
  const [activeView, setActiveView] = useState<'perspective' | 'top' | 'close'>('perspective');

  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    bookGroup: THREE.Group;
    particles: THREE.Points;
    reqId?: number;
    mouseX: number;
    mouseY: number;
    targetRotationY: number;
    targetRotationX: number;
  } | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 450;

    // 1. Scene
    const scene = new THREE.Scene();

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, 3.2, 5.8);
    camera.lookAt(0, 0, 0);

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xfff8ee, 1.4);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xfffaed, 2.8);
    mainLight.position.set(4, 8, 5);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 1024;
    mainLight.shadow.mapSize.height = 1024;
    scene.add(mainLight);

    const goldRimLight = new THREE.PointLight(0xd4af37, 3.2, 12);
    goldRimLight.position.set(-3, 2, -2);
    scene.add(goldRimLight);

    const softEmeraldLight = new THREE.PointLight(0x059669, 1.8, 10);
    softEmeraldLight.position.set(2, -1, 3);
    scene.add(softEmeraldLight);

    // 5. Quran & Rehal 3D Group
    const bookGroup = new THREE.Group();
    scene.add(bookGroup);

    // Create materials
    const darkWoodMat = new THREE.MeshStandardMaterial({
      color: 0x22130c,
      roughness: 0.4,
      metalness: 0.1
    });

    const goldAccentMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      roughness: 0.25,
      metalness: 0.85
    });

    const navyCoverMat = new THREE.MeshStandardMaterial({
      color: 0x091e3a,
      roughness: 0.35,
      metalness: 0.2
    });

    const goldPageEdgeMat = new THREE.MeshStandardMaterial({
      color: 0xe5c158,
      roughness: 0.2,
      metalness: 0.9
    });

    // Generate dynamic high-res Quran page texture with gold arabesque border and authentic Arabic calligraphy
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Cream parchment background
      ctx.fillStyle = '#fcf8ee';
      ctx.fillRect(0, 0, 1024, 1024);

      // Gold ornamental border
      ctx.strokeStyle = '#c5a059';
      ctx.lineWidth = 14;
      ctx.strokeRect(40, 40, 944, 944);

      ctx.strokeStyle = '#065f46';
      ctx.lineWidth = 4;
      ctx.strokeRect(55, 55, 914, 914);

      // Gold inner arch
      ctx.strokeStyle = '#d4af37';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(512, 140, 80, 0, Math.PI);
      ctx.stroke();

      // Bismillah calligraphy
      ctx.fillStyle = '#064e3b';
      ctx.font = 'bold 38px "Amiri", serif';
      ctx.textAlign = 'center';
      ctx.fillText('بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', 512, 190);

      // Ornamental decorative line
      ctx.fillStyle = '#c5a059';
      ctx.font = '22px serif';
      ctx.fillText('❖  ━━━━━━━━  ❖', 512, 230);

      // Quranic Ayahs
      ctx.fillStyle = '#1e293b';
      ctx.font = '27px "Amiri", serif';
      const verses = [
        'اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ ۝',
        'خَلَقَ الْإِنسَانَ مِنْ عَلَقٍ ۝',
        'اقْرَأْ وَرَبُّكَ الْأَكْرَمُ ۝',
        'الَّذِي عَلَّمَ بِالْقَلَمِ ۝',
        'عَلَّمَ الْإِنسَانَ مَا لَمْ يَعْلَمْ ۝',
        'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ۝',
        'الرَّحْمَٰنِ الرَّحِيمِ ۝ مَالِكِ يَوْمِ الدِّينِ ۝',
        'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ۝'
      ];
      verses.forEach((verse, i) => {
        ctx.fillText(verse, 512, 290 + i * 54);
      });

      // Bottom footer medallion
      ctx.strokeStyle = '#c5a059';
      ctx.beginPath();
      ctx.arc(512, 780, 30, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = '#065f46';
      ctx.font = 'bold 18px serif';
      ctx.fillText('سُورَةُ الْعَلَقِ', 512, 786);
    }
    const pageTexture = new THREE.CanvasTexture(canvas);
    pageTexture.anisotropy = 4;

    const pageMat = new THREE.MeshStandardMaterial({
      map: pageTexture,
      roughness: 0.6,
      metalness: 0.05
    });

    // 5A. Rehal (Wooden crossed book stand)
    const legGeo = new THREE.BoxGeometry(2.8, 0.12, 1.8);
    
    // Left slanted plank
    const leg1 = new THREE.Mesh(legGeo, darkWoodMat);
    leg1.rotation.z = Math.PI / 6;
    leg1.position.set(-0.35, -0.15, 0);
    leg1.castShadow = true;
    leg1.receiveShadow = true;
    bookGroup.add(leg1);

    // Right slanted plank
    const leg2 = new THREE.Mesh(legGeo, darkWoodMat);
    leg2.rotation.z = -Math.PI / 6;
    leg2.position.set(0.35, -0.15, 0);
    leg2.castShadow = true;
    leg2.receiveShadow = true;
    bookGroup.add(leg2);

    // Rehal ornamental gold trim
    const trimGeo = new THREE.BoxGeometry(2.85, 0.04, 0.06);
    const trim1 = new THREE.Mesh(trimGeo, goldAccentMat);
    trim1.rotation.z = Math.PI / 6;
    trim1.position.set(-0.35, -0.15, 0.9);
    bookGroup.add(trim1);

    const trim2 = new THREE.Mesh(trimGeo, goldAccentMat);
    trim2.rotation.z = -Math.PI / 6;
    trim2.position.set(0.35, -0.15, 0.9);
    bookGroup.add(trim2);

    // 5B. Quran Book Covers
    const coverGeo = new THREE.BoxGeometry(1.65, 0.08, 2.3);

    // Left Cover
    const leftCover = new THREE.Mesh(coverGeo, navyCoverMat);
    leftCover.position.set(-0.8, 0.58, 0);
    leftCover.rotation.z = Math.PI / 9;
    leftCover.castShadow = true;
    bookGroup.add(leftCover);

    // Right Cover
    const rightCover = new THREE.Mesh(coverGeo, navyCoverMat);
    rightCover.position.set(0.8, 0.58, 0);
    rightCover.rotation.z = -Math.PI / 9;
    rightCover.castShadow = true;
    bookGroup.add(rightCover);

    // Gold spine
    const spineGeo = new THREE.CylinderGeometry(0.12, 0.12, 2.3, 16);
    const spine = new THREE.Mesh(spineGeo, goldAccentMat);
    spine.rotation.x = Math.PI / 2;
    spine.position.set(0, 0.32, 0);
    bookGroup.add(spine);

    // 5C. Quran Gilded Pages Block
    const pageBlockGeo = new THREE.BoxGeometry(1.5, 0.22, 2.18);
    const leftBlock = new THREE.Mesh(pageBlockGeo, goldPageEdgeMat);
    leftBlock.position.set(-0.76, 0.68, 0);
    leftBlock.rotation.z = Math.PI / 9;
    bookGroup.add(leftBlock);

    const rightBlock = new THREE.Mesh(pageBlockGeo, goldPageEdgeMat);
    rightBlock.position.set(0.76, 0.68, 0);
    rightBlock.rotation.z = -Math.PI / 9;
    bookGroup.add(rightBlock);

    // 5D. Open Pages with Sacred Text
    const pageTopGeo = new THREE.PlaneGeometry(1.48, 2.14);
    
    // Left Page
    const leftPage = new THREE.Mesh(pageTopGeo, pageMat);
    leftPage.rotation.x = -Math.PI / 2;
    leftPage.rotation.y = -Math.PI / 9;
    leftPage.position.set(-0.74, 0.81, 0);
    leftPage.receiveShadow = true;
    bookGroup.add(leftPage);

    // Right Page
    const rightPage = new THREE.Mesh(pageTopGeo, pageMat);
    rightPage.rotation.x = -Math.PI / 2;
    rightPage.rotation.y = Math.PI / 9;
    rightPage.position.set(0.74, 0.81, 0);
    rightPage.receiveShadow = true;
    bookGroup.add(rightPage);

    // Green/Gold Silk Bookmark Ribbon
    const ribbonGeo = new THREE.BoxGeometry(0.08, 0.02, 1.4);
    const ribbonMat = new THREE.MeshStandardMaterial({ color: 0x065f46, roughness: 0.3, metalness: 0.4 });
    const ribbon = new THREE.Mesh(ribbonGeo, ribbonMat);
    ribbon.position.set(0.05, 0.75, 0.5);
    ribbon.rotation.x = 0.2;
    bookGroup.add(ribbon);

    // Gold tassel at ribbon end
    const tasselGeo = new THREE.ConeGeometry(0.06, 0.18, 12);
    const tassel = new THREE.Mesh(tasselGeo, goldAccentMat);
    tassel.rotation.x = Math.PI / 2 + 0.3;
    tassel.position.set(0.06, 0.58, 1.25);
    bookGroup.add(tassel);

    // 6. Floating Golden Light Particles
    const particleCount = 70;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 8;
      positions[i + 1] = Math.random() * 5 - 1;
      positions[i + 2] = (Math.random() - 0.5) * 6;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xfde047,
      size: 0.08,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Ground soft shadow receiver plane
    const shadowPlaneGeo = new THREE.PlaneGeometry(10, 10);
    const shadowPlaneMat = new THREE.ShadowMaterial({ opacity: 0.12 });
    const shadowPlane = new THREE.Mesh(shadowPlaneGeo, shadowPlaneMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -1.2;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    // Store references
    sceneRef.current = {
      renderer,
      scene,
      camera,
      bookGroup,
      particles,
      mouseX: 0,
      mouseY: 0,
      targetRotationY: 0.25,
      targetRotationX: 0.15
    };

    // Mouse movement interaction
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      if (sceneRef.current) {
        sceneRef.current.mouseX = x;
        sceneRef.current.mouseY = y;
      }
    };

    container.addEventListener('mousemove', handleMouseMove);

    // Resize handling
    const handleResize = () => {
      if (!container || !sceneRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      sceneRef.current.camera.aspect = w / h;
      sceneRef.current.camera.updateProjectionMatrix();
      sceneRef.current.renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let clock = new THREE.Clock();
    const animate = () => {
      const elapsed = clock.getElapsedTime();
      if (sceneRef.current) {
        const { bookGroup, particles, renderer, scene, camera, mouseX, mouseY } = sceneRef.current;

        // Subtle floating / breathing motion
        bookGroup.position.y = Math.sin(elapsed * 1.2) * 0.08;

        if (isRotating) {
          bookGroup.rotation.y += 0.0035;
        }

        // Smooth interactive mouse tilt
        bookGroup.rotation.x = THREE.MathUtils.lerp(bookGroup.rotation.x, 0.18 + mouseY * 0.15, 0.05);
        if (!isRotating) {
          bookGroup.rotation.y = THREE.MathUtils.lerp(bookGroup.rotation.y, mouseX * 0.4, 0.05);
        }

        // Particle floating
        const positions = particles.geometry.attributes.position.array as Float32Array;
        for (let i = 1; i < positions.length; i += 3) {
          positions[i] += 0.004;
          if (positions[i] > 4) positions[i] = -0.5;
        }
        particles.geometry.attributes.position.needsUpdate = true;
        particles.rotation.y = elapsed * 0.03;

        renderer.render(scene, camera);
      }
      sceneRef.current!.reqId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (sceneRef.current?.reqId) {
        cancelAnimationFrame(sceneRef.current.reqId);
      }
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isRotating]);

  const handleSetView = (view: 'perspective' | 'top' | 'close') => {
    setActiveView(view);
    if (!sceneRef.current) return;
    const { camera, bookGroup } = sceneRef.current;
    if (view === 'perspective') {
      camera.position.set(0, 3.2, 5.8);
      camera.lookAt(0, 0, 0);
      bookGroup.rotation.x = 0.2;
    } else if (view === 'top') {
      camera.position.set(0, 6.0, 1.8);
      camera.lookAt(0, 0, 0);
      bookGroup.rotation.x = 0;
    } else if (view === 'close') {
      camera.position.set(0, 2.2, 3.6);
      camera.lookAt(0, 0.5, 0);
    }
  };

  return (
    <section id="home" className="relative min-h-[92vh] flex items-center pt-28 pb-16 overflow-hidden bg-gradient-to-b from-black via-neutral-950 to-neutral-900 text-white">
      {/* Subtle Islamic Geometric Pattern Backdrop */}
      <div className="absolute inset-0 islamic-pattern-dark opacity-35 pointer-events-none" />

      {/* Decorative Warm Golden Ambient Glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-[32rem] h-[32rem] rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Brand Message, Typography & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Islamic Welcome Kicker & Arabic Greeting */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-neutral-900/90 border border-amber-400/40 shadow-md backdrop-blur-md">
              <span className="font-amiri text-lg text-amber-300 font-bold" dir="rtl">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </span>
              <span className="text-white/20">|</span>
              <span className="text-xs font-bold italic tracking-wide uppercase text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Global Online Quran Academy
              </span>
            </div>

            {/* Main Heading in Bold Italic */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold italic tracking-tight text-white leading-[1.12] font-cinzel">
              Learn Quran Online <br />
              <span className="text-amber-400 relative inline-block drop-shadow-sm">
                with Excellence
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-amber-400/80" viewBox="0 0 200 12" fill="none">
                  <path d="M2 9C50 2 150 2 198 9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-neutral-300 font-normal leading-relaxed max-w-2xl">
              Discover the Beauty of the Holy Quran with Qualified Teachers from the Comfort of Your Home.
            </p>

            {/* Sacred Prophetic Hadith Quote in Black & Gold */}
            <div className="p-4 sm:p-5 rounded-2xl bg-neutral-900/90 border border-amber-400/30 shadow-lg relative overflow-hidden backdrop-blur-sm max-w-xl">
              <div className="absolute top-0 right-0 w-1.5 h-full bg-gradient-to-b from-amber-400 to-amber-600" />
              <p className="font-amiri text-xl sm:text-2xl text-amber-300 font-bold leading-loose text-right mb-1" dir="rtl">
                « خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ »
              </p>
              <p className="text-xs sm:text-sm text-neutral-300 italic font-medium">
                “The best of you are those who learn the Quran and teach it.” — Sahih Al-Bukhari
              </p>
            </div>

            {/* The 3 Core Buttons Specified by the User */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              {/* Button 1: Enroll Now */}
              <button
                onClick={onEnrollClick}
                className="px-6 py-3.5 rounded-xl font-extrabold italic text-black bg-amber-400 hover:bg-amber-300 shadow-xl shadow-amber-400/20 hover:scale-105 transition-all duration-200 flex items-center gap-2 group cursor-pointer"
              >
                <span>Enroll Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Button 2: Contact Us on WhatsApp */}
              <a
                href="https://wa.me/923299866560?text=Assalam%20o%20Alaikum!%20I%20want%20to%20learn%20more%20about%20Al%20Huda%20Quran%20Academy%20courses."
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl font-bold italic text-white bg-[#25D366] hover:bg-[#20bd5a] shadow-lg shadow-[#25D366]/25 hover:shadow-xl transition-all duration-200 flex items-center gap-2.5 group cursor-pointer"
              >
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-4 h-4 text-white fill-white" />
                </div>
                <span>Chat on WhatsApp</span>
              </a>

              {/* Button 3: Explore Our Courses */}
              <button
                onClick={onExploreCoursesClick}
                className="px-5 py-3.5 rounded-xl font-bold italic text-white hover:text-amber-300 hover:bg-neutral-800 bg-neutral-900 border border-white/20 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>Explore Our Courses</span>
              </button>
            </div>

            {/* Trust Markers Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/15">
              <div className="flex items-center gap-2 text-xs font-semibold text-neutral-300">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>1-on-1 Classes</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-neutral-300">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Male & Female Tutors</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-neutral-300">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>3-Day Free Trial</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-neutral-300">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>24/7 Global Timing</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive 3D Holy Quran & Official Emblem Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              
              {/* Outer Decorative Gold Rim Card */}
              <div className="relative rounded-3xl bg-neutral-950 p-2 sm:p-3 border-2 border-amber-400/40 shadow-2xl shadow-amber-400/10 backdrop-blur-md">
                
                {/* Official Crest Header Badge */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/60 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <img
                      src="/logo.png"
                      alt="Al Huda Quran Academy Logo"
                      className="w-10 h-10 object-contain drop-shadow-sm rounded-full bg-white p-0.5 border border-amber-400"
                    />
                    <div>
                      <h3 className="text-xs font-extrabold italic font-cinzel text-white tracking-wide uppercase">Al Huda Quran Academy</h3>
                      <p className="text-[11px] text-amber-400 font-medium">Interactive 3D Quran & Rehal</p>
                    </div>
                  </div>

                  {/* 3D View Modes / Controls */}
                  <div className="flex items-center gap-1 bg-neutral-900 p-1 rounded-lg border border-white/10">
                    <button
                      onClick={() => handleSetView('perspective')}
                      title="Perspective View"
                      className={`px-2 py-1 text-[11px] font-bold rounded-md transition-colors cursor-pointer ${activeView === 'perspective' ? 'bg-amber-400 text-black shadow-xs' : 'text-neutral-400 hover:text-white'}`}
                    >
                      3D
                    </button>
                    <button
                      onClick={() => handleSetView('top')}
                      title="Top View"
                      className={`px-2 py-1 text-[11px] font-bold rounded-md transition-colors cursor-pointer ${activeView === 'top' ? 'bg-amber-400 text-black shadow-xs' : 'text-neutral-400 hover:text-white'}`}
                    >
                      Top
                    </button>
                    <button
                      onClick={() => handleSetView('close')}
                      title="Close-up View"
                      className={`px-2 py-1 text-[11px] font-bold rounded-md transition-colors cursor-pointer ${activeView === 'close' ? 'bg-amber-400 text-black shadow-xs' : 'text-neutral-400 hover:text-white'}`}
                    >
                      Zoom
                    </button>
                  </div>
                </div>

                {/* WebGL Canvas Container */}
                <div
                  ref={mountRef}
                  className="w-full h-[380px] sm:h-[420px] relative cursor-grab active:cursor-grabbing overflow-hidden rounded-2xl bg-radial from-neutral-900 to-black flex items-center justify-center"
                >
                  {/* Gentle helper overlay */}
                  <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/80 border border-white/15 text-[11px] text-neutral-300 shadow-xs backdrop-blur-xs pointer-events-none">
                    <RotateCcw className="w-3 h-3 text-amber-400" />
                    <span>Drag or hover to rotate</span>
                  </div>

                  <button
                    onClick={() => setIsRotating(!isRotating)}
                    className="absolute bottom-3 right-3 z-10 flex items-center gap-1 px-2.5 py-1 rounded-md bg-black/80 hover:bg-neutral-800 border border-white/15 text-[11px] font-bold text-amber-300 shadow-xs backdrop-blur-xs cursor-pointer transition-colors"
                  >
                    <Play className={`w-3 h-3 ${isRotating ? 'text-amber-400 fill-amber-400' : 'text-neutral-500'}`} />
                    <span>{isRotating ? 'Rotating' : 'Paused'}</span>
                  </button>
                </div>

                {/* Subtitle / Trust pill */}
                <div className="px-4 py-2.5 bg-black/60 rounded-xl mt-2 flex items-center justify-between text-xs text-neutral-400 border border-white/10">
                  <span className="font-amiri text-base text-amber-300 font-bold" dir="rtl">
                    اقْرَأْ بِاسْمِ رَبِّكَ
                  </span>
                  <span className="text-[11px] text-amber-400 font-bold italic">Authentic Tajweed & Hifz Program</span>
                </div>

              </div>

              {/* Decorative Corner Islamic Arabesque Badge */}
              <div className="hidden sm:block absolute -bottom-5 -left-5 bg-neutral-900 p-3 rounded-2xl border-2 border-amber-400/60 shadow-2xl max-w-[210px]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-amber-400 text-black flex items-center justify-center font-bold text-xs">
                    ★
                  </div>
                  <div>
                    <p className="text-xs font-bold italic text-white">Certified Tutors</p>
                    <p className="text-[10px] text-amber-300">Ijazah & Tajweed Sanad</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
