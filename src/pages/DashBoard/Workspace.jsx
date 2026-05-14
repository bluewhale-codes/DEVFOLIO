import { useState } from "react";
import { Button } from "../../Components/ui/Button";
import { Avatar, AvatarFallback, AvatarImage } from "../../Components/ui/avatar";
import { Separator } from "../../Components/ui/seperator";
import { SECTIONS } from "./CONSTANTS/sections";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../Components/ui/card";
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
import EditorWorkspace from "./Components/EditorWorkspace";
import SectionsPanel from "./Components/SectionsPanel";
import { useSelector , useDispatch } from "react-redux";
import { setSection } from "../../store/slice/panelSlice";
import FloatingToolbar from "./Components/FloatingToolbar";
import TypographyPanel from "./Components/TypographyPanel";
import {TypographyToolbar} from "./Components/TypographyToolbar";
import { saveChanges } from "../../store/slice/panelSlice";
import { useNavigate } from "react-router";
import SelectTextAnimation from "./Components/SelectTextAnimation";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription
} from "../../Components/ui/dialog"

export default function Workspace() {
  
  const [editingSection, setEditingSection] = useState(false);
  const {editMode,section,elementId,theme} = useSelector((state)=>state.panelSlice)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onclick = ()=>{
      setEditingSection(true);
  }

  const toggleSection = (id) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === id ? { ...section, enabled: !section.enabled } : section
      )
    );
  };
  const [panel,setPanel] = useState(false);
      
     const paneltoggle = ()=>{
      
          setPanel(!panel);
     }

  const saveThemeChanges = () =>{

       const id = section.id;
       dispatch(saveChanges({id,theme}))
  }

  return (
    <div className="h-screen bg-slate-50 flex flex-col overflow-hidden">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Edit Portfolio</h1>
          <p className="text-sm text-slate-500">Customize and build your portfolio</p>
          
        </div>
        <div className="flex items-center gap-3">
              <div>
                 <TypographyToolbar/>
              </div>
              
              
            
          <div className="flex items-center gap-2 bg-slate-100 rounded-lg p-1">
             <div >
              <FloatingToolbar toggle={paneltoggle} />
              {panel && <TypographyPanel  id={elementId} />}
            </div>
          </div>
          <Button onClick={()=>navigate("/preview")}variant="outline" className="cursor-pointer gap-2">
            <Eye className="size-4" />
            Preview
          </Button>
          <Button variant="outline" className="gap-2">
            <Share2 className="size-4" />
            Share
          </Button>
          <Button onClick={()=>saveThemeChanges()} className="cursor-pointer gap-2 bg-purple-600 hover:bg-purple-700">
            <Save className="size-4" />
            Save Changes
          </Button>
        </div>
      </header>

      {/* Main 3-Column Layout */}
      <div className="flex-1 flex overflow-hidden">
         
       
        {editMode ? <EditPanel/> : <>
        
          <SectionsPanel onclick={onclick}/>
        
        
        </>}

        {/* Right Panel - Live Preview */}
        <div className="flex-1 overflow-y-auto p-10">
           <div className="shadow-lg " style={{
                border:"1px solid black",
                borderRadius:"10px"
           }}>
            <EditorWorkspace/>

           </div>
          
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
