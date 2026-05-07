import { motion, AnimatePresence } from "motion/react";
import { X, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { Input } from "../../../../ui/input";
import { Label } from "../../../../ui/label";
import { Textarea } from "../../../../ui/textarea";
import { Button } from "../../../../ui/Button";


export function AddProjectModal({
  isOpen,
  onClose,
  onSubmit,
  editMode = false,
  editIndex,
  initialData
}) {
  const [formData, setFormData] = useState({
    title: "",
    coverImage: "",
    technologies: [],
    gitRepo: "",
    liveLink: "",
    description: ""
  });
  const [techInput, setTechInput] = useState("");

  useEffect(() => {
    if (editMode && initialData) {
      setFormData(initialData);
    } else if (!isOpen) {
      setFormData({
        title: "",
        coverImage: "",
        technologies: [],
        gitRepo: "",
        liveLink: "",
        description: ""
      });
    }
  }, [editMode, initialData, isOpen]);

  const handleAddTech = () => {
    if (techInput.trim() && !formData.technologies.includes(techInput.trim())) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, techInput.trim()]
      });
      setTechInput("");
    }
  };

  const handleRemoveTech = (tech) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter(t => t !== tech)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, editIndex);
    setFormData({
      title: "",
      coverImage: "",
      technologies: [],
      gitRepo: "",
      liveLink: "",
      description: ""
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-black border-2 border-[#CCFF00] rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-[0_0_50px_rgba(204,255,0,0.3)]">
              {/* Header */}
              <div className="bg-[#CCFF00] px-6 py-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-black uppercase tracking-wider">
                  {editMode ? "Edit Project" : "Add New Project"}
                </h2>
                <button
                  onClick={onClose}
                  className="p-1 hover:bg-black/10 rounded transition-colors"
                >
                  <X className="w-6 h-6 text-black" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-80px)] space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <Label className="text-[#CCFF00] font-bold uppercase text-sm tracking-wider">
                    Project Title
                  </Label>
                  <Input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="bg-transparent border-2 border-[#CCFF00]/30 text-white focus:border-[#CCFF00] focus-visible:ring-[#CCFF00]/50"
                    placeholder="Enter project name"
                  />
                </div>

                {/* Cover Image */}
                <div className="space-y-2">
                  <Label className="text-[#CCFF00] font-bold uppercase text-sm tracking-wider">
                    Cover Image URL
                  </Label>
                  <Input
                    type="url"
                    required
                    value={formData.coverImage}
                    onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                    className="bg-transparent border-2 border-[#CCFF00]/30 text-white focus:border-[#CCFF00] focus-visible:ring-[#CCFF00]/50"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                {/* Technologies */}
                <div className="space-y-2">
                  <Label className="text-[#CCFF00] font-bold uppercase text-sm tracking-wider">
                    Technologies Used
                  </Label>
                  <div className="flex gap-2 mb-3">
                    <Input
                      type="text"
                      value={techInput}
                      onChange={(e) => setTechInput(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTech())}
                      className="flex-1 bg-transparent border-2 border-[#CCFF00]/30 text-white focus:border-[#CCFF00] focus-visible:ring-[#CCFF00]/50"
                      placeholder="e.g., React, Node.js, MongoDB"
                    />
                    <Button
                      type="button"
                      onClick={handleAddTech}
                      className="bg-[#CCFF00] text-black font-bold hover:bg-[#B8E600]"
                    >
                      <Plus className="w-5 h-5" />
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-[#CCFF00]/20 border border-[#CCFF00] text-[#CCFF00] rounded-full text-sm font-medium flex items-center gap-2"
                      >
                        {tech}
                        <button
                          type="button"
                          onClick={() => handleRemoveTech(tech)}
                          className="hover:text-white transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Git Repo */}
                <div className="space-y-2">
                  <Label className="text-[#CCFF00] font-bold uppercase text-sm tracking-wider">
                    GitHub Repository
                  </Label>
                  <Input
                    type="url"
                    required
                    value={formData.gitRepo}
                    onChange={(e) => setFormData({ ...formData, gitRepo: e.target.value })}
                    className="bg-transparent border-2 border-[#CCFF00]/30 text-white focus:border-[#CCFF00] focus-visible:ring-[#CCFF00]/50"
                    placeholder="https://github.com/username/repo"
                  />
                </div>

                {/* Live Link */}
                <div className="space-y-2">
                  <Label className="text-[#CCFF00] font-bold uppercase text-sm tracking-wider">
                    Live Demo Link
                  </Label>
                  <Input
                    type="url"
                    required
                    value={formData.liveLink}
                    onChange={(e) => setFormData({ ...formData, liveLink: e.target.value })}
                    className="bg-transparent border-2 border-[#CCFF00]/30 text-white focus:border-[#CCFF00] focus-visible:ring-[#CCFF00]/50"
                    placeholder="https://your-project.com"
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label className="text-[#CCFF00] font-bold uppercase text-sm tracking-wider">
                    Project Description
                  </Label>
                  <Textarea
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="bg-transparent border-2 border-[#CCFF00]/30 text-white focus:border-[#CCFF00] focus-visible:ring-[#CCFF00]/50 resize-none"
                    placeholder="Describe your project..."
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-[#CCFF00] text-black font-bold py-6 hover:bg-[#B8E600] uppercase tracking-wider text-lg shadow-[0_0_30px_rgba(204,255,0,0.5)] hover:shadow-[0_0_40px_rgba(204,255,0,0.7)]"
                >
                  {editMode ? "Update Project" : "Create Project"}
                </Button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
