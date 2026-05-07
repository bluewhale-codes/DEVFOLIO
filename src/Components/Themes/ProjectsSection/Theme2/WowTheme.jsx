import { useState } from "react";
import { ProjectCard } from "./Components/ProjectCard";
import { AddProjectModal } from "./Components/AddProjectModel";
import { Plus } from "lucide-react";
import { motion } from "motion/react";

const initialProjects = [
  {
    title: "Analytics Dashboard",
    description: "Comprehensive analytics platform with real-time data visualization and advanced metrics tracking for enterprise clients.",
    image: "https://images.unsplash.com/photo-1763718528755-4bca23f82ac3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxtb2Rlcm4lMjBkYXNoYm9hcmQlMjBVSSUyMGludGVyZmFjZXxlbnwxfHx8fDE3NzczNjE1NTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["React", "TypeScript", "D3.js", "Tailwind CSS"],
    liveLink: "https://analytics-demo.example.com",
    gitRepo: "https://github.com/username/analytics-dashboard"
  },
  {
    title: "Fitness Tracker App",
    description: "Mobile-first fitness application with workout tracking, nutrition logging, and personalized health insights.",
    image: "https://images.unsplash.com/photo-1769893841740-fc98ce39a3cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwYXBwJTIwbW9iaWxlJTIwaW50ZXJmYWNlfGVufDF8fHx8MTc3NzM2MTU1OXww&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["React Native", "Firebase", "Redux", "Chart.js"],
    liveLink: "https://fitness-app.example.com",
    gitRepo: "https://github.com/username/fitness-tracker"
  },
  {
    title: "E-commerce Platform",
    description: "Full-featured online shopping platform with seamless checkout, inventory management, and customer analytics.",
    image: "https://images.unsplash.com/photo-1658297063569-162817482fb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBvbmxpbmUlMjBzaG9wcGluZyUyMHdlYnNpdGV8ZW58MXx8fHwxNzc3MzYxNTU5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["Next.js", "Stripe", "MongoDB", "Prisma"],
    liveLink: "https://shop.example.com",
    gitRepo: "https://github.com/username/ecommerce-platform"
  },
  {
    title: "Portfolio CMS",
    description: "Modern portfolio builder with drag-and-drop interface and customizable templates for creative professionals.",
    image: "https://images.unsplash.com/photo-1772272935464-2e90d8218987?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0Zm9saW8lMjB3ZWJzaXRlJTIwZGVzaWdufGVufDF8fHx8MTc3NzM2MTU2MHww&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["Vue.js", "Nuxt", "Supabase", "Tailwind CSS"],
    liveLink: "https://portfolio-cms.example.com",
    gitRepo: "https://github.com/username/portfolio-cms"
  },
  {
    title: "Task Manager Pro",
    description: "Collaborative project management tool with kanban boards, time tracking, and team productivity insights.",
    image: "https://images.unsplash.com/photo-1648134859187-71dadc9f815a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHx0YXNrJTIwbWFuYWdlbWVudCUyMGFwcCUyMHByb2R1Y3Rpdml0eXxlbnwxfHx8fDE3NzczNjE1NjB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["React", "Node.js", "PostgreSQL", "Socket.io"],
    liveLink: "https://taskmanager.example.com",
    gitRepo: "https://github.com/username/task-manager"
  },
  {
    title: "Music Streaming App",
    description: "High-fidelity music player with smart playlists, social features, and personalized recommendations.",
    image: "https://images.unsplash.com/photo-1775213416658-69720b9f80af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHBsYXllciUyMGFwcCUyMGludGVyZmFjZXxlbnwxfHx8fDE3NzczNjE1NjF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["React", "Web Audio API", "AWS", "GraphQL"],
    liveLink: "https://music-app.example.com",
    gitRepo: "https://github.com/username/music-streaming"
  }
];

export default function WowTheme() {
  const [projects, setProjects] = useState(initialProjects);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(undefined);

  const handleAddOrEditProject = (projectData, index) => {
    if (index !== undefined) {
      // Edit existing project
      const updatedProjects = [...projects];
      updatedProjects[index] = {
        title: projectData.title,
        description: projectData.description,
        image: projectData.coverImage,
        tags: projectData.technologies,
        liveLink: projectData.liveLink,
        gitRepo: projectData.gitRepo
      };
      setProjects(updatedProjects);
    } else {
      // Add new project
      setProjects([
        {
          title: projectData.title,
          description: projectData.description,
          image: projectData.coverImage,
          tags: projectData.technologies,
          liveLink: projectData.liveLink,
          gitRepo: projectData.gitRepo
        },
        ...projects
      ]);
    }
    setEditMode(false);
    setEditIndex(undefined);
  };

  const handleEditClick = (index) => {
    const project = projects[index];
    setEditMode(true);
    setEditIndex(index);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditMode(false);
    setEditIndex(undefined);
  };

  const handleAddNewClick = () => {
    setEditMode(false);
    setEditIndex(undefined);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-black overflow-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[#CCFF00] text-sm font-bold tracking-[0.3em] uppercase mb-6"
          >
            • MY WORK •
          </motion.p>
          <motion.h1
            style={{color:"red"}}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-black text-5xl md:text-7xl text-white mb-6 uppercase tracking-tight"
          >
            FEATURED
            <br />
            <span className="text-[#CCFF00]">PROJECTS</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 text-base max-w-2xl mx-auto mb-8 uppercase tracking-wide"
          >
            Creating digital products that make an impact
          </motion.p>

          {/* Add Project Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddNewClick}
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#CCFF00] text-black font-bold rounded hover:bg-[#B8E600] transition-all duration-300 uppercase tracking-wider shadow-[0_0_30px_rgba(204,255,0,0.5)] hover:shadow-[0_0_40px_rgba(204,255,0,0.7)]"
          >
            <Plus className="w-5 h-5" />
            Add New Project
          </motion.button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={`${project.title}-${index}`}
              title={project.title}
              description={project.description}
              image={project.image}
              tags={project.tags}
              liveLink={project.liveLink}
              gitRepo={project.gitRepo}
              delay={index * 0.1}
              onEdit={() => handleEditClick(index)}
            />
          ))}
        </div>
      </div>

      {/* Add/Edit Project Modal */}
      <AddProjectModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleAddOrEditProject}
        editMode={editMode}
        editIndex={editIndex}
        initialData={editIndex !== undefined ? {
          title: projects[editIndex].title,
          description: projects[editIndex].description,
          coverImage: projects[editIndex].image,
          technologies: projects[editIndex].tags,
          gitRepo: projects[editIndex].gitRepo || "",
          liveLink: projects[editIndex].liveLink || ""
        } : undefined}
      />
    </div>
  );
}



