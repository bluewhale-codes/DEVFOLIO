import { motion } from 'motion/react';

export default function InfiniteMarquee({ text = "INFINITE SCROLL" }) {
  return (
    <div style={{
      overflow:"hidden"
    }} className="overflow-hidden flex items-center">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: [0, -1000] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {[...Array(10)].map((_, i) => (
          <span
            key={i}
            className=""
            style={{ textShadow: '0 0 30px rgba(34, 211, 238, 0.4)' }}
          >
            {text} •
          </span>
        ))}
      </motion.div>
    </div>
  );
}
