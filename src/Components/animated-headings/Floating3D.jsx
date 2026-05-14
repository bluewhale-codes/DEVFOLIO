import { motion } from 'motion/react';

export default function Floating3D({ text = "FLOAT 3D" }) {
  const letters = text.split('');

  return (
    <div className="flex justify-center items-center h-32 perspective-1000">
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          className="text-6xl font-black text-white"
          style={{
            display: 'inline-block',
            filter: 'drop-shadow(0 0 20px rgba(167, 139, 250, 0.6))'
          }}
          animate={{
            rotateY: [0, 360],
            y: [0, -20, 0],
            z: [0, 50, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: index * 0.2,
            ease: "easeInOut"
          }}
        >
          {letter === ' ' ? ' ' : letter}
        </motion.span>
      ))}
    </div>
  );
}
