import { Globe, Star, TrendingUp, Users } from 'lucide-react';
import React, { useState } from 'react';
import { motion } from "motion/react"

function States() {
  const [stats, setStats] = useState({
    tutors: 15,
    reviews: 194,
    languages: 20,
    users: 11
  });

  const [loading, setLoading] = useState(false);

  return (
    <section className='py-16 bg-white dark:bg-gray-900'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
          {[
            { label: 'Expert Tutors', value: stats.tutors, icon: Users },
            { label: 'Happy Reviews', value: stats.reviews, icon: Star },
            { label: 'Languages', value: stats.languages, icon: Globe },
            { label: 'Active Users', value: stats.users, icon: TrendingUp }
          ].map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: false }}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                  className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2"
                >
                  {loading ? (
                    <div className="animate-pulse bg-gray-300 h-8 w-16 mx-auto rounded"></div>
                  ) : (
                    stat.value.toLocaleString()
                  )}
                </motion.div>
                <p className="text-gray-600 dark:text-gray-300 font-medium">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default States;
