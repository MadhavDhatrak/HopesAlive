import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaHandsHelping, FaHeart, FaUsers } from 'react-icons/fa';

function VolunteerPage() {
  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-orange-50 to-white">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Become a Volunteer
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Join our network of compassionate individuals making a real difference in the lives of street animals.
          </p>
          <Link to="/register">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-orange-500 text-white rounded-xl font-semibold 
                       hover:bg-orange-600 transition-colors shadow-lg hover:shadow-orange-200/50
                       flex items-center justify-center gap-2 mx-auto"
            >
              Register as Volunteer
              <FaHeart className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>

        {/* Benefits Section */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-xl shadow-md"
          >
            <FaHandsHelping className="w-12 h-12 text-orange-500 mb-4" />
            <h3 className="text-xl font-bold mb-4">Make an Impact</h3>
            <p className="text-gray-600">
              Help rescue and care for animals in need. Your actions can save lives and create lasting change.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 rounded-xl shadow-md"
          >
            <FaUsers className="w-12 h-12 text-orange-500 mb-4" />
            <h3 className="text-xl font-bold mb-4">Join Our Community</h3>
            <p className="text-gray-600">
              Connect with like-minded individuals who share your passion for animal welfare.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="bg-white p-8 rounded-xl shadow-md"
          >
            <FaHeart className="w-12 h-12 text-orange-500 mb-4" />
            <h3 className="text-xl font-bold mb-4">Gain Experience</h3>
            <p className="text-gray-600">
              Learn valuable skills in animal care, rescue operations, and community service.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default VolunteerPage; 