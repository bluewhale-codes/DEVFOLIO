import React from 'react';
import { ArrowUpRight } from 'lucide-react';

// Custom LeetCode Icon Component (Outline Style)
const LeetCodeIcon = ({ className }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M10 20.054v-1.05c0-1.064-.05-1.078-1.04-1.843-2.39-1.807-4.08-4.627-4.08-7.823 0-4.78 4.13-8.66 9.22-8.66 5.09 0 9.22 3.88 9.22 8.66 0 3.196-1.69 6.016-4.08 7.823-.99.765-1.04.779-1.04 1.843v1.05" />
    <path d="M13.09 7.094c-1.05-1.05-2.754-1.05-3.804 0s-1.05 2.754 0 3.804l3.804 3.804 3.804-3.804c1.05-1.05 1.05-2.754 0-3.804s-2.754-1.05-3.804 0" />
    <path d="M12 17.5v3" />
  </svg>
);

const PortfolioFooter = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com', icon: <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-7 w-7"
        fill="currentColor"
        style={{ color: "#333" }}
        viewBox="0 0 24 24"
      >
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg> },
    { name: 'LinkedIn', href: 'https://linkedin.com', icon: <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-7 w-7"
        fill="currentColor"
        style={{ color: "#0077b5" }}
        viewBox="0 0 24 24"
      >
        <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
      </svg> },
    
    { name: 'Instagram', href: 'https://instagram.com', icon: <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-7 w-7"
        fill="currentColor"
        style={{ color: "#c13584" }}
        viewBox="0 0 24 24"
      >
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg> },
  ];

  return (
    <footer className="w-[calc(100%-2rem)] max-w-[1200px] mx-auto sm:w-[calc(100%-3rem)] lg:w-[calc(100%-4rem)] bg-[#FAFAFA] border-t border-[#EAEAEA]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 h-[90px] flex items-center justify-between">
        
        {/* Left Section: Copyright + Dot + Brand Statement */}
        <div className="flex items-center gap-5 flex-shrink-0">
          
          {/* 1. Copyright */}
          <p className="text-[13px] tracking-[-0.01em] text-[#666666] font-sans whitespace-nowrap">
            © {currentYear}{' '}
            <span  className="text-[#FF5A1F] hidden sm:block font-medium">Vishal Shakya</span>
            . All rights reserved.
          </p>

          {/* 2. Orange Dot Separator */}
          <div className="w-[3px] h-[3px] hidden sm:block rounded-full bg-[#FF5A1F] flex-shrink-0" />

          {/* 3. Personal Brand Statement */}
          <p className="text-[13px] tracking-[-0.01em] text-[#111111] font-medium whitespace-nowrap hidden md:block">
            Crafting scalable digital experiences
          </p>

          {/* 4. Orange Dot Separator (Desktop only) */}
          <div className="w-[3px] h-[3px] rounded-full bg-[#FF5A1F] flex-shrink-0 hidden md:block" />

          {/* 5. CTA Section */}
          <a 
            href="mailto:vishal@example.com" 
            className="group hidden sm:block flex items-center gap-1.5 text-[13px] font-medium text-[#FF5A1F] hover:opacity-80 transition-opacity duration-200 whitespace-nowrap"
          >
            Let's Build Something Great
            <ArrowUpRight 
              size={14} 
              strokeWidth={2.5} 
              className="transition-transform duration-200 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]" 
            />
          </a>
        </div>

        {/* Right Section: Divider + Social Links */}
        <div className="flex items-center gap-6 flex-shrink-0">
          
          {/* 6. Thin Vertical Divider */}
          <div className="h-5 w-[1px] bg-[#E5E5E5] hidden sm:block" />

          {/* 7. Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="text-[#111111] hover:text-[#FF5A1F] transition-colors duration-200"
                >
                  {/* <Icon 
                    size={18} 
                    strokeWidth={1.5} 
                    className="block" 
                  /> */}
                  {Icon}
                </a>
              );
            })}
          </div>
        </div>

      </div>
    </footer>
  );
};

export default PortfolioFooter;