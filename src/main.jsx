import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from "react-router-dom"
import Layout from './Layout.jsx'
import Login from './pages/authPages/Login.jsx'
import Register from './pages/authPages/Register.jsx'
import Home from './pages/home/Home.jsx'

import { Provider } from "react-redux"
import { store } from './store/store.js'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor } from './store/store.js'

import PageLayout from './pages/PageLayout.jsx'
import PlanTrip from './pages/planTrip/PlanTrip.jsx'
import UserProfile from './pages/userProfile/UserProfile.jsx'
import Explore from './pages/explore/Explore.jsx'
import Notification from './pages/notification/Notification.jsx'
import EditProfile from './pages/editProfile/EditProfile.jsx'
import MyTrips from './pages/myTrips/MyTrips.jsx'
import UserPublicPorfile from './pages/userPublicProfile/UserPublicPorfile.jsx'

import axios from 'axios'
import SingleTripPage from './pages/singleTripPage/SingleTripPage.jsx'
import ChatPage from './pages/chatPage/ChatPage.jsx'
axios.defaults.withCredentials = true
const myRouter = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Layout />}>

    {/* ==============auth routes============================ */}
    <Route path='' element={<Login />}></Route>
    <Route path='register' element={<Register />}></Route>

    {/* ===========user routes========================= */}
    <Route path='/user' element={<PageLayout />}>

      {/* =========routes for public users=============== */}
      <Route path='/user/' element={<Navigate to={"/user/explore"} />}></Route>
      <Route path='/user/explore' element={<Explore />}></Route>
      <Route path='/user/planTrip' element={<PlanTrip />}></Route>
      <Route path='/user/userPublicProfile/:userId' element={<UserPublicPorfile />}></Route>
      <Route path='/user/singleTripPage/:tripId' element={<SingleTripPage />}></Route>


      {/* ==============routes fir logged in user======================= */}
      <Route path='/user/notification' element={<Notification />}></Route>
      <Route path='/user/userProfile' element={<UserProfile />}></Route>
      <Route path='/user/myTrips' element={<MyTrips />} ></Route>
      <Route path='/user/editProfile' element={<EditProfile />}></Route>


      {/* ===============routes for chatting ===================== */}
      <Route path='/user/chatPage' element={<ChatPage />}></Route>

    </Route>

  </Route>
))



createRoot(document.getElementById('root')).render(
  <StrictMode>

    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={myRouter} >

        </RouterProvider>
      </PersistGate>
    </Provider>

  </StrictMode>,
)
