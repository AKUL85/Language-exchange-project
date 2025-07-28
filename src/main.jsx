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
import TutorDetails from './Pages/TutorDetails';
import MyTutorial from './Pages/MyTutorial';
import MyBokedTutor from './Pages/MyBokedTutor';
import ProtectedRoute from './Auth/ProtectedRoute';
import ErrorPages from './Pages/ErrorPages';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPages></ErrorPages>,
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
      },
      {
        path: '/signup',
        element: <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
        >
          <SignUp />
        </motion.div>
      },
      {
        path: '/add-tutorial',
        element: <ProtectedRoute>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <AddTutorial />
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
          <FindTutors />
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
      },
      {
        path: '/my-tutorials',
        element: <ProtectedRoute>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <MyTutorial />
          </motion.div>
        </ProtectedRoute>
      },
      {
        path: '/my-booked-tutors',
        element: <ProtectedRoute>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <MyBokedTutor />
          </motion.div>
        </ProtectedRoute>
      }
      , {

        path: '/find-tutors/:category?',
        element: <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          <FindTutors />
        </motion.div>,
        loader: () => fetch('http://localhost:3000/tutors'),
      },
      

    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />

    </AuthProvider>
  </StrictMode>,
);
