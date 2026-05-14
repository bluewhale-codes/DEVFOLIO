import { useState, useRef } from 'react';
import { Button } from '../../../Components/ui/Button';
import { Slider } from '../../../Components/ui/slider';
import { Switch } from '../../../Components/ui/switch';
import { Separator } from '../../../Components/ui/seperator';
import { Card } from '../../../Components/ui/card';
import { Minus, Plus, Target, ChevronUp, Droplet, Info, Star, Copy } from 'lucide-react';

export default function ShadowControlPanel({selectShadow}) {
  const [shadowData, setShadowData] = useState({
    x: 30,
    y: -20,
    z: 40,
    blur: 60,
    color: '#8B5CF6',
    opacity: 100,
    preset: 'soft'
  });

  const saveShadowData = ()=>{
      selectShadow(shadowData);
  }

  const [enabled, setEnabled] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [copied, setCopied] = useState(false);
  const planeRef = useRef(null);

  const copyToClipboard = () => {
    const cssValue = `box-shadow: ${enabled ? `${shadowData.x}px ${-shadowData.y}px ${shadowData.blur}px ${shadowData.z}px ${shadowData.color}` : 'none'};`;
    navigator.clipboard.writeText(cssValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDrag = (e) => {
    if (!isDragging) return;

    const rect = planeRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const x = e.clientX - rect.left - centerX;
    const y = -(e.clientY - rect.top - centerY);

    const clampedX = Math.max(-100, Math.min(100, Math.round(x)));
    const clampedY = Math.max(-100, Math.min(100, Math.round(y)));

    setShadowData(prev => ({ ...prev, x: clampedX, y: clampedY }));
  };

  const updateValue = (key, delta) => {
    setShadowData(prev => ({
      ...prev,
      [key]: Math.max(key === 'blur' ? 0 : -200, Math.min(200, prev[key] + delta))
    }));
  };

  const presets = [
    { name: 'None', shadow: 'none', glow: '', values: { x: 0, y: 0, z: 0, blur: 0 } },
    { name: 'Soft', shadow: '0 4px 20px rgba(139, 92, 246, 0.3)', glow: 'shadow-[0_0_20px_rgba(139,92,246,0.3)]', values: { x: 0, y: -4, z: 0, blur: 20, color: '#8B5CF6' } },
    { name: 'Medium', shadow: '0 8px 30px rgba(59, 130, 246, 0.4)', glow: 'shadow-[0_0_30px_rgba(59,130,246,0.4)]', values: { x: 0, y: -8, z: 0, blur: 30, color: '#3B82F6' } },
    { name: 'Strong', shadow: '0 12px 40px rgba(236, 72, 153, 0.5)', glow: 'shadow-[0_0_40px_rgba(236,72,153,0.5)]', values: { x: 0, y: -12, z: 0, blur: 40, color: '#EC4899' } },
    { name: 'Glow', shadow: '0 0 50px rgba(34, 211, 238, 0.6)', glow: 'shadow-[0_0_50px_rgba(34,211,238,0.6)]', values: { x: 0, y: 0, z: 0, blur: 50, color: '#22D3EE' } }
  ];

  const applyPreset = (preset) => {
    setShadowData(prev => ({
      ...prev,
      ...preset.values,
      preset: preset.name.toLowerCase()
    }));
  };

  const colorPresets = [
    { color: '#8B5CF6', name: 'Purple' },
    { color: '#3B82F6', name: 'Blue' },
    { color: '#22D3EE', name: 'Cyan' },
    { color: '#EC4899', name: 'Pink' },
    { color: '#FACC15', name: 'Yellow' },
    { gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)', name: 'Rainbow' }
  ];

  console.log('Shadow Data:', shadowData);

  return (

      <div>

        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <Target className="w-3 h-3 text-white/80" />
            <h1 className="text-sm font-bold text-white">Shadow</h1>
          </div>
          <div className="flex items-center gap-3">
            {/* <Switch
              checked={enabled}
              onCheckedChange={setEnabled}
              className="data-[state=checked]:bg-[#8B5CF6] data-[state=checked]:shadow-[0_0_15px_rgba(139,92,246,0.6)]"
            /> */}
            <button onClick={()=>selectShadow(shadowData)} style={{
                color:"white",
                backgroundColor:"blue",
                padding:"5px",
                
            }}>
               Save
            </button>
            <ChevronUp className="w-4 h-4 text-white/60" />
          </div>
        </div>

        <Separator className="mb-6 bg-white/5" />

        {/* Shadow Position */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Cartesian Plane */}
          <div
            ref={planeRef}
            className="relative aspect-square bg-[#0f172a]/60 rounded-2xl border border-white/10 overflow-hidden cursor-crosshair"
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={handleDrag}
          >
            {/* Grid dots */}
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}></div>

            {/* Axis lines */}
            <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/20"></div>
            <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/20"></div>

            {/* Axis labels */}
            <span className="absolute top-2 left-1/2 -translate-x-1/2 text-xs text-white/40">Y</span>
            <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-white/40">-Y</span>
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-white/40">-X</span>
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-white/40">X</span>

            {/* Draggable point */}
            <div
              className="absolute w-6 h-6 bg-[#8B5CF6] rounded-full shadow-[0_0_30px_rgba(139,92,246,0.8)] transition-all"
              style={{
                left: `calc(50% + ${(shadowData.x / 100) * 45}%)`,
                top: `calc(50% - ${(shadowData.y / 100) * 45}%)`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <div className="absolute inset-0 bg-[#8B5CF6] rounded-full animate-ping opacity-50"></div>
            </div>
          </div>

          {/* PREVIEW SECTION */}
        <div className="">
          <div className="text-xs text-white/50 mb-1">Preview:</div>
          <div className="bg-[#0f172a]/40 rounded-xl p-3 flex items-center justify-center border border-white/5">
            <div
              className="w-15 h-15 bg-gradient-to-br from-white/90 to-white/70 rounded-2xl"
              style={{
                boxShadow: enabled
                  ? `${shadowData.x}px ${-shadowData.y}px ${shadowData.blur}px ${shadowData.z}px ${shadowData.color}${Math.round(shadowData.opacity * 2.55).toString(16).padStart(2, '0')}`
                  : 'none'
              }}
            ></div>
            {/* <h1 style={{
                 textShadow:`${shadowData.x}px ${-shadowData.y}px ${shadowData.blur}px  ${shadowData.color}`
            }} className='text-[20px] font-bold text-white'>
                HELLO WORLD
            </h1> */}
          </div>
        </div>
        </div>
       
       {/* Z OFFSET */}
        <div className="space-y-3">
            {['z'].map((axis) => (
              <div key={axis} className="items-center gap-3">
                <div className="text-xs text-white/50 mb-1">{`Offset ${axis}`}</div>
                <div className="flex items-center gap-2 flex-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="cursor-pointer h-8 w-8 rounded-lg bg-[#0f172a]/80 border border-white/10 hover:bg-[#8B5CF6]/20 hover:border-[#8B5CF6]/50 text-white/80"
                    onClick={() => updateValue(axis, -5)}
                  >
                    <Minus className="h-2 w-2" />
                  </Button>
                  <div className="flex-1 bg-[#0f172a]/80 rounded-lg border border-white/10 px-3 py-1.5 text-center">
                    <span className="text-white font-medium">{shadowData[axis]}</span>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="cursor-pointer h-8 w-8 rounded-lg bg-[#0f172a]/80 border border-white/10 hover:bg-[#8B5CF6]/20 hover:border-[#8B5CF6]/50 text-white/80"
                    onClick={() => updateValue(axis, 5)}
                  >
                    <Plus className="h-2 w-2" />
                  </Button>
                  <span className="text-sm text-white/50 w-6">px</span>
                  {axis === 'z' && <Info className="w-4 h-4 text-white/40" />}
                </div>
              </div>
            ))} 
            </div>

        {/* Blur Control */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <Droplet className="w-3 h-3 text-white/60" />
            <span className="text-sm font-medium text-white/80">Blur</span>
          </div>
          <div className="flex items-center gap-4">
            <Slider
              value={[shadowData.blur]}
              onValueChange={(value) => setShadowData(prev => ({ ...prev, blur: value[0] }))}
              max={100}
              step={1}
              className="cursor-pointer flex-1 [&_[data-slot=slider-track]]:bg-[#0f172a]/80 [&_[data-slot=slider-range]]:bg-[#8B5CF6] [&_[data-slot=slider-range]]:shadow-[0_0_20px_rgba(139,92,246,0.6)] [&_[data-slot=slider-thumb]]:bg-[#8B5CF6] [&_[data-slot=slider-thumb]]:border-white [&_[data-slot=slider-thumb]]:shadow-[0_0_15px_rgba(139,92,246,0.8)] [&_[data-slot=slider-thumb]]:size-5"
            />
            {/* <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 rounded-lg bg-[#0f172a]/80 border border-white/10 hover:bg-[#8B5CF6]/20 hover:border-[#8B5CF6]/50 text-white/80"
                onClick={() => updateValue('blur', -5)}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <div className="bg-[#0f172a]/80 rounded-lg border border-white/10 px-3 py-1.5 min-w-[60px] text-center">
                <span className="text-white font-medium">{shadowData.blur}</span>
              </div>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 rounded-lg bg-[#0f172a]/80 border border-white/10 hover:bg-[#8B5CF6]/20 hover:border-[#8B5CF6]/50 text-white/80"
                onClick={() => updateValue('blur', 5)}
              >
                <Plus className="h-3 w-3" />
              </Button>
              <span className="text-sm text-white/50">px</span>
            </div> */}
          </div>
        </div>

        {/* Color Picker */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: shadowData.color }}></div>
            <span className="text-sm font-medium text-white/80">Shadow Color</span>
          </div>
          <div className="flex items-center gap-4">
            <div className=" bg-[#0f172a]/80 rounded-xl border border-white/10 p-2 items-center gap-3">
              <div
                className="w-5 h-5 rounded-sm border-2 border-white/20"
                style={{ backgroundColor: shadowData.color }}
              ></div>
              <div className="flex-1">
                {/* <input
                  type="text"
                  value={shadowData.color}
                  onChange={(e) => setShadowData(prev => ({ ...prev, color: e.target.value }))}
                  className="bg-transparent text-white font-medium outline-none w-full"
                /> */}
                
              </div>
            </div>
            <div className="flex items-center gap-2">
              {colorPresets.map((preset, idx) => (
                <button
                  key={idx}
                  className={`cursor-pointer w-5 h-5 rounded-full border-2 transition-all ${
                    shadowData.color === preset.color
                      ? 'border-white shadow-[0_0_20px_rgba(139,92,246,0.8)]'
                      : 'border-white/20 hover:border-white/40'
                  }`}
                  style={{
                    background: preset.gradient || preset.color
                  }}
                  onClick={() => preset.color && setShadowData(prev => ({ ...prev, color: preset.color }))}
                ></button>
              ))}
            </div>
          </div>
        </div>

        {/* Presets */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <Star className="w-4 h-4 text-white/60" />
            <span className="text-sm font-medium text-white/80">Presets</span>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {presets.map((preset) => (
              <Card
                key={preset.name}
                className={`relative aspect-square rounded-sm cursor-pointer transition-all ${
                  shadowData.preset === preset.name.toLowerCase()
                    ? 'bg-[#8B5CF6]/10 border-[#8B5CF6] shadow-[0_0_20px_rgba(139,92,246,0.6)]'
                    : 'bg-[#0f172a]/60 border-white/10 hover:border-white/20'
                } flex flex-col items-center justify-center p-2`}
                onClick={() => applyPreset(preset)}
              >
                <div
                  className={`w-4 h-4 rounded-lg bg-white/10  ${preset.glow}`}
                  style={{ boxShadow: preset.shadow }}
                ></div>
                <span className="text-xs text-white/70">{preset.name}</span>
              </Card>
            ))}
          </div>
        </div>

        {/* Shadow Preview */}
      

        {/* Data Output */}
        {/* <div className="p-4 bg-[#0f172a]/60 rounded-xl border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs text-white/50">CSS Output:</div>
            <Button
              size="sm"
              variant="ghost"
              className="h-6 px-2 text-xs text-white/60 hover:text-white hover:bg-[#8B5CF6]/20"
              onClick={copyToClipboard}
            >
              <Copy className="h-3 w-3 mr-1" />
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </div>
          <pre className="text-xs text-white/80 overflow-auto">
            {`box-shadow: ${enabled ? `${shadowData.x}px ${-shadowData.y}px ${shadowData.blur}px ${shadowData.z}px ${shadowData.color}` : 'none'};`}
          </pre>
        </div> */}
      </div>
   
  );
}
