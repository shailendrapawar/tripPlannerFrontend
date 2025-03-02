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

const myRouter = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Layout />}>

    <Route path='' element={<Login />}></Route>
    <Route path='/register' element={<Register />}></Route>


    <Route path='/user/home' element={<Home />}></Route>
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
