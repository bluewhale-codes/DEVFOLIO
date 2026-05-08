import { X, Layout, User, Briefcase, Award, MessageSquare, Mail, Sparkles , Check,MousePointerClick} from 'lucide-react';
import { Button } from '../../ui/Button';
import { Badge } from '../../ui/badge';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setTheme } from '../../../store/slice/panelSlice';

const includedSections = [
  {
    icon: Layout,
    title: 'Hero',
    description: 'Eye-catching landing section',
  },
  {
    icon: User,
    title: 'About',
    description: 'Personal introduction',
  },
  {
    icon: Briefcase,
    title: 'Projects',
    description: 'Portfolio showcase',
  },
  {
    icon: Award,
    title: 'Skills',
    description: 'Technical expertise',
  },
  {
    icon: MessageSquare,
    title: 'Testimonials',
    description: 'Client feedback',
  },
  {
    icon: Mail,
    title: 'Contact',
    description: 'Get in touch form',
  },
];

export default function TemplateModal({ template,onClose }) {
    const [isSelected, setIsSelected] = useState(false);
    const dispatch = useDispatch();

  return (
    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[90vh] ">
      {/* Header with Actions */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between rounded-t-3xl">
        <div className="flex-1" />
        <div className="flex items-center gap-3">
          <Button
                  onClick={() => {
                    setIsSelected(!isSelected)
                    dispatch(setTheme(template))
                  }}
                  className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-6"
                >
                  {isSelected ? (
                    <Check className="w-4 h-4 mr-2" />
                  ) : (
                    <MousePointerClick className="w-4 h-4 mr-2" />
                  )}
                  {isSelected ? 'Selected' : 'Select Template'}
                </Button>
          <Button
            variant="ghost"
            onClick={onClose}
            className="cursor-pointer text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
   

        {/* Template Preview */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 max-h-[80vh] overflow-x-auto  overflow-y-auto ">
           {template.content}
        </div>

        
      

      {/* Close button (circular) */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
      >
        <X className="w-4 h-4 text-gray-600" />
      </button>
    </div>
  );
}
