import React, { useEffect } from 'react'
import { getMyPreview } from '../../store/slice/panelSlice'
import { useDispatch, useSelector } from 'react-redux'
import { 
        HeroSectionTemplates,
        ProjectSectionTemplates,
        AboutSectionTemplates,
        SkillSectionTemplates,
        AchievementSectionTemplates,
        ContactSectionTemplates

    } from '../../TemplatesRegistry/templateRegistry'
const Preview = () => {

    const dispatch = useDispatch();
    const {preview} = useSelector((state)=>state.panelSlice);
    
    

    useEffect(()=>{
        dispatch(getMyPreview());
    },[])
  return (
    <>
      {/* hero section */}
       <div>
           {preview.map((item)=>{
                 if(item.section_id==="hero"){
                     return <>
                          <div>
                              {HeroSectionTemplates[item.theme.id].content}
                          </div>
                     </>
                 }
           })}
      </div>
      {/* About section */}
       <div>
           {preview.map((item)=>{
                 if(item.section_id==="About"){
                     return <>
                          <div>
                              {AboutSectionTemplates[item.theme.id].content}
                          </div>
                     </>
                 }
           })}
      </div>
      {/* skill section */}
       <div>
           {preview.map((item)=>{
                 if(item.section_id==="Skill"){
                     return <>
                          <div>
                              {SkillSectionTemplates[item.theme.id].content}
                          </div>
                     </>
                 }
           })}
      </div>
      {/* Achievement section */}
       <div>
           {preview.map((item)=>{
                 if(item.section_id==="Achievement"){
                     return <>
                          <div>
                              {AchievementSectionTemplates[item.theme.id].content}
                          </div>
                     </>
                 }
           })}
      </div>
      {/* Contact section */}
       <div>
           {preview.map((item)=>{
                 if(item.section_id==="Contact"){
                     return <>
                          <div>
                              {ContactSectionTemplates[item.theme.id].content}
                          </div>
                     </>
                 }
           })}
      </div>
      {/* Project section */}
       <div>
           {preview.map((item)=>{
                 if(item.section_id==="projects"){
                     return <>
                          <div>
                              {ProjectSectionTemplates[item.theme.id].content}
                          </div>
                     </>
                 }
           })}
      </div>
    
    </>
      
  )
}

export default Preview