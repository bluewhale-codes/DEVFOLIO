import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Globe,
  Star,
  Code2,
  Terminal,
  Database,
  GitBranch,
  FileCode,
  Palette,
  Layers,
  Zap,
  Cpu,
  Shield,
  Box,
  Pencil,
  Plus,
  X,
  Check,
  ChevronDown,
  Trash2,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   CUSTOM PROGRESS BAR COMPONENTS (COMPACT)
   ═══════════════════════════════════════════════════════════════ */

const WavyProgress = ({ percent, color = "#D7FF00", delay = 0 }) => {
  const [width, setWidth] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setWidth(percent), delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [isInView, percent, delay]);

  return (
    <div ref={ref} className="relative w-full h-1.5 overflow-hidden rounded-full bg-white/5">
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 10">
        <motion.path
          d={`M0,5 Q5,0 10,5 T20,5 T30,5 T40,5 T50,5 T60,5 T70,5 T80,5 T90,5 T100,5`}
          fill="none"
          stroke={color}
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: width / 100 } : { pathLength: 0 }}
          transition={{ duration: 1.5, ease: "easeOut", delay }}
        />
      </svg>
      <span className="absolute -right-8 top-1/2 -translate-y-1/2 text-[10px] font-mono" style={{ color }}>{percent}%</span>
    </div>
  );
};

const SegmentedProgress = ({ percent, color = "#D7FF00", delay = 0 }) => {
  const [filled, setFilled] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const segments = 16;
  const activeCount = Math.round((percent / 100) * segments);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setFilled(activeCount), delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [isInView, activeCount, delay]);

  return (
    <div ref={ref} className="flex items-center gap-0.5 w-full pr-8">
      <div className="flex gap-[2px] flex-1">
        {Array.from({ length: segments }).map((_, i) => (
          <motion.div
            key={i}
            className="h-1.5 flex-1 rounded-sm"
            style={{ backgroundColor: i < filled ? color : "rgba(255,255,255,0.08)" }}
            initial={{ scaleY: 0 }}
            animate={isInView && i < filled ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.3, delay: delay + i * 0.03, ease: "easeOut" }}
          />
        ))}
      </div>
      <span className="text-[10px] font-mono ml-1.5" style={{ color }}>{percent}%</span>
    </div>
  );
};

const GradientProgress = ({ percent, from = "#8B5CF6", to = "#D7FF00", delay = 0 }) => {
  const [width, setWidth] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setWidth(percent), delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [isInView, percent, delay]);

  return (
    <div ref={ref} className="w-full pr-8">
      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden relative">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${from}, ${to})`, boxShadow: `0 0 12px ${from}30` }}
          initial={{ width: 0 }}
          animate={{ width: `${width}%` }}
          transition={{ duration: 1.2, ease: "easeOut", delay }}
        />
      </div>
      <div className="flex justify-end mt-0.5">
        <span className="text-[10px] font-mono" style={{ color: from }}>{percent}%</span>
      </div>
    </div>
  );
};

const StripedProgress = ({ percent, color = "#ffffff", delay = 0 }) => {
  const [width, setWidth] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setWidth(percent), delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [isInView, percent, delay]);

  return (
    <div ref={ref} className="w-full pr-8">
      <div className="w-full h-2 bg-white/5 rounded-sm overflow-hidden relative">
        <motion.div
          className="h-full relative"
          style={{ background: `repeating-linear-gradient(45deg, ${color}, ${color} 3px, transparent 3px, transparent 6px)`, opacity: 0.9 }}
          initial={{ width: 0 }}
          animate={{ width: `${width}%` }}
          transition={{ duration: 1.2, ease: "easeOut", delay }}
        />
      </div>
      <div className="flex justify-end mt-0.5">
        <span className="text-[10px] font-mono" style={{ color }}>{percent}%</span>
      </div>
    </div>
  );
};

const VerticalBarsProgress = ({ percent, color = "#D7FF00", delay = 0 }) => {
  const [filled, setFilled] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const bars = 12;
  const activeCount = Math.round((percent / 100) * bars);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setFilled(activeCount), delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [isInView, activeCount, delay]);

  return (
    <div ref={ref} className="flex items-end gap-[1px] h-6 w-full pr-8">
      {Array.from({ length: bars }).map((_, i) => {
        const height = 30 + (i % 5) * 15;
        return (
          <motion.div
            key={i}
            className="flex-1 rounded-t-sm"
            style={{ backgroundColor: i < filled ? color : "rgba(255,255,255,0.06)", height: `${height}%` }}
            initial={{ scaleY: 0 }}
            animate={isInView && i < filled ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.3, delay: delay + i * 0.04, ease: "easeOut" }}
          />
        );
      })}
      <span className="text-[10px] font-mono ml-1.5 self-center" style={{ color }}>{percent}%</span>
    </div>
  );
};

const DottedProgress = ({ percent, color = "#3B82F6", delay = 0 }) => {
  const [filled, setFilled] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const dots = 20;
  const activeCount = Math.round((percent / 100) * dots);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setFilled(activeCount), delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [isInView, activeCount, delay]);

  return (
    <div ref={ref} className="flex items-center gap-[3px] w-full flex-wrap pr-8">
      {Array.from({ length: dots }).map((_, i) => (
        <motion.div
          key={i}
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: i < filled ? color : "rgba(255,255,255,0.08)" }}
          initial={{ scale: 0 }}
          animate={isInView && i < filled ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.2, delay: delay + i * 0.02, ease: "backOut" }}
        />
      ))}
      <span className="text-[10px] font-mono ml-1" style={{ color }}>{percent}%</span>
    </div>
  );
};

const DotIndicatorProgress = ({ percent, color = "#8B5CF6", delay = 0 }) => {
  const [filled, setFilled] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const dots = 8;
  const activeCount = Math.round((percent / 100) * dots);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setFilled(activeCount), delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [isInView, activeCount, delay]);

  return (
    <div ref={ref} className="flex items-center gap-1.5 w-full pr-8">
      <div className="flex gap-1.5">
        {Array.from({ length: dots }).map((_, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full border"
            style={{
              borderColor: color,
              backgroundColor: i < filled ? color : "transparent",
              boxShadow: i < filled ? `0 0 6px ${color}50` : "none",
            }}
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.3, delay: delay + i * 0.06, ease: "backOut" }}
          />
        ))}
      </div>
      <span className="text-[10px] font-mono ml-auto" style={{ color }}>{percent}%</span>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   PROGRESS BAR TYPE SELECTOR
   ═══════════════════════════════════════════════════════════════ */

const progressBarTypes = [
  { id: "wavy", label: "Wavy", component: WavyProgress },
  { id: "segmented", label: "Segmented", component: SegmentedProgress },
  { id: "gradient", label: "Gradient", component: GradientProgress },
  { id: "striped", label: "Striped", component: StripedProgress },
  { id: "vertical", label: "Vertical", component: VerticalBarsProgress },
  { id: "dotted", label: "Dotted", component: DottedProgress },
  { id: "dotIndicator", label: "Dots", component: DotIndicatorProgress },
];

/* ═══════════════════════════════════════════════════════════════
   FLOATING PARTICLES (REDUCED)
   ═══════════════════════════════════════════════════════════════ */

const FloatingParticles = () => {
  const particles = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white/15"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{ y: [0, -80, 0], opacity: [0, 0.4, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   SKILL FORM MODAL (COMPACT)
   ═══════════════════════════════════════════════════════════════ */

const SkillFormModal = ({ isOpen, onClose, onSave, onDelete, skill, mode }) => {
  const [formData, setFormData] = useState({
    name: "",
    subtitle: "",
    percent: 80,
    progressType: "wavy",
    accentColor: "#D7FF00",
    cardTheme: "dark",
  });

  useEffect(() => {
    if (skill && mode === "edit") {
      setFormData({
        name: skill.name || "",
        subtitle: skill.subtitle || "",
        percent: skill.percent || 80,
        progressType: skill.progressType || "wavy",
        accentColor: skill.accentColor || "#D7FF00",
        cardTheme: skill.cardTheme || "dark",
      });
    } else if (mode === "add") {
      setFormData({ name: "", subtitle: "", percent: 80, progressType: "wavy", accentColor: "#D7FF00", cardTheme: "dark" });
    }
  }, [skill, mode, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData, percent: Number(formData.percent) });
    onClose();
  };

  const cardThemes = [
    { id: "dark", label: "Dark", bg: "bg-zinc-900/80", border: "border-zinc-700/50", text: "text-white" },
    { id: "purple", label: "Purple", bg: "bg-purple-950/40", border: "border-purple-500/30", text: "text-purple-200" },
    { id: "lime", label: "Lime", bg: "bg-[#D7FF00]/10", border: "border-[#D7FF00]/30", text: "text-[#D7FF00]" },
    { id: "light", label: "White", bg: "bg-zinc-100", border: "border-zinc-300", text: "text-zinc-900" },
    { id: "terminal", label: "Term", bg: "bg-black", border: "border-zinc-800", text: "text-green-400" },
    { id: "orange", label: "Orange", bg: "bg-zinc-900/80", border: "border-orange-500/30", text: "text-orange-400" },
    { id: "blue", label: "Blue", bg: "bg-zinc-900/80", border: "border-blue-500/30", text: "text-blue-400" },
  ];

  const accentColors = [
    { id: "#D7FF00", label: "Lime" },
    { id: "#8B5CF6", label: "Purple" },
    { id: "#f97316", label: "Orange" },
    { id: "#3B82F6", label: "Blue" },
    { id: "#ffffff", label: "White" },
    { id: "#4ade80", label: "Green" },
    { id: "#C084FC", label: "Violet" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl shadow-purple-500/10 pointer-events-auto overflow-hidden max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 350 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative px-5 pt-5 pb-3 border-b border-zinc-800/50">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#D7FF00] via-purple-500 to-[#D7FF00]" />
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-black text-white tracking-tight">{mode === "edit" ? "EDIT SKILL" : "ADD SKILL"}</h2>
                    <p className="text-[10px] font-mono text-zinc-500 mt-0.5">{mode === "edit" ? "Modify skill data" : "Create new entry"}</p>
                  </div>
                  <button onClick={onClose} className="w-7 h-7 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition-colors">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="px-5 py-4 space-y-3.5">
                <div>
                  <label className="block text-[9px] font-mono tracking-[0.2em] text-zinc-500 uppercase mb-1">Skill Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. JAVASCRIPT"
                    className="w-full bg-zinc-900/80 border border-zinc-700 rounded-lg px-3 py-2 text-xs font-bold text-white placeholder-zinc-600 focus:outline-none focus:border-[#D7FF00]/50 focus:ring-1 focus:ring-[#D7FF00]/20 transition-all uppercase tracking-wide"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[9px] font-mono tracking-[0.2em] text-zinc-500 uppercase mb-1">Subtitle</label>
                  <input
                    type="text"
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    placeholder="e.g. ES6+ / Async / DOM"
                    className="w-full bg-zinc-900/80 border border-zinc-700 rounded-lg px-3 py-2 text-[11px] font-mono text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-[#D7FF00]/50 transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[9px] font-mono tracking-[0.2em] text-zinc-500 uppercase mb-1">Proficiency — {formData.percent}%</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={formData.percent}
                    onChange={(e) => setFormData({ ...formData, percent: Number(e.target.value) })}
                    className="w-full h-1.5 bg-zinc-800 rounded-full appearance-none cursor-pointer"
                    style={{ background: `linear-gradient(to right, ${formData.accentColor} 0%, ${formData.accentColor} ${formData.percent}%, #27272a ${formData.percent}%, #27272a 100%)` }}
                  />
                </div>

                <div>
                  <label className="block text-[9px] font-mono tracking-[0.2em] text-zinc-500 uppercase mb-1">Progress Style</label>
                  <div className="relative">
                    <select
                      value={formData.progressType}
                      onChange={(e) => setFormData({ ...formData, progressType: e.target.value })}
                      className="w-full bg-zinc-900/80 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white appearance-none focus:outline-none focus:border-[#D7FF00]/50 cursor-pointer"
                    >
                      {progressBarTypes.map((type) => (
                        <option key={type.id} value={type.id}>{type.label}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] font-mono tracking-[0.2em] text-zinc-500 uppercase mb-1.5">Accent Color</label>
                  <div className="flex flex-wrap gap-1.5">
                    {accentColors.map((color) => (
                      <button
                        key={color.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, accentColor: color.id })}
                        className={`relative w-7 h-7 rounded-md border-2 transition-all ${formData.accentColor === color.id ? "border-white shadow-md scale-110" : "border-transparent hover:border-zinc-600"}`}
                        style={{ backgroundColor: color.id }}
                      >
                        {formData.accentColor === color.id && <Check className="absolute inset-0 m-auto w-3 h-3 text-black" strokeWidth={3} />}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] font-mono tracking-[0.2em] text-zinc-500 uppercase mb-1.5">Card Theme</label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {cardThemes.map((theme) => (
                      <button
                        key={theme.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, cardTheme: theme.id })}
                        className={`relative px-2 py-1.5 rounded-md border text-[9px] font-bold uppercase tracking-wider transition-all ${formData.cardTheme === theme.id ? "border-white shadow-md ring-1 ring-white/20" : "border-zinc-700 hover:border-zinc-500"} ${theme.bg} ${theme.text}`}
                      >
                        {theme.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-1">
                  <label className="block text-[9px] font-mono tracking-[0.2em] text-zinc-500 uppercase mb-1.5">Preview</label>
                  <div className={`rounded-lg border p-3 ${cardThemes.find((t) => t.id === formData.cardTheme)?.bg || "bg-zinc-900/80"} ${cardThemes.find((t) => t.id === formData.cardTheme)?.border || "border-zinc-700/50"}`}>
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${formData.accentColor}20`, border: `1.5px solid ${formData.accentColor}40` }}>
                        <Code2 className="w-4 h-4" style={{ color: formData.accentColor }} />
                      </div>
                      <div>
                        <p className={`text-xs font-bold ${cardThemes.find((t) => t.id === formData.cardTheme)?.text || "text-white"}`}>{formData.name || "SKILL"}</p>
                        <p className="text-[9px] font-mono text-zinc-500">{formData.subtitle || "Description"}</p>
                      </div>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-300" style={{ width: `${formData.percent}%`, backgroundColor: formData.accentColor, boxShadow: `0 0 8px ${formData.accentColor}30` }} />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  {mode === "edit" && onDelete && (
                    <button
                      type="button"
                      onClick={() => { onDelete(); onClose(); }}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-[10px] font-bold uppercase tracking-wider hover:bg-red-500/20 transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                      Del
                    </button>
                  )}
                  <div className="flex-1" />
                  <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-400 text-[10px] font-bold uppercase tracking-wider hover:text-white transition-colors">
                    Cancel
                  </button>
                  <button type="submit" className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#D7FF00] text-black text-[10px] font-black uppercase tracking-wider hover:shadow-[0_0_15px_#D7FF0040] transition-shadow">
                    <Check className="w-3 h-3" />
                    {mode === "edit" ? "Save" : "Add"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

/* ═══════════════════════════════════════════════════════════════
   SKILL CARD COMPONENT (COMPACT)
   ═══════════════════════════════════════════════════════════════ */

const SkillCard = ({ skill, index, onEdit }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  const getProgressComponent = () => {
    const props = { percent: skill.percent, delay: (index % 12) * 0.08 + 0.15 };
    switch (skill.progressType) {
      case "segmented": return <SegmentedProgress {...props} color={skill.accentColor} />;
      case "gradient": return <GradientProgress {...props} from={skill.accentColor} to="#D7FF00" />;
      case "striped": return <StripedProgress {...props} color={skill.accentColor} />;
      case "vertical": return <VerticalBarsProgress {...props} color={skill.accentColor} />;
      case "dotted": return <DottedProgress {...props} color={skill.accentColor} />;
      case "dotIndicator": return <DotIndicatorProgress {...props} color={skill.accentColor} />;
      default: return <WavyProgress {...props} color={skill.accentColor} />;
    }
  };

  const themeMap = {
    dark: { bg: "bg-zinc-900/70", border: "border-zinc-700/40", title: "text-white", sub: "text-zinc-400" },
    purple: { bg: "bg-purple-950/30", border: "border-purple-500/20", title: "text-purple-200", sub: "text-purple-300/50" },
    lime: { bg: "bg-[#D7FF00]/8", border: "border-[#D7FF00]/25", title: "text-[#D7FF00]", sub: "text-[#D7FF00]/50" },
    light: { bg: "bg-zinc-100", border: "border-zinc-300", title: "text-zinc-900", sub: "text-zinc-500" },
    terminal: { bg: "bg-black", border: "border-zinc-800", title: "text-green-400 font-mono", sub: "text-green-400/50 font-mono text-[9px]" },
    orange: { bg: "bg-zinc-900/70", border: "border-orange-500/25", title: "text-orange-400", sub: "text-orange-300/50" },
    blue: { bg: "bg-zinc-900/70", border: "border-blue-500/25", title: "text-blue-400", sub: "text-blue-300/50" },
  };

  const t = themeMap[skill.cardTheme] || themeMap.dark;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: "easeOut" }}
      className={`group relative overflow-hidden rounded-xl border backdrop-blur-sm transition-all duration-400 hover:scale-[1.02] hover:shadow-xl ${t.bg} ${t.border}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/3 to-transparent pointer-events-none" />

      <button
        onClick={() => onEdit(skill)}
        className="absolute top-2 right-2 z-30 w-6 h-6 rounded-md bg-zinc-800/70 border border-zinc-600/40 flex items-center justify-center text-zinc-400 opacity-0 group-hover:opacity-100 hover:text-[#D7FF00] hover:border-[#D7FF00]/40 transition-all duration-300 backdrop-blur-sm"
      >
        <Pencil className="w-2.5 h-2.5" />
      </button>

      <div className="relative z-10 p-3.5">
        <div className="flex items-center gap-2.5 mb-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            style={{
              backgroundColor: `${skill.accentColor}12`,
              border: `1.5px solid ${skill.accentColor}25`,
              boxShadow: `0 0 10px ${skill.accentColor}10`,
            }}
          >
            <Code2 className="w-4 h-4" style={{ color: skill.accentColor }} />
          </div>
          <div className="min-w-0">
            <h3 className={`text-sm font-bold tracking-tight truncate ${t.title}`}>{skill.name}</h3>
            <p className={`text-[9px] font-mono truncate ${t.sub}`}>{skill.subtitle}</p>
          </div>
        </div>
        <div className="mt-auto pr-8">{getProgressComponent()}</div>
      </div>

      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 50%, ${skill.accentColor}10, transparent 70%)` }}
      />
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT (COMPACT)
   ═══════════════════════════════════════════════════════════════ */

export default function Skill01() {
  const sectionRef = useRef(null);

  const [skills, setSkills] = useState([
    { id: 1, name: "JAVASCRIPT", subtitle: "ES6+ / Async / DOM", percent: 95, progressType: "wavy", accentColor: "#D7FF00", cardTheme: "dark" },
    { id: 2, name: "REACT JS", subtitle: "Hooks / Context / Redux", percent: 90, progressType: "dotIndicator", accentColor: "#8B5CF6", cardTheme: "purple" },
    { id: 3, name: "TYPESCRIPT", subtitle: "Types / Generics / Interfaces", percent: 85, progressType: "segmented", accentColor: "#D7FF00", cardTheme: "lime" },
    { id: 4, name: "NEXT.JS", subtitle: "App Router / SSR / Edge", percent: 88, progressType: "gradient", accentColor: "#8B5CF6", cardTheme: "dark" },
    { id: 5, name: "NODE.JS", subtitle: "Runtime / APIs / Streams", percent: 80, progressType: "striped", accentColor: "#18181b", cardTheme: "light" },
    { id: 6, name: "EXPRESS.JS", subtitle: "Middleware / REST / Routing", percent: 78, progressType: "vertical", accentColor: "#4ade80", cardTheme: "terminal" },
    { id: 7, name: "MONGODB", subtitle: "NoSQL / Aggregation / Atlas", percent: 75, progressType: "wavy", accentColor: "#8B5CF6", cardTheme: "light" },
    { id: 8, name: "TAILWIND CSS", subtitle: "Utility-first / Responsive", percent: 95, progressType: "wavy", accentColor: "#D7FF00", cardTheme: "dark" },
    { id: 9, name: "GIT & GITHUB", subtitle: "Version Control / CI/CD", percent: 90, progressType: "gradient", accentColor: "#8B5CF6", cardTheme: "purple" },
    { id: 10, name: "FIGMA", subtitle: "Prototyping / Design Systems", percent: 85, progressType: "segmented", accentColor: "#18181b", cardTheme: "lime" },
    { id: 11, name: "HTML", subtitle: "Semantic / Accessibility / SEO", percent: 90, progressType: "wavy", accentColor: "#f97316", cardTheme: "orange" },
    { id: 12, name: "CSS", subtitle: "Flexbox / Grid / Animations", percent: 90, progressType: "dotted", accentColor: "#3B82F6", cardTheme: "blue" },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [editingSkill, setEditingSkill] = useState(null);

  const handleAddClick = () => { setModalMode("add"); setEditingSkill(null); setModalOpen(true); };
  const handleEditClick = (skill) => { setModalMode("edit"); setEditingSkill(skill); setModalOpen(true); };
  const handleSave = (formData) => {
    if (modalMode === "edit" && editingSkill) {
      setSkills((prev) => prev.map((s) => (s.id === editingSkill.id ? { ...s, ...formData } : s)));
    } else {
      setSkills((prev) => [...prev, { id: Date.now(), ...formData }]);
    }
  };
  const handleDelete = () => { if (editingSkill) setSkills((prev) => prev.filter((s) => s.id !== editingSkill.id)); };


  
 

  return (
    <div>
  {/* Pixel Grid Pattern */}
 
  <section
      ref={sectionRef}
      className="relative w-full overflow-hidden py-8 sm:py-12 lg:py-16"
      // style={{ background: "linear-gradient(180deg, #0a0a0a 0%, #111111 50%, #0a0a0a 100%)" }}
    >
      {/* Background */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`, backgroundSize: "50px 50px" }} />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }} />
      <FloatingParticles />
      <div className="absolute top-10 left-1/4 w-72 h-72 bg-purple-500/4 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-32 right-1/4 w-60 h-60 bg-[#D7FF00]/4 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-3 sm:px-4 lg:px-6">

        {/* ═══ HERO ═══ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8  ">
          <motion.div className="lg:col-span-7 flex flex-col justify-center" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, ease: "easeOut" }}>
            <div className="relative mb-4">
              <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-[105%] h-14 bg-purple-600/15 rounded-full blur-xl -rotate-1" />
              <h1 className="relative text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[0.92]">
                <span className="block text-white italic">TECH STACK,</span>
                <span className="block text-white italic">BUILT </span>
                <span className="block text-[#D7FF00] italic">DIFFERENT.</span>
              </h1>
              <motion.div className="absolute -top-2 -right-2 md:top-0 md:right-4" animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
                <Star className="w-5 h-5 text-[#D7FF00] fill-[#D7FF00]" style={{ filter: "drop-shadow(0 0 6px #D7FF00)" }} />
              </motion.div>
            </div>
            <p className="text-[11px] sm:text-xs font-mono text-zinc-400 max-w-md mb-5 leading-relaxed">
              I build fast, scalable, and interactive digital experiences with modern technologies.
            </p>
            <motion.button className="group relative inline-flex items-center gap-2 px-4 py-2 w-fit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <div className="absolute inset-0 border border-[#D7FF00]/50 rounded-sm" />
              <div className="absolute inset-0 border border-[#D7FF00]/15 rounded-sm opacity-0 group-hover:opacity-100 group-hover:blur-sm transition-all duration-300" />
              <span className="relative text-[10px] font-mono tracking-[0.2em] text-[#D7FF00] uppercase">Explore My Work</span>
              <ArrowRight className="relative w-3 h-3 text-[#D7FF00] group-hover:translate-x-0.5 transition-transform" />
            </motion.button>
          </motion.div>

          <motion.div className="lg:col-span-5 relative min-h-[280px] sm:min-h-[320px] lg:min-h-[380px]" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}>
            <div className="absolute top-4 left-2 w-28 h-36 bg-zinc-800 rounded-lg border border-zinc-700 overflow-hidden rotate-[-5deg] shadow-xl">
              <div className="w-full h-full bg-gradient-to-b from-zinc-700 to-zinc-900 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-10 h-10 mx-auto mb-1.5 rounded-full border-2 border-zinc-500 flex items-center justify-center">
                    <Code2 className="w-5 h-5 text-zinc-400" />
                  </div>
                  <span className="text-[8px] font-mono text-zinc-500">DEV.HAND</span>
                </div>
              </div>
            </div>
            <div className="absolute top-2 right-4 w-20 h-28 bg-[#D7FF00] rounded-sm rotate-[6deg] shadow-[0_0_20px_#D7FF0030] flex items-center justify-center">
              <Layers className="w-5 h-5 text-black/30" />
            </div>
            <div className="absolute top-20 right-0 w-24 bg-purple-600 text-white px-2 py-1.5 rotate-[10deg] shadow-lg shadow-purple-500/20">
              <p className="text-[7px] font-black tracking-widest uppercase leading-tight">CODE. CREATE. REPEAT.</p>
            </div>
            <div style={{
                top:"20px",
                left:"80px"
            }} className="relative bottom-12 left-4">
               <img  width="320px"src="https://res.cloudinary.com/dycjjaxsk/image/upload/v1778674108/ChatGPT_Image_May_13_2026_05_32_35_PM_1_jufrqg.png"/>
            </div>
            <div className="absolute bottom-4 left-16 bg-white px-1.5 py-0.5 rotate-[-2deg]">
              <div className="flex gap-[1px]">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={i} className="w-[1.5px] bg-black" style={{ height: `${8 + Math.random() * 6}px` }} />
                ))}
              </div>
              <p className="text-[5px] font-mono text-black mt-0.5 tracking-wider">DEV-2024</p>
            </div>
            <motion.div className="absolute top-8 right-20 text-[#D7FF00] text-sm font-black opacity-50" animate={{ y: [0, -6, 0], rotate: [0, 90, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>+</motion.div>
            <div className="absolute bottom-0 right-2 w-20 h-20">
              <motion.div className="w-full h-full rounded-full border border-zinc-700 flex items-center justify-center relative" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
                <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
                  <defs><path id="cp" d="M50,50 m-32,0 a32,32 0 1,1 64,0 a32,32 0 1,1 -64,0" /></defs>
                  <text fill="#52525b" fontSize="6.5" fontFamily="monospace" letterSpacing="2.5"><textPath href="#cp">SOLVING PROBLEMS • BUILDING SOLUTIONS •</textPath></text>
                </svg>
              </motion.div>
              <div className="absolute inset-0 flex items-center justify-center"><Zap className="w-4 h-4 text-[#D7FF00]" /></div>
            </div>
            <div className="hidden xl:flex absolute -right-2 top-1/2 -translate-y-1/2 flex-col gap-2">
              {["CLEAN CODE", "PERFORMANCE", "SCALABILITY", "SECURITY", "INNOVATION"].map((text) => (
                <span key={text} className="text-[8px] font-mono tracking-[0.25em] text-zinc-600" style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}>{text}</span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ═══ SKILLS HEADER + ADD BUTTON ═══ */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-5">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 className="text-lg sm:text-xl md:text-2xl font-black text-white tracking-tight mb-0.5">SKILLS & TOOLS</h2>
            <p className="text-[10px] font-mono text-zinc-500">Technologies I use to build digital experiences</p>
          </motion.div>
          <motion.button
            onClick={handleAddClick}
            className="group relative inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#D7FF00] text-black rounded-lg text-[10px] font-black uppercase tracking-wider shadow-[0_0_12px_#D7FF0015] hover:shadow-[0_0_20px_#D7FF0030] transition-all duration-300 shrink-0"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Plus className="w-3.5 h-3.5" />
            Add Skill
            <motion.div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-purple-500 rounded-full" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }} />
          </motion.button>
        </div>

        {/* ═══ SKILL CARDS GRID ═══ */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2.5 sm:gap-3">
          {skills.map((skill, index) => (
            <SkillCard key={skill.id} skill={skill} index={index} onEdit={handleEditClick} />
          ))}
        </div>

        {skills.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-12 text-zinc-600">
            <Box className="w-8 h-8 mb-2 opacity-30" />
            <p className="text-xs font-mono">No skills added yet. Click "Add Skill" to get started.</p>
          </motion.div>
        )}

        {/* ═══ BOTTOM SECTION ═══ */}
        <motion.div className="relative mt-12 md:mt-16 pt-8" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D7FF00]/30 to-transparent" />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <motion.div animate={{ rotate: [0, 180, 360], scale: [1, 1.15, 1] }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}>
                <Star className="w-4 h-4 text-[#D7FF00] fill-[#D7FF00]" style={{ filter: "drop-shadow(0 0 8px #D7FF00)" }} />
              </motion.div>
              <div className="w-7 h-7 rounded-full border border-zinc-700 flex items-center justify-center">
                <Globe className="w-3.5 h-3.5 text-zinc-400" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-black text-white tracking-tight">ALWAYS LEARNING</h3>
                <h3 className="text-sm sm:text-base font-black text-[#D7FF00] tracking-tight">ALWAYS BUILDING</h3>
              </div>
            </div>
            <div className="relative">
              <div className="bg-purple-600 text-white px-3 py-2 rotate-[-2deg] shadow-lg shadow-purple-500/15 relative">
                <p className="text-[9px] font-black tracking-wider uppercase">TURNING IDEAS INTO</p>
                <p className="text-[9px] font-black tracking-wider uppercase">DIGITAL REALITY</p>
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-8 h-2 bg-zinc-400/40" />
              </div>
            </div>
          </div>
          <div className="mt-8 w-full h-px bg-gradient-to-r from-transparent via-zinc-700/40 to-transparent" />
        </motion.div>
      </div>

      <SkillFormModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSave={handleSave} onDelete={handleDelete} skill={editingSkill} mode={modalMode} />
    </section>
</div>
  );
}


