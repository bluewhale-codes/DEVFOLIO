import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
//   Github,
//   Linkedin,
//   Twitter,
//   Instagram,
//   Mail,
  MessageCircle,
  Code2,
  ExternalLink,
  Rocket,
  Globe,
  Sun,
  Moon,
  ArrowUpRight,
  Sparkles,
  Zap
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ── SOCIAL PLATFORMS DATA ──
const socialPlatforms = [
  {
    id: 'github',
    name: 'GitHub',
    username: '@bluewhale-codes',
    description: 'Code, projects & open source',
    icon: <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-7 w-7"
        fill="currentColor"
        style={{ color: "#333" }}
        viewBox="0 0 24 24"
      >
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>,
    href: 'https://github.com/bluewhale-codes',
    color: '#FF5A1F'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    username: '@vishalshakya',
    description: 'Professional network & updates',
    icon: <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-7 w-7"
        fill="currentColor"
        style={{ color: "#0077b5" }}
        viewBox="0 0 24 24"
      >
        <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
      </svg>,
    href: 'https://www.linkedin.com/in/vishal-shakya-417170249/',
    color: '#FF5A1F'
  },
  
  {
    id: 'instagram',
    name: 'Instagram',
    username: '@vishalshakya796',
    description: 'Design, life & behind the scenes',
    icon:  <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-7 w-7"
        fill="currentColor"
        style={{ color: "#c13584" }}
        viewBox="0 0 24 24"
      >
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
,
    href: 'https://www.instagram.com/vishalshakya796/',
    color: '#FF5A1F'
  },
  {
    id: 'email',
    name: 'Email',
    username: 'vishalshakya2255@gmail.com',
    description: 'Drop me an email anytime',
    icon: <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-7 w-7"
        fill="currentColor"
        style={{ color: "#ea4335" }}
        viewBox="0 0 24 24"
      >
        <path
          d="M7 11v2.4h3.97c-.16 1.029-1.2 3.02-3.97 3.02-2.39 0-4.34-1.979-4.34-4.42 0-2.44 1.95-4.42 4.34-4.42 1.36 0 2.27.58 2.79 1.08l1.9-1.83c-1.22-1.14-2.8-1.83-4.69-1.83-3.87 0-7 3.13-7 7s3.13 7 7 7c4.04 0 6.721-2.84 6.721-6.84 0-.46-.051-.81-.111-1.16h-6.61zm0 0 17 2h-3v3h-2v-3h-3v-2h3v-3h2v3h3v2z"
          fillRule="evenodd"
          clipRule="evenodd"
        />
      </svg>,
    href: 'vishalshakya2255@gmail.com',
    color: '#FF5A1F'
  },
 
];

const footerSocials = [
  { icon: MessageCircle, href: 'https://github.com/username', label: 'GitHub' },
  { icon: MessageCircle, href: 'https://linkedin.com/in/username', label: 'LinkedIn' },
  { icon: MessageCircle, href: 'https://twitter.com/username', label: 'Twitter' },
  { icon: MessageCircle, href: 'https://instagram.com/username', label: 'Instagram' }
];

// ── DECORATIVE SVG COMPONENTS ──
const OrangeBlob = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 200 200" fill="none">
    <path d="M40,100 Q30,40 80,30 Q130,20 160,60 Q190,100 170,150 Q150,200 100,190 Q50,180 40,130 Q30,80 40,100Z" 
          fill="#FF5A1F" opacity="0.9"/>
  </svg>
);

const StarIllustration = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 60 60" fill="none">
    <path d="M30 0L33 22L45 5L37 24L60 15L40 30L60 45L37 36L45 55L33 38L30 60L27 38L15 55L23 36L0 45L20 30L0 15L23 24L15 5L27 22Z" 
          fill="#111111"/>
  </svg>
);

const CrossMark = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" stroke="#FF5A1F" strokeWidth="2.5" strokeLinecap="round">
    <path d="M5 5L15 15M15 5L5 15"/>
  </svg>
);

const DottedTexture = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 100 100" width="100%" height="100%">
    <defs>
      <pattern id="dots" width="12" height="12" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1" fill="#111111" opacity="0.08"/>
      </pattern>
    </defs>
    <rect width="100" height="100" fill="url(#dots)" />
  </svg>
);

const GlobeWireframe = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 120 120" fill="none" stroke="#7B6FFF" strokeWidth="0.8" opacity="0.4">
    <circle cx="60" cy="60" r="50"/>
    <ellipse cx="60" cy="60" rx="50" ry="20"/>
    <ellipse cx="60" cy="60" rx="50" ry="20" transform="rotate(60 60 60)"/>
    <ellipse cx="60" cy="60" rx="50" ry="20" transform="rotate(120 60 60)"/>
    <line x1="10" y1="60" x2="110" y2="60"/>
    <line x1="60" y1="10" x2="60" y2="110"/>
  </svg>
);

const CurvedArrow = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 80 50" fill="none">
    <path d="M5 40 Q 30 5, 60 20 Q 75 28, 70 40" stroke="#FF5A1F" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M60 28 L 72 40 L 58 45" stroke="#FF5A1F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ── SOCIAL CARD COMPONENT ──
const SocialCard = ({ platform, index, isDark }) => {
  const Icon = platform.icon;
  
  return (
    <motion.a
      href={platform.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      whileHover={{ scale: 1.03, y: -4 }}
      className={`group relative rounded-3xl p-5 sm:p-6 transition-all duration-300 cursor-pointer ${
        isDark 
          ? 'bg-[#1a1a1a] border border-gray-800 hover:border-[#FF5A1F]/30 hover:shadow-lg hover:shadow-[#FF5A1F]/5' 
          : 'bg-white border border-gray-100 hover:border-[#FF5A1F]/20 hover:shadow-xl hover:shadow-black/[0.06]'
      }`}
    >
      {/* Icon Circle */}
      <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mb-4 transition-colors duration-300 ${
        isDark ? 'bg-[#2a2a2a] group-hover:bg-[#FF5A1F]/10' : 'bg-[#F7F7F8] group-hover:bg-[#FF5A1F]/10'
      }`}>
        {/* <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF5A1F]" /> */}
        {Icon}
      </div>
      
      {/* Platform Name */}
      <h3 className={`text-sm sm:text-base font-bold mb-0.5 transition-colors ${isDark ? 'text-gray-100' : 'text-[#111111]'}`}>
        {platform.name}
      </h3>
      
      {/* Username */}
      <p className="text-xs text-[#FF5A1F] font-medium mb-2">
        {platform.username}
      </p>
      
      {/* Description */}
      <p className={`text-[11px] sm:text-xs leading-relaxed mb-4 ${isDark ? 'text-gray-500' : 'text-[#666666]'}`}>
        {platform.description}
      </p>
      
      {/* Arrow */}
      <div className="absolute bottom-5 right-5 sm:bottom-6 sm:right-6">
        <ArrowUpRight className={`w-4 h-4 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
          isDark ? 'text-gray-600 group-hover:text-[#FF5A1F]' : 'text-gray-400 group-hover:text-[#FF5A1F]'
        }`} />
      </div>
    </motion.a>
  );
};

// ── MAIN COMPONENT ──
const ContactSocialHub = () => {
  const [isDark, setIsDark] = useState(false);
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const bannerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
        x: -40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: leftRef.current, start: "top 85%" }
      });
      
      gsap.from(rightRef.current, {
        x: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: rightRef.current, start: "top 85%" }
      });

      gsap.from(bannerRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: bannerRef.current, start: "top 90%" }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const bgClass = isDark ? 'bg-[#0a0a0a]' : 'bg-[#F7F7F8]';
  const textPrimary = isDark ? 'text-gray-100' : 'text-[#111111]';
  const textSecondary = isDark ? 'text-gray-400' : 'text-[#666666]';
  const cardBg = isDark ? 'bg-[#1a1a1a] border-gray-800' : 'bg-white border-gray-100';

  return (
    <section ref={sectionRef} className={`w-full min-h-screen relative overflow-hidden transition-colors duration-500 ${bgClass}`}>
      
      {/* Subtle dotted texture overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <DottedTexture />
      </div>

      {/* ── THEME TOGGLE ── */}
      <div className="fixed top-30 right-6 z-50">
        <button
          onClick={() => setIsDark(!isDark)}
          className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-300 shadow-lg backdrop-blur-sm ${
            isDark 
              ? 'border-gray-700 bg-[#1a1a1a] text-yellow-400 hover:border-yellow-400' 
              : 'border-gray-200 bg-white/80 text-gray-700 hover:border-[#FF5A1F] hover:text-[#FF5A1F]'
          }`}
          aria-label="Toggle theme"
        >
          <AnimatePresence mode="wait">
            {isDark ? (
              <motion.div
                key="sun"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Sun className="w-5 h-5" />
              </motion.div>
            ) : (
              <motion.div
                key="moon"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Moon className="w-5 h-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-16 sm:pt-20 lg:pt-24 pb-8 relative">
        
        {/* ════════════════════════════════════════
            TOP: 45/55 SPLIT — Brand Story | Social Hub
           ════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 mb-16 sm:mb-20 lg:mb-24">
          
          {/* ── LEFT: BRAND HERO (5 cols) ── */}
          <div ref={leftRef} className="lg:col-span-5 flex flex-col justify-between">
            
            {/* Section Indicator */}
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs sm:text-sm text-[#FF5A1F] font-mono mb-4 sm:mb-6"
            >
              (04)
            </motion.span>

            {/* Main Heading */}
            <div className="z-10 mb-6 sm:mb-8">
              <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-5xl font-black leading-[0.85] mb-2">
                <span className="block text-transparent" style={{ WebkitTextStroke: '2.5px #FF5A1F' }}>
                  LET\'S
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FF5A1F] to-[#FF4D1A]">
                  CONNECT
                </span>
              </h1>
            </div>

            {/* Copy */}
            <div className="">
              <p className={`text-sm sm:text-base leading-relaxed max-w-sm  ${textSecondary}`}>
                "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision."
              </p>
              
            </div>

            {/* ── EDITORIAL COLLAGE ── */}
            <div className="relative h-48 sm:h-56 lg:h-64 mt-auto">
              {/* Dotted texture bg */}

             <div className="absolute z-0 
                    bottom-0 left-1/2 -translate-x-1/2
                    w-[260px] sm:w-[320px] md:w-[420px] lg:w-[520px] xl:w-[620px]">
                    
                    <img
                        src="https://res.cloudinary.com/dycjjaxsk/image/upload/v1780567925/ChatGPT_Image_Jun_4_2026_03_36_02_PM-Photoroom_1_uxmcmj.png"
                        alt="hero"
                        className="w-full h-auto object-contain"
                    />
                    </div>
              <div className="absolute inset-0 opacity-30">
                <DottedTexture />
              </div>
              
              {/* Orange organic blob */}
              <div className="absolute top-4 left-4 w-24 h-24 sm:w-28 sm:h-28">
                <OrangeBlob />
              </div>
              
              {/* Hand gesture placeholder */}
              <div className="absolute bottom-2 left-8 w-20 h-24 sm:w-24 sm:h-28 opacity-80">
                <svg viewBox="0 0 100 120" fill="none">
                  <path d="M30,80 Q20,60 25,40 Q30,20 45,15 Q60,10 70,25 Q80,40 75,60 Q70,80 60,95 Q50,110 40,105 Q30,100 30,80Z" 
                        fill="#111111" opacity="0.15"/>
                  <path d="M35,75 Q28,58 32,42 Q36,26 48,22 Q60,18 68,32 Q76,46 72,62 Q68,78 58,90 Q48,102 40,98 Q32,94 35,75Z" 
                        fill="#111111" opacity="0.08"/>
                </svg>
              </div>
              
              {/* Star illustration */}
              <div className="absolute top-2 right-12 w-6 h-6 sm:w-8 sm:h-8">
                <StarIllustration />
              </div>
              
              {/* Cross mark */}
              <div className="absolute top-1/3 right-4 w-4 h-4">
                <CrossMark />
              </div>
              
              {/* Curved arrow */}
              <div className="absolute bottom-8 right-8 w-14 h-8 sm:w-16 sm:h-10">
                <CurvedArrow />
              </div>
              
             
              
              {/* Sticker text */}
              <motion.div
                initial={{ rotate: -3 }}
                animate={{ rotate: 3 }}
                transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                className="absolute bottom-2 right-2 bg-[#FF5A1F] text-white px-3 py-1.5 rounded-lg shadow-lg"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 85%, 92% 100%, 0 100%)" }}
              >
                <p className="text-[9px] sm:text-[10px] font-bold leading-tight">
                  LET\'S BUILD<br/>SOMETHING GREAT.
                </p>
              </motion.div>
              
              {/* Small decorative circles */}
              
            </div>
          </div>

          {/* ── RIGHT: SOCIAL CONNECT HUB (7 cols) ── */}
          <div ref={rightRef} className="lg:col-span-7">
            
            {/* Hub Header */}
            <div className="mb-6 sm:mb-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F]" />
                <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-[#FF5A1F] uppercase">
                  Let\'s Connect
                </span>
              </div>
              <p className={`text-xs sm:text-sm max-w-md ${textSecondary}`}>
                You can reach out to me anytime on the platforms below.
              </p>
            </div>

            {/* Social Card Grid — 2 rows × 4 columns */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
              {socialPlatforms.map((platform, index) => (
                <SocialCard 
                  key={platform.id} 
                  platform={platform} 
                  index={index}
                  isDark={isDark}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════
            CONVERSION BANNER
           ════════════════════════════════════════ */}
        <motion.div
          ref={bannerRef}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`relative rounded-3xl p-6 sm:p-8 lg:p-10 mb-12 sm:mb-16 overflow-hidden ${
            isDark ? 'bg-[#5A54FF]/10 border border-[#5A54FF]/20' : 'bg-[#F0EEFF]'
          }`}
        >
          {/* Globe wireframe decoration */}
          <div className="absolute right-4 sm:right-8 lg:right-16 top-1/2 -translate-y-1/2 w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 opacity-30">
            <GlobeWireframe />
          </div>
          
          <div className="relative z-10 flex items-center gap-4 sm:gap-6">
            {/* Rocket Icon */}
            <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${
              isDark ? 'bg-[#5A54FF]/20' : 'bg-white'
            }`}>
              <Rocket className="w-6 h-6 sm:w-7 sm:h-7 text-[#5A54FF]" />
            </div>
            
            {/* Message */}
            <div>
              <p className={`text-lg sm:text-xl lg:text-2xl font-bold leading-tight ${textPrimary}`}>
                Let\'s turn your ideas into{' '}
                <span className="text-[#5A54FF]">powerful digital solutions.</span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* ════════════════════════════════════════
            FOOTER
           ════════════════════════════════════════ */}
        
      </div>
    </section>
  );
};

export default ContactSocialHub;