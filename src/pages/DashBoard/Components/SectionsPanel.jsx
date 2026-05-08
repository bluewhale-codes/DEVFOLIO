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
import { Button } from '../../../Components/Button';
import { SECTIONS } from '../CONSTANTS/sections';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../Components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../Components/ui/card";
import { Switch } from "../../../Components/ui/switch";
import { setSection } from "../../../store/slice/panelSlice";
import { useDispatch } from "react-redux";
export default function SectionsPanel({onclick}) {

  const dispatch = useDispatch();

  return (
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
                {SECTIONS.map((section) => (
                  <Card onClick={()=>{
                        
                        dispatch(setSection(section));

                  }}   key={section.id} className="cursor-pointer border-slate-200">
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
                          //onCheckedChange={() => toggleSection(section.id)}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              

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
  );
}
