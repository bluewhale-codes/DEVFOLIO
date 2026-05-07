import { useState } from "react";
import { Button } from "../../Components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../Components/ui/card";
import { Switch } from "../../Components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../Components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "../../Components/ui/avatar";
import { Separator } from "../../Components/ui/seperator";
import {
  Home,
  Briefcase,
  GraduationCap,
  Trophy,
  Settings,
  User,
  Layout,
  Palette,
  Plus,
  Monitor,
  Tablet,
  Smartphone,
  Eye,
  Share2,
  Save,
  Pencil,
  Code,
  Mail,
  FileText,
  Sparkles,
  Target,
  Award,
  Edit,
  
  
} from "lucide-react";
import EditPanel from "./Components/EditPanel";


export default function Workspace() {
  const [sections, setSections] = useState([
    { id: "hero", name: "Hero Section", icon: <Sparkles className="size-4" />, enabled: true },
    { id: "about", name: "About Me", icon: <User className="size-4" />, enabled: true },
    { id: "skills", name: "Skills", icon: <Target className="size-4" />, enabled: true },
    { id: "projects", name: "Projects", icon: <Code className="size-4" />, enabled: true },
    { id: "experience", name: "Experience", icon: <Briefcase className="size-4" />, enabled: true },
    { id: "education", name: "Education", icon: <GraduationCap className="size-4" />, enabled: true },
    { id: "achievements", name: "Achievements", icon: <Trophy className="size-4" />, enabled: true },
    { id: "contact", name: "Contact", icon: <Mail className="size-4" />, enabled: true },
  ]);
  const [editingSection, setEditingSection] = useState(false);
  



  const toggleSection = (id) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === id ? { ...section, enabled: !section.enabled } : section
      )
    );
  };

  return (
    <div className="h-screen bg-slate-50 flex flex-col overflow-hidden">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Edit Portfolio</h1>
          <p className="text-sm text-slate-500">Customize and build your portfolio</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-100 rounded-lg p-1">
            <Button variant="ghost" size="icon" className="size-8">
              <Monitor className="size-4" />
            </Button>
            <Button variant="ghost" size="icon" className="size-8">
              <Tablet className="size-4" />
            </Button>
            <Button variant="ghost" size="icon" className="size-8">
              <Smartphone className="size-4" />
            </Button>
          </div>
          <Button variant="outline" className="gap-2">
            <Eye className="size-4" />
            Preview
          </Button>
          <Button variant="outline" className="gap-2">
            <Share2 className="size-4" />
            Share
          </Button>
          <Button className="gap-2 bg-purple-600 hover:bg-purple-700">
            <Save className="size-4" />
            Save Changes
          </Button>
        </div>
      </header>

      {/* Main 3-Column Layout */}
      <div className="flex-1 flex overflow-hidden">
         
       
        {editingSection ? <EditPanel/> : <>
        
          <div className="w-96 bg-white border-r border-slate-200 flex flex-col">
          <Tabs defaultValue="sections" className="flex-1 flex flex-col">
            <TabsList className="w-full justify-start rounded-none border-b border-slate-200 bg-transparent p-0">
              <TabsTrigger
                value="sections"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-purple-600 data-[state=active]:bg-transparent"
              >
                <Layout className="size-4 mr-2" />
                Sections
              </TabsTrigger>
              <TabsTrigger
                value="theme"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-purple-600 data-[state=active]:bg-transparent"
              >
                <Palette className="size-4 mr-2" />
                Theme
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-purple-600 data-[state=active]:bg-transparent"
              >
                <Settings className="size-4 mr-2" />
                Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="sections" className="flex-1 overflow-y-auto p-6 m-0">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-1">Add & Manage Sections</h3>
                <p className="text-sm text-slate-500">Enable or disable sections in your portfolio</p>
              </div>

              <div className="space-y-2">
                {sections.map((section) => (
                  <Card onClick={()=>setEditingSection(true)} key={section.id} className="border-slate-200">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-purple-600">{section.icon}</div>
                        <span className="text-sm font-medium text-slate-700">{section.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="size-8">
                          <Settings className="size-4 text-slate-400" />
                        </Button>
                        <Switch
                          checked={section.enabled}
                          onCheckedChange={() => toggleSection(section.id)}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Button variant="outline" className="w-full mt-4 border-dashed border-2 gap-2">
                <Plus className="size-4" />
                Add New Section
              </Button>

              <p className="text-xs text-slate-500 mt-4 text-center">
                Drag and drop sections to reorder them
              </p>
            </TabsContent>

            <TabsContent value="theme" className="flex-1 overflow-y-auto p-6 m-0">
              <p className="text-sm text-slate-500">Theme customization options...</p>
            </TabsContent>

            <TabsContent value="settings" className="flex-1 overflow-y-auto p-6 m-0">
              <p className="text-sm text-slate-500">Portfolio settings...</p>
            </TabsContent>
          </Tabs>
        </div>
        
        
        </>}

        {/* Right Panel - Live Preview */}
        <div className="flex-1 bg-slate-100 overflow-y-auto p-6">
             +
        </div>
      </div>
    </div>
  );
}


function NavItem({ icon, label, active = false }) {
  return (
     <button
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition ${
        active
          ? "bg-purple-600 text-white"
          : "text-slate-300 hover:bg-slate-800 hover:text-white"
      }`}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}
