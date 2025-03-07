import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import Layout from './Layout.jsx'
import Login from './pages/authPages/Login.jsx'
import Register from './pages/authPages/Register.jsx'
import Home from './pages/home/Home.jsx'

import { Provider } from "react-redux"
import { store } from './store/store.js'
import PageLayout from './pages/PageLayout.jsx'
import PlanTrip from './pages/planTrip/PlanTrip.jsx'
import UserProfile from './pages/userProfile/UserProfile.jsx'
import Explore from './pages/explore/Explore.jsx'
import Notification from './pages/notification/Notification.jsx'
import EditProfile from './pages/editProfile/EditProfile.jsx'
import MyTrips from './pages/myTrips/MyTrips.jsx'


const myRouter = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Layout />}>

    {/* ==============auth routes============================ */}
    <Route path='' element={<Login />}></Route>
    <Route path='register' element={<Register />}></Route>


    {/* ===========user routes========================= */}
    <Route path='/user' element={<PageLayout />}>
      <Route path='/user/' element={<Home />}></Route>
      <Route path='/user/explore' element={<Explore />}></Route>
      <Route path='/user/planTrip' element={<PlanTrip />}></Route>
      <Route path='/user/notification' element={<Notification />}></Route>

      <Route path='/user/userProfile' element={<UserProfile />}></Route>

      <Route path='/user/myTrips' element={<MyTrips/>} ></Route>

      <Route path='/user/editProfile' element={<EditProfile/>}></Route>
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
