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
  Code2,
  ArrowUpRight
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Tech stack options
const techOptions = [
  { value: 'Figma', icon: 'Figma', label: 'Figma' },
  { value: 'VS Code', icon: 'VSCode', label: 'VS Code' },
  { value: 'React', icon: 'React', label: 'React' },
  { value: 'Next.js', icon: 'NextJS', label: 'Next.js' },
  { value: 'Tailwind', icon: 'Tailwind', label: 'Tailwind' },
  { value: 'TypeScript', icon: 'TypeScript', label: 'TypeScript' },
  { value: 'Node.js', icon: 'NodeJS', label: 'Node.js' },
  { value: 'GitHub', icon: 'GitHub', label: 'GitHub' },
  { value: 'Vercel', icon: 'Vercel', label: 'Vercel' },
];

// Custom SVG Icons for tech stack
const TechIcons = {
  Figma: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51z"/>
      <path d="M8.148 24c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.588 4.539zm-.001-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.019 3.019 3.019c1.692 0 3.069-1.382 3.069-3.069v-2.969H8.147z"/>
      <path d="M8.148 8.981c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981H8.148zm0-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V1.471H8.148z"/>
      <path d="M8.148 15.02c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.981H8.148zm0-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V7.51H8.148z"/>
      <path d="M12.735 15.02h4.588c2.476 0 4.49-2.014 4.49-4.49s-2.014-4.49-4.49-4.49h-4.588v8.98zm0-7.51h3.117c1.665 0 3.019 1.355 3.019 3.019s-1.355 3.019-3.019 3.019h-3.117V7.51z"/>
    </svg>
  ),
  VSCode: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.34L8.514 12l9.49-6.927V16.927z"/>
    </svg>
  ),
  React: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zM12 4c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2zM12 8c-.552 0-1 .448-1 1s.448 1 1 1 1-.448 1-1-.448-1-1-1z"/>
      <path d="M12 2.5c4.142 0 7.5 3.358 7.5 7.5s-3.358 7.5-7.5 7.5S4.5 14.142 4.5 10 7.858 2.5 12 2.5zm0 1c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5 6.5-2.91 6.5-6.5-2.91-6.5-6.5-6.5z"/>
    </svg>
  ),
  NextJS: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.252 1.591.442 2.477.573.096.015.31.03.476.036.358.012 4.512.012 4.87 0 .166-.006.38-.021.476-.036a16.08 16.08 0 0 0 2.477-.573c4.349-1.403 7.557-5.189 8.209-9.695.096-.659.108-.854.108-1.748s-.012-1.089-.108-1.747a11.875 11.875 0 0 0-2.119-5.243C19.75 2.185 16.557.346 12.952.04a12.57 12.57 0 0 0-.364-.033C12.54.001 12.406 0 12.23 0h-.658zm.058 2.162c.266 0 .473.03.67.09a2.77 2.77 0 0 1 .715.33c.15.1.29.215.41.345.12.13.225.275.315.435.09.16.16.335.21.52.05.185.075.375.075.57 0 .195-.025.385-.075.57-.05.185-.12.36-.21.52-.09.16-.195.305-.315.435-.12.13-.26.245-.41.345a2.77 2.77 0 0 1-.715.33c-.197.06-.404.09-.67.09-.266 0-.473-.03-.67-.09a2.77 2.77 0 0 1-.715-.33c-.15-.1-.29-.215-.41-.345-.12-.13-.225-.275-.315-.435-.09-.16-.16-.335-.21-.52-.05-.185-.075-.375-.075-.57 0-.195.025-.385.075-.57.05-.185.12-.36.21-.52.09-.16.195-.305.315-.435.12-.13.26-.245.41-.345a2.77 2.77 0 0 1 .715-.33c.197-.06.404-.09.67-.09z"/>
    </svg>
  ),
  Tailwind: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/>
    </svg>
  ),
  TypeScript: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.376 4.376 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.117.369-1.51.246-.394.56-.711.942-.95.382-.238.799-.41 1.253-.517.453-.107.9-.16 1.34-.16.56 0 1.094.058 1.603.174.508.116.982.29 1.422.52z"/>
    </svg>
  ),
  NodeJS: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.998 24c-.321 0-.641-.084-.922-.247l-2.936-1.737c-.438-.245-.224-.332-.08-.383.585-.203.703-.25 1.328-.604.065-.037.151-.023.219.017l2.256 1.339a.29.29 0 0 0 .272 0l8.795-5.076a.277.277 0 0 0 .134-.238V6.921a.282.282 0 0 0-.137-.242l-8.791-5.072a.278.278 0 0 0-.271 0L3.075 6.68a.286.286 0 0 0-.139.241v10.15a.27.27 0 0 0 .139.235l2.409 1.392c1.307.654 2.108-.116 2.108-.89V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.112.255.253v10.021c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.551L2.28 18.675a1.857 1.857 0 0 1-.922-1.604V6.921c0-.659.353-1.275.922-1.603l8.795-5.082a1.92 1.92 0 0 1 1.846 0l8.794 5.082c.57.328.924.944.924 1.603v10.15a1.86 1.86 0 0 1-.924 1.604l-8.795 5.078a1.851 1.851 0 0 1-.922.247z"/>
    </svg>
  ),
  GitHub: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
    </svg>
  ),
  Vercel: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 22.525H0l12-21.05 12 21.05z"/>
    </svg>
  ),
};

// Initial data
const initialTechStack = [
  { id: 1, name: 'Figma', icon: 'Figma' },
  { id: 2, name: 'VS Code', icon: 'VSCode' },
  { id: 3, name: 'React', icon: 'React' },
  { id: 4, name: 'Next.js', icon: 'NextJS' },
  { id: 5, name: 'Tailwind', icon: 'Tailwind' },
];

// Decorative SVG Components
const StarDoodle = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M20 5 L22 15 L32 15 L24 21 L27 31 L20 25 L13 31 L16 21 L8 15 L18 15 Z" />
  </svg>
);

const CodeIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 40 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 6l-6 6 6 6" />
    <path d="M28 6l6 6-6 6" />
    <path d="M18 20l4-16" />
  </svg>
);

const MarkerCircle = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 200 60" fill="none" preserveAspectRatio="none">
    <ellipse cx="100" cy="30" rx="95" ry="25" stroke="#D7FF2F" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

const TornEdge = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 100 20" preserveAspectRatio="none">
    <path d="M0,10 Q8,2 15,10 Q22,18 30,10 Q38,2 45,10 Q52,18 60,10 Q68,2 75,10 Q82,18 90,10 Q95,5 100,10 L100,20 L0,20Z" fill="currentColor" />
  </svg>
);

const BarcodeSticker = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 120 40" fill="none">
    <rect x="0" y="0" width="120" height="40" rx="2" fill="white" stroke="#e5e5e5" strokeWidth="1" />
    <line x1="10" y1="8" x2="10" y2="28" stroke="black" strokeWidth="2" />
    <line x1="16" y1="8" x2="16" y2="28" stroke="black" strokeWidth="1" />
    <line x1="22" y1="8" x2="22" y2="28" stroke="black" strokeWidth="3" />
    <line x1="28" y1="8" x2="28" y2="28" stroke="black" strokeWidth="1" />
    <line x1="34" y1="8" x2="34" y2="28" stroke="black" strokeWidth="2" />
    <line x1="40" y1="8" x2="40" y2="28" stroke="black" strokeWidth="1" />
    <line x1="46" y1="8" x2="46" y2="28" stroke="black" strokeWidth="3" />
    <line x1="52" y1="8" x2="52" y2="28" stroke="black" strokeWidth="1" />
    <line x1="58" y1="8" x2="58" y2="28" stroke="black" strokeWidth="2" />
    <line x1="64" y1="8" x2="64" y2="28" stroke="black" strokeWidth="1" />
    <line x1="70" y1="8" x2="70" y2="28" stroke="black" strokeWidth="3" />
    <line x1="76" y1="8" x2="76" y2="28" stroke="black" strokeWidth="1" />
    <line x1="82" y1="8" x2="82" y2="28" stroke="black" strokeWidth="2" />
    <line x1="88" y1="8" x2="88" y2="28" stroke="black" strokeWidth="1" />
    <line x1="94" y1="8" x2="94" y2="28" stroke="black" strokeWidth="3" />
    <line x1="100" y1="8" x2="100" y2="28" stroke="black" strokeWidth="1" />
    <line x1="106" y1="8" x2="106" y2="28" stroke="black" strokeWidth="2" />
    <line x1="112" y1="8" x2="112" y2="28" stroke="black" strokeWidth="1" />
    <text x="60" y="36" textAnchor="middle" fontSize="5" fill="#666">DESIGNER / DEVELOPER</text>
  </svg>
);

const GeometricBadge = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 60 60" fill="none">
    <circle cx="30" cy="30" r="28" stroke="#D7FF2F" strokeWidth="2.5" />
    <path d="M30 10 L40 25 L30 20 L20 25 Z" fill="#D7FF2F" />
    <path d="M30 50 L20 35 L30 40 L40 35 Z" fill="#D7FF2F" />
    <circle cx="30" cy="30" r="6" fill="#D7FF2F" />
    <path d="M30 18 L30 42" stroke="#D7FF2F" strokeWidth="2" />
  </svg>
);

// Tech Stack Card Item
const TechItem = ({ tech, index, onEdit }) => {
  const IconComponent = TechIcons[tech.icon] || TechIcons.Figma;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group relative flex flex-col items-center"
    >
      {/* Edit Button */}
      <button
        onClick={() => onEdit(tech)}
        className="absolute -top-2 -right-2 z-20 bg-gray-700 p-1 rounded-md shadow-md hover:bg-gray-600 transition-all opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
      >
        <Pencil className="w-2.5 h-2.5 text-white" />
      </button>

      <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center mb-1 text-white/90 group-hover:text-[#D7FF2F] transition-colors">
        <IconComponent className="w-full h-full" />
      </div>
      <span className="text-[9px] sm:text-[10px] text-white/70 font-medium whitespace-nowrap">{tech.name}</span>
    </motion.div>
  );
};

// Tech Stack Modal
const TechStackModal = ({ isOpen, onClose, onSave, onDelete, tech, isNew = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    icon: 'Figma',
    ...tech
  });

  useEffect(() => {
    const selected = techOptions.find(t => t.value === formData.icon);
    if (selected && !formData.name) {
      setFormData(prev => ({ ...prev, name: selected.label }));
    }
  }, [formData.icon]);

  if (!isOpen) return null;

  const PreviewIcon = TechIcons[formData.icon] || TechIcons.Figma;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ backdropFilter: 'blur(8px)', backgroundColor: 'rgba(0,0,0,0.4)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          onClick={e => e.stopPropagation()}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-sm"
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">
              {isNew ? '➕ Add Tech' : '✏️ Edit Tech'}
            </h2>
            <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>

          <div className="p-4 space-y-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Tech</label>
              <select
                value={formData.icon}
                onChange={e => {
                  const selected = techOptions.find(t => t.value === e.target.value);
                  setFormData({ ...formData, icon: e.target.value, name: selected?.label || '' });
                }}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none text-sm bg-white"
              >
                {techOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Display Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none text-sm"
              />
            </div>

            <div className="bg-gray-900 rounded-xl p-3 flex items-center gap-3">
              <span className="text-xs text-gray-400">Preview</span>
              <div className="w-6 h-6 text-white">
                <PreviewIcon className="w-full h-full" />
              </div>
              <span className="text-sm text-white font-medium">{formData.name}</span>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border-t border-gray-100">
            {!isNew && (
              <button
                onClick={() => { onDelete(tech.id); onClose(); }}
                className="flex items-center gap-1.5 px-3 py-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors text-xs font-semibold"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Delete
              </button>
            )}
            <div className="flex gap-2 ml-auto">
              <button onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors text-xs font-semibold">
                Cancel
              </button>
              <button
                onClick={() => { onSave(formData); onClose(); }}
                className="flex items-center gap-1.5 px-4 py-2 bg-purple-600 text-white hover:bg-purple-700 rounded-xl transition-colors text-xs font-semibold"
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

// Main AboutMeSection Component
const About01 = () => {
  const [techStack, setTechStack] = useState(initialTechStack);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTech, setEditingTech] = useState(null);
  const [isNewTech, setIsNewTech] = useState(false);

  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const collageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: headingRef.current, start: "top 85%" }
      });

      gsap.from(collageRef.current, {
        x: 50,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: { trigger: collageRef.current, start: "top 85%" }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleEdit = (tech) => {
    setEditingTech(tech);
    setIsNewTech(false);
    setModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingTech(null);
    setIsNewTech(true);
    setModalOpen(true);
  };

  const handleSave = (formData) => {
    if (isNewTech) {
      const newId = Math.max(...techStack.map(t => t.id), 0) + 1;
      setTechStack([...techStack, { ...formData, id: newId }]);
    } else {
      setTechStack(techStack.map(t => t.id === formData.id ? formData : t));
    }
  };

  const handleDelete = (id) => {
    setTechStack(techStack.filter(t => t.id !== id));
  };

  return (
    <section ref={sectionRef} className="w-full min-h-screen  py-6 sm:py-10 px-3 sm:px-4 lg:px-8 relative overflow-hidden">
      {/* Grain texture overlay */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px'
        }}
      />

      <div className="max-w-5xl mx-auto relative">
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">

          {/* LEFT SIDE - Content */}
          <div ref={headingRef} className="lg:col-span-6">
            {/* Label */}
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-[#D7FF2F] px-2 py-0.5 rounded text-[9px] font-bold tracking-wider text-gray-900 uppercase">
                About Me
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-[0.95] mb-3">
              I am,<br />
              Vishal Shakya.<br />
              
              <span className="relative inline-block">
                <span className="text-gray-900">Software Engineer.</span>
                <svg className="absolute -bottom-1 left-0 w-[105%] h-4 -ml-[2.5%]" viewBox="0 0 200 20" preserveAspectRatio="none">
                  <ellipse cx="100" cy="10" rx="95" ry="8" stroke="#D7FF2F" strokeWidth="5" strokeLinecap="round" fill="none" />
                </svg>
              </span>
            </h1>

            {/* Body Text */}
            <p className="text-gray-500 text-xs sm:text-sm max-w-xs mb-5 leading-relaxed">
              I design and build digital experiences that feel alive.
              From bold UI concepts to smooth frontend interactions, I love mixing creativity with code to create products that stand out.<br/>

              Currently obsessed with:<br/>

              Creative frontend development<br/>
              Motion & interaction design<br/>
              Modern portfolio experiences<br/>
              Gen Z aesthetics<br/>
              React + Tailwind + Framer Motion<br/>
            </p>

            {/* Add Tech Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleAddNew}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 text-white rounded-full font-semibold text-[10px] hover:bg-gray-800 transition-colors shadow-md mb-4"
            >
              <Plus className="w-3 h-3" />
              Add Tech
            </motion.button>

            {/* Tech Stack Card */}
            <div className="bg-gray-900 rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl inline-block">
              <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mb-2">Tech I use</p>
              <div className="flex items-center gap-3 sm:gap-4">
                <AnimatePresence mode="popLayout">
                  {techStack.map((tech, index) => (
                    <TechItem
                      key={tech.id}
                      tech={tech}
                      index={index}
                      onEdit={handleEdit}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - Collage */}
          <div ref={collageRef} className="lg:col-span-6 relative">
            {/* Code Icon */}
            <div className="absolute -top-2 left-0 text-gray-800 w-6 h-4 sm:w-8 sm:h-5 z-10">
              <CodeIcon />
            </div>

            {/* Star doodles */}
            <div className="absolute top-8 left-4 w-4 h-4 sm:w-5 sm:h-5 text-gray-800">
              <StarDoodle />
            </div>
            <div className="absolute top-20 -left-2 w-3 h-3 sm:w-4 sm:h-4 text-gray-800">
              <StarDoodle />
            </div>

            {/* Geometric Badge */}
            <div className="absolute -top-1 right-8 sm:right-12 w-10 h-10 sm:w-14 sm:h-14 z-20">
              <GeometricBadge />
            </div>

            {/* Main Photo Frame */}
            <div className="relative ml-4 sm:ml-6 mt-4">
              {/* Torn paper frame effect */}
              <div className="relative bg-white p-2 sm:p-3 shadow-lg"
                style={{
                  clipPath: 'polygon(2% 0%, 15% 2%, 30% 0%, 45% 3%, 60% 0%, 75% 2%, 90% 0%, 98% 3%, 100% 15%, 97% 30%, 100% 45%, 98% 60%, 100% 75%, 97% 90%, 100% 98%, 85% 100%, 70% 97%, 55% 100%, 40% 98%, 25% 100%, 10% 97%, 0% 98%, 3% 85%, 0% 70%, 2% 55%, 0% 40%, 3% 25%, 0% 10%)'
                }}
              >
                {/* Grid pattern background */}
                <div className="absolute inset-2 sm:inset-3 opacity-10">
                  <svg width="100%" height="100%">
                    <defs>
                      <pattern id="grid" width="15" height="15" patternUnits="userSpaceOnUse">
                        <path d="M 15 0 L 0 0 0 15" fill="none" stroke="black" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>
                </div>

                {/* Photo placeholder */}
                <div className="relative w-[400px] aspect-[3/4]  rounded-lg overflow-hidden">
                  <img
                    src="https://res.cloudinary.com/dycjjaxsk/image/upload/v1777024785/yhtz1asguon2pshq01w3-removebg-preview_bdvkau.png"
                    alt="Portrait"
                    className=" object-cover grayscale"
                  />
                </div>
              </div>

              {/* Sticky Note */}
              <motion.div
                initial={{ rotate: 8 }}
                animate={{ rotate: [6, 10, 6] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-2 sm:right-0 top-1/3 bg-[#D7FF2F] px-2 py-2 sm:px-3 sm:py-3 shadow-lg z-30"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)' }}
              >
                <p className="text-gray-900 font-bold text-[10px] sm:text-xs leading-tight">
                  Building<br />
                  for the<br />
                  future.
                </p>
                <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-900 mt-0.5" />
              </motion.div>

              {/* Tape on sticky note */}
              <div className="absolute right-6 sm:right-8 top-[30%] w-6 h-2 sm:w-8 sm:h-3 bg-yellow-300/60 rotate-12 z-40" />

              {/* Barcode Sticker */}
              <div className="absolute -bottom-2 -left-4 sm:-left-6 w-20 sm:w-28 z-20 rotate-[-8deg]">
                <BarcodeSticker />
              </div>

              {/* Torn edge bottom */}
              <div className="absolute -bottom-1 left-0 right-0 text-white">
                <TornEdge className="w-full h-2" />
              </div>
            </div>

            {/* Bottom right star */}
            <div className="absolute -bottom-4 right-4 w-4 h-4 sm:w-5 sm:h-5 text-gray-800">
              <StarDoodle />
            </div>
          </div>
        </div>
      </div>

      {/* Tech Stack Modal */}
      <TechStackModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        onDelete={handleDelete}
        tech={editingTech}
        isNew={isNewTech}
      />
    </section>
  );
};

export default About01;