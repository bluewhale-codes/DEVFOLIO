
import React, { useMemo, memo } from "react";
import { motion } from "framer-motion";
 
/**
 * CODE_LINES – Static code snippet for display
 * Used to create the repeating code texture effect
 */
const CODE_LINES = [
  { text: "interface Portfolio {", delay: 0 },
{ text: " name: string;", delay: 0.1 },
{ text: " projects: Project[];", delay: 0.2 },
{ text: " experience: number;", delay: 0.3 },
{ text: "}", delay: 0.4 },

{ text: "const create = async (vision) => {", delay: 0.5 },
{ text: " return await craft(vision);", delay: 0.6 },
{ text: "};", delay: 0.7 },

{ text: "const developer = {", delay: 0.8 },
{ text: " name: 'Vishal',", delay: 0.9 },
{ text: " role: 'Full Stack Developer',", delay: 1.0 },
{ text: " location: 'India',", delay: 1.1 },
{ text: "};", delay: 1.2 },

{ text: "function buildFuture() {", delay: 1.3 },
{ text: " return innovation;", delay: 1.4 },
{ text: "}", delay: 1.5 },

{ text: "const stack = [", delay: 1.6 },
{ text: " 'React',", delay: 1.7 },
{ text: " 'Node.js',", delay: 1.8 },
{ text: " 'Express',", delay: 1.9 },
{ text: " 'MongoDB'", delay: 2.0 },
{ text: "];", delay: 2.1 },

{ text: "export default Portfolio;", delay: 2.2 },

{ text: "git commit -m 'ship features'", delay: 2.3 },
{ text: "npm run build", delay: 2.4 },
{ text: "npm run deploy", delay: 2.5 },

{ text: "const response = await fetch('/api');", delay: 2.6 },
{ text: "const data = await response.json();", delay: 2.7 },

{ text: "useEffect(() => {", delay: 2.8 },
{ text: " initializePortfolio();", delay: 2.9 },
{ text: "}, []);", delay: 3.0 },

{ text: "", delay: 3.1 },
{ text: "", delay: 3.2 },
{ text: "", delay: 3.3 },

{ text: "router.get('/projects', handler);", delay: 3.4 },
{ text: "app.use(express.json());", delay: 3.5 },

{ text: "db.collection('users').find();", delay: 3.6 },
{ text: "await connectMongoDB();", delay: 3.7 },

{ text: "const UI = beautiful + functional;", delay: 3.8 },
{ text: "while(true) learn();", delay: 3.9 },

{ text: "console.log('Building dreams');", delay: 4.0 },

{ text: "const mission = 'Create Impact';", delay: 4.1 },
{ text: "const focus = 'User Experience';", delay: 4.2 },

{ text: "type Skill = React | Node | Flutter;", delay: 4.3 },

{ text: "await deployToProduction();", delay: 4.4 },
{ text: "status === 'online' ? true : false", delay: 4.5 },

{ text: "const design = pixelPerfect();", delay: 4.6 },
{ text: "return ;", delay: 4.7 }
];
 
/**
 * BlinkingCursor – Elegant smooth-blinking cursor with subtle fade
 * Feels refined and premium, not aggressive
 */
const BlinkingCursor = memo(() => {
  return (
    <motion.span
      className="inline-block w-1.5 h-4 bg-black ml-0.5 align-text-bottom"
      initial={{ opacity: 1 }}
      animate={{ opacity: [1, 1, 0, 0] }}
      transition={{
        duration: 1.8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{ marginLeft: "4px" }}
    />
  );
});
 
BlinkingCursor.displayName = "BlinkingCursor";
 
/**
 * CodeLine – Individual line with independent opacity animation
 * Memoized to prevent unnecessary re-renders
 */
const CodeLine = memo(({ line, index, totalLines, isLastLine }) => {
  // Calculate opacity variation: every 4-5 lines, one is slightly brighter
  const isHighlighted = (index + 1) % 5 === 0;
  const baseOpacity = isHighlighted ? 0.18 : 0.12;
  const peakOpacity = isHighlighted ? 0.28 : 0.20;
  
  // Random blur effect: ~20% of lines get subtle blur
  const hasBlur = Math.random() > 0.8;
  const blurAmount = hasBlur ? 0.3 : 0;
 
  // Responsive font sizing
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const fontSize = isMobile ? "10px" : "10px";
  const letterSpacing = isMobile ? "0.5px" : "0.75px";
 
  return (
    <motion.div
      //initial={{ opacity: baseOpacity }}
     // animate={{ opacity: [baseOpacity, peakOpacity, baseOpacity] }}
      transition={{
        duration: 5.5,
        repeat: Infinity,
        delay: line.delay + (index % CODE_LINES.length) * 0.2,
        ease: "easeInOut",
      }}
      className="font-mono leading-relaxed whitespace-nowrap text-black"
      style={{
        fontSize,
        letterSpacing,
        filter: hasBlur ? `blur(${blurAmount}px)` : "none",
        // Use CSS variables for consistent theming
        color: "rgba(75, 243, 14, 0.61)",
      }}
    >
      {line.text}
      {isLastLine && <BlinkingCursor />}
    </motion.div>
  );
});
 
CodeLine.displayName = "CodeLine";
 
/**
 * SoftShine – Very subtle gradient sweep that appears every 10-12 seconds
 * Extremely low opacity for a barely-visible effect
 */
const SoftShine = memo(() => {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.07), transparent)",
      }}
      initial={{ x: "-100%" }}
      animate={{ x: "200%" }}
      transition={{
        duration: 4,
        repeat: Infinity,
        repeatDelay: 11,
        ease: "easeInOut",
      }}
    />
  );
});
 
SoftShine.displayName = "SoftShine";
 
/**
 * CodeOverlay – Premium code texture component for face mask integration
 *
 * DESIGN GOALS:
 * - Feels like embedded luxury texture, not floating widget
 * - Motion is subtle and almost imperceptible after 2-3 seconds
 * - Monochrome palette with elegant opacity variations
 * - 60 FPS performance optimized
 * - SVG mask compatible
 *
 * ANIMATION SPECS:
 * - Vertical drift: 50s, linear, infinite
 * - Opacity pulse: 5.5s, easeInOut, staggered delays
 * - Shine effect: every 10-12 seconds, ultra-subtle
 * - Cursor blink: 1.8s smooth fade
 */
const CodeOverlay = memo(() => {
  // Quadruple CODE_LINES for continuous texture effect
  const duplicatedLines = useMemo(
    () => [...CODE_LINES, ...CODE_LINES, ...CODE_LINES, ...CODE_LINES],
    []
  );
 
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {/* Main animated text container – Very slow upward drift */}
      <motion.div
        className="absolute inset-0 flex flex-col"
        initial={{ y: "0%" }}
        animate={{ y: "-25%" }}
        transition={{
          duration: 50, // 50s for imperceptible drift
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {duplicatedLines.map((line, i) => (
          <CodeLine
            key={i}
            line={line}
            index={i}
            totalLines={CODE_LINES.length}
            isLastLine={i === duplicatedLines.length - 1}
          />
        ))}
      </motion.div>
 
      {/* Soft shine sweep – Ultra-subtle, infrequent */}
      <SoftShine />
    </div>
  );
});
 
CodeOverlay.displayName = "CodeOverlay";
 
export default CodeOverlay;