import { motion } from 'motion/react';

export default function VerticalKinetic({ text = "VERTICAL" }) {
  const letters = text.split('');

  return (
    <div className="flex justify-center items-center h-32 gap-1">
      {letters.map((letter, index) => (
        <motion.div
          key={index}
          className="flex flex-col"
          animate={{
            y: [0, -100, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: index * 0.1,
            ease: "easeInOut"
          }}
        >
          <span className="text-6xl font-black text-white opacity-20">
            {letter}
          </span>
          <span className="text-6xl font-black text-white">
            {letter === ' ' ? ' ' : letter}
          </span>
          <span className="text-6xl font-black text-white opacity-20">
            {letter}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
