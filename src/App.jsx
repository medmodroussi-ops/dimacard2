import { useState, useEffect, useRef } from "react";

// ─── Utility: useInView hook ───────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// ─── Navbar ────────────────────────────────────────────────────────────────
function Navbar({ dark, toggleDark }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const links = [
    { label: "Fonctionnalités", href: "#features" },
    { label: "Comment ça marche", href: "#how-it-works" },
    { label: "Tarifs", href: "#pricing" },
    { label: "Avis", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ];
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "py-3 bg-white/90 dark:bg-black/90 backdrop-blur-xl shadow-sm border-b border-black/5 dark:border-white/10" : "py-5 bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-md">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7v10l10 5 10-5V7L12 2z" fill="white"/></svg>
          </div>
          <span className="font-bold text-xl tracking-tight text-black dark:text-white">Dima<span className="text-amber-500">card</span></span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a key={l.label} href={l.href} className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">{l.label}</a>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-3">
          <button onClick={toggleDark} className="p-2 rounded-full text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors">
            {dark ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            )}
          </button>
          <a href="#pricing" className="px-4 py-2 text-sm font-semibold rounded-full bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">Commander</a>
        </div>
        <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
          <div className={`w-5 h-0.5 bg-black dark:bg-white mb-1 transition-all ${open ? "rotate-45 translate-y-1.5" : ""}`}/>
          <div className={`w-5 h-0.5 bg-black dark:bg-white mb-1 transition-all ${open ? "opacity-0" : ""}`}/>
          <div className={`w-5 h-0.5 bg-black dark:bg-white transition-all ${open ? "-rotate-45 -translate-y-1.5" : ""}`}/>
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-white dark:bg-black border-t border-gray-100 dark:border-white/10 px-6 py-4 flex flex-col gap-4">
          {links.map(l => <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="text-base font-medium text-gray-700 dark:text-gray-300">{l.label}</a>)}
          <a href="#pricing" onClick={() => setOpen(false)} className="mt-2 px-5 py-2.5 text-sm font-semibold rounded-full bg-black dark:bg-white text-white dark:text-black text-center">Commander</a>
        </div>
      )}
    </nav>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-black pt-20">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-amber-400/10 dark:bg-amber-500/10 blur-[120px]"/>
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-blue-400/5 dark:bg-blue-400/5 blur-[100px]"/>
        <svg className="absolute inset-0 w-full h-full opacity-[0.03] dark:opacity-[0.04]" xmlns="http://www.w3.org/2000/svg"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter><rect width="100%" height="100%" filter="url(#noise)"/></svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center py-20">
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/40 mb-6 animate-fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"/>
            <span className="text-xs font-medium text-amber-700 dark:text-amber-400">L'avenir est sans contact</span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight text-black dark:text-white mb-6">
            L'Avenir<br/>des Cartes<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">de Visite.</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-500 dark:text-gray-400 max-w-md mx-auto lg:mx-0 mb-10 leading-relaxed">
            Partagez vos coordonnées en un seul geste. Une carte. Des connexions infinies. Sans papier, sans friction, sans limite.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
            <a href="#pricing" className="group px-8 py-4 rounded-2xl bg-black dark:bg-white text-white dark:text-black font-semibold text-sm hover:scale-[1.02] transition-all duration-200 shadow-xl shadow-black/20 flex items-center justify-center gap-2">
              Obtenir ma Dimacard
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="#how-it-works" className="px-8 py-4 rounded-2xl border border-gray-200 dark:border-white/15 text-black dark:text-white font-semibold text-sm hover:bg-gray-50 dark:hover:bg-white/5 transition-all duration-200 flex items-center justify-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8" fill="currentColor"/></svg>
              Comment ça marche
            </a>
          </div>
          <div className="mt-12 flex items-center gap-6 justify-center lg:justify-start">
            <div className="flex -space-x-2">
              {["#F59E0B","#3B82F6","#10B981","#8B5CF6","#EF4444"].map((c,i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-black" style={{background:c}}/>
              ))}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400"><strong className="text-black dark:text-white">2 400+</strong> professionnels font confiance à Dimacard</p>
          </div>
        </div>

        <div className="relative flex justify-center lg:justify-end">
          <div className="relative w-80 h-80 sm:w-96 sm:h-96">
            <div className="absolute inset-0 animate-float">
              <div className="w-full h-48 rounded-3xl bg-gradient-to-br from-gray-900 to-black shadow-2xl flex flex-col justify-between p-7 border border-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-amber-500/10 blur-2xl"/>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="w-10 h-7 rounded-md bg-gradient-to-br from-amber-300 to-amber-500 mb-3 opacity-90"/>
                    <p className="text-white font-bold text-lg tracking-tight">Alexandre Martin</p>
                    <p className="text-gray-400 text-xs">Designer Produit · Dimacard</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white" opacity="0.8"><path d="M11 1H4a2 2 0 00-2 2v18a2 2 0 002 2h7v-2H4V3h7V1zM13 1v2h7v18h-7v2h7a2 2 0 002-2V3a2 2 0 00-2-2h-7z"/></svg>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[...Array(3)].map((_,i) => <div key={i} className="w-1 h-1 rounded-full bg-amber-400"/>)}
                  </div>
                  <span className="text-gray-500 text-xs tracking-widest">NFC ACTIVÉ</span>
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 right-4 w-40 animate-float-delayed">
              <div className="w-full bg-gray-900 rounded-[2rem] p-2 shadow-2xl border border-white/10">
                <div className="bg-white dark:bg-gray-100 rounded-[1.5rem] overflow-hidden aspect-[9/16] flex flex-col">
                  <div className="bg-black h-6 flex items-center justify-center">
                    <div className="w-16 h-1.5 bg-gray-800 rounded-full"/>
                  </div>
                  <div className="flex-1 p-3 bg-gradient-to-b from-gray-50 to-white">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 mx-auto mb-2 shadow-md"/>
                    <div className="text-center">
                      <div className="h-2 w-20 bg-gray-800 rounded mx-auto mb-1"/>
                      <div className="h-1.5 w-16 bg-gray-300 rounded mx-auto mb-3"/>
                    </div>
                    <div className="grid grid-cols-3 gap-1 mb-2">
                      {[...Array(6)].map((_,i) => <div key={i} className="h-6 rounded-lg bg-gray-100"/>)}
                    </div>
                    <div className="h-6 rounded-lg bg-amber-400/20 border border-amber-300/50"/>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute top-8 right-0 w-16 h-16 animate-ping-slow">
              <div className="w-full h-full rounded-full border-2 border-amber-400/40 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full border-2 border-amber-400/60 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-amber-400/80"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-xs tracking-widest uppercase text-gray-400">Défiler</span>
        <div className="w-px h-10 bg-gradient-to-b from-gray-400 to-transparent animate-pulse"/>
      </div>
    </section>
  );
}

// ─── Features ─────────────────────────────────────────────────────────────
const features = [
  { icon: "📡", title: "Partage NFC en un geste", desc: "Un simple tap transfère votre profil complet — nom, liens, réseaux sociaux — vers n'importe quel smartphone en quelques secondes. Sans application." },
  { icon: "📷", title: "Partage par QR code", desc: "Pas de NFC ? Aucun problème. Votre QR code unique permet à tout le monde de scanner et enregistrer vos infos instantanément." },
  { icon: "📱", title: "Compatible tous les téléphones", desc: "Fonctionne avec iPhone, Android et tous les smartphones modernes. 100% multi-plateforme, sans configuration." },
  { icon: "🌱", title: "Écologique", desc: "Une Dimacard remplace des milliers de cartes en papier. Meilleur pour votre réseau et pour la planète." },
  { icon: "🎨", title: "Design personnalisé", desc: "Cartes entièrement personnalisées avec votre logo, vos couleurs et votre identité — finition mat ou brillant premium." },
  { icon: "⚡", title: "Mises à jour en temps réel", desc: "Modifiez votre profil à tout moment. Vos contacts voient toujours vos dernières infos — sans jamais réimprimer." },
];

function Features() {
  const [ref, inView] = useInView();
  return (
    <section id="features" ref={ref} className="py-28 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-amber-500 mb-4 block">Pourquoi Dimacard</span>
          <h2 className="text-4xl sm:text-5xl font-black text-black dark:text-white leading-tight mb-4">Tout ce qu'il vous faut.<br/>Rien de superflu.</h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto">Conçu pour les professionnels modernes qui avancent vite et laissent une impression durable.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div key={i} className={`group p-7 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-white/5 hover:border-amber-200 dark:hover:border-amber-500/20 hover:shadow-xl transition-all duration-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">{f.icon}</div>
              <h3 className="font-bold text-base text-black dark:text-white mb-2">{f.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────
const steps = [
  { n: "01", icon: "🪄", title: "Approchez votre Dimacard", desc: "Tenez votre Dimacard près d'un téléphone. La puce NFC s'active instantanément — sans déverrouiller, sans chercher." },
  { n: "02", icon: "⚡", title: "Votre profil s'ouvre", desc: "Votre profil digital s'affiche dans le navigateur. Nom, poste, liens et coordonnées réunis en un seul endroit." },
  { n: "03", icon: "🤝", title: "Partagez et connectez", desc: "Ils enregistrent votre contact, suivent vos réseaux ou visitent votre site — tout depuis un simple tap." },
];

function HowItWorks() {
  const [ref, inView] = useInView();
  return (
    <section id="how-it-works" ref={ref} className="py-28 bg-white dark:bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className={`text-center mb-20 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-amber-500 mb-4 block">Simple comme 1-2-3</span>
          <h2 className="text-4xl sm:text-5xl font-black text-black dark:text-white">Comment ça marche</h2>
        </div>
        <div className="relative grid md:grid-cols-3 gap-8">
          <div className="hidden md:block absolute top-10 left-1/6 right-1/6 h-px bg-gradient-to-r from-transparent via-amber-300/60 to-transparent"/>
          {steps.map((s, i) => (
            <div key={i} className={`relative text-center transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`} style={{ transitionDelay: `${i * 150}ms` }}>
              <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/10 border border-amber-200/60 dark:border-amber-700/30 mb-6 shadow-xl">
                <span className="text-3xl">{s.icon}</span>
                <span className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-black dark:bg-white text-white dark:text-black text-xs font-black flex items-center justify-center">{s.n}</span>
              </div>
              <h3 className="font-bold text-xl text-black dark:text-white mb-3">{s.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm max-w-xs mx-auto">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Product Showcase ──────────────────────────────────────────────────────
function Showcase() {
  const [ref, inView] = useInView();
  return (
    <section className="py-28 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} ref={ref}>
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-amber-500 mb-4 block">Le Produit</span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">Conçu pour impressionner</h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">Matériaux premium. Intelligence digitale. Élégance physique.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className={`group p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-amber-500/30 transition-all duration-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`} style={{ transitionDelay: "0ms" }}>
            <div className="w-full aspect-video rounded-2xl bg-gradient-to-br from-gray-800 to-black border border-white/10 mb-6 flex items-center justify-center relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent"/>
              <div className="text-center">
                <div className="w-16 h-11 rounded-lg bg-gradient-to-br from-amber-300 to-amber-600 mx-auto mb-3 shadow-xl opacity-90"/>
                <p className="text-white font-bold text-sm">Alexandre Martin</p>
                <p className="text-gray-500 text-xs">alexandre@entreprise.fr</p>
              </div>
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Carte de visite NFC</h3>
            <p className="text-gray-500 text-sm leading-relaxed">Finition noire mate premium avec puce NFC intégrée et accents dorés en feuille d'or.</p>
          </div>
          <div className={`group p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-amber-500/30 transition-all duration-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`} style={{ transitionDelay: "120ms" }}>
            <div className="w-full aspect-video rounded-2xl bg-gradient-to-b from-gray-100 to-white mb-6 flex items-center justify-center overflow-hidden shadow-2xl">
              <div className="w-full h-full p-4 flex flex-col items-center justify-center gap-2">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg"/>
                <div className="text-center">
                  <p className="text-gray-900 font-bold text-sm">Alexandre Martin</p>
                  <p className="text-gray-400 text-xs">Designer Produit</p>
                </div>
                <div className="flex gap-2">
                  {["🔗","in","𝕏"].map((ic, i) => (
                    <div key={i} className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-xs">{ic}</div>
                  ))}
                </div>
              </div>
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Profil digital</h3>
            <p className="text-gray-500 text-sm leading-relaxed">Magnifique page de profil optimisée mobile avec tous vos liens au même endroit.</p>
          </div>
          <div className={`group p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-amber-500/30 transition-all duration-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`} style={{ transitionDelay: "240ms" }}>
            <div className="w-full aspect-video rounded-2xl bg-white mb-6 flex items-center justify-center shadow-2xl">
              <div className="grid grid-cols-7 gap-0.5 p-4">
                {[...Array(49)].map((_, i) => (
                  <div key={i} className="w-3 h-3 rounded-sm"
                    style={{ background: ([0,1,2,3,4,5,6,7,13,14,20,21,27,28,42,43,44,45,46,47,48].includes(i) ? "#000" : Math.random() > 0.5 ? "#000" : "#fff") }}
                  />
                ))}
              </div>
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Partage par QR code</h3>
            <p className="text-gray-500 text-sm leading-relaxed">Scannez partout — fonctionne hors ligne, dans les supports imprimés ou dans votre signature email.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── For Who ───────────────────────────────────────────────────────────────
const audiences = [
  { emoji: "🚀", role: "Entrepreneurs", desc: "Faites une première impression marquante à chaque pitch et événement de networking." },
  { emoji: "💼", role: "Équipes commerciales", desc: "Concluez des deals plus vite. Partagez vos infos et suivez chaque connexion." },
  { emoji: "🏢", role: "Entreprises", desc: "Unifiez l'image de toute votre équipe avec une identité digitale cohérente." },
  { emoji: "🎨", role: "Freelances", desc: "Présentez votre portfolio et décrochez des missions en un simple tap." },
];

function ForWho() {
  const [ref, inView] = useInView();
  return (
    <section className="py-28 bg-gray-50 dark:bg-gray-950" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-amber-500 mb-4 block">Pour tout le monde</span>
          <h2 className="text-4xl sm:text-5xl font-black text-black dark:text-white">Qui utilise Dimacard ?</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {audiences.map((a, i) => (
            <div key={i} className={`group text-center p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-white/5 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="text-4xl mb-5 group-hover:scale-125 transition-transform duration-300 inline-block">{a.emoji}</div>
              <h3 className="font-bold text-black dark:text-white mb-2">{a.role}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Pricing ───────────────────────────────────────────────────────────────
const plans = [
  {
    name: "Starter", price: "29", period: "paiement unique", popular: false,
    features: ["1 carte NFC", "Page de profil digital", "Partage QR code", "Statistiques de base", "Support par email"],
    cta: "Commencer",
  },
  {
    name: "Pro", price: "59", period: "paiement unique", popular: true,
    features: ["1 carte NFC premium", "Design de profil personnalisé", "Lien avec domaine personnalisé", "Statistiques avancées", "Support prioritaire", "Mises à jour illimitées"],
    cta: "Passer Pro",
  },
  {
    name: "Business", price: "199", period: "par équipe / an", popular: false,
    features: ["10 cartes NFC", "Tableau de bord équipe", "Personnalisation de marque", "Intégrations CRM", "Analytiques équipe", "Responsable dédié"],
    cta: "Contacter les ventes",
  },
];

function Pricing() {
  const [ref, inView] = useInView();
  return (
    <section id="pricing" ref={ref} className="py-28 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-amber-500 mb-4 block">Tarifs simples</span>
          <h2 className="text-4xl sm:text-5xl font-black text-black dark:text-white mb-4">Investissez une fois.<br/>Connectez pour toujours.</h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg">Pas d'abonnement. Pas de réimpression. Juste des résultats.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 items-start max-w-5xl mx-auto">
          {plans.map((p, i) => (
            <div key={i} className={`relative rounded-3xl p-8 border transition-all duration-700 ${p.popular ? "bg-black dark:bg-white border-black dark:border-white shadow-2xl scale-[1.03]" : "bg-white dark:bg-gray-900 border-gray-100 dark:border-white/5 hover:shadow-xl"} ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: `${i * 100}ms` }}>
              {p.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-amber-500 text-white text-xs font-bold">Le plus populaire</div>}
              <h3 className={`font-bold text-lg mb-1 ${p.popular ? "text-white dark:text-black" : "text-black dark:text-white"}`}>{p.name}</h3>
              <div className="mb-6">
                <span className={`text-5xl font-black ${p.popular ? "text-white dark:text-black" : "text-black dark:text-white"}`}>{p.price}€</span>
                <span className={`text-sm ml-2 ${p.popular ? "text-gray-300 dark:text-gray-600" : "text-gray-400"}`}>{p.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {p.features.map((f, j) => (
                  <li key={j} className={`flex items-center gap-3 text-sm ${p.popular ? "text-gray-300 dark:text-gray-700" : "text-gray-600 dark:text-gray-400"}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={p.popular ? "#F59E0B" : "#10B981"} strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3.5 rounded-2xl font-semibold text-sm transition-all duration-200 ${p.popular ? "bg-amber-500 text-white hover:bg-amber-400" : "bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"}`}>
                {p.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ──────────────────────────────────────────────────────────
const testimonials = [
  { name: "Sophie Mercier", role: "Designer UX @ Figma", avatar: "SM", text: "J'ai distribué plus de 500 cartes papier dans ma carrière. Depuis que je suis passée à Dimacard, j'ai beaucoup plus de suites — les gens se souviennent vraiment de moi." },
  { name: "Marc Lebrun", role: "Fondateur @ Buildify", avatar: "ML", text: "J'ai conclu trois contrats lors d'une conférence le mois dernier rien qu'en tapant ma carte. Le facteur wow à lui seul vaut chaque centime." },
  { name: "Priya Nair", role: "Directrice des ventes @ Stripe", avatar: "PN", text: "Nous avons déployé Dimacard pour toute notre équipe. L'intégration a été instantanée et nos leads ont augmenté de 40 %. C'est une évidence." },
  { name: "Thomas Krause", role: "Développeur Freelance", avatar: "TK", text: "Minimaliste, élégant, efficace. Mon lien portfolio s'ouvre immédiatement quand quelqu'un tape la carte. Pas d'appli nécessaire. De la pure magie." },
];

function Testimonials() {
  const [ref, inView] = useInView();
  const colors = ["#F59E0B","#3B82F6","#10B981","#8B5CF6"];
  return (
    <section id="testimonials" ref={ref} className="py-28 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-amber-500 mb-4 block">Ils nous font confiance</span>
          <h2 className="text-4xl sm:text-5xl font-black text-black dark:text-white">Ils adorent Dimacard</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((t, i) => (
            <div key={i} className={`p-7 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-white/5 transition-all duration-700 hover:shadow-xl ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="flex mb-4">
                {[...Array(5)].map((_,s) => <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill="#F59E0B"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-6">« {t.text} »</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: colors[i] }}>{t.avatar}</div>
                <div>
                  <p className="font-semibold text-sm text-black dark:text-white">{t.name}</p>
                  <p className="text-gray-400 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact Form ──────────────────────────────────────────────────────────
function Contact() {
  const [ref, inView] = useInView();
  const [form, setForm] = useState({ nom: "", email: "", sujet: "", message: "" });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nom || !form.email || !form.message) return;
    setStatus("sending");
    setTimeout(() => setStatus("success"), 1500);
  };

  const inputClass = "w-full px-4 py-3.5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 dark:focus:border-amber-500 transition-all duration-200";

  return (
    <section id="contact" ref={ref} className="py-28 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left – Info */}
          <div className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-amber-500 mb-4 block">Nous contacter</span>
            <h2 className="text-4xl sm:text-5xl font-black text-black dark:text-white mb-6 leading-tight">
              Une question ?<br/>On vous répond.
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed mb-10">
              Notre équipe est disponible du lundi au vendredi. Nous répondons généralement sous 24h.
            </p>

            <div className="space-y-5">
              {[
                {
                  icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
                  label: "Email", value: "bonjour@dimacard.io",
                },
                {
                  icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.96a16 16 0 006.06 6.06l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>,
                  label: "Téléphone", value: "+33 1 23 45 67 89",
                },
                {
                  icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
                  label: "Adresse", value: "12 rue de l'Innovation, 75008 Paris",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-11 h-11 rounded-2xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">{item.label}</p>
                    <p className="text-sm font-medium text-black dark:text-white">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-10 border-t border-gray-100 dark:border-white/10">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Suivez-nous</p>
              <div className="flex gap-3">
                {["𝕏","in","ig"].map((s, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-full border border-gray-200 dark:border-white/10 hover:border-amber-400 dark:hover:border-amber-500 flex items-center justify-center text-sm text-gray-500 dark:text-gray-400 hover:text-amber-500 dark:hover:text-amber-400 transition-all duration-200">{s}</a>
                ))}
              </div>
            </div>
          </div>

          {/* Right – Form */}
          <div className={`transition-all duration-700 delay-150 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-3xl p-8 border border-gray-100 dark:border-white/5">
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center py-16 text-center gap-5">
                  <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                  </div>
                  <h3 className="text-xl font-black text-black dark:text-white">Message envoyé !</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xs">Merci pour votre message. Notre équipe vous répondra dans les 24h.</p>
                  <button onClick={() => { setStatus("idle"); setForm({ nom: "", email: "", sujet: "", message: "" }); }}
                    className="mt-2 px-6 py-2.5 rounded-xl bg-black dark:bg-white text-white dark:text-black text-sm font-semibold hover:bg-gray-800 transition-colors">
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-xl font-black text-black dark:text-white mb-6">Envoyez-nous un message</h3>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Nom complet *</label>
                      <input name="nom" value={form.nom} onChange={handleChange} placeholder="Alexandre Martin" className={inputClass} required />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Email *</label>
                      <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="alex@exemple.fr" className={inputClass} required />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Sujet</label>
                    <select name="sujet" value={form.sujet} onChange={handleChange} className={inputClass}>
                      <option value="">Choisissez un sujet</option>
                      <option value="commande">Commander une Dimacard</option>
                      <option value="entreprise">Solution entreprise</option>
                      <option value="support">Support technique</option>
                      <option value="partenariat">Partenariat</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Message *</label>
                    <textarea name="message" value={form.message} onChange={handleChange} rows={5} placeholder="Décrivez votre besoin ou posez votre question..." className={`${inputClass} resize-none`} required />
                  </div>

                  <button type="submit" disabled={status === "sending"}
                    className="w-full py-4 rounded-2xl bg-black dark:bg-white text-white dark:text-black font-bold text-sm hover:bg-gray-800 dark:hover:bg-gray-200 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 shadow-xl shadow-black/10">
                    {status === "sending" ? (
                      <>
                        <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        Envoyer le message
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/></svg>
                      </>
                    )}
                  </button>

                  <p className="text-xs text-gray-400 text-center">En soumettant ce formulaire, vous acceptez notre <a href="#" className="underline hover:text-amber-500 transition-colors">politique de confidentialité</a>.</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CTA ───────────────────────────────────────────────────────────────────
function CTA() {
  const [ref, inView] = useInView();
  return (
    <section className="py-28 bg-black relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-amber-500/10 blur-[120px]"/>
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-amber-600/5 blur-[80px]"/>
      </div>
      <div className={`relative z-10 max-w-3xl mx-auto px-6 text-center transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <span className="text-xs font-bold tracking-[0.2em] uppercase text-amber-500 mb-4 block">Prêt à passer au niveau supérieur ?</span>
        <h2 className="text-5xl sm:text-6xl font-black text-white mb-6 leading-tight">Révolutionnez votre<br/>networking avec <span className="text-amber-400">Dimacard</span>.</h2>
        <p className="text-gray-400 text-xl mb-10">Rejoignez 2 400+ professionnels qui créent des connexions plus intelligentes.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#pricing" className="group px-8 py-4 rounded-2xl bg-amber-500 text-white font-bold text-sm hover:bg-amber-400 transition-all duration-200 shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2">
            Obtenir ma Dimacard
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
          <a href="#contact" className="px-8 py-4 rounded-2xl border border-white/15 text-white font-semibold text-sm hover:bg-white/5 transition-all duration-200 flex items-center justify-center gap-2">
            Nous contacter
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7v10l10 5 10-5V7L12 2z" fill="white"/></svg>
              </div>
              <span className="font-bold text-white">Dima<span className="text-amber-500">card</span></span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-5">La carte de visite NFC la plus intelligente pour les professionnels modernes.</p>
            <div className="flex gap-3">
              {["𝕏","in","ig","fb"].map((s, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-xs text-gray-400 hover:text-white transition-colors">{s}</a>
              ))}
            </div>
          </div>
          {[
            { title: "Produit", links: ["Fonctionnalités", "Tarifs", "Comment ça marche", "Présentation"] },
            { title: "Entreprise", links: ["À propos", "Blog", "Carrières", "Presse"] },
            { title: "Légal", links: ["Politique de confidentialité", "Conditions d'utilisation", "Politique cookies", "RGPD"] },
          ].map((col, i) => (
            <div key={i}>
              <h4 className="text-white font-semibold text-sm mb-4">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map(l => <li key={l}><a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">{l}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm">© 2025 Dimacard. Tous droits réservés.</p>
          <p className="text-gray-600 text-sm">Fait avec ❤️ pour les networkers modernes</p>
        </div>
      </div>
    </footer>
  );
}

// ─── App ───────────────────────────────────────────────────────────────────
export default function App() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);
  return (
    <div className={`font-sans antialiased ${dark ? "dark" : ""}`}>
      <Navbar dark={dark} toggleDark={() => setDark(d => !d)} />
      <Hero />
      <Features />
      <HowItWorks />
      <Showcase />
      <ForWho />
      <Pricing />
      <Testimonials />
      <Contact />
      <CTA />
      <Footer />
    </div>
  );
}