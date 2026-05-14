import { SettingsPanel } from "../../../Components/Themes/ProjectsSection/SettingsPanel";
import CardStylePanel from "../../../Components/Themes/ProjectsSection/CardStylePanel";
import ThemeSettingsPanel from "../../../Components/Themes/ProjectsSection/ThemeSettingsPanel";

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



export const SECTIONS = [
    { id: "hero", name: "Hero Section", icon: <Sparkles/>, enabled: true,features:{

       theme:{
            icon:<Layout className="size-4 mr-2" />,
            name:"Hero Themes",
            content:<ThemeSettingsPanel/>
       }
       

    }},
    { id: "About", name: "About Section", icon: <Sparkles/>, enabled: true,features:{

       theme:{
            icon:<Layout className="size-4 mr-2" />,
            name:"About Themes",
            content:<ThemeSettingsPanel/>
       }
       

    }},
    { id: "Skill", name: "Skill Section", icon: <Sparkles/>, enabled: true,features:{

       theme:{
            icon:<Layout className="size-4 mr-2" />,
            name:"Skill Themes",
            content:<ThemeSettingsPanel/>
       }
       

    }},
     { id: "projects", name: "Projects", icon:<Code/>, enabled: true,features:{
       layout:{
           icon:<Layout className="size-4 mr-2" />,
            name:"Layout",
            content:<SettingsPanel/>
       },
       
       cardTheme:{
            icon:<Palette className="size-4 mr-2" />,
            name:"Card Theme",
            content:<CardStylePanel/>
       },
       theme:{
            icon:<Palette className="size-4 mr-2" />,
            name:"Project Theme",
            content:<ThemeSettingsPanel/>
       },
    }},
    { id: "Achievement", name: "Achievement Section", icon: <Sparkles/>, enabled: true,features:{

       theme:{
            icon:<Layout className="size-4 mr-2" />,
            name:"Achievement Themes",
            content:<ThemeSettingsPanel/>
       }
       

    }},
    { id: "Contact", name: "Contact Section", icon: <Sparkles/>, enabled: true,features:{

       theme:{
            icon:<Layout className="size-4 mr-2" />,
            name:"Contact Themes",
            content:<ThemeSettingsPanel/>
       }
       

    }},
    
    
   ,
  ]