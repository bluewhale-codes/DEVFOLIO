"use client";

import { motion } from "framer-motion";
import { Eye, Copy, Sparkles, Star } from "lucide-react";
import { useSelector , useDispatch } from "react-redux";
import { setBackground } from "../../../../store/slice/panelSlice";
import { useEffect } from "react";
export default function HoverCard({background}) {
   
    const dispatch = useDispatch();

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.25 }}
      className="cursor-pointer group relative h-[140px] w-[calc(50%-8px)] overflow-hidden rounded-2xl"
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#d8c2ff_0%,#f3dfd3_45%,#f6b9da_75%,#bcc9f7_100%)]" />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/5 transition-all duration-300 group-hover:bg-black/20" />

      {/* Top Left Icon */}
      <div className="absolute left-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/10 backdrop-blur-md">
        <Star className="h-4 w-4 text-white" />
      </div>

      {/* Top Right Badge */}
      <div className="absolute right-3 top-3 z-20 flex items-center gap-1 rounded-lg bg-white/80 px-2 py-1 backdrop-blur-md">
        <Sparkles className="h-3 w-3 text-violet-600" />
        <span className="text-[11px] font-medium text-black">New</span>
      </div>

      {/* Hover Content */}
      <div className="absolute inset-0 z-30 flex flex-col justify-end p-3">
       

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileHover={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="space-y-2"
        >
          
          <h3 className="text-[12px] font-bold">Aurora Dream Corner Whispers</h3>
          <button onClick={()=>dispatch(setBackground(background))} className="cursor-pointer flex w-full items-center justify-center gap-2 rounded-xl bg-[#111827] py-2 text-[12px] font-medium text-white shadow-md">
            <Copy className="h-3 w-3" />
            Select
          </button>
        </motion.div>
      </div>

      {/* Bottom Shadow */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/45 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </motion.div>
  );
}

