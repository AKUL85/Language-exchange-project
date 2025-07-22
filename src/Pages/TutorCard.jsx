import { Link } from 'react-router-dom'
import { motion } from "motion/react"
import { Star, Clock, DollarSign, MessageCircle } from 'lucide-react'

function TutorCard({ tutor }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
    >
      <div className="relative">
        <img
          src={tutor.image}
          alt={tutor.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
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
          <div className="flex items-center space-x-1 text-blue-600 dark:text-blue-400">
            <DollarSign className="w-4 h-4" />
            <span className="font-bold">{tutor.price}</span>
            <span className="text-sm text-gray-500">/hr</span>
          </div>
        </div>

        <div className="flex items-center space-x-4 mb-3">
          <div className="flex items-center space-x-1">
            <MessageCircle className="w-4 h-4 text-green-500" />
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {tutor.language}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {tutor.reviewCount} reviews
            </span>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
          {tutor.description}
        </p>

        <Link
          to={`/tutor/${tutor._id}`}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 flex items-center justify-center"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  )
}

export default TutorCard