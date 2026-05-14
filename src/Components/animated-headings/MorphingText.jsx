import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

export default function MorphingText() {
  const words = ["CREATE", "DESIGN", "INNOVATE", "BUILD"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-32 flex items-center justify-center">
      <motion.h1
        key={index}
        className="text-6xl font-black bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 20, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.8 }}
        transition={{ duration: 0.5 }}
      >
        {words[index]}
      </motion.h1>
    </div>
  );
}
