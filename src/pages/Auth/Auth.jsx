import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mic2, Waves, ArrowLeft } from 'lucide-react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import {ImageWithFallback} from "../../Components/figma/ImageWithFallback"

const Auth = ({ onBack }) => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[url('https://res.cloudinary.com/dycjjaxsk/image/upload/v1773135326/retro-digital-art-illustration-person-using-radio-technology_ghkwld.jpg')] bg-cover bg-center   relative overflow-hidden  py-16 lg:py-24">
      {/* Left Side - Branding */}
        {/* Black Overlay */}
       <div className="absolute inset-0 bg-black/60"></div>
      <div className="z-50 lg:w-1/2  flex flex-col justify-center items-center p-8 lg:p-12 text-white  relative overflow-hidden">
        
     
        {/* Content */}
        <div className="relative z-10 max-w-lg text-center lg:text-left">
          

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight">
              DEVFOLIO
            </h3>
            
          </motion.div>

          
        </div>
      </div>

      
    </div>
  );
};

export default Auth;