import { Type, AlignLeft, ChevronDown, Trash2, Copy } from 'lucide-react';
import { useState } from 'react';

export default function FloatingToolbar({toggle}) {

    

  return (
    <div className=" z-50 bg-[#1f1f1f] rounded-2xl shadow-2xl px-4 py-1 flex items-center gap-3">
      {/* Left Section - Text Tool */}
      <button className="w-8 h-8 flex items-center justify-center bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors">
        <Type className="w-5 h-5 text-white stroke-[2]" />
      </button>

      {/* Divider */}
      <div className="w-px h-6 bg-gray-700 opacity-50" />

      {/* Center Section - Alignment Control */}
      <button onClick={toggle} className="cursor-pointer flex items-center gap-2 px-3 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors">
        <AlignLeft className="w-4 h-4 text-gray-300 stroke-[1.5]" />
        <ChevronDown className="w-3.5 h-3.5 text-gray-400 stroke-[1.5]" />
      </button>

      {/* Divider */}
      <div className="w-px h-6 bg-gray-700 opacity-50" />

      {/* Right Section - Actions */}
      <div className="flex items-center gap-2">
        <button className="w-9 h-9 flex items-center justify-center hover:bg-zinc-800 rounded-lg transition-colors">
          <Copy className="w-4 h-4 text-gray-400 stroke-[1.5]" />
        </button>
        <button className="w-9 h-9 flex items-center justify-center hover:bg-zinc-800 rounded-lg transition-colors">
          <Trash2 className="w-4 h-4 text-gray-400 stroke-[1.5]" />
        </button>
      </div>
    </div>
  );
}
