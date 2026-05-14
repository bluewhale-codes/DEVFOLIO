import { motion } from 'motion/react';

export default function NeonFlicker({ text = "NEON FLICKER" }) {
  return (
    <div className="h-32 flex items-center justify-center">
      <motion.h1
        className="text-6xl font-black text-white"
        animate={{
          textShadow: [
            '0 0 10px #D4FF00, 0 0 20px #D4FF00, 0 0 30px #D4FF00',
            '0 0 5px #D4FF00, 0 0 10px #D4FF00, 0 0 15px #D4FF00',
            '0 0 15px #D4FF00, 0 0 25px #D4FF00, 0 0 35px #D4FF00',
            '0 0 10px #D4FF00, 0 0 20px #D4FF00, 0 0 30px #D4FF00',
          ],
          opacity: [1, 0.8, 1, 0.9, 1],
        }}
        transition={{
          duration: 0.15,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {text}
      </motion.h1>
    </div>
  );
}
