import { createSlice } from "@reduxjs/toolkit";

const initialState = {
      
      Textdata:{},
      Layoutdata:{},
      editMode:false,
      section:{},
      theme:{},
      elementId:"name"

}

const panelSlice = createSlice({
     name:"PanelState",
     initialState,
     reducers:{
          setStyle:(state,action)=>{
               state.Textdata = action.payload;
          },
          setMyLayout:(state,action)=>{
                state.Layoutdata = action.payload;
          },
          setSection:(state,action)=>{
               state.section = action.payload
               state.editMode = true
          },
          resetSectionDetails:(state,action)=>{
               state.editMode = false
               state.section = {}
          },
          setTheme:(state,action)=>{
               state.theme=action.payload
          },
          setElementID:(state,action)=>{
               state.elementId = action.payload
          }
     }

})

export const {setStyle,setMyLayout,setSection,resetSectionDetails,setTheme,setElementID} = panelSlice.actions
export default panelSlice.reducer