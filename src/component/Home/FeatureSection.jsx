import React from 'react';
import { motion } from "motion/react"
import { Award, Clock, MessageCircle, Users } from 'lucide-react';
function FeatureSection(props) {
      const features = [
    {
      icon: Users,
      title: 'Expert Tutors',
      description: 'Learn from certified native speakers and professional language teachers'
    },
    {
      icon: Clock,
      title: 'Flexible Schedule',
      description: 'Book sessions that fit your schedule, available 24/7 worldwide'
    },
    {
      icon: Award,
      title: 'Quality Guaranteed',
      description: 'All tutors are verified and rated by our community'
    },
    {
      icon: MessageCircle,
      title: 'Interactive Learning',
      description: 'Engaging one-on-one sessions with real-time feedback'
    }
  ]
    return (
        <div>
            <section className="py-16 bg-white dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Why Choose LinguaConnect?
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            We make language learning accessible, effective, and enjoyable for everyone
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => {
                            const Icon = feature.icon
                            return (
                                <motion.div
                                    key={feature.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="text-center group"
                                >
                                    <div className="flex justify-center mb-4">
                                        <motion.div
                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                            className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center group-hover:shadow-lg transition-all duration-300"
                                        >
                                            <Icon className="w-8 h-8 text-white" />
                                        </motion.div>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        {feature.description}
                                    </p>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>


        </div>
    );
}

export default FeatureSection;