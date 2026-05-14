import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter,createRoutesFromElements,Route,RouterProvider } from 'react-router'
import { Provider } from 'react-redux'
import store from './store/store.js'

import About01 from "./Components/Themes/AboutSection/Theme1/About01.jsx"
import MainLayout from './Components/Layout/MainLayout.jsx'
import Home from './pages/Home/Home.jsx'
import Component from './pages/DashBoard/Component.jsx'
import Auth from './pages/Auth/Auth.jsx'
import Hero from './pages/Home/Hero.jsx'
import Project from './pages/Home/Project.jsx'
import FeaturedProjects from './Components/Themes/ProjectsSection/Theme1/FeaturedProjects.jsx'
import WowTheme from './Components/Themes/ProjectsSection/Theme2/WowTheme.jsx'
import MyWorkspace from "./pages/DashBoard/MyWorkspace.jsx"
import AuthPage from './pages/Auth/Authpage.jsx'
import DeveloperDashboard from './pages/DeveloperProfile/DeveloperDashboard.jsx'
import Skill01 from './Components/Themes/SkillSection/Skill01.jsx'
import Test from "./Test.jsx"
import Test2 from './Test2.jsx'
import Preview from './pages/Preview/Preview.jsx'
import ShadowControlPanel from './pages/DashBoard/Components/ShadowControlPanel.jsx'


const router = createBrowserRouter(createRoutesFromElements(
  <>

      
        <Route path='/' element={<MainLayout/>}>
          <Route path='/home' element={<Home/>} />
        </Route>
        <Route path='/auth' element={<AuthPage/>} />
        <Route path='/Hero' element={<Hero/>} />
        <Route path='/project' element={<Project/>} />
        <Route path='/workspace' element={<MyWorkspace/>} />
        <Route path='/profile' element={<DeveloperDashboard/>}/>
      <Route path='/try-component' element={<Component/>}/>
      <Route path='/preview' element={<Preview/>}/>
      <Route path='/test' element={<Test/>}/>
      
  </>
))




createRoot(document.getElementById('root')).render(
  <Provider store={store}>

    <RouterProvider router={router}/>
  </Provider>
)
