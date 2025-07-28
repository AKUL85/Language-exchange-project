import React, { useState } from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Star,
  DollarSign,
  MessageCircle,
  Calendar,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '../Auth/AuthProvider';

function TutorDetails() {
  const tutor = useLoaderData();
  const { user } = useAuth();
  const [isBooking, setIsBooking] = useState(false);
  const [bookingMessage, setBookingMessage] = useState('');
  const navigate = useNavigate();

  if (!tutor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Tutor Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            The tutor you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }



  const handleBookTutor = async () => {
    if (!user?.email) {
      setBookingMessage('Please log in to book a tutor.');
      return;
    }

    setIsBooking(true);
    setBookingMessage('');

    const { _id, ...tutorDataWithoutId } = tutor;

    const bookingData = {
      ...tutorDataWithoutId,
      email: user.email,
      tutorId: tutor._id, // add tutorId to check duplicates
      bookedAt: new Date().toISOString(),
    };

    try {
      const res = await fetch('http://localhost:3000/bokedItem', {
      method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
    });

    // Check if server returned 409 for duplicate booking
    if (res.status === 409) {
      setBookingMessage('You already booked this tutor!');
      return;
    }

    if (!res.ok) throw new Error(`Error: ${res.status}`);

    setBookingMessage('Tutor booked successfully!');
    navigate('/my-booked-tutors');
  } catch (err) {
    console.error('Booking failed:', err);
    setBookingMessage('Failed to book tutor. Try again later.');
  } finally {
    setIsBooking(false);
  }
};


return (
  <div className="min-h-screen py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* Left Column - Tutor Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tutor Header */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
              <motion.img
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                src={tutor.image}
                alt={tutor.name}
                className="w-32 h-32 rounded-full object-cover"
              />
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {tutor.name}
                </h1>
                <div className="flex items-center justify-center md:justify-start space-x-4 mb-3">
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="w-5 h-5 text-blue-500" />
                    <span className="text-gray-600 dark:text-gray-300">
                      {tutor.language}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {tutor.review}
                    </span>
                    <span className="text-gray-600 dark:text-gray-300">
                      ({tutor.reviewCount} reviews)
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-center md:justify-start space-x-1 mb-4">
                  <DollarSign className="w-5 h-5 text-green-500" />
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    ${tutor.price}
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">/hour</span>
                </div>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              About Me
            </h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              {tutor.description.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-600 dark:text-gray-300">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Qualifications */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Qualifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {tutor.qualifications.map((qualification, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center space-x-2"
                >
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-600 dark:text-gray-300">
                    {qualification}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Booking Card */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 sticky top-8"
          >
            <div className="text-center mb-6">
              <div className="flex items-center justify-center space-x-1 mb-2">
                <DollarSign className="w-6 h-6 text-green-500" />
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  ${tutor.price}
                </span>
                <span className="text-gray-600 dark:text-gray-300">/hour</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Professional lesson
              </p>
            </div>

            {/* Tutor Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-300">Languages:</span>
                <span className="text-gray-900 dark:text-white font-medium">
                  {tutor.languages.join(', ')}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-300">Experience:</span>
                <span className="text-gray-900 dark:text-white font-medium">
                  {tutor.experience}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-300">Response time:</span>
                <span className="text-gray-900 dark:text-white font-medium">
                  {tutor.response_time}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-300">Lesson type:</span>
                <span className="text-gray-900 dark:text-white font-medium">
                  Video call
                </span>
              </div>
            </div>

            {/* Book Button */}
            {/* Removed the Link component wrapping the button, as it seems the intention is to perform an action (booking) */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBookTutor}
              disabled={isBooking}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isBooking ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Booking...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Now
                </div>
              )}
            </motion.button>

            <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-3">
              You can cancel or reschedule up to 24 hours before the lesson
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  </div>
)
}

export default TutorDetails