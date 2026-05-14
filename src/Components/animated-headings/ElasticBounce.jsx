import { motion } from 'motion/react';

export default function ElasticBounce({ text = "BOUNCE IT" }) {
  return (
    <div className="h-32 flex items-center justify-center">
      <motion.h1
        className="text-6xl font-black text-white"
        style={{ filter: 'drop-shadow(0 0 20px rgba(132, 204, 22, 0.5))' }}
        animate={{
          y: [0, -40, 0],
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.4, 1],
        }}
      >
        {text}
      </motion.h1>
    </div>
  );
}
