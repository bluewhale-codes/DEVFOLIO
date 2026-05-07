import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";

export default function StampSeal() {
  return (
    <motion.div
      whileHover={{ rotate: 360, scale: 1.1 }}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      <div className="w-24 h-24 rounded-full border-4 border-blue-500 flex items-center justify-center bg-blue-50 rotate-12">
        <div className="text-center">
          <CheckCircle2 className="w-8 h-8 text-blue-500 mx-auto mb-1" />
          <p className="text-xs font-bold text-blue-600 uppercase tracking-tight">
            Quality
          </p>
        </div>
      </div>

      {/* Stamp texture effect */}
      <div
        className="absolute inset-0 rounded-full opacity-20 mix-blend-multiply"
        style={{
          background: `radial-gradient(circle, transparent 40%, rgba(59, 130, 246, 0.3) 100%)`
        }}
      />
    </motion.div>
  );
}
