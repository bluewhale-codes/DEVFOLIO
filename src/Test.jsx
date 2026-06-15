import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import CodeOverlay from "./CodeOverlay";
// ─── CONFIG ───────────────────────────────────────────────────────────────
const BG_TEXT = "FULL STACK DEVELOPER";
const BG_REPEAT = 8;
const BG_FONT_SIZE = 220; // px
const BG_OPACITY = 0.04;

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

const PORTRAIT_URL =
  "https://res.cloudinary.com/dycjjaxsk/image/upload/v1780554904/ChatGPT_Image_Jun_4_2026_11_23_55_AM-Photoroom_tk8zpu.png";

// ─── BLINKING CURSOR COMPONENT ────────────────────────────────────────────
const BlinkingCursor = () => (
  <motion.span
    className="inline-block w-[2px] h-[1em] bg-current ml-[2px] align-middle"
    animate={{ opacity: [1, 0, 1] }}
    transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
  />
);


// ─── BACKGROUND TYPOGRAPHY ────────────────────────────────────────────────
const BackgroundTypography = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none flex flex-col justify-center items-center z-0">
      {Array.from({ length: BG_REPEAT }).map((_, i) => (
        <div
          key={i}
          className="whitespace-nowrap font-bold tracking-tighter leading-[0.85]"
          style={{
            fontSize: `${BG_FONT_SIZE}px`,
            color: "#1a1a1a",
            opacity: BG_OPACITY,
          }}
        >
          {BG_TEXT}
        </div>
      ))}
    </div>
  );
};

// ─── PORTRAIT WITH SVG MASK ─────────────────────────────────────────────────
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

  // Create an SVG mask that covers the left half of the portrait area
  // Using an ellipse-like shape for a more natural face contour
  const maskId = "face-left-mask";

  return (
    <div
      ref={containerRef}
      className="relative
        w-[500px] 
        aspect-[4/5] mx-auto"
    >
      {/* SVG Definitions for masking */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <mask id={maskId}>
            <rect x="0" y="0" width={w} height={h} fill="white" />
            {/* Left half ellipse mask - covers left side of face */}
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

      {/* Portrait Image */}
      <div className="relative w-full h-full overflow-hidden rounded-2xl">
        <img
          src={PORTRAIT_URL}
          alt="Vishal Shakya"
          className={`w-full h-full object-cover transition-opacity duration-700 ${
            imgLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImgLoaded(true)}
          loading="eager"
        />

        {/* Code overlay - masked to left half */}
        <div
          className="absolute inset-0 z-10"
          style={{
            maskImage: `url(#${maskId})`,
            WebkitMaskImage: `linear-gradient(to right, black 50%, transparent 50%)`,
            width:"300px",
            height:"400px",
            top:"50px",
            left:"70px",
            
           
          }}
        >
          <CodeOverlay />
        </div>

        {/* Fallback: pure CSS clip-path for left half if SVG mask fails */}
        <div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10" />
        </div>
      </div>

      {/* Subtle shadow beneath portrait */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[80%] h-8 bg-black/5 blur-2xl rounded-full" />
    </div>
  );
};

// ─── HERO SECTION ───────────────────────────────────────────────────────────
const Test = () => {
  return (
    <section className="relative w-full min-h-screen bg-[#f5f5f5] overflow-hidden flex items-center justify-center">
      {/* Background Typography Layer */}
      <BackgroundTypography />

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-20">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20 xl:gap-32">
          {/* Portrait - Center / Left on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="order-1 lg:order-1"
          >
            <PortraitWithMask />
          </motion.div>

          {/* Right Side Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
            className="order-2 lg:order-2 flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            {/* Name Typography */}
            <div className="flex flex-col leading-[0.9] tracking-tight">
              <motion.h1
                className="text-[clamp(3.5rem,10vw,8rem)] font-black text-black"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                VISHAL
              </motion.h1>
              <motion.h1
                className="text-[clamp(3.5rem,10vw,8rem)] font-black text-[#ff2d2d]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.75 }}
              >
                SHAKYA
              </motion.h1>
            </div>

            {/* Role */}
            <motion.p
              className="mt-6 text-[11px] sm:text-xs tracking-[0.3em] uppercase font-medium text-neutral-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.0 }}
            >
              Full Stack Developer
            </motion.p>

            {/* Subtle decorative line */}
            <motion.div
              className="mt-8 w-12 h-[1px] bg-neutral-300"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 1.2, ease: "easeOut" }}
              style={{ originX: 0 }}
            />
          </motion.div>
        </div>
      </div>

      {/* Bottom fade gradient for seamless scroll */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#f5f5f5] to-transparent pointer-events-none z-20" />
    </section>
  );
};

export default Test;