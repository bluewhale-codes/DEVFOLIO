import { useState, forwardRef, useEffect } from "react";
import { useDispatch , useSelector } from "react-redux";
import { setStyle } from "../../../store/slice/panelSlice";
import ShadowIcon from "../../../assets/ShadowIcon.svg"
import {
  Type,
  Bold,
  ChevronDown,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Sparkles,
} from "lucide-react";
import { Button } from "../../../Components/ui/Button";
import { ToggleGroup, ToggleGroupItem } from "../../../Components/ui/toggle-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../Components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../Components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../Components/ui/select";
import * as Slider from '@radix-ui/react-slider';
const FONT_FAMILIES = [
    "inter",
"poppins",
"outfit",
"space",
"dmSans",
"manrope",
"jakarta",
"urbanist",
"sora",
"workSans",
"playfair",
"merriweather",
"lora",
"baskerville",
"crimson",
"bebas",
"anton",
"oswald",
"raleway",
"cabin"
  ];


import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription
} from "../../../Components/ui/dialog"
import SelectTextAnimation from "./SelectTextAnimation";
import ShadowControlPanel from "./ShadowControlPanel";

const FONT_WEIGHTS = [
  { label: "Thin", value: "300" },
  { label: "Light", value: "400" },
  { label: "Regular", value: "500" },
  { label: "Medium", value: "600" },
  { label: "Semibold", value: "700" },
  { label: "Bold", value: "900" },
 
];

const COLOR_PRESETS = [
  "#8B5CF6", // Purple
  "#EC4899", // Pink
  "#EF4444", // Red
  "#F59E0B", // Amber
  "#10B981", // Green
  "#3B82F6", // Blue
  "#6366F1", // Indigo
  "#8B5CF6", // Violet
  "#000000", // Black
  "#FFFFFF", // White
];

export function TypographyToolbar({color,size,weight}) {


  const [fontSize, setFontSize] = useState(20);
  const [fontFamily, setFontFamily] = useState('inter');
  const [selectedColor, setSelectedColor] = useState("#8B5CF6");
  const [fontWeight, setFontWeight] = useState(500);
  const [alignment, setAlignment] = useState('center');
  const {elementId} = useSelector((state)=>state.panelSlice);
  const [textAnimation,setTextAnimation] = useState("SlideReveal");
  const [shadow,setShadow] = useState({});
  


  const dispatch = useDispatch();
  

  useEffect(()=>{
       dispatch(setStyle({
        fontsize:fontSize,
        fontFamily:fontFamily,
        setFontFamily:setFontFamily,
        selectedColor:selectedColor,
        fontWeight:fontWeight,
        alignment:alignment,
        animation:textAnimation,
        id:elementId,
        shadow:shadow
       }));
    },[fontSize,fontFamily,selectedColor,fontWeight,alignment,textAnimation,shadow])

  return (
    <div className="relative z-10">
      {/* Main toolbar container */}
      <div
        className="z-50 bg-[#1f1f1f] rounded-2xl shadow-2xl px-4 py-1 flex items-center gap-3"
        
      >
        {/* Color Picker */}
        <ToolCard>
          <Popover>
            <PopoverTrigger className="flex items-center gap-2 hover:opacity-80 transition-opacity focus:outline-none">
              <div
                className="w-4 h-4 rounded-full"
                style={{
                  backgroundColor: selectedColor,
                  boxShadow: `0 0 10px ${selectedColor}50`,
                }}
              ></div>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </PopoverTrigger>
            <PopoverContent className="w-64 bg-black/90 backdrop-blur-xl border-white/10">
              <div className="space-y-3">
                <div className="text-sm text-white">Pick a color</div>
                <div className="grid grid-cols-5 gap-2">
                  {COLOR_PRESETS.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className="w-10 h-10 rounded-lg border-2 transition-all hover:scale-110"
                      style={{
                        backgroundColor: color,
                        borderColor:
                          selectedColor === color ? "#8B5CF6" : "transparent",
                      }}
                    />
                  ))}
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-gray-400">Custom Color</label>
                  <input
                    type="color"
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                    className="w-full h-10 rounded-lg cursor-pointer bg-transparent"
                  />
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </ToolCard>

        {/* Shadow Picker */}
        <ToolCard>
          <Popover>
            <PopoverTrigger className="cursor-pointer flex items-center gap-2 hover:opacity-80 transition-opacity focus:outline-none">
                <img src={ShadowIcon} alt="Logo" className="w-20 h-8" />
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </PopoverTrigger>
            <PopoverContent className="w-[300px] max-w-2xl bg-gradient-to-br from-[#0f172a]/90 to-[#1e293b]/80 rounded-[20px] border border-white/10 shadow-[0_0_80px_rgba(139,92,246,0.15),inset_0_1px_1px_rgba(255,255,255,0.1)] backdrop-blur-xl p-6">
                <ShadowControlPanel selectShadow={setShadow}/>
            </PopoverContent>
          </Popover>
        </ToolCard>

        {/* Font Family Selector */}
        <ToolCard>
          <Select value={fontFamily} onValueChange={setFontFamily}>
            <SelectTrigger className="flex items-center gap-1 border-0 bg-transparent hover:opacity-80 transition-opacity focus:outline-none focus:ring-0 h-auto p-0">
              <Type className="w-3 h-3 text-white" />
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </SelectTrigger>
            <SelectContent className="text-white bg-black/90 backdrop-blur-xl border-white/10">
              {FONT_FAMILIES.map((font) => (
                <SelectItem key={font} value={font}>
                  {font}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </ToolCard>

        {/* Font Weight */}
        <ToolCard>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 hover:opacity-80 transition-opacity focus:outline-none">
              <Bold className="w-3 h-3 text-white" />
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-black/90 backdrop-blur-xl  text-white border-white/10">
              {FONT_WEIGHTS.map((weight) => (
                <DropdownMenuItem
                  key={weight.value}
                  onClick={() => setFontWeight(weight.value)}
                >
                  <span style={{ fontWeight: weight.value }}>
                    {weight.label} ({weight.value})
                  </span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </ToolCard>

        {/* Font Size Slider */}
        <ToolCard>
          <Popover>
            <PopoverTrigger className="flex items-center gap-2 hover:opacity-80 transition-opacity focus:outline-none">
              <span className="text-white text-sm min-w-[50px]">{fontSize} px</span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </PopoverTrigger>
            <PopoverContent className="w-64 bg-black/90 backdrop-blur-xl border-white/10">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white">Font Size</span>
                  <span className="text-sm text-purple-400">{fontSize}px</span>
                </div>
                <div className="flex items-center gap-3">
                          <Slider.Root
                            className="relative flex items-center select-none touch-none flex-1 h-3"
                            value={[fontSize]}
                            onValueChange={(value) => setFontSize(value[0])}
                            max={200}
                            min={12}
                            step={1}
                          >
                            <Slider.Track className="bg-zinc-700 relative grow rounded-full h-1.5">
                              <Slider.Range className="absolute bg-blue-500 rounded-full h-full" />
                            </Slider.Track>
                            <Slider.Thumb className="block w-4 h-4 bg-white rounded-full shadow-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                          </Slider.Root>
                          <div className="bg-zinc-800 px-2.5 py-1 rounded-lg min-w-[60px] text-center">
                            <span className="text-sm text-white">{fontSize} px</span>
                          </div>
                        </div>
                
                <div className="flex justify-between text-xs text-gray-500">
                  <span>8px</span>
                  <span>120px</span>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </ToolCard>

        {/* Divider */}
        <div className="w-px h-8 bg-white/10"></div>

        {/* Text Alignment Group
        <ToolCard className="px-1">
          <ToggleGroup
            type="single"
            value={alignment}
            onValueChange={(value) => value && setAlignment(value)}
            className="gap-0"
          >
            <ToggleGroupItem
              value="left"
              className="data-[state=on]:bg-gradient-to-br data-[state=on]:from-purple-600 data-[state=on]:to-purple-700 data-[state=on]:shadow-lg data-[state=on]:shadow-purple-500/50 rounded-lg px-2.5 py-2 hover:bg-white/5 transition-all"
            >
              <AlignLeft className="w-2 h-2" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="center"
              className="data-[state=on]:bg-gradient-to-br data-[state=on]:from-purple-600 data-[state=on]:to-purple-700 data-[state=on]:shadow-lg data-[state=on]:shadow-purple-500/50 rounded-lg px-2.5 py-2 hover:bg-white/5 transition-all"
            >
              <AlignCenter className="w-2 h-2" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="right"
              className="data-[state=on]:bg-gradient-to-br data-[state=on]:from-purple-600 data-[state=on]:to-purple-700 data-[state=on]:shadow-lg data-[state=on]:shadow-purple-500/50 rounded-lg px-2.5 py-2 hover:bg-white/5 transition-all"
            >
              <AlignRight className="w-2 h-2" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="justify"
              className="data-[state=on]:bg-gradient-to-br data-[state=on]:from-purple-600 data-[state=on]:to-purple-700 data-[state=on]:shadow-lg data-[state=on]:shadow-purple-500/50 rounded-lg px-2.5 py-2 hover:bg-white/5 transition-all"
            >
              <AlignJustify className="w-4 h-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </ToolCard> */}

        {/* Divider */}
        <div className="w-px h-8 bg-white/10"></div>
        <div className="size-full flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 overflow-hidden relative">
            {/* Ambient background glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 via-transparent to-blue-500/5 pointer-events-none" />

            <Dialog>
              <DialogTrigger className="cursor-pointer text-white">
                 <Button
              className="bg-gradient-to-br from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white shadow-lg shadow-purple-500/50 px-4 py-2 rounded-xl transition-all hover:scale-105 hover:shadow-purple-500/70 border-0"
              style={{
                boxShadow:
                  "0 0 20px rgba(168, 85, 247, 0.6), 0 4px 12px rgba(168, 85, 247, 0.4)",
              }}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Animate
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
              </DialogTrigger>

              <DialogContent className="p-0 border-0 bg-transparent shadow-none max-w-2xl">
                <DialogTitle className="sr-only">Animation Editor</DialogTitle>
                <DialogDescription className="sr-only">
                  Select and customize animation effects for your content
                </DialogDescription>
                  <SelectTextAnimation setTextAnimation={setTextAnimation}/>
              </DialogContent>
            </Dialog>
        </div>
       
      </div>

    </div>
  );
}

const ToolCard = (
  ({ children, className = "" }, ref) => {
    return (
      <div
        ref={ref}
        className={`px-3 py-2 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all shadow-inner ${className}`}
        style={{
          boxShadow: "inset 0 1px 2px rgba(0, 0, 0, 0.3)",
        }}
      >
        {children}
      </div>
    );
  }
);

ToolCard.displayName = "ToolCard";
