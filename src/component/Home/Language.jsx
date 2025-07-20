import React from 'react';
import { motion } from "motion/react"
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
function Language(props) {
    const languages = [
    {
      id: 1,
      name: 'English',
      icon: '🇺🇸',
      tutors: 150,
      category: 'english'
    },
    {
      id: 2,
      name: 'Spanish',
      icon: '🇪🇸',
      tutors: 120,
      category: 'spanish'
    },
    {
      id: 3,
      name: 'French',
      icon: '🇫🇷',
      tutors: 95,
      category: 'french'
    },
    {
      id: 4,
      name: 'German',
      icon: '🇩🇪',
      tutors: 80,
      category: 'german'
    },
    {
      id: 5,
      name: 'Italian',
      icon: '🇮🇹',
      tutors: 70,
      category: 'italian'
    },
    {
      id: 6,
      name: 'Portuguese',
      icon: '🇵🇹',
      tutors: 65,
      category: 'portuguese'
    },
    {
      id: 7,
      name: 'Chinese',
      icon: '🇨🇳',
      tutors: 85,
      category: 'chinese'
    },
    {
      id: 8,
      name: 'Japanese',
      icon: '🇯🇵',
      tutors: 60,
      category: 'japanese'
    },
    {
      id: 9,
      name: 'Korean',
      icon: '🇰🇷',
      tutors: 45,
      category: 'korean'
    }
  ]

    return (
        <div>
            <section className="py-16 bg-gray-50 dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Choose Your Language
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                            Explore our wide range of languages and find the perfect tutor for you
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {languages.map((language, index) => (
                            <motion.div
                                key={language.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                            >
                                <Link to={`/find-tutors/${language.category}`}>
                                    <div className="p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center space-x-3">
                                                <span className="text-3xl">{language.icon}</span>
                                                <div>
                                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                                        {language.name}
                                                    </h3>
                                                    <p className="text-gray-600 dark:text-gray-300">
                                                        {language.tutors} tutors available
                                                    </p>
                                                </div>
                                            </div>
                                            <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-blue-500 transition-colors" />
                                        </div>
                                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${Math.min(language.tutors / 2, 100)}%` }}
                                                transition={{ duration: 1, delay: index * 0.1 }}
                                                className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                                            />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
}

export default Language;