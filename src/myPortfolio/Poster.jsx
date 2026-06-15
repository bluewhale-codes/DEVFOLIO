import React from "react";
import { motion } from "framer-motion";

// ═══════════════════════════════════════════════════════════════════════════════
// ICONS (inline SVG for zero dependencies)
// ═══════════════════════════════════════════════════════════════════════════════

const CodeIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <path d="M8 21h8" />
    <path d="M12 17v4" />
    <path d="M7 8l-2 2 2 2" />
    <path d="M17 8l2 2-2 2" />
    <path d="M11 8l2 4" />
  </svg>
);

const BuildIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);

const ImpactIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const RepeatIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 3H5a2 2 0 0 0-2 2v3" />
    <path d="M16 3h3a2 2 0 0 1 2 2v3" />
    <path d="M8 21H5a2 2 0 0 1-2-2v-3" />
    <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
    <path d="M9 9h6v6H9z" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

const QuoteMarkIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21" />
    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3" />
  </svg>
);

// ═══════════════════════════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════════════════════════

const FEATURES = [
  { icon: <CodeIcon />, label: "Code" },
  { icon: <BuildIcon />, label: "Build" },
  { icon: <ImpactIcon />, label: "Impact" },
  { icon: <RepeatIcon />, label: "Repeat" },
];

// ═══════════════════════════════════════════════════════════════════════════════
// BACKGROUND TYPOGRAPHY
// ═══════════════════════════════════════════════════════════════════════════════

const BackgroundTypography = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      <div className="absolute top-[8%] left-[-5%] whitespace-nowrap">
        <span className="block text-[clamp(120px,18vw,280px)] font-black leading-[0.85] tracking-tighter text-[#E5E5E5]">
          FULL
        </span>
      </div>
      <div className="absolute top-[32%] left-[5%] whitespace-nowrap">
        <span className="block text-[clamp(120px,18vw,280px)] font-black leading-[0.85] tracking-tighter text-[#E5E5E5]">
          STACK
        </span>
      </div>
      <div className="absolute top-[56%] left-[-2%] whitespace-nowrap">
        <span className="block text-[clamp(120px,18vw,280px)] font-black leading-[0.85] tracking-tighter text-[#E5E5E5]">
          DEVELOPER
        </span>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN POSTER COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

const Poster = () => {
  return (
    <section className="relative w-full min-h-screen  overflow-hidden flex items-center justify-center p-6 sm:p-10 lg:p-16">
      

      {/* Foreground Content Card */}
      <motion.div
        className="relative z-10 w-full max-w-[550px]  rounded-2xl shadow-[0_8px_60px_-15px_rgba(0,0,0,0.08)] p-10 sm:p-14 lg:p-16 flex flex-col items-start"
        
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Name Block */}
        <div className="flex items-start gap-4 mb-10">
          {/* Thin vertical red line */}
          <motion.div
            className="w-[5px] h-full min-h-[140px] bg-[#D50000] rounded-full shrink-0"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            style={{ originY: 0 }}
          />

          <div className="flex flex-col">
            <motion.h1
              className="text-[clamp(3rem,8vw,4.5rem)] font-black text-[#111111] leading-[0.9] tracking-tight uppercase"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              VISHAL
            </motion.h1>
            <motion.h1
              className="text-[clamp(3rem,8vw,4.5rem)] font-black text-[#D50000] leading-[0.9] tracking-tight uppercase"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
            >
              SHAKYA
            </motion.h1>
          </div>
        </div>

        {/* Role subtitle */}
        <motion.p
          className="text-[11px] tracking-[0.35em] uppercase font-semibold text-neutral-400 mb-10 ml-7"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          Full Stack Developer
        </motion.p>

        {/* Feature Icons */}
        <motion.div
          className="flex items-start justify-between w-full mb-10 px-2"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
        >
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.label}
              className="flex flex-col items-center gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 + i * 0.1 }}
            >
              <div className="text-neutral-500 hover:text-[#D50000] transition-colors duration-300">
                {feature.icon}
              </div>
              <span className="text-[10px] tracking-[0.2em] uppercase font-medium text-neutral-400">
                {feature.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Quote Section */}
        <motion.div
          className="relative mb-10 ml-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <div className="flex items-start gap-3">
            <div className="text-neutral-300 mt-1 shrink-0">
              <QuoteMarkIcon />
            </div>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-light italic">
              Turning ideas into scalable, impactful solutions through code.
            </p>
          </div>
          {/* Red underline accent */}
          <motion.div
            className="mt-4 ml-10 w-12 h-[2px] bg-[#D50000] rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 1.4, ease: "easeOut" }}
            style={{ originX: 0 }}
          />
        </motion.div>

        {/* Footer CTA */}
        <motion.div
          className="w-full flex items-center justify-between pt-6 border-t border-neutral-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.3 }}
        >
          <p className="text-sm font-medium text-[#111111]">
            Let&apos;s build the future{" "}
            <span className="text-[#D50000]">together.</span>
          </p>
          <div className="text-neutral-400">
            <ArrowRightIcon />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Poster;