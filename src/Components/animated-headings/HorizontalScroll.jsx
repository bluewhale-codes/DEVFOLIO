import { motion } from 'motion/react';

export default function HorizontalScroll({ text = "SEAMLESS FLOW" }) {
  return (
    <div className="relative h-32 overflow-hidden flex items-center bg-gradient-to-r from-transparent via-purple-900/20 to-transparent">
      <motion.div
        className="flex whitespace-nowrap absolute"
        animate={{ x: ["100%", "-100%"] }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className="text-6xl font-black text-white mx-16"
            style={{
              WebkitTextStroke: '2px rgba(167, 139, 250, 0.5)',
              paintOrder: 'stroke fill'
            }}
          >
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
