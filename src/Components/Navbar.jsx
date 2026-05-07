import React, { useEffect,useState } from "react";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router";
import { useDispatch,useSelector } from "react-redux";
import { getUser } from "../store/actions/action";
import {DropdownMenuHeader} from "./DropDownMenu"
import { Button } from "./ui/Button";
const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userAuthenticate,setUserAuthenticate] = useState(false);
  const [myuser,setMyuser] = useState({});

  const {isAuthenticated,loading,user} = useSelector((state)=>state.userAuthReducer)
  console.log(user.user);
  

  useEffect(()=>{
      dispatch(getUser());
  },[])

  
  return (
    <header className="sticky top-0  z-50 w-full border-b border-zinc-200 bg-[#f8f8f8]">
      <div className="mx-auto flex h-[82px] w-full items-center justify-between px-6 lg:px-8">
        {/* Left */}
        <div className="flex items-center gap-10">
          <img width={"150px"} src="https://res.cloudinary.com/dycjjaxsk/image/upload/v1778010708/ChatGPT_Image_May_6_2026_01_17_53_AM_1_pj2weu.png"/>
         

          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#"
              className="text-[18px] font-medium text-[#111111] transition hover:text-black"
            >
              Explore
            </a>

            <a
              href="#"
              className="text-[18px] font-medium text-[#111111] transition hover:text-black"
            >
              Jobs
            </a>

            <a
              href="#"
              className="flex items-center gap-1 text-[18px] font-medium text-[#111111] transition hover:text-black"
            >
              Resources
              <ChevronDown className="h-4 w-4 stroke-[2.2]" />
            </a>

            <div className="h-6 w-px bg-zinc-300" />

            <a
              href="#"
              className="flex items-center gap-1 text-[18px] font-medium text-[#111111] transition hover:text-black"
            >
              Hire
              <ChevronDown className="h-4 w-4 stroke-[2.2]" />
            </a>
          </nav>
        </div>

        {/* Right */}
        {!loading && <div className="hidden md:flex items-center gap-4">
           
            {isAuthenticated ? 
             <div className='flex justify-center align-item'>
              
          
               <DropdownMenuHeader userImage={user?.user?.avatar?.url} />
              
              </div>
             :  <div className="flex items-center gap-4">
          <button onClick={()=>navigate("/auth")} className="cursor-pointer rounded-full bg-[#0057ff] px-6 py-3 text-[17px] font-semibold text-white shadow-sm transition hover:bg-[#0047d6]">
            Create Now
          </button>

          <button onClick={()=>navigate("/auth")} className="cursor-pointer rounded-full border border-zinc-300 bg-white px-6 py-3 text-[17px] font-semibold text-[#1d4ed8] transition hover:bg-zinc-50">
            Sign In
          </button>

          
        </div> }
          </div>}
      </div>
    </header>
  );
};

export default Navbar;
