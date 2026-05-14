import { Pencil, Trash2 } from "lucide-react";
import { Button } from "../../../ui/Button";

export default function SkillCard({
  skill = "MONGODB",
  percentage = 75,
  iconColor = "#8B5CF6",
  accentColor = "#8B5CF6"
}) {
  return (
    <div className="relative w-full max-w-[450px] mx-auto">
      {/* Floating Action Buttons - Top Right */}
      <div className="absolute -top-3 -right-3 flex gap-2 z-20">
        <Button
          size="icon"
          className="size-10 rounded-xl bg-zinc-900/80 backdrop-blur-md border border-purple-500/40 shadow-lg shadow-purple-500/20 hover:bg-zinc-800/90 hover:border-purple-400/60 hover:shadow-purple-400/30 transition-all duration-300"
        >
          <Pencil className="size-4 text-white" />
        </Button>
        <Button
          size="icon"
          className="size-10 rounded-xl bg-zinc-900/80 backdrop-blur-md border border-purple-500/40 shadow-lg shadow-purple-500/20 hover:bg-zinc-800/90 hover:border-purple-400/60 hover:shadow-purple-400/30 transition-all duration-300"
        >
          <Trash2 className="size-4 text-white" />
        </Button>
      </div>

      {/* Hand-drawn Star Doodle */}
      <div className="absolute -top-2 right-16 z-10">
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M25 5 L27 20 L40 15 L30 25 L45 30 L28 28 L32 45 L25 32 L18 45 L22 28 L5 30 L20 25 L10 15 L23 20 Z"
            stroke={accentColor}
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.8"
            style={{ filter: `drop-shadow(0 0 8px ${accentColor})` }}
          />
        </svg>
      </div>

      {/* Main Card */}
      <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-6 shadow-2xl overflow-hidden">
        {/* Paper Texture Overlay */}
        <div
          className="absolute inset-0 opacity-[0.15] pointer-events-none rounded-2xl"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}
        />

        {/* Dotted Stitched Border */}
        <div
          className="absolute inset-3 rounded-xl pointer-events-none"
          style={{
            border: '2px dotted rgba(0, 0, 0, 0.3)',
            borderRadius: '12px'
          }}
        />

        {/* Content Container */}
        <div className="relative flex items-center gap-6 py-2">
          {/* Left: MongoDB Icon */}
          <div className="flex-shrink-0">
            <div className="relative">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M30 5 C20 5, 15 15, 15 25 C15 35, 20 50, 30 55 C40 50, 45 35, 45 25 C45 15, 40 5, 30 5 Z"
                  fill={iconColor}
                  style={{ filter: `drop-shadow(0 0 12px ${iconColor}80)` }}
                />
                <ellipse cx="30" cy="28" rx="8" ry="15" fill={iconColor} opacity="0.6" />
              </svg>
            </div>
          </div>

          {/* Center: Title and Progress */}
          <div className="flex-1 flex flex-col gap-3">
            <h3
              className="text-3xl font-black tracking-tighter text-black uppercase"
              style={{
                fontFamily: 'ui-sans-serif, system-ui, sans-serif',
                letterSpacing: '-0.02em'
              }}
            >
              {skill}
            </h3>

            {/* Hand-drawn Wavy Progress Line */}
            <div className="relative w-full">
              <svg width="100%" height="30" viewBox="0 0 280 30" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5 15 Q15 8, 25 15 T45 15 T65 15 T85 15 T105 15 T125 15 T145 15 T165 15 T185 15 T205 15 T225 15 T245 15 T265 15"
                  stroke={accentColor}
                  strokeWidth="5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.9"
                  style={{
                    filter: `drop-shadow(0 0 6px ${accentColor}60)`,
                    strokeDasharray: `${percentage * 2.8} 280`,
                  }}
                />
              </svg>
            </div>
          </div>

          {/* Right: Percentage */}
          <div className="flex-shrink-0 self-end pb-1">
            <span
              className="text-3xl font-black text-black"
              style={{
                fontFamily: 'ui-sans-serif, system-ui, sans-serif'
              }}
            >
              {percentage}%
            </span>
          </div>
        </div>

        {/* Subtle Scratches/Grunge Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <line x1="10%" y1="20%" x2="30%" y2="25%" stroke="black" strokeWidth="1" opacity="0.3" />
            <line x1="70%" y1="80%" x2="85%" y2="75%" stroke="black" strokeWidth="1" opacity="0.3" />
            <line x1="40%" y1="10%" x2="45%" y2="30%" stroke="black" strokeWidth="0.5" opacity="0.2" />
          </svg>
        </div>
      </div>
    </div>
  );
}
