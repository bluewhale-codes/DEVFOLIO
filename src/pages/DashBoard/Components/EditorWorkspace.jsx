import React , {useState} from 'react'
import { useSelector } from 'react-redux'
import FloatingToolbar from './FloatingToolbar';
import TypographyPanel from './TypographyPanel';


const EditorWorkspace = () => {
  const {theme } = useSelector((state)=>state.panelSlice);
  
  console.log(theme)
  return (
    <>
    <div>
        {theme.content}
    </div>
    </>
  )
}

export default EditorWorkspace