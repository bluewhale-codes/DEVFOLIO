import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Pencil,
  X,
  Save,
  Trash2,
  Plus,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Initial projects data with demo and repo links
const initialProjects = [
  {
    id: 1,
    number: '01',
    title: 'NOVA – Brand Identity',
    description: 'A complete brand identity system designed to reflect innovation, clarity, and ambition.',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&h=400&fit=crop',
    accentColor: '#FF4D1C',
    tag: 'Brand Identity',
    liveDemo: 'https://nova-brand-demo.vercel.app',
    gitRepo: 'https://github.com/username/nova-brand'
  },
  {
    id: 2,
    number: '02',
    title: 'Shoply – UX/UI Design',
    description: 'User-centered design for a seamless e-commerce experience that drives engagement and growth.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
    accentColor: '#4B4DFF',
    tag: 'UX/UI Design',
    liveDemo: 'https://shoply-demo.vercel.app',
    gitRepo: 'https://github.com/username/shoply-ui'
  },
  {
    id: 3,
    number: '03',
    title: 'Trackly – Mobile App',
    description: 'A mobile app design focused on simplicity, usability, and helping users stay in control.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop',
    accentColor: '#F4FF32',
    tag: 'Mobile App',
    liveDemo: 'https://trackly-app-demo.vercel.app',
    gitRepo: 'https://github.com/username/trackly-mobile'
  },
  {
    id: 4,
    number: '04',
    title: 'Studio X – Website Redesign',
    description: 'A modern, high-performing website redesign that elevates the brand and improves user experience.',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=400&fit=crop',
    accentColor: '#FF4D1C',
    tag: 'Web Design',
    liveDemo: 'https://studiox-redesign.vercel.app',
    gitRepo: 'https://github.com/username/studiox-web'
  },
];

// Project Modal
const ProjectModal = ({ isOpen, onClose, onSave, onDelete, project, isNew = false }) => {
  const [formData, setFormData] = useState({
    number: '',
    title: '',
    description: '',
    image: '',
    accentColor: '#FF4D1C',
    tag: 'Brand Identity',
    liveDemo: '',
    gitRepo: '',
    ...project
  });

  const colorOptions = ['#FF4D1C', '#4B4DFF', '#F4FF32', '#00D9C0', '#FF6B9D'];
  const tagOptions = ['Brand Identity', 'UX/UI Design', 'Mobile App', 'Web Design', 'Motion Design', 'Illustration'];

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
          className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        >
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">
              {isNew ? '➕ Add Project' : '✏️ Edit Project'}
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          <div className="p-5 space-y-4">
            {/* Image URL */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Image URL</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={formData.image}
                  onChange={e => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://..."
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF4D1C] focus:ring-2 focus:ring-[#FF4D1C]/10 outline-none text-sm bg-gray-50/50"
                />
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                  {formData.image && (
                    <img src={formData.image} alt="" className="w-full h-full object-cover" onError={e => e.target.style.display = 'none'} />
                  )}
                </div>
              </div>
            </div>

            {/* Number & Tag */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Number</label>
                <input
                  type="text"
                  value={formData.number}
                  onChange={e => setFormData({ ...formData, number: e.target.value })}
                  placeholder="01"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF4D1C] focus:ring-2 focus:ring-[#FF4D1C]/10 outline-none text-sm bg-gray-50/50"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Tag</label>
                <select
                  value={formData.tag}
                  onChange={e => setFormData({ ...formData, tag: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF4D1C] focus:ring-2 focus:ring-[#FF4D1C]/10 outline-none text-sm bg-gray-50/50"
                >
                  {tagOptions.map(tag => <option key={tag} value={tag}>{tag}</option>)}
                </select>
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                placeholder="Project Title"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF4D1C] focus:ring-2 focus:ring-[#FF4D1C]/10 outline-none text-sm bg-gray-50/50"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                placeholder="Short description..."
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF4D1C] focus:ring-2 focus:ring-[#FF4D1C]/10 outline-none text-sm bg-gray-50/50 resize-none"
              />
            </div>

            {/* Live Demo & Git Repo */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Live Demo</label>
                <input
                  type="text"
                  value={formData.liveDemo}
                  onChange={e => setFormData({ ...formData, liveDemo: e.target.value })}
                  placeholder="https://demo.vercel.app"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF4D1C] focus:ring-2 focus:ring-[#FF4D1C]/10 outline-none text-sm bg-gray-50/50"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Git Repo</label>
                <input
                  type="text"
                  value={formData.gitRepo}
                  onChange={e => setFormData({ ...formData, gitRepo: e.target.value })}
                  placeholder="https://github.com/..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF4D1C] focus:ring-2 focus:ring-[#FF4D1C]/10 outline-none text-sm bg-gray-50/50"
                />
              </div>
            </div>

            {/* Accent Color */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Accent Color</label>
              <div className="flex gap-2">
                {colorOptions.map(color => (
                  <button
                    key={color}
                    onClick={() => setFormData({ ...formData, accentColor: color })}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${formData.accentColor === color ? 'border-gray-900 scale-110' : 'border-transparent'}`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-5 border-t border-gray-100 bg-gray-50/30">
            {!isNew && (
              <button
                onClick={() => { onDelete(project.id); onClose(); }}
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
                className="flex items-center gap-2 px-5 py-2.5 bg-[#FF4D1C] text-white hover:bg-[#e04418] rounded-xl transition-colors text-xs font-semibold shadow-lg shadow-[#FF4D1C]/20"
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
const CurvedArrow = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 80 50" fill="none">
    <path d="M5 40 Q 30 5, 60 20 Q 75 28, 70 40" stroke="#FF4D1C" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M60 28 L 72 40 L 58 45" stroke="#FF4D1C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const StampBadge = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 120 120" fill="none">
    <circle cx="60" cy="60" r="55" stroke="#1a1a1a" strokeWidth="2" strokeDasharray="4 4" />
    <path id="circlePath" d="M 60, 60 m -45, 0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0" fill="none" />
    <text fill="#1a1a1a" fontSize="10" fontWeight="bold" letterSpacing="3">
      <textPath href="#circlePath">DESIGNING SOLUTIONS • DELIVERING IMPACT • </textPath>
    </text>
    <path d="M60 35 L65 50 L80 50 L68 60 L73 75 L60 65 L47 75 L52 60 L40 50 L55 50 Z" fill="#1a1a1a" />
  </svg>
);

const Starburst = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 60 60" fill="none">
    <path d="M30 0L33 22L45 5L37 24L60 15L40 30L60 45L37 36L45 55L33 38L30 60L27 38L15 55L23 36L0 45L20 30L0 15L23 24L15 5L27 22Z" fill="#1a1a1a" />
  </svg>
);

const BlueStroke = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 100 60" fill="none">
    <path d="M5 50 Q 30 10, 60 30 Q 80 42, 95 20" stroke="#4B4DFF" strokeWidth="12" strokeLinecap="round" fill="none" />
  </svg>
);

const YellowBurst = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 60 60" fill="none">
    {[...Array(12)].map((_, i) => {
      const angle = (i * 30 * Math.PI) / 180;
      return (
        <line
          key={i}
          x1="30"
          y1="30"
          x2={30 + 25 * Math.cos(angle)}
          y2={30 + 25 * Math.sin(angle)}
          stroke="#F4FF32"
          strokeWidth="3"
          strokeLinecap="round"
        />
      );
    })}
  </svg>
);

const PurpleBlob = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 100 80" fill="none">
    <path d="M20,40 Q10,10 40,15 Q70,5 85,30 Q95,55 70,65 Q45,75 25,60 Q5,50 20,40Z" fill="#8B5CF6" />
  </svg>
);

const LightBulb = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 40 50" fill="none">
    <path d="M20 2C12 2 6 8 6 16C6 22 10 26 12 30V38H28V30C30 26 34 22 34 16C34 8 28 2 20 2Z" stroke="#1a1a1a" strokeWidth="2" fill="white" />
    <line x1="12" y1="38" x2="28" y2="38" stroke="#1a1a1a" strokeWidth="2" />
    <line x1="14" y1="42" x2="26" y2="42" stroke="#1a1a1a" strokeWidth="2" />
    <path d="M16 46 Q20 48 24 46" stroke="#1a1a1a" strokeWidth="2" fill="none" />
  </svg>
);

const SketchCharacter = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 60 80" fill="none">
    <circle cx="30" cy="15" r="10" stroke="#1a1a1a" strokeWidth="2" />
    <path d="M20 25 L15 40 L20 55" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />
    <path d="M40 25 L45 40 L40 55" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />
    <path d="M25 30 L35 30" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />
    <path d="M20 55 L15 75" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />
    <path d="M40 55 L45 75" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />
    <path d="M25 45 L35 45" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Project Card Component
const ProjectCard = ({ project, index, onEdit }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative flex-shrink-0 w-[280px] sm:w-[300px] lg:w-[320px]"
    >
      {/* Edit Button */}
      <button
        onClick={() => onEdit(project)}
        className="absolute -top-2 -right-2 z-20 bg-white p-2 rounded-lg shadow-md hover:bg-[#FF4D1C] hover:text-white transition-all opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
      >
        <Pencil className="w-3.5 h-3.5" />
      </button>

      {/* Card */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300">
        {/* Image */}
        <div className="relative h-44 sm:h-48 overflow-hidden bg-gray-100">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Number overlay */}
          <div className="absolute top-3 left-3">
            <span className="text-[10px] font-bold" style={{ color: project.accentColor }}>{project.number}</span>
          </div>
          {/* Tag */}
          <div className="absolute bottom-3 left-3">
            <span className="px-2 py-1 bg-white/90 backdrop-blur-sm rounded-md text-[9px] font-semibold text-gray-700">
              {project.tag}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5">
          <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-2 group-hover:text-[#FF4D1C] transition-colors">
            {project.title}
          </h3>
          <p className="text-[11px] sm:text-xs text-gray-500 leading-relaxed mb-3 line-clamp-2">
            {project.description}
          </p>

          {/* Links Row */}
          <div className="flex items-center gap-2 mb-3">
            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-2.5 py-1.5 bg-gray-900 text-white rounded-lg text-[10px] font-semibold hover:bg-gray-800 transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                Live Demo
              </a>
            )}
            {project.gitRepo && (
              <a
                href={project.gitRepo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-2.5 py-1.5 border border-gray-200 text-gray-700 rounded-lg text-[10px] font-semibold hover:border-gray-400 hover:bg-gray-50 transition-colors"
              >
                <Save className="w-3 h-3" />
                Git Repo
              </a>
            )}
          </div>

          <button className="flex items-center gap-1 text-[10px] sm:text-xs font-semibold text-[#FF4D1C] hover:underline group/link">
            VIEW PROJECT
            <ArrowUpRight className="w-3 h-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Main SelectedProjects Section Component
const Test = () => {
  const [projects, setProjects] = useState(initialProjects);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [isNewProject, setIsNewProject] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(4);

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const carouselRef = useRef(null);

  // Responsive cards per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsPerView(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(4);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, projects.length - cardsPerView);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: headerRef.current, start: "top 85%" }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Reset carousel index when cardsPerView changes
  useEffect(() => {
    setCarouselIndex(0);
  }, [cardsPerView]);

  const handleEdit = (project) => {
    setEditingProject(project);
    setIsNewProject(false);
    setModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingProject(null);
    setIsNewProject(true);
    setModalOpen(true);
  };

  const handleSave = (formData) => {
    if (isNewProject) {
      const newId = Math.max(...projects.map(p => p.id), 0) + 1;
      setProjects([...projects, { ...formData, id: newId }]);
    } else {
      setProjects(projects.map(p => p.id === formData.id ? formData : p));
    }
  };

  const handleDelete = (id) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  const nextSlide = useCallback(() => {
    setCarouselIndex(prev => {
      const next = prev + 1;
      return next > maxIndex ? 0 : next;
    });
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCarouselIndex(prev => {
      const next = prev - 1;
      return next < 0 ? maxIndex : next;
    });
  }, [maxIndex]);

  const goToSlide = (index) => {
    setCarouselIndex(Math.min(index, maxIndex));
  };

  // Calculate card width + gap for smooth sliding
  const getCardWidth = () => {
    if (typeof window === 'undefined') return 344; // default
    if (window.innerWidth < 640) return 296; // 280 + 16 gap
    if (window.innerWidth < 1024) return 316; // 300 + 16 gap
    return 336; // 320 + 16 gap
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 relative">

        {/* TOP SECTION - Header + Collage */}
        <div ref={headerRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12 sm:mb-16">

          {/* LEFT - Typography */}
          <div className="flex flex-col justify-center">
            {/* Small number */}
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs sm:text-sm text-[#FF4D1C] font-mono mb-2"
            >
              (02)
            </motion.span>

            {/* Heading */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.85] mb-4 sm:mb-5">
              <span className="block text-transparent" style={{ WebkitTextStroke: '2px #FF4D1C' }}>
                SELECTED
              </span>
              <span className="block text-[#FF4D1C]">
                PROJECTS
              </span>
            </h1>

            {/* Description */}
            <p className="text-xs sm:text-sm text-gray-700 font-mono leading-relaxed max-w-xs mb-5 sm:mb-6">
              A selection of work where strategy, design, and technology come together to create real impact.
            </p>

            {/* Add Project Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleAddNew}
              className="flex items-center gap-2 px-4 py-2 bg-[#FF4D1C] text-white rounded-full font-semibold text-[10px] sm:text-xs hover:bg-[#e04418] transition-colors shadow-lg shadow-[#FF4D1C]/20 mb-5 w-fit"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Project
            </motion.button>

            {/* CTA */}
            <button className="flex items-center gap-2 text-[#FF4D1C] text-xs sm:text-sm font-semibold hover:underline group w-fit">
              VIEW ALL PROJECTS
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* RIGHT - Collage */}
          <div className="relative h-64 sm:h-80 lg:h-96">
            {/* Curved arrow */}
            <div className="absolute top-0 left-0 w-16 h-10 sm:w-20 sm:h-12">
              <CurvedArrow />
            </div>

            {/* Stamp badge */}
            <div className="absolute top-4 right-8 sm:right-16 w-16 h-16 sm:w-20 sm:h-20">
              <StampBadge />
            </div>

            {/* Starburst */}
            <div className="absolute top-1/3 left-1/4 w-6 h-6 sm:w-8 sm:h-8">
              <Starburst />
            </div>

            {/* Blue stroke */}
            <div className="absolute top-1/4 right-0 w-20 h-12 sm:w-28 sm:h-16">
              <BlueStroke />
            </div>

            {/* Yellow burst */}
            <div className="absolute bottom-1/3 left-0 w-8 h-8 sm:w-10 sm:h-10">
              <YellowBurst />
            </div>

            {/* Purple blob */}
            <div className="absolute bottom-0 left-1/4 w-16 h-12 sm:w-20 sm:h-16">
              <PurpleBlob />
            </div>

            {/* Light bulb */}
            <div className="absolute top-1/2 right-1/4 w-8 h-10 sm:w-10 sm:h-12">
              <LightBulb />
            </div>

            {/* Sketch character */}
            <div className="absolute bottom-4 right-4 w-10 h-14 sm:w-12 sm:h-16">
              <SketchCharacter />
            </div>

            {/* Camera placeholder */}
            <div className="absolute">
                  <img src='https://res.cloudinary.com/dycjjaxsk/image/upload/v1778739482/ChatGPT_Image_May_14_2026_11_22_25_AM_1_-Photoroom_pxovdr.png'/>
            </div>

            {/* Colorful circles */}
            <div className="absolute top-8 right-1/3 w-3 h-3 rounded-full bg-[#FF4D1C]" />
            <div className="absolute bottom-1/4 right-8 w-4 h-4 rounded-full bg-[#4B4DFF]" />
            <div className="absolute top-1/3 left-8 w-2.5 h-2.5 rounded-full bg-[#F4FF32]" />
          </div>
        </div>

        {/* CAROUSEL SECTION */}
        <div className="relative">
          {/* Navigation Arrows */}
          <div className="flex justify-end gap-2 mb-4">
            <button
              onClick={prevSlide}
              disabled={projects.length <= cardsPerView}
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-[#FF4D1C] hover:text-[#FF4D1C] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              disabled={projects.length <= cardsPerView}
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-[#FF4D1C] hover:text-[#FF4D1C] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Carousel Container */}
          <div className="overflow-hidden" ref={carouselRef}>
            <motion.div
              className="flex gap-4 sm:gap-6"
              animate={{ x: -carouselIndex * getCardWidth() }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <AnimatePresence mode="popLayout">
                {projects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                    onEdit={handleEdit}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-1.5 rounded-full transition-all ${
                  index === carouselIndex ? 'w-6 bg-[#FF4D1C]' : 'w-1.5 bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        onDelete={handleDelete}
        project={editingProject}
        isNew={isNewProject}
      />
    </section>
  );
};

export default Test;