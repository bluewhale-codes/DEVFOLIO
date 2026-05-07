import { LayoutDashboard, User, Folder, Briefcase, GraduationCap, Award, BarChart3, Settings, Sparkles } from 'lucide-react';
import { Button } from '../../../Components/ui/Button';
import { Avatar, AvatarFallback, AvatarImage } from '../../../Components/ui/avatar';

export default function Sidebar({ activeNav, setActiveNav, isDarkMode }) {
  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'projects', icon: Folder, label: 'Projects' },
    { id: 'experience', icon: Briefcase, label: 'Experience' },
    { id: 'education', icon: GraduationCap, label: 'Education' },
    { id: 'achievements', icon: Award, label: 'Achievements' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className={`fixed left-0 top-0 h-screen w-[260px] ${isDarkMode ? 'bg-[#111217] border-[#1E1F26]' : 'bg-neutral-50 border-neutral-200'} border-r p-6 flex flex-col transition-colors duration-300`}>
      {/* Logo */}
      <div className="flex items-center gap-2 mb-8">
        <img width={"200px"} src='https://res.cloudinary.com/dycjjaxsk/image/upload/v1778010708/ChatGPT_Image_May_6_2026_01_17_53_AM_1_pj2weu.png'/>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeNav === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? 'bg-[#D4FF00] text-[#0B0B0F] shadow-lg shadow-[#D4FF00]/20'
                  : isDarkMode
                  ? 'text-[#A0A3BD] hover:bg-[#15161C] hover:text-white'
                  : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Upgrade Card */}
      <div className="bg-gradient-to-br from-[#8A5CFF]/20 to-[#D4FF00]/20 border border-[#8A5CFF]/30 rounded-2xl p-4 mb-4">
        <div className="flex items-start gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-[#D4FF00]" />
          <div>
            <h3 className="text-white font-semibold text-sm mb-1">Upgrade to Pro</h3>
            <p className="text-[#A0A3BD] text-xs">Unlock premium features</p>
          </div>
        </div>
        <Button className="w-full bg-[#D4FF00] text-[#0B0B0F] hover:bg-[#D4FF00]/90 font-semibold">
          Upgrade Now
        </Button>
      </div>

      {/* User Profile */}
      <div className={`flex items-center gap-3 pt-4 border-t ${isDarkMode ? 'border-[#1E1F26]' : 'border-neutral-200'} transition-colors duration-300`}>
        <Avatar className="w-10 h-10 ring-2 ring-[#D4FF00]">
          <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop" />
          <AvatarFallback>VS</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className={`${isDarkMode ? 'text-white' : 'text-neutral-900'} text-sm font-medium truncate transition-colors duration-300`}>Vishal Shakya</p>
          <p className={`${isDarkMode ? 'text-[#A0A3BD]' : 'text-neutral-600'} text-xs truncate transition-colors duration-300`}>@vishaldev</p>
        </div>
      </div>
    </div>
  );
}
