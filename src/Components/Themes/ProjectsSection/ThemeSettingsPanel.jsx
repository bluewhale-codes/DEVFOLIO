import { useState } from 'react';
import { Slider } from '../../ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../ui/select';
import { Label } from '../../ui/label';
import { Button } from '../../ui/Button';
import {
  Sparkles,
  Square,
  Box,
  Palette
} from 'lucide-react';

const themePresets = [
  { id: 'minimal', label: 'Minimal', icon: Square, bg: 'white' },
  { id: 'glass', label: 'Glass', icon: Sparkles, bg: 'white' },
  { id: 'dark-neon', label: 'Dark Neon', icon: Square, bg: 'dark' },
  { id: 'scrapbook', label: 'Scrapbook', icon: Square, bg: 'beige' },
  { id: 'brutalist', label: 'Brutalist', icon: Box, bg: 'white' },
  { id: 'gradient', label: 'Gradient', icon: Palette, bg: 'purple' }
];

export default function ThemeSettingsPanel() {
  const [selectedTheme, setSelectedTheme] = useState('minimal');
  const [backgroundType, setBackgroundType] = useState('image');
  const [overlay, setOverlay] = useState([40]);
  const [attachment, setAttachment] = useState('cover');

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
          {themePresets.map((preset) => {
            const Icon = preset.icon;
            const isSelected = selectedTheme === preset.id;

            const getBackgroundClass = () => {
              if (isSelected && preset.bg !== 'dark') return 'bg-purple-50';
              if (preset.bg === 'dark') return 'bg-gray-900';
              if (preset.bg === 'beige') return 'bg-amber-50';
              if (preset.bg === 'purple') return 'bg-purple-100';
              return 'bg-white';
            };

            return (
              <button
                key={preset.id}
                onClick={() => setSelectedTheme(preset.id)}
                className={`
                  flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all aspect-square
                  ${getBackgroundClass()}
                  ${isSelected
                    ? 'border-[#6C63FF]'
                    : 'border-gray-200 hover:border-gray-300'
                  }
                `}
              >
                <Icon
                  className={`
                    w-7 h-7 mb-2
                    ${preset.bg === 'dark' ? 'text-[#6C63FF]' : isSelected ? 'text-[#6C63FF]' : 'text-gray-600'}
                  `}
                />
                <span className={`
                  text-xs font-medium
                  ${preset.bg === 'dark' ? 'text-white' : 'text-gray-700'}
                `}>
                  {preset.label}
                </span>
              </button>
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
        <div className="inline-flex bg-gray-50 rounded-lg p-1 border border-gray-200 mb-4">
          {['color', 'gradient', 'image'].map((type) => (
            <button
              key={type}
              onClick={() => setBackgroundType(type)}
              className={`
                px-4 py-1.5 rounded-md text-xs font-medium transition-all capitalize
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
    </div>
  );
}
