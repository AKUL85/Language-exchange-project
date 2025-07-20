import React from 'react';
import { motion } from "motion/react"
import { Link } from 'react-router-dom';
import { BookOpen, Search } from 'lucide-react';
function Hero(props) {
    return (
        <div className='relative overflow-hidden bg-gradient-to-br from-green-200 via-white to-blue-100 dark:from-gray-900 dark:to-gray-700 '>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20'>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                            Learn Languages with
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                                {' '}Expert Tutors
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                            Connect with certified native speakers and professional language teachers.
                            Start your language learning journey in a friendly, supportive environment.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                to="/find-tutors"
                                className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                            >
                                <Search className="w-5 h-5 mr-2" />
                                Find Tutors
                            </Link>
                            <Link
                                to="/add-tutorial"
                                className="inline-flex items-center justify-center px-8 py-3 border-2 border-blue-500 text-blue-500 font-semibold rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200"
                            >
                                <BookOpen className="w-5 h-5 mr-2" />
                                Become a Tutor
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative z-10">
                            <img
                                src="https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=600"
                                alt="Language Learning"
                                className="rounded-2xl shadow-2xl"
                            />
                        </div>
                        <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 blur-3xl"></div>
                        <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 blur-3xl"></div>
                    </motion.div>
                </div>
            </div>

        </div>
    );
}

export default Hero;