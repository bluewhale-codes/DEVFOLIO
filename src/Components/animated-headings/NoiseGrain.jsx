import { motion } from 'motion/react';

export default function NoiseGrain({ text = "NOISE GRAIN" }) {
  return (
    <div className="h-32 flex items-center justify-center relative">
      <motion.h1
        className="text-6xl font-black text-white relative z-10"
        style={{ filter: 'drop-shadow(0 0 15px rgba(34, 211, 238, 0.5))' }}
      >
        {text}
      </motion.h1>
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")',
          mixBlendMode: 'overlay'
        }}
        animate={{
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
}
