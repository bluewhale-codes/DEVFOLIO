import { motion } from 'motion/react';

export default function SlideReveal({ text = "SLIDE REVEAL" }) {
  const letters = text.split('');

  return (
    <div className="flex justify-center items-center h-32 overflow-hidden">
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          //className="text-6xl font-black bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"
          style={{ display: 'inline-block' }}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatDelay: 2,
            delay: index * 0.05,
            ease: "easeOut"
          }}
        >
          {letter === ' ' ? ' ' : letter}
        </motion.span>
      ))}
    </div>
  );
}
