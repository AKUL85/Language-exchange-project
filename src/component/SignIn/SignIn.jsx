import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock } from 'lucide-react';
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../Auth/AuthProvider';



const SignIn = () => {
  const { signInWithEmailPass, signInwithGmail } =useAuth()
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [formError, setFormError] = useState('');

  const validateForm = () => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');
    setFormError('');

    if (!email) {
      setEmailError('Email is required.');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Email address is invalid.');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Password is required.');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
      isValid = false;
    }

    return isValid;
  };

  const handleSignIn = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    signInWithEmailPass(email, password)
      .then((res) => {
        toast.success('Signed in successfully!');
        console.log('User:', res.user);
        navigate('/');
      })
      .catch((error) => {
        console.error('Sign-in error:', error);
        setFormError(error.message || 'Sign-in failed.');
        toast.error(error.message || 'Sign-in failed.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleGoogleSignIn = () => {
    setLoading(true);
    setFormError('');
    signInwithGmail()
      .then((res) => {
        toast.success('Signed in with Google!');
        console.log('Google user:', res.user);
        navigate('/');
      })
      .catch((error) => {
        console.error('Google sign-in error:', error);
        setFormError(error.message || 'Google sign-in failed.');
        toast.error(error.message || 'Google sign-in failed.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const inputVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
    hover: { scale: 1.02, transition: { duration: 0.2 } },
  };

  const buttonVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { delay: 0.3, type: "spring", stiffness: 300, damping: 24 } },
    hover: { scale: 1.05, boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.2)", transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 to-white p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md backdrop-filter backdrop-blur-sm bg-opacity-80 border border-gray-200"
      >
        <h2 className="text-4xl font-extrabold text-center mb-8 text-gray-800">Welcome Back!</h2>
        <form onSubmit={handleSignIn} className="space-y-6">
          <motion.div
            variants={inputVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            className="relative"
          >
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="email"
              placeholder="Email Address"
              name='email'
              className={`w-full bg-white  text-black pl-10 pr-4 py-3 border ${emailError ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all duration-200`}
              value={email}
              onChange={(e) => { setEmail(e.target.value); setEmailError(''); setFormError(''); }} // Clear error on change
              required
            />
            {emailError && <p className="text-red-500 text-sm mt-1 ml-1">{emailError}</p>}
          </motion.div>

          <motion.div
            variants={inputVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            className="relative"
          >
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="password"
              name='password'
              placeholder="Password"
              className={`w-full bg-white  text-black pl-10 pr-4 py-3 border ${passwordError ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all duration-200`}
              value={password}
              onChange={(e) => { setPassword(e.target.value); setPasswordError(''); setFormError(''); }} // Clear error on change
              required
            />
            {passwordError && <p className="text-red-500 text-sm mt-1 ml-1">{passwordError}</p>}
          </motion.div>

          {formError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline ml-2">{formError}</span>
            </motion.div>
          )}

          <motion.button
            type="submit"
            variants={buttonVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
            className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold text-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </motion.button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500 bg-opacity-80 rounded-full">OR</span>
          </div>
        </div>

        <motion.button
          onClick={handleGoogleSignIn}
          variants={buttonVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          whileTap="tap"
          className="w-full flex items-center justify-center bg-red-500 text-white py-3 rounded-md font-semibold text-lg hover:bg-red-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
          disabled={loading}
        >
          <FcGoogle className="mr-3" size={20} />
          {loading ? "Signing In with Google..." : "Sign In with Google"}
        </motion.button>

        <p className="mt-8 text-center text-gray-600 text-md">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline font-medium">
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default SignIn;