import { Edit } from 'lucide-react';
import { Button } from '../../../Components/ui/Button';
import { Badge } from '../../../Components/ui/badge';

export default function SkillsCard({ isDarkMode }) {
  const skills = [
    'JavaScript',
    'TypeScript',
    'React',
    'Node.js',
    'MongoDB',
    'Tailwind CSS',
    'GSAP',
    'UI/UX Design',
    'Git',
    'Docker'
  ];

  return (
    <div className={`${isDarkMode ? 'bg-[#111217] border-[#1E1F26]' : 'bg-white border-neutral-200'} rounded-2xl border p-6 transition-colors duration-300`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className={`${isDarkMode ? 'text-white' : 'text-neutral-900'} text-xl font-bold transition-colors duration-300`}>Skills</h3>
        <Button
          variant="ghost"
          size="icon"
          className={`${isDarkMode ? 'text-[#A0A3BD] hover:bg-[#15161C]' : 'text-neutral-600 hover:bg-neutral-100'} hover:text-[#D4FF00] transition-colors duration-300`}
        >
          <Edit className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <Badge
            key={index}
            className={`${isDarkMode ? 'bg-[#15161C] text-[#A0A3BD] border-[#1E1F26]' : 'bg-neutral-100 text-neutral-700 border-neutral-200'} hover:bg-[#D4FF00] hover:text-[#0B0B0F] border transition-all duration-300`}
          >
            {skill}
          </Badge>
        ))}
      </div>
    </div>
  );
}
