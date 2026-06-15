import React, { useState, useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import {
  Home,
  User,
  Code2,
  FolderOpen,
  Trophy,
  Mail,
  ArrowRight,
  Sun,
  Moon,
  Menu,
  X,
} from "lucide-react";

// ─── THEME CONTEXT ─────────────────────────────────────────────────────
const ThemeContext = React.createContext({
  theme: "light",
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const navigate = useNavigate();
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => React.useContext(ThemeContext);

// ─── THEME TOGGLE BUTTON ─────────────────────────────────────────────────
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const btnRef = useRef(null);

  useGSAP(() => {
    if (btnRef.current) {
      gsap.fromTo(btnRef.current, 
        { scale: 0, rotation: -180 }, 
        { scale: 1, rotation: 0, duration: 0.6, ease: "back.out(1.7)", delay: 1.2 }
      );
    }
  }, { scope: btnRef });

  return (
    <button
      ref={btnRef}
      onClick={toggleTheme}
      className="flex h-8 w-8 items-center justify-center rounded-full bg-white/80 shadow-sm transition-all duration-300 hover:scale-110 hover:shadow-md dark:bg-[#1a1a1a]/80"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Moon className="h-3.5 w-3.5 text-[#111111]" />
      ) : (
        <Sun className="h-3.5 w-3.5 text-[#FFD233]" />
      )}
    </button>
  );
};

// ─── STAR DOODLE SVG ─────────────────────────────────────────────────────
const StarDoodle = ({ className = "" }) => {
  const ref = useRef(null);
  
  useGSAP(() => {
    if (ref.current) {
      gsap.fromTo(ref.current, 
        { scale: 0, rotation: -180 },
        { scale: 1, rotation: 0, duration: 0.8, ease: "elastic.out(1, 0.5)", delay: 0.6 }
      );
      gsap.to(ref.current, {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none",
        delay: 1.5
      });
    }
  }, { scope: ref });

  return (
    <svg ref={ref} viewBox="0 0 60 60" className={className} fill="none">
      <path
        d="M30 5L35.5 22.5L55 22.5L39 33.5L44.5 51L30 40.5L15.5 51L21 33.5L5 22.5L24.5 22.5L30 5Z"
        stroke="#FFD233"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="#FFD233"
        fillOpacity="0.15"
      />
    </svg>
  );
};

// ─── ANIMATED TEXT CHARACTER SPLITTER ─────────────────────────────────
const AnimatedText = ({ text, className = "", delay = 0, stagger = 0.03 }) => {
  const containerRef = useRef(null);
  
  useGSAP(() => {
    if (!containerRef.current) return;
    const chars = containerRef.current.querySelectorAll(".char");
    gsap.fromTo(chars, 
      { opacity: 0, y: 40, rotationX: -90 },
      { 
        opacity: 1, y: 0, rotationX: 0, 
        duration: 0.5, 
        stagger: stagger, 
        ease: "back.out(1.7)",
        delay: delay 
      }
    );
  }, { scope: containerRef });

  const words = text.split(" ");
  
  return (
    <span ref={containerRef} className={className} style={{ perspective: "1000px" }}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {word.split("").map((char, ci) => (
            <span key={ci} className="char inline-block" style={{ transformStyle: "preserve-3d" }}>
              {char}
            </span>
          ))}
          {wi < words.length - 1 && <span className="char inline-block">&nbsp;</span>}
        </span>
      ))}
    </span>
  );
};

// ─── FLOATING PARTICLES ──────────────────────────────────────────────────
const FloatingParticles = () => {
  const containerRef = useRef(null);
  
  useGSAP(() => {
    if (!containerRef.current) return;
    const particles = containerRef.current.querySelectorAll(".particle");
    particles.forEach((p, i) => {
      gsap.to(p, {
        y: -20 + Math.random() * 40,
        x: -10 + Math.random() * 20,
        opacity: 0.3 + Math.random() * 0.4,
        duration: 2 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.3
      });
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={i}
          className="particle absolute rounded-full bg-[#FFD233]"
          style={{
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: 0.2,
          }}
        />
      ))}
    </div>
  );
};

// ─── NAV LINK DATA ─────────────────────────────────────────────────────────
const navLinks = [
  { label: "Home", icon: Home, href: "/hero" },
  { label: "About Me", icon: User, href: "/aboutme" },
  { label: "Skills", icon: Code2, href: "/skills" },
  { label: "Projects", icon: FolderOpen, href: "/projects" },
  { label: "Achievements", icon: Trophy, href: "/achievement" },
  { label: "Contact", icon: Mail, href: "/contact" },
];

// ─── NAV LINK ITEM ─────────────────────────────────────────────────────────
const NavLink = ({ item, isActive, onClick, index }) => {
  const ref = useRef(null);
  const Icon = item.icon;

  useGSAP(() => {
    if (ref.current) {
      gsap.fromTo(ref.current, 
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.4, delay: 0.3 + index * 0.08, ease: "back.out(1.4)" }
      );
    }
  }, { scope: ref });

  return (
    <Link
      ref={ref}
      to={item.href}
      onClick={onClick}
      className={`cursor-pointer group relative flex items-center gap-2 rounded-xl px-4 py-2.5 transition-all duration-300 ${
        isActive
          ? "bg-[#FFD233]/15 text-[#111111] shadow-sm dark:bg-[#FFD233]/20 dark:text-white"
          : "text-[#666666] hover:bg-[#F7F7F5] hover:text-[#111111] dark:text-[#999] dark:hover:bg-[#2a2a2a] dark:hover:text-white"
      }`}
    >
      <Icon className={`h-4 w-4 transition-transform duration-300 group-hover:scale-110 ${isActive ? "text-[#FFD233]" : ""}`} />
      <span className="text-sm font-medium">{item.label}</span>
      {isActive && (
        <span className="absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-[#FFD233]" />
      )}
    </Link>
  );
};

// ─── MOBILE NAV DRAWER ─────────────────────────────────────────────────────
const MobileNavDrawer = ({ isOpen, onClose, activeLink, onLinkClick }) => {
  const drawerRef = useRef(null);
  const overlayRef = useRef(null);

  useGSAP(() => {
    if (isOpen) {
      gsap.fromTo(overlayRef.current, 
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );
      gsap.fromTo(drawerRef.current, 
        { x: "100%" },
        { x: "0%", duration: 0.4, ease: "power3.out" }
      );
    } else {
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, ease: "power2.in" });
      gsap.to(drawerRef.current, { x: "100%", duration: 0.3, ease: "power3.in" });
    }
  }, { scope: drawerRef, dependencies: [isOpen] });

  return (
    <>
      <div 
        ref={overlayRef}
        className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity dark:bg-black/40 ${isOpen ? "pointer-events-auto" : "pointer-events-none opacity-0"}`}
        onClick={onClose}
      />
      <div 
        ref={drawerRef}
        className="fixed right-0 top-0 z-50 h-full w-[280px] bg-white shadow-2xl dark:bg-[#1a1a1a]"
        style={{ transform: "translateX(100%)" }}
      >
        <div className="flex items-center justify-between border-b border-[#EAEAEA] p-4 dark:border-[#2a2a2a]">
          <span className="text-sm font-bold text-[#111111] dark:text-white">Menu</span>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F7F7F5] transition-colors hover:bg-[#EAEAEA] dark:bg-[#2a2a2a] dark:hover:bg-[#333]">
            <X className="h-4 w-4 text-[#111111] dark:text-white" />
          </button>
        </div>
        <div className="flex flex-col gap-1 p-4">
          {navLinks.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeLink === item.href;
            return (
              <a
                key={item.label}
               
                onClick={() => {
                  onLinkClick(item.href);
                  onClose();
                }}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
                  isActive
                    ? "bg-[#FFD233]/15 text-[#111111] dark:bg-[#FFD233]/20 dark:text-white"
                    : "text-[#666666] hover:bg-[#F7F7F5] dark:text-[#999] dark:hover:bg-[#2a2a2a]"
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? "text-[#FFD233]" : ""}`} />
                <span className="text-sm font-medium">{item.label}</span>
              </a>
            );
          })}
        </div>
        <div className="border-t border-[#EAEAEA] p-4 dark:border-[#2a2a2a]">
          <a
            href="#contact"
            onClick={() => {
              onLinkClick("#contact");
              onClose();
            }}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#111111] px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#333] dark:bg-white dark:text-[#111111] dark:hover:bg-[#EAEAEA]"
          >
            Let's Connect
            <ArrowRight className="h-4 w-4 text-[#FFD233]" />
          </a>
        </div>
      </div>
    </>
  );
};

// ─── MAIN NAVBAR ───────────────────────────────────────────────────────────
const MyNavbar = () => {
  const [activeLink, setActiveLink] = useState("#home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);
  const leftRef = useRef(null);
  const centerRef = useRef(null);
  const rightRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useGSAP(() => {
    // Navbar entrance
    gsap.fromTo(navRef.current, 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 }
    );

    // Left section
    if (leftRef.current) {
      gsap.fromTo(leftRef.current.querySelectorAll(".animate-item"), 
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: "back.out(1.4)", delay: 0.5 }
      );
    }

    // Center nav links
    if (centerRef.current) {
      gsap.fromTo(centerRef.current.querySelectorAll(".nav-item"), 
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: "back.out(1.4)", delay: 0.7 }
      );
    }

    // Right CTA
    if (ctaRef.current) {
      gsap.fromTo(ctaRef.current, 
        { opacity: 0, x: 30, scale: 0.9 },
        { opacity: 1, x: 0, scale: 1, duration: 0.6, ease: "back.out(1.7)", delay: 1.0 }
      );
    }
  }, { scope: navRef });

  const handleLinkClick = useCallback((href) => {
   
    setActiveLink(href);
  }, []);

  return (
    <>
      <MobileNavDrawer 
        isOpen={mobileOpen} 
        onClose={() => setMobileOpen(false)} 
        activeLink={activeLink}
        onLinkClick={handleLinkClick}
      />
      
      <nav
        ref={navRef}
        className={`fixed left-0 right-0 top-4 z-50 mx-auto w-[calc(100%-2rem)] max-w-[1200px] transition-all duration-500 sm:top-6 sm:w-[calc(100%-3rem)] lg:top-8 lg:w-[calc(100%-4rem)] ${
          scrolled 
            ? "top-2 sm:top-3 lg:top-4" 
            : "top-4 sm:top-6 lg:top-8"
        }`}
      >
        <div 
          className={`relative flex items-center justify-between rounded-[24px] border border-white/40 bg-white/90 px-4 py-3 shadow-lg backdrop-blur-xl transition-all duration-500 dark:border-white/10 dark:bg-[#1a1a1a]/90 dark:shadow-black/20 sm:px-6 sm:py-4 lg:px-8 lg:py-5 ${
            scrolled 
              ? "shadow-xl backdrop-blur-2xl" 
              : "shadow-lg"
          }`}
          style={{ minHeight: "72px" }}
        >
          <FloatingParticles />

          {/* ─── LEFT: PERSONAL BRANDING ─── */}
          <div ref={leftRef} className="flex items-center gap-3 sm:gap-4">
            {/* Avatar with yellow glow */}
            <div className="animate-item relative">
              <div className="absolute -inset-1 rounded-full bg-[#FFD233]/20 blur-md" />
              <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-[#FFD233] shadow-sm sm:h-11 sm:w-11">
                 <img src="https://res.cloudinary.com/dycjjaxsk/image/upload/v1780944088/ChatGPT_Image_Jun_6_2026_10_24_01_PM_tguwxw.png"/>
              </div>
            </div>

            {/* Name & Title */}
            <div className="animate-item flex flex-col">
              <div className="flex items-baseline gap-1">
                <span className="text-base font-black tracking-tight text-[#111111] dark:text-white sm:text-lg">
                  <AnimatedText text="VISHAL" delay={0.5} stagger={0.04} />
                </span>
                <span className="text-base font-black tracking-tight text-[#FFD233] sm:text-lg">
                  <AnimatedText text="SHAKYA" delay={0.7} stagger={0.04} />
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Code2 className="h-3 w-3 text-[#FFD233]" />
                <span className="text-[10px] font-semibold text-[#666666] dark:text-[#999] sm:text-xs">
                  Full Stack Developer
                </span>
              </div>
            </div>

            {/* Star Doodle */}
            <div className="animate-item hidden sm:block">
              <StarDoodle className="h-5 w-5 lg:h-6 lg:w-6" />
            </div>
          </div>

          {/* ─── CENTER: NAVIGATION ─── */}
          <div ref={centerRef} className="hidden items-center gap-1 lg:flex">
            {navLinks.map((item, index) => (
              <div key={item.label} className="nav-item">
                <NavLink 
                  item={item} 
                  isActive={activeLink === item.href} 
                  onClick={() => handleLinkClick(item.href)}
                  index={index}
                />
              </div>
            ))}
          </div>

          {/* ─── RIGHT: CTA + THEME + MOBILE ─── */}
          <div ref={rightRef} className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle */}
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>

            {/* CTA Button */}
            <a
              ref={ctaRef}
              href="#contact"
              onClick={() => handleLinkClick("#contact")}
              className="group hidden items-center gap-2 rounded-xl bg-[#111111] px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-[#333] hover:shadow-lg hover:shadow-[#111111]/20 sm:flex dark:bg-white dark:text-[#111111] dark:hover:bg-[#EAEAEA]"
            >
              <span className="relative overflow-hidden">
                <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">Let's Connect</span>
                <span className="absolute left-0 top-full inline-block transition-transform duration-300 group-hover:-translate-y-full">Let's Connect</span>
              </span>
              <ArrowRight className="h-4 w-4 text-[#FFD233] transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F7F7F5] transition-colors hover:bg-[#EAEAEA] lg:hidden dark:bg-[#2a2a2a] dark:hover:bg-[#333]"
            >
              <Menu className="h-4 w-4 text-[#111111] dark:text-white" />
            </button>
          </div>

          {/* Dot Grid Pattern - Bottom Right Corner */}
          <div className="pointer-events-none absolute -bottom-2 -right-2 hidden opacity-30 lg:block">
            <svg width="40" height="40" viewBox="0 0 40 40">
              {Array.from({ length: 25 }).map((_, i) => {
                const x = (i % 5) * 8 + 2;
                const y = Math.floor(i / 5) * 8 + 2;
                return <circle key={i} cx={x} cy={y} r="1" fill="#FFD233" />;
              })}
            </svg>
          </div>

          {/* Thin geometric line accent */}
          <div className="pointer-events-none absolute -left-1 top-1/2 hidden h-8 w-0.5 -translate-y-1/2 rounded-full bg-[#FFD233]/30 lg:block" />
        </div>
      </nav>
      

      {/* Spacer to prevent content from going under navbar */}
      <div className="h-[100px] sm:h-[110px] lg:h-[120px]" />
    </>
  );
};

// ─── ANIMATED SPIN ───────────────────────────────────────────────────────
const spinSlowStyle = `
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  .animate-spin-slow {
    animation: spin-slow 20s linear infinite;
  }
`;

// ─── EXPORT ──────────────────────────────────────────────────────────────
const Navbar = () => {
  return (
    <ThemeProvider>
      <style>{spinSlowStyle}</style>
      <MyNavbar />
    </ThemeProvider>
  );
};

export default Navbar;