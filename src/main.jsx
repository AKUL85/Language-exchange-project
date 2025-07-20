import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './Root';
import { motion } from "motion/react"
import SignIn from './component/SignIn/SignIn';
import SignUp from './component/SignUp/SignUp';
import AuthProvider from './Auth/AuthProvider';
import Home from './component/Home/Home'
const router = createBrowserRouter([
  {
    path: "/",
    element:<Root></Root>,
    children:[
      {
        path:'/',
        element: <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
              <Home></Home>
              </motion.div>
      },
      {
        path:'/login',
        element:<SignIn></SignIn>
      }
      ,{
        path:'/signup',
        element:<SignUp></SignUp>
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <AuthProvider><RouterProvider router={router} /></AuthProvider>
  </StrictMode>,
)
