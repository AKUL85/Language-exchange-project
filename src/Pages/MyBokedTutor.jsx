import React, { useEffect, useState } from 'react';
import { useAuth } from '../Auth/AuthProvider';
import { motion } from 'framer-motion';
import {  
  Star, 
  DollarSign, 
  Globe, 
  MessageSquare,
  Calendar,
  BookOpen 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

function MyBokedTutor() {
  const [bookedData, setBookedData] = useState([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviewingTutor, setReviewingTutor] = useState(null);

  useEffect(() => {
    if (!user?.email) {
      setLoading(false);
      setBookedData([]);
      return;
    }

    setLoading(true);
    setError(null);

    fetch(`http://localhost:3000/bokedItem?email=${user.email}`,{
      credentials: 'include'
    })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        setBookedData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch booked data:", err);
        setError("Failed to load booked data. Please try again later.");
        setLoading(false);
      });
  }, [user?.email]);


  const handleReview = (tutorId) => {
    setReviewingTutor(tutorId);

    
    setTimeout(() => {
      setBookedData(prevData =>
        prevData.map(tutor =>
          tutor._id === tutorId
            ? { ...tutor, hasReviewed: true, reviewCount: (tutor.reviewCount || 0) + 1 }
            : tutor
        )
      );
      setReviewingTutor(null);
      toast.success("Review submitted successfully!");
    }, 1000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            My Booked Tutors
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Track your booked sessions and leave reviews for your tutors
          </p>
        </motion.div>

        {bookedData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookedData.map((tutor, index) => (
              <motion.div
                key={tutor._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={tutor.image}
                    alt={tutor.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-full px-3 py-1 flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {tutor.review}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {tutor.name}
                    </h3>
                    <div className="flex items-center space-x-1 text-green-600 dark:text-green-400">
                      <DollarSign className="w-4 h-4" />
                      <span className="font-bold">{tutor.price}</span>
                      <span className="text-sm text-gray-500">/hr</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center space-x-1">
                      <Globe className="w-4 h-4 text-blue-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {tutor.language}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4 text-purple-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {tutor.bookedAt ? new Date(tutor.bookedAt).toLocaleDateString() : ''}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1">
                      <MessageSquare className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {tutor.reviewCount || 0} reviews
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Status: <span className="text-green-600 dark:text-green-400 font-medium">Booked</span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleReview(tutor._id)}
                    disabled={tutor.hasReviewed || reviewingTutor === tutor._id}
                    className={`w-full py-2 px-4 rounded-lg font-semibold transition-all duration-200 ${
                      tutor.hasReviewed
                        ? 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transform hover:scale-105'
                    }`}
                  >
                    {reviewingTutor === tutor._id ? (
                      <div className="flex items-center justify-center">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Reviewing...
                      </div>
                    ) : tutor.hasReviewed ? (
                      <div className="flex items-center justify-center">
                        <Star className="w-4 h-4 mr-2 fill-current" />
                        Reviewed
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <Star className="w-4 h-4 mr-2" />
                        Leave Review
                      </div>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No Booked Tutors Yet
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              You haven't booked any tutors yet. Start exploring our amazing tutors!
            </p>
            <Link
              to="/find-tutors"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
            >
              Find Tutors
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default MyBokedTutor;
