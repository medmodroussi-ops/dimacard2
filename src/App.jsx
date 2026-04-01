"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Icons from "lucide-react";

// Import universel pour éviter les erreurs de version
const { Zap, Smartphone, Share2, Nfc, UserPlus, Mail, Phone, Globe, MapPin, CreditCard, BarChart, Palette, Check, Sparkles, Send, CheckCircle, Loader, ArrowLeft, Briefcase, Building } = Icons;
const Linkedin = Icons.Linkedin || Icons.LinkedIn || Icons.User;

// ─── BASE DE DONNÉES DES CARTES ──────────────────────────────────────────────
const productsData = {
  'etudiant': {
    id: 'etudiant',
    name: 'Pack Étudiant',
    price: '99 DH',
    tag: 'Offre Étudiante',
    desc: 'La carte idéale pour vos événements, forums et recherches de PFE. Boostez votre réseau dès maintenant.',
    features: ['Carte PVC Standard', 'Profil digital de base', 'Lien vers CV ou Portfolio'],
    bgGradient: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
    textColor: '#FFFFFF',
    themeColor: '#60A5FA'
  },
  'starter': {
    id: 'starter',
    name: 'Pack Starter',
    price: '149 DH',
    tag: 'L\'Essentiel',
    desc: 'Une carte PVC haute qualité avec un lien direct vers vos réseaux. La solution la plus simple pour partager vos contacts.',
    features: ['Carte PVC Haute Qualité', 'Profil digital fixe (non modifiable)', 'Redirection ultra-rapide'],
    bgGradient: 'linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)',
    textColor: '#0F172A',
    themeColor: '#00D66B'
  },
  'pro': {
    id: 'pro',
    name: 'Pack Pro',
    price: '299 DH',
    tag: 'Recommandé',
    desc: 'Prenez le contrôle de votre identité. Modifiez vos informations à tout moment et accédez à une plateforme complète.',
    features: ['Carte PVC Premium', 'Profil 100% Modifiable', 'Accès plateforme & Statistiques'],
    bgGradient: 'linear-gradient(135deg, #1A1A1E 0%, #0A0A0C 100%)',
    textColor: '#FFFFFF',
    themeColor: '#00D66B'
  },
  'entreprise': {
    id: 'entreprise',
    name: 'Pack Entreprise',
    price: 'Sur devis',
    tag: 'Sur Mesure',
    desc: 'Équipez vos collaborateurs avec des cartes NFC aux couleurs de votre entreprise. À partir de 5 cartes.',
    features: ['Design 100% personnalisé (Logo etc.)', 'Dashboard d\'équipe', 'Déploiement sur mesure'],
    bgGradient: 'linear-gradient(135deg, #0F172A 0%, #020617 100%)',
    textColor: '#FFFFFF',
    themeColor: '#D500F9'
  }
};

// ─── STYLES GLOBAUX ──────────────────────────────────────────────────────────
function GlobalStyles() {
  useEffect(() => {
    const id = "dc-global-styles";
    if (document.getElementById(id)) return;
    const s = document.createElement("style");
    s.id = id;
    s.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@700;800;900&family=DM+Sans:wght@400;500;600;700&family=Black+Ops+One&display=swap');

      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

      :root {
        --dima-green: #00D66B; 
        --dima-green-light: #69FFB4;
        --dima-green-dark: #00A354;
        --dima-magenta: #D500F9; 
        
        --bg-light: #FAFAFA;
        --bg-white: #FFFFFF;
        --card-bg: #FFFFFF;
        --text-main: #0F172A; 
        --text-muted: #64748B; 
        --border-light: rgba(0,0,0,0.06);
        --shadow-soft: 0 10px 40px rgba(0,0,0,0.05);
        
        --font-display: 'Outfit', sans-serif;
        --font-body: 'DM Sans', sans-serif;
        --font-logo: 'Black Ops One', cursive;
      }

      html { scroll-behavior: smooth; background: var(--bg-light); overflow-x: hidden; }
      body { font-family: var(--font-body); background: var(--bg-light); color: var(--text-main); overflow-x: hidden; perspective: 1000px; width: 100%; }

      /* Animations */
      @keyframes float3D { 0%, 100% { transform: translateY(0) rotateX(15deg) rotateY(-15deg); } 50% { transform: translateY(-20px) rotateX(20deg) rotateY(-5deg); } }
      @keyframes gridMove { 0% { background-position: 0 0; } 100% { background-position: 0 60px; } }
      @keyframes sheen { 0%,100% { left: -100%; } 50% { left: 130%; } }
      @keyframes nfcPulse { 0% { opacity: 0.2; transform: scale(0.9); } 50% { opacity: 1; transform: scale(1.05); filter: drop-shadow(0 0 8px var(--dima-green)); } 100% { opacity: 0.2; transform: scale(0.9); } }
      @keyframes fadeInUp { from { opacity: 0; transform: translateY(40px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
      @keyframes shadowPulse { 0%,100% { opacity: 0.6; transform: scaleX(1); } 50% { opacity: 0.3; transform: scaleX(0.85); } }
      @keyframes shimmer { 0% { transform: translateX(-150%) skewX(-12deg); } 100% { transform: translateX(300%) skewX(-12deg); } }

      .card-3d-anim    { animation: float3D 8s ease-in-out infinite; transform-style: preserve-3d; }
      .card-sheen-anim { animation: sheen 5s ease-in-out infinite; }
      .shadow-p        { animation: shadowPulse 8s ease-in-out infinite; }
      .fade-up         { animation: fadeInUp 0.8s cubic-bezier(0.16,1,0.3,1) both; opacity: 0; }
      .nfc-wave-1      { animation: nfcPulse 1.5s infinite 0s; }
      .nfc-wave-2      { animation: nfcPulse 1.5s infinite 0.2s; }
      .nfc-wave-3      { animation: nfcPulse 1.5s infinite 0.4s; }

      .brand-logo-text { font-family: var(--font-logo); color: var(--dima-green); text-shadow: -2px 3px 0px var(--dima-magenta); transform: skewX(-6deg); line-height: 1; letter-spacing: 2px; }
      
      .bg-grid-3d { position: absolute; width: 200%; height: 120%; bottom: -40%; left: -50%; background-image: linear-gradient(rgba(0, 0, 0, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.04) 1px, transparent 1px); background-size: 60px 60px; transform: perspective(600px) rotateX(75deg); animation: gridMove 3s linear infinite; mask-image: radial-gradient(ellipse at center, black 10%, transparent 60%); -webkit-mask-image: radial-gradient(ellipse at center, black 10%, transparent 60%); pointer-events: none; }
      .card-texture-stripes { background: repeating-linear-gradient(-45deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.03) 10px, transparent 10px, transparent 20px); }

      .tilt-card { transform-style: preserve-3d; background: var(--card-bg); border: 1px solid var(--border-light); border-radius: 24px; box-shadow: var(--shadow-soft); transition: box-shadow 0.3s ease; }
      .tilt-card:hover { box-shadow: 0 20px 50px rgba(0,0,0,0.1); }
      .tilt-content { transform: translateZ(40px); transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
      .tilt-card:hover .tilt-content { transform: translateZ(70px); }

      .glass { background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); }
      .animate-shimmer { animation: shimmer 2.5s infinite; }

      ::-webkit-scrollbar { width: 6px; }
      ::-webkit-scrollbar-track { background: var(--bg-light); }
      ::-webkit-scrollbar-thumb { background: var(--dima-green); border-radius: 3px; }

      .section-padding { padding: 120px 0; }
      
      @media (max-width: 900px) { .hide-mobile { display: none !important; } }
      @media (max-width: 768px) {
        .section-padding { padding: 80px 0 !important; }
        .hero-grid { grid-template-columns: 1fr !important; text-align: center; gap: 40px !important; }
        .hero-content { align-items: center !important; }
        .hero-buttons { justify-content: center !important; flex-direction: column; width: 100%; }
        .hero-buttons button, .hero-buttons a { width: 100%; justify-content: center; }
        .how-it-works-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        .contact-grid { grid-template-columns: 1fr !important; gap: 40px !important; text-align: center; }
        .contact-info { justify-content: center; flex-direction: column; align-items: center; }
        .footer-grid { grid-template-columns: 1fr !important; gap: 40px !important; text-align: center; }
        .footer-socials { justify-content: center; }
        .tilt-card { transform: none !important; }
        .tilt-content { transform: none !important; }
        .mobile-no-3d { transform: none !important; }
      }
      @media (min-width: 769px) {
        .nav-links { display: flex; gap: 32px; }
        .hero-grid { grid-template-columns: 1fr 1.1fr; }
        .hero-content { align-items: flex-start; }
        .how-it-works-grid { grid-template-columns: 1fr 1.2fr 1fr; }
        .contact-grid { grid-template-columns: 1fr 1.2fr; }
        .footer-grid { grid-template-columns: 2fr 1fr 1fr 1fr; }
        .contact-info { flex-direction: row; }
      }
    `;
    document.head.appendChild(s);
  }, []);
  return null;
}

// ─── COMPOSANTS GRAPHIQUES ET CARTES DYNAMIQUES ──────────────────────────────
function Particles({ count = 15, color = "#00D66B" }) {
  const particles = useRef(Array.from({ length: count }, (_, i) => ({ id: i, x: Math.random() * 100, y: Math.random() * 100, size: Math.random() * 4 + 2, delay: Math.random() * 4, dur: Math.random() * 4 + 4 })));
  return (
    <div className="hide-mobile" style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
      {particles.current.map(p => (
        <div key={p.id} style={{ position: "absolute", left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, borderRadius: "50%", background: color, opacity: 0.15, filter: "blur(2px)", animation: `particleDrift ${p.dur}s ease-in-out ${p.delay}s infinite` }}/>
      ))}
    </div>
  );
}

function DimacardPhysical({ product }) {
  const bg = product ? product.bgGradient : 'linear-gradient(135deg, #1A1A1E 0%, #0A0A0C 100%)';
  const textCol = product ? product.textColor : '#FFFFFF';
  const themeCol = product ? product.themeColor : 'var(--dima-green)';

  return (
    <div style={{ position: "absolute", inset: 0, borderRadius: 24, background: bg, border: "1px solid rgba(255,255,255,0.1)", boxShadow: "20px 40px 60px rgba(0,0,0,0.4), inset 0 2px 10px rgba(255,255,255,0.05)", padding: "24px 8%", display: "flex", flexDirection: "column", justifyContent: "space-between", overflow: "hidden", transformStyle: "preserve-3d" }}>
      <div className="card-texture-stripes" style={{ position: "absolute", inset: 0, opacity: 0.6, pointerEvents: "none", transform: "translateZ(-1px)" }} />
      <div className="card-sheen-anim" style={{ position: "absolute", top: 0, left: "-100%", width: "50%", height: "100%", background: "linear-gradient(105deg,transparent 30%,rgba(255,255,255,0.08) 50%,transparent 70%)", pointerEvents: "none", transform: "translateZ(1px)" }}/>
      <div style={{ position: "absolute", bottom: "10%", right: "5%", width: "50%", aspectRatio: "1", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,230,118,0.2) 0%, transparent 70%)", pointerEvents: "none", transform: "translateZ(-1px)" }}/>
      
      <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "2%", marginTop: "4%", transform: "translateZ(30px)" }}>
        <div style={{ fontFamily: "var(--font-logo)", color: textCol, transform: "skewX(-6deg)", fontSize: "clamp(32px, 10vw, 52px)", lineHeight: 1 }}>DIMA</div>
        <div style={{ fontFamily: "var(--font-logo)", color: themeCol, transform: "skewX(-6deg)", fontSize: "clamp(24px, 7vw, 38px)", marginLeft: "10%", lineHeight: 1 }}>CARD</div>
      </div>

      <div style={{ position: "absolute", right: "8%", bottom: "20%", display: "flex", alignItems: "center", gap: 8, transform: "rotate(-45deg) translateZ(20px)" }}>
        <div className="nfc-wave-1" style={{ width: 10, height: 10, borderRadius: "50%", background: themeCol, boxShadow: `0 0 10px ${themeCol}` }} />
        <div className="nfc-wave-2" style={{ width: 20, height: 20, borderRadius: "50%", borderTop: `3px solid ${themeCol}`, borderRight: `3px solid ${themeCol}`, transform: "rotate(45deg)" }} />
        <div className="nfc-wave-3" style={{ width: 34, height: 34, borderRadius: "50%", borderTop: `3px solid ${themeCol}`, borderRight: `3px solid ${themeCol}`, transform: "rotate(45deg) translate(-8px, 8px)" }} />
      </div>

      <div style={{ position: "relative", zIndex: 2, transform: "translateZ(15px)", marginBottom: "2%" }}>
        <span style={{ fontFamily: "var(--font-body)", fontSize: "clamp(8px, 2.5vw, 10px)", color: textCol, letterSpacing: "1px", textTransform: "uppercase", opacity: 0.8 }}>SMART BUSINESS CARD</span>
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
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, transition: "all 0.5s", padding: scrolled ? "12px 0" : "20px 0", background: scrolled ? "rgba(255,255,255,0.9)" : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", borderBottom: scrolled ? "1px solid var(--border-light)" : "none", boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.02)" : "none" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button onClick={() => setCurrentPage('home')} style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", background: "none", border: "none", cursor: "pointer", transform: "translateZ(0)", transition: "transform 0.3s" }} onMouseEnter={e => e.currentTarget.style.transform="scale(1.05)"} onMouseLeave={e => e.currentTarget.style.transform="scale(1)"}>
          <span className="brand-logo-text" style={{ fontSize: 24 }}>DIMA CARD</span>
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <div className="nav-links hide-mobile">
            <button onClick={() => setCurrentPage('home')} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 600, color: currentPage === 'home' ? "var(--dima-green)" : "var(--text-muted)", transition: "color 0.2s" }}>
              Accueil
            </button>
            <button onClick={() => setCurrentPage('product_pro')} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 600, color: currentPage.startsWith('product') ? "var(--dima-green)" : "var(--text-muted)", transition: "color 0.2s" }}>
              Boutique
            </button>
          </div>
          <a href="#contact" style={{ padding: "10px 24px", borderRadius: 100, background: "var(--dima-green)", color: "#fff", fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 13, textDecoration: "none", boxShadow: "0 4px 15px rgba(0,230,118,0.3)" }}>Contact</a>
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
      <Particles count={20} color="var(--dima-green)" />
      <div className="bg-grid-3d" />
      <div className="hide-mobile" style={{ position: "absolute", inset: 0, pointerEvents: "none", transformStyle: "preserve-3d" }}>
        <div style={{ position: "absolute", top: "35%", left: "50%", width: 800, height: 400, borderRadius: "50%", background: "radial-gradient(ellipse,rgba(0,230,118,0.05) 0%,transparent 70%)", transform: `translate(calc(-50% + ${mousePos.x * 60}px), calc(-50% + ${mousePos.y * 60}px)) translateZ(-200px)`, transition: "transform 0.4s ease-out" }}/>
        <div style={{ position: "absolute", top: "15%", right: "5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(ellipse,rgba(213,0,249,0.03) 0%,transparent 70%)", transform: `translateY(${mousePos.y * -40}px) translateX(${mousePos.x * -40}px) translateZ(-100px)`, transition: "transform 0.4s ease-out" }}/>
      </div>

      <div style={{ position: "relative", zIndex: 2, maxWidth: 1280, margin: "0 auto", padding: "0 24px", width: "100%" }}>
        <div className="hero-grid" style={{ display: "grid", gap: 64, alignItems: "center" }}>
          <div className="hero-content mobile-no-3d" style={{ display: "flex", flexDirection: "column", transform: `translateZ(30px) rotateY(${mousePos.x * 5}deg) rotateX(${mousePos.y * -5}deg)`, transition: "transform 0.3s ease-out", transformStyle: "preserve-3d" }}>
            <div className="fade-up" style={{ animationDelay: "0.1s", display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 100, background: "rgba(0,230,118,0.1)", border: "1px solid rgba(0,230,118,0.2)", marginBottom: 24 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--dima-green)", boxShadow: "0 0 10px var(--dima-green)" }}/>
              <span style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 700, color: "var(--dima-green-dark)", letterSpacing: "0.15em", textTransform: "uppercase" }}>Sans contact. Sans limite.</span>
            </div>
            <h1 className="hero-title fade-up" style={{ animationDelay: "0.2s", fontFamily: "var(--font-display)", fontSize: "clamp(42px,7vw,76px)", fontWeight: 900, color: "var(--text-main)", lineHeight: 1.05, letterSpacing: "-1px", marginBottom: 24 }}>
              L'Avenir des<br />Cartes de<br /><span style={{ color: "var(--dima-green)" }}>Visite.</span>
            </h1>
            <p className="fade-up" style={{ animationDelay: "0.35s", fontFamily: "var(--font-body)", fontSize: "clamp(16px,3vw,18px)", color: "var(--text-muted)", maxWidth: 420, lineHeight: 1.6, marginBottom: 40 }}>
              Partagez vos coordonnées en un seul geste. Une carte physique intelligente pour des connexions digitales illimitées.
            </p>
            <div className="hero-buttons fade-up" style={{ animationDelay: "0.5s", display: "flex", gap: 16, marginBottom: 44 }}>
              <button onClick={() => setCurrentPage('product_pro')} style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 32px", borderRadius: 16, background: "var(--dima-green)", color: "#fff", fontFamily: "var(--font-body)", fontWeight: 800, fontSize: 15, border: "none", cursor: "pointer", boxShadow: "0 10px 25px rgba(0,230,118,0.3)" }}>
                Obtenir ma carte
              </button>
              <a href="#showcase" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "16px 32px", borderRadius: 16, background: "#fff", border: "1px solid var(--border-light)", color: "var(--text-main)", fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 15, textDecoration: "none", boxShadow: "0 5px 15px rgba(0,0,0,0.03)" }}>Comment ça marche</a>
            </div>
          </div>

          <div className="hero-card-container fade-up mobile-no-3d" style={{ animationDelay: "0.3s", display: "flex", flexDirection: "column", alignItems: "center", gap: 40, transformStyle: "preserve-3d", transform: `translateZ(50px) rotateY(${mousePos.x * -10}deg) rotateX(${mousePos.y * 10}deg)`, transition: "transform 0.2s ease-out" }}>
            <div style={{ perspective: "1500px", position: "relative", width: "100%", maxWidth: 420, aspectRatio: "1.58" }}>
              <div className="card-3d-anim" style={{ width: "100%", height: "100%", position: "relative" }}>
                <DimacardPhysical product={productsData['pro']} />
              </div>
              <div className="shadow-p" style={{ position: "absolute", bottom: -30, left: "5%", width: "90%", height: 40, background: "radial-gradient(ellipse, rgba(0,0,0,0.15) 0%, transparent 60%)", filter: "blur(10px)" }}/>
            </div>
            <div style={{ display: "flex", gap: 0, background: "rgba(255,255,255,0.8)", backdropFilter: "blur(20px)", border: "1px solid var(--border-light)", borderRadius: 20, overflow: "hidden", transform: "translateZ(30px)", boxShadow: "0 15px 30px rgba(0,0,0,0.05)" }}>
              {[{ num: "2.4K+", label: "Pros" },{ num: "1 Tap", label: "Connexion" },{ num: "100%", label: "Écolo" }].map((s, i) => (
                <div key={i} style={{ padding: "16px 20px", textAlign: "center", borderRight: i < 2 ? "1px solid var(--border-light)" : "none" }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(16px, 4vw, 20px)", fontWeight: 800, color: "var(--dima-green)" }}>{s.num}</div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 4, fontWeight: "600" }}>{s.label}</div>
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
  { title: 'Technologie NFC', description: 'Un simple contact suffit pour partager votre profil. Pas de scan, pas de friction, juste une connexion instantanée.', icon: <Nfc className="w-8 h-8 text-[#00D66B]" />, color: 'from-[#00D66B]/20 to-[#00A354]/20' },
  { title: 'Analyses en Temps Réel', description: 'Suivez qui consulte votre carte et quand. Transformez vos rencontres en opportunités mesurables.', icon: <BarChart className="w-8 h-8 text-[#D500F9]" />, color: 'from-[#D500F9]/20 to-[#A000BA]/20' },
  { title: 'Personnalisation Totale', description: 'Choisissez parmi nos designs premium ou créez le vôtre. Votre carte doit être aussi unique que votre marque.', icon: <Palette className="w-8 h-8 text-[#69FFB4]" />, color: 'from-[#69FFB4]/20 to-[#00D66B]/20' },
];

function Features() {
  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0F172A] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00D66B]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-20">
          <h2 className="text-4xl sm:text-6xl font-black mb-6 tracking-tight text-white" style={{ fontFamily: 'var(--font-display)' }}>
            L'Expérience{' '}
            <span style={{ backgroundImage: 'linear-gradient(to right, #00D66B, #D500F9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent', display: 'inline-block' }}>
              Premium
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">Tout ce dont vous avez besoin pour propulser votre réseau dans une nouvelle dimension.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuresInfo.map((feature, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: index * 0.2 }} whileHover={{ y: -10, scale: 1.02 }} className="relative group">
              <div className="h-full glass p-10 rounded-2xl border border-white/10 group-hover:border-[#00D66B]/50 transition-all duration-500 relative overflow-hidden flex flex-col items-start">
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative mb-8 p-4 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 shadow-xl">
                  {feature.icon}
                  <div className="absolute inset-0 bg-white/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 relative z-10" style={{ fontFamily: 'var(--font-display)' }}>{feature.title}</h3>
                <p className="text-slate-300 leading-relaxed relative z-10 group-hover:text-white transition-colors">{feature.description}</p>
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
  { number: '01', title: 'Commandez votre carte', description: 'Choisissez votre design DimaCard. Vous recevrez une carte physique premium équipée de notre technologie NFC sécurisée.', icon: <Zap className="w-5 h-5 text-[#00D66B]" /> },
  { number: '02', title: 'Configurez votre profil', description: 'Créez votre identité digitale sur notre plateforme. Ajoutez vos réseaux, votre portfolio et vos coordonnées en quelques clics.', icon: <Smartphone className="w-5 h-5 text-[#D500F9]" /> },
  { number: '03', title: 'Scannez et Partagez', description: 'Approchez votre carte du smartphone de votre contact. Boom ! Votre profil s\'affiche, sans aucune application requise.', icon: <Share2 className="w-5 h-5 text-[#69FFB4]" /> },
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
    <section id="showcase" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0F172A] relative overflow-hidden">
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-[#D500F9]/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="space-y-12 relative z-10">
            <div>
              <h2 className="text-4xl sm:text-6xl font-black mb-6 tracking-tight text-white" style={{ fontFamily: 'var(--font-display)' }}>
                Comment ça{' '}
                <span style={{ backgroundImage: 'linear-gradient(to right, #00D66B, #D500F9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent', display: 'inline-block' }}>
                  marche ?
                </span>
              </h2>
              <p className="text-xl text-slate-300">Passez au networking nouvelle génération en trois étapes simples.</p>
            </div>
            <div className="space-y-8">
              {combinedSteps.map((step, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.2 }} viewport={{ once: true }} className="flex gap-6 group">
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-[#00D66B] group-hover:bg-[#00D66B]/10 transition-all duration-300 shrink-0 shadow-lg">
                      {step.icon}
                    </div>
                    {index !== combinedSteps.length - 1 && <div className="w-px h-full bg-gradient-to-b from-[#00D66B]/50 to-transparent my-2" />}
                  </div>
                  <div className="pb-6">
                    <div className="text-sm font-mono text-[#00D66B] mb-1">Étape {step.number}</div>
                    <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-display)' }}>{step.title}</h3>
                    <p className="text-slate-400 leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="relative flex justify-center items-center h-[600px] w-full pt-20 overflow-visible">
            <motion.div animate={{ y: scanState === 'scanning' ? 80 : -50, scale: scanState === 'scanning' ? 0.9 : 1, rotateX: scanState === 'success' ? 45 : 15, opacity: scanState === 'success' ? 0 : 1 }} transition={{ duration: 0.6, ease: "easeInOut" }} style={{ perspective: "1000px" }} className="absolute top-0 z-50 flex justify-center w-full">
              <div className="w-40 h-28 rounded-xl bg-gradient-to-br from-[#1A1A1E] to-[#0A0A0C] border border-white/20 shadow-2xl flex items-center justify-center relative overflow-hidden transform rotate-12">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#00D66B]/20 to-transparent" />
                <CreditCard className="text-white/50 w-6 h-6 absolute top-2 left-2" />
                <span className="text-white font-bold text-lg tracking-widest z-10" style={{ fontFamily: 'var(--font-logo)', textShadow: '-1.5px 2px 0px var(--dima-magenta)' }}>DIMA</span>
                <Nfc className="text-[#00D66B] w-5 h-5 absolute bottom-2 right-2" />
              </div>
            </motion.div>
            
            <div className="relative z-10 w-[280px] h-[560px] bg-gray-900 rounded-[2.5rem] border-[6px] border-gray-800 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-50" />
              <div className="relative w-full h-full bg-[#0a0a0a]">
                <AnimatePresence mode="wait">
                  {(scanState === 'waiting' || scanState === 'scanning') && (
                    <motion.div key="waiting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }} className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                      <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="w-20 h-20 bg-[#00D66B]/10 rounded-full flex items-center justify-center mb-6"><Nfc className="w-10 h-10 text-[#00D66B]" /></motion.div>
                      <h3 className="text-white font-semibold text-lg mb-2" style={{ fontFamily: 'var(--font-display)' }}>Prêt à scanner</h3>
                      <p className="text-gray-500 text-xs">Approchez la carte</p>
                    </motion.div>
                  )}
                  {scanState === 'success' && (
                    <motion.div key="success" initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="absolute inset-0 bg-[#111] overflow-y-auto pb-6 scrollbar-hide">
                      <div className="h-32 bg-gradient-to-br from-[#00A354] to-[#0F172A]" />
                      <div className="px-5 -mt-10 relative z-10 flex flex-col items-center">
                        <div className="w-20 h-20 rounded-full border-4 border-[#111] bg-gray-800 flex items-center justify-center shadow-lg"><span className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>JD</span></div>
                        <div className="mt-3 text-center">
                          <h2 className="text-xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>Jean Dupont</h2>
                          <p className="text-[#00D66B] font-medium text-xs mt-1">Directeur Innovation</p>
                        </div>
                        <button className="w-full mt-4 bg-white text-black font-bold py-2 rounded-xl flex items-center justify-center gap-2 text-sm hover:bg-gray-200" style={{ fontFamily: 'var(--font-body)' }}><UserPlus className="w-4 h-4" /> Sauvegarder</button>
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
    features: ['1 Carte PVC standard', 'Profil digital de base', 'Idéal pour les événements'], 
    highlight: false, 
    productId: 'etudiant' 
  },
  { 
    name: 'Starter', 
    price: '149 DH', 
    description: 'La solution simple et immédiate pour partager vos coordonnées.', 
    features: ['1 Carte PVC haute qualité', 'Lien de profil direct', 'Profil digital fixe'], 
    highlight: false, 
    productId: 'starter' 
  },
  { 
    name: 'Pro', 
    price: '299 DH', 
    description: 'Prenez le contrôle total de votre identité professionnelle.', 
    features: ['1 Carte PVC Premium', 'Profil 100% modifiable', 'Accès complet à la plateforme'], 
    highlight: true, 
    productId: 'pro' 
  },
  { 
    name: 'Entreprise', 
    price: 'Sur devis', 
    description: 'Une solution sur-mesure à partir de 5 collaborateurs.', 
    features: ['Cartes 100% personnalisées', 'Plus de 5 cartes', 'Gestion centralisée'], 
    highlight: false, 
    productId: 'entreprise' 
  },
];

function Pricing({ setCurrentPage }) {
  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FAFAFA] relative overflow-hidden">
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-[#00D66B]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-16 space-y-4">
          <h2 className="text-4xl sm:text-6xl font-black mb-6 tracking-tight text-slate-900" style={{ fontFamily: 'var(--font-display)' }}>
            Passez au{' '}
            <span style={{ backgroundImage: 'linear-gradient(to right, #00D66B, #D500F9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent', display: 'inline-block' }}>
              Networking 2.0
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-body)' }}>Choisissez l'offre DimaCard qui correspond à vos ambitions.</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {plans.map((plan, index) => (
            <motion.div key={index} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} whileHover={{ y: -10 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }} className={`relative p-6 xl:p-8 rounded-3xl transition-all duration-500 flex flex-col h-full ${plan.highlight ? 'bg-white border-2 border-[#00D66B] shadow-[0_20px_50px_rgba(0,214,107,0.15)] md:scale-105 z-20' : 'bg-white border border-slate-200 hover:border-[#00D66B]/30 shadow-sm z-10'}`}>
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#00D66B] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-1 whitespace-nowrap">
                  <Sparkles className="w-3 h-3" /> Recommandé
                </div>
              )}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-slate-900 mb-2" style={{ fontFamily: 'var(--font-display)' }}>{plan.name}</h3>
                <p className="text-sm text-slate-500 mb-6 min-h-[60px]" style={{ fontFamily: 'var(--font-body)' }}>{plan.description}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl xl:text-4xl font-black text-slate-900" style={{ fontFamily: 'var(--font-display)' }}>{plan.price}</span>
                  {plan.price !== 'Sur devis' && <span className="text-slate-500 text-xs" style={{ fontFamily: 'var(--font-body)' }}>/une fois</span>}
                </div>
              </div>
              <ul className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-600" style={{ fontFamily: 'var(--font-body)' }}>
                    <Check className={`w-5 h-5 shrink-0 mt-0.5 ${plan.highlight ? 'text-[#00D66B]' : 'text-slate-400'}`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button onClick={() => setCurrentPage(`product_${plan.productId}`)} className={`w-full py-4 px-2 rounded-xl font-bold transition-all duration-300 cursor-pointer border-none text-sm xl:text-base ${plan.highlight ? 'bg-[#00D66B] text-white hover:bg-[#00A354] shadow-lg shadow-[#00D66B]/20' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'}`} style={{ fontFamily: 'var(--font-body)' }}>
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
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwxa15n3I42jHSZGnjmBnXvmqSEhvzDml4GkgfqsP-fZsGvVkOkmC1n7pQvv7BPFlPh/exec';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const dataToSend = new FormData();
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
      alert("Erreur de connexion.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00D66B]/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-4xl sm:text-6xl font-black mb-6 tracking-tight text-slate-900" style={{ fontFamily: 'var(--font-display)' }}>
            Prêt à faire le{' '}
            <span style={{ backgroundImage: 'linear-gradient(to right, #00D66B, #D500F9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent', display: 'inline-block' }}>
              premier pas ?
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-body)' }}>Contactez l'équipe DimaCard pour une démo ou une commande personnalisée.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xl relative z-20">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }} className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2" style={{ fontFamily: 'var(--font-display)' }}>Nos Coordonnées</h3>
              <p className="text-slate-500 text-sm" style={{ fontFamily: 'var(--font-body)' }}>Nous répondons généralement en moins de 24h.</p>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4"><div className="w-12 h-12 rounded-xl bg-[#00D66B]/10 border border-[#00D66B]/20 flex items-center justify-center shrink-0"><Mail className="w-5 h-5 text-[#00D66B]" /></div><div><h4 className="text-slate-900 font-bold mb-1">Email</h4><a href="mailto:contact@dimacard.ma" className="text-slate-600 hover:text-[#00D66B] transition-colors text-sm font-medium">contact@dimacard.ma</a></div></div>
              <div className="flex items-start gap-4"><div className="w-12 h-12 rounded-xl bg-[#00D66B]/10 border border-[#00D66B]/20 flex items-center justify-center shrink-0"><Phone className="w-5 h-5 text-[#00D66B]" /></div><div><h4 className="text-slate-900 font-bold mb-1">Téléphone</h4><a href="tel:+212708066509" className="text-slate-600 hover:text-[#00D66B] transition-colors text-sm font-medium">+212 6 00 00 00 00</a></div></div>
              <div className="flex items-start gap-4"><div className="w-12 h-12 rounded-xl bg-[#00D66B]/10 border border-[#00D66B]/20 flex items-center justify-center shrink-0"><MapPin className="w-5 h-5 text-[#00D66B]" /></div><div><h4 className="text-slate-900 font-bold mb-1"> Bureau</h4><p className="text-slate-600 text-sm font-medium">Tanger, Maroc</p></div></div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }} viewport={{ once: true }} className="lg:col-span-3">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2"><label htmlFor="name" className="text-sm font-bold text-slate-700">Nom complet</label><input type="text" id="name" required value={formData.name} onChange={handleChange} className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-[#00D66B] focus:ring-1 focus:ring-[#00D66B]" /></div>
                <div className="space-y-2"><label htmlFor="email" className="text-sm font-bold text-slate-700">Adresse Email</label><input type="email" id="email" required value={formData.email} onChange={handleChange} className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-[#00D66B] focus:ring-1 focus:ring-[#00D66B]" /></div>
              </div>
              <div className="space-y-2"><label htmlFor="subject" className="text-sm font-bold text-slate-700">Sujet</label><input type="text" id="subject" required value={formData.subject} onChange={handleChange} className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-[#00D66B] focus:ring-1 focus:ring-[#00D66B]" /></div>
              <div className="space-y-2"><label htmlFor="message" className="text-sm font-bold text-slate-700">Message</label><textarea id="message" required rows="4" value={formData.message} onChange={handleChange} className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-[#00D66B] focus:ring-1 focus:ring-[#00D66B] resize-none"></textarea></div>
              <button type="submit" disabled={isSubmitting || isSuccess} className={`w-full sm:w-auto px-8 py-4 font-bold rounded-xl flex items-center justify-center gap-2 border-none cursor-pointer text-white shadow-lg ${isSuccess ? 'bg-[#00A354] shadow-[#00A354]/20' : 'bg-[#00D66B] hover:bg-[#00A354] shadow-[#00D66B]/30 hover:shadow-[#00D66B]/50'} disabled:opacity-70 disabled:cursor-not-allowed`} style={{ fontFamily: 'var(--font-body)' }}>
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
    <footer style={{ background: "var(--bg-white)", borderTop: "1px solid var(--border-light)", padding: "60px 0 40px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <div className="footer-grid" style={{ display: "grid", marginBottom: 64 }}>
          <div className="flex flex-col items-center md:items-start">
            <div style={{ marginBottom: 20 }}><span className="brand-logo-text" style={{ fontSize: 28, textShadow: "-1.5px 2px 0px var(--dima-magenta)" }}>DIMA CARD</span></div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "var(--text-muted)", lineHeight: 1.7, marginBottom: 24, maxWidth: 300 }}>La carte de visite NFC la plus intelligente.</p>
            <div className="footer-socials" style={{ display: "flex", gap: 12 }}>
              {["𝕏","in","ig"].map((s, i) => <a key={i} href="#" style={{ width: 36, height: 36, borderRadius: "50%", background: "#F1F5F9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: "var(--text-muted)", textDecoration: "none", fontWeight: "600" }}>{s}</a>)}
            </div>
          </div>
          {[ { title: "Produit", links: ["Fonctionnalités","Tarifs","Comment ça marche"] }, { title: "Entreprise", links: ["À propos","Contact"] }, { title: "Légal", links: ["Confidentialité","CGV"] } ].map((col, i) => (
            <div key={i}>
              <h4 style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 800, color: "var(--text-main)", marginBottom: 20 }}>{col.title}</h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                {col.links.map(l => <li key={l}><a href="#" style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "var(--text-muted)", textDecoration: "none", fontWeight: "500" }}>{l}</a></li>)}
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
  const [orderData, setOrderData] = useState({ fullName: '', jobTitle: '', company: '', phone: '', email: '', linkedin: '' });

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setOrderData({ fullName: '', jobTitle: '', company: '', phone: '', email: '', linkedin: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
      <button onClick={() => setCurrentPage('home')} className="mb-8 flex items-center gap-2 text-slate-500 hover:text-[#00D66B] transition-colors font-bold bg-transparent border-none cursor-pointer">
        <ArrowLeft className="w-5 h-5" /> Retour
      </button>

      {/* SÉLECTEUR DE MODÈLE */}
      <div className="flex gap-4 mb-12 overflow-x-auto pb-4 scrollbar-hide">
        {Object.values(productsData).map(p => (
          <button 
            key={p.id} 
            onClick={() => setCurrentPage(`product_${p.id}`)}
            className={`px-6 py-3 rounded-full font-bold whitespace-nowrap transition-all border-2 cursor-pointer ${product.id === p.id ? 'bg-[#00D66B] text-white border-[#00D66B] shadow-lg shadow-[#00D66B]/30' : 'bg-white text-slate-600 border-slate-200 hover:border-[#00D66B]/50'}`}
          >
            {p.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* COLONNE GAUCHE : IMAGE ET INFOS */}
        <div className="space-y-8">
          
          {/* CORRECTION ICI : aspect-square retiré, utilisation de aspect-[1.58] sur la carte pour respecter la forme d'une carte de visite */}
          <div className="relative rounded-3xl overflow-hidden flex items-center justify-center p-8 sm:p-16 shadow-2xl" style={{ background: `${product.bgGradient}80`, minHeight: '400px' }}>
            <div className="w-full max-w-[420px] relative card-3d-anim" style={{ aspectRatio: '1.58' }}>
               <DimacardPhysical product={product} />
            </div>
          </div>
          
          <div>
            <div className="inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 border" style={{ color: product.themeColor, backgroundColor: `${product.themeColor}15`, borderColor: `${product.themeColor}30` }}>
              {product.tag}
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
              {product.name}
            </h1>
            <p className="text-lg text-slate-600 mt-4 leading-relaxed">{product.desc}</p>
          </div>
          <div className="space-y-4">
            {product.features.map((feat, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-2xl shadow-sm">
                <Check className="w-6 h-6 shrink-0" style={{ color: product.themeColor }} />
                <span className="font-bold text-slate-800">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* COLONNE DROITE : FORMULAIRE DE COMMANDE */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#00D66B]/5 blur-[80px] rounded-full pointer-events-none" />
          
          <div className="flex justify-between items-end mb-8 border-b border-slate-100 pb-6">
            <div>
              <h2 className="text-2xl font-black text-slate-900" style={{ fontFamily: 'var(--font-display)' }}>Personnalisez votre carte</h2>
              <p className="text-sm text-slate-500 mt-1">Saisissez les infos à configurer sur la puce.</p>
            </div>
            <span className="text-3xl font-black" style={{ color: product.themeColor, fontFamily: 'var(--font-display)' }}>{product.price}</span>
          </div>

          <form onSubmit={handleOrderSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2"><UserPlus className="w-4 h-4 text-[#00D66B]" /> Nom Complet</label>
                <input type="text" required value={orderData.fullName} onChange={e => setOrderData({...orderData, fullName: e.target.value})} className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-[#00D66B] focus:ring-1" placeholder="Ex: Jean Dupont" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2"><Briefcase className="w-4 h-4 text-[#00D66B]" /> Fonction</label>
                <input type="text" required value={orderData.jobTitle} onChange={e => setOrderData({...orderData, jobTitle: e.target.value})} className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-[#00D66B] focus:ring-1" placeholder="Ex: CEO & Fondateur" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2"><Building className="w-4 h-4 text-[#00D66B]" /> Nom de l'Entreprise</label>
              <input type="text" value={orderData.company} onChange={e => setOrderData({...orderData, company: e.target.value})} className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-[#00D66B] focus:ring-1" placeholder="Ex: DimaTech S.A.R.L" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2"><Phone className="w-4 h-4 text-[#00D66B]" /> Téléphone pro</label>
                <input type="tel" required value={orderData.phone} onChange={e => setOrderData({...orderData, phone: e.target.value})} className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-[#00D66B] focus:ring-1" placeholder="+212 6 XX XX XX XX" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2"><Mail className="w-4 h-4 text-[#00D66B]" /> Email pro</label>
                <input type="email" required value={orderData.email} onChange={e => setOrderData({...orderData, email: e.target.value})} className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-[#00D66B] focus:ring-1" placeholder="contact@entreprise.ma" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2"><Linkedin className="w-4 h-4 text-[#00D66B]" /> Lien Profil (LinkedIn / Portfolio)</label>
              <input type="url" value={orderData.linkedin} onChange={e => setOrderData({...orderData, linkedin: e.target.value})} className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-[#00D66B] focus:ring-1" placeholder="https://linkedin.com/in/votreprofil" />
            </div>

            <button type="submit" disabled={isSubmitting || isSuccess} className={`w-full py-5 mt-4 font-black rounded-2xl flex items-center justify-center gap-2 transition-all cursor-pointer text-white border-none shadow-xl ${isSuccess ? 'bg-[#00A354] shadow-[#00A354]/30' : 'bg-[#00D66B] hover:bg-[#00A354] shadow-[#00D66B]/30'} disabled:opacity-80`} style={{ fontFamily: 'var(--font-body)' }}>
              {isSubmitting ? <><Loader className="w-6 h-6 animate-spin" /> Traitement de la commande...</> : isSuccess ? <><CheckCircle className="w-6 h-6" /> Commande Confirmée !</> : <>VALIDER MA CARTE ({product.price}) <Zap className="w-5 h-5" /></>}
            </button>
            <p className="text-center text-xs text-slate-400 mt-2">Paiement sécurisé à la livraison. Livraison 48h au Maroc.</p>
          </form>
        </div>
      </div>
    </motion.div>
  );
}

// ─── COMPOSANT RACINE DE L'APPLICATION ───────────────────────────────────────
export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  // Détection de la page demandée
  const isProductPage = currentPage.startsWith('product_');
  const productId = isProductPage ? currentPage.split('_')[1] : null;

  return (
    <div className="bg-[#FAFAFA] min-h-screen">
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