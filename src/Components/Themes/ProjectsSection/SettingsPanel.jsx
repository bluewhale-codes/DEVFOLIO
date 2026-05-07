import { useEffect, useState } from 'react';
import { Grid3x3, Grid2x2, Layout, List, LayoutGrid, Maximize, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import * as Slider from '@radix-ui/react-slider';
import { setMyLayout } from '../../../store/slice/panelSlice';
import { useDispatch } from 'react-redux';


export function SettingsPanel() {
    const dispatch = useDispatch();
  const [layoutType, setLayoutType] = useState('grid');
  const [columns, setColumns] = useState(3);
  const [gap, setGap] = useState([24]);
  const [alignment, setAlignment] = useState('center');
  const [imagePosition, setImagePosition] = useState('top');

  const layoutOptions = [
    { value: 'grid', label: 'Grid', icon: <Grid3x3 size={20} /> },
    { value: 'masonry', label: 'Masonry', icon: <LayoutGrid size={20} /> },
    { value: 'carousel', label: 'Carousel', icon: <Layout size={20} /> },
    { value: 'list', label: 'List', icon: <List size={20} /> },
    { value: 'compact', label: 'Compact', icon: <Grid2x2 size={20} /> },
    { value: 'justified', label: 'Justified', icon: <Maximize size={20} /> },
  ];

  useEffect(()=>{
      dispatch(setMyLayout({layoutType,columns,gap,alignment,imagePosition}))
  },[layoutType,columns,gap,alignment,imagePosition])

  return (
    <div className="w-full h-screen bg-[#F8F9FC] border-r border-gray-200 overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="pb-2">
          <h1 className="text-lg font-semibold text-gray-900">Typography & Layout</h1>
        </div>

        {/* Layout Type */}
        <div className="space-y-3">
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-1">Layout Type</h3>
            <p className="text-xs text-gray-500">Choose how projects are displayed</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {layoutOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setLayoutType(option.value)}
                className={`
                  flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all
                  ${
                    layoutType === option.value
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                  }
                `}
              >
                <div className={layoutType === option.value ? 'text-purple-600' : 'text-gray-600'}>
                  {option.icon}
                </div>
                <span className={`text-xs font-medium ${layoutType === option.value ? 'text-purple-700' : 'text-gray-700'}`}>
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Columns */}
        <div className="space-y-3">
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-1">Columns</h3>
            <p className="text-xs text-gray-500">Choose number of columns</p>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((num) => (
              <button
                key={num}
                onClick={() => setColumns(num)}
                className={`
                  flex-1 py-2.5 px-4 rounded-lg font-medium text-sm transition-all
                  ${
                    columns === num
                      ? 'bg-purple-500 text-white shadow-sm'
                      : 'bg-white text-gray-700 border border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                  }
                `}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* Gap / Spacing */}
        <div className="space-y-3">
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-1">Gap / Spacing</h3>
            <p className="text-xs text-gray-500">Control space between projects</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-600">Spacing</span>
              <span className="text-sm font-medium text-purple-600">{gap[0]} px</span>
            </div>
            <Slider.Root
              className="relative flex items-center select-none touch-none w-full h-5"
              value={gap}
              onValueChange={setGap}
              max={100}
              step={4}
              aria-label="Gap spacing"
            >
              <Slider.Track className="bg-gray-200 relative grow rounded-full h-2">
                <Slider.Range className="absolute bg-purple-500 rounded-full h-full" />
              </Slider.Track>
              <Slider.Thumb className="block w-5 h-5 bg-white border-2 border-purple-500 rounded-full shadow-md hover:scale-110 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 transition-transform" />
            </Slider.Root>
          </div>
        </div>

        {/* Item Alignment */}
        <div className="space-y-3">
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-1">Item Alignment</h3>
            <p className="text-xs text-gray-500">Align projects inside the grid</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setAlignment('left')}
              className={`
                flex-1 p-3 rounded-xl border-2 transition-all flex items-center justify-center
                ${
                  alignment === 'left'
                    ? 'border-purple-500 bg-purple-50 text-purple-600'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                }
              `}
            >
              <AlignLeft size={20} />
            </button>
            <button
              onClick={() => setAlignment('center')}
              className={`
                flex-1 p-3 rounded-xl border-2 transition-all flex items-center justify-center
                ${
                  alignment === 'center'
                    ? 'border-purple-500 bg-purple-50 text-purple-600'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                }
              `}
            >
              <AlignCenter size={20} />
            </button>
            <button
              onClick={() => setAlignment('right')}
              className={`
                flex-1 p-3 rounded-xl border-2 transition-all flex items-center justify-center
                ${
                  alignment === 'right'
                    ? 'border-purple-500 bg-purple-50 text-purple-600'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                }
              `}
            >
              <AlignRight size={20} />
            </button>
          </div>
        </div>

        {/* Image Position */}
        <div className="space-y-3">
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-1">Image Position</h3>
            <p className="text-xs text-gray-500">Choose image placement in card</p>
          </div>
          <div className="space-y-2">
            {[
              { value: 'top' , label: 'Top', description: 'Image above content' },
              { value: 'left' , label: 'Left', description: 'Image beside content' },
              { value: 'background' , label: 'Background', description: 'Image as background' },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setImagePosition(option.value)}
                className={`
                  w-full p-4 rounded-xl border-2 transition-all text-left
                  ${
                    imagePosition === option.value
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    imagePosition === option.value ? 'bg-purple-100' : 'bg-gray-100'
                  }`}>
                    {option.value === 'top' && (
                      <div className="space-y-1">
                        <div className={`w-5 h-2 rounded ${imagePosition === option.value ? 'bg-purple-500' : 'bg-gray-400'}`} />
                        <div className={`w-5 h-1 rounded ${imagePosition === option.value ? 'bg-purple-300' : 'bg-gray-300'}`} />
                      </div>
                    )}
                    {option.value === 'left' && (
                      <div className="flex gap-1">
                        <div className={`w-2 h-5 rounded ${imagePosition === option.value ? 'bg-purple-500' : 'bg-gray-400'}`} />
                        <div className="space-y-1">
                          <div className={`w-2 h-1 rounded ${imagePosition === option.value ? 'bg-purple-300' : 'bg-gray-300'}`} />
                          <div className={`w-2 h-1 rounded ${imagePosition === option.value ? 'bg-purple-300' : 'bg-gray-300'}`} />
                        </div>
                      </div>
                    )}
                    {option.value === 'background' && (
                      <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                        imagePosition === option.value ? 'border-purple-500 bg-purple-200' : 'border-gray-400 bg-gray-200'
                      }`}>
                        <div className={`w-3 h-1 rounded ${imagePosition === option.value ? 'bg-purple-600' : 'bg-gray-500'}`} />
                      </div>
                    )}
                  </div>
                  <div>
                    <div className={`text-sm font-medium ${imagePosition === option.value ? 'text-purple-700' : 'text-gray-900'}`}>
                      {option.label}
                    </div>
                    <div className="text-xs text-gray-500">{option.description}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
