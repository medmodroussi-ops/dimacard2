import React, { useState, useEffect, useRef } from 'react';

// --- CUSTOM CURSOR COMPONENT ---
const CustomCursor = () => {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0;
    
    const handleMouseMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      }
    };

    const loop = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      }
      requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', handleMouseMove);
    requestAnimationFrame(loop);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="hidden lg:block">
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-[#c8a96e] rounded-full pointer-events-none z-[9999] mix-blend-difference transition-all duration-100 ease-out" 
      />
      <div 
        ref={ringRef} 
        className="fixed top-0 left-0 w-9 h-9 border border-[#c8a96e] rounded-full pointer-events-none z-[9998] opacity-60 transition-all duration-300 ease-out" 
      />
    </div>
  );
};

// --- SCROLL REVEAL COMPONENT ---
const Reveal = ({ children, className = '', delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {children}
    </div>
  );
};

// --- 3D TILT CARD COMPONENT ---
const TiltCard = () => {
  const [rotation, setRotation] = useState({ x: 10, y: -15 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    setRotation({ 
      x: -y * 20,
      y: x * 20
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 10, y: -15 });
  };

  return (
    <div className="relative z-10 hidden lg:flex justify-center items-center w-full h-[400px]">
      <div className="absolute w-[300px] h-[300px] bg-[#c8a96e] bg-opacity-15 blur-[60px] rounded-full animate-pulse" />
      
      <div 
        ref={cardRef}
        className="perspective-[1200px] w-[380px] h-[240px] cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        <div 
          className="w-full h-full relative transition-transform duration-200 ease-out"
          style={{ 
            transformStyle: 'preserve-3d',
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.6s ease-out'
          }}
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#1a1508] via-[#0f0d08] to-[#1a1508] border border-[#c8a96e] border-opacity-30 p-8 flex flex-col justify-between shadow-2xl overflow-hidden backface-hidden">
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#c8a96e] opacity-10 rounded-full blur-2xl" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#c8a96e] opacity-10 rounded-full blur-2xl" />

            <div className="flex justify-between items-start relative z-10">
              <div className="font-['Syne'] font-extrabold text-xl text-[#c8a96e] tracking-tight">DimaCard</div>
              <div className="flex gap-1 items-center opacity-70">
                <div className="w-2.5 h-2.5 border-2 border-[#c8a96e] rounded-full animate-ping" style={{ animationDuration: '2s' }} />
                <div className="w-4 h-4 border-2 border-[#c8a96e] rounded-full absolute" />
                <div className="w-5.5 h-5.5 border-2 border-[#c8a96e] rounded-full absolute opacity-50" />
              </div>
            </div>

            <div className="relative z-10 mt-8">
              <div className="font-['Syne'] font-bold text-2xl text-[#f5f0e8] mb-1">Youssef Benali</div>
              <div className="text-xs text-[#c8a96e] tracking-widest uppercase">Directeur Commercial</div>
            </div>

            <div className="flex justify-between items-end relative z-10 mt-6">
              <div className="text-[10px] text-[#f5f0e8] opacity-50 leading-relaxed">
                youssef@company.ma<br />
                +212 6 XX XX XX XX
              </div>
              <div className="w-10 h-10 bg-[#c8a96e] opacity-80 grid grid-cols-5 gap-0.5 p-1 rounded-sm">
                {Array.from({ length: 25 }).map((_, i) => (
                  <div key={i} className={`rounded-sm ${Math.random() > 0.5 ? 'bg-[#080808]' : 'bg-transparent'}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP COMPONENT ---
const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#080808] text-[#f5f0e8] font-sans selection:bg-[#c8a96e] selection:text-[#080808] relative overflow-x-hidden">
      
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;1,300;1,400&display=swap');
          body { font-family: 'DM Sans', sans-serif; cursor: none; }
          h1, h2, h3, .font-syne { font-family: 'Syne', sans-serif; }
        `}
      </style>

      {/* Noise Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-[100] opacity-40 mix-blend-overlay"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")` }}
      />

      <CustomCursor />

      {/* NAVIGATION */}
      <nav className={`fixed top-0 left-0 right-0 z-[500] flex justify-between items-center px-6 md:px-12 py-5 transition-all duration-300 ${isScrolled ? 'bg-[#080808]/80 backdrop-blur-md border-b border-[#c8a96e]/10 py-4' : 'bg-transparent'}`}>
        <div className="font-syne font-extrabold text-2xl tracking-tight text-[#f5f0e8]">
          Dima<span className="text-[#c8a96e]">Card</span>
        </div>
        <ul className="hidden md:flex gap-10 items-center">
          <li><a href="#features" className="text-sm font-medium tracking-widest uppercase text-[#f5f0e8]/60 hover:text-[#c8a96e] transition-colors">Fonctionnalités</a></li>
          <li><a href="#how-it-works" className="text-sm font-medium tracking-widest uppercase text-[#f5f0e8]/60 hover:text-[#c8a96e] transition-colors">Processus</a></li>
          <li><a href="#pricing" className="text-sm font-medium tracking-widest uppercase text-[#f5f0e8]/60 hover:text-[#c8a96e] transition-colors">Tarifs</a></li>
        </ul>
        <button className="font-syne font-bold text-xs tracking-widest uppercase bg-[#c8a96e] text-[#080808] px-6 py-3 hover:bg-[#e8c98e] hover:-translate-y-0.5 transition-all cursor-none">
          Commander
        </button>
      </nav>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center px-6 md:px-12 pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_70%_50%,rgba(200,169,110,0.08)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_60%_at_20%_80%,rgba(200,169,110,0.04)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(200,169,110,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(200,169,110,0.03)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_80%_80%_at_70%_50%,black_0%,transparent_80%)]" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <Reveal delay={0}>
              <div className="inline-flex items-center gap-2 border border-[#c8a96e]/20 bg-[#c8a96e]/5 px-4 py-2 text-xs tracking-[0.15em] uppercase text-[#c8a96e] mb-10">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c8a96e] animate-pulse" />
                Technologie NFC
              </div>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="font-syne font-extrabold text-[3rem] md:text-[5vw] leading-[0.95] tracking-tight mb-8">
                La carte<br/>qui parle<br/>
                <span className="text-[#c8a96e] italic font-normal">pour vous.</span>
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="text-lg font-light text-[#f5f0e8]/60 leading-relaxed max-w-md mb-12">
                DimaCard transforme votre identité professionnelle en une expérience numérique instantanée. Un tap suffit pour marquer les esprits.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="flex flex-wrap gap-5 items-center">
                <button className="font-syne font-bold text-sm tracking-wider uppercase bg-[#c8a96e] text-[#080808] px-10 py-5 hover:-translate-y-1 transition-transform relative overflow-hidden group cursor-none">
                  <span className="relative z-10">Commander ma carte</span>
                  <div className="absolute inset-0 bg-[#e8c98e] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                </button>
                <a href="#how-it-works" className="font-syne font-semibold text-sm tracking-wider text-[#f5f0e8] border border-[#c8a96e]/20 px-10 py-5 hover:border-[#c8a96e] hover:text-[#c8a96e] transition-colors cursor-none">
                  Comment ça marche
                </a>
              </div>
            </Reveal>
          </div>
          
          <TiltCard />
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-[#c8a96e]/10 mx-6 md:mx-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-[#c8a96e]/10">
          {[
            { num: "10K+", label: "Cartes actives" },
            { num: "98%", label: "Satisfaction" },
            { num: "3s", label: "Temps de partage" },
            { num: "∞", label: "Mises à jour" }
          ].map((stat, i) => (
            <Reveal key={i} delay={i * 100} className="py-12 px-6 text-center">
              <div className="font-syne font-extrabold text-4xl md:text-5xl text-[#c8a96e] mb-2">{stat.num}</div>
              <div className="text-xs tracking-widest uppercase text-[#f5f0e8]/40">{stat.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <Reveal>
          <div className="flex items-center gap-3 text-xs tracking-[0.2em] uppercase text-[#c8a96e] mb-5">
            Fonctionnalités <div className="h-[1px] w-10 bg-[#c8a96e]/50" />
          </div>
          <h2 className="font-syne font-extrabold text-4xl md:text-6xl tracking-tight mb-16">
            Tout ce dont<br/>vous avez besoin.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-[#c8a96e]/10 border border-[#c8a96e]/10">
          {[
            { 
              icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>, 
              title: "Partage instantané", desc: "Un simple tap sur n'importe quel smartphone NFC. Aucune app requise. Fonctionne avec iOS et Android." 
            },
            { 
              icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>, 
              title: "Profil personnalisable", desc: "Vos liens, vos réseaux, votre portfolio. Modifiez votre profil digital en temps réel depuis votre tableau de bord." 
            },
            { 
              icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg>, 
              title: "Analytics avancés", desc: "Suivez vos vues, taps et clics. Sachez exactement qui a consulté votre profil et depuis quel appareil." 
            },
            { 
              icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>, 
              title: "Design premium", desc: "Carte en métal brossé, PVC haut de gamme ou bambou eco-friendly. Votre image, sublimée à chaque instant." 
            },
            { 
              icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>, 
              title: "CRM intégré", desc: "Synchronisez automatiquement vos nouveaux contacts avec Salesforce, HubSpot ou votre CRM préféré." 
            },
            { 
              icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>, 
              title: "QR Code inclus", desc: "Pour les appareils très anciens sans NFC, votre QR Code est automatiquement généré et toujours à jour." 
            }
          ].map((feat, i) => (
            <Reveal key={i} delay={i * 50}>
              <div className="bg-[#080808] p-10 h-full relative group hover:bg-[#c8a96e]/[0.02] transition-colors overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#c8a96e] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                <div className="absolute top-6 right-8 font-syne font-extrabold text-6xl text-[#c8a96e]/5 pointer-events-none">
                  0{i+1}
                </div>
                <div className="w-12 h-12 border border-[#c8a96e]/20 flex items-center justify-center text-[#f5f0e8]/80 mb-8 group-hover:border-[#c8a96e] group-hover:bg-[#c8a96e]/10 group-hover:text-[#c8a96e] transition-all">
                  {feat.icon}
                </div>
                <h3 className="font-syne font-bold text-xl mb-4">{feat.title}</h3>
                <p className="text-sm font-light text-[#f5f0e8]/50 leading-relaxed">{feat.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS (WITH PHONE MOCKUP) */}
      <section id="how-it-works" className="py-32 px-6 md:px-12 bg-[#c8a96e]/[0.02] border-y border-[#c8a96e]/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <Reveal>
              <div className="flex items-center gap-3 text-xs tracking-[0.2em] uppercase text-[#c8a96e] mb-5">
                Processus <div className="h-[1px] w-10 bg-[#c8a96e]/50" />
              </div>
              <h2 className="font-syne font-extrabold text-4xl md:text-6xl tracking-tight mb-16">
                Simple.<br/>Rapide. Élégant.
              </h2>
            </Reveal>

            <div className="space-y-12">
              {[
                { step: "01", title: "Commandez votre carte", desc: "Choisissez votre matière, personnalisez le design avec votre identité visuelle. Livraison rapide." },
                { step: "02", title: "Créez votre profil digital", desc: "Depuis votre espace DimaCard, renseignez vos infos, ajoutez vos liens et personnalisez votre page." },
                { step: "03", title: "Tappez et partagez", desc: "Approchez votre carte d'un smartphone. En 3 secondes, votre contact reçoit toutes vos informations." }
              ].map((item, i) => (
                <Reveal key={i} delay={i * 100} className="flex gap-6">
                  <div className="font-syne font-extrabold text-sm text-[#c8a96e] tracking-widest pt-1">{item.step}</div>
                  <div>
                    <h3 className="font-syne font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-sm font-light text-[#f5f0e8]/50 leading-relaxed max-w-sm">{item.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* PHONE MOCKUP */}
          <Reveal delay={300} className="flex justify-center relative">
            <div className="absolute bottom-[-20px] w-48 h-20 bg-[#c8a96e]/20 blur-[40px] rounded-full" />
            <div className="w-[260px] bg-[#111] rounded-[40px] border-[3px] border-[#c8a96e]/20 shadow-2xl relative animate-[float_6s_ease-in-out_infinite]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#111] rounded-b-xl z-20" />
              <div className="bg-[#080808] m-1.5 rounded-[32px] h-[520px] border border-[#c8a96e]/10 overflow-hidden relative">
                
                {/* Phone Content (Digital Profile) */}
                <div className="p-6 pt-16 flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#8a6f3e] to-[#c8a96e] flex items-center justify-center font-syne font-extrabold text-3xl text-[#080808] mb-4 shadow-lg">
                    YB
                  </div>
                  <h4 className="font-syne font-bold text-lg mb-1">Youssef Benali</h4>
                  <p className="text-[10px] text-[#c8a96e] tracking-widest uppercase mb-8">Directeur Commercial</p>
                  
                  <div className="w-full space-y-3">
                    <button className="w-full py-3 bg-[#c8a96e]/10 border border-[#c8a96e]/20 rounded-xl text-xs flex items-center justify-center gap-2 hover:bg-[#c8a96e]/20 transition-colors">
                      Enregistrer le contact <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </button>
                    <div className="flex flex-col gap-2 pt-4">
                      <div className="w-full p-3 bg-[#111] rounded-xl text-xs flex items-center gap-3 text-[#f5f0e8]/70">
                        <svg className="text-[#c8a96e]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg> youssef@company.ma
                      </div>
                      <div className="w-full p-3 bg-[#111] rounded-xl text-xs flex items-center gap-3 text-[#f5f0e8]/70">
                        <svg className="text-[#c8a96e]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg> +212 6 XX XX XX XX
                      </div>
                      <div className="w-full p-3 bg-[#111] rounded-xl text-xs flex items-center gap-3 text-[#f5f0e8]/70">
                        <svg className="text-[#c8a96e]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg> @youssef.benali
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            <style dangerouslySetInnerHTML={{__html: `
              @keyframes float {
                0%, 100% { transform: translateY(0) rotate(-2deg); }
                50% { transform: translateY(-15px) rotate(-1deg); }
              }
            `}} />
          </Reveal>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <Reveal className="text-center mb-20">
          <div className="inline-flex items-center gap-3 text-xs tracking-[0.2em] uppercase text-[#c8a96e] mb-5">
            <div className="h-[1px] w-10 bg-[#c8a96e]/50" /> Tarifs <div className="h-[1px] w-10 bg-[#c8a96e]/50" />
          </div>
          <h2 className="font-syne font-extrabold text-4xl md:text-5xl tracking-tight">Investissement unique.</h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-[#c8a96e]/10 border border-[#c8a96e]/10">
          
          {/* Plan 1 */}
          <Reveal delay={0} className="bg-[#080808] p-10 hover:bg-[#111] transition-colors">
            <h3 className="font-syne font-bold text-xs tracking-[0.15em] uppercase text-[#c8a96e] mb-6">Essentiel</h3>
            <div className="font-syne font-extrabold text-5xl mb-2">199<span className="text-2xl text-[#f5f0e8]/50">DH</span></div>
            <p className="text-xs text-[#f5f0e8]/40 mb-10">Paiement unique</p>
            <ul className="space-y-4 mb-10">
              {['1 carte NFC PVC', 'Profil digital illimité', 'QR Code inclus', 'Analytics basiques', 'Support email'].map((feat, i) => (
                <li key={i} className="text-sm font-light text-[#f5f0e8]/70 flex items-center gap-3 border-b border-[#c8a96e]/5 pb-3">
                  <svg className="text-[#c8a96e] min-w-[14px]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> {feat}
                </li>
              ))}
            </ul>
            <button className="w-full py-4 border border-[#c8a96e]/30 font-syne font-bold text-xs tracking-widest uppercase hover:border-[#c8a96e] hover:text-[#c8a96e] transition-colors cursor-none">
              Commencer
            </button>
          </Reveal>

          {/* Plan 2 (Featured) */}
          <Reveal delay={100} className="bg-[#c8a96e]/5 p-10 relative">
            <div className="absolute top-6 right-6 bg-[#c8a96e] text-[#080808] text-[10px] font-bold px-3 py-1 uppercase tracking-widest">Populaire</div>
            <h3 className="font-syne font-bold text-xs tracking-[0.15em] uppercase text-[#c8a96e] mb-6">Pro</h3>
            <div className="font-syne font-extrabold text-5xl mb-2">349<span className="text-2xl text-[#f5f0e8]/50">DH</span></div>
            <p className="text-xs text-[#f5f0e8]/40 mb-10">Paiement unique</p>
            <ul className="space-y-4 mb-10">
              {['1 carte NFC Métal', 'Profil digital avancé', 'QR Code dynamique', 'Analytics complets', 'Intégrations CRM'].map((feat, i) => (
                <li key={i} className="text-sm font-light text-[#f5f0e8]/70 flex items-center gap-3 border-b border-[#c8a96e]/5 pb-3">
                  <svg className="text-[#c8a96e] min-w-[14px]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> {feat}
                </li>
              ))}
            </ul>
            <button className="w-full py-4 bg-[#c8a96e] text-[#080808] font-syne font-bold text-xs tracking-widest uppercase hover:bg-[#e8c98e] hover:-translate-y-1 transition-transform cursor-none">
              Commander
            </button>
          </Reveal>

          {/* Plan 3 */}
          <Reveal delay={200} className="bg-[#080808] p-10 hover:bg-[#111] transition-colors">
            <h3 className="font-syne font-bold text-xs tracking-[0.15em] uppercase text-[#c8a96e] mb-6">Équipe</h3>
            <div className="font-syne font-extrabold text-4xl mb-2 mt-2">Sur devis</div>
            <p className="text-xs text-[#f5f0e8]/40 mb-10 mt-4">À partir de 5 cartes</p>
            <ul className="space-y-4 mb-10">
              {['Cartes personnalisées', 'Dashboard équipe', 'Branding entreprise', 'Accès API', 'Account manager dédié'].map((feat, i) => (
                <li key={i} className="text-sm font-light text-[#f5f0e8]/70 flex items-center gap-3 border-b border-[#c8a96e]/5 pb-3">
                  <svg className="text-[#c8a96e] min-w-[14px]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> {feat}
                </li>
              ))}
            </ul>
            <button className="w-full py-4 border border-[#c8a96e]/30 font-syne font-bold text-xs tracking-widest uppercase hover:border-[#c8a96e] hover:text-[#c8a96e] transition-colors cursor-none">
              Nous contacter
            </button>
          </Reveal>

        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-32 px-6 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(200,169,110,0.1)_0%,transparent_65%)] rounded-full pointer-events-none" />
        
        <Reveal>
          <h2 className="font-syne font-extrabold text-4xl md:text-[5rem] leading-[0.95] tracking-tight mb-8 relative z-10">
            Prêt à passer<br/>
            <span className="text-[#c8a96e] italic font-normal">au niveau supérieur ?</span>
          </h2>
          <p className="text-lg font-light text-[#f5f0e8]/50 max-w-lg mx-auto mb-12 relative z-10">
            Rejoignez plus de 10 000 professionnels qui ont déjà transformé leur manière de faire du networking.
          </p>
          <div className="flex flex-wrap justify-center gap-5 relative z-10">
            <button className="font-syne font-bold text-sm tracking-wider uppercase bg-[#c8a96e] text-[#080808] px-10 py-5 hover:bg-[#e8c98e] hover:-translate-y-1 transition-transform cursor-none">
              Commander DimaCard
            </button>
          </div>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#c8a96e]/10 px-6 md:px-12 py-10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-[#f5f0e8]/40">
        <div>© 2026 DimaCard. Tous droits réservés.</div>
        <ul className="flex gap-8 uppercase tracking-widest">
          <li><a href="#" className="hover:text-[#c8a96e] transition-colors cursor-none">Confidentialité</a></li>
          <li><a href="#" className="hover:text-[#c8a96e] transition-colors cursor-none">CGU</a></li>
          <li><a href="#" className="hover:text-[#c8a96e] transition-colors cursor-none">Contact</a></li>
        </ul>
      </footer>

    </div>
  );
};

export default App;