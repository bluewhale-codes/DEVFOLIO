import { motion } from 'motion/react';

export default function BlurToSharp({ text = "FOCUS SHIFT" }) {
  return (
    <div className="h-32 flex items-center justify-center">
      <motion.h1
        className="text-6xl font-black bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"
        animate={{
          filter: [
            'blur(10px)',
            'blur(0px)',
            'blur(10px)',
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {text}
      </motion.h1>
    </div>
  );
}
