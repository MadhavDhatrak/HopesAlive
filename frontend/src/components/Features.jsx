import { motion } from 'framer-motion';

function Features() {
  const features = [
    {
      icon: "🐾",
      title: "Report Incidents",
      description: "Easily report animal incidents in your city with our streamlined reporting system",
      color: "bg-blue-50",
      hoverColor: "hover:bg-blue-100",
      iconBg: "bg-blue-100",
      delay: 0.2
    },
    {
      icon: "🤝",
      title: "Volunteer Network",
      description: "Join our network of dedicated volunteers who take swift action to help animals in need",
      color: "bg-orange-50",
      hoverColor: "hover:bg-orange-100",
      iconBg: "bg-orange-100",
      delay: 0.4
    },
    {
      icon: "❤️",
      title: "NGO Support",
      description: "Partner NGOs provide professional care, shelter, and rehabilitation services",
      color: "bg-green-50",
      hoverColor: "hover:bg-green-100",
      iconBg: "bg-green-100",
      delay: 0.6
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const titleVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        duration: 0.8
      }
    }
  };

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="py-24 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            How HopesAlive Works
          </motion.h2>
          <motion.div 
            className="w-24 h-1.5 bg-orange-500 mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-8 px-4"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              className={`${feature.color} rounded-2xl p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-xl ${feature.hoverColor}`}
            >
              <div className={`${feature.iconBg} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto`}>
                <span className="text-4xl">{feature.icon}</span>
              </div>
              
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>

              <motion.div 
                className="mt-6"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a 
                  href="#" 
                  className="inline-flex items-center text-orange-500 font-medium hover:text-orange-600 transition-colors"
                >
                  Learn more
                  <svg 
                    className="w-5 h-5 ml-2" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M13 7l5 5m0 0l-5 5m5-5H6" 
                    />
                  </svg>
                </a>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

export default Features;