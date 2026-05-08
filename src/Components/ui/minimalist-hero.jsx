import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { cn } from './utils';
import TypographyPanel from '../../pages/DashBoard/Components/TypographyPanel';
import { useSelector , useDispatch } from 'react-redux';
import FloatingToolbar from '../../pages/DashBoard/Components/FloatingToolbar';
import { setElementID } from '../../store/slice/panelSlice';
// Helper component for navigation links
const NavLink = ({ href, children }) => (
  
  <a
    href={href}
    className="text-sm font-medium tracking-widest text-foreground/60 transition-colors hover:text-foreground"
  >
    {children}
  </a>
);

// Helper component for social media icons
const SocialIcon = ({ href, icon: Icon }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-foreground/60 transition-colors hover:text-foreground">
    <Icon className="h-5 w-5" />
  </a>
);

const fontMap = {
  inter: "Inter, sans-serif",
  poppins: "Poppins, sans-serif",
  outfit: "Outfit, sans-serif",
  space: "Space Grotesk, sans-serif",
  dmSans: "DM Sans, sans-serif",
  manrope: "Manrope, sans-serif",
  jakarta: "Plus Jakarta Sans, sans-serif",
  urbanist: "Urbanist, sans-serif",
  sora: "Sora, sans-serif",
  workSans: "Work Sans, sans-serif",

  playfair: "Playfair Display, serif",
  merriweather: "Merriweather, serif",
  lora: "Lora, serif",
  baskerville: "Libre Baskerville, serif",
  crimson: "Crimson Text, serif",

  bebas: "Bebas Neue, sans-serif",
  anton: "Anton, sans-serif",
  oswald: "Oswald, sans-serif",
  raleway: "Raleway, sans-serif",
  cabin: "Cabin, sans-serif",
};


// The main reusable Hero Section component
export const MinimalistHero = ({
  
  logoText,
  navLinks,
  mainText,
  readMoreLink,
  imageSrc,
  imageAlt,
  overlayText,
  socialLinks,
  locationText,
  className,
}) => {
    
    const [elements, setElements] = useState([
            {
              id: "heading",
              type: "h1",
              content: "Vishal Shakya",
              styles: {
                fontsize: 50,
                selectedColor: "#000000",
                fontFamily: "Poppins",
                fontWeight:900
              },
            },
            {
              id: "name",
              type: "p",
              content: "Software Engineer",
              styles: {
                fontsize: 30,
                selectedColor: "#555",
                fontFamily: "Inter",
                fontWeight:500
              },
            },
    ]);

    const dispatch = useDispatch();
      



     const [text , setText] = useState("Vishal Shakya");
     const [heading,setHeading] = useState("Software Engineer");
     const [size , setSize] = useState(50);
     const [color,setColor] = useState('#030303');
     const [weight,setWeight] = useState(900);
     const [elementId,setElementId] =useState("heading");

     const setID = (id) =>{
          setElementId(id);
     }
    
     const [image, setImage] = useState("");
     const [menu, setMenu] = useState({
                            visible: false,
                            x: 0,
                            y: 0,
                            });

     const [panel,setPanel] = useState(false);
      
     const paneltoggle = ()=>{
      
          setPanel(!panel);
     }
     const fileInputRef = useRef();

     const {Textdata} = useSelector((state)=>state.panelSlice);

      const save =  async () =>{
            console.log("save");
            const data ={
                  heading:heading,
                  text:text
            }
             try {
            const res = await axios.post("http://localhost:3000/save-Herodata",data);
            console.log(res.data);
            
          } catch (error) {
              console.log(error.response.data);
          }
     
      }
     const getData = async () =>{
          try {
            const res = await axios.get("http://localhost:3000/get-data");
            console.log(res.data);
            setHeading(res.data.data.Heading);
            setText(res.data.data.Text);
          } catch (error) {
              console.log(error.response.data);
          }
     }

     useEffect(()=>{
         getData();
     },[])

     useEffect(()=>{

         
        Object.keys(Textdata).forEach((key)=>{

            setElements((prev) =>
              prev.map((el) =>
                el.id === Textdata.id
                  ? {
                      ...el,
                      styles: {
                        ...el.styles,
                        [key]: Textdata[key],
                      },
                    }
                  : el
              )
            );


        })
            
      
         
     },[Textdata])

     const handleImageChange = (e) => {
  const file = e.target.files[0];

  if (file) {
    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl); // ✅ instant preview
  }
};
    
  return (
    <div
      className={cn(
        'relative flex h-screen w-full flex-col items-center justify-between overflow-hidden bg-background p-8  md:p-12',
        className
      )}
    >
      {/* Header */}
      <div className='flex h-[40px]'>
         {/* <button onClick={save} className='px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium shadow-md hover:scale-105 transition-transform duration-200'>Save</button> */}
         <div className='relative'> 
            {/* <FloatingToolbar  toggle={paneltoggle}/>
            {panel && elements.map((e)=>{
                  if(e.id === elementId){
                    return <TypographyPanel
                          id={elementId} 
                          color={e.styles.selectedColor}
                          size={e.styles.fontsize}
                          weight={e.styles.fontWeight}
            
                     /> 
                  }         
            })
                     
            } */}
             
         </div>
      </div>
      {/* Main Content Area */}
      <div className="relative grid w-full max-w-7xl flex-grow grid-cols-1 items-center md:grid-cols-3">
        {/* Left Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="z-20 order-2 md:order-1 text-center md:text-left"
        >
          {elements.map((e)=>{

             if(e.id==="name"){
              return <h1
              style={{color:`${e.styles.selectedColor}`,fontWeight:`${e.styles.fontWeight}`,fontSize:`${e.styles.fontsize}px`,
                      fontFamily:fontMap[e.styles.fontFamily]
            }}
              id='name'  onBlur={(e)=>setText(e.currentTarget.innerText)} onClick={(e)=>dispatch(setElementID(e.currentTarget.id))} contentEditable
  suppressContentEditableWarning
  className="font-extrabold text-foreground text-center ">{text}</h1>
             }
          })}
          <a href={readMoreLink} className="mt-4 inline-block text-sm font-medium text-foreground underline decoration-from-font">
            Read More
          </a>
        </motion.div>

        {/* Center Image with Circle */}
        <div className="relative order-1 md:order-2 flex justify-center items-center h-full">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                className="absolute z-0 h-[300px] w-[300px] rounded-full bg-yellow-400/90 md:h-[400px] md:w-[400px] lg:h-[500px] lg:w-[500px]"
            ></motion.div>
            <motion.img
                src={image || imageSrc}
               
                onContextMenu={(e) => {
                    e.preventDefault()
                     e.stopPropagation(); // prevent global close

                    setMenu({
                    visible: true,
                    x: e.clientX,
                    y: e.clientY,
                    });
                
                } }
                alt={imageAlt}
                className="relative z-10 h-auto w-56 object-cover md:w-64 scale-150 lg:w-72"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                onError={(e) => {
                const target = e.target ;
                target.onerror = null;
                target.src = `https://placehold.co/400x600/eab308/ffffff?text=Image+Not+Found`;
                }}
            />
              {/* {menu.visible && (
                    <TypographyPanel/>
                    
                )} */}
        </div>
        

        {/* Right Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="z-20 order-3 flex items-center justify-center text-center md:justify-start"
        >
         {elements.map((e)=>{
             if(e.id==="heading"){
               return    <h1
          id="heading"
          onClick={(e)=>dispatch(setElementID(e.currentTarget.id))}
           style={{color:`${e.styles.selectedColor}`,fontWeight:`${e.styles.fontWeight}`,fontSize:`${e.styles.fontsize}px`
                   , fontFamily:fontMap[e.styles.fontFamily]
          
          
          }}
          contentEditable
          suppressContentEditableWarning
          onBlur={(e)=>setHeading(e.currentTarget.innerText)} 
         //className="text-7xl font-extrabold text-foreground md:text-8xl lg:text-9xl"
         className="font-extrabold text-foreground text-center"
         >
            {heading}
            
          </h1>
             }
         })}
        </motion.div>
      </div>

      {/* Footer Elements */}
      <footer className="z-30 flex w-full max-w-7xl items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="flex items-center space-x-4"
        >
          {socialLinks.map((link, index) => (
            <SocialIcon key={index} href={link.href} icon={link.icon} />
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.3 }}
          className="text-sm font-medium text-foreground/80"
        >
          {locationText}
        </motion.div>
      </footer>
    </div>
  );
};