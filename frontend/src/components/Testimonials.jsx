import { motion } from 'framer-motion';
import { useState } from 'react';

function Testimonials() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const testimonials = [
    {
      name: "Max",
      type: "Rescued Dog",
      image: "https://asartraining.com/wp-content/uploads/2019/11/animal-rescue-specialist-training.jpg",
      beforeImage: "/max-before.jpg",
      story: "From streets to a loving home",
      quote: "Max was found injured on the streets. Thanks to quick reporting and our volunteers, he's now happy and healthy in his forever home.",
      location: "Mumbai, India"
    },
    {
      name: "Luna",
      type: "Street Cat",
      image: "https://i2-prod.liverpoolecho.co.uk/incoming/article10779530.ece/ALTERNATES/s615d/JS81003792.jpg",
      beforeImage: "/luna-before.jpg",
      story: "A miraculous recovery",
      quote: "Luna was severely malnourished when found. After weeks of care and attention, she transformed into a beautiful, healthy cat.",
      location: "Delhi, India"
    },
    {
      name: "Rocky",
      type: "Injured Puppy",
      image: "https://th.bing.com/th/id/OIP.8Ge7HpXks31MBKaNv44pWQHaHa?rs=1&pid=ImgDetMain",
      beforeImage: "/rocky-before.jpg",
      story: "From pain to playfulness",
      quote: "Rocky had a broken leg when rescued. Today, he runs and plays like any other happy puppy, thanks to timely medical intervention.",
      location: "Bangalore, India"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
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

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Success Stories
          </motion.h2>
          <motion.div 
            className="w-24 h-1.5 bg-orange-500 mx-auto rounded-full mb-8"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <motion.p 
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Every rescue has a story. Here are some of our successful interventions that changed lives.
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl"
            >
              {/* Image Container - Updated with both images */}
              <div className="relative h-64 overflow-hidden">
                {/* "After" Image (Always visible) */}
                <motion.img
                  src={testimonial.image}
                  alt={`${testimonial.name} after`}
                  className="w-full h-full object-cover absolute inset-0 transition-opacity duration-300"
                  style={{
                    opacity: hoveredIndex === index ? 0 : 1
                  }}
                />
                
                {/* "Before" Image (Shows on hover) */}
                <motion.img
                  src={testimonial.beforeImage}
                  alt={`${testimonial.name} before`}
                  className="w-full h-full object-cover absolute inset-0 transition-opacity duration-300"
                  style={{
                    opacity: hoveredIndex === index ? 1 : 0
                  }}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                
                {/* Hover Label */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                  className="absolute top-4 right-4 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium"
                >
                  Before
                </motion.div>

                {/* Title Content */}
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {testimonial.name}
                  </h3>
                  <p className="text-gray-200 flex items-center text-sm">
                    {testimonial.type}
                    <span className="mx-2">•</span>
                    <span>{testimonial.location}</span>
                  </p>
                </motion.div>
              </div>

              {/* Content Section */}
              <div className="p-6">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {testimonial.quote}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-orange-500 font-medium">
                      {testimonial.story}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-sm px-4 py-2 rounded-full bg-orange-100 text-orange-600 hover:bg-orange-200 transition-colors"
                    >
                      Read More
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Testimonials;