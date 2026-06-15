import React from 'react'
import { Outlet } from "react-router";




import Navbar from './Navbar';
import PortfolioFooter from './PortfolioFooter';

const PortfolioLayout = () => {
  return (
    <>
            <Navbar/>
            <Outlet/>
            <PortfolioFooter/>
            
            
    </>

  )
}

export default PortfolioLayout