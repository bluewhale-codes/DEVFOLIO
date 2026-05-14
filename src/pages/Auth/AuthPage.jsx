import { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../../Components/ui/Button';
import { Input } from '../../Components/ui/input';
import { Checkbox } from '../../Components/ui/checkbox';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { ImageCard } from '../../Components/ImageCard';

export default function AuthPage() {

  const [isLogin, setIsLogin] = useState(true);
  const leftImages = [
    {
      src: 'https://images.unsplash.com/photo-1637425328980-68b3d365ab50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzRCUyMGFydHdvcmslMjBhYnN0cmFjdCUyMGRlc2lnbnxlbnwxfHx8fDE3NzY3ODc3OTh8MA&ixlib=rb-4.1.0&q=80&w=400',
      alt: '3D sculpture with ring',
    },
    {
      src: 'https://images.unsplash.com/photo-1725347740938-73127ed5d91c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw4fHxjcmVhdGl2ZSUyMHBvcnRmb2xpbyUyMGRlc2lnbiUyMGlsbHVzdHJhdGlvbnxlbnwxfHx8fDE3NzY3ODc3OTh8MA&ixlib=rb-4.1.0&q=80&w=400',
      alt: 'Purple and yellow abstract design',
    },
    {
      src: 'https://images.unsplash.com/photo-1551533771-aaf659cf45b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxjcmVhdGl2ZSUyMHBvcnRmb2xpbyUyMGRlc2lnbiUyMGlsbHVzdHJhdGlvbnxlbnwxfHx8fDE3NzY3ODc3OTh8MA&ixlib=rb-4.1.0&q=80&w=400',
      alt: 'iPad displaying woman illustration',
    },
  ];

  const rightImages = [
    {
      src: 'https://images.unsplash.com/photo-1634660476928-63015cdbc6d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHwzRCUyMGFydHdvcmslMjBhYnN0cmFjdCUyMGRlc2lnbnxlbnwxfHx8fDE3NzY3ODc3OTh8MA&ixlib=rb-4.1.0&q=80&w=400',
      alt: 'Abstract 3D background',
    },
    {
      src: 'https://images.unsplash.com/photo-1655834648155-f7a98ff3c49d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw2fHwzRCUyMGFydHdvcmslMjBhYnN0cmFjdCUyMGRlc2lnbnxlbnwxfHx8fDE3NzY3ODc3OTh8MA&ixlib=rb-4.1.0&q=80&w=400',
      alt: 'Colorful abstract person',
    },
    {
      src: 'https://images.unsplash.com/photo-1630314022710-96acbf9701cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxMHx8Y3JlYXRpdmUlMjBwb3J0Zm9saW8lMjBkZXNpZ24lMjBpbGx1c3RyYXRpb258ZW58MXx8fHwxNzc2Nzg3Nzk4fDA&ixlib=rb-4.1.0&q=80&w=400',
      alt: 'Laptop with creative work',
    },
  ];
  
    const toggleForm = () => {
      setIsLogin(!isLogin);
    };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content - Split Layout */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* LEFT COLUMN - Brand Section */}
        <div
          className="hidden lg:flex lg:w-[45%] relative overflow-hidden p-12 flex-col justify-between"
          
        >
          {/* Background Decorative Elements */}
          <div className="absolute top-20 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>

          {/* Logo */}
          <div className="flex items-center gap-2 z-10">
             <img width={"300px"} src='https://res.cloudinary.com/dycjjaxsk/image/upload/v1778010708/ChatGPT_Image_May_6_2026_01_17_53_AM_1_pj2weu.png'/>
            
          </div>

          {/* Center Content */}
          <div className="z-10 max-w-md">
           

            {/* Decorative Illustration */}
            <motion.div
              className="mt-12 relative"
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >

          <div className="relative flex items-center justify-between gap-16">
          {/* Left floating images */}
          <div className="flex-1 relative h-[400px] hidden lg:block">
            <ImageCard
              src={leftImages[0].src}
              alt={leftImages[0].alt}
              className="absolute top-0 left-0 w-40 h-40"
            />
            <ImageCard
              src={leftImages[1].src}
              alt={leftImages[1].alt}
              className="absolute top-32 left-16 w-48 h-56"
            />
            <ImageCard
              src={leftImages[2].src}
              alt={leftImages[2].alt}
              className="absolute top-64 left-4 w-40 h-40"
            />
          </div>

          

          {/* Right floating images */}
          <div className="flex-1 relative h-[400px] hidden lg:block">
            <ImageCard
              src={rightImages[0].src}
              alt={rightImages[0].alt}
              className="absolute top-8 right-0 w-40 h-40"
            />
            <ImageCard
              src={rightImages[1].src}
              alt={rightImages[1].alt}
              className="absolute top-40 right-12 w-56 h-64"
            />
            <ImageCard
              src={rightImages[2].src}
              alt={rightImages[2].alt}
              className="absolute top-72 right-2 w-40 h-40"
            />
          </div>
        </div>
             
            </motion.div>

            
             <h1 className="text-4xl leading-tight mt-20 font-bold text-center">
              <span className="text-blue-600">Portfolio</span> 
            </h1>
          </div>

          {/* Bottom Decoration */}
          <div className="z-10 flex gap-4">
            <div className="flex-1 h-1 bg-white/20 rounded-full"></div>
            <div className="flex-1 h-1 bg-white/10 rounded-full"></div>
            <div className="flex-1 h-1 bg-white/5 rounded-full"></div>
          </div>
        </div>

        {/* RIGHT COLUMN - Auth Card */}
        <div className="flex-1 lg:w-[55%] flex items-center justify-center p-6 bg-[#f5f7fb]">
          {/* Right Side - Authentication Form */}
      
        <div className="w-full max-w-md">
          <motion.div
            key={isLogin ? 'login' : 'signup'}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-xl p-8 lg:p-10"
          >
            {isLogin ? (
              <LoginForm onToggleForm={toggleForm} />
            ) : (
              <SignupForm onToggleForm={toggleForm} />
            )}

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-xs text-center text-gray-500">
                By continuing, you agree to our{' '}
                <a href="#" className="text-blue-600 hover:text-blue-700 hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-blue-600 hover:text-blue-700 hover:underline">
                  Privacy Policy
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
        </div>
     

      {/* FOOTER - Below Both Columns */}
      <footer className="bg-transparent border-t border-gray-200">
        <div className="px-8 py-5">
          <div className="flex items-center justify-center gap-3 text-sm text-gray-600">
            <h1 className='font-bold'>© 2026</h1>
            <img width={"100px"} src='https://res.cloudinary.com/dycjjaxsk/image/upload/v1778010708/ChatGPT_Image_May_6_2026_01_17_53_AM_1_pj2weu.png'/>
          </div>
        </div>
      </footer>
    </div>
  );
}
