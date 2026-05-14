import React ,{useState} from 'react'
import { ArrowLeft } from 'lucide-react';
import { Button } from '../../../Components/Button';
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../../Components/ui/tabs';
import { SettingsPanel } from '../../../Components/Themes/ProjectsSection/SettingsPanel';
import CardStylePanel from '../../../Components/Themes/ProjectsSection/CardStylePanel';
import ThemeSettingsPanel from '../../../Components/Themes/ProjectsSection/ThemeSettingsPanel';
import { useSelector,useDispatch } from 'react-redux';
import { resetSectionDetails } from '../../../store/slice/panelSlice';

const EditPanel = () => {
  const [sectionFeatures, setSectionFeatrues] = useState({})
  const dispatch = useDispatch();
  const {features} = useSelector((state)=>state.panelSlice.section);
  
  console.log(Object.entries(features)[0][0]);
  return (

    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-3 border-b border-neutral-200">
        <button
          onClick={()=>dispatch(resetSectionDetails())}
          className="cursor-pointer flex items-center gap-2 text-sm text-neutral-600 hover:text-purple-600 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Sections
        </button>
       
      </div>
    <div className="w-96 bg-white border-r border-slate-200 flex flex-col">
          <Tabs defaultValue={Object.entries(features)[0][0]} className="flex-1 flex flex-col">
            <TabsList className="w-full justify-start rounded-none border-b border-slate-200 bg-transparent p-0">
              {/* <TabsTrigger
                value="sections"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-purple-600 data-[state=active]:bg-transparent"
              >
                <Layout className="size-4 mr-2" />
                Layout
              </TabsTrigger>
              <TabsTrigger
                value="theme"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-purple-600 data-[state=active]:bg-transparent"
              >
                <Palette className="size-4 mr-2" />
                Card Theme
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-purple-600 data-[state=active]:bg-transparent"
              >
                <Settings className="size-4 mr-2" />
                Project Theme
              </TabsTrigger> */}

               {Object.entries(features).map(([key,value])=>(

                  <TabsTrigger
                  key={key}
                    value={key}
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-purple-600 data-[state=active]:bg-transparent"
                  >
                    {value.icon}
                    {value.name}
                  </TabsTrigger>

               ))}
         
            </TabsList>

           
               {Object.entries(features).map(([key,value])=>(

                    <TabsContent value={key}  key={key}className="flex-1 overflow-y-auto m-0">
                      {value.content}
                    </TabsContent>

               ))}

          </Tabs>
        </div>

        </div>
  )
}

export default EditPanel