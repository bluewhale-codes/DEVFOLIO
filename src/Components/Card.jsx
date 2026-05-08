import { useState } from 'react';

export default function Card(value) {
  const [isHovered, setIsHovered] = useState(false);
  console.log("start")
 console.log(value.value.label)
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
        
      >
        {value?.value?.coverImage && (
          <img src={value.value.coverImage}  className="w-full h-full object-cover absolute inset-0" />
        )}
        <h3 className={`relative z-10 text-center font-medium'}`}>
          {value.value.label}
        </h3>
      </div>
    </div>
  );
}
