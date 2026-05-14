import { useState } from 'react';
import { Slider } from '../../ui/slider';
import TemplateModal from './TemplateModal';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../ui/select';
import { Label } from '../../ui/label';
import { Button } from '../../ui/Button';
import { useSelector } from 'react-redux';
import {
  Sparkles,
  Square,
  Box,
  Palette
} from 'lucide-react';
import { HeroSectionTemplates , ProjectSectionTemplates , AboutSectionTemplates, SkillSectionTemplates, AchievementSectionTemplates, ContactSectionTemplates } from '../../../TemplatesRegistry/templateRegistry';
import HoverCard from '../../../pages/DashBoard/Background/Component/HoverCard';
import {gradientBackground} from '../../../pages/DashBoard/Background/backgroundGradient';
export default function ThemeSettingsPanel() {
  const [selectedTheme, setSelectedTheme] = useState('minimal');
  const [theme,setTheme] = useState({});
  const [backgroundType, setBackgroundType] = useState('image');
  const [overlay, setOverlay] = useState([40]);
  const [attachment, setAttachment] = useState('cover');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cards = Array.from({ length: 20 });

  let template;
  const {section}  = useSelector((state)=>state.panelSlice);

  if(section.name==="Projects"){
    template=ProjectSectionTemplates;
  }
  if(section.name==="Hero Section"){
    template=HeroSectionTemplates;
  }
  if(section.name==="About Section"){
    template=AboutSectionTemplates;
  }
  if(section.name==="Skill Section"){
     template=SkillSectionTemplates
  }
  if(section.name==="Achievement Section"){
     template=AchievementSectionTemplates
  }
  if(section.name==="Contact Section"){
     template=ContactSectionTemplates
  }
  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-2xl shadow-sm p-6 overflow-y-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">
          Theme
        </h2>
        <p className="text-xs text-gray-500">
          Choose a theme for this section.
        </p>
      </div>

      {/* Theme Presets */}
      <div className="mb-6">
        <Label className="text-sm font-medium text-gray-700 mb-3 block">
          Theme Presets
        </Label>
        <div className="grid grid-cols-3 gap-3">
          {Object.entries(template).map(([key,value]) => {
            
            const isSelected = selectedTheme === value.id;

          
            return (
              <div
                style={{
                  backgroundImage: `url(${value.coverImage})`,
                  width:"100px",
                  height:"100px"
                }}
                key={value.id}
                onClick={() => {
                  setSelectedTheme(value.id)
                   setIsModalOpen(true);
                   setTheme(value);
                }}
                className={`
                  cursor-pointer h-screen bg-cover bg-center flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all aspect-square
                  
                  ${isSelected
                    ? 'border-[#6C63FF]'
                    : 'border-gray-200 hover:border-gray-300'
                  }
                `}
              >
                
              
              </div>
            );
          })}
        </div>
      </div>

      {/* Custom Background */}
      <div className="mb-6">
        <Label className="text-sm font-medium text-gray-700 mb-3 block">
          Custom Background
        </Label>

        {/* Segmented Control */}
        <div className="inline-flex bg-gray-50 rounded-lg p-1 border border-gray-500 mb-4">
          {['color', 'gradient', 'image'].map((type) => (
            <button
              key={type}
              onClick={() => setBackgroundType(type)}
              className={`
                cursor-pointer px-4 py-1.5 rounded-md text-xs font-medium transition-all capitalize
                ${backgroundType === type
                  ? 'bg-white text-[#6C63FF] shadow-sm border border-[#6C63FF]'
                  : 'text-gray-600 hover:text-gray-900'
                }
              `}
            >
              {type}
            </button>
          ))}
        </div>


        {backgroundType === "gradient" && (


        <div className="h-[300px] overflow-y-auto rounded-2xl p-4 ">
        
                {/* Cards Wrapper */}
                <div className="flex flex-wrap gap-4">
                  {gradientBackground.map((item, index) => (
                    <HoverCard background={item}/>
                  ))}
                </div>
       </div>

        )}

        {/* Image Preview */}
        {backgroundType === 'image' && (
          <div>
            <div className="w-full h-40 rounded-2xl overflow-hidden mb-3">
              <img
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
                alt="Mountain landscape at sunset"
                className="w-full h-full object-cover"
              />
            </div>
            <Button
              variant="outline"
              className="w-full rounded-lg border-gray-300 text-[#6C63FF] hover:bg-purple-50 hover:border-[#6C63FF]"
            >
              Change Image
            </Button>
          </div>
        )}
      </div>

      {/* Overlay */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <Label className="text-sm font-medium text-gray-700">
            Overlay
          </Label>
          <span className="text-sm font-medium text-gray-500">
            {overlay[0]}%
          </span>
        </div>
        <Slider
          value={overlay}
          onValueChange={setOverlay}
          min={0}
          max={100}
          step={5}
          className="w-full [&_[data-slot=slider-range]]:bg-[#6C63FF] [&_[data-slot=slider-thumb]]:border-[#6C63FF]"
        />
      </div>

      {/* Background Attachment */}
      <div className="mb-2">
        <Label className="text-sm font-medium text-gray-700 mb-3 block">
          Background Attachment
        </Label>
        <Select value={attachment} onValueChange={setAttachment}>
          <SelectTrigger className="w-full bg-gray-50 border-gray-200 rounded-lg hover:border-[#6C63FF] focus:border-[#6C63FF]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cover">Cover</SelectItem>
            <SelectItem value="contain">Contain</SelectItem>
            <SelectItem value="fill">Fill</SelectItem>
            <SelectItem value="scale-down">Scale Down</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setIsModalOpen(false)}
          />
          <TemplateModal template={theme} onClose={() => setIsModalOpen(false)} />
        </div>
      )}
    </div>
  );
}
