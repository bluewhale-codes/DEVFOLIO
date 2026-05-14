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
  ArrowRight,
  Code2,
  Terminal
} from 'lucide-react';
import HeroFeature from '../Components/HeroFeature';

gsap.registerPlugin(ScrollTrigger);

// Tech stack options
const techOptions = [
  { value: 'React', icon: '⚛️', color: '#61DAFB' },
  { value: 'Next.js', icon: '▲', color: '#000000' },
  { value: 'TypeScript', icon: 'TS', color: '#3178C6' },
  { value: 'Node.js', icon: '⬢', color: '#339933' },
  { value: 'MongoDB', icon: '🍃', color: '#47A248' },
  { value: 'Python', icon: '🐍', color: '#3776AB' },
  { value: 'GraphQL', icon: '◈', color: '#E10098' },
  { value: 'Docker', icon: '🐳', color: '#2496ED' },
];

// Initial tech stack data
const initialTechStack = [
  { id: 1, name: 'React', icon: '⚛️', color: '#61DAFB' },
  { id: 2, name: 'Next.js', icon: '▲', color: '#000000' },
  { id: 3, name: 'TypeScript', icon: 'TS', color: '#3178C6' },
  { id: 4, name: 'Node.js', icon: '⬢', color: '#339933' },
  { id: 5, name: 'MongoDB', icon: '🍃', color: '#47A248' },
];

// Code snippet data
const initialCodeSnippets = [
  {
    id: 1,
    type: 'dark',
    code: `const developer = {
  name: "Rahul",
  role: "Full Stack Developer",
  passion: "Building products",
  skills: ["React", "Node.js", 
    "TypeScript", "MongoDB"],
};

const solution = 
  developer.skills + developer.passion;`
  },
  {
    id: 2,
    type: 'light',
    code: `function createImpact() {
  return ideas
    .map(code => reality)
    .filter(impact => true);
}

createImpact(); // Let's build 
something amazing`
  }
];

// Tech Stack Modal
const TechModal = ({ isOpen, onClose, onSave, onDelete, tech, isNew = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    icon: '⚛️',
    color: '#61DAFB',
    ...tech
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
              {isNew ? '➕ Add Tech' : '✏️ Edit Tech'}
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          <div className="p-5 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Tech</label>
              <select
                value={formData.name}
                onChange={e => {
                  const selected = techOptions.find(t => t.value === e.target.value);
                  setFormData({ ...formData, name: e.target.value, icon: selected?.icon || '⚛️', color: selected?.color || '#61DAFB' });
                }}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#3D4BFF] focus:ring-2 focus:ring-[#3D4BFF]/10 outline-none text-sm bg-gray-50/50"
              >
                {techOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.value}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Icon</label>
              <input
                type="text"
                value={formData.icon}
                onChange={e => setFormData({ ...formData, icon: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#3D4BFF] focus:ring-2 focus:ring-[#3D4BFF]/10 outline-none text-sm bg-gray-50/50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Color</label>
              <input
                type="color"
                value={formData.color}
                onChange={e => setFormData({ ...formData, color: e.target.value })}
                className="w-full h-10 rounded-xl border border-gray-200 cursor-pointer"
              />
            </div>

            <div className="bg-[#f5f3ef] rounded-xl p-4 flex items-center gap-3">
              <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Preview</span>
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm text-lg">
                {formData.icon}
              </div>
              <span className="text-sm font-medium text-gray-900">{formData.name}</span>
            </div>
          </div>

          <div className="flex items-center justify-between p-5 border-t border-gray-100 bg-gray-50/30">
            {!isNew && (
              <button
                onClick={() => { onDelete(tech.id); onClose(); }}
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
                className="flex items-center gap-2 px-5 py-2.5 bg-[#3D4BFF] text-white hover:bg-[#2a38e0] rounded-xl transition-colors text-xs font-semibold shadow-lg shadow-[#3D4BFF]/20"
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

// Code Snippet Modal
const CodeModal = ({ isOpen, onClose, onSave, onDelete, snippet, isNew = false }) => {
  const [formData, setFormData] = useState({
    type: 'dark',
    code: '',
    ...snippet
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
          className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
        >
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">
              {isNew ? '➕ Add Code Snippet' : '✏️ Edit Code Snippet'}
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          <div className="p-5 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Theme</label>
              <select
                value={formData.type}
                onChange={e => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#3D4BFF] focus:ring-2 focus:ring-[#3D4BFF]/10 outline-none text-sm bg-gray-50/50"
              >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Code</label>
              <textarea
                value={formData.code}
                onChange={e => setFormData({ ...formData, code: e.target.value })}
                rows={8}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#3D4BFF] focus:ring-2 focus:ring-[#3D4BFF]/10 outline-none text-sm bg-gray-50/50 font-mono"
              />
            </div>

            <div className={`rounded-xl p-4 ${formData.type === 'dark' ? 'bg-[#1a1a2e]' : 'bg-[#f5f5f7]'}`}>
              <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Preview</span>
              <pre className={`text-xs mt-2 font-mono whitespace-pre-wrap ${formData.type === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                {formData.code || '// Your code here'}
              </pre>
            </div>
          </div>

          <div className="flex items-center justify-between p-5 border-t border-gray-100 bg-gray-50/30">
            {!isNew && (
              <button
                onClick={() => { onDelete(snippet.id); onClose(); }}
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
                className="flex items-center gap-2 px-5 py-2.5 bg-[#3D4BFF] text-white hover:bg-[#2a38e0] rounded-xl transition-colors text-xs font-semibold shadow-lg shadow-[#3D4BFF]/20"
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
const BlueUnderline = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 100 8" preserveAspectRatio="none">
    <path d="M2 5 Q 25 2, 50 4 Q 75 6, 98 3" stroke="#3D4BFF" strokeWidth="3" strokeLinecap="round" fill="none" />
  </svg>
);

const YellowHighlight = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 100 12" preserveAspectRatio="none">
    <rect x="2" y="4" width="96" height="8" rx="2" fill="#FFD600" opacity="0.6" />
  </svg>
);

const BlueCircle = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 80 40" preserveAspectRatio="none">
    <ellipse cx="40" cy="20" rx="38" ry="16" stroke="#3D4BFF" strokeWidth="2.5" strokeLinecap="round" fill="none" />
  </svg>
);

const CurvedArrow = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 60 40" fill="none">
    <path d="M5 35 Q 20 5, 45 15 Q 55 20, 50 30" stroke="#3D4BFF" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M42 22 L 52 30 L 45 38" stroke="#3D4BFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CodeBrackets = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 60 30" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="M20 5 L10 15 L20 25" />
    <path d="M40 5 L50 15 L40 25" />
    <path d="M28 2 L32 28" strokeWidth="1.5" />
  </svg>
);

const StarDoodle = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 30 30" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M15 3 L17 12 L26 12 L19 17 L21 26 L15 21 L9 26 L11 17 L4 12 L13 12 Z" />
  </svg>
);

const DotsPattern = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 40 100" fill="none">
    {[...Array(6)].map((_, i) => (
      <g key={i}>
        <circle cx="8" cy={10 + i * 16} r="2" fill="#1a1a1a" opacity="0.3" />
        <circle cx="20" cy={10 + i * 16} r="2.5" fill="#1a1a1a" opacity="0.5" />
        <circle cx="32" cy={10 + i * 16} r="2" fill="#1a1a1a" opacity="0.4" />
      </g>
    ))}
  </svg>
);

const TornPaperBlue = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 300 400" fill="none">
    <path
      d="M30,60 Q50,40 80,55 Q110,30 150,50 Q190,25 230,55 Q260,40 280,70 Q290,110 270,150 Q285,190 260,230 Q275,270 250,310 Q265,350 240,380 Q200,395 160,380 Q120,395 80,375 Q40,385 30,350 Q15,310 35,270 Q20,230 40,190 Q25,150 45,110 Q30,80 30,60Z"
      fill="#3D4BFF"
    />
  </svg>
);

const TornPaperYellow = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 200 250" fill="none">
    <path
      d="M20,30 Q40,15 70,30 Q100,10 130,35 Q160,20 180,50 Q190,90 170,130 Q185,170 160,210 Q175,240 150,250 Q110,255 70,240 Q30,250 20,220 Q10,180 30,140 Q15,100 35,60 Q20,40 20,30Z"
      fill="#FFD600"
    />
  </svg>
);

const TornPaperBlack = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 300 150" fill="none">
    <path
      d="M10,20 Q40,5 80,20 Q120,0 160,25 Q200,5 240,30 Q280,10 295,40 Q300,80 280,110 Q290,140 260,145 Q220,150 180,140 Q140,150 100,138 Q60,148 20,135 Q0,110 15,75 Q5,40 10,20Z"
      fill="#1a1a1a"
    />
  </svg>
);

const GridTexture = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 150 200" fill="none">
    <defs>
      <pattern id="grid" width="15" height="15" patternUnits="userSpaceOnUse">
        <path d="M 15 0 L 0 0 0 15" fill="none" stroke="#3D4BFF" strokeWidth="0.5" opacity="0.15" />
      </pattern>
    </defs>
    <rect width="150" height="200" fill="url(#grid)" />
  </svg>
);

// Code Card Component
const CodeCard = ({ snippet, index, onEdit }) => {
  const isDark = snippet.type === 'dark';

  const highlightCode = (code) => {
    return code
      .replace(/const|function|return|var|let/g, '<span class="text-[#ff79c6]">$&</span>')
      .replace(/".*?"/g, '<span class="text-[#f1fa8c]">$&</span>')
      .replace(/\b(true|false|null|undefined)\b/g, '<span class="text-[#bd93f9]">$&</span>')
      .replace(/\b(\d+)\b/g, '<span class="text-[#bd93f9]">$&</span>')
      .replace(/\/\/.*$/gm, '<span class="text-gray-500">$&</span>');
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="group relative"
    >
      {/* Edit Button */}
      <button
        onClick={() => onEdit(snippet)}
        className="absolute -top-2 -right-2 z-20 bg-white p-1.5 rounded-lg shadow-md hover:bg-[#3D4BFF] hover:text-white transition-all opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
      >
        <Pencil className="w-3 h-3" />
      </button>

      <div className={`rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-lg ${isDark ? 'bg-[#1a1a2e]' : 'bg-white border border-gray-100'}`}>
        {/* Window dots */}
        <div className="flex gap-1.5 mb-2 sm:mb-3">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-400" />
        </div>
        <pre
          className={`text-[10px] sm:text-xs font-mono whitespace-pre-wrap leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
          dangerouslySetInnerHTML={{ __html: highlightCode(snippet.code) }}
        />
      </div>
    </motion.div>
  );
};

// Tech Badge Component
const TechBadge = ({ tech, index, onEdit }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative"
    >
      {/* Edit Button */}
      <button
        onClick={() => onEdit(tech)}
        className="absolute -top-2 -right-2 z-20 bg-white p-1 rounded-md shadow-md hover:bg-[#3D4BFF] hover:text-white transition-all opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
      >
        <Pencil className="w-2.5 h-2.5" />
      </button>

      <div className="flex items-center gap-2 sm:gap-3 bg-white rounded-xl sm:rounded-2xl px-3 py-2 sm:px-4 sm:py-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <span className="text-base sm:text-lg">{tech.icon}</span>
        <span className="text-xs sm:text-sm font-medium text-gray-800">{tech.name}</span>
      </div>
    </motion.div>
  );
};

// Main AboutMeV4 Section Component
const About03 = () => {
  const [techStack, setTechStack] = useState(initialTechStack);
  const [codeSnippets, setCodeSnippets] = useState(initialCodeSnippets);
  const [techModalOpen, setTechModalOpen] = useState(false);
  const [codeModalOpen, setCodeModalOpen] = useState(false);
  const [editingTech, setEditingTech] = useState(null);
  const [editingCode, setEditingCode] = useState(null);
  const [isNewTech, setIsNewTech] = useState(false);
  const [isNewCode, setIsNewCode] = useState(false);

  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const centerRef = useRef(null);
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

      gsap.from(centerRef.current, {
        scale: 0.9,
        opacity: 0,
        duration: 1.2,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: { trigger: centerRef.current, start: "top 85%" }
      });

      gsap.from(rightRef.current, {
        x: 50,
        opacity: 0,
        duration: 1.2,
        delay: 0.4,
        ease: "power3.out",
        scrollTrigger: { trigger: rightRef.current, start: "top 85%" }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Tech handlers
  const handleEditTech = (tech) => {
    setEditingTech(tech);
    setIsNewTech(false);
    setTechModalOpen(true);
  };

  const handleAddTech = () => {
    setEditingTech(null);
    setIsNewTech(true);
    setTechModalOpen(true);
  };

  const handleSaveTech = (formData) => {
    if (isNewTech) {
      const newId = Math.max(...techStack.map(t => t.id), 0) + 1;
      setTechStack([...techStack, { ...formData, id: newId }]);
    } else {
      setTechStack(techStack.map(t => t.id === formData.id ? formData : t));
    }
  };

  const handleDeleteTech = (id) => {
    setTechStack(techStack.filter(t => t.id !== id));
  };

  // Code handlers
  const handleEditCode = (snippet) => {
    setEditingCode(snippet);
    setIsNewCode(false);
    setCodeModalOpen(true);
  };

  const handleAddCode = () => {
    setEditingCode(null);
    setIsNewCode(true);
    setCodeModalOpen(true);
  };

  const handleSaveCode = (formData) => {
    if (isNewCode) {
      const newId = Math.max(...codeSnippets.map(c => c.id), 0) + 1;
      setCodeSnippets([...codeSnippets, { ...formData, id: newId }]);
    } else {
      setCodeSnippets(codeSnippets.map(c => c.id === formData.id ? formData : c));
    }
  };

  const handleDeleteCode = (id) => {
    setCodeSnippets(codeSnippets.filter(c => c.id !== id));
  };

  return (
    <section ref={sectionRef} className="w-full min-h-screen  relative overflow-hidden">
      {/* Grain texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">

          {/* LEFT SIDE - Typography */}
          <div ref={leftRef} className="lg:col-span-4 flex flex-col">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-4 sm:mb-6"
            >
              <div className="relative inline-block">
                <span className="inline-block px-3 py-1.5 bg-[#1a1a1a] text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-md">
                  About Me
                </span>
                <BlueUnderline className="absolute -bottom-1 left-0 w-full h-2" />
              </div>
            </motion.div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#1a1a1a] leading-[0.9] mb-4 sm:mb-5 uppercase tracking-tight">
              Hi, I'm<br />
              <span className="text-[#3D4BFF]">Rahul</span>
            </h1>

            {/* Description */}
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-3 font-mono">
              I build fast, scalable and{' '}
              <span className="relative inline-block">
                <span className="relative z-10">beautiful</span>
                <YellowHighlight className="absolute bottom-0 left-0 w-full h-3" />
              </span>{' '}
              web experiences with clean code and{' '}
              <span className="relative inline-block">
                <span className="relative z-10">creative</span>
                <BlueCircle className="absolute -bottom-1 left-0 w-full h-5" />
              </span>{' '}
              thinking.
            </p>

            <p className="text-[11px] sm:text-xs text-gray-500 leading-relaxed mb-5 sm:mb-6 max-w-xs">
              I'm a full-stack developer with 4+ years of experience building modern web applications. I love turning ideas into real products.
            </p>

            {/* CTA */}
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-[#1a1a1a] text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg font-bold text-[10px] sm:text-xs uppercase tracking-wider hover:bg-gray-800 transition-colors shadow-lg"
              >
                View My Work
              </motion.button>
              <CurvedArrow className="w-8 h-6 sm:w-10 sm:h-8 text-[#3D4BFF]" />
            </div>

            {/* Add buttons */}
            <div className="flex gap-2 mb-5">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleAddTech}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#3D4BFF] text-white rounded-full font-semibold text-[10px] hover:bg-[#2a38e0] transition-colors shadow-md"
              >
                <Plus className="w-3 h-3" />
                Add Tech
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleAddCode}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1a1a1a] text-white rounded-full font-semibold text-[10px] hover:bg-gray-800 transition-colors shadow-md"
              >
                <Plus className="w-3 h-3" />
                Add Code
              </motion.button>
            </div>

            {/* Bottom Left Badge */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#3D4BFF] flex items-center justify-center">
                <Code2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div>
                <p className="text-[10px] sm:text-xs font-bold text-[#1a1a1a] uppercase tracking-wider">Always Learning.</p>
                <p className="text-[10px] sm:text-xs font-bold text-[#1a1a1a] uppercase tracking-wider">Always Building.</p>
              </div>
            </div>
          </div>

          {/* CENTER - Portrait Collage */}
          <div ref={centerRef} className="lg:col-span-5 relative flex items-center justify-center min-h-[350px] sm:min-h-[450px] lg:min-h-[500px]">
             <HeroFeature width='500px' height='500px'/>
          </div>

          {/* RIGHT SIDE - Code Cards & Tech Stack */}
          <div ref={rightRef} className="lg:col-span-3 flex flex-col gap-4 sm:gap-6">
            {/* Code Snippets */}
            <div className="space-y-3 sm:space-y-4">
              <AnimatePresence mode="popLayout">
                {codeSnippets.map((snippet, index) => (
                  <CodeCard
                    key={snippet.id}
                    snippet={snippet}
                    index={index}
                    onEdit={handleEditCode}
                  />
                ))}
              </AnimatePresence>
            </div>

            {/* Tech Stack */}
            <div className="space-y-2 sm:space-y-3">
              <AnimatePresence mode="popLayout">
                {techStack.map((tech, index) => (
                  <TechBadge
                    key={tech.id}
                    tech={tech}
                    index={index}
                    onEdit={handleEditTech}
                  />
                ))}
              </AnimatePresence>
            </div>

            {/* Dots pattern */}
            <div className="absolute top-0 -right-4 w-6 h-24 sm:w-8 sm:h-32">
              <DotsPattern />
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <TechModal
        isOpen={techModalOpen}
        onClose={() => setTechModalOpen(false)}
        onSave={handleSaveTech}
        onDelete={handleDeleteTech}
        tech={editingTech}
        isNew={isNewTech}
      />
      <CodeModal
        isOpen={codeModalOpen}
        onClose={() => setCodeModalOpen(false)}
        onSave={handleSaveCode}
        onDelete={handleDeleteCode}
        snippet={editingCode}
        isNew={isNewCode}
      />
    </section>
  );
};

export default About03;