import React from 'react'
import { Outlet } from "react-router";


import Navbar from '../Navbar';
import DevfolioFooter from '../DevfolioFooter';

const MainLayout = () => {
  return (
    <>
            <Navbar/>
            <Outlet/>
            <DevfolioFooter/>
            
    </>

  )
}

export default MainLayout