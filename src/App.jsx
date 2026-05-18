"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Icons from "lucide-react";

// Import universel propre sans conflit Git
const { Zap, Smartphone, Share2, Nfc, UserPlus, Mail, Phone, Globe, MapPin, CreditCard, BarChart, Palette, Check, Sparkles, Send, CheckCircle, Loader, ArrowLeft, Briefcase, Building, AlertCircle } = Icons;
const Linkedin = Icons.Linkedin || Icons.User;

// ─── BASE DE DONNÉES DES CARTES ──────────────────────────────────────────────
const productsData = {
  'etudiant': {
    id: 'etudiant',
    name: 'Pack Étudiant',
    price: '99 DH',
    tag: 'Offre Étudiante',
    desc: 'La carte idéale pour vos événements, forums et recherches de PFE. Boostez votre réseau dès maintenant.',
    features: ['Carte PVC Blanche ou Noire', 'Profil digital de base', 'Lien vers CV ou Portfolio'],
  },
  'starter': {
    id: 'starter',
    name: 'Pack Starter',
    price: '149 DH',
    tag: 'L\'Essentiel',
    desc: 'Une carte PVC haute qualité avec un lien direct vers vos réseaux. La solution la plus simple pour partager vos contacts.',
    features: ['Carte PVC Haute Qualité', 'Profil digital fixe (non modifiable)', 'Redirection ultra-rapide'],
  },
  'pro': {
    id: 'pro',
    name: 'Pack Pro',
    price: '299 DH',
    tag: 'Recommandé',
    desc: 'Prenez le contrôle de votre identité. Modifiez vos informations à tout moment et accédez à une plateforme complète.',
    features: ['Carte PVC Premium (Finition Or)', 'Profil 100% Modifiable', 'Accès plateforme & Statistiques'],
  },
  'entreprise': {
    id: 'entreprise',
    name: 'Pack Entreprise',
    price: 'Sur devis',
    tag: 'Sur Mesure',
    desc: 'Équipez vos collaborateurs avec des cartes NFC aux couleurs de votre entreprise. À partir de 5 cartes.',
    features: ['Design 100% personnalisé (Logo etc.)', 'Dashboard d\'équipe', 'Déploiement sur mesure'],
  }
};

// ─── STYLES GLOBAUX (Thème Sombre Premium) ───────────────────────────────────
function GlobalStyles() {
  useEffect(() => {
    const id = "dc-global-styles";
    if (document.getElementById(id)) return;
    const s = document.createElement("style");
    s.id = id;
    s.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;800;900&family=DM+Sans:wght@400;500;600;700&family=Black+Ops+One&display=swap');

      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

      :root {
        /* Palette Premium Dark */
        --dima-primary: #F5A623;      /* Or/Ambre */
        --dima-primary-light: #FDE047; /* Or Clair */
        --dima-primary-dark: #D97706;  /* Or Sombre */
        --dima-secondary: #8B5CF6;     /* Violet */
        --dima-cyan: #06B6D4;          /* Cyan */
        
        --bg-main: #0B0F19;            /* Noir profond */
        --bg-surface: #111827;         /* Gris très sombre */
        --bg-card: #1F2937;            /* Gris ardoise (cartes) */
        
        --text-main: #F9FAFB;          /* Blanc cassé */
        --text-muted: #9CA3AF;         /* Gris clair */
        --border-light: rgba(255, 255, 255, 0.08);
        --shadow-soft: 0 10px 40px rgba(0,0,0,0.4);
        
        --font-display: 'Outfit', sans-serif;
        --font-body: 'DM Sans', sans-serif;
        --font-logo: 'Black Ops One', cursive;
      }

      html { scroll-behavior: smooth; background: var(--bg-main); overflow-x: hidden; }
      body { font-family: var(--font-body); background: var(--bg-main); color: var(--text-main); overflow-x: hidden; perspective: 1000px; width: 100%; }

      /* Animations */
      @keyframes float3D { 0%, 100% { transform: translateY(0) rotateX(15deg) rotateY(-15deg); } 50% { transform: translateY(-20px) rotateX(20deg) rotateY(-5deg); } }
      @keyframes gridMove { 0% { background-position: 0 0; } 100% { background-position: 0 60px; } }
      @keyframes sheen { 0%,100% { left: -100%; } 50% { left: 130%; } }
      @keyframes nfcPulse { 0% { opacity: 0.2; transform: scale(0.9); } 50% { opacity: 1; transform: scale(1.05); filter: drop-shadow(0 0 12px var(--dima-primary)); } 100% { opacity: 0.2; transform: scale(0.9); } }
      @keyframes fadeInUp { from { opacity: 0; transform: translateY(40px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
      @keyframes shadowPulse { 0%,100% { opacity: 0.8; transform: scaleX(1); } 50% { opacity: 0.4; transform: scaleX(0.85); } }

      .card-3d-anim    { animation: float3D 8s ease-in-out infinite; transform-style: preserve-3d; }
      .card-sheen-anim { animation: sheen 5s ease-in-out infinite; }
      .shadow-p        { animation: shadowPulse 8s ease-in-out infinite; }
      .fade-up         { animation: fadeInUp 0.8s cubic-bezier(0.16,1,0.3,1) both; opacity: 0; }
      .nfc-wave-1      { animation: nfcPulse 1.5s infinite 0s; }
      .nfc-wave-2      { animation: nfcPulse 1.5s infinite 0.2s; }
      .nfc-wave-3      { animation: nfcPulse 1.5s infinite 0.4s; }

      .brand-logo-text { font-family: var(--font-logo); color: var(--dima-primary); text-shadow: -2px 3px 0px var(--dima-secondary); transform: skewX(-6deg); line-height: 1; letter-spacing: 2px; }
      
      .bg-grid-3d { position: absolute; width: 200%; height: 120%; bottom: -40%; left: -50%; background-image: linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px); background-size: 60px 60px; transform: perspective(600px) rotateX(75deg); animation: gridMove 3s linear infinite; mask-image: radial-gradient(ellipse at center, black 10%, transparent 60%); -webkit-mask-image: radial-gradient(ellipse at center, black 10%, transparent 60%); pointer-events: none; }
      
      .card-texture-stripes { background: repeating-linear-gradient(-45deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.02) 10px, transparent 10px, transparent 20px); }

      ::-webkit-scrollbar { width: 6px; }
      ::-webkit-scrollbar-track { background: var(--bg-main); }
      ::-webkit-scrollbar-thumb { background: var(--dima-primary-dark); border-radius: 3px; }

      .section-padding { padding: 120px 0; }
      
      /* Utilitaires pour forcer Tailwind sur certains éléments dark */
      .glass-panel { background: rgba(31, 41, 55, 0.6); backdrop-filter: blur(20px); border: 1px solid var(--border-light); }
      .input-dark { background-color: var(--bg-surface); border: 1px solid var(--border-light); color: var(--text-main); }
      .input-dark:focus { border-color: var(--dima-primary); outline: none; box-shadow: 0 0 0 1px var(--dima-primary); }

      @media (max-width: 900px) { .hide-mobile { display: none !important; } }
      @media (max-width: 768px) {
        .section-padding { padding: 80px 0 !important; }
        .hero-grid { grid-template-columns: 1fr !important; text-align: center; gap: 40px !important; }
        .hero-content { align-items: center !important; }
        .hero-buttons { justify-content: center !important; flex-direction: column; width: 100%; }
        .hero-buttons button, .hero-buttons a { width: 100%; justify-content: center; }
        .mobile-no-3d { transform: none !important; }
      }
      @media (min-width: 769px) {
        .nav-links { display: flex; gap: 32px; }
        .hero-grid { grid-template-columns: 1fr 1.1fr; }
        .hero-content { align-items: flex-start; }
      }
    `;
    document.head.appendChild(s);
  }, []);
  return null;
}

// ─── COMPOSANTS GRAPHIQUES ET CARTES DYNAMIQUES ──────────────────────────────
function Particles({ count = 15, color = "#F5A623" }) {
  const particles = useRef(Array.from({ length: count }, (_, i) => ({ id: i, x: Math.random() * 100, y: Math.random() * 100, size: Math.random() * 4 + 2, delay: Math.random() * 4, dur: Math.random() * 4 + 4 })));
  return (
    <div className="hide-mobile" style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
      {particles.current.map(p => (
        <div key={p.id} style={{ position: "absolute", left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, borderRadius: "50%", background: color, opacity: 0.15, filter: "blur(2px)", animation: `particleDrift ${p.dur}s ease-in-out ${p.delay}s infinite` }}/>
      ))}
    </div>
  );
}

function DimacardPhysical() {
  const bg = 'linear-gradient(135deg, #111827 0%, #0B0F19 100%)';
  const border = '1px solid rgba(255,255,255,0.1)'; 
  const logoCol = 'var(--dima-primary)'; 
  const textCol = '#9CA3AF'; 
  const glitchShadow = '2px -2px 0px var(--dima-secondary), -2px 2px 0px rgba(6, 182, 212, 0.5)';

  return (
    <div style={{ position: "absolute", inset: 0, borderRadius: 24, background: bg, border: border, boxShadow: "20px 40px 60px rgba(0,0,0,0.5), inset 0 2px 20px rgba(245, 166, 35, 0.05)", padding: "24px 8%", display: "flex", flexDirection: "column", justifyContent: "space-between", overflow: "hidden", transformStyle: "preserve-3d" }}>
      <div className="card-texture-stripes" style={{ position: "absolute", inset: 0, opacity: 0.3, pointerEvents: "none", transform: "translateZ(-1px)" }} />
      <div className="card-sheen-anim" style={{ position: "absolute", top: 0, left: "-100%", width: "50%", height: "100%", background: "linear-gradient(105deg,transparent 30%,rgba(255,255,255,0.1) 50%,transparent 70%)", pointerEvents: "none", transform: "translateZ(1px)" }}/>
      
      <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "2%", marginTop: "4%", transform: "translateZ(30px)" }}>
        <div style={{ fontFamily: "var(--font-logo)", color: logoCol, transform: "skewX(-6deg)", fontSize: "clamp(32px, 10vw, 52px)", lineHeight: 1, textShadow: glitchShadow }}>DIMA</div>
        <div style={{ fontFamily: "var(--font-logo)", color: logoCol, transform: "skewX(-6deg)", fontSize: "clamp(24px, 7vw, 38px)", marginLeft: "10%", lineHeight: 1, textShadow: glitchShadow }}>CARD</div>
      </div>

      <div style={{ position: "absolute", right: "8%", bottom: "20%", display: "flex", alignItems: "center", gap: 8, transform: "rotate(-45deg) translateZ(20px)" }}>
        <div className="nfc-wave-1" style={{ width: 10, height: 10, borderRadius: "50%", background: logoCol, boxShadow: `0 0 10px ${logoCol}` }} />
        <div className="nfc-wave-2" style={{ width: 20, height: 20, borderRadius: "50%", borderTop: `3px solid ${logoCol}`, borderRight: `3px solid ${logoCol}`, transform: "rotate(45deg)" }} />
        <div className="nfc-wave-3" style={{ width: 34, height: 34, borderRadius: "50%", borderTop: `3px solid ${logoCol}`, borderRight: `3px solid ${logoCol}`, transform: "rotate(45deg) translate(-8px, 8px)" }} />
      </div>

      <div style={{ position: "relative", zIndex: 2, transform: "translateZ(15px)", marginBottom: "2%" }}>
        <span style={{ fontFamily: "var(--font-body)", fontSize: "clamp(8px, 2.5vw, 10px)", color: textCol, letterSpacing: "2px", textTransform: "uppercase", fontWeight: 700 }}>PREMIUM EDITION</span>
      </div>
    </div>
  );
}

// ─── NAVBAR ──────────────────────────────────────────────────────────────────
function Navbar({ currentPage, setCurrentPage }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, transition: "all 0.5s", padding: scrolled ? "12px 0" : "20px 0", background: scrolled ? "rgba(11, 15, 25, 0.85)" : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", borderBottom: scrolled ? "1px solid var(--border-light)" : "none", boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.5)" : "none" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button onClick={() => setCurrentPage('home')} style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", background: "none", border: "none", cursor: "pointer", transform: "translateZ(0)", transition: "transform 0.3s" }} onMouseEnter={e => e.currentTarget.style.transform="scale(1.05)"} onMouseLeave={e => e.currentTarget.style.transform="scale(1)"}>
          <span className="brand-logo-text" style={{ fontSize: 24 }}>DIMA CARD</span>
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <div className="nav-links hide-mobile">
            <button onClick={() => setCurrentPage('home')} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 600, color: currentPage === 'home' ? "var(--text-main)" : "var(--text-muted)", transition: "color 0.2s" }}>
              Accueil
            </button>
            <button onClick={() => setCurrentPage('product_pro')} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 600, color: currentPage.startsWith('product') ? "var(--text-main)" : "var(--text-muted)", transition: "color 0.2s" }}>
              Boutique
            </button>
          </div>
          <a href="https://dimacardapp2.vercel.app" style={{ padding: "10px 24px", borderRadius: 100, background: "var(--dima-primary)", color: "#0B0F19", fontFamily: "var(--font-body)", fontWeight: 800, fontSize: 13, textDecoration: "none", boxShadow: "0 4px 20px rgba(245, 166, 35, 0.3)", transition: "all 0.3s" }} onMouseEnter={e => e.currentTarget.style.transform="translateY(-2px)"} onMouseLeave={e => e.currentTarget.style.transform="translateY(0)"}>Login</a>
        </div>
      </div>
    </nav>
  );
}

// ─── HERO ────────────────────────────────────────────────────────────────────
function Hero({ setCurrentPage }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const h = (e) => {
      if(window.innerWidth > 768) {
        setMousePos({ x: (e.clientX / window.innerWidth - 0.5) * 2, y: (e.clientY / window.innerHeight - 0.5) * 2 });
      }
    };
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);

  return (
    <section className="section-padding" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", perspective: "1000px" }}>
      <Particles count={25} color="var(--dima-primary)" />
      <div className="bg-grid-3d" />
      <div className="hide-mobile" style={{ position: "absolute", inset: 0, pointerEvents: "none", transformStyle: "preserve-3d" }}>
        <div style={{ position: "absolute", top: "35%", left: "50%", width: 800, height: 400, borderRadius: "50%", background: "radial-gradient(ellipse,rgba(245, 166, 35, 0.08) 0%,transparent 70%)", transform: `translate(calc(-50% + ${mousePos.x * 60}px), calc(-50% + ${mousePos.y * 60}px)) translateZ(-200px)`, transition: "transform 0.4s ease-out" }}/>
        <div style={{ position: "absolute", top: "15%", right: "5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(ellipse,rgba(139, 92, 246, 0.08) 0%,transparent 70%)", transform: `translateY(${mousePos.y * -40}px) translateX(${mousePos.x * -40}px) translateZ(-100px)`, transition: "transform 0.4s ease-out" }}/>
      </div>

      <div style={{ position: "relative", zIndex: 2, maxWidth: 1280, margin: "0 auto", padding: "0 24px", width: "100%" }}>
        <div className="hero-grid" style={{ display: "grid", gap: 64, alignItems: "center" }}>
          <div className="hero-content mobile-no-3d" style={{ display: "flex", flexDirection: "column", transform: `translateZ(30px) rotateY(${mousePos.x * 5}deg) rotateX(${mousePos.y * -5}deg)`, transition: "transform 0.3s ease-out", transformStyle: "preserve-3d" }}>
            <div className="fade-up" style={{ animationDelay: "0.1s", display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 100, background: "rgba(245, 166, 35, 0.1)", border: "1px solid rgba(245, 166, 35, 0.2)", marginBottom: 24 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--dima-primary)", boxShadow: "0 0 10px var(--dima-primary)" }}/>
              <span style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 700, color: "var(--dima-primary-light)", letterSpacing: "0.15em", textTransform: "uppercase" }}>Sans contact. Sans limite.</span>
            </div>
            <h1 className="hero-title fade-up" style={{ animationDelay: "0.2s", fontFamily: "var(--font-display)", fontSize: "clamp(42px,7vw,76px)", fontWeight: 900, color: "var(--text-main)", lineHeight: 1.05, letterSpacing: "-1px", marginBottom: 24 }}>
              L'Avenir des<br />Cartes de<br /><span style={{ color: "var(--dima-primary)" }}>Visite.</span>
            </h1>
            <p className="fade-up" style={{ animationDelay: "0.35s", fontFamily: "var(--font-body)", fontSize: "clamp(16px,3vw,18px)", color: "var(--text-muted)", maxWidth: 420, lineHeight: 1.6, marginBottom: 40 }}>
              Partagez vos coordonnées en un seul geste. Une carte physique premium et intelligente pour des connexions digitales illimitées.
            </p>
            <div className="hero-buttons fade-up" style={{ animationDelay: "0.5s", display: "flex", gap: 16, marginBottom: 44 }}>
              <button onClick={() => setCurrentPage('product_pro')} style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 32px", borderRadius: 16, background: "var(--dima-primary)", color: "#0B0F19", fontFamily: "var(--font-body)", fontWeight: 800, fontSize: 15, border: "none", cursor: "pointer", boxShadow: "0 10px 30px rgba(245, 166, 35, 0.3)", transition: "all 0.3s" }} onMouseEnter={e => e.currentTarget.style.transform="scale(1.05)"} onMouseLeave={e => e.currentTarget.style.transform="scale(1)"}>
                Obtenir ma carte
              </button>
              <a href="#showcase" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "16px 32px", borderRadius: 16, background: "var(--bg-surface)", border: "1px solid var(--border-light)", color: "var(--text-main)", fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 15, textDecoration: "none", transition: "all 0.3s" }} onMouseEnter={e => e.currentTarget.style.background="var(--bg-card)"} onMouseLeave={e => e.currentTarget.style.background="var(--bg-surface)"}>Comment ça marche</a>
            </div>
          </div>

          <div className="hero-card-container fade-up mobile-no-3d" style={{ animationDelay: "0.3s", display: "flex", flexDirection: "column", alignItems: "center", gap: 40, transformStyle: "preserve-3d", transform: `translateZ(50px) rotateY(${mousePos.x * -10}deg) rotateX(${mousePos.y * 10}deg)`, transition: "transform 0.2s ease-out" }}>
            <div style={{ perspective: "1500px", position: "relative", width: "100%", maxWidth: 420, aspectRatio: "1.58" }}>
              <div className="card-3d-anim" style={{ width: "100%", height: "100%", position: "relative" }}>
                <DimacardPhysical />
              </div>
              <div className="shadow-p" style={{ position: "absolute", bottom: -40, left: "5%", width: "90%", height: 40, background: "radial-gradient(ellipse, rgba(0,0,0,0.8) 0%, transparent 60%)", filter: "blur(15px)" }}/>
            </div>
            <div className="glass-panel" style={{ display: "flex", gap: 0, borderRadius: 20, overflow: "hidden", transform: "translateZ(30px)", boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}>
              {[{ num: "2.4K+", label: "Pros" },{ num: "1 Tap", label: "Connexion" },{ num: "100%", label: "Écolo" }].map((s, i) => (
                <div key={i} style={{ padding: "16px 24px", textAlign: "center", borderRight: i < 2 ? "1px solid var(--border-light)" : "none" }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(16px, 4vw, 20px)", fontWeight: 800, color: "var(--text-main)" }}>{s.num}</div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: 10, color: "var(--dima-primary)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 4, fontWeight: "700" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FEATURES ────────────────────────────────────────────────────────────────
const featuresInfo = [
  { title: 'Technologie NFC', description: 'Un simple contact suffit pour partager votre profil. Pas de scan, pas de friction, juste une connexion instantanée.', icon: <Nfc className="w-8 h-8 text-[#F5A623]" />, color: 'from-[#F5A623]/20 to-[#D97706]/20' },
  { title: 'Analyses en Temps Réel', description: 'Suivez qui consulte votre carte et quand. Transformez vos rencontres en opportunités mesurables.', icon: <BarChart className="w-8 h-8 text-[#8B5CF6]" />, color: 'from-[#8B5CF6]/20 to-[#6D28D9]/20' },
  { title: 'Personnalisation Totale', description: 'Choisissez parmi nos designs premium ou créez le vôtre. Votre carte doit être aussi unique que votre marque.', icon: <Palette className="w-8 h-8 text-[#06B6D4]" />, color: 'from-[#06B6D4]/20 to-[#0891B2]/20' },
];

function Features() {
  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ backgroundColor: 'var(--bg-surface)' }}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#F5A623]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-20">
          <h2 className="text-4xl sm:text-6xl font-black mb-6 tracking-tight text-white" style={{ fontFamily: 'var(--font-display)' }}>
            L'Expérience{' '}
            <span style={{ backgroundImage: 'linear-gradient(to right, #F5A623, #8B5CF6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent', display: 'inline-block' }}>
              Premium
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">Tout ce dont vous avez besoin pour propulser votre réseau dans une nouvelle dimension.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuresInfo.map((feature, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: index * 0.2 }} whileHover={{ y: -10, scale: 1.02 }} className="relative group">
              <div className="h-full bg-[#1F2937] p-10 rounded-2xl border border-white/5 group-hover:border-[#F5A623]/30 transition-all duration-500 relative overflow-hidden flex flex-col items-start shadow-xl">
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative mb-8 p-4 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 shadow-xl">
                  {feature.icon}
                  <div className="absolute inset-0 bg-white/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 relative z-10" style={{ fontFamily: 'var(--font-display)' }}>{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed relative z-10 group-hover:text-gray-200 transition-colors">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── HOW IT WORKS ────────────────────────────────────────────────────────────
const combinedSteps = [
  { number: '01', title: 'Commandez votre carte', description: 'Choisissez votre design DimaCard. Vous recevrez une carte physique premium équipée de notre technologie NFC sécurisée.', icon: <Zap className="w-5 h-5 text-[#F5A623]" /> },
  { number: '02', title: 'Configurez votre profil', description: 'Créez votre identité digitale sur notre plateforme. Ajoutez vos réseaux, votre portfolio et vos coordonnées en quelques clics.', icon: <Smartphone className="w-5 h-5 text-[#8B5CF6]" /> },
  { number: '03', title: 'Scannez et Partagez', description: 'Approchez votre carte du smartphone de votre contact. Boom ! Votre profil s\'affiche, sans aucune application requise.', icon: <Share2 className="w-5 h-5 text-[#06B6D4]" /> },
];

function HowItWorksCombined() {
  const [scanState, setScanState] = useState('waiting');
  useEffect(() => {
    const runAnimation = async () => {
      setScanState('waiting');
      await new Promise(r => setTimeout(r, 2000));
      setScanState('scanning');
      await new Promise(r => setTimeout(r, 800));
      setScanState('success');
    };
    runAnimation();
    const interval = setInterval(runAnimation, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="showcase" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ backgroundColor: 'var(--bg-main)' }}>
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-[#8B5CF6]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="space-y-12 relative z-10">
            <div>
              <h2 className="text-4xl sm:text-6xl font-black mb-6 tracking-tight text-white" style={{ fontFamily: 'var(--font-display)' }}>
                Comment ça{' '}
                <span style={{ backgroundImage: 'linear-gradient(to right, #F5A623, #8B5CF6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent', display: 'inline-block' }}>
                  marche ?
                </span>
              </h2>
              <p className="text-xl text-gray-400">Passez au networking nouvelle génération en trois étapes simples.</p>
            </div>
            <div className="space-y-8">
              {combinedSteps.map((step, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.2 }} viewport={{ once: true }} className="flex gap-6 group">
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-2xl bg-[#1F2937] border border-white/10 flex items-center justify-center group-hover:border-[#F5A623] group-hover:bg-[#F5A623]/10 transition-all duration-300 shrink-0 shadow-lg">
                      {step.icon}
                    </div>
                    {index !== combinedSteps.length - 1 && <div className="w-px h-full bg-gradient-to-b from-[#F5A623]/30 to-transparent my-2" />}
                  </div>
                  <div className="pb-6">
                    <div className="text-sm font-mono text-[#F5A623] mb-1">Étape {step.number}</div>
                    <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-display)' }}>{step.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="relative flex justify-center items-center h-[600px] w-full pt-20 overflow-visible">
            <motion.div animate={{ y: scanState === 'scanning' ? 80 : -50, scale: scanState === 'scanning' ? 0.9 : 1, rotateX: scanState === 'success' ? 45 : 15, opacity: scanState === 'success' ? 0 : 1 }} transition={{ duration: 0.6, ease: "easeInOut" }} style={{ perspective: "1000px" }} className="absolute top-0 z-50 flex justify-center w-full">
              {/* Petite Carte Glitch dans l'animation */}
              <div className="w-40 h-28 rounded-xl bg-[#111827] border-2 border-[#F5A623] shadow-[0_20px_40px_rgba(0,0,0,0.6)] flex items-center justify-center relative overflow-hidden transform rotate-12">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#F5A623]/10 to-transparent" />
                <CreditCard className="text-gray-500 w-6 h-6 absolute top-2 left-2" />
                <span className="text-[#F5A623] font-bold text-lg tracking-widest z-10" style={{ fontFamily: 'var(--font-logo)', textShadow: '1.5px -1.5px 0px #8B5CF6, -1.5px 1.5px 0px #06B6D4' }}>DIMA</span>
                <Nfc className="text-[#F5A623] w-5 h-5 absolute bottom-2 right-2" />
              </div>
            </motion.div>
            
            <div className="relative z-10 w-[280px] h-[560px] bg-black rounded-[2.5rem] border-[6px] border-gray-800 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden">
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#0a0a0a] rounded-full z-50 border border-gray-800" />
              <div className="relative w-full h-full bg-[#0a0a0a]">
                <AnimatePresence mode="wait">
                  {(scanState === 'waiting' || scanState === 'scanning') && (
                    <motion.div key="waiting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }} className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                      <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="w-20 h-20 bg-[#F5A623]/10 rounded-full flex items-center justify-center mb-6"><Nfc className="w-10 h-10 text-[#F5A623]" /></motion.div>
                      <h3 className="text-white font-semibold text-lg mb-2" style={{ fontFamily: 'var(--font-display)' }}>Prêt à scanner</h3>
                      <p className="text-gray-500 text-xs">Approchez la carte</p>
                    </motion.div>
                  )}
                  {scanState === 'success' && (
                    <motion.div key="success" initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="absolute inset-0 bg-[#111827] overflow-y-auto pb-6 scrollbar-hide">
                      <div className="h-32 bg-gradient-to-br from-[#1F2937] to-[#0B0F19] border-b border-white/5" />
                      <div className="px-5 -mt-10 relative z-10 flex flex-col items-center">
                        <div className="w-20 h-20 rounded-full border-4 border-[#111827] bg-[#1F2937] flex items-center justify-center shadow-xl"><span className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>MM</span></div>
                        <div className="mt-3 text-center">
                          <h2 className="text-xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>Mohammed</h2>
                          <p className="text-[#F5A623] font-medium text-xs mt-1">CEO</p>
                          <p className="text-gray-400 text-[10px] mt-1 flex items-center justify-center gap-1"><MapPin className="w-3 h-3" /> Tanger, Maroc</p>
                        </div>
                        
                        <button className="w-full mt-4 bg-[#F5A623] text-[#0B0F19] font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm hover:bg-[#FDE047] transition-colors" style={{ fontFamily: 'var(--font-body)' }}>
                          <UserPlus className="w-4 h-4" /> Enregistrer le contact
                        </button>

                        <div className="w-full mt-5 grid grid-cols-2 gap-3">
                          <div className="flex flex-col items-center justify-center p-3 bg-[#1F2937] border border-white/5 rounded-xl text-center">
                            <Phone className="w-5 h-5 text-[#F5A623] mb-2" />
                            <span className="text-[10px] text-gray-300 font-medium">+212 70 80 66 509</span>
                          </div>
                          <div className="flex flex-col items-center justify-center p-3 bg-[#1F2937] border border-white/5 rounded-xl text-center">
                            <Mail className="w-5 h-5 text-[#8B5CF6] mb-2" />
                            <span className="text-[10px] text-gray-300 font-medium">contact@dimacard.ma</span>
                          </div>
                          <div className="flex flex-col items-center justify-center p-3 bg-[#1F2937] border border-white/5 rounded-xl text-center">
                            <Linkedin className="w-5 h-5 text-[#06B6D4] mb-2" />
                            <span className="text-[10px] text-gray-300 font-medium">/in/Mohammed</span>
                          </div>
                          <div className="flex flex-col items-center justify-center p-3 bg-[#1F2937] border border-white/5 rounded-xl text-center">
                            <Globe className="w-5 h-5 text-[#F5A623] mb-2" />
                            <span className="text-[10px] text-gray-300 font-medium">www.dimacard.ma</span>
                          </div>
                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── PRICING ─────────────────────────────────────────────────────────────────
const plans = [
  { 
    name: 'Étudiant', 
    price: '99 DH', 
    description: 'Parfait pour booster votre réseau, vos recherches de stage ou de PFE.', 
    features: ['1 Carte PVC Noire ou Blanche', 'Profil digital de base', 'Idéal pour les événements'], 
    highlight: false, 
    productId: 'etudiant' 
  },
  { 
    name: 'Starter', 
    price: '149 DH', 
    description: 'La solution simple et immédiate pour partager vos coordonnées.', 
    features: ['1 Carte PVC Premium', 'Lien de profil direct', 'Profil digital fixe'], 
    highlight: false, 
    productId: 'starter' 
  },
  { 
    name: 'Pro', 
    price: '299 DH', 
    description: 'Prenez le contrôle total de votre identité professionnelle.', 
    features: ['1 Carte Premium (Finition Or)', 'Profil 100% modifiable', 'Accès complet plateforme'], 
    highlight: true, 
    productId: 'pro' 
  },
  { 
    name: 'Entreprise', 
    price: 'Sur devis', 
    description: 'Une solution sur-mesure à partir de 5 collaborateurs.', 
    features: ['Cartes 100% personnalisées', 'Dashboard collaboratif', 'Gestion centralisée'], 
    highlight: false, 
    productId: 'entreprise' 
  },
];

function Pricing({ setCurrentPage }) {
  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ backgroundColor: 'var(--bg-surface)' }}>
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-[#F5A623]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-16 space-y-4">
          <h2 className="text-4xl sm:text-6xl font-black mb-6 tracking-tight text-white" style={{ fontFamily: 'var(--font-display)' }}>
            Passez au{' '}
            <span style={{ backgroundImage: 'linear-gradient(to right, #F5A623, #FDE047)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent', display: 'inline-block' }}>
              Networking 2.0
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-body)' }}>Choisissez l'offre DimaCard qui correspond à vos ambitions.</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {plans.map((plan, index) => (
            <motion.div key={index} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} whileHover={{ y: -10 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }} className={`relative p-6 xl:p-8 rounded-3xl transition-all duration-500 flex flex-col h-full ${plan.highlight ? 'bg-[#1F2937] border-2 border-[#F5A623] shadow-[0_20px_50px_rgba(245,166,35,0.15)] md:scale-105 z-20' : 'bg-[#1F2937] border border-white/5 hover:border-white/20 shadow-lg z-10'}`}>
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#F5A623] text-[#0B0F19] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-1 whitespace-nowrap">
                  <Sparkles className="w-3 h-3" /> Populaire
                </div>
              )}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-display)' }}>{plan.name}</h3>
                <p className="text-sm text-gray-400 mb-6 min-h-[60px]" style={{ fontFamily: 'var(--font-body)' }}>{plan.description}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl xl:text-4xl font-black text-white" style={{ fontFamily: 'var(--font-display)' }}>{plan.price}</span>
                  {plan.price !== 'Sur devis' && <span className="text-gray-500 text-xs" style={{ fontFamily: 'var(--font-body)' }}>/une fois</span>}
                </div>
              </div>
              <ul className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-300" style={{ fontFamily: 'var(--font-body)' }}>
                    <Check className={`w-5 h-5 shrink-0 mt-0.5 ${plan.highlight ? 'text-[#F5A623]' : 'text-gray-500'}`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button onClick={() => setCurrentPage(`product_${plan.productId}`)} className={`w-full py-4 px-2 rounded-xl font-bold transition-all duration-300 cursor-pointer border-none text-sm xl:text-base ${plan.highlight ? 'bg-[#F5A623] text-[#0B0F19] hover:bg-[#FDE047] shadow-lg shadow-[#F5A623]/20' : 'bg-white/5 text-white hover:bg-white/10'}`} style={{ fontFamily: 'var(--font-body)' }}>
                {plan.price === 'Sur devis' ? 'Demander un devis' : 'Configurer ce modèle'}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CONTACT ─────────────────────────────────────────────────────────────────
function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwxa15n3I42jHSZGnjmBnXvmqSEhvzDml4GkgfqsP-fZsGvVkOkmC1n7pQvv7BPFlPh/exec';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");
    const dataToSend = new FormData();
    dataToSend.append('type', 'Contact');
    dataToSend.append('name', formData.name);
    dataToSend.append('email', formData.email);
    dataToSend.append('subject', formData.subject);
    dataToSend.append('message', formData.message);

    try {
      await fetch(GOOGLE_SCRIPT_URL, { method: 'POST', mode: 'no-cors', body: dataToSend });
      setIsSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error('Erreur:', error);
      setErrorMsg("Erreur de connexion lors de l'envoi. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ backgroundColor: 'var(--bg-main)' }}>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#8B5CF6]/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-4xl sm:text-6xl font-black mb-6 tracking-tight text-white" style={{ fontFamily: 'var(--font-display)' }}>
            Prêt à faire le{' '}
            <span style={{ backgroundImage: 'linear-gradient(to right, #F5A623, #8B5CF6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent', display: 'inline-block' }}>
              premier pas ?
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-body)' }}>Contactez l'équipe DimaCard pour une démo ou une commande personnalisée.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 bg-[#1F2937] border border-white/5 rounded-3xl p-6 sm:p-10 shadow-2xl relative z-20">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }} className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-display)' }}>Nos Coordonnées</h3>
              <p className="text-gray-400 text-sm" style={{ fontFamily: 'var(--font-body)' }}>Nous répondons généralement en moins de 24h.</p>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4"><div className="w-12 h-12 rounded-xl bg-[#F5A623]/10 border border-[#F5A623]/20 flex items-center justify-center shrink-0"><Mail className="w-5 h-5 text-[#F5A623]" /></div><div><h4 className="text-white font-bold mb-1">Email</h4><a href="mailto:contact@dimacard.ma" className="text-gray-400 hover:text-[#F5A623] transition-colors text-sm font-medium">contact@dimacard.ma</a></div></div>
              <div className="flex items-start gap-4"><div className="w-12 h-12 rounded-xl bg-[#F5A623]/10 border border-[#F5A623]/20 flex items-center justify-center shrink-0"><Phone className="w-5 h-5 text-[#F5A623]" /></div><div><h4 className="text-white font-bold mb-1">Téléphone</h4><a href="tel:+212708066509" className="text-gray-400 hover:text-[#F5A623] transition-colors text-sm font-medium">+212 7 08 06 65 09</a></div></div>
              <div className="flex items-start gap-4"><div className="w-12 h-12 rounded-xl bg-[#F5A623]/10 border border-[#F5A623]/20 flex items-center justify-center shrink-0"><MapPin className="w-5 h-5 text-[#F5A623]" /></div><div><h4 className="text-white font-bold mb-1"> Bureau</h4><p className="text-gray-400 text-sm font-medium">Tanger, Maroc</p></div></div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }} viewport={{ once: true }} className="lg:col-span-3">
            <form className="space-y-6" onSubmit={handleSubmit}>
              
              {/* Affichage d'erreur sans alert() */}
              {errorMsg && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/50 flex items-center gap-3 text-red-400 text-sm">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <p>{errorMsg}</p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2"><label htmlFor="name" className="text-sm font-bold text-gray-300">Nom complet</label><input type="text" id="name" required value={formData.name} onChange={handleChange} className="w-full input-dark rounded-xl px-4 py-3" /></div>
                <div className="space-y-2"><label htmlFor="email" className="text-sm font-bold text-gray-300">Adresse Email</label><input type="email" id="email" required value={formData.email} onChange={handleChange} className="w-full input-dark rounded-xl px-4 py-3" /></div>
              </div>
              <div className="space-y-2"><label htmlFor="subject" className="text-sm font-bold text-gray-300">Sujet</label><input type="text" id="subject" required value={formData.subject} onChange={handleChange} className="w-full input-dark rounded-xl px-4 py-3" /></div>
              <div className="space-y-2"><label htmlFor="message" className="text-sm font-bold text-gray-300">Message</label><textarea id="message" required rows="4" value={formData.message} onChange={handleChange} className="w-full input-dark rounded-xl px-4 py-3 resize-none"></textarea></div>
              <button type="submit" disabled={isSubmitting || isSuccess} className={`w-full sm:w-auto px-8 py-4 font-bold rounded-xl flex items-center justify-center gap-2 border-none cursor-pointer text-[#0B0F19] shadow-lg ${isSuccess ? 'bg-[#10B981] shadow-[#10B981]/20' : 'bg-[#F5A623] hover:bg-[#FDE047] shadow-[#F5A623]/30 hover:shadow-[#F5A623]/50'} disabled:opacity-70 disabled:cursor-not-allowed`} style={{ fontFamily: 'var(--font-body)' }}>
                {isSubmitting ? <><Loader className="w-5 h-5 animate-spin" /> Envoi en cours...</> : isSuccess ? <><CheckCircle className="w-5 h-5" /> Message envoyé !</> : <>Envoyer le message <Send className="w-4 h-4" /></>}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: "var(--bg-surface)", borderTop: "1px solid var(--border-light)", padding: "60px 0 40px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <div className="footer-grid" style={{ display: "grid", marginBottom: 64 }}>
          <div className="flex flex-col items-center md:items-start">
            <div style={{ marginBottom: 20 }}><span className="brand-logo-text" style={{ fontSize: 28, textShadow: "-1.5px 2px 0px var(--dima-secondary)" }}>DIMA CARD</span></div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "var(--text-muted)", lineHeight: 1.7, marginBottom: 24, maxWidth: 300 }}>La carte de visite NFC premium et intelligente.</p>
            <div className="footer-socials" style={{ display: "flex", gap: 12 }}>
              {["𝕏","in","ig"].map((s, i) => <a key={i} href="#" style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: "var(--text-muted)", textDecoration: "none", fontWeight: "600", transition: "all 0.2s" }} onMouseEnter={e => {e.currentTarget.style.color="var(--dima-primary)"; e.currentTarget.style.borderColor="var(--dima-primary)"}} onMouseLeave={e => {e.currentTarget.style.color="var(--text-muted)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.1)"}}>{s}</a>)}
            </div>
          </div>
          {[ { title: "Produit", links: ["Fonctionnalités","Tarifs","Comment ça marche"] }, { title: "Entreprise", links: ["À propos","Contact"] }, { title: "Légal", links: ["Confidentialité","CGV"] } ].map((col, i) => (
            <div key={i}>
              <h4 style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 800, color: "var(--text-main)", marginBottom: 20 }}>{col.title}</h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                {col.links.map(l => <li key={l}><a href="#" style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "var(--text-muted)", textDecoration: "none", fontWeight: "500", transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color="var(--dima-primary)"} onMouseLeave={e => e.currentTarget.style.color="var(--text-muted)"}>{l}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid var(--border-light)", paddingTop: 32, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-muted)", fontWeight: "500" }}>© 2026 Dimacard.</p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-muted)", fontWeight: "500" }}>Fait avec ❤️</p>
        </div>
      </div>
    </footer>
  );
}

// ─── PAGE PRODUIT DYNAMIQUE AVEC FORMULAIRE DE COMMANDE ──────────────────────
function ProductPage({ productId, setCurrentPage }) {
  const product = productsData[productId] || productsData['pro'];
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [orderData, setOrderData] = useState({ fullName: '', jobTitle: '', company: '', phone: '', email: '', linkedin: '' });

  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwxa15n3I42jHSZGnjmBnXvmqSEhvzDml4GkgfqsP-fZsGvVkOkmC1n7pQvv7BPFlPh/exec';

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    const dataToSend = new FormData();
    dataToSend.append('type', 'Commande'); 
    dataToSend.append('product', product.name);
    dataToSend.append('price', product.price);
    dataToSend.append('fullName', orderData.fullName);
    dataToSend.append('jobTitle', orderData.jobTitle);
    dataToSend.append('company', orderData.company);
    dataToSend.append('phone', orderData.phone);
    dataToSend.append('email', orderData.email);
    dataToSend.append('linkedin', orderData.linkedin);

    try {
      await fetch(GOOGLE_SCRIPT_URL, { method: 'POST', mode: 'no-cors', body: dataToSend });
      setIsSuccess(true);
      setOrderData({ fullName: '', jobTitle: '', company: '', phone: '', email: '', linkedin: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error('Erreur:', error);
      setErrorMsg("Erreur lors de l'envoi de la commande. Veuillez vérifier votre connexion.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
      <button onClick={() => setCurrentPage('home')} className="mb-8 flex items-center gap-2 text-gray-400 hover:text-[#F5A623] transition-colors font-bold bg-transparent border-none cursor-pointer">
        <ArrowLeft className="w-5 h-5" /> Retour
      </button>

      {/* SÉLECTEUR DE MODÈLE */}
      <div className="flex gap-4 mb-12 overflow-x-auto pb-4 scrollbar-hide">
        {Object.values(productsData).map(p => (
          <button 
            key={p.id} 
            onClick={() => setCurrentPage(`product_${p.id}`)}
            className={`px-6 py-3 rounded-full font-bold whitespace-nowrap transition-all border-2 cursor-pointer ${product.id === p.id ? 'bg-[#F5A623] text-[#0B0F19] border-[#F5A623] shadow-lg shadow-[#F5A623]/20' : 'bg-[#111827] text-gray-400 border-white/10 hover:border-[#F5A623]/50 hover:text-white'}`}
          >
            {p.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* COLONNE GAUCHE : IMAGE ET INFOS */}
        <div className="space-y-8">
          
          <div className="relative rounded-3xl overflow-hidden flex items-center justify-center p-8 sm:p-16 shadow-2xl border border-white/5 bg-[#1F2937]" style={{ minHeight: '400px' }}>
            <div className="w-full max-w-[420px] relative card-3d-anim" style={{ aspectRatio: '1.58' }}>
               <DimacardPhysical />
            </div>
          </div>
          
          <div>
            <div className="inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 border text-[#F5A623] bg-[#F5A623]/10 border-[#F5A623]/30">
              {product.tag}
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
              {product.name}
            </h1>
            <p className="text-lg text-gray-400 mt-4 leading-relaxed">{product.desc}</p>
          </div>
          <div className="space-y-4">
            {product.features.map((feat, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-[#111827] border border-white/5 rounded-2xl shadow-sm">
                <Check className="w-6 h-6 shrink-0 text-[#F5A623]" />
                <span className="font-bold text-gray-200">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* COLONNE DROITE : FORMULAIRE DE COMMANDE */}
        <div className="bg-[#1F2937] border border-white/5 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#F5A623]/10 blur-[80px] rounded-full pointer-events-none" />
          
          <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-6">
            <div>
              <h2 className="text-2xl font-black text-white" style={{ fontFamily: 'var(--font-display)' }}>Configurer la commande</h2>
              <p className="text-sm text-gray-400 mt-1">Saisissez les infos à injecter sur la puce.</p>
            </div>
            <span className="text-3xl font-black text-[#F5A623]" style={{ fontFamily: 'var(--font-display)' }}>{product.price}</span>
          </div>

          <form onSubmit={handleOrderSubmit} className="space-y-5">
            
            {/* Erreur sans alert() */}
            {errorMsg && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/50 flex items-center gap-3 text-red-400 text-sm">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p>{errorMsg}</p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300 flex items-center gap-2"><UserPlus className="w-4 h-4 text-[#F5A623]" /> Nom Complet</label>
                <input type="text" required value={orderData.fullName} onChange={e => setOrderData({...orderData, fullName: e.target.value})} className="w-full input-dark rounded-xl px-4 py-3" placeholder="Ex: Jean Dupont" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300 flex items-center gap-2"><Briefcase className="w-4 h-4 text-[#F5A623]" /> Fonction</label>
                <input type="text" required value={orderData.jobTitle} onChange={e => setOrderData({...orderData, jobTitle: e.target.value})} className="w-full input-dark rounded-xl px-4 py-3" placeholder="Ex: CEO & Fondateur" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-300 flex items-center gap-2"><Building className="w-4 h-4 text-[#F5A623]" /> Nom de l'Entreprise</label>
              <input type="text" value={orderData.company} onChange={e => setOrderData({...orderData, company: e.target.value})} className="w-full input-dark rounded-xl px-4 py-3" placeholder="Ex: DimaTech S.A.R.L" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300 flex items-center gap-2"><Phone className="w-4 h-4 text-[#F5A623]" /> Téléphone pro</label>
                <input type="tel" required value={orderData.phone} onChange={e => setOrderData({...orderData, phone: e.target.value})} className="w-full input-dark rounded-xl px-4 py-3" placeholder="+212 6 XX XX XX XX" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300 flex items-center gap-2"><Mail className="w-4 h-4 text-[#F5A623]" /> Email pro</label>
                <input type="email" required value={orderData.email} onChange={e => setOrderData({...orderData, email: e.target.value})} className="w-full input-dark rounded-xl px-4 py-3" placeholder="contact@entreprise.ma" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-300 flex items-center gap-2"><Linkedin className="w-4 h-4 text-[#F5A623]" /> Lien Profil (LinkedIn / Portfolio)</label>
              <input type="url" value={orderData.linkedin} onChange={e => setOrderData({...orderData, linkedin: e.target.value})} className="w-full input-dark rounded-xl px-4 py-3" placeholder="https://linkedin.com/in/votreprofil" />
            </div>

            <button type="submit" disabled={isSubmitting || isSuccess} className={`w-full py-5 mt-4 font-black rounded-2xl flex items-center justify-center gap-2 transition-all cursor-pointer text-[#0B0F19] border-none shadow-xl ${isSuccess ? 'bg-[#10B981] shadow-[#10B981]/30 text-white' : 'bg-[#F5A623] hover:bg-[#FDE047] shadow-[#F5A623]/30'} disabled:opacity-80`} style={{ fontFamily: 'var(--font-body)' }}>
              {isSubmitting ? <><Loader className="w-6 h-6 animate-spin text-[#0B0F19]" /> Traitement en cours...</> : isSuccess ? <><CheckCircle className="w-6 h-6" /> Commande Envoyée !</> : <>VALIDER MA COMMANDE ({product.price}) <Zap className="w-5 h-5" /></>}
            </button>
            <p className="text-center text-xs text-gray-500 mt-2">Paiement sécurisé à la livraison. Livraison 48h au Maroc.</p>
          </form>
        </div>
      </div>
    </motion.div>
  );
}

// ─── COMPOSANT RACINE DE L'APPLICATION ───────────────────────────────────────
export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const isProductPage = currentPage.startsWith('product_');
  const productId = isProductPage ? currentPage.split('_')[1] : null;

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-main)' }}>
      <GlobalStyles />
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      <AnimatePresence mode="wait">
        {currentPage === 'home' ? (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Hero setCurrentPage={setCurrentPage} />
            <Features />
            <HowItWorksCombined />
            <Pricing setCurrentPage={setCurrentPage} />
            <Contact />
          </motion.div>
        ) : isProductPage ? (
          <ProductPage key={currentPage} productId={productId} setCurrentPage={setCurrentPage} />
        ) : null}
      </AnimatePresence>

      <Footer />
    </div>
  );
}