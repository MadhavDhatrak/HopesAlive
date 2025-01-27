import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// ... imports remain the same

function HeroSection() {
  return (
    <div className="relative min-h-[90vh] bg-gradient-to-b from-orange-50/50 to-white font-poppins overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      
      <div className="container mx-auto px-4 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left relative z-10"
          >
            {/* Emergency Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full mb-8 text-sm font-medium"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              24/7 Emergency Response Available
            </motion.div>

            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Every Life Matters, <br/>
              <span className="text-orange-600">Every Action Counts</span>
            </h1>
            
            <p className="text-lg lg:text-xl text-gray-600 mb-8 font-inter max-w-xl">
              Join our mission to protect and care for street animals. Your quick action today could save a precious life.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Link to="/report-incident">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto px-8 py-4 bg-orange-500 text-white rounded-xl hover:bg-orange-600 
                           transition-all font-semibold shadow-lg hover:shadow-orange-200/50 
                           flex items-center justify-center gap-2 group"
                >
                  <span>Report Now</span>
                  <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                </motion.button>
              </Link>
              <Link to="/contact">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto px-8 py-4 bg-white text-orange-500 border-2 border-orange-500 
                           rounded-xl hover:bg-orange-50 transition-all font-semibold 
                           flex items-center justify-center gap-2 group"
                >
                  <span>Join Us</span>
                  <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                </motion.button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 text-sm text-gray-500 justify-center lg:justify-start">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>1000+ Animals Rescued</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Trusted by 50+ NGOs</span>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Image Grid */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:grid grid-cols-2 gap-4 relative"
          >
            {/* Decorative Background */}
            <div className="absolute -top-10 -right-10 w-72 h-72 bg-orange-200 rounded-full filter blur-3xl opacity-20" />
            <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-blue-200 rounded-full filter blur-3xl opacity-20" />
            
            <div className="space-y-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="overflow-hidden rounded-2xl shadow-lg h-48 relative"
              >
                <img 
                  src="./rescue.jpg" 
                  alt="Veterinarian treating a street dog" 
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="overflow-hidden rounded-2xl shadow-lg h-64 relative"
              >
                <img 
                  src="./rescue2.png" 
                  alt="Animal rescue team in action" 
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </motion.div>
            </div>
            <div className="space-y-4 mt-8">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="overflow-hidden rounded-2xl shadow-lg h-64 relative"
              >
                <img 
                  src="./rescue3.jpg" 
                  alt="Volunteers feeding street animals" 
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="overflow-hidden rounded-2xl shadow-lg h-48 relative"
              >
                <img 
                  src="./rescue4.jpg" 
                  alt="Successfully rescued and happy animal" 
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;