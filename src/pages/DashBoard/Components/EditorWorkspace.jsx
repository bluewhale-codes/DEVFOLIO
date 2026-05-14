import React , {useState} from 'react'
import { useSelector } from 'react-redux'
import FloatingToolbar from './FloatingToolbar';
import TypographyPanel from './TypographyPanel';
import BottomPinkGlow from '../Background/BottomPinkGlow';
import { gradientBackground } from '../Background/backgroundGradient';

const EditorWorkspace = () => {
  const {theme,background } = useSelector((state)=>state.panelSlice);
  
  const Comp = theme.content;

  console.log(background);
  return (
    <>
    <div>

      {gradientBackground.map((obj)=>{
        return <>
            {obj.id===background.id && <obj.content MainComponent={Comp}/>}
        </>
      })}
        
    </div>
    </>
  )
}

export default EditorWorkspace