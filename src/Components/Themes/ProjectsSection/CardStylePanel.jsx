import { useState } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../ui/select';
import { Switch } from '../../ui/switch';
import { Label } from '../../ui/label';
import {
  Sparkles,
  Square,
  Zap,
  Scissors,
  Box,
  Palette
} from 'lucide-react';

const styleVariants = [
  { id: 'minimal', label: 'Minimal', icon: Square },
  { id: 'glassmorphism', label: 'Glassmorphism', icon: Sparkles },
  { id: 'dark-neon', label: 'Dark Neon', icon: Zap, isDark: true },
  { id: 'scrapbook', label: 'Scrapbook', icon: Scissors },
  { id: 'brutalist', label: 'Brutalist', icon: Box },
  { id: 'gradient', label: 'Gradient', icon: Palette }
];

export default function CardStylePanel() {
  const [selectedStyle, setSelectedStyle] = useState('minimal');
  const [cardRadius, setCardRadius] = useState([16]);
  const [cardShadow, setCardShadow] = useState('medium');
  const [showBorder, setShowBorder] = useState(true);
  const [hoverEffect, setHoverEffect] = useState('lift-up');

  return (
    <div className="w-full h-screen bg-[#F8F9FB] p-6 overflow-y-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-1">
          Card Style
        </h2>
        <p className="text-sm text-gray-500">
          Choose the style of project cards
        </p>
      </div>

      {/* Style Variants */}
      <div className="mb-8">
        <Label className="text-sm font-medium text-gray-700 mb-3 block">
          Style Variants
        </Label>
        <div className="grid grid-cols-2 gap-3">
          {styleVariants.map((variant) => {
            const Icon = variant.icon;
            const isSelected = selectedStyle === variant.id;

            return (
              <button
                key={variant.id}
                onClick={() => setSelectedStyle(variant.id)}
                className={`
                  flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all
                  ${variant.isDark ? 'bg-gray-800' : 'bg-white'}
                  ${isSelected
                    ? 'border-purple-500 bg-purple-50 shadow-sm'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                  }
                `}
              >
                <div className={`
                  mb-2 p-2 rounded-lg
                  ${variant.isDark ? 'bg-gray-700' : 'bg-gray-100'}
                  ${isSelected && !variant.isDark ? 'bg-purple-100' : ''}
                `}>
                  <Icon
                    className={`
                      w-5 h-5
                      ${variant.isDark ? 'text-cyan-400' : ''}
                      ${isSelected && !variant.isDark ? 'text-purple-600' : 'text-gray-600'}
                    `}
                  />
                </div>
                <span className={`
                  text-xs font-medium
                  ${variant.isDark ? 'text-white' : 'text-gray-700'}
                `}>
                  {variant.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Card Radius */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <Label className="text-sm font-medium text-gray-700">
            Card Radius
          </Label>
          <span className="text-sm font-medium text-gray-900">
            {cardRadius[0]} px
          </span>
        </div>
         
      </div>

      {/* Card Shadow */}
      <div className="mb-8">
        <Label className="text-sm font-medium text-gray-700 mb-3 block">
          Card Shadow
        </Label>
        <Select value={cardShadow} onValueChange={setCardShadow}>
          <SelectTrigger className="w-full bg-white border-gray-200 rounded-lg">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="small">Small</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="large">Large</SelectItem>
            <SelectItem value="xl">Extra Large</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Border */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-sm font-medium text-gray-700 block mb-0.5">
              Border
            </Label>
            <span className="text-xs text-gray-500">Show Border</span>
          </div>
          <Switch
            checked={showBorder}
            onCheckedChange={setShowBorder}
          />
        </div>
      </div>

      {/* Hover Effect */}
      <div className="mb-8">
        <Label className="text-sm font-medium text-gray-700 mb-3 block">
          Hover Effect
        </Label>
        <Select value={hoverEffect} onValueChange={setHoverEffect}>
          <SelectTrigger className="w-full bg-white border-gray-200 rounded-lg">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="lift-up">Lift Up</SelectItem>
            <SelectItem value="scale">Scale</SelectItem>
            <SelectItem value="glow">Glow</SelectItem>
            <SelectItem value="tilt">Tilt</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
