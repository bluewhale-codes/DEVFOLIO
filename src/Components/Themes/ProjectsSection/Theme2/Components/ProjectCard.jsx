import { motion } from "motion/react";
import { ExternalLink, GitCompareArrows , Pencil } from "lucide-react";
import { useState } from "react";



export function ProjectCard({ title, description, image, tags, liveLink, gitRepo, delay = 0, onEdit }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative overflow-hidden rounded-lg bg-zinc-950 border-2 border-zinc-800 transition-all duration-500 hover:border-[#CCFF00] hover:shadow-[0_0_40px_rgba(204,255,0,0.3)]"
    >
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 z-10"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: isHovered ? 0.7 : 0.5 }}
          transition={{ duration: 0.3 }}
        />
        <motion.img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.08 : 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Action Buttons Overlay */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
          transition={{ duration: 0.3 }}
          className="absolute top-4 right-4 flex gap-2 z-20"
        >
          {onEdit && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              className="p-2 bg-blue-500 rounded hover:bg-blue-600 transition-colors"
            >
              <Pencil className="w-5 h-5 text-white" />
            </button>
          )}
          {liveLink && (
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-[#CCFF00] rounded hover:bg-[#B8E600] transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-5 h-5 text-black" />
            </a>
          )}
          {gitRepo && (
            <a
              href={gitRepo}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white rounded hover:bg-gray-200 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <GitCompareArrows  className="w-5 h-5 text-black" />
            </a>
          )}
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6 relative bg-black">
        <h3 className="font-bold text-xl text-white mb-3 group-hover:text-[#CCFF00] transition-colors duration-300">
          {title}
        </h3>

        <p className="text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: delay + 0.1 + index * 0.05 }}
              className="px-3 py-1 rounded text-xs font-bold bg-[#CCFF00]/10 text-[#CCFF00] border border-[#CCFF00]/30 hover:bg-[#CCFF00]/20 hover:border-[#CCFF00] transition-all duration-300"
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Bottom Links (Visible on Desktop) */}
        <div className="mt-4 pt-4 border-t border-zinc-800 flex gap-3 hidden md:flex">
          {liveLink && (
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-bold text-[#CCFF00] hover:text-[#B8E600] transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Live Demo
            </a>
          )}
          {gitRepo && (
            <a
              href={gitRepo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-white transition-colors"
            >
              <GitCompareArrows  className="w-4 h-4" />
              View Code
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
