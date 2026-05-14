import { motion } from 'motion/react';

export default function RotatingChars({ text = "ROTATE 360" }) {
  const letters = text.split('');

  return (
    <div className="flex justify-center items-center h-32">
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          className="text-6xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"
          style={{ display: 'inline-block' }}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: index * 0.15,
            ease: "linear"
          }}
        >
          {letter === ' ' ? ' ' : letter}
        </motion.span>
      ))}
    </div>
  );
}
