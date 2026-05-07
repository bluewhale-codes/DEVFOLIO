import { useState, useRef } from "react";
import { motion } from "motion/react";
import { X, Plus, Upload, Calendar as CalendarIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../../ui/dialog";
import { Input } from "../../../../ui/input";
import { Label } from "../../../../ui/label";
import { Textarea } from "../../../../ui/textarea";
import { Button } from "../../../../ui/Button";
import { Badge } from "../../../../ui/badge";
import { ScrollArea } from "../../../../ui/scroll-area";
import { Separator } from "../../../../ui/separator";

export default function ProjectForm({ isOpen, onClose, onSubmit, initialData = null }) {
  const [formData, setFormData] = useState(initialData || {
    title: "",
    image: "",
    description: "",
    liveLink: "",
    githubLink: "",
    tags: [],
    timeline: { start: "", end: "" },
    accentColor: "bg-yellow-200",
    note: "",
    noteRotation: "-rotate-2"
  });

  const [currentTag, setCurrentTag] = useState("");
  const [imagePreview, setImagePreview] = useState(initialData?.image || "");
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        setImagePreview(result);
        setFormData({ ...formData, image: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, currentTag.trim()] });
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData({ ...formData, tags: formData.tags.filter(tag => tag !== tagToRemove) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const accentColors = [
    { name: "Yellow", value: "bg-yellow-200" },
    { name: "Purple", value: "bg-purple-300" },
    { name: "Blue", value: "bg-blue-200" },
    { name: "Pink", value: "bg-pink-200" },
    { name: "Green", value: "bg-green-200" },
    { name: "Orange", value: "bg-orange-200" }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] p-0 bg-[#f5f1e8] border-3 border-gray-900">
        <DialogHeader className="px-6 pt-6 pb-4 border-b-2 border-gray-900/20">
          <DialogTitle className="text-3xl font-black uppercase tracking-tight">
            {initialData ? "Edit Project" : "Add New Project"}
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-100px)]">
          <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-6">
            {/* Project Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-bold uppercase">
                Project Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter project title"
                className="border-2 border-gray-900 focus-visible:ring-orange-400"
              />
            </div>

            {/* Project Cover Image */}
            <div className="space-y-2">
              <Label htmlFor="image" className="text-sm font-bold uppercase">
                Project Cover Image <span className="text-red-500">*</span>
              </Label>
              <div className="space-y-3">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full border-2 border-dashed border-gray-900 hover:bg-gray-100"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Upload Image
                </Button>
                {imagePreview && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative w-full h-48 bg-white p-3 rounded-lg border-2 border-gray-900 overflow-hidden"
                  >
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover rounded"
                    />
                  </motion.div>
                )}
              </div>
            </div>

            {/* Project Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-bold uppercase">
                Project Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your project"
                className="min-h-[100px] border-2 border-gray-900 focus-visible:ring-orange-400"
              />
            </div>

            {/* Timeline */}
            <div className="space-y-2">
              <Label className="text-sm font-bold uppercase flex items-center gap-2">
                <CalendarIcon className="w-4 h-4" />
                Timeline <span className="text-red-500">*</span>
              </Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate" className="text-xs text-gray-600">
                    Start Date
                  </Label>
                  <Input
                    id="startDate"
                    required
                    value={formData.timeline.start}
                    onChange={(e) => setFormData({
                      ...formData,
                      timeline: { ...formData.timeline, start: e.target.value }
                    })}
                    placeholder="e.g., 3 Jan"
                    className="border-2 border-gray-900 focus-visible:ring-orange-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate" className="text-xs text-gray-600">
                    End Date
                  </Label>
                  <Input
                    id="endDate"
                    required
                    value={formData.timeline.end}
                    onChange={(e) => setFormData({
                      ...formData,
                      timeline: { ...formData.timeline, end: e.target.value }
                    })}
                    placeholder="e.g., 7 Apr"
                    className="border-2 border-gray-900 focus-visible:ring-orange-400"
                  />
                </div>
              </div>
            </div>

            <Separator className="bg-gray-900/20" />

            {/* Live Demo Link */}
            <div className="space-y-2">
              <Label htmlFor="liveLink" className="text-sm font-bold uppercase">
                Live Demo Link
              </Label>
              <Input
                id="liveLink"
                type="url"
                value={formData.liveLink}
                onChange={(e) => setFormData({ ...formData, liveLink: e.target.value })}
                placeholder="https://your-project.com"
                className="border-2 border-gray-900 focus-visible:ring-orange-400"
              />
            </div>

            {/* GitHub Repo Link */}
            <div className="space-y-2">
              <Label htmlFor="githubLink" className="text-sm font-bold uppercase">
                GitHub Repository Link
              </Label>
              <Input
                id="githubLink"
                type="url"
                value={formData.githubLink}
                onChange={(e) => setFormData({ ...formData, githubLink: e.target.value })}
                placeholder="https://github.com/username/repo"
                className="border-2 border-gray-900 focus-visible:ring-orange-400"
              />
            </div>

            <Separator className="bg-gray-900/20" />

            {/* Tech Skills */}
            <div className="space-y-3">
              <Label className="text-sm font-bold uppercase">
                Tech Stack
              </Label>
              <div className="flex gap-2">
                <Input
                  type="text"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                  placeholder="e.g., HTML, CSS, React"
                  className="border-2 border-gray-900 focus-visible:ring-orange-400"
                />
                <Button
                  type="button"
                  onClick={addTag}
                  className="bg-gray-900 hover:bg-orange-500"
                >
                  <Plus className="w-5 h-5" />
                </Button>
              </div>
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 p-3 bg-white/50 rounded-lg border border-gray-200">
                  {formData.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="px-3 py-1 bg-gray-900 text-white hover:bg-red-500 cursor-pointer text-sm"
                      onClick={() => removeTag(tag)}
                    >
                      {tag} <X className="w-3 h-3 ml-1 inline" />
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Accent Color */}
            <div className="space-y-3">
              <Label className="text-sm font-bold uppercase">
                Accent Color
              </Label>
              <div className="flex gap-3 flex-wrap">
                {accentColors.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, accentColor: color.value })}
                    className={`w-14 h-14 rounded-full ${color.value} border-3 ${
                      formData.accentColor === color.value ? "border-gray-900 scale-110" : "border-gray-300"
                    } hover:border-gray-600 transition-all shadow-md hover:shadow-lg`}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Sticky Note */}
            <div className="space-y-2">
              <Label htmlFor="note" className="text-sm font-bold uppercase">
                Sticky Note <span className="text-xs text-gray-500 normal-case">(Optional)</span>
              </Label>
              <Input
                id="note"
                type="text"
                value={formData.note}
                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                placeholder="e.g., Love this!, Nice!, Awesome!"
                className="border-2 border-gray-900 focus-visible:ring-orange-400"
              />
            </div>

            <Separator className="bg-gray-900/20" />

            {/* Submit Button */}
            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                className="flex-1 bg-gray-900 hover:bg-orange-500 font-bold uppercase h-12"
              >
                {initialData ? "Update Project" : "Add Project"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="border-2 border-gray-900 hover:bg-gray-100 font-bold uppercase h-12 px-8"
              >
                Cancel
              </Button>
            </div>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
