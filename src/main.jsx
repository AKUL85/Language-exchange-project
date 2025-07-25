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
import AddTutorial from './Pages/AddTutorial';
import FindTutors from './Pages/FindTutors';
import TutorCard from './Pages/TutorCard';
import TutorDetails from './Pages/TutorDetails';
import MyTutorial from './Pages/MyTutorial';
import MyBokedTutor from './Pages/MyBokedTutor';
import ProtectedRoute from './Auth/ProtectedRoute';
import ErrorPages from './Pages/ErrorPages';
import { ThemeProvider } from './Auth/ThemeProvider';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: '/',
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
        path: '/login',
        element: <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
        >
          <SignIn />
        </motion.div>
      }
      , {
        path: '/signup',
        element: <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
        >
          <SignUp />
        </motion.div>
      }, {
        path: '/add-tutorial',
        element: <ProtectedRoute>
          <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <AddTutorial></AddTutorial>
        </motion.div>

        </ProtectedRoute>

      },
      {
        path: '/find-tutors',
        element: <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}

        >
          <FindTutors></FindTutors>
        </motion.div>,

        loader: () => fetch('http://localhost:3000/tutors'),
      },{
          path: '/find-tutors/:category',
        element: <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}

        >
          <FindTutors></FindTutors>
        </motion.div>,
        loader: () => fetch('http://localhost:3000/tutors'),
      },
      {
        path: '/tutor/:id',
        element: (
          <ProtectedRoute>
            <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <TutorDetails />
          </motion.div>
          </ProtectedRoute>
        ),
        loader: async ({ params }) => {
        
          const res = await fetch(`http://localhost:3000/tutors/${params.id}`);
          if (!res.ok) {
            throw new Response("Failed to load tutor", { status: res.status });
          }
          return res.json();
        },
      }
      , {
        path: '/my-tutorials',
        element: <ProtectedRoute>
          <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
        >
          <MyTutorial></MyTutorial>
        </motion.div>
        </ProtectedRoute>
      },
      {
        path:'/my-booked-tutors',
        element: <ProtectedRoute>
          <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
        >
          <MyBokedTutor></MyBokedTutor>
        </motion.div>
        </ProtectedRoute>
      },{
        path:'*',
        element:<ErrorPages></ErrorPages>
      }

    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider><RouterProvider router={router} /></AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)
