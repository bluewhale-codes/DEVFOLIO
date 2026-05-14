import { createSlice } from "@reduxjs/toolkit";
import TopFadeGrid from "../../pages/DashBoard/Background/TopFadeGrid";
const initialState = {
      
      Textdata:{},
      Layoutdata:{},
      editMode:false,
      section:{},
      theme:{},
      background:{id:"TopFadeGrid",image:"image",content:TopFadeGrid},
      elementId:"name",
      preview:[]

}

const saveSectionTheme = (
  section_id,
  theme
) => {
  // Get old data
  const existingSections =
    JSON.parse(
      localStorage.getItem("Preview")
    ) || [];

  // Create current object
  const currentSection = {
    section_id,
    theme,
  };

  // Find existing section
  const sectionIndex =
     existingSections.findIndex(
      (item) =>
        item.section_id === section_id
     );

  if (sectionIndex !== -1) {
    // Update theme only
    existingSections[sectionIndex].theme =
      theme;
  } else {
    // Add new section
    existingSections.push(currentSection);
  }

  // Save again
  localStorage.setItem(
    "Preview",
    JSON.stringify(existingSections)
  );
};

const loadState = () => {
  try {
    const serializedState =
      localStorage.getItem("Preview");

    if (!serializedState) return undefined;

    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

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
          },
          saveChanges:(state,action)=>{
               const section_id = action.payload.id;
               const theme = action.payload.theme;

               saveSectionTheme(section_id,theme);
          },
          getMyPreview:(state,action) => {
               state.preview = loadState();
          },
          setBackground:(state,action)=>{
               state.background = action.payload;
          }
     }

})

export const {setStyle,setMyLayout,setSection,resetSectionDetails,setTheme,setElementID,saveChanges,getMyPreview,setBackground} = panelSlice.actions
export default panelSlice.reducer