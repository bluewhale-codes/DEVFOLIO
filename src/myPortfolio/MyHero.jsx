import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Poster from "./Poster";
import AboutMe from "./AboutMe";

// ═══════════════════════════════════════════════════════════════════════════════
// CONFIG
// ═══════════════════════════════════════════════════════════════════════════════

const PORTRAIT_URL =
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80&auto=format&fit=crop";

const CODE_LINES = [
  { text: "const developer = {", delay: 0 },
  { text: '  name: "Vishal",', delay: 0.3 },
  { text: '  role: "Full Stack Developer",', delay: 0.6 },
  { text: "};", delay: 0.9 },
  { text: "", delay: 1.2 },
  { text: "function buildFuture() {", delay: 1.5 },
  { text: "  // Innovation meets execution", delay: 1.8 },
  { text: "  return <App />;", delay: 2.1 },
  { text: "}", delay: 2.4 },
  { text: "", delay: 2.7 },
  { text: "HTML", delay: 3.0 },
  { text: "CSS", delay: 3.3 },
  { text: "JavaScript", delay: 3.6 },
  { text: "React", delay: 3.9 },
  { text: "Node.js", delay: 4.2 },
  { text: "Express", delay: 4.5 },
  { text: "MongoDB", delay: 4.8 },
  { text: "Tailwind CSS", delay: 5.1 },
  { text: "Git", delay: 5.4 },
  { text: "REST API", delay: 5.7 },
  { text: "", delay: 6.0 },
  { text: "export default App;", delay: 6.3 },
  { text: "", delay: 6.6 },
  { text: "// Crafted with precision", delay: 6.9 },
  { text: "// & passion", delay: 7.2 },
];

const TECH_ITEMS = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: "About Me",
    description: "Contributing to Jicofo\\nCommunity collaboration",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v4m0 12v4M2 12h4m12 0h4" />
      </svg>
    ),
    title: "Skills",
    description: "Modern frontend development\\nComponent architecture",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8m-4-4v4" />
        <path d="M6 8h.01M6 12h.01" />
      </svg>
    ),
    title: "Featured Projects",
    description: "REST APIs\\nBackend services",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
      </svg>
    ),
    title: "Experience",
    description: "Database design\\nScalable storage",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: "Achievement",
    description: "Smart contracts\\nWeb3 learning",
  },
];

const PHILOSOPHY_ITEMS = [
  { icon: "</>", label: "Code" },
  { icon: "⚡", label: "Build" },
  { icon: "◉", label: "Impact" },
  { icon: "↻", label: "Repeat" },
];

// ═══════════════════════════════════════════════════════════════════════════════
// BLINKING CURSOR
// ═══════════════════════════════════════════════════════════════════════════════

const BlinkingCursor = () => (
  <motion.span
    className="inline-block w-[2px] h-[1em] bg-current ml-[2px] align-middle"
    animate={{ opacity: [1, 0, 1] }}
    transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
  />
);

// ═══════════════════════════════════════════════════════════════════════════════
// CODE OVERLAY COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

const CodeOverlay = () => {
  const duplicatedLines = [...CODE_LINES, ...CODE_LINES, ...CODE_LINES, ...CODE_LINES];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {/* Slow upward drift */}
      <motion.div
        className="absolute inset-0 flex flex-col"
        animate={{ y: ["0%", "-25%"] }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        {duplicatedLines.map((line, i) => (
          <motion.div
            key={i}
            className="font-mono text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] leading-[1.9] whitespace-nowrap text-neutral-800"
            initial={{ opacity: 0.08 }}
            animate={{ opacity: [0.08, 0.18, 0.08] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: line.delay + (i % CODE_LINES.length) * 0.2,
              ease: "easeInOut",
            }}
          >
            {line.text}
            {i === duplicatedLines.length - 1 && <BlinkingCursor />}
          </motion.div>
        ))}
      </motion.div>

      {/* Soft shine sweep every 12s */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/6 to-transparent"
        initial={{ x: "-100%" }}
        animate={{ x: "200%" }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 9,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// BACKGROUND TYPOGRAPHY
// ═══════════════════════════════════════════════════════════════════════════════

const BackgroundTypography = () => {
  return (
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
              opacity: 0.04,
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
              fontSize: "clamp(150px, 14vw, 180px)",
              color: "#111111",
            }}
          >
            FULL STACK DEVELOPER
          </motion.div>
        );
      })}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// TECHNOLOGY TIMELINE (Left Section)
// ═══════════════════════════════════════════════════════════════════════════════

const TechnologyTimeline = () => {
  return (
    <div className="hidden lg:flex flex-col gap-6 relative">
      {/* Vertical connector line */}
      <div className="absolute left-[9px] top-6 bottom-6 w-[1px] bg-neutral-300" />

      {TECH_ITEMS.map((item, index) => (
        <motion.div
          key={item.title}
          className="relative flex items-start gap-4 pl-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.8 + index * 0.15 }}
        >
          {/* Node dot */}
          <div className="relative z-10 mt-1 w-[18px] h-[18px] rounded-full bg-[#f5f5f5] border border-neutral-400 flex items-center justify-center shrink-0">
            <div className="w-[6px] h-[6px] rounded-full bg-neutral-500" />
          </div>

          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <span className="text-neutral-600">{item.icon}</span>
              <span className="text-xs font-semibold text-[#111111] tracking-wide">
                {item.title}
              </span>
            </div>
            <p className="text-[10px] text-neutral-500 leading-relaxed whitespace-pre-line">
              {item.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// PORTRAIT WITH SVG MASK
// ═══════════════════════════════════════════════════════════════════════════════

const PortraitWithMask = () => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const containerRef = useRef(null);
  const [dims, setDims] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDims({ width: rect.width, height: rect.height });
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const w = dims.width || 400;
  const h = dims.height || 500;

  return (
    <div
      ref={containerRef}
      className="relative w-[260px] sm:w-[300px] md:w-[360px] lg:w-[420px] xl:w-[460px] aspect-[4/5] mx-auto"
    >
      {/* SVG Mask Definition */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <mask id="face-left-mask">
            <rect x="0" y="0" width={w} height={h} fill="white" />
            <ellipse
              cx={w * 0.42}
              cy={h * 0.45}
              rx={w * 0.28}
              ry={h * 0.38}
              fill="black"
            />
          </mask>
        </defs>
      </svg>

      <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-2xl shadow-black/5">
        <img
          src={PORTRAIT_URL}
          alt="Vishal Shakya"
          className={`w-full h-full object-cover transition-opacity duration-700 ${
            imgLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImgLoaded(true)}
          loading="eager"
        />

        {/* Code overlay — masked to left half */}
        <div
          className="absolute inset-0 z-10"
          style={{
            maskImage: `url(#face-left-mask)`,
            WebkitMaskImage: `linear-gradient(to right, black 50%, transparent 50%)`,
          }}
        >
          <CodeOverlay />
        </div>

        {/* Subtle gradient on left edge for depth */}
        <div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{ clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/5" />
        </div>
      </div>

      {/* Soft shadow beneath */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[70%] h-10 bg-black/6 blur-2xl rounded-full" />
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// RIGHT SECTION (Name + Philosophy + Quote)
// ═══════════════════════════════════════════════════════════════════════════════

const RightSection = () => {
  return (
    <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
      {/* Name */}
      <div className="flex flex-col leading-[0.88] tracking-tight">
        <motion.h1
          className="text-[clamp(3rem,9vw,7rem)] font-black text-[#111111]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          VISHAL
        </motion.h1>
        <motion.h1
          className="text-[clamp(3rem,9vw,7rem)] font-black text-[#ff2d2d]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75 }}
        >
          SHAKYA
        </motion.h1>
      </div>

      {/* Role */}
      <motion.p
        className="mt-5 text-[10px] sm:text-[11px] tracking-[0.35em] uppercase font-semibold text-neutral-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.0 }}
      >
        Full Stack Developer
      </motion.p>

      {/* Decorative line */}
      <motion.div
        className="mt-6 w-10 h-[1px] bg-neutral-300"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 1.2, ease: "easeOut" }}
        style={{ originX: 0 }}
      />

      {/* Philosophy Icons */}
      <motion.div
        className="mt-8 flex items-center gap-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.3 }}
      >
        {PHILOSOPHY_ITEMS.map((item, i) => (
          <div key={item.label} className="flex flex-col items-center gap-1.5">
            <span className="text-lg text-neutral-400 font-light">{item.icon}</span>
            <span className="text-[9px] tracking-[0.2em] uppercase text-neutral-500 font-medium">
              {item.label}
            </span>
          </div>
        ))}
      </motion.div>

      {/* Quote */}
      <motion.blockquote
        className="mt-8 max-w-[280px] text-sm text-neutral-600 leading-relaxed font-light italic"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <span className="text-2xl text-neutral-300 font-serif not-italic leading-none">"</span>
        Turning ideas into scalable, impactful solutions through code.
        <span className="text-2xl text-neutral-300 font-serif not-italic leading-none">"</span>
      </motion.blockquote>

      {/* CTA */}
      <motion.div
        className="mt-6 flex items-center gap-2 text-xs text-neutral-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.7 }}
      >
        <span>Let&apos;s build the future</span>
        <span className="text-[#ff2d2d] font-medium">together.</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-neutral-400">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </motion.div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// BOTTOM BAR
// ═══════════════════════════════════════════════════════════════════════════════

const BottomBar = () => {
  const items = ["Always Learning.", "Always Building.", "Always Contributing."];

  return (
    <motion.div
      className="absolute bottom-0 left-0 right-0 z-30 flex items-center justify-center gap-8 sm:gap-12 py-5 border-t border-neutral-200/60 bg-[#f5f5f5]/80 backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 1.8 }}
    >
      {items.map((item) => (
        <span
          key={item}
          className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-neutral-400 font-medium"
        >
          {item}
        </span>
      ))}
    </motion.div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN HERO SECTION
// ═══════════════════════════════════════════════════════════════════════════════

const MyHero = () => {
  return (
    <>
    <section className="relative w-full min-h-screen bg-[#f5f5f5] overflow-hidden flex flex-col">
      {/* Background Typography Layer */}
      <BackgroundTypography />

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="w-full max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 py-16 lg:py-0">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-center gap-10 lg:gap-8 xl:gap-16">
            {/* Left: Technology Timeline */}
            <motion.div
              className="hidden lg:flex justify-end pr-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <TechnologyTimeline />
            </motion.div>

            {/* Center: Portrait */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            >
              {/* Center Image with Circle */}
        <div className="p-[30px] relative order-1 md:order-2 flex justify-center items-center h-full">
          
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                className="absolute z-0 h-[300px] w-[300px] rounded-full bg-yellow-400/90 md:h-[400px] md:w-[400px] lg:h-[500px] lg:w-[500px]"
            ></motion.div>


            <motion.img
                src="https://res.cloudinary.com/dycjjaxsk/image/upload/v1780567925/ChatGPT_Image_Jun_4_2026_03_36_02_PM-Photoroom_1_uxmcmj.png"
               
                onContextMenu={(e) => {
                    e.preventDefault()
                     e.stopPropagation(); // prevent global close

                    setMenu({
                    visible: true,
                    x: e.clientX,
                    y: e.clientY,
                    });
                
                } }
                alt="Image"
                className="relative z-10 h-auto w-56 object-cover md:w-64 scale-190 lg:w-72"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                onError={(e) => {
                const target = e.target ;
                target.onerror = null;
                target.src = `https://placehold.co/400x600/eab308/ffffff?text=Image+Not+Found`;
                }}
            />
            {/* <motion.img
                src="https://res.cloudinary.com/dycjjaxsk/image/upload/v1778699764/Gemini_Generated_Image_fmlk8vfmlk8vfmlk-Photoroom_cgm0el.png"
               
                onContextMenu={(e) => {
                    e.preventDefault()
                     e.stopPropagation(); // prevent global close

                    setMenu({
                    visible: true,
                    x: e.clientX,
                    y: e.clientY,
                    });
                
                } }
                alt="Image"
                style={{
                  top:"330px"
                }}
                className="absolute  z-10 h-auto w-56 object-cover md:w-64 scale-190 lg:w-72"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                onError={(e) => {
                const target = e.target ;
                target.onerror = null;
                target.src = `https://placehold.co/400x600/eab308/ffffff?text=Image+Not+Found`;
                }}
            /> */}
              
        </div>
            </motion.div>

            <Poster/>
          </div>
        </div>
      </div>

      {/* Bottom fade for seamless scroll */}
      <div className="absolute bottom-14 left-0 right-0 h-24 bg-gradient-to-t from-[#f5f5f5] to-transparent pointer-events-none z-20" />

      {/* Bottom Bar */}
      <BottomBar />


    
    </section>

      
    </>
  );
};

export default MyHero;