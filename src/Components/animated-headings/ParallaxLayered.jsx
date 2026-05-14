import { motion } from 'motion/react';
import { useState } from 'react';

export default function ParallaxLayered({ text = "PARALLAX" }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 20;
    const y = (e.clientY - rect.top - rect.height / 2) / 20;
    setMousePosition({ x, y });
  };

  return (
    <div
      className="h-32 flex items-center justify-center relative"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePosition({ x: 0, y: 0 })}
    >
      {/* Background layer */}
      <motion.h1
        className="text-6xl font-black text-purple-500/30 absolute"
        animate={{
          x: mousePosition.x * 2,
          y: mousePosition.y * 2,
        }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        {text}
      </motion.h1>
      {/* Middle layer */}
      <motion.h1
        className="text-6xl font-black text-purple-400/50 absolute"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
        }}
        transition={{ type: "spring", stiffness: 150 }}
      >
        {text}
      </motion.h1>
      {/* Front layer */}
      <motion.h1
        className="text-6xl font-black text-white relative z-10"
        animate={{
          x: mousePosition.x * 0.5,
          y: mousePosition.y * 0.5,
        }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        {text}
      </motion.h1>
    </div>
  );
}
