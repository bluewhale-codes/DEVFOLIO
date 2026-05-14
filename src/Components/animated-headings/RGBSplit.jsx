import { motion } from 'motion/react';

export default function RGBSplit({ text = "RGB SHIFT" }) {
  return (
    <div className="h-32 flex items-center justify-center relative">
      <div className="relative">
        {/* Red channel */}
        <motion.h1
          className="text-6xl font-black text-red-500 absolute top-0 left-0"
          style={{ mixBlendMode: 'screen' }}
          animate={{ x: [-3, 3, -3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          {text}
        </motion.h1>
        {/* Green channel */}
        <motion.h1
          className="text-6xl font-black text-green-500 absolute top-0 left-0"
          style={{ mixBlendMode: 'screen' }}
          animate={{ x: [0, 0, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {text}
        </motion.h1>
        {/* Blue channel */}
        <motion.h1
          className="text-6xl font-black text-blue-500 absolute top-0 left-0"
          style={{ mixBlendMode: 'screen' }}
          animate={{ x: [3, -3, 3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          {text}
        </motion.h1>
        {/* White base */}
        <h1 className="text-6xl font-black text-transparent">
          {text}
        </h1>
      </div>
    </div>
  );
}
