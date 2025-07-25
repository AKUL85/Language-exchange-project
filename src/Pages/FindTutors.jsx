import React, { useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import { motion } from "motion/react"
import { Search, Globe } from 'lucide-react';
import TutorCard from './TutorCard'; 

function FindTutors() {
  const allData = useLoaderData();
  const { category } = useParams();
  const [searchTerm, setSearchTerm] = useState('');


let filteredTutors = allData;

if (category) {
  filteredTutors = filteredTutors.filter(tutor =>
    tutor.language.toLowerCase() === category.toLowerCase()
  );
}

if (searchTerm.trim() !== '') {
  const lowerSearch = searchTerm.toLowerCase();
  filteredTutors = filteredTutors.filter(tutor =>
    tutor.name.toLowerCase().includes(lowerSearch) ||
    tutor.language.toLowerCase().includes(lowerSearch)
  );
}


  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {category
              ? `${category.charAt(0).toUpperCase() + category.slice(1)} Tutors`
              : 'Find Your Perfect Tutor'}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover expert tutors ready to help you achieve your language learning goals
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by language or tutor name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
              />
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {filteredTutors.length} tutor{filteredTutors.length !== 1 ? 's' : ''} found
              </span>
            </div>
          </div>
        </motion.div>

        {/* Tutors Grid */}
        {filteredTutors.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
          >
            {filteredTutors.map((tutor, index) => (
              <motion.div
                key={tutor._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <TutorCard tutor={tutor} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <Globe className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No tutors found
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Try adjusting your search criteria or browse all tutors
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default FindTutors;
