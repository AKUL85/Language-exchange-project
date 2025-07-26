import React, { useEffect, useState } from 'react';
import { useAuth } from '../Auth/AuthProvider';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import UpdateModal from '../component/UpdateTutorial/UpdateModal';
import LoadingSpinner from '../component/LoadingSpinner';

function MyTutorial() {
  const { user } = useAuth();
  const [emailData, setEmailData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    const [editingTutorial, setEditingTutorial] = useState(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [deleting, setDeleting] = useState(false);

 useEffect(() => {
  if (user?.email) {
    setLoading(true);
    setError(null);

    fetch(`https://language-exchange-server.onrender.com/tutors/email?email=${user.email}`, {
      credentials: 'include',
    })
      .then(async (res) => {
        if (!res.ok) {
         
          const errorText = await res.text();
          throw new Error(errorText || `HTTP error! status: ${res.status}`);
        }
       
        const text = await res.text();
        return text ? JSON.parse(text) : null; 
      })
      .then(data => {
        setEmailData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch tutor data:", err);
        setError("Failed to load tutor data. Please try again later.");
        setLoading(false);
      });
  } else {
    setLoading(false);
  }
}, [user?.email]);


 




const handleDelete = async () => {
  if (!emailData?._id) return;

  const sure = window.confirm('Are you sure you want to delete this tutorial?');
  if (!sure) return;

  try {
    setDeleting(true);

    const res = await fetch(`https://language-exchange-server.onrender.com/tutors/${emailData._id}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg || 'Failed to delete tutorial');
    }

   
    setEmailData(null);
    setIsEditModalOpen(false);
    setEditingTutorial(null);

  } catch (err) {
    console.error('Delete failed:', err);
    alert('Failed to delete tutorial');
  } finally {
    setDeleting(false);
  }
};

  const handleUpdate = (updatedTutorial) => {
  setEmailData(updatedTutorial);
  setIsEditModalOpen(false);
};
  const handleEdit = (emailData) => {
    setEditingTutorial(emailData)
    setIsEditModalOpen(true)
  }

  

  const cardVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  if (loading) {
    return (
      <LoadingSpinner></LoadingSpinner>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 p-6">
        <p className="text-xl text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 p-6">
      {emailData ? (
        <motion.div
          className="w-full lg:w-3/4 bg-white rounded-3xl shadow-2xl overflow-hidden"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          style={{
            boxShadow: '0 15px 30px rgba(0, 150, 0, 0.2), 0 5px 15px rgba(0, 0, 0, 0.1)', // Enhanced green shadow
          }}
        >
          <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <motion.img
                src={emailData.image}
                alt="Tutor"
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-green-500 shadow-lg"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              />
            </div>
            <div className="flex-grow text-center md:text-left">
              <motion.h2
                className="text-3xl md:text-4xl font-extrabold text-green-800 mb-2"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                {emailData.name}
              </motion.h2>
              <motion.p
                className="text-lg text-gray-700 mb-1"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <span className="font-semibold text-green-600">Language:</span> {emailData.language}
              </motion.p>
              <motion.p
                className="text-lg text-gray-700 mb-4"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <span className="font-semibold text-green-600">Price:</span> ${emailData.price}/hr
              </motion.p>
              <motion.div
                className="mt-6 border-t border-gray-200 pt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <h3 className="font-bold text-xl text-green-700 mb-3">What I Offer:</h3>
                <p className="text-gray-800 leading-relaxed text-justify">{emailData.description}</p>
              </motion.div>
            </div>
          </div>

          <div className="bg-gray-50 px-8 py-6 md:px-12 flex flex-col md:flex-row justify-end gap-4 border-t border-gray-100">
            <motion.button
                onClick={() => handleEdit(emailData)}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Update Tutorial
            </motion.button>
            <motion.button
              onClick={handleDelete}
              className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Delete Tutorial
            </motion.button>
          </div>
        </motion.div>
      ) :(
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Tutorials
            </h3>
            <p className="text-gray-600  mb-6">
              You haven't posted any programe yet. Start lunching tutorials!
            </p>
            <Link
              to="/add-tutorial"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
            >
              Post Course
            </Link>
          </motion.div>
        )}
        {isEditModalOpen && (
          <UpdateModal
            tutorial={editingTutorial}
            onClose={() => {
              setIsEditModalOpen(false)
              setEditingTutorial(null)
            }}
            onUpdate={handleUpdate}
          />
        )}
    </div>
  );
}

export default MyTutorial;