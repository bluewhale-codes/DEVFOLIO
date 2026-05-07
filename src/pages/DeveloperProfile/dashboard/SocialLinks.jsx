// import { Github, Linkedin, Twitter, Dribbble, Globe } from 'lucide-react';

export default function SocialLinks({ isDarkMode }) {
  const socials = [
    // { icon: Github, label: 'GitHub', url: '#' },
    // { icon: Linkedin, label: 'LinkedIn', url: '#' },
    // { icon: Twitter, label: 'Twitter', url: '#' },
    // { icon: Dribbble, label: 'Dribbble', url: '#' },
    // { icon: Globe, label: 'Website', url: '#' }
  ];

  return (
    <div className={`${isDarkMode ? 'bg-[#111217] border-[#1E1F26]' : 'bg-white border-neutral-200'} rounded-2xl border p-6 transition-colors duration-300`}>
      <h3 className={`${isDarkMode ? 'text-white' : 'text-neutral-900'} text-xl font-bold mb-4 transition-colors duration-300`}>Social Links</h3>

      <div className="flex gap-3">
        {socials.map((social, index) => {
          const Icon = social.icon;
          return (
            <a
              key={index}
              href={social.url}
              className={`w-12 h-12 ${isDarkMode ? 'bg-[#15161C] border-[#1E1F26] text-[#A0A3BD]' : 'bg-neutral-100 border-neutral-200 text-neutral-600'} rounded-xl flex items-center justify-center hover:bg-[#D4FF00] hover:text-[#0B0B0F] transition-all duration-300 border hover:border-[#D4FF00]`}
              title={social.label}
            >
              <Icon className="w-5 h-5" />
            </a>
          );
        })}
      </div>
    </div>
  );
}
