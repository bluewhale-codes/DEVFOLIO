import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter,createRoutesFromElements,Route,RouterProvider } from 'react-router'
import { Provider } from 'react-redux'
import store from './store/store.js'

import About01 from "./Components/Themes/AboutSection/Theme1/About01.jsx"
import MainLayout from './Components/Layout/MainLayout.jsx'
import Home from './pages/Home/Home.jsx'
import Component from './pages/DashBoard/Component.jsx'

import Hero from './pages/Home/Hero.jsx'
import Project from './pages/Home/Project.jsx'
import FeaturedProjects from './Components/Themes/ProjectsSection/Theme1/FeaturedProjects.jsx'
import WowTheme from './Components/Themes/ProjectsSection/Theme2/WowTheme.jsx'
import MyWorkspace from "./pages/DashBoard/MyWorkspace.jsx"
import AuthPage from "./pages/Auth/AuthPage.jsx"
import DeveloperDashboard from './pages/DeveloperProfile/DeveloperDashboard.jsx'
import Skill01 from './Components/Themes/SkillSection/Skill01.jsx'
import Test from "./Test.jsx"
import Test2 from './Test2.jsx'
import Preview from './pages/Preview/Preview.jsx'
import ShadowControlPanel from './pages/DashBoard/Components/ShadowControlPanel.jsx'
import MyPortfolio from './myPortfolio/MyPortfolio.jsx'
import PortfolioLayout from './myPortfolio/PortfolioLayout.jsx'
import MyHero from './myPortfolio/MyHero.jsx'
import AboutMe from './myPortfolio/AboutMe.jsx'
import Skills from './myPortfolio/Skills.jsx'
import Achievements from './myPortfolio/Achievements.jsx'
import MyProject from './myPortfolio/Project.jsx'
import ContactSocialHub from './myPortfolio/ContactSocialHub.jsx'
import UserManagementPage from './SwachhPUAbhiyanAdmin/UserManagementPage.jsx'
import ProfileDetailPage from './SwachhPUAbhiyanAdmin/ProfileDetailPage.jsx'
import TaskManagementPage from './SwachhPUAbhiyanAdmin/TaskManagementPage.jsx'
import TaskDetailPage from './SwachhPUAbhiyanAdmin/TaskDetailPage.jsx'
import AdminLoginPage from './SwachhPUAbhiyanAdmin/AdminLoginPage.jsx'


const router = createBrowserRouter(createRoutesFromElements(
<>

      
        <Route path='/' element={<MainLayout/>}>
          <Route path='/home' element={<Home/>} />
        </Route>
        // Route for my MyPortfolio
        <Route path='/' element={<PortfolioLayout/>}>
          <Route path='/hero' element={<MyHero/>} />
          <Route path='/aboutme' element={<AboutMe/>}/>
          <Route path='/skills' element={<Skills/>}/>
          <Route path='/achievement' element={<Achievements/>}/>
          <Route path='/projects' element={<MyProject/>}/>
          <Route path='/contact' element={<ContactSocialHub/>} />
        </Route>
        
        <Route path='/auth' element={<AuthPage/>}/>
        <Route path='/Hero' element={<Hero/>} />
        <Route path='/project' element={<Project/>} />
        <Route path='/workspace' element={<MyWorkspace/>} />
        <Route path='/profile' element={<DeveloperDashboard/>}/>
      <Route path='/try-component' element={<Component/>}/>
      <Route path='/preview' element={<Preview/>}/>
      <Route path='/test' element={<Test/>}/>
      <Route path='/vishal' element={<MyPortfolio/>}/>
      <Route path='/admin' element={<UserManagementPage/>}/>
      <Route path="/users/:id" element={<ProfileDetailPage/>}/>
      <Route path="/tasks" element={<TaskManagementPage/>}/>
      <Route path="/tasks/detail/:id" element={<TaskDetailPage onBack={() => navigate(-1)}/>}/>
      <Route path="/admin/login" element={<AdminLoginPage/>}/>


      
  </>
))




createRoot(document.getElementById('root')).render(
  <Provider store={store}>

    <RouterProvider router={router}/>
  </Provider>
)
