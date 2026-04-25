import { useState } from 'react';

export default function Card({ title, gradient, image, theme = 'dark' }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative w-full aspect-[4/3] rounded-lg overflow-hidden cursor-pointer transition-all duration-200 border border-gray-200 hover:border-gray-300"
      style={{
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="w-full h-full relative flex items-center justify-center p-6"
        style={{
          background: gradient || (theme === 'dark' ? '#000000' : '#ffffff'),
        }}
      >
        {image && (
          <img src={image} alt={title} className="w-full h-full object-cover absolute inset-0" />
        )}
        <h3 className={`relative z-10 text-center font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          {title}
        </h3>
      </div>
    </div>
  );
}
