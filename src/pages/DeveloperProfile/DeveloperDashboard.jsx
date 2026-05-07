import { useState } from 'react';
import Sidebar from './dashboard/Sidebar';
import HeroProfileCard from './dashboard/HeroProfileCard';
import StatsRow from './dashboard/StatsRow';
import ProjectsSection from './dashboard/ProjectsSection';
import SkillsCard from './dashboard/SkillsCard';
// import SocialLinks from './dashboard/SocialLinks';
import TopProject from './dashboard/TopProject';
import AnalyticsCard from './dashboard/AnalyticsCard';

export default function DeveloperDashboard() {
  const [activeNav, setActiveNav] = useState('profile');
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <div className={`flex min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-[#0B0B0F]' : 'bg-white'}`}>
      {/* Sidebar */}
      <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} isDarkMode={isDarkMode} />

      {/* Main Content */}
      <main className="flex-1 p-8 ml-[260px]">
        <div className="max-w-[1180px] mx-auto space-y-6">
          {/* Hero Profile Card */}
          <HeroProfileCard isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

          {/* Stats Row */}
          <StatsRow isDarkMode={isDarkMode} />

          {/* Projects Section */}
          <ProjectsSection isDarkMode={isDarkMode} />

          {/* Bottom Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              <SkillsCard isDarkMode={isDarkMode} />
              {/* <SocialLinks isDarkMode={isDarkMode} /> */}
              <TopProject isDarkMode={isDarkMode} />
            </div>

            {/* Right Column */}
            <div className="lg:col-span-2">
              <AnalyticsCard isDarkMode={isDarkMode} />
            </div>
          </div>

          {/* Footer */}
          <footer className={`py-8 border-t ${isDarkMode ? 'border-[#1E1F26] text-[#A0A3BD]' : 'border-neutral-200 text-neutral-600'} text-sm transition-colors duration-300`}>
            <div className="flex justify-between items-center">
              <p>© 2024 Studio Job</p>
              <div className="flex gap-6">
                <a href="#" className="hover:text-[#D4FF00] transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-[#D4FF00] transition-colors">Terms of Service</a>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
