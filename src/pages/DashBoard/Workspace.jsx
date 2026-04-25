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
  
  
} from "lucide-react";


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
        {/* Left Sidebar */}
        {/* <aside className="w-64 bg-slate-900 text-white flex flex-col">
          <div className="p-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
              Devfolio
            </h2>
          </div>

          <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
            <NavItem icon={<Home className="size-5" />} label="Overview" />
            <NavItem icon={<Code className="size-5" />} label="Projects" />
            <NavItem icon={<Briefcase className="size-5" />} label="Experience" />
            <NavItem icon={<GraduationCap className="size-5" />} label="Education" />
            <NavItem icon={<Trophy className="size-5" />} label="Achievements" />
            <NavItem icon={<Settings className="size-5" />} label="Settings" />

            <div className="pt-4">
              <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Customize
              </p>
              <NavItem icon={<Pencil className="size-5" />} label="Edit Portfolio" active />
            </div>
          </nav>

          <div className="p-4 space-y-4">
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="size-4 text-purple-400" />
                  <p className="text-sm font-medium">Portfolio Progress</p>
                </div>
                <p className="text-2xl font-bold text-purple-400 mb-2">80%</p>
                <Progress value={80} className="h-2 mb-3" />
                <p className="text-xs text-slate-400 mb-3">Your portfolio is almost complete!</p>
                <Button size="sm" className="w-full bg-purple-600 hover:bg-purple-700">
                  Complete Now
                </Button>
              </CardContent>
            </Card>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800">
              <Avatar className="size-10">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" />
                <AvatarFallback>VS</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Vishal Shakya</p>
                <p className="text-xs text-slate-400 truncate">vishal@devfolio.com</p>
              </div>
            </div>
          </div>
        </aside> */}

        {/* Middle Panel - Customization */}
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
                  <Card key={section.id} className="border-slate-200">
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

        {/* Right Panel - Live Preview */}
        <div className="flex-1 bg-slate-100 overflow-y-auto p-6">
          <Card className="max-w-6xl mx-auto shadow-2xl overflow-hidden">
            {/* Preview Portfolio */}
            <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative">
              {/* Navbar */}
              <nav className="bg-slate-900/50 backdrop-blur-sm border-b border-white/10 px-8 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="size-8 bg-purple-600 rounded-lg flex items-center justify-center">
                      <Code className="size-5 text-white" />
                    </div>
                    <span className="font-bold text-white">VS</span>
                  </div>
                  <div className="hidden md:flex items-center gap-6 text-sm text-slate-300">
                    <a href="#" className="hover:text-white transition">Home</a>
                    <a href="#" className="hover:text-white transition">About</a>
                    <a href="#" className="hover:text-white transition">Skills</a>
                    <a href="#" className="hover:text-white transition">Projects</a>
                    <a href="#" className="hover:text-white transition">Education</a>
                    <a href="#" className="hover:text-white transition">Contact</a>
                  </div>
                  {/* <Button size="sm" variant="outline" className="gap-2 border-purple-500 text-white hover:bg-purple-600">
                    <Download className="size-4" />
                    Download Resume
                  </Button> */}
                </div>
              </nav>

              {/* Hero Section */}
              <div className="px-8 py-16 grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="inline-block">
                    <span className="text-sm font-semibold text-purple-400 tracking-wider">
                      HELLO, I'M
                    </span>
                  </div>
                  <div>
                    <h1 className="text-5xl font-bold text-white mb-2">Vishal Shakya</h1>
                    <p className="text-2xl text-purple-400 font-medium">Full Stack Developer</p>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    Passionate developer with expertise in building scalable web applications.
                    I specialize in modern JavaScript frameworks and cloud technologies to create
                    exceptional user experiences.
                  </p>
                  <div className="flex gap-4">
                    <Button className="bg-purple-600 hover:bg-purple-700">View My Work</Button>
                    <Button variant="outline" className="border-purple-500 text-white hover:bg-purple-600">
                      Contact Me
                    </Button>
                  </div>
                  <div className="flex gap-4 pt-4">
                    {/* <a href="#" className="text-slate-400 hover:text-purple-400 transition">
                      <Github className="size-5" />
                    </a> */}
                    {/* <a href="#" className="text-slate-400 hover:text-purple-400 transition">
                      <Linkedin className="size-5" />
                    </a>
                    <a href="#" className="text-slate-400 hover:text-purple-400 transition">
                      <Twitter className="size-5" />
                    </a> */}
                  </div>
                </div>

                <div className="relative">
                  <div className="relative z-10">
                    <div className="size-80 mx-auto rounded-full overflow-hidden border-4 border-purple-500 shadow-2xl shadow-purple-500/50">
                      <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
                        alt="Profile"
                        className="size-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="absolute top-10 right-0 z-20">
                    <Card className="bg-slate-800/90 backdrop-blur border-purple-500/50 shadow-xl">
                      <CardContent className="p-4">
                        <p className="text-2xl font-bold text-purple-400">3+</p>
                        <p className="text-xs text-slate-300">Years Experience</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="absolute bottom-10 left-0 z-20">
                    <Card className="bg-slate-800/90 backdrop-blur border-purple-500/50 shadow-xl">
                      <CardContent className="p-4">
                        <p className="text-2xl font-bold text-purple-400">10+</p>
                        <p className="text-xs text-slate-300">Projects Completed</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>

            {/* About Me Section */}
            <div className="bg-white p-8">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">About Me</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  I'm a passionate Full Stack Developer with over 3 years of experience in building
                  modern web applications. I love turning complex problems into simple, beautiful,
                  and intuitive solutions.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  When I'm not coding, you'll find me exploring new technologies, contributing to
                  open source, or sharing my knowledge through technical writing and mentorship.
                </p>
              </div>
            </div>

            {/* Skills Section */}
            <div className="bg-slate-50 p-8">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {["React", "Node.js", "MongoDB", "TypeScript", "Tailwind CSS", "Next.js", "Express", "PostgreSQL", "AWS", "Docker", "Git", "REST APIs"].map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Projects Section Preview */}
            <div className="bg-white p-8">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Featured Projects</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {[1, 2].map((i) => (
                    <Card key={i} className="border-slate-200 overflow-hidden hover:shadow-lg transition">
                      <div className="h-48 bg-gradient-to-br from-purple-500 to-purple-700" />
                      <CardHeader>
                        <CardTitle>Project {i}</CardTitle>
                        <CardDescription>
                          A full-stack application built with React and Node.js
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </Card>
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
