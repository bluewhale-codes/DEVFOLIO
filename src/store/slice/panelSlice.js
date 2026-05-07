import { createSlice } from "@reduxjs/toolkit";

const initialState = {
      Textdata:{},
      Layoutdata:{}
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
          }
     }

})

export const {setStyle,setMyLayout} = panelSlice.actions
export default panelSlice.reducer