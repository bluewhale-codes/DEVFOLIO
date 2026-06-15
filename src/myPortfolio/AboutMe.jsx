import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
 
  MapPin,
  Code,
  Blocks,
  Brain,
  Lightbulb,
  FolderOpen,
  Terminal,
  GitBranch,
  Rocket,
  Trophy,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const AboutMe = () => {
  const sectionRef = useRef(null);
  const circleRef = useRef(null);
  const doodleArrowRef = useRef(null);
  const doodleLinesRef = useRef(null);
  const statsRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const statsInViewRef = useInView(statsRef, { once: true, margin: "-50px" });

  const [counts, setCounts] = useState({
    projects: 0,
    years: 0,
    contributions: 0,
    tech: 0,
    achievements: 0,
  });

  useEffect(() => {
    if (statsInViewRef) {
      const targets = { projects: 10, years: 1, contributions: 2, tech: 5, achievements: 2 };
      const duration = 2000;
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);

        setCounts({
          projects: Math.floor(targets.projects * easeOut),
          years: Math.floor(targets.years * easeOut),
          contributions: Math.floor(targets.contributions * easeOut),
          tech: Math.floor(targets.tech * easeOut),
          achievements: Math.floor(targets.achievements * easeOut),
        });

        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }
  }, [statsInViewRef]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(circleRef.current, {
        y: -12,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      if (doodleArrowRef.current) {
        const path = doodleArrowRef.current.querySelector("path");
        if (path) {
          const length = path.getTotalLength();
          gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
          gsap.to(path, {
            strokeDashoffset: 0,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none none",
            },
          });
        }
      }

      if (doodleLinesRef.current) {
        const paths = doodleLinesRef.current.querySelectorAll("path");
        paths.forEach((path, i) => {
          const length = path.getTotalLength();
          gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
          gsap.to(path, {
            strokeDashoffset: 0,
            duration: 1,
            delay: i * 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none none",
            },
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const socialLinks = [
    { icon: <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-7 w-7"
        fill="currentColor"
        style={{ color: "#333" }}
        viewBox="0 0 24 24"
      >
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>, href: "https://github.com/bluewhale-codes", label: "GitHub" },
    { icon: <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-7 w-7"
        fill="currentColor"
        style={{ color: "#0077b5" }}
        viewBox="0 0 24 24"
      >
        <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
      </svg>, href: "https://www.linkedin.com/in/vishal-shakya-417170249/", label: "LinkedIn" },
    { icon: <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-7 w-7"
        fill="currentColor"
        style={{ color: "#c13584" }}
        viewBox="0 0 24 24"
      >
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>, href: "https://twitter.com", label: "Instagram" },
    { icon: <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-7 w-7"
        fill="currentColor"
        style={{ color: "#ea4335" }}
        viewBox="0 0 24 24"
      >
        <path
          d="M7 11v2.4h3.97c-.16 1.029-1.2 3.02-3.97 3.02-2.39 0-4.34-1.979-4.34-4.42 0-2.44 1.95-4.42 4.34-4.42 1.36 0 2.27.58 2.79 1.08l1.9-1.83c-1.22-1.14-2.8-1.83-4.69-1.83-3.87 0-7 3.13-7 7s3.13 7 7 7c4.04 0 6.721-2.84 6.721-6.84 0-.46-.051-.81-.111-1.16h-6.61zm0 0 17 2h-3v3h-2v-3h-3v-2h3v-3h2v3h3v2z"
          fillRule="evenodd"
          clipRule="evenodd"
        />
      </svg>, href: "https://gmail.com", label: "Email" },
  ];

  const skills = [
    {
      icon: Code,
      title: "Full Stack Development",
      description: "Building responsive, scalable and high-performance web apps.",
      color: "#6B4EFF",
      bgColor: "#F3F0FF",
    },
    {
      icon: Blocks,
      title: "Mobile Development",
      description: "use Flutter to create mobile Application",
      color: "#22C55E",
      bgColor: "#F0FDF4",
    },
    {
      icon: Brain,
      title: "AI & NLP Enthusiast",
      description: "Working with AI models, NLP and intelligent automation.",
      color: "#EAB308",
      bgColor: "#FEFCE8",
    },
    {
      icon: Lightbulb,
      title: "Problem Solver",
      description: "I love solving real-world problems with efficient and creative code.",
      color: "#3B82F6",
      bgColor: "#EFF6FF",
    },
  ];

  const techStack = [
    { name: "React", icon: "⚛️" },
    { name: "Node.js", icon: "🟢" },
    { name: "Flutter", icon: "💙" },
    { name: "MongoDB", icon: "🍃" },
    { name: "Python", icon: "🐍" },
    { name: "Flutter", icon: "⬡" },
  ];

  const stats = [
    { value: counts.projects, suffix: "+", label: "Projects Completed", icon: FolderOpen, iconColor: "#6B4EFF", iconBg: "#F3F0FF" },
    { value: counts.years, suffix: "+", label: "Years of Coding", icon: Terminal, iconColor: "#22C55E", iconBg: "#F0FDF4" },
    { value: counts.contributions, suffix: "+", label: "GitHub Contributions", icon: GitBranch, iconColor: "#3B82F6", iconBg: "#EFF6FF" },
    { value: counts.tech, suffix: "+", label: "Technologies Mastered", icon: Rocket, iconColor: "#F97316", iconBg: "#FFF7ED" },
    { value: counts.achievements, suffix: "+", label: "Achievements", icon: Trophy, iconColor: "#EAB308", iconBg: "#FEFCE8" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: "#F7F7F7" }}
    >
      {/* Faded background typography */}
      <div
        className="fixed inset-0 overflow-hidden pointer-events-none select-none flex flex-col justify-center z-0"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
        }}
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
                    opacity: 0.05,
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
                    fontSize: "clamp(150px, 14vw, 180px)",
                    color: "#182cdd",
                  }}
                >
                  ABOUT ME
                </motion.div>
              );
            })}
          </div>

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-10 sm:py-12 lg:py-14">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2.5 mb-8 sm:mb-10 lg:mb-12"
        >
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#FFD84D" }} />
          <span
            className="text-[11px] sm:text-xs font-semibold uppercase tracking-[2px]"
            style={{ color: "#111111" }}
          >
            ABOUT ME
          </span>
        </motion.div>

        {/* Main Content Grid */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-6 xl:gap-10">
          {/* LEFT SIDE - 38% */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-full lg:w-[38%] flex flex-col items-center lg:items-start relative"
          >
            {/* Portrait Area */}
            <div className="relative w-full max-w-[300px] sm:max-w-[340px] lg:max-w-none flex justify-center lg:justify-start">
              {/* Yellow Circle */}
              <div
                ref={circleRef}
                className="absolute top-1/2 left-1/2 lg:left-[45%] -translate-x-1/2 lg:-translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] lg:w-[280px] lg:h-[280px] xl:w-[300px] xl:h-[300px] rounded-full"
                style={{ backgroundColor: "#FFD500" }}
              />

              {/* Portrait Image */}
              <div className="relative top-[70px]  z-10 w-[300px] h-[340px] sm:w-[340px] sm:h-[380px] lg:w-[360px] lg:h-[300px] xl:w-[380px] xl:h-[320px]">
                <img
                  src="https://res.cloudinary.com/dycjjaxsk/image/upload/v1780567925/ChatGPT_Image_Jun_4_2026_03_36_02_PM-Photoroom_1_uxmcmj.png"
                  alt="Vishal Shakya"
                  className="w-full h-full object-cover"
                  
                />
              </div>

              {/* Radiating lines doodle (right side of portrait) */}
              <div className="absolute top-[15%] -right-2 sm:right-0 lg:-right-4 pointer-events-none">
                <svg width="40" height="60" viewBox="0 0 40 60" fill="none">
                  <line x1="5" y1="10" x2="25" y2="5" stroke="#111111" strokeWidth="2.5" strokeLinecap="round" opacity="0.18" />
                  <line x1="0" y1="30" x2="30" y2="28" stroke="#111111" strokeWidth="2.5" strokeLinecap="round" opacity="0.18" />
                  <line x1="5" y1="50" x2="25" y2="55" stroke="#111111" strokeWidth="2.5" strokeLinecap="round" opacity="0.18" />
                </svg>
              </div>

              {/* Handwritten text - left side */}
              <div className="absolute -left-4 sm:-left-6 lg:-left-8 top-[30%] w-28 sm:w-32 pointer-events-none">
                <p
                  className="text-[20px] sm:text-[20px] leading-relaxed"
                  style={{
                    fontFamily: "'Brush Script MT', 'Segoe Script', 'Comic Sans MS', cursive",
                    color: "#111111",
                    opacity: 0.3,
                    transform: "rotate(-6deg)",
                  }}
                >
                  "Coding the future, one project at a time."
                </p>
              </div>
            </div>

            {/* Curved Arrow pointing to contact card */}
            <div className="absolute top-[260px] sm:top-[300px] lg:top-[320px] xl:top-[340px] left-2 sm:left-4 lg:left-6 w-16 h-12 lg:w-20 lg:h-14 pointer-events-none hidden sm:block">
              <svg viewBox="0 0 60 50" fill="none" className="w-full h-full">
                <path
                  d="M55 5 Q30 5 15 20 Q5 32 10 45"
                  stroke="#111111"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0.2"
                />
                <polygon points="8,40 14,48 6,46" fill="#111111" opacity="0.2" />
              </svg>
            </div>

            {/* Contact Card */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              whileHover={{ y: -3, transition: { duration: 0.25 } }}
              className="mt-6 z-50 sm:mt-8 lg:mt-10 w-full max-w-[380px] lg:max-w-none"
            >
              <div
                className="rounded-2xl sm:rounded-3xl p-4 sm:p-5 lg:p-6 flex flex-col sm:flex-row gap-4 sm:gap-5"
                style={{
                  backgroundColor: "#111111",
                  boxShadow: "0 16px 50px -10px rgba(0,0,0,0.22), 0 6px 20px -6px rgba(0,0,0,0.12)",
                }}
              >
                {/* Left Column */}
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden flex-shrink-0 border border-white/10">
                    <img
                      src="https://res.cloudinary.com/dycjjaxsk/image/upload/v1780944088/ChatGPT_Image_Jun_6_2026_10_24_01_PM_tguwxw.png"
                      alt="Vishal Shakya"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <h4 className="text-white font-semibold text-sm sm:text-base">Vishal Shakya</h4>
                    <p className="text-[#FFD84D] text-[11px] sm:text-xs font-medium">Full Stack Developer</p>
                    <div className="flex items-center gap-1 mt-1">
                      <MapPin size={11} className="text-white/40" />
                      <span className="text-white/40 text-[10px] sm:text-[11px]">Chandigarh, India</span>
                    </div>
                    <a
                      href="mailto:vishalshakya.dev@gmail.com"
                      className="text-white/40 text-[10px] sm:text-[11px] hover:text-white/70 transition-colors mt-0.5"
                    >
                      vishalshakya.dev@gmail.com
                    </a>
                  </div>
                </div>

                {/* Divider */}
                <div className="hidden sm:block w-px bg-white/10" />
                <div className="block sm:hidden w-full h-px bg-white/10" />

                {/* Right Column */}
                <div className="flex flex-col gap-2.5 sm:gap-3 flex-1">
                  <p className="text-white/70 text-[11px] sm:text-xs font-medium">Connect with me</p>
                  <div className="flex gap-2">
                    {socialLinks.map((link) => (
                      <motion.a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.12, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-colors"
                        style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.15)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.08)";
                        }}
                        aria-label={link.label}
                      >
                        {link.icon}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Handwritten bottom text */}
            <div className="mt-4 sm:mt-5 lg:mt-6 ml-2 sm:ml-4 pointer-events-none">
              <p
                className="text-[25px] "
                style={{
                  fontFamily: "'Brush Script MT', 'Segoe Script', 'Comic Sans MS', cursive",
                  color: "#111111",
                  opacity: 0.35,
                }}
              >
                Let&apos;s build something amazing together!
              </p>
              {/* Paper plane doodle */}
              <div className="mt-1 ml-20 sm:ml-28">
                <svg width="70" height="5=70" viewBox="0 0 50 20" fill="none">
                  <path d="M0 15 Q15 5 30 10 T48 2" stroke="#111111" strokeWidth="1" strokeDasharray="3 3" opacity="0.25" fill="none" />
                  <polygon points="45,0 50,5 42,6" fill="#111111" opacity="0.5" />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE - 62% */}
          <div className="w-full lg:w-[62%] flex flex-col gap-5 sm:gap-6 lg:gap-7">
            {/* Intro Label */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col items-start gap-1.5"
            >
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg">👋</span>
                <span className="text-xs sm:text-sm font-semibold" style={{ color: "#111111" }}>
                  Who I am
                </span>
              </div>
              <div className="w-8 h-0.5 rounded-full" style={{ backgroundColor: "#FFD84D" }} />
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.35 }}
            >
              <h2
                className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] xl:text-[52px] font-bold leading-[1.12] tracking-tight"
                style={{ color: "#111111" }}
              >
                Building Scalable Solutions
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>
                with{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: "linear-gradient(135deg, #6B4EFF 0%, #5A86FF 100%)",
                  }}
                >
                  Code & Creativity
                </span>
                .
              </h2>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="text-xs sm:text-sm leading-[1.75] sm:leading-[1.8]"
              style={{ color: "#555555", maxWidth: "580px" }}
            >
              I&apos;m <span className="font-semibold" style={{ color: "#111111" }}>Vishal Shakya</span>, a passionate Full Stack Developer and MCA student who loves building impactful digital products. I enjoy turning ideas into real-world web and mobile applications using modern technologies.
            </motion.p>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.08 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="rounded-xl sm:rounded-2xl p-4 sm:p-5 cursor-default group"
                  style={{
                    backgroundColor: "#FFFFFF",
                    boxShadow: "0 1px 8px rgba(0,0,0,0.03), 0 1px 3px rgba(0,0,0,0.02)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 10px 32px -6px rgba(0,0,0,0.08), 0 3px 8px rgba(0,0,0,0.03)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "0 1px 8px rgba(0,0,0,0.03), 0 1px 3px rgba(0,0,0,0.02)";
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                      style={{ backgroundColor: skill.bgColor }}
                    >
                      <skill.icon size={18} style={{ color: skill.color }} />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <h3 className="font-semibold text-xs sm:text-sm" style={{ color: "#111111" }}>
                        {skill.title}
                      </h3>
                      <p className="text-[11px] sm:text-xs leading-relaxed" style={{ color: "#666666" }}>
                        {skill.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.75 }}
              className="flex flex-col gap-3"
            >
              <div className="flex items-center gap-2">
                <Code size={14} style={{ color: "#6B4EFF" }} />
                <span className="text-xs sm:text-sm font-semibold" style={{ color: "#111111" }}>
                  Technologies I work with
                </span>
              </div>
              <div className="flex flex-wrap gap-2 sm:gap-2.5">
                {techStack.map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.35, delay: 0.85 + index * 0.05 }}
                    whileHover={{ y: -2, scale: 1.04, transition: { duration: 0.15 } }}
                    className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-medium cursor-default transition-shadow flex items-center gap-1.5"
                    style={{
                      backgroundColor: "#FFFFFF",
                      color: "#333333",
                      boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = "0 6px 20px -3px rgba(0,0,0,0.08)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = "0 1px 6px rgba(0,0,0,0.04)";
                    }}
                  >
                    <span className="text-sm">{tech.icon}</span>
                    {tech.name}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Statistics Bar */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 1 }}
          className="mt-5 sm:mt-6 lg:mt-7"
        >
          <div
            className="w-full rounded-2xl sm:rounded-3xl py-5 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8"
            style={{
              backgroundColor: "#FFFFFF",
              boxShadow: "0 2px 16px rgba(0,0,0,0.03), 0 1px 4px rgba(0,0,0,0.02)",
            }}
          >
            <div className="flex flex-wrap justify-center lg:justify-between gap-5 sm:gap-4 lg:gap-0">
              {stats.map((stat, index) => (
                <React.Fragment key={stat.label}>
                  <div className="flex items-center gap-2.5 sm:gap-3 px-3 sm:px-5 lg:px-6">
                    <div
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: stat.iconBg }}
                    >
                      <stat.icon size={16} style={{ color: stat.iconColor }} />
                    </div>
                    <div className="flex flex-col">
                      <span
                        className="text-lg sm:text-xl lg:text-2xl font-bold tabular-nums leading-tight"
                        style={{ color: "#111111" }}
                      >
                        {stat.value}
                        {stat.suffix}
                      </span>
                      <span className="text-[10px] sm:text-[11px]" style={{ color: "#888888" }}>
                        {stat.label}
                      </span>
                    </div>
                  </div>
                  {index < stats.length - 1 && (
                    <div className="hidden lg:block w-px self-stretch my-1" style={{ backgroundColor: "#E8E8E8" }} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMe;