import { TrendingUp, Users, MousePointer, Link2, Heart } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../../../Components/ui/avatar';

export default function AnalyticsCard({ isDarkMode }) {
  const metrics = [
    { icon: Users, label: 'Unique Visitors', value: '3.2K' },
    { icon: MousePointer, label: 'Project Clicks', value: '1.8K' },
    { icon: Link2, label: 'Link Clicks', value: '620' },
    { icon: Heart, label: 'Likes', value: '240' }
  ];

  const visitors = [
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop',
    'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=80&h=80&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop'
  ];

  return (
    <div className={`${isDarkMode ? 'bg-[#111217] border-[#1E1F26]' : 'bg-white border-neutral-200'} rounded-[20px] border p-8 transition-colors duration-300`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className={`${isDarkMode ? 'text-white' : 'text-neutral-900'} text-2xl font-bold transition-colors duration-300`}>Profile Analytics</h2>
        <select className={`${isDarkMode ? 'bg-[#15161C] text-[#A0A3BD] border-[#1E1F26]' : 'bg-neutral-50 text-neutral-700 border-neutral-200'} border rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#D4FF00] transition-colors duration-300`}>
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>Last 90 Days</option>
        </select>
      </div>

      {/* Main Stat */}
      <div className="mb-6">
        <div className="flex items-baseline gap-3">
          <h3 className={`${isDarkMode ? 'text-white' : 'text-neutral-900'} text-5xl font-bold transition-colors duration-300`}>12.4K</h3>
          <div className="flex items-center gap-1 text-[#D4FF00] font-semibold">
            <TrendingUp className="w-5 h-5" />
            <span>+18%</span>
          </div>
        </div>
        <p className={`${isDarkMode ? 'text-[#A0A3BD]' : 'text-neutral-600'} mt-2 transition-colors duration-300`}>Total Views</p>
      </div>

      {/* Chart */}
      <div className="mb-8 h-48 relative">
        <svg className="w-full h-full" viewBox="0 0 600 200">
          <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#D4FF00" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#D4FF00" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={i}
              x1="0"
              y1={i * 50}
              x2="600"
              y2={i * 50}
              stroke={isDarkMode ? "#1E1F26" : "#E5E7EB"}
              strokeWidth="1"
            />
          ))}

          {/* Area */}
          <path
            d="M 0,150 L 100,120 L 200,100 L 300,60 L 400,80 L 500,50 L 600,70 L 600,200 L 0,200 Z"
            fill="url(#lineGradient)"
          />

          {/* Line */}
          <path
            d="M 0,150 L 100,120 L 200,100 L 300,60 L 400,80 L 500,50 L 600,70"
            fill="none"
            stroke="#D4FF00"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Point */}
          <circle cx="300" cy="60" r="6" fill="#D4FF00" />
          <circle cx="300" cy="60" r="12" fill="#D4FF00" fillOpacity="0.3" />
        </svg>

        {/* Labels */}
        <div className={`flex justify-between text-xs ${isDarkMode ? 'text-[#A0A3BD]' : 'text-neutral-600'} mt-2 transition-colors duration-300`}>
          <span>May 10</span>
          <span>May 12</span>
          <span>May 14</span>
          <span>May 16</span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className={`${isDarkMode ? 'bg-[#15161C] border-[#1E1F26]' : 'bg-neutral-50 border-neutral-200'} rounded-xl p-4 border transition-colors duration-300`}>
              <Icon className="w-5 h-5 text-[#8A5CFF] mb-2" />
              <p className={`${isDarkMode ? 'text-white' : 'text-neutral-900'} text-2xl font-bold mb-1 transition-colors duration-300`}>{metric.value}</p>
              <p className={`${isDarkMode ? 'text-[#A0A3BD]' : 'text-neutral-600'} text-xs transition-colors duration-300`}>{metric.label}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Visitors */}
      <div>
        <h3 className={`${isDarkMode ? 'text-white' : 'text-neutral-900'} font-semibold mb-3 transition-colors duration-300`}>Recent Visitors</h3>
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {visitors.map((avatar, index) => (
              <Avatar key={index} className="w-10 h-10 ring-2 ring-[#111217]">
                <AvatarImage src={avatar} />
                <AvatarFallback>U{index + 1}</AvatarFallback>
              </Avatar>
            ))}
          </div>
          <div className={`w-10 h-10 ${isDarkMode ? 'bg-[#15161C] border-[#1E1F26]' : 'bg-neutral-100 border-neutral-200'} rounded-full flex items-center justify-center border-2 text-[#D4FF00] font-semibold text-sm transition-colors duration-300`}>
            +32
          </div>
        </div>
      </div>
    </div>
  );
}
