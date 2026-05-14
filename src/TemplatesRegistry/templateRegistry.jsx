import Hero from "../pages/Home/Hero";
import { HeroSection04 } from "../Components/ui/hero-02";
import FeaturedProjects from "../Components/Themes/ProjectsSection/Theme1/FeaturedProjects";
import WowTheme from "../Components/Themes/ProjectsSection/Theme2/WowTheme";
import About01 from "../Components/Themes/AboutSection/Theme1/About01";
import Skill01 from "../Components/Themes/SkillSection/Skill01";
import AchievementsGallery from "../Components/Themes/Achivements/AchievementsGallery";
import Contact01 from "../Components/Themes/ContactSection/Contact01";
import About02 from "../Components/Themes/AboutSection/Theme1/About02";
import About03 from "../Components/Themes/AboutSection/Theme1/About03";

export const HeroSectionTemplates= {
    "hero1":{
        id:"hero1",
        coverImage:"https://res.cloudinary.com/dycjjaxsk/image/upload/v1778147596/Screenshot_2026-05-07_152208_qibni3.png",
        label:"Hero",
        content:<Hero/>

    },
    "hero2":{
        id:"hero2",
        coverImage:"https://res.cloudinary.com/dycjjaxsk/image/upload/v1778150902/Screenshot_2026-05-07_161757_xukpll.png",
        label:"Hero2",
        content:<HeroSection04/>
    }
}
export const ProjectSectionTemplates= {
    "project1":{
        id:"project1",
        coverImage:"https://res.cloudinary.com/dycjjaxsk/image/upload/v1778149919/Screenshot_2026-05-07_160135_ulc0km.png",
        label:"Project1",
        content:<FeaturedProjects/>

    },
    "project2":{
        id:"project2",
        coverImage:"https://res.cloudinary.com/dycjjaxsk/image/upload/v1778150512/Screenshot_2026-05-07_161124_qpobyx.png",
        label:"Project2",
        content:<WowTheme/>
    }
}
export const AboutSectionTemplates = {
     "about1":{
        id:"about1",
        coverImage:"https://res.cloudinary.com/dycjjaxsk/image/upload/v1778313150/Screenshot_2026-05-09_130620_jchuav.png",
        label:"About1",
        content:<About01/>
     },
     "about2":{
        id:"about2",
        coverImage:"https://res.cloudinary.com/dycjjaxsk/image/upload/v1778313150/Screenshot_2026-05-09_130620_jchuav.png",
        label:"About2",
        content:<About02/>
     },
     "about3":{
        id:"about3",
        coverImage:"https://res.cloudinary.com/dycjjaxsk/image/upload/v1778313150/Screenshot_2026-05-09_130620_jchuav.png",
        label:"About3",
        content:<About03/>
     }
}
export const SkillSectionTemplates = {
     "skill1":{
        id:"skill1",
        coverImage:"https://res.cloudinary.com/dycjjaxsk/image/upload/v1778319131/ChatGPT_Image_May_9_2026_01_37_27_PM_tog3cv.png",
        label:"skill1",
        content:<Skill01/>
     }
}
export const AchievementSectionTemplates = {
     "achievement":{
        id:"achievement",
        coverImage:"https://res.cloudinary.com/dycjjaxsk/image/upload/v1778338917/Screenshot_2026-05-09_203022_xhz4wt.png",
        label:"achievement",
        content:<AchievementsGallery/>
     }
}
export const ContactSectionTemplates = {
     "contact":{
        id:"contact",
        coverImage:"https://res.cloudinary.com/dycjjaxsk/image/upload/v1778346431/Screenshot_2026-05-09_220006_qjdua0.png",
        label:"contact",
        content:<Contact01/>
     }
}