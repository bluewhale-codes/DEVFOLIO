import React from 'react';
import { Handshake  } from 'lucide-react';
import { MinimalistHero } from '../../Components/ui/minimalist-hero'; // Adjust the import path as needed
import { HeroSection04 } from '../../Components/ui/hero-02';

const Hero = () => {
  const navLinks = [
    { label: 'HOME', href: '#' },
    { label: 'PRODUCT', href: '#' },
    { label: 'STORE', href: '#' },
    { label: 'ABOUT US', href: '#' },
  ];

  const socialLinks = [
    { icon: Handshake, href: '#' },
    { icon: Handshake, href: '#' },
    { icon: Handshake, href: '#' },
    { icon: Handshake, href: '#' },
  ];


  const save = async (heading,text) =>{

    const data = {
        "heading":heading,
        "text":text
    }
        
      try{
           const res = axios.post("http://localhost:3000/save-Herodata" , data);
           console.log(res.data);
      }catch(error){
           console.log(error.message.data);
      }
  }

  return (
    // <MinimalistHero
      
    //   logoText="mnmlst."
    //   navLinks={navLinks}
    //   mainText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ultrices, justo vel tempus."
    //   readMoreLink="#"
    //   imageSrc="https://ik.imagekit.io/fpxbgsota/image%2013.png?updatedAt=1753531863793"
    //   imageAlt="A portrait of a person in a black turtleneck, in profile."
    //   overlayText={{
    //     part1: 'less is',
    //     part2: 'more.',
    //   }}
    //   socialLinks={socialLinks}
    //   locationText="Arlington Heights, IL"
    // />
    <HeroSection04/>
  );
};

export default Hero;
