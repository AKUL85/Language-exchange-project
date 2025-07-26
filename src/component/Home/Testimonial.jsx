import React from 'react';
import { motion } from "motion/react"
import { Search, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Auth/AuthProvider';
function Testimonial(props) {
     const {user}=useAuth()
     const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Marketing Manager',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
      text: 'LinguaConnect helped me become fluent in Spanish in just 6 months. The tutors are amazing!',
      rating: 5
    },
    {
      name: 'Ajmain',
      role: 'Software Engineer',
      image: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150',
      text: 'The flexibility to learn on my own schedule was perfect for my busy lifestyle.',
      rating: 5
    },
    {
      name: 'Emma Rodriguez',
      role: 'Teacher',
      image: 'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=150',
      text: 'As a tutor on this platform, I love connecting with students from around the world.',
      rating: 5
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
              What Our Students Say
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Real stories from our amazing community
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <div className="flex items-center mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 italic">
                  "{testimonial.text}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Ready to Start Your Language Journey?
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Join thousands of learners and start speaking a new language today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/find-tutors"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                <Search className="w-5 h-5 mr-2" />
                Find Your Tutor
              </Link>
              {
                !user?<Link
                to="/signup"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-200"
              >
                Get Started Free
              </Link>:""
              }
            </div>
          </motion.div>
        </div>
      </section>
        </div>
    );
}

export default Testimonial;