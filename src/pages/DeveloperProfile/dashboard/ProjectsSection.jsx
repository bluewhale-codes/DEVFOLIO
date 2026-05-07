import { useState } from 'react';
import { Grid3x3, List, Plus, Eye, Heart, ExternalLink } from 'lucide-react';
import { Button } from '../../../Components/ui/Button';
import { Badge } from '../../../Components/ui/badge';

export default function ProjectsSection({ isDarkMode }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  const filters = ['All', 'Web', 'App', 'UI/UX', 'Other'];

  const projects = [
    {
      id: 1,
      title: 'OrbitX',
      description: 'Space exploration platform with real-time satellite tracking',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop',
      tech: ['Next.js', 'React', 'Tailwind CSS', 'GSAP'],
      views: '2.4K',
      likes: '340',
      gradient: 'from-blue-900 to-purple-900'
    },
    {
      id: 2,
      title: 'FUEL',
      description: 'Fitness tracking app with AI-powered workout recommendations',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop',
      tech: ['React Native', 'TypeScript', 'MongoDB'],
      views: '1.8K',
      likes: '280',
      gradient: 'from-green-900 to-emerald-900'
    },
    {
      id: 3,
      title: 'TaskFlow',
      description: 'Project management tool for creative teams',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
      tech: ['Vue.js', 'Tailwind CSS', 'Node.js'],
      views: '3.1K',
      likes: '420',
      gradient: 'from-purple-900 to-pink-900'
    }
  ];

  return (
    <div className={`${isDarkMode ? 'bg-[#111217] border-[#1E1F26]' : 'bg-white border-neutral-200'} rounded-[20px] border p-8 transition-colors duration-300`}>
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className={`${isDarkMode ? 'text-white' : 'text-neutral-900'} text-3xl font-bold mb-4 transition-colors duration-300`} style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            Projects
          </h2>

          {/* Filters */}
          <div className="flex gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter.toLowerCase())}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeFilter === filter.toLowerCase()
                    ? 'bg-[#D4FF00] text-[#0B0B0F]'
                    : isDarkMode
                    ? 'text-[#A0A3BD] hover:bg-[#15161C] hover:text-white'
                    : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <div className={`flex gap-1 ${isDarkMode ? 'bg-[#15161C]' : 'bg-neutral-100'} rounded-lg p-1 transition-colors duration-300`}>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded transition-colors duration-300 ${
                viewMode === 'grid'
                  ? isDarkMode ? 'bg-[#1E1F26] text-white' : 'bg-neutral-200 text-neutral-900'
                  : isDarkMode ? 'text-[#A0A3BD]' : 'text-neutral-600'
              }`}
            >
              <Grid3x3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded transition-colors duration-300 ${
                viewMode === 'list'
                  ? isDarkMode ? 'bg-[#1E1F26] text-white' : 'bg-neutral-200 text-neutral-900'
                  : isDarkMode ? 'text-[#A0A3BD]' : 'text-neutral-600'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <Button className="bg-[#D4FF00] text-[#0B0B0F] hover:bg-[#D4FF00]/90 font-semibold">
            <Plus className="w-4 h-4 mr-2" />
            Add Project
          </Button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className={`group ${isDarkMode ? 'bg-[#15161C] border-[#1E1F26]' : 'bg-neutral-50 border-neutral-200'} rounded-2xl border overflow-hidden hover:border-[#D4FF00]/50 transition-all duration-300`}
          >
            {/* Thumbnail */}
            <div className="relative aspect-video overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-60`}></div>
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover opacity-70 group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/20"></div>

              {/* Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex gap-2">
                  <button className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-[#D4FF00] hover:text-[#0B0B0F] transition-colors">
                    <ExternalLink className="w-5 h-5" />
                  </button>
                  <button className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-[#D4FF00] hover:text-[#0B0B0F] transition-colors">
                    {/* <Github className="w-5 h-5" /> */}
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className={`${isDarkMode ? 'text-white' : 'text-neutral-900'} text-xl font-bold mb-2 transition-colors duration-300`}>{project.title}</h3>
              <p className={`${isDarkMode ? 'text-[#A0A3BD]' : 'text-neutral-600'} text-sm mb-4 line-clamp-2 transition-colors duration-300`}>{project.description}</p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className={`${isDarkMode ? 'bg-[#1E1F26] text-[#A0A3BD]' : 'bg-neutral-200 text-neutral-700'} hover:bg-[#D4FF00]/20 hover:text-[#D4FF00] text-xs transition-colors duration-300`}
                  >
                    {tech}
                  </Badge>
                ))}
              </div>

              {/* Stats */}
              <div className={`flex items-center justify-between pt-4 border-t ${isDarkMode ? 'border-[#1E1F26]' : 'border-neutral-200'} transition-colors duration-300`}>
                <div className={`flex items-center gap-4 text-sm ${isDarkMode ? 'text-[#A0A3BD]' : 'text-neutral-600'} transition-colors duration-300`}>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{project.views}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    <span>{project.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
