import { ArrowRight } from 'lucide-react';
import Card from './Card';


export default function Section({template, title, cards }) {

  console.log(template);
  return (
    <div className="mb-10">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-medium text-gray-500">{title}</h2>
        <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 transition-colors">
          View all
          <ArrowRight size={14} />
        </button>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
       
        {Object.entries(template).map(([key,vlaue])=>(
            <Card key={key} value={vlaue} />
        ))}
      </div>
    </div>
  );
}
