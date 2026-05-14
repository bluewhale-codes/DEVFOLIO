import { useState,useEffect, useRef } from "react";
import { motion,AnimatePresence } from "motion/react";
import { animations } from "../../../Components/animated-headings/animation";
import { X, Plus, Upload, Calendar as CalendarIcon,
  Sparkles,
  ArrowLeftRight,
  Maximize2,
  CircleDot,
  RotateCw,
  FlipHorizontal2,
  ArrowUp,
  ZoomOut,
  Waves,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../Components/ui/dialog";
import { Input } from "../../../Components/ui/input";
import { Label } from "../../../Components/ui/label";
import { Textarea } from "../../../Components/ui/textarea";
import { Button } from "../../../Components/ui/Button";
import { Badge } from "../../../Components/ui/badge";
import { ScrollArea } from "../../../Components/ui/scroll-area";
import { Separator } from "../../../Components/ui/separator";




export default function SelectTextAnimation({setTextAnimation}) {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [selectedAnimation, setSelectedAnimation] = useState('fade');
  const fullText = 'Chakit';

  // Typing animation effect
  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 150);

    return () => clearInterval(typingInterval);
  }, []);

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  const scrollContainer = (direction) => {
    const container = document.getElementById('animation-scroll');
    if (container) {
      const scrollAmount = 200;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
   
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative w-full max-w-2xl mx-4"
      >
        {/* Glass dialog container */}
        <div className="bg-gradient-to-br from-slate-50/95 via-white/90 to-purple-50/95 backdrop-blur-xl rounded-[28px] shadow-2xl shadow-purple-900/20 border border-white/40 overflow-hidden">

          {/* Row 1: Text Section */}
          <div className="relative px-8 pt-8 pb-6">
            {/* Decorative elements */}
            <div className="absolute top-8 right-24 grid grid-cols-3 gap-1 opacity-30">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="w-1 h-1 rounded-full bg-slate-400" />
              ))}
            </div>

            {/* Floating blob */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="absolute top-4 right-8 w-20 h-20 rounded-full bg-gradient-to-br from-purple-300/40 via-pink-300/40 to-blue-300/40 blur-xl"
            />

            <div className="flex items-start justify-between relative">
              <div className="flex-1">
                {/* Subtitle */}
                <p className="text-sm text-slate-500 mb-1 font-light tracking-wide">
                  Hello, I'm
                </p>

                {/* Animated typing text */}
                <div className="overflow-hidden border p-5 rounded-xl bg-black text-white flex items-center">
                   {animations.map((animation)=>{

                     return(
                         <div>
                           {animation.id===selectedAnimation && <animation.content/>}
                          </div>
                     )
                     
                   })}
                </div>
              </div>

              {/* Close button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-xl hover:bg-slate-200/50 transition-all duration-200 group"
              >
                <X className="w-5 h-5 text-slate-600 group-hover:text-slate-900 transition-colors" />
              </motion.button>
            </div>
          </div>

          {/* Row 2: Animation Cards */}
          <div className="px-8 pb-8 pt-2">
            <div className="relative">
              {/* Scroll buttons */}
              <button
                onClick={() => scrollContainer('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 -ml-4 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white transition-all duration-200 opacity-60 hover:opacity-100"
              >
                <ChevronLeft className="w-4 h-4 text-slate-700" />
              </button>

              <button
                onClick={() => scrollContainer('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 -mr-4 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white transition-all duration-200 opacity-60 hover:opacity-100"
              >
                <ChevronRight className="w-4 h-4 text-slate-700" />
              </button>

              {/* Animation cards container */}
              <div
                id="animation-scroll"
                className="flex gap-3 overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100 scrollbar-thumb-rounded-full"
                style={{ scrollbarWidth: 'thin' }}
              >
                {animations.map((animation) => {
                  const Compt = animation.content;
                  const isSelected = selectedAnimation === animation.id;

                  return (
                    <motion.div
                      key={animation.id}
                      onClick={() => {
                        setTextAnimation(animation.id)
                        setSelectedAnimation(animation.id);
                      }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-[100px] h-[100px] cursor-pointer flex-shrink-0 flex flex-col items-center justify-center gap-2 px-6 py-4 rounded-2xl border transition-all duration-300 min-w-[100px] ${
                        isSelected
                          ? 'bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 border-purple-200/60 shadow-lg shadow-purple-200/50'
                          : 'bg-white/40 border-slate-200/60 hover:bg-white/60 hover:border-slate-300/60 hover:shadow-md'
                      }`}
                    >
                      
                    
                      <span className={`text-xs font-medium whitespace-nowrap ${
                        isSelected ? 'text-slate-900' : 'text-slate-600'
                      }`}>
                        {animation.name}
                      </span> 
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Floating shadow/glow beneath dialog */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-purple-500/20 blur-3xl rounded-full" />
      </motion.div>
    
  );
}
