import { useState } from 'react';
import { Home, Compass, Layers, FileText, Settings, Search, Menu, ChevronLeft } from 'lucide-react';

export default function Sidebar({ isCollapsed, setIsCollapsed }) {
  
 

  const navItems = [
    { icon: Home, label: 'Home', active: false },
    { icon: Compass, label: 'Explore', active: false },
    { icon: Layers, label: 'Components', active: true },
    { icon: FileText, label: 'Templates', active: false },
    { icon: Settings, label: 'Settings', active: false },
    { icon: Settings, label: 'Workspace', active: false },
  ];

  return (
    <div
      className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 ease-in-out z-50 ${
        isCollapsed ? 'w-16' : 'w-56'
      }`}
    >
      {/* Header */}
      <div className="h-14 flex items-center justify-between px-4 border-b border-gray-100">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-gray-900 flex items-center justify-center">
              <span className="text-white text-xs font-bold">D</span>
            </div>
            <span className="font-semibold text-gray-900 text-sm">DEVFOLIO</span>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
        >
          {isCollapsed ? <Menu size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Search */}
      {!isCollapsed && (
        <div className="px-3 py-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-9 pr-3 py-1.5 text-sm bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-transparent"
            />
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md mb-0.5 transition-all duration-150 text-sm ${
                item.active
                  ? 'bg-gray-100 text-gray-900 font-medium'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              } ${isCollapsed ? 'justify-center' : ''}`}
            >
              <Icon size={18} />
              {!isCollapsed && (
                <span>{item.label}</span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
