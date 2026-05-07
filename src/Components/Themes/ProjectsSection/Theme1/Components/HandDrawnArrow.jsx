import { motion } from "motion/react";

export default function HandDrawnArrow({ className = "" }) {
  return (
    <motion.svg
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      className={`w-16 h-16 ${className}`}
      viewBox="0 0 100 100"
    >
      <motion.path
        d="M 10 50 Q 30 30, 50 45 T 85 40"
        fill="none"
        stroke="#374151"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      />
      <motion.path
        d="M 85 40 L 75 35 M 85 40 L 80 50"
        fill="none"
        stroke="#374151"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 1.3 }}
      />
    </motion.svg>
  );
}
