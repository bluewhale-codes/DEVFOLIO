import { createSlice } from "@reduxjs/toolkit";

const initialState = {
      Textdata:{}
}

const panelSlice = createSlice({
     name:"PanelState",
     initialState,
     reducers:{
          setStyle:(state,action)=>{
               state.Textdata = action.payload;
          }
     }

})

export const {setStyle} = panelSlice.actions
export default panelSlice.reducer