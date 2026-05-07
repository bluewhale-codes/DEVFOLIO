import { Eye, Folder, Heart, Calendar } from 'lucide-react';

export default function StatsRow({ isDarkMode }) {
  const stats = [
    {
      icon: Eye,
      value: '12.4K',
      label: 'Profile Views',
      change: '+18%',
      color: '#D4FF00'
    },
    {
      icon: Folder,
      value: '24',
      label: 'Projects',
      change: '+3 new',
      color: '#8A5CFF'
    },
    {
      icon: Heart,
      value: '1.2K',
      label: 'Likes',
      change: '+12%',
      color: '#D4FF00'
    },
    {
      icon: Calendar,
      value: 'May 2023',
      label: 'Joined',
      change: '',
      color: '#8A5CFF'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className={`${isDarkMode ? 'bg-[#111217]/50 border-[#1E1F26]' : 'bg-white border-neutral-200'} backdrop-blur-sm border rounded-2xl p-6 hover:border-[#D4FF00]/30 transition-all duration-300`}
          >
            <div className="flex items-start justify-between mb-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${stat.color}20` }}
              >
                <Icon className="w-5 h-5" style={{ color: stat.color }} />
              </div>
              {stat.change && (
                <span className="text-[#D4FF00] text-xs font-semibold bg-[#D4FF00]/10 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              )}
            </div>
            <h3 className={`${isDarkMode ? 'text-white' : 'text-neutral-900'} text-3xl font-bold mb-1 transition-colors duration-300`}>{stat.value}</h3>
            <p className={`${isDarkMode ? 'text-[#A0A3BD]' : 'text-neutral-600'} text-sm transition-colors duration-300`}>{stat.label}</p>
          </div>
        );
      })}
    </div>
  );
}
