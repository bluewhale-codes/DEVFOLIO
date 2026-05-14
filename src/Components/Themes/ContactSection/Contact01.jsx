import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  MessageCircleCheck ,
  Mail,
  Sparkles,
  ArrowUpRight,
  Plus,
  Pencil,
  X,
  Save,
  Trash2,
  Send
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Social platform options for the form
const platformOptions = [
  { value: 'Email', icon: 'Mail', label: 'Email' },
  { value: 'LinkedIn', icon: 'Linkedin', label: 'LinkedIn' },
  { value: 'GitHub', icon: 'Github', label: 'GitHub' },
  { value: 'Twitter', icon: 'Twitter', label: 'Twitter' },
  { value: 'Instagram', icon: 'Instagram', label: 'Instagram' },
  { value: 'MessageCircleCheck ', icon: 'MessageCircleCheck ', label: 'Dribbble' },
  { value: 'YouTube', icon: 'Youtube', label: 'YouTube' },
  { value: 'Website', icon: 'Globe', label: 'Website' },
];

// Icon mapping
const IconMap = {
  Mail: MessageCircleCheck ,
  Linkedin: MessageCircleCheck ,
  Github: MessageCircleCheck ,
  Twitter: MessageCircleCheck ,
  Instagram: MessageCircleCheck ,
  Dribbble: MessageCircleCheck ,
  Youtube: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  ),
  Globe: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
};

// Initial social links data
const initialSocialLinks = [
  { id: 1, platform: 'Email', icon: 'Mail', label: 'Email', url: 'hello@yourname.dev' },
  { id: 2, platform: 'LinkedIn', icon: 'Linkedin', label: 'LinkedIn', url: '/in/yourname' },
  { id: 3, platform: 'GitHub', icon: 'Github', label: 'GitHub', url: '/yourname' },
  { id: 4, platform: 'Twitter', icon: 'Twitter', label: 'Twitter', url: '/yourname' },
  { id: 5, platform: 'Instagram', icon: 'Instagram', label: 'Instagram', url: '/yourname' },
  { id: 6, platform: 'Dribbble', icon: 'Dribbble', label: 'Dribbble', url: '/yourname' },
];

// Decorative SVG Components
const Starburst = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none">
    <path d="M50 0L53 35L65 5L58 38L80 15L62 42L95 30L65 50L95 70L62 58L80 85L58 62L65 95L53 65L50 100L47 65L35 95L42 62L20 85L38 58L5 70L35 50L5 30L38 42L20 15L42 38L35 5L47 35Z" fill="currentColor" />
  </svg>
);

const PaperAirplane = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 80 60" fill="none">
    <path d="M5 30 L75 5 L50 30 L75 55 L5 30 Z" fill="none" stroke="#7B4DFF" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M5 30 L50 30" stroke="#7B4DFF" strokeWidth="1.5" />
    <path d="M75 5 L50 30 L75 55" fill="none" stroke="#7B4DFF" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

const DashedPath = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 200 80" fill="none">
    <path d="M10 70 Q 60 10, 120 40 Q 160 60, 190 20" stroke="#7B4DFF" strokeWidth="1.5" strokeDasharray="6 4" fill="none" strokeLinecap="round" />
  </svg>
);

const HandDrawnUnderline = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 200 12" preserveAspectRatio="none">
    <path d="M5 8 Q 50 2, 100 6 Q 150 10, 195 4" stroke="#7B4DFF" strokeWidth="3" strokeLinecap="round" fill="none" />
  </svg>
);

const TornPaperCircle = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 300 300" fill="none">
    <defs>
      <filter id="roughPaper">
        <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" />
      </filter>
    </defs>
    <circle cx="150" cy="150" r="130" fill="#7B4DFF" filter="url(#roughPaper)" />
  </svg>
);

const TapeStrip = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 80 30" fill="none">
    <rect x="0" y="0" width="80" height="30" rx="2" fill="rgba(255,255,255,0.6)" />
    <line x1="10" y1="15" x2="70" y2="15" stroke="rgba(200,200,200,0.5)" strokeWidth="1" strokeDasharray="3 2" />
  </svg>
);

// Social Link Card Component
const SocialLinkCard = ({ link, index, onEdit }) => {
  const IconComponent = IconMap[link.icon] || Mail;

  return (
    <motion.div
      // layout
      // initial={{ opacity: 0, y: 20 }}
      // whileInView={{ opacity: 1, y: 0 }}
      // viewport={{ once: true, margin: "-30px" }}
      // transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group relative flex flex-col items-center text-center px-2 sm:px-4 py-3 sm:py-4"
    >
      {/* Edit Button */}
      <button
        onClick={() => onEdit(link)}
        className="absolute -top-1 -right-1 z-20 bg-white/90 backdrop-blur-sm p-1.5 rounded-lg shadow-md hover:bg-purple-50 hover:text-purple-600 transition-all opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
      >
        <Pencil className="w-3 h-3" />
      </button>

      {/* Icon */}
      <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center mb-2 text-gray-700 group-hover:text-[#7B4DFF] transition-colors">
        <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
      </div>

      {/* Label */}
      <span className="text-xs sm:text-sm font-semibold text-gray-900 mb-0.5">
        {link.label}
      </span>

      {/* URL */}
      <span className="text-[10px] sm:text-xs text-gray-400 truncate max-w-full">
        {link.url}
      </span>
    </motion.div>
  );
};

// Social Link Modal - Edit/Add Form
const SocialLinkModal = ({ isOpen, onClose, onSave, onDelete, link, isNew = false }) => {
  const [formData, setFormData] = useState({
    platform: 'Email',
    icon: 'Mail',
    label: '',
    url: '',
    ...link
  });

  // Update icon when platform changes
  useEffect(() => {
    const selected = platformOptions.find(p => p.value === formData.platform);
    if (selected) {
      setFormData(prev => ({ ...prev, icon: selected.icon }));
    }
  }, [formData.platform]);

  if (!isOpen) return null;

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
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">
              {isNew ? '➕ Add Social Link' : '✏️ Edit Social Link'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Form */}
          <div className="p-5 space-y-4">
            {/* Platform */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Platform</label>
              <select
                value={formData.platform}
                onChange={e => setFormData({ ...formData, platform: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none text-sm bg-white"
              >
                {platformOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            {/* Label */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Display Label</label>
              <input
                type="text"
                value={formData.label}
                onChange={e => setFormData({ ...formData, label: e.target.value })}
                placeholder="e.g., Email, LinkedIn"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none text-sm"
              />
            </div>

            {/* URL */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">URL / Username</label>
              <input
                type="text"
                value={formData.url}
                onChange={e => setFormData({ ...formData, url: e.target.value })}
                placeholder="e.g., hello@yourname.dev"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none text-sm"
              />
            </div>

            {/* Preview */}
            <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3">
              <span className="text-xs font-semibold text-gray-400 uppercase">Preview</span>
              <div className="flex items-center gap-2">
                {(() => {
                  const PreviewIcon = IconMap[formData.icon] || Mail;
                  return <PreviewIcon className="w-5 h-5 text-gray-700" />;
                })()}
                <div>
                  <p className="text-sm font-semibold text-gray-900">{formData.label || formData.platform}</p>
                  <p className="text-xs text-gray-400">{formData.url || 'your-url'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between p-5 border-t border-gray-100">
            {!isNew && (
              <button
                onClick={() => { onDelete(link.id); onClose(); }}
                className="flex items-center gap-2 px-4 py-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-colors text-sm font-semibold"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            )}
            <div className="flex gap-2 ml-auto">
              <button
                onClick={onClose}
                className="px-5 py-2.5 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors text-sm font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => { onSave(formData); onClose(); }}
                className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 text-white hover:bg-purple-700 rounded-xl transition-colors text-sm font-semibold shadow-lg shadow-purple-200"
              >
                <Save className="w-4 h-4" />
                {isNew ? 'Add' : 'Save'}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Main Contact Section Component
const Contact01 = () => {
  const [socialLinks, setSocialLinks] = useState(initialSocialLinks);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingLink, setEditingLink] = useState(null);
  const [isNewLink, setIsNewLink] = useState(false);

  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const socialsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
        }
      });

      if (socialsRef.current) {
        gsap.from(socialsRef.current.children, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: socialsRef.current,
            start: "top 85%",
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleEdit = (link) => {
    setEditingLink(link);
    setIsNewLink(false);
    setModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingLink(null);
    setIsNewLink(true);
    setModalOpen(true);
  };

  const handleSave = (formData) => {
    if (isNewLink) {
      const newId = Math.max(...socialLinks.map(l => l.id), 0) + 1;
      setSocialLinks([...socialLinks, { ...formData, id: newId }]);
    } else {
      setSocialLinks(socialLinks.map(l => l.id === formData.id ? formData : l));
    }
  };

  const handleDelete = (id) => {
    setSocialLinks(socialLinks.filter(l => l.id !== id));
  };

  return (
    <section ref={sectionRef} className="w-full min-h-screen py-8 sm:py-12 px-3 sm:px-4 lg:px-8 relative overflow-hidden">
      {/* Subtle grain texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px'
        }}
      />

      {/* Decorative starburst top right */}
      <div className="absolute top-16 right-1/4 w-6 h-6 text-gray-800">
        <Starburst />
      </div>

      <div className="max-w-6xl mx-auto relative">

        {/* TOP HEADER AREA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-10 sm:mb-14">

          {/* Left: Heading & Text */}
          <div ref={headingRef} className="lg:col-span-7">
            {/* Label */}
            <div className="flex items-center gap-1.5 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7B4DFF]" />
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#7B4DFF] uppercase">
                Get In Touch
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-[0.95] mb-4">
              I'M ALWAYS OPEN TO<br />
              <span className="relative inline-block">
                <span className="text-[#7B4DFF]">NEW OPPORTUNITIES.</span>
                <svg className="absolute -bottom-1 left-0 w-full h-3" viewBox="0 0 200 12" preserveAspectRatio="none">
                  <path d="M5 8 Q 50 2, 100 6 Q 150 10, 195 4"
                    stroke="#7B4DFF"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none" />
                </svg>
              </span>
            </h1>

            {/* Body Text */}
            <p className="text-gray-500 text-sm sm:text-base max-w-md mb-6 leading-relaxed">
              Whether you have a question or just want to connect, feel free to reach out!
            </p>

            {/* Add New Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleAddNew}
              className="flex items-center gap-1.5 px-4 py-2 bg-purple-600 text-white rounded-full font-semibold text-xs hover:bg-purple-700 transition-colors shadow-md shadow-purple-200 mb-4"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Social Link
            </motion.button>
          </div>

          {/* Right: Hero Graphic */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[200px] sm:min-h-[280px]">
            {/* Dashed path */}
            <div className="absolute top-3 left-20 w-24 h-10 sm:w-36 sm:h-14">
              <DashedPath />
            </div>
            {/* Paper airplane */}
            <div className="absolute top-10 left-10 w-12 h-8 sm:w-16 sm:h-10 text-purple-500 transform -rotate-12">
              <PaperAirplane />
            </div>


            {/* Torn purple circle */}
            <div className=" sm:w-52 sm:h-52 md:w-60 md:h-60">
               <img src='https://res.cloudinary.com/dycjjaxsk/image/upload/v1778690193/ChatGPT_Image_May_13__2026__10_05_29_PM-removebg-preview_i1vofj.png'/>
            </div>

            {/* Shadow under phone */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-32 h-3 bg-gray-300/40 rounded-full blur-md" />
          </div>
        </div>

        {/* SOCIAL LINKS ROW */}
        <div className="relative mb-8 sm:mb-10">
          <div
            ref={socialsRef}
            className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-0 bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm py-2 sm:py-4 px-2 sm:px-4"
          >
            {socialLinks.map((link, index) => (
              <React.Fragment key={link.id}>
                <SocialLinkCard
                  link={link}
                  index={index}
                  onEdit={handleEdit}
                />
                {/* Vertical separator - hidden on mobile, shown between items on desktop */}
                {index < socialLinks.length - 1 && (
                  <div className="hidden sm:block absolute h-12 w-px bg-gray-100"
                    style={{ left: `${((index + 1) / socialLinks.length) * 100}%`, top: '50%', transform: 'translateY(-50%)' }}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* BOTTOM ACTION AREA */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="bg-gray-900 text-white px-6 py-3 sm:px-8 sm:py-3.5 rounded-full font-semibold text-sm flex items-center gap-2 hover:bg-gray-800 transition-colors shadow-lg"
          >
            Let's Talk
            <ArrowUpRight className="w-4 h-4" />
          </motion.button>

          {/* Status Text */}
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-sm">
              Available for{' '}
              <span className="relative inline-block text-[#7B4DFF] font-semibold">
                freelance
                <svg className="absolute -bottom-0.5 left-0 w-full h-1.5" viewBox="0 0 60 6" preserveAspectRatio="none">
                  <path d="M2 4 Q 15 1, 30 3 Q 45 5, 58 2" stroke="#7B4DFF" strokeWidth="2" strokeLinecap="round" fill="none" />
                </svg>
              </span>
              {' '}projects
            </span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#7B4DFF]" />
          </div>
        </div>

        {/* Bottom Decorative Element */}
        <div className="mt-12 sm:mt-16 flex justify-center">
          <div className="flex items-center gap-2 text-gray-300">
            <div className="w-8 h-px bg-gray-300" />
            <Sparkles className="w-4 h-4" />
            <div className="w-8 h-px bg-gray-300" />
          </div>
        </div>
      </div>

      {/* Edit/Add Modal */}
      <SocialLinkModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        onDelete={handleDelete}
        link={editingLink}
        isNew={isNewLink}
      />
    </section>
  );
};

export default Contact01;