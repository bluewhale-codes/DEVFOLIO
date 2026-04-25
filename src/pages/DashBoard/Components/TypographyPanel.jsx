import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Plus, AlignLeft, AlignCenter, AlignRight, AlignJustify } from 'lucide-react';
import * as Slider from '@radix-ui/react-slider';
import * as Select from '@radix-ui/react-select';
import { setStyle } from '../../../store/slice/panelSlice';
import { useDispatch } from 'react-redux';

export default function TypographyPanel({id,color,size,weight}) {
  const [fontSize, setFontSize] = useState(size);
  const [fontFamily, setFontFamily] = useState('inter');
  const [selectedColor, setSelectedColor] = useState(color);
  const [fontWeight, setFontWeight] = useState(weight);
  const [alignment, setAlignment] = useState('center');

  const dispatch = useDispatch();
  const colorInputRef = useRef();

   

   const fonts = [
  { name: "Inter", value: "inter", style: "Inter, sans-serif" },
  { name: "Poppins", value: "poppins", style: "Poppins, sans-serif" },
  { name: "Outfit", value: "outfit", style: "Outfit, sans-serif" },
  { name: "Space Grotesk", value: "space", style: "Space Grotesk, sans-serif" },
  { name: "Playfair Display", value: "playfair", style: "Playfair Display, serif" },
  { name: "Bebas Neue", value: "bebas", style: "Bebas Neue, sans-serif" },
];
  

  const fontFamilies = [
    'inter',
    'poppins',
    'montserrat'
  ];

  const colors = [
    { id: 'black', value: '#000000' },
    { id: 'white', value: '#FFFFFF' },
    { id: 'red', value: '#EF4444' },
    { id: 'blue', value: '#3B82F6' },
    { id: 'green', value: '#22C55E' },
  ];

  const weights = [300, 400, 500, 600, 700,900];
  const alignments = [
    { id: 'left', icon: AlignLeft },
    { id: 'center', icon: AlignCenter },
    { id: 'right', icon: AlignRight },
    { id: 'justify', icon: AlignJustify },
  ];

  useEffect(()=>{
     dispatch(setStyle({
      fontsize:fontSize,
      fontFamily:fontFamily,
      setFontFamily:setFontFamily,
      selectedColor:selectedColor,
      fontWeight:fontWeight,
      alignment:alignment,
      id:id
     }));
  },[fontSize,fontFamily,selectedColor,fontWeight,alignment])

  return (
    <div style={{top:"70px"}} className="absolute z-50 w-[250px] bg-gradient-to-b from-black to-zinc-900 rounded-xl shadow-2xl p-3">
      {/* Font Size Section */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-400">Size</span>
          <span className="text-sm text-white font-medium">Tt</span>
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
      </div>

      {/* Font Family Section */}
      <div className="mb-4">
        <div className="mb-2">
          <span className="text-sm text-gray-400">Family</span>
        </div>
        <Select.Root value={fontFamily} onValueChange={setFontFamily}>
          <Select.Trigger className=" w-full bg-zinc-800 hover:bg-zinc-700 px-3 py-2.5 rounded-lg flex items-center justify-between transition-colors">
            <Select.Value className="text-sm text-white" />
            <Select.Icon>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content className="z-50 bg-zinc-800 rounded-lg shadow-2xl border border-zinc-700 overflow-hidden">
              <Select.Viewport className="p-1">
                {fontFamilies.map((font) => (
                  <Select.Item
                    key={font}
                    value={font}
                    className="text-sm text-white px-3 py-2 rounded-md hover:bg-zinc-700 cursor-pointer outline-none"
                  >
                    <Select.ItemText>{font}</Select.ItemText>
                  </Select.Item>
                ))}
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>

      {/* Color Picker Section */}
      <div className="mb-4">
        <div className="mb-2">
          <span className="text-sm text-gray-400">Color</span>
        </div>
        <div className="flex items-center gap-2">
          {colors.map((color) => (
            <button
              key={color.id}
              onClick={() => setSelectedColor(color.value)}
              className={`w-5 h-5 rounded-full transition-all ${
                selectedColor === color.value
                  ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-black'
                  : 'hover:scale-110'
              }`}
              style={{ backgroundColor: color.value }}
            />
          ))}
          <input
            ref={colorInputRef}
            type="color"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="hidden"
          />
          <button
            onClick={() => colorInputRef.current?.click()}
            className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center transition-colors"
          >
            <Plus className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Font Weight Section */}
      <div className="mb-4">
        <div className="mb-2">
          <span className="text-sm text-gray-400">Weight</span>
        </div>
        <div className="flex gap-2">
          {weights.map((weight) => (
            <button
              key={weight}
              onClick={() => setFontWeight(weight)}
              className={`flex-1 px-2 py-1 rounded-lg text-sm transition-all ${
                fontWeight === weight
                  ? 'bg-blue-500 text-white'
                  : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
              }`}
            >
              {weight}
            </button>
          ))}
        </div>
      </div>

      {/* Text Alignment Section */}
      <div>
        <div className="mb-2">
          <span className="text-sm text-gray-400">Align</span>
        </div>
        <div className="flex gap-2">
          {alignments.map(({ id, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setAlignment(id)}
              className={`flex-1 px-2 py-1.5 rounded-lg transition-all ${
                alignment === id
                  ? 'bg-blue-500 text-white'
                  : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
              }`}
            >
              <Icon className="w-4 h-4 mx-auto" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
