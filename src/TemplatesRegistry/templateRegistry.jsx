import Hero from "../pages/Home/Hero";
import { HeroSection04 } from "../Components/ui/hero-02";
import FeaturedProjects from "../Components/Themes/ProjectsSection/Theme1/FeaturedProjects";
import WowTheme from "../Components/Themes/ProjectsSection/Theme2/WowTheme";

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