import { motion } from 'motion/react';

export default function WaveText({ text = "WAVE MOTION" }) {
  const letters = text.split('');

  return (
    <div className="flex justify-center items-center h-32">
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          
          style={{ display: 'inline-block', textShadow: '0 0 20px rgba(54, 54, 53, 0.5)' }}
          animate={{
            y: [0, -30, 0],
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
