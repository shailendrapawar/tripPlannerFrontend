import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import Layout from './Layout.jsx'
import Login from './pages/authPages/Login.jsx'
import Register from './pages/authPages/Register.jsx'
import Home from './pages/Home.jsx'

import { Provider } from "react-redux"
import { store } from './store/store.js'
import PageLayout from './pages/PageLayout.jsx'
import PlanTrip from './pages/PlanTrip.jsx'
import UserProfile from './pages/UserProfile.jsx'
import Explore from './pages/Explore.jsx'
import Notification from './pages/Notification.jsx'

const myRouter = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Layout />}>

    {/* ==============auth routes============================ */}
    <Route path='' element={<Login />}></Route>
    <Route path='register' element={<Register />}></Route>


    {/* ===========user routes========================= */}
    <Route path='/user' element={<PageLayout />}>
      <Route path='/user/' element={<Home/>}></Route>
      <Route path='/user/explore' element={<Explore/>}></Route>
      <Route path='/user/planTrip' element={<PlanTrip/>}></Route>
      <Route path='/user/notification' element={<Notification/>}></Route>
      <Route path='/user/userProfile' element={<UserProfile/>}></Route>
    </Route>

  </Route>

))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={myRouter}>

      </RouterProvider>
    </Provider>
  </StrictMode>,
)
