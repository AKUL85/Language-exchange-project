import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Image,
  Globe,
  DollarSign,
  FileText,
  Save,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../Auth/AuthProvider';

function AddTutorial() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    image: '',
    language: '',
    price: '',
    description: '',
    review: 0,
    availability: [],
    qualifications: [],
    languages: [],
    experience: '',
    response_time: '',
    lesson_type: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  // Sync formData with user data when user becomes available
  useEffect(() => {
    if (user?.email || user?.displayName) {
      setFormData((prev) => ({
        ...prev,
        name: user.displayName || '',
        email: user.email || '',
      }));
    }
  }, [user]);

  const languages = [
    'English','Bangla', 'Spanish', 'French', 'German', 'Italian', 'Portuguese',
    'Chinese', 'Japanese', 'Korean', 'Arabic', 'Russian', 'Dutch',
    'Hindi', 'Turkish', 'Polish', 'Swedish', 'Norwegian', 'Danish',
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3000/tutors', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Tutorial added successfully!');
        setFormData({
          name: user?.displayName || '',
          email: user?.email || '',
          image: '',
          language: '',
          price: '',
          description: '',
          review: 0,
          availability: [],
          qualifications: [],
          languages: [],
          experience: '',
          response_time: '',
          lesson_type: '',
        });
      } else {
        toast.error('Failed to add tutorial. Please try again.');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading state until user is available
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Add Your Tutorial
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Share your expertise and help others learn your language
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name and Email Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    readOnly
                    required
                    className="pl-10 w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white bg-gray-50 dark:bg-gray-700 cursor-not-allowed"
                    placeholder="Your full name"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    readOnly
                    required
                    className="pl-10 w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white bg-gray-50 dark:bg-gray-700 cursor-not-allowed"
                    placeholder="Your email address"
                  />
                </div>
              </div>
            </div>

            {/* Image and Language */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Profile Image URL
                </label>
                <div className="relative">
                  <Image className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="url"
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    required
                    className="pl-10 w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                    placeholder="https://example.com/your-image.jpg"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="language"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Primary Language
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    id="language"
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                    required
                    className="pl-10 w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                  >
                    <option value="">Select a language</option>
                    {languages.map((lang) => (
                      <option key={lang} value={lang}>
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Experience, Response Time, Lesson Type */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label
                  htmlFor="experience"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Experience
                </label>
                <input
                  type="text"
                  id="experience"
                  name="experience"
                  value={formData.experience || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                  placeholder="e.g. 5+ years"
                />
              </div>

              <div>
                <label
                  htmlFor="response_time"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Response Time
                </label>
                <input
                  type="text"
                  id="response_time"
                  name="response_time"
                  value={formData.response_time || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                  placeholder="e.g. 1 hour"
                />
              </div>

              <div>
                <label
                  htmlFor="lesson_type"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Lesson Type
                </label>
                <input
                  type="text"
                  id="lesson_type"
                  name="lesson_type"
                  value={formData.lesson_type || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                  placeholder="e.g. One-on-one video lessons"
                />
              </div>
            </div>

            {/* Availability */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Availability
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                  <label key={day} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name="availability"
                      value={day}
                      checked={formData.availability?.includes(day) || false}
                      onChange={(e) => {
                        const newAvailability = formData.availability || [];
                        if (e.target.checked) {
                          setFormData({ ...formData, availability: [...newAvailability, day] });
                        } else {
                          setFormData({ ...formData, availability: newAvailability.filter((d) => d !== day) });
                        }
                      }}
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{day}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Qualifications */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Qualifications
              </label>
              {formData.qualifications.map((q, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={q}
                    onChange={(e) => {
                      const updated = [...formData.qualifications];
                      updated[index] = e.target.value;
                      setFormData({ ...formData, qualifications: updated });
                    }}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                    placeholder={`Qualification #${index + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const updated = formData.qualifications.filter((_, i) => i !== index);
                      setFormData({ ...formData, qualifications: updated });
                    }}
                    className="text-red-500 hover:text-red-700 text-xl font-bold"
                    title="Remove"
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setFormData({ ...formData, qualifications: [...formData.qualifications, ''] })}
                className="mt-2 px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
              >
                + Add Qualification
              </button>
            </div>

            {/* Languages Spoken */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Languages Spoken
              </label>
              <div className="flex flex-wrap gap-3">
                {languages.map((lang) => (
                  <label key={lang} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value={lang}
                      checked={formData.languages?.includes(lang)}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        const value = e.target.value;
                        setFormData((prev) => ({
                          ...prev,
                          languages: checked
                            ? [...(prev.languages || []), value]
                            : (prev.languages || []).filter((l) => l !== value),
                        }));
                      }}
                      className="accent-blue-600"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-200">{lang}</span>
                  </label>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-1">You can select multiple languages</p>
            </div>

            {/* Price */}
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Price per Hour (USD)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="1"
                  max="200"
                  className="pl-10 w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                  placeholder="25"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Description
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="pl-10 w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white resize-vertical"
                  placeholder="Tell students about your teaching experience, methodology, and what makes your lessons unique..."
                />
              </div>
            </div>

            {/* Preview Card */}
            {formData.image && formData.language && formData.price && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Preview
                </h3>
                <div className="flex items-center space-x-4">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-16 h-16 rounded-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/64x64?text=User';
                    }}
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {formData.name}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      {formData.language} • ${formData.price}/hr
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Adding Tutorial...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Save className="w-5 h-5 mr-2" />
                  Add Tutorial
                </div>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default AddTutorial;