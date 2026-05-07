import { useState } from 'react';
import Sidebar from '../../Components/Sidebar';
import Section from '../../Components/Section';
import Workspace from './Workspace';

export default function MyWorkspace() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [workspace , setWorkspace] = useState(false);
  
  const createNow = ()=>{
      setWorkspace(true);
  }

  const newestCards = [
    {
      title: 'Rich text editing app',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      theme: 'dark'
    },
    {
      title: 'Scroll Animations',
      gradient: '#000000',
      theme: 'dark'
    },
    {
      title: 'Typesetting basics',
      gradient: '#ffffff',
      theme: 'light'
    },
    {
      title: 'Background lights on cool youtube',
      gradient: '#000000',
      theme: 'dark'
    },
    {
      title: 'Components',
      gradient: '#000000',
      theme: 'dark'
    },
  ];

  const popularCards = [
    {
      title: 'Ecommerce UI',
      gradient: '#000000',
      theme: 'dark'
    },
    {
      title: 'Scroll Animations',
      gradient: '#ffffff',
      theme: 'light'
    },
    {
      title: 'Typesetting basics',
      gradient: '#ffffff',
      theme: 'light'
    },
    {
      title: 'Background theme',
      gradient: '#ffffff',
      theme: 'light'
    },
    {
      title: 'Acme',
      gradient: '#000000',
      theme: 'dark'
    },
  ];

  const shaderCards = [
    {
      title: 'Interactive 3D',
      gradient: '#000000',
      theme: 'dark'
    },
    {
      title: 'Gradient Mesh',
      gradient: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 25%, #fdbb30 50%, #9ac94f 75%, #0cb04a 100%)',
      theme: 'dark'
    },
    {
      title: 'Particle System',
      gradient: '#000000',
      theme: 'dark'
    },
    {
      title: 'Wave Animation',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      theme: 'dark'
    },
    {
      title: 'Design System Everything',
      gradient: '#000000',
      theme: 'dark'
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      <div
        className={`transition-all duration-300 ${
          isCollapsed ? 'ml-16' : 'ml-56'
        }`}
      >
        <Workspace/>
      </div>
    </div>
  );
}