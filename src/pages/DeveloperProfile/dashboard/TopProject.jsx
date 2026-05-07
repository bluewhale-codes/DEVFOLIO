import { Eye, TrendingUp } from 'lucide-react';

export default function TopProject({ isDarkMode }) {
  return (
    <div className={`bg-gradient-to-br from-[#8A5CFF]/20 to-[#D4FF00]/20 border border-[#8A5CFF]/30 rounded-2xl p-6 transition-colors duration-300`}>
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp className="w-5 h-5 text-[#D4FF00]" />
        <h3 className={`${isDarkMode ? 'text-white' : 'text-neutral-900'} text-lg font-bold transition-colors duration-300`}>Top Project</h3>
      </div>

      <div className="space-y-3">
        <h4 className={`${isDarkMode ? 'text-white' : 'text-neutral-900'} text-2xl font-bold transition-colors duration-300`} style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
          OrbitX
        </h4>

        <div className={`flex items-center gap-2 ${isDarkMode ? 'text-[#A0A3BD]' : 'text-neutral-600'} transition-colors duration-300`}>
          <Eye className="w-4 h-4" />
          <span className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-neutral-900'} transition-colors duration-300`}>2.4K</span>
          <span className="text-sm">views</span>
        </div>

        <p className={`${isDarkMode ? 'text-[#A0A3BD]' : 'text-neutral-600'} text-sm transition-colors duration-300`}>
          Your most popular project this month
        </p>
      </div>
    </div>
  );
}
