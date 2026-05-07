import { motion } from "motion/react";

export default function TapeSticker({ text, className = "" }) {
  return (
    <motion.div
      whileHover={{ rotate: 0 }}
      className={`inline-block ${className}`}
    >
      <div
        className="relative px-6 py-2 bg-gradient-to-r from-orange-400 to-red-400 text-white font-bold text-sm uppercase tracking-wider -rotate-1 shadow-md"
        style={{
          clipPath: `polygon(
            2% 0%, 98% 0%, 100% 5%, 100% 95%, 98% 100%, 2% 100%, 0% 95%, 0% 5%
          )`
        }}
      >
        {/* Tape texture overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 2px,
              rgba(255,255,255,0.3) 2px,
              rgba(255,255,255,0.3) 4px
            )`
          }}
        />
        <span className="relative z-10">{text}</span>
      </div>
    </motion.div>
  );
}
