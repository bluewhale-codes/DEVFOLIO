import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Trophy, 
  Star, 
  Code2, 
  Users, 
  ArrowUpRight, 
  ChevronDown,
  Sparkles,
  Plus,
  Pencil,
  X,
  Save,
  Trash2,
  Sun,
  Moon
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Color constants
const COLORS = {
  purple: '#7B4DFF',
  lime: '#D9FF3F',
  black: '#1a1a1a',
  white: '#ffffff',
  gray: '#f5f5f5',
  darkGray: '#333333'
};

// Achievement data
const initialAchievements = [
  
  {
    id: 1,
    title: "ESCAPE DA VINCI 2026",
    description: "Won 6t place in India's biggest open innovation hackathon. in CGC MOHALI",
    tag: "Hackathon",
    date: "March 2026",
    image: "https://res.cloudinary.com/dycjjaxsk/image/upload/v1781455386/WhatsApp_Image_2026-06-14_at_10.00.11_PM_bbjceo.jpg",
    color: "bg-lime-100 text-lime-800"
  },
  {
    id: 2,
    title: "Secure 6th Position in CGC Mohali",
    description: "Recognized for our performace at Hackathon",
    tag: "Recognition",
    date: "Nov 2025",
    image: "https://res.cloudinary.com/dycjjaxsk/image/upload/v1781455386/WhatsApp_Image_2026-06-14_at_10.00.11_PM_1_d10st8.jpg",
    color: "bg-orange-100 text-orange-700"
  },
  {
    id: 3,
    title: "ZINNOVATIO 3.0",
    description: "Participate in National Level Gen-Z Hackathon ",
    tag: "Hackathon",
    date: "Nov 2025",
    image: "https://res.cloudinary.com/dycjjaxsk/image/upload/v1781511340/WhatsApp_Image_2026-06-15_at_1.34.30_PM_ijoe5u.jpg",
    color: "bg-lime-100 text-lime-800"
  },
  
  {
    id: 4,
    title: "Smart India Hackathon",
    description: "Selected in Internal Hackathon from Panjab Univerity",
    tag: "Hackathon",
    date: "Sep 2025",
    image: "https://res.cloudinary.com/dycjjaxsk/image/upload/v1781511339/1759231429201_ao7b9k.jpg",
    color: "bg-lime-100 text-lime-800"
  },
  {
    id: 5,
    title: "CHASCON-2025",
    description: "Part of the CHASCON 2025 Present our Idea",
    tag: "Certificate",
    date: "Nov 2026",
    image: "https://res.cloudinary.com/dycjjaxsk/image/upload/v1781511687/WhatsApp_Image_2026-06-15_at_1.34.31_PM_hg8bjz.jpg",
    color: "bg-purple-100 text-purple-700"
  }
];

const filters = ["All", "Awards", "Certificates", "Hackathons", "Events", "Recognitions"];

const stats = [
  
  { number: "3", label: "Hackathons", icon: Code2, color: "bg-lime-50" },
  { number: "10+", label: "Events", icon: Users, color: "bg-blue-50" }
];

const tagColors = {
  Certificate: "bg-purple-100 text-purple-700",
  Hackathon: "bg-lime-100 text-lime-800",
  Recognition: "bg-orange-100 text-orange-700",
  Event: "bg-blue-100 text-blue-700",
  Award: "bg-yellow-100 text-yellow-800"
};

const tagOptions = ['Certificate', 'Hackathon', 'Recognition', 'Event', 'Award'];

// Decorative SVG Components
const Starburst = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none">
    <path d="M50 0L53 35L65 5L58 38L80 15L62 42L95 30L65 50L95 70L62 58L80 85L58 62L65 95L53 65L50 100L47 65L35 95L42 62L20 85L38 58L5 70L35 50L5 30L38 42L20 15L42 38L35 5L47 35Z" 
          fill="currentColor"/>
  </svg>
);

const HandDrawnArrow = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 60 40" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="M5 20 Q 20 5, 40 20 Q 20 35, 5 20" />
    <path d="M35 15 L 45 20 L 35 25" />
  </svg>
);

const TornPaperEdge = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 200 20" preserveAspectRatio="none">
    <path d="M0,10 Q5,5 10,10 Q15,15 20,10 Q25,5 30,10 Q35,15 40,10 Q45,5 50,10 Q55,15 60,10 Q65,5 70,10 Q75,15 80,10 Q85,5 90,10 Q95,15 100,10 Q105,5 110,10 Q115,15 120,10 Q125,5 130,10 Q135,15 140,10 Q145,5 150,10 Q155,15 160,10 Q165,5 170,10 Q175,15 180,10 Q185,5 190,10 Q195,15 200,10 L200,20 L0,20Z" 
          fill="currentColor"/>
  </svg>
);

const GridPattern = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 100 100" width="100%" height="100%">
    <defs>
      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
      </pattern>
    </defs>
    <rect width="100" height="100" fill="url(#grid)" />
  </svg>
);

// Trophy Illustration Component - Compact
const TrophyIllustration = ({ isDark }) => (
  <div className="relative w-full h-full min-h-[200px]">
    {/* Grid Background */}
    <div className={`absolute inset-0 ${isDark ? 'text-gray-700' : 'text-gray-300'}`}>
      <GridPattern />
    </div>
    
    {/* Purple Circle */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 opacity-90" />
    
    {/* Trophy Image Placeholder */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-36 sm:w-36 sm:h-44">
      <img src='https://res.cloudinary.com/dycjjaxsk/image/upload/v1778685267/ChatGPT_Image_May_13_2026_08_37_07_PM_1_incolw.png'/>
    </div>
    
    {/* Sticky Note */}
    <motion.div 
      initial={{ rotate: -5, scale: 0.8 }}
      animate={{ rotate: -3, scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="absolute bottom-4 left-2 bg-[#D9FF3F] px-3 py-2 shadow-lg transform -rotate-6 z-10"
      style={{ clipPath: "polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)" }}
    >
      <p className="text-black font-bold text-xs">Keep Building</p>
      <div className="flex gap-0.5 mt-0.5">
        <ArrowUpRight className="w-2.5 h-2.5 text-black" />
        <ArrowUpRight className="w-2.5 h-2.5 text-black" />
      </div>
    </motion.div>
    
    {/* Torn Paper Edge */}
    <div className={`absolute bottom-0 left-0 right-0 ${isDark ? 'text-[#0a0a0a]' : 'text-white'}`}>
      <TornPaperEdge className="w-full h-4" />
    </div>
    
    {/* Decorative Elements */}
    <motion.div 
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className={`absolute top-2 right-4 w-6 h-6 ${isDark ? 'text-gray-300' : 'text-gray-800'}`}
    >
      <Starburst />
    </motion.div>
    
    <div className={`absolute bottom-12 right-3 w-5 h-3 transform rotate-12 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
      <HandDrawnArrow />
    </div>
    
    {/* Sketch marks */}
    <svg className={`absolute top-4 left-4 w-8 h-8 ${isDark ? 'text-gray-600' : 'text-gray-300'}`} viewBox="0 0 50 50">
      <path d="M10 25 Q 25 10, 40 25 Q 25 40, 10 25" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle cx="25" cy="25" r="15" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
    </svg>
  </div>
);

// Main Achievement Card with Edit Button
const AchievementCard = ({ achievement, index, onEdit, isDark }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      className={`group rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border relative ${isDark ? 'bg-[#1a1a1a] border-gray-700' : 'bg-white border-gray-100'}`}
    >
      {/* Edit Button - appears on hover (desktop), always visible (mobile) */}
      <button 
        onClick={() => onEdit(achievement)}
        className={`absolute top-3 right-3 z-20 backdrop-blur-sm p-2 rounded-lg shadow-md hover:bg-purple-50 hover:text-purple-600 transition-all opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:translate-y-1 sm:group-hover:translate-y-0 ${isDark ? 'bg-[#1a1a1a]/90 text-gray-300' : 'bg-white/90 text-gray-900'}`}
      >
        <Pencil className="w-3.5 h-3.5" />
      </button>
      
      {/* Image Container */}
      <div className="relative h-40 sm:h-44 overflow-hidden bg-gray-100">
        <img 
          src={achievement.image} 
          alt={achievement.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-purple-900/0 group-hover:bg-purple-900/10 transition-colors duration-300" />
        
        {/* Tag overlay on image */}
        <div className="absolute top-3 left-3">
          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${tagColors[achievement.tag] || tagColors.Certificate} backdrop-blur-sm bg-opacity-90`}>
            {achievement.tag}
          </span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        {/* Meta row */}
        <div className="flex items-center justify-between mb-2">
          <span className={`text-xs font-medium ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{achievement.date}</span>
        </div>
        
        {/* Title */}
        <h3 className={`text-base font-bold mb-1.5 leading-tight group-hover:text-[#7B4DFF] transition-colors line-clamp-1 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
          {achievement.title}
        </h3>
        
        {/* Description */}
        <p className={`text-xs leading-relaxed line-clamp-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          {achievement.description}
        </p>
      </div>
    </motion.div>
  );
};

// Main Component
const Achievements = () => {
  const [achievements, setAchievements] = useState(initialAchievements);
  const [activeFilter, setActiveFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("Latest First");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAchievement, setEditingAchievement] = useState(null);
  const [isNewAchievement, setIsNewAchievement] = useState(false);
  const [isDark, setIsDark] = useState(false);
  
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    // GSAP Animations
    const ctx = gsap.context(() => {
      // Heading animation
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

      // Stats animation
      if (statsRef.current) {
        gsap.from(statsRef.current.children, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleEdit = (achievement) => {
    setEditingAchievement(achievement);
    setIsNewAchievement(false);
    setModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingAchievement(null);
    setIsNewAchievement(true);
    setModalOpen(true);
  };

  const handleSave = (formData) => {
    if (isNewAchievement) {
      const newId = Math.max(...achievements.map(a => a.id), 0) + 1;
      setAchievements([...achievements, { ...formData, id: newId }]);
    } else {
      setAchievements(achievements.map(a => a.id === formData.id ? formData : a));
    }
  };

  const handleDelete = (id) => {
    setAchievements(achievements.filter(a => a.id !== id));
  };

  const filteredAchievements = activeFilter === "All" 
    ? achievements 
    : achievements.filter(a => {
        if (activeFilter === "Awards") return a.tag === "Award" || a.tag === "Recognition";
        if (activeFilter === "Certificates") return a.tag === "Certificate";
        if (activeFilter === "Hackathons") return a.tag === "Hackathon";
        if (activeFilter === "Events") return a.tag === "Event";
        if (activeFilter === "Recognitions") return a.tag === "Recognition";
        return true;
      });

  return (
    <section ref={sectionRef} className={`w-full min-h-screen py-8 sm:py-12 px-3 sm:px-4 lg:px-8 relative overflow-hidden transition-colors duration-500 ${isDark ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
      {/* Background decorative elements */}
      <div
                      className="fixed inset-0 overflow-hidden pointer-events-none select-none flex flex-col justify-center z-0"
                      
                  >
                         
                              {Array.from({ length: 8 }).map((_, i) => {
                            const direction = i % 2 === 0 ? -1 : 1;
                    
                            return (
                              <motion.div
                                key={i}
                                className="whitespace-nowrap font-black tracking-tighter leading-[0.85]"
                                initial={{
                                  opacity: 0,
                                  y: 50,
                                }}
                                animate={{
                                  opacity: 0.07,
                                  x: direction === -1
                                    ? ["0%", "-15%", "0%"]
                                    : ["0%", "15%", "0%"],
                                  y: [0, -8, 0, 8, 0],
                                }}
                                transition={{
                                  opacity: {
                                    duration: 1.2,
                                    delay: i * 0.08,
                                  },
                                  x: {
                                    duration: 4 + i * 0.4,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                  },
                                  y: {
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                  },
                                }}
                                style={{
                                  fontSize: "clamp(48px, 12vw, 180px)",
                                  color: "#ea5fb9",
                                  }}
                              >
                                MY ACHIEVEMENTS
                              </motion.div>
                            );
                          })}
                            
                  </div>
      <div className={`absolute top-10 right-10 w-20 h-20 opacity-40 ${isDark ? 'text-gray-700' : 'text-gray-200'}`}>
        <Starburst />
      </div>
      <div className={`absolute bottom-40 left-10 w-16 h-16 opacity-20 rotate-12 ${isDark ? 'text-gray-700' : 'text-gray-200'}`}>
        <svg viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5 5" />
        </svg>
      </div>

      {/* Theme Toggle Button */}
      <div className="absolute top-6 right-6 z-50">
        <button
          onClick={() => setIsDark(!isDark)}
          className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 shadow-lg ${isDark ? 'border-gray-600 bg-[#1a1a1a] text-yellow-400 hover:border-yellow-400' : 'border-gray-300 bg-white text-gray-700 hover:border-[#7B4DFF] hover:text-[#7B4DFF]'}`}
          aria-label="Toggle theme"
        >
          <AnimatePresence mode="wait">
            {isDark ? (
              <motion.div
                key="sun"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Sun className="w-5 h-5" />
              </motion.div>
            ) : (
              <motion.div
                key="moon"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Moon className="w-5 h-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      <div className="max-w-6xl mx-auto">
        
        {/* COMPACT HEADER AREA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          
          {/* Left: Heading */}
          <div ref={headingRef} className="lg:col-span-5">
            {/* Label */}
            <div className="flex items-center gap-1.5 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7B4DFF]" />
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#7B4DFF] uppercase">
                Achievements
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#7B4DFF]" />
            </div>
            
            {/* Main Heading */}
            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-black leading-[0.9] mb-4 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
              Milestones<br />
              That <span className="relative inline-block">
                <span className="text-[#7B4DFF]">Matter.</span>
                {/* Lime underline */}
                <svg className="absolute -bottom-1 left-0 w-full h-3" viewBox="0 0 200 12" preserveAspectRatio="none">
                  <path d="M5 8 Q 50 2, 100 6 Q 150 10, 195 4" 
                        stroke="#D9FF3F" 
                        strokeWidth="5" 
                        strokeLinecap="round"
                        fill="none"/>
                </svg>
              </span>
            </h1>
            
            {/* Description */}
            <p className={`text-sm max-w-sm mb-4 leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Highlights of my journey — awards, recognitions, and achievements that shaped who I am.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`px-4 py-2 rounded-full font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-md ${isDark ? 'bg-gray-100 text-gray-900 hover:bg-white' : 'bg-gray-900 text-white hover:bg-gray-800'}`}
              >
                View All
                <ArrowUpRight className="w-3.5 h-3.5" />
              </motion.button>
              
              
            </div>
          </div>
          
          {/* Center: Stats */}
          <div ref={statsRef} className="lg:col-span-4 flex items-center">
            <div className="flex items-center justify-center gap-1 w-full flex-wrap sm:flex-nowrap">
              {stats.map((stat, index) => (
                <React.Fragment key={stat.label}>
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-col items-center px-2 py-1"
                  >
                    {/* Icon Badge */}
                    <div className={`w-9 h-9 ${stat.color} rounded-full flex items-center justify-center mb-1`}>
                      <stat.icon className="w-4 h-4 text-gray-700" />
                    </div>
                    {/* Number */}
                    <span className={`text-2xl font-black leading-none ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                      {stat.number}
                    </span>
                    {/* Label */}
                    <span className="text-[10px] font-medium text-gray-500 mt-0.5">
                      {stat.label}
                    </span>
                  </motion.div>
                  
                  {/* Separator */}
                  {index < stats.length - 1 && (
                    <div className={`hidden sm:block w-px h-10 mx-1 ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
          
          {/* Right: Trophy Illustration */}
          <div className="lg:col-span-3 sm:block relative h-64 lg:h-auto min-h-[200px]">
            <TrophyIllustration isDark={isDark} />
          </div>
        </div>
        
        {/* FILTER BAR - Compact */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            {filters.map((filter) => (
              <motion.button
                key={filter}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveFilter(filter)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                  activeFilter === filter
                    ? "bg-gray-900 text-white shadow-md"
                    : isDark 
                      ? "bg-[#1a1a1a] text-gray-400 border border-gray-700 hover:border-gray-500 hover:bg-[#222]"
                      : "bg-white text-gray-500 border border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                {filter}
              </motion.button>
            ))}
          </div>
          
          {/* Sort Dropdown */}
          <div className="relative">
            <button className={`flex items-center gap-1.5 border px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${isDark ? 'bg-[#1a1a1a] border-gray-700 text-gray-400 hover:bg-[#222]' : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'}`}>
              {sortOrder}
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        
        {/* ACHIEVEMENT GRID - Responsive */}
        <motion.div 
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredAchievements.map((achievement, index) => (
              <AchievementCard 
                key={achievement.id} 
                achievement={achievement} 
                index={index}
                onEdit={handleEdit}
                isDark={isDark}
              />
            ))}
          </AnimatePresence>
        </motion.div>
        
        {/* Empty State */}
        {filteredAchievements.length === 0 && (
          <div className="text-center py-16">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${isDark ? 'bg-[#1a1a1a]' : 'bg-gray-100'}`}>
              <Sparkles className="w-8 h-8 text-gray-400" />
            </div>
            <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>No achievements found in this category.</p>
            <button 
              onClick={handleAddNew} 
              className="mt-3 text-purple-600 text-sm font-semibold hover:underline"
            >
              Add your first achievement
            </button>
          </div>
        )}
        
        {/* Bottom Decorative Element */}
        <div className="mt-10 flex justify-center">
          <div className={`flex items-center gap-2 ${isDark ? 'text-gray-700' : 'text-gray-300'}`}>
            <div className={`w-8 h-px ${isDark ? 'bg-gray-700' : 'bg-gray-300'}`} />
            <Sparkles className="w-4 h-4" />
            <div className={`w-8 h-px ${isDark ? 'bg-gray-700' : 'bg-gray-300'}`} />
          </div>
        </div>
      </div>
      
      
    </section>
  );
};

export default Achievements;