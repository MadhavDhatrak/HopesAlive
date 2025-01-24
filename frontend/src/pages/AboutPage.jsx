import { motion } from 'framer-motion';
import { FaHandHoldingHeart, FaUsers, FaHospital } from 'react-icons/fa';
import { MdPets } from 'react-icons/md';

function AboutPage() {
  const values = [
    {
      icon: <FaHandHoldingHeart className="w-8 h-8" />,
      title: "Compassion",
      description: "Every animal deserves care and respect. We treat each case with dedication and empathy."
    },
    {
      icon: <FaUsers className="w-8 h-8" />,
      title: "Community",
      description: "Building a network of passionate volunteers and supporters to create lasting change."
    },
    {
      icon: <MdPets className="w-8 h-8" />,
      title: "Care",
      description: "Providing professional medical attention and rehabilitation for injured animals."
    },
    {
      icon: <FaHospital className="w-8 h-8" />,
      title: "Support",
      description: "24/7 emergency response and ongoing care for animals in need."
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-orange-50 to-white py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Mission to Protect and Care
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Since 2020, HopesAlive has been dedicated to the welfare of street animals, 
              creating a network of compassionate individuals and organizations working 
              together to make a difference.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full"/>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-orange-500 mb-4 flex justify-center">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Impact</h2>
            <p className="text-gray-600">
              Through the dedication of our volunteers and supporters, we've made a significant 
              difference in the lives of countless street animals.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { number: "1000+", label: "Animals Rescued" },
              { number: "500+", label: "Active Volunteers" },
              { number: "50+", label: "Partner NGOs" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center p-6 bg-white rounded-xl shadow-md"
              >
                <div className="text-4xl font-bold text-orange-500 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage; 