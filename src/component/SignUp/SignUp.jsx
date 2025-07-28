import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Image } from 'lucide-react';
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; 
import { useAuth } from '../../Auth/AuthProvider';

const SignUp = () => {
  const { user, loading, setLoading, signInWithEmailPass, signInwithGmail,createUser } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');


  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [formError, setFormError] = useState('');
  const navigate=useNavigate()
  const validateForm = () => {
    let isValid = true;
    setNameError('');
    setEmailError('');
    setPasswordError('');
    setFormError('');

    if (!name) {
      setNameError('Name is required.');
      isValid = false;
    }

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
    } else if (password.length < 8) { // Stronger password for sign-up
      setPasswordError('Password must be at least 8 characters long.');
      isValid = false;
    }

    return isValid;
  };
const handleSignUp = (e) => {
  e.preventDefault();

  if (!validateForm()) {
    toast.error('Please fix the errors in the form.');
    return;
  }

  const form = e.target;
  const name = form.name.value;
  const email = form.email.value;
  const photo = form.photo.value;
  const password = form.password.value;

  console.log(name, password, photo, email);
  setLoading(true);

  createUser(email, password)
    .then((res) => {
      console.log('User created:', res.user);
      toast.success('Account created successfully!');
      form.reset();
      navigate('/')
      
    })
    .catch((error) => {
      console.error('Sign up error:', error.message);
      toast.error(error.message || 'Sign up failed. Please try again.');
      setFormError(error.message);
    })
    .finally(() => {
      setLoading(false);
    });
};
const handleGoggle = () => {
  setLoading(true);

  signInwithGmail()
    .then((res) => {
      console.log('Google sign-in success:', res.user);
      toast.success('Signed in with Google successfully!');
      navigate('/')
    })
    .catch((error) => {
      console.error('Google sign-in error:', error.message);
      toast.error(error.message || 'Google sign-in failed.');
    })
    .finally(() => {
      setLoading(false);
    });
};


 
  

  const inputVariants = {
    initial: { opacity: 0, x: -10 },
    animate: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 24, delay: 0.1 } },
    hover: { scale: 1.02, transition: { duration: 0.2 } },
  };

  const buttonVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { delay: 0.4, type: "spring", stiffness: 300, damping: 24 } },
    hover: { scale: 1.05, boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.2)", transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 to-white p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md backdrop-filter backdrop-blur-sm bg-opacity-80 border border-gray-200"
      >
        <h2 className="text-4xl font-extrabold text-center mb-8 text-gray-800">Join Us Today!</h2>
        <form onSubmit={handleSignUp} className="space-y-6">
          <motion.div
            variants={inputVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            className="relative"
          >
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Your Name"
              className={`w-full pl-10 pr-4 py-3 border 
                     ${nameError ? 'border-red-500' : 'border-gray-300'} 
                     rounded-md focus:ring-2 focus:ring-green-400 
                     focus:border-transparent outline-none transition-all duration-200 
                     bg-white  text-black `}

              value={name}
              name='name'
              onChange={(e) => { setName(e.target.value); setNameError(''); setFormError(''); }}
              required
            />
            {nameError && <p className="text-red-500 text-sm mt-1 ml-1">{nameError}</p>}
          </motion.div>

          <motion.div
            variants={inputVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            className="relative"
          >
            <Image className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="url"
              name='photo'
              placeholder="Photo URL (Optional)"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none bg-white  text-black transition-all duration-200"
              value={photoUrl}
              onChange={(e) => { setPhotoUrl(e.target.value); setFormError(''); }}
            />
          </motion.div>

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
              name='email'
              placeholder="Email Address"
              className={`w-full  bg-white  text-black pl-10 pr-4 py-3 border ${emailError ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-green-400  focus:border-transparent outline-none transition-all duration-200`}
              value={email}
              onChange={(e) => { setEmail(e.target.value); setEmailError(''); setFormError(''); }}
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
              placeholder="Password"
              name='password'
              className={`w-full bg-white  text-black pl-10 pr-4 py-3 border ${passwordError ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none transition-all duration-200`}
              value={password}
              onChange={(e) => { setPassword(e.target.value); setPasswordError(''); setFormError(''); }}
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
            className="w-full bg-green-600 text-white py-3 rounded-md font-semibold text-lg hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
            disabled={loading}
          >
            Sign Up
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
          onClick={handleGoggle}
          variants={buttonVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          whileTap="tap"
          className="w-full flex items-center justify-center bg-red-500 text-white py-3 rounded-md font-semibold text-lg hover:bg-red-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
          disabled={loading}
        >
          <FcGoogle className="mr-3" size={20} />
          Sign Up with Google
        </motion.button>

        <p className="mt-8 text-center text-gray-600 text-md">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline font-medium">
            Sign In
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default SignUp;