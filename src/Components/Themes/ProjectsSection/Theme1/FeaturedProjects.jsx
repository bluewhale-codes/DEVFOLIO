import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Star, Plus } from "lucide-react";
import ProjectCard from "./Components/ProjectCard";
import TapeSticker from "./Components/TapeSticker";
import HandDrawnArrow from "./Components/HandDrawnArrow";
import StampSeal from "./Components/StampSeal";
import ProjectForm from "./Components/ProjectForm";
import { Button } from "../../../ui/Button";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../../../ui/carousel";
import { ProjectLayout } from "../ProjectLayout";


export default function FeaturedProjects() {


  
  const image = "Hello world"
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

   
   const [layout,setLayout] = useState({
      alignment:"center",
      columns: 1,
      gap:12,
      imagePosition: "top",
      layoutType:"grid"
   })


  const {Layoutdata} = useSelector((state)=>state.panelSlice)
 
  const [projects, setProjects] = useState([
    {
      id: 1,
      image: "https://res.cloudinary.com/dycjjaxsk/image/upload/v1777366811/Avatars/Screenshot_2026-04-28_133411_zkhsdm.png",
      title: "Vintage Vibes",
      description: "A nostalgic journey through retro design patterns",
      tags: ["HTML", "CSS", "JavaScript"],
      accentColor: "bg-yellow-200",
      note: "Love this!",
      noteRotation: "-rotate-3",
      liveLink: "https://vintage-vibes.demo",
      githubLink: "https://github.com/username/vintage-vibes",
      timeline: { start: "3 Jan", end: "15 Feb" }
    },
    {
      id: 2,
      image: "https://res.cloudinary.com/dycjjaxsk/image/upload/v1777366811/Avatars/Screenshot_2026-04-28_133411_zkhsdm.png",
      title: "Action Portfolio",
      description: "Dynamic showcase of motion and interaction design",
      tags: ["React", "Next.js", "Tailwind"],
      accentColor: "bg-purple-300",
      noteRotation: "rotate-2",
      liveLink: "https://action-portfolio.demo",
      githubLink: "https://github.com/username/action-portfolio",
      timeline: { start: "20 Feb", end: "30 Mar" }
    },
    {
      id: 3,
      image: "https://res.cloudinary.com/dycjjaxsk/image/upload/v1777366811/Avatars/Screenshot_2026-04-28_133411_zkhsdm.png",
      title: "Modern Workspace",
      description: "Clean and minimal productivity dashboard",
      tags: ["TypeScript", "Node.js", "MongoDB"],
      accentColor: "bg-blue-200",
      note: "Nice!",
      noteRotation: "rotate-1",
      liveLink: "https://modern-workspace.demo",
      githubLink: "https://github.com/username/modern-workspace",
      timeline: { start: "3 Jan", end: "7 Apr" }
    }
  ]);

  const handleAddProject = (projectData) => {
    const newProject = {
      ...projectData,
      id: Date.now()
    };
    setProjects([...projects, newProject]);
    toast.success("Project added successfully!", {
      description: "Your new project has been added to the portfolio."
    });
  };

  const handleEditProject = (projectData) => {
    setProjects(projects.map(p =>
      p.id === editingProject.id ? { ...projectData, id: p.id } : p
    ));
    setEditingProject(null);
    toast.success("Project updated!", {
      description: "Your project has been updated successfully."
    });
  };

  const handleDeleteProject = (projectId) => {
    setProjects(projects.filter(p => p.id !== projectId));
    toast.success("Project deleted!", {
      description: "The project has been removed from your portfolio."
    });
  };

  const openEditForm = (project) => {
    setEditingProject(project);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingProject(null);
  };

  useEffect(()=>{
      
            setLayout({
                 alignment:Layoutdata.alignment,
                columns:Layoutdata.columns,
                gap:Layoutdata.gap,
                imagePosition:Layoutdata.imagePosition,
                layoutType:Layoutdata.layoutType
            });


       
  },[Layoutdata])

  return (
    <div className="min-h-screen bg-[#f5f1e8] relative overflow-hidden">
      {/* Background texture overlay */}
      <div className="absolute inset-0 opacity-30 mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E")`
        }}
      />

      <div className="relative max-w-7xl mx-auto px-8 py-16">
        {/* Add Project Button */}
        <div className="flex justify-center mb-12">
          <Button
            onClick={() => setIsFormOpen(true)}
            size="lg"
            className="bg-gradient-to-r from-orange-400 to-red-400 hover:from-orange-500 hover:to-red-500 text-white font-bold uppercase tracking-wide shadow-lg hover:shadow-xl h-14 px-8"
            asChild
          >
            <motion.button
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus className="w-6 h-6 mr-2" />
              Add Project
            </motion.button>
          </Button>
        </div>

        {/* Header Section */}
        <div className="mb-16">
          <TapeSticker text="MY WORK" className="mb-6" />

          <div className="flex items-start justify-between">
            <h1 className="text-7xl font-black uppercase tracking-tight text-gray-900">
              Featured<br />Projects
            </h1>

            <div className="relative mt-8">
              <div className="font-handwriting text-lg text-gray-700 italic -rotate-2">
                Ideas turned into<br />impactful solutions
              </div>
              <HandDrawnArrow className="absolute -right-12 top-8" />
            </div>
          </div>
        </div>

        {/* Project Cards */}
       
          {/* {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onEdit={() => openEditForm(project)}
              onDelete={() => handleDeleteProject(project.id)}
            />
          ))} */}

        <div>
             <ProjectLayout layout={layout.layoutType} columns={layout.columns} gap={layout.gap} projects={projects}/>
        </div>
       
       

        {/* Project Form Modal */}
        <ProjectForm
          isOpen={isFormOpen}
          onClose={closeForm}
          onSubmit={editingProject ? handleEditProject : handleAddProject}
          initialData={editingProject}
        />

        {/* Bottom Section */}
        <div className="flex items-center justify-between">
          <Button
            size="lg"
            variant="outline"
            className="group border-3 border-gray-900 bg-white hover:bg-gray-900 hover:text-white font-bold uppercase tracking-wide h-14"
            asChild
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              See All Work
              <ArrowRight className="group-hover:translate-x-1 transition-transform ml-2" />
            </motion.button>
          </Button>

          <StampSeal />
        </div>

        {/* Decorative doodles */}
        <motion.div
          animate={{ rotate: [0, 5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-32 right-12"
        >
          <Star className="w-8 h-8 text-orange-400 fill-orange-200" />
        </motion.div>

        <motion.div
          animate={{ rotate: [0, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute bottom-32 left-24"
        >
          <Star className="w-6 h-6 text-blue-400 fill-blue-200" />
        </motion.div>
      </div>
    </div>
  );
}
