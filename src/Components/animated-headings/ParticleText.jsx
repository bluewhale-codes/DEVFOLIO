import { motion } from 'motion/react';

export default function ParticleText({ text = "PARTICLES" }) {
  const particles = Array.from({ length: 20 }, (_, i) => i);

  return (
    <div className="h-32 flex items-center justify-center relative">
      <h1 className="text-6xl font-black text-white relative z-10">
        {text}
      </h1>
      {particles.map((particle) => (
        <motion.div
          key={particle}
          className="absolute w-2 h-2 bg-cyan-400 rounded-full"
          style={{
            filter: 'blur(1px)',
            boxShadow: '0 0 10px rgba(34, 211, 238, 0.8)'
          }}
          animate={{
            x: [
              Math.random() * 200 - 100,
              Math.random() * 200 - 100,
              Math.random() * 200 - 100,
            ],
            y: [
              Math.random() * 100 - 50,
              Math.random() * 100 - 50,
              Math.random() * 100 - 50,
            ],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: particle * 0.15,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}
