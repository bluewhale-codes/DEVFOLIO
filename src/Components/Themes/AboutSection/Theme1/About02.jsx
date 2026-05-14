import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Pencil,
  X,
  Save,
  Trash2,
  Plus,
  ArrowDown
} from 'lucide-react';
import About01 from './About01';

gsap.registerPlugin(ScrollTrigger);

// Initial highlighted words data
const initialHighlightedWords = [
  { id: 1, word: 'simple', color: '#2453FF' },
  { id: 2, word: 'beautiful', color: '#2453FF' },
  { id: 3, word: 'intuitive', color: '#2453FF' },
];

// Word Modal - Edit/Add
const WordModal = ({ isOpen, onClose, onSave, onDelete, wordData, isNew = false }) => {
  const [formData, setFormData] = useState({
    word: '',
    color: '#2453FF',
    ...wordData
  });

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ backdropFilter: 'blur(12px)', backgroundColor: 'rgba(0,0,0,0.3)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 20, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          onClick={e => e.stopPropagation()}
          className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden"
        >
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">
              {isNew ? '➕ Add Highlight' : '✏️ Edit Highlight'}
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          <div className="p-5 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Word</label>
              <input
                type="text"
                value={formData.word}
                onChange={e => setFormData({ ...formData, word: e.target.value })}
                placeholder="e.g., simple"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2453FF] focus:ring-2 focus:ring-[#2453FF]/10 outline-none text-sm bg-gray-50/50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Color</label>
              <div className="flex gap-2">
                {['#2453FF', '#6C4DFF', '#D7FF2F', '#FF6B6B', '#333333'].map(color => (
                  <button
                    key={color}
                    onClick={() => setFormData({ ...formData, color })}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${formData.color === color ? 'border-gray-900 scale-110' : 'border-transparent'}`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            <div className="bg-[#f5f3ef] rounded-xl p-4">
              <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Preview</span>
              <p className="text-sm mt-2">
                turning complex problems into{' '}
                <span className="relative inline-block font-semibold" style={{ color: formData.color }}>
                  {formData.word || 'word'}
                  <svg className="absolute -bottom-0.5 left-0 w-full h-1.5" viewBox="0 0 60 6" preserveAspectRatio="none">
                    <path d="M2 4 Q 15 1, 30 3 Q 45 5, 58 2" stroke={formData.color} strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.3" />
                  </svg>
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between p-5 border-t border-gray-100 bg-gray-50/30">
            {!isNew && (
              <button
                onClick={() => { onDelete(wordData.id); onClose(); }}
                className="flex items-center gap-2 px-4 py-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-colors text-xs font-semibold"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Delete
              </button>
            )}
            <div className="flex gap-2 ml-auto">
              <button onClick={onClose} className="px-5 py-2.5 text-gray-500 hover:bg-gray-100 rounded-xl transition-colors text-xs font-semibold">
                Cancel
              </button>
              <button
                onClick={() => { onSave(formData); onClose(); }}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#2453FF] text-white hover:bg-[#1a45e0] rounded-xl transition-colors text-xs font-semibold shadow-lg shadow-[#2453FF]/20"
              >
                <Save className="w-3.5 h-3.5" />
                {isNew ? 'Add' : 'Save'}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Decorative SVG Components
const HandDrawnOval = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 100 40" fill="none">
    <ellipse cx="50" cy="20" rx="45" ry="15" stroke="#2453FF" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const ScribbleUnderline = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 200 15" preserveAspectRatio="none">
    <path d="M5 8 Q 30 2, 60 6 Q 90 10, 120 4 Q 150 8, 195 5" stroke="#2453FF" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M10 11 Q 40 7, 70 9 Q 100 12, 130 7 Q 160 10, 190 8" stroke="#2453FF" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />
  </svg>
);

const SignatureSVG = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 120 50" fill="none">
    <path d="M10 35 Q 25 15, 40 30 Q 50 38, 60 25 Q 70 12, 80 28 Q 90 35, 100 22" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d="M15 40 Q 35 38, 55 40 Q 75 42, 95 40" stroke="#2453FF" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <text x="15" y="32" fontFamily="cursive" fontSize="22" fill="#1a1a1a" fontWeight="600">Rahul</text>
  </svg>
);

const BlueDoodle = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 40 40" fill="none">
    <path d="M20 5 L22 15 L30 12 L25 20 L32 25 L22 28 L20 38 L18 28 L8 25 L15 20 L10 12 L18 15 Z" stroke="#2453FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const InkScribble = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 100 30" fill="none">
    <path d="M5 15 Q 15 5, 25 15 Q 35 25, 45 15 Q 55 5, 65 15 Q 75 25, 85 15 Q 95 5, 100 15" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d="M10 20 Q 20 12, 30 20 Q 40 28, 50 20" stroke="#1a1a1a" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.6" />
  </svg>
);

const DottedPattern = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 60 120" fill="none">
    {[...Array(8)].map((_, i) => (
      <g key={i}>
        <circle cx="10" cy={10 + i * 14} r="2" fill="#1a1a1a" opacity="0.3" />
        <circle cx="25" cy={10 + i * 14} r="2" fill="#1a1a1a" opacity="0.5" />
        <circle cx="40" cy={10 + i * 14} r="2" fill="#1a1a1a" opacity="0.3" />
        <circle cx="55" cy={10 + i * 14} r="2" fill="#1a1a1a" opacity="0.4" />
      </g>
    ))}
  </svg>
);

const GridPaperTexture = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 200 250" fill="none">
    <defs>
      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#2453FF" strokeWidth="0.5" opacity="0.2" />
      </pattern>
    </defs>
    <rect width="200" height="250" fill="url(#grid)" />
  </svg>
);

const TornPaperShape = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 300 400" fill="none">
    <path
      d="M20,50 Q40,30 60,45 Q80,20 110,35 Q140,15 170,40 Q200,10 230,35 Q260,20 280,50 Q290,80 275,110 Q285,140 270,170 Q280,200 265,230 Q275,260 260,290 Q270,320 255,350 Q265,380 240,390 Q210,395 180,385 Q150,395 120,380 Q90,390 60,375 Q30,385 20,350 Q10,320 25,290 Q15,260 30,230 Q20,200 35,170 Q25,140 40,110 Q30,80 20,50Z"
      fill="#2453FF"
    />
  </svg>
);

// Main AboutMeV3 Section Component
const About02 = () => {
  const [highlightedWords, setHighlightedWords] = useState(initialHighlightedWords);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingWord, setEditingWord] = useState(null);
  const [isNewWord, setIsNewWord] = useState(false);

  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: leftRef.current, start: "top 85%" }
      });

      gsap.from(rightRef.current, {
        x: 60,
        opacity: 0,
        duration: 1.2,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: { trigger: rightRef.current, start: "top 85%" }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleEdit = (word) => {
    setEditingWord(word);
    setIsNewWord(false);
    setModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingWord(null);
    setIsNewWord(true);
    setModalOpen(true);
  };

  const handleSave = (formData) => {
    if (isNewWord) {
      const newId = Math.max(...highlightedWords.map(w => w.id), 0) + 1;
      setHighlightedWords([...highlightedWords, { ...formData, id: newId }]);
    } else {
      setHighlightedWords(highlightedWords.map(w => w.id === formData.id ? formData : w));
    }
  };

  const handleDelete = (id) => {
    setHighlightedWords(highlightedWords.filter(w => w.id !== id));
  };

  // Build description with highlighted words
  const buildDescription = () => {
    let desc = "I'm Rahul, a product designer who loves turning complex problems into ";
    const words = [...highlightedWords];
    
    if (words.length === 0) {
      return desc + "simple, beautiful and intuitive digital experiences.";
    }
    
    const wordList = words.map((w, i) => {
      const isLast = i === words.length - 1;
      const isSecondLast = i === words.length - 2;
      let separator = '';
      if (isLast && words.length > 1) separator = ' and ';
      else if (!isLast) separator = ', ';
      
      return (
        <span key={w.id}>
          {separator}
          <span className="relative inline-block font-semibold" style={{ color: w.color }}>
            {w.word}
            <button 
              onClick={() => handleEdit(w)}
              className="absolute -top-3 -right-3 p-1 bg-white rounded shadow-sm opacity-100 sm:opacity-0 hover:opacity-100 transition-opacity"
            >
              <Pencil className="w-2.5 h-2.5 text-gray-600" />
            </button>
            <svg className="absolute -bottom-0.5 left-0 w-full h-1.5" viewBox="0 0 60 6" preserveAspectRatio="none">
              <path d="M2 4 Q 15 1, 30 3 Q 45 5, 58 2" stroke={w.color} strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.3" />
            </svg>
          </span>
        </span>
      );
    });
    
    return (
      <>
        {desc}
        {wordList}
        {' digital experiences.'}
      </>
    );
  };

  return (
    <section ref={sectionRef} className="w-full min-h-screen  relative overflow-hidden">
      {/* Grain texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px'
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[80vh]">

          {/* LEFT SIDE - Typography */}
          <div ref={leftRef} className="flex flex-col justify-center order-2 lg:order-1">
            {/* Hand-drawn oval label */}
            <motion.div
              initial={{ opacity: 0, rotate: -5 }}
              whileInView={{ opacity: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative mb-5 sm:mb-6 w-fit"
            >
              <HandDrawnOval className="absolute inset-0 w-full h-full text-[#2453FF]" />
              <span className="relative z-10 px-5 py-1.5 text-[10px] sm:text-xs font-bold text-[#2453FF] uppercase tracking-wider">
                About Me
              </span>
            </motion.div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-black text-[#1a1a1a] leading-[0.95] mb-4 sm:mb-5 uppercase tracking-tight">
              Vishal Shakya<br />
             
              <span className="relative inline-block text-[#2453FF]">
                Make Sense.
                <ScribbleUnderline className="absolute -bottom-1 left-0 w-full h-3" />
              </span>
            </h1>

            {/* Blue doodle near heading */}
            <div className="absolute top-32 right-10 lg:right-auto lg:left-[45%] w-6 h-6 sm:w-8 sm:h-8 text-[#2453FF]">
              <BlueDoodle />
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-sm mb-5 sm:mb-6">
              {buildDescription()}
            </p>

            {/* Add Highlight Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleAddNew}
              className="flex items-center gap-2 px-4 py-2 bg-[#2453FF] text-white rounded-full font-semibold text-[10px] sm:text-xs hover:bg-[#1a45e0] transition-colors shadow-lg shadow-[#2453FF]/20 mb-5 w-fit"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Highlight
            </motion.button>

            {/* Signature */}
            <div className="mb-6 sm:mb-8">
              <SignatureSVG className="w-24 h-10 sm:w-28 sm:h-12" />
            </div>

            {/* Scroll Down */}
            <div className="flex items-center gap-3">
              <span className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Scroll Down
              </span>
              <motion.button
                whileHover={{ scale: 1.1, y: 2 }}
                whileTap={{ scale: 0.95 }}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-[#2453FF] hover:text-[#2453FF] transition-all"
              >
                <ArrowDown className="w-3.5 h-3.5" />
              </motion.button>
            </div>
          </div>

          {/* RIGHT SIDE - Portrait Collage */}
          <div ref={rightRef} className="relative flex items-center justify-center order-1 lg:order-2 min-h-[300px] sm:min-h-[400px]">
            {/* Torn blue paper shape behind */}
            {/* <div className="absolute top-0 right-0 w-64 h-80 sm:w-80 sm:h-96 lg:w-96 lg:h-[28rem] opacity-90">
              <TornPaperShape className="w-full h-full text-[#2453FF]" />
            </div> */}

            {/* Grid paper texture */}
            {/* <div className="absolute top-8 left-4 sm:left-8 w-32 h-40 sm:w-40 sm:h-48 opacity-60">
              <GridPaperTexture className="w-full h-full" />
            </div> */}

            {/* Portrait */}
            <div className="relative z-10 w-[300px] sm:w-72 lg:w-[500px]">
             
                {/* Rough cutout effect */}
                
                  <img
                    src="https://res.cloudinary.com/dycjjaxsk/image/upload/v1778695682/ChatGPT_Image_May_13__2026__11_36_10_PM-removebg-preview_voxsvp.png"
                    alt="Portrait"
                    className="w-full h-auto object-cover"
                    // style={{ filter: 'grayscale(100%) contrast(1.2) brightness(1.05)' }}
                  />
                  <img
                    src="https://res.cloudinary.com/dycjjaxsk/image/upload/v1778696342/yhtz1asguon2pshq01w3-removebg-preview_1_rzqxhv.png"
                    alt="Portrait"
                    className="top-[60px] left-[100px] absolute w-60 h-auto object-cover"
                    // style={{ filter: 'grayscale(100%) contrast(1.2) brightness(1.05)' }}
                  />
            </div>

                {/* White border/outline effect */}
                {/* <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    clipPath: 'polygon(5% 0%, 20% 2%, 40% 0%, 60% 3%, 80% 0%, 95% 2%, 100% 15%, 97% 35%, 100% 55%, 98% 75%, 100% 90%, 95% 100%, 75% 97%, 55% 100%, 35% 98%, 15% 100%, 5% 97%, 0% 85%, 3% 65%, 0% 45%, 2% 25%, 0% 10%)',
                    boxShadow: 'inset 0 0 0 3px rgba(255,255,255,0.8)'
                  }}
                /> */}
             
           

            {/* Ink scribble at bottom */}
            <div className="absolute -bottom-4 left-8 sm:left-16 w-20 h-6 sm:w-28 sm:h-8 text-[#1a1a1a]">
              <InkScribble />
            </div>

            {/* Dotted pattern far right */}
            <div className="absolute top-10 -right-4 sm:-right-8 w-8 h-24 sm:w-10 sm:h-32">
              <DottedPattern />
            </div>

            {/* Small accent marks */}
            <div className="absolute top-20 left-0 w-3 h-3 text-[#2453FF]">
              <svg viewBox="0 0 10 10" fill="none">
                <line x1="5" y1="0" x2="5" y2="10" stroke="currentColor" strokeWidth="2" />
                <line x1="0" y1="5" x2="10" y2="5" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Word Modal */}
      <WordModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        onDelete={handleDelete}
        wordData={editingWord}
        isNew={isNewWord}
      />
    </section>
  );
};

export default About02;