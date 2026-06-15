import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion, useInView } from "framer-motion";
import {
  ArrowUpRight,
  Lightbulb,
  Sun,
  Moon,
  Globe,
  Code2,
  X,
} from "lucide-react";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// ─── THEME CONTEXT ─────────────────────────────────────────────────────
const ThemeContext = React.createContext({
  theme: "light",
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

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

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl dark:bg-[#1a1a1a] dark:shadow-black/40"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5 text-[#111111]" />
      ) : (
        <Sun className="h-5 w-5 text-[#FFD400]" />
      )}
    </button>
  );
};

// ─── STAR DOODLE SVG ─────────────────────────────────────────────────────
const StarDoodle = ({ className = "" }) => (
  <svg
    viewBox="0 0 60 60"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M30 5L35.5 22.5L55 22.5L39 33.5L44.5 51L30 40.5L15.5 51L21 33.5L5 22.5L24.5 22.5L30 5Z"
      stroke="#FFD400"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <path
      d="M30 5L35.5 22.5L55 22.5L39 33.5L44.5 51L30 40.5L15.5 51L21 33.5L5 22.5L24.5 22.5L30 5Z"
      fill="#FFD400"
      fillOpacity="0.15"
    />
  </svg>
);

// ─── SMALL STAR DOODLE ───────────────────────────────────────────────────
const SmallStarDoodle = ({ className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2L14 9L21 9L15 13L17 20L12 16L7 20L9 13L3 9L10 9L12 2Z"
      stroke="#FFD400"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="#FFD400"
      fillOpacity="0.2"
    />
  </svg>
);

// ─── CIRCULAR BADGE ──────────────────────────────────────────────────────
const CircularBadge = () => {
  const text = "SOLVING PROBLEMS • BUILDING SOLUTIONS • ";
  const chars = text.split("");
  const radius = 65;
  const angleStep = 360 / chars.length;

  return (
    <div className="relative h-36 w-36 sm:h-44 sm:w-44">
      <svg viewBox="0 0 150 150" className="h-full w-full animate-spin-slow">
        {chars.map((char, i) => {
          const angle = i * angleStep - 90;
          const rad = (angle * Math.PI) / 180;
          const x = 75 + radius * Math.cos(rad);
          const y = 75 + radius * Math.sin(rad);
          return (
            <text
              key={i}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-[#111111] text-[9px] font-bold uppercase tracking-widest dark:fill-white"
              transform={`rotate(${angle + 90}, ${x}, ${y})`}
            >
              {char}
            </text>
          );
        })}
        <circle
          cx="75"
          cy="75"
          r="42"
          fill="none"
          stroke="#FFD400"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <Globe className="h-8 w-8 text-[#111111] dark:text-white" strokeWidth={1.5} />
      </div>
    </div>
  );
};

// ─── PROGRESS BAR VARIANTS ───────────────────────────────────────────────
const ProgressBar = ({ type, percentage, color }) => {
  const ref = useRef(null);
  const { theme } = useTheme();

  useGSAP(() => {
    if (ref.current) {
      gsap.fromTo(
        ref.current,
        { width: "0%" },
        {
          width: `${percentage}%`,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, { scope: ref });

  const renderProgress = () => {
    switch (type) {
      case "solid":
        return (
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#EAEAEA] dark:bg-[#2a2a2a]">
            <div
              ref={ref}
              className="h-full rounded-full"
              style={{ backgroundColor: color, width: "0%" }}
            />
          </div>
        );
      case "dashed":
        return (
          <div className="flex w-full gap-1">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="h-2.5 flex-1 rounded-sm transition-all duration-500"
                style={{
                  backgroundColor: i < (percentage / 100) * 20 ? color : theme === "dark" ? "#2a2a2a" : "#EAEAEA",
                  opacity: i < (percentage / 100) * 20 ? 1 : 0.4,
                }}
              />
            ))}
          </div>
        );
      case "wave":
        return (
          <div className="flex w-full items-end gap-[2px] overflow-hidden">
            {Array.from({ length: 30 }).map((_, i) => {
              const active = i < (percentage / 100) * 30;
              const height = active
                ? 4 + Math.sin((i / 30) * Math.PI * 3) * 6 + 2
                : 2;
              return (
                <div
                  key={i}
                  className="w-full rounded-full transition-all duration-700"
                  style={{
                    height: `${height}px`,
                    backgroundColor: active ? color : theme === "dark" ? "#2a2a2a" : "#EAEAEA",
                    opacity: active ? 1 : 0.3,
                    transitionDelay: `${i * 30}ms`,
                  }}
                />
              );
            })}
          </div>
        );
      case "dots":
        return (
          <div className="flex w-full gap-[3px]">
            {Array.from({ length: 25 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square flex-1 rounded-full transition-all duration-500"
                style={{
                  backgroundColor: i < (percentage / 100) * 25 ? color : theme === "dark" ? "#2a2a2a" : "#EAEAEA",
                  opacity: i < (percentage / 100) * 25 ? 1 : 0.3,
                  transitionDelay: `${i * 40}ms`,
                }}
              />
            ))}
          </div>
        );
      case "zigzag":
        return (
          <div className="relative h-3 w-full overflow-hidden">
            <svg viewBox="0 0 200 12" className="h-full w-full" preserveAspectRatio="none">
              <defs>
                <pattern id="zigzag" patternUnits="userSpaceOnUse" width="20" height="12">
                  <polyline
                    points="0,6 5,2 10,6 15,10 20,6"
                    fill="none"
                    stroke={color}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </pattern>
              </defs>
              <rect
                ref={ref}
                x="0"
                y="0"
                width="0%"
                height="12"
                fill="url(#zigzag)"
                rx="3"
              />
              <rect
                x="0"
                y="0"
                width="200"
                height="12"
                fill="none"
                stroke={theme === "dark" ? "#2a2a2a" : "#EAEAEA"}
                strokeWidth="1"
                rx="3"
              />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return renderProgress();
};

// ─── TECHNOLOGY LOGOS (SVG) ──────────────────────────────────────────────
const TechLogo = ({ name }) => {
  const logos = {
    JavaScript: (
      <svg viewBox="0 0 32 32" className="h-8 w-8">
        <rect width="32" height="32" rx="6" fill="#F7DF1E" />
        <text x="6" y="22" fontSize="14" fontWeight="bold" fill="#000">JS</text>
      </svg>
    ),
    "React JS": (
      <svg viewBox="0 0 32 32" className="h-8 w-8">
        <circle cx="16" cy="16" r="3" fill="#61DAFB" />
        <ellipse cx="16" cy="16" rx="12" ry="5" fill="none" stroke="#61DAFB" strokeWidth="1.5" />
        <ellipse cx="16" cy="16" rx="12" ry="5" fill="none" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(60 16 16)" />
        <ellipse cx="16" cy="16" rx="12" ry="5" fill="none" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(120 16 16)" />
      </svg>
    ),
    TypeScript: (
      <svg viewBox="0 0 32 32" className="h-8 w-8">
        <rect width="32" height="32" rx="6" fill="#3178C6" />
        <text x="5" y="22" fontSize="14" fontWeight="bold" fill="#fff">TS</text>
      </svg>
    ),
    "Next.js": (
      <svg viewBox="0 0 32 32" className="h-8 w-8">
        <rect width="32" height="32" rx="6" fill="#000" className="dark:fill-white" />
        <text x="9" y="22" fontSize="16" fontWeight="bold" fill="#fff" className="dark:fill-black">N</text>
      </svg>
    ),
    "Node.js": (
      <svg viewBox="0 0 32 32" className="h-8 w-8">
        <path d="M16 2L4 9v14l12 7 12-7V9L16 2z" fill="#339933" />
        <text x="7" y="20" fontSize="10" fontWeight="bold" fill="#fff">node</text>
      </svg>
    ),
    "Express.js": (
      <svg viewBox="0 0 32 32" className="h-8 w-8">
        <text x="2" y="22" fontSize="16" fontWeight="300" fill="#111111" className="dark:fill-white">ex</text>
      </svg>
    ),
    MongoDB: (
      <svg viewBox="0 0 32 32" className="h-8 w-8">
        <path d="M16 2c0 0-4 6-4 14s4 14 4 14 4-6 4-14-4-14-4-14z" fill="#47A248" />
        <path d="M16 2v28" stroke="#2E7D32" strokeWidth="1" />
      </svg>
    ),
    "Tailwind CSS": (
      <svg viewBox="0 0 32 32" className="h-8 w-8">
        <path d="M8 12c0-4 3-6 6-6s5 2 6 6c0 4-3 6-6 6s-5-2-6-6zM4 20c0-4 3-6 6-6s5 2 6 6c0 4-3 6-6 6s-5-2-6-6zM20 20c0-4 3-6 6-6s5 2 6 6c0 4-3 6-6 6s-5-2-6-6z" fill="#06B6D4" />
      </svg>
    ),
    "Git & GitHub": (
      <svg viewBox="0 0 32 32" className="h-8 w-8">
        <circle cx="16" cy="16" r="14" fill="#181717" className="dark:fill-white" />
        <path
          d="M16 6c-5.5 0-10 4.5-10 10 0 4.4 2.9 8.2 6.8 9.5.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.4-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.2.1-2.5 0 0 .8-.3 2.7 1 .8-.2 1.6-.3 2.4-.3.8 0 1.6.1 2.4.3 1.9-1.3 2.7-1 2.7-1 .5 1.3.2 2.2.1 2.5.6.7 1 1.6 1 2.7 0 3.9-2.3 4.7-4.6 5 .3.3.6.8.6 1.6v2.4c0 .3.2.6.7.5 3.9-1.3 6.8-5.1 6.8-9.5 0-5.5-4.5-10-10-10z"
          fill="#fff"
          className="dark:fill-[#181717]"
        />
      </svg>
    ),
    Figma: (
      <svg viewBox="0 0 32 32" className="h-8 w-8">
        <circle cx="10" cy="8" r="5" fill="#F24E1E" />
        <circle cx="22" cy="8" r="5" fill="#FF7262" />
        <circle cx="10" cy="18" r="5" fill="#A259FF" />
        <circle cx="22" cy="18" r="5" fill="#1ABCFE" />
        <circle cx="10" cy="28" r="5" fill="#0ACF83" />
      </svg>
    ),
    HTML: (
      <svg viewBox="0 0 32 32" className="h-8 w-8">
        <rect width="32" height="32" rx="4" fill="#E34F26" />
        <text x="4" y="22" fontSize="12" fontWeight="bold" fill="#fff">HTML</text>
      </svg>
    ),
    CSS: (
      <svg viewBox="0 0 32 32" className="h-8 w-8">
        <rect width="32" height="32" rx="4" fill="#1572B6" />
        <text x="6" y="22" fontSize="14" fontWeight="bold" fill="#fff">CSS</text>
      </svg>
    ),
  };

  return logos[name] || null;
};

// ─── SKILL CARD ────────────────────────────────────────────────────────────
const SkillCard = ({ skill, index }) => {
  const cardRef = useRef(null);
  const { theme } = useTheme();

  useGSAP(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          delay: index * 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, { scope: cardRef });

  const progressTypes = ["solid", "dashed", "wave", "dots", "zigzag", "solid", "wave", "dots", "solid", "dashed", "wave", "dots"];

  return (
    <div
      ref={cardRef}
      className="group relative rounded-[18px] border border-[#EAEAEA] bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-[#2a2a2a] dark:bg-[#1a1a1a] dark:shadow-black/20 sm:p-5"
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F6F6F6] dark:bg-[#2a2a2a]">
            <TechLogo name={skill.name} />
          </div>
          <span className="text-sm font-semibold text-[#111111] dark:text-white sm:text-base">
            {skill.name}
          </span>
        </div>
        <ArrowUpRight className="h-4 w-4 text-[#8A8A8A] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 dark:text-[#666]" />
      </div>
      <div className="mb-2">
        <ProgressBar
          type={progressTypes[index % progressTypes.length]}
          percentage={skill.percentage}
          color={skill.color}
        />
      </div>
      <div className="text-right">
        <span className="text-sm font-bold text-[#111111] dark:text-white">
          {skill.percentage}%
        </span>
      </div>
    </div>
  );
};

// ─── SKILLS DATA ───────────────────────────────────────────────────────────
const skillsData = [
  { name: "JavaScript", percentage: 95, color: "#F7DF1E" },
  { name: "React JS", percentage: 90, color: "#61DAFB" },
  { name: "TypeScript", percentage: 85, color: "#3178C6" },
  { name: "Next.js", percentage: 88, color: "#111111" },
  { name: "Node.js", percentage: 80, color: "#339933" },
  { name: "Express.js", percentage: 78, color: "#8A8A8A" },
  { name: "MongoDB", percentage: 75, color: "#47A248" },
  { name: "Tailwind CSS", percentage: 95, color: "#06B6D4" },
  { name: "Git & GitHub", percentage: 90, color: "#8B5CF6" },
  { name: "Figma", percentage: 85, color: "#F24E1E" },
  { name: "HTML", percentage: 90, color: "#E34F26" },
  { name: "CSS", percentage: 90, color: "#1572B6" },
];

// ─── CREATIVE COLLAGE COMPOSITION ──────────────────────────────────────────
const CreativeCollage = () => {
  const collageRef = useRef(null);

  useGSAP(() => {
    if (collageRef.current) {
      const elements = collageRef.current.querySelectorAll(".collage-item");
      gsap.fromTo(
        elements,
        { opacity: 0, scale: 0.8, rotation: -5 },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: collageRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, { scope: collageRef });

  return (
    <div ref={collageRef} className="relative hidden h-[400px] w-full lg:block lg:h-[450px] xl:h-[500px]">

        
      {/* Wireframe Globe */}
      <div className="collage-item absolute left-[5%] top-[10%] opacity-80">
        <svg width="80" height="80" viewBox="0 0 80 80" className="animate-spin-slow">
          <circle cx="40" cy="40" r="35" fill="none" stroke="#D1D1D1" strokeWidth="0.5" className="dark:stroke-[#444]" />
          <ellipse cx="40" cy="40" rx="35" ry="15" fill="none" stroke="#D1D1D1" strokeWidth="0.5" className="dark:stroke-[#444]" />
          <ellipse cx="40" cy="40" rx="15" ry="35" fill="none" stroke="#D1D1D1" strokeWidth="0.5" className="dark:stroke-[#444]" />
          <line x1="5" y1="40" x2="75" y2="40" stroke="#D1D1D1" strokeWidth="0.5" className="dark:stroke-[#444]" />
        </svg>
      </div>

      {/* Yellow Abstract Paper Shape */}
      <div className="collage-item absolute left-[25%] top-[5%] h-48 w-36 rotate-6 rounded-sm bg-[#FFD400] shadow-lg">
        <div className="absolute inset-2 border border-dashed border-black/20" />
      </div>

      {/* Hand Gesture Photo (Simulated) */}
      <div className="collage-item absolute left-[30%] top-[15%] h-40 w-32 -rotate-3 overflow-hidden rounded-sm bg-[#1a1a1a] shadow-xl">
        <div className="flex h-full w-full items-center justify-center">
        </div>
      </div>

      {/* Paper Tape Effect */}
      <div className="collage-item absolute left-[50%] top-[8%] h-8 w-24 -rotate-12 bg-[#1a1a1a]/80 dark:bg-white/20" />

      {/* CODE. CREATE. REPEAT. Sticker */}
      <div className="z-100 collage-item absolute left-[20%] top-[45%] rotate-[-2deg] rounded-sm bg-white p-3 shadow-lg dark:bg-[#1a1a1a]">
        <p className="text-xs font-black leading-tight text-[#111111] dark:text-white">
          CODE. CREATE.
        </p>
        <p className="text-xs font-black leading-tight text-[#FFD400]">REPEAT.</p>
      </div>

      {/* Black X Mark */}
      <div className="z-50 collage-item absolute left-[25%] ">
           <img width='300px'  src="https://res.cloudinary.com/dycjjaxsk/image/upload/v1778674108/ChatGPT_Image_May_13_2026_05_32_35_PM_1_jufrqg.png" />
        
      </div>

      {/* Code Icon */}
      <div className="collage-item absolute left-[60%] top-[50%] rounded-lg bg-white p-2 shadow-md dark:bg-[#1a1a1a]">
        <Code2 className="h-5 w-5 text-[#111111] dark:text-white" />
      </div>

      {/* Barcode Sticker */}
      <div className="collage-item absolute left-[45%] top-[55%] rotate-3 rounded-sm bg-white p-2 shadow-md dark:bg-[#1a1a1a]">
        <div className="flex gap-[2px]">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="h-6 bg-[#111111] dark:bg-white"
              style={{ width: `${2 + (i % 3) * 2}px` }}
            />
          ))}
        </div>
      </div>

      {/* Circular Badge */}
      <div className="collage-item absolute right-[5%] top-[15%]">
        <CircularBadge />
      </div>

      {/* Torn Paper Texture */}
      <div className="collage-item absolute left-[10%] top-[60%] h-24 w-20 rotate-6 bg-[#EAEAEA] shadow-sm dark:bg-[#2a2a2a]">
        <div className="absolute -top-1 left-0 right-0 h-2 bg-[#EAEAEA] dark:bg-[#2a2a2a]" style={{ clipPath: "polygon(0 0, 10% 100%, 20% 0, 30% 100%, 40% 0, 50% 100%, 60% 0, 70% 100%, 80% 0, 90% 100%, 100% 0)" }} />
      </div>
    </div>
  );
};

// ─── MAIN SKILLS SECTION ───────────────────────────────────────────────────
const SkillsSection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const gridRef = useRef(null);
  const { theme } = useTheme();

  useGSAP(() => {
    // Heading animation
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current.querySelectorAll(".animate-in"),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // Bottom banner animation
    const banner = sectionRef.current?.querySelector(".learning-banner");
    if (banner) {
      gsap.fromTo(
        banner,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: banner,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#F6F6F6] px-4 py-16 transition-colors duration-500 dark:bg-[#0a0a0a] sm:px-6 lg:px-12 xl:px-20"
    >

            <div
                className="fixed inset-0 overflow-hidden pointer-events-none select-none flex flex-col justify-center z-0"
                style={{
                  maskImage:
                    "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
                }}
            >
                    {Array.from({ length: 8 }).map((_, i) => {
                      const direction = i % 2 === 0 ? -1 : 1;
              
                      return (
                        <motion.div
                          key={i}
                          className="whitespace-nowrap font-black tracking-tighter leading-[0.85]"
                          initial={{
                            opacity: 0,
                            y: 50,
                          }}
                          animate={{
                            opacity: 0.07,
                            x: direction === -1
                              ? ["0%", "-15%", "0%"]
                              : ["0%", "15%", "0%"],
                            y: [0, -8, 0, 8, 0],
                          }}
                          transition={{
                            opacity: {
                              duration: 1.2,
                              delay: i * 0.08,
                            },
                            x: {
                              duration: 4 + i * 0.4,
                              repeat: Infinity,
                              ease: "easeInOut",
                            },
                            y: {
                              duration: 3,
                              repeat: Infinity,
                              ease: "easeInOut",
                            },
                          }}
                          style={{
                            fontSize: "clamp(48px, 12vw, 180px)",
                            color: "#0cc02d",
                            }}
                        >
                          MY SKILLS
                        </motion.div>
                      );
                    })}
            </div>
      {/* <ThemeToggle /> */}

      {/* Background Pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `radial-gradient(circle, #111111 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      {/* ─── HERO AREA ─── */}
      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left Column */}
          <div ref={headingRef} className="flex flex-col justify-center">
            {/* Section Badge */}
            <div className="animate-in mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-[#111111]/20 px-4 py-2 dark:border-white/20">
              <span className="text-xs font-bold text-[#8A8A8A]">(03)</span>
              <span className="text-xs font-bold uppercase tracking-widest text-[#111111] dark:text-white">
                MY SKILLS
              </span>
            </div>

            {/* Headline */}
            <div className="animate-in mb-2">
              <h1 className="text-3xl font-black leading-[0.95] tracking-tight text-[#111111] dark:text-white sm:text-4xl md:text-4xl lg:text-6xl">
                SKILLS
                <br />
                THAT{" "}
                <span className="text-[#FFD400]">BUILD.</span>
              </h1>
              <div className="absolute -right-4 top-0 sm:right-0 lg:right-8">
                <StarDoodle className="h-12 w-12 sm:h-16 sm:w-16" />
              </div>
            </div>

            {/* Description */}
            <p className="animate-in mb-8 max-w-md text-base leading-relaxed text-[#8A8A8A] dark:text-[#999] sm:text-lg">
              I combine clean code, modern technologies, and creative problem
              solving to build scalable digital solutions.
            </p>

            {/* CTA Button */}
            <div className="animate-in">
              <button className="group inline-flex items-center gap-3 rounded-lg border-2 border-[#111111] px-6 py-3 text-sm font-bold uppercase tracking-wider text-[#111111] transition-all duration-300 hover:bg-[#111111] hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-[#111111]">
                EXPLORE MY WORK
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>

          {/* Right Column - Creative Collage */}
          <div className="relative flex items-center justify-center">
            <CreativeCollage />

            

            {/* Desktop Values List */}
            <div className="absolute -right-4 top-1/2 hidden -translate-y-1/2 flex-col items-end gap-3 lg:flex xl:right-0">
              <div className="mb-2 text-[#FFD400]">
                <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
                  <path d="M8 2L8 20M8 20L3 15M8 20L13 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              {["CLEAN CODE", "PERFORMANCE", "SCALABILITY", "SECURITY", "INNOVATION"].map(
                (item) => (
                  <span
                    key={item}
                    className="text-[10px] font-bold tracking-[0.2em] text-[#111111] dark:text-white xl:text-xs"
                  >
                    {item}
                  </span>
                )
              )}
            </div>
          </div>
        </div>

        {/* ─── SKILLS GRID ─── */}
        <div ref={gridRef} className="mt-16 sm:mt-20 lg:mt-24">
          <div className="grid grid-cols-2 gap-1.5 sm:gap-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-">
            {skillsData.map((skill, index) => (
              <SkillCard key={skill.name} skill={skill} index={index} />
            ))}
          </div>
        </div>

        {/* ─── LEARNING BANNER ─── */}
        <div className="learning-banner mt-8 rounded-[18px] border border-[#EAEAEA] bg-white p-5 shadow-sm dark:border-[#2a2a2a] dark:bg-[#1a1a1a] sm:mt-10 sm:p-6 lg:mt-12">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:gap-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FFD400]/15">
                <Lightbulb className="h-6 w-6 text-[#FFD400]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#111111] dark:text-white sm:text-lg">
                  Always Learning
                </h3>
                <p className="text-sm text-[#8A8A8A] dark:text-[#999]">
                  Exploring new technologies and building real-world projects.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center sm:items-end">
              <p className="font-handwriting text-lg text-[#111111] dark:text-white sm:text-xl" style={{ fontFamily: "cursive" }}>
                Growth never stops!
              </p>
              <div className="mt-1 h-1 w-24 rounded-full bg-[#FFD400]" />
            </div>
          </div>
        </div>

        {/* ─── FOOTER ELEMENT ─── */}
        <div className="mt-12 flex flex-col items-center gap-4 sm:mt-16">
          <div className="flex w-full items-center gap-4">
            <div className="h-px flex-1 bg-[#EAEAEA] dark:bg-[#2a2a2a]" />
            <SmallStarDoodle className="h-5 w-5 shrink-0" />
            <div className="h-px flex-1 bg-[#EAEAEA] dark:bg-[#2a2a2a]" />
          </div>
          <div className="flex flex-col items-center gap-1 sm:flex-row sm:gap-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8A8A8A] dark:text-[#666]">
              ALWAYS LEARNING.
            </span>
            <span className="hidden h-1 w-1 rounded-full bg-[#8A8A8A] dark:bg-[#666] sm:block" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8A8A8A] dark:text-[#666]">
              ALWAYS BUILDING.
            </span>
            <span className="hidden h-1 w-1 rounded-full bg-[#8A8A8A] dark:bg-[#666] sm:block" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8A8A8A] dark:text-[#666]">
              ALWAYS CONTRIBUTING.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── ANIMATED SPIN UTILITY ───────────────────────────────────────────────
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
const Skills = () => {
  return (
    <ThemeProvider>
      <style>{spinSlowStyle}</style>
      <SkillsSection />
    </ThemeProvider>
  );
};

export default Skills;