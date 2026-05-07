import { MapPin, ExternalLink, Settings, Edit, Eye, Moon, Sun } from 'lucide-react';
import { Button } from '../../../Components/ui/Button';
import { Avatar, AvatarFallback, AvatarImage } from '../../../Components/ui/avatar';
import { Badge } from '../../../Components/ui/badge';

export default function HeroProfileCard({ isDarkMode, setIsDarkMode }) {
  return (
    <div className={`${isDarkMode ? 'bg-[#111217] border-[#1E1F26]' : 'bg-white border-neutral-200'} rounded-[20px] border p-8 overflow-hidden relative transition-colors duration-300`}>
      {/* Top Buttons */}
      <div className="flex justify-end gap-3 mb-6">
        <Button
          variant="outline"
          className={`${isDarkMode ? 'border-[#1E1F26] bg-[#15161C] hover:bg-[#1E1F26] text-white' : 'border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-900'} hover:text-[#D4FF00] transition-colors duration-300`}
        >
          <Eye className="w-4 h-4 mr-2" />
          View Portfolio
        </Button>
        <Button
          variant="outline"
          size="icon"
          className={`${isDarkMode ? 'border-[#1E1F26] bg-[#15161C] hover:bg-[#1E1F26] text-white' : 'border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-900'} hover:text-[#D4FF00] transition-colors duration-300`}
          onClick={() => setIsDarkMode(!isDarkMode)}
        >
          {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Side */}
        <div className="space-y-6">
          {/* Label */}
          <div className="inline-block">
            <span className={`${isDarkMode ? 'text-[#A0A3BD] bg-[#15161C] border-[#1E1F26]' : 'text-neutral-600 bg-neutral-50 border-neutral-200'} text-sm font-medium px-3 py-1 rounded-full border transition-colors duration-300`}>
              Developer & Designer
            </span>
          </div>

          {/* Big Heading */}
          <div style={{ fontFamily: "'Bebas Neue', sans-serif" }} className="space-y-1">
            <h1 className={`text-6xl ${isDarkMode ? 'text-white' : 'text-neutral-900'} leading-none transition-colors duration-300`}>DESIGN.</h1>
            <h1 className={`text-6xl ${isDarkMode ? 'text-white' : 'text-neutral-900'} leading-none transition-colors duration-300`}>BUILD.</h1>
            <h1 className="text-6xl leading-none">
              <span className="bg-[#D4FF00] text-[#0B0B0F] px-2">IMPACT.</span>
            </h1>
          </div>

          {/* Profile Block */}
          <div className="flex items-start gap-4 pt-4">
            <div className="relative">
              <Avatar className="w-20 h-20 ring-4 ring-[#D4FF00]/50">
                <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=160&h=160&fit=crop" />
                <AvatarFallback>VS</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#D4FF00] rounded-full border-2 border-[#111217]"></div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className={`${isDarkMode ? 'text-white' : 'text-neutral-900'} text-2xl font-bold transition-colors duration-300`}>Vishal Shakya</h2>
                <Badge className="bg-[#8A5CFF] text-white hover:bg-[#8A5CFF]/90">Pro</Badge>
              </div>
              <p className={`${isDarkMode ? 'text-[#A0A3BD]' : 'text-neutral-600'} transition-colors duration-300`}>@vishaldev</p>
            </div>
          </div>

          {/* Bio */}
          <p className={`${isDarkMode ? 'text-[#A0A3BD]' : 'text-neutral-600'} leading-relaxed max-w-md transition-colors duration-300`}>
            Full Stack Developer | Building digital products that solve real-world problems.
          </p>

          {/* Meta */}
          <div className="flex flex-col gap-2 text-sm">
            <div className={`flex items-center gap-2 ${isDarkMode ? 'text-[#A0A3BD]' : 'text-neutral-600'} transition-colors duration-300`}>
              <MapPin className="w-4 h-4" />
              <span>India, UP</span>
            </div>
            <div className="flex items-center gap-2">
              <ExternalLink className={`w-4 h-4 ${isDarkMode ? 'text-[#A0A3BD]' : 'text-neutral-600'} transition-colors duration-300`} />
              <a href="#" className="text-[#D4FF00] hover:underline">vishalshakya.dev</a>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <Button className="bg-[#D4FF00] text-[#0B0B0F] hover:bg-[#D4FF00]/90 font-semibold">
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
            <Button variant="outline" size="icon" className={`${isDarkMode ? 'border-[#1E1F26] bg-[#15161C] hover:bg-[#1E1F26] text-white' : 'border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-900'} transition-colors duration-300`}>
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Right Side - Collage */}
        <div className="relative hidden lg:block">
          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%">
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#D4FF00" strokeWidth="0.5"/>
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Laptop */}
          <div className="relative transform rotate-2 hover:rotate-0 transition-transform duration-300">
            <div className={`${isDarkMode ? 'bg-[#1E1F26]' : 'bg-neutral-200'} rounded-2xl p-3 shadow-2xl transition-colors duration-300`}>
              <div className={`${isDarkMode ? 'bg-[#0B0B0F]' : 'bg-neutral-900'} rounded-lg overflow-hidden aspect-video transition-colors duration-300`}>
                <div className="p-4 space-y-2 text-xs font-mono">
                  <div className="text-[#8A5CFF]">const <span className="text-white">developer</span> = {'{'}</div>
                  <div className="ml-4 text-[#D4FF00]">name: <span className="text-white">"Vishal"</span>,</div>
                  <div className="ml-4 text-[#D4FF00]">passion: <span className="text-white">"Code"</span>,</div>
                  <div className="ml-4 text-[#D4FF00]">goal: <span className="text-white">"Impact"</span></div>
                  <div className="text-[#8A5CFF]">{'}'}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Note */}
          <div className="absolute bottom-8 -left-4 bg-[#D4FF00] p-4 rounded-lg shadow-xl transform -rotate-6 w-32">
            <div className="font-bold text-[#0B0B0F] space-y-1" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              <p>Code</p>
              <p>Ship</p>
              <p>Repeat</p>
            </div>
          </div>

          {/* Purple scribble */}
          <svg className="absolute top-12 right-12 w-24 h-24 text-[#8A5CFF] opacity-60" viewBox="0 0 100 100">
            <path d="M10,50 Q30,20 50,50 T90,50" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round"/>
            <circle cx="90" cy="50" r="4" fill="currentColor"/>
          </svg>

          {/* Star */}
          <div className="absolute top-4 right-4 text-[#D4FF00] text-3xl">✳</div>
        </div>
      </div>
    </div>
  );
}
