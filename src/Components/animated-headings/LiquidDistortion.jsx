import { motion } from 'motion/react';

export default function LiquidDistortion({ text = "LIQUID WAVE" }) {
  const letters = text.split('');

  return (
    <div className="flex justify-center items-center h-32">
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          //className="text-6xl font-black text-transparent bg-gradient-to-b from-blue-400 to-purple-600 bg-clip-text"
          style={{ display: 'inline-block' }}
          animate={{
            scaleY: [1, 1.2, 0.8, 1],
            scaleX: [1, 0.8, 1.2, 1],
            y: [0, -10, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: index * 0.1,
            ease: "easeInOut"
          }}
        >
          {letter === ' ' ? ' ' : letter}
        </motion.span>
      ))}
    </div>
  );
}
