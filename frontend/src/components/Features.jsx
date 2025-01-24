import { motion } from 'framer-motion';
import { BiSolidReport } from "react-icons/bi";
import { FaHandsHelping, FaHospital } from "react-icons/fa";
import { Link } from 'react-router-dom';

function Features() {
  const features = [
    {
      icon: <BiSolidReport className="w-6 h-6" />,
      title: "Quick Reporting",
      description: "Simple incident reporting system with real-time updates and location tracking",
      color: "from-orange-500/10 to-orange-500/5",
      iconColor: "text-orange-600",
      link: "/report-incident"
    },
    {
      icon: <FaHandsHelping className="w-6 h-6" />,
      title: "Volunteer Network",
      description: "Join our network of 1000+ volunteers working together to make a difference",
      color: "from-blue-500/10 to-blue-500/5",
      iconColor: "text-blue-600",
      link: "/volunteer"
    },
    {
      icon: <FaHospital className="w-6 h-6" />,
      title: "Professional Care",
      description: "Partnered with leading veterinary clinics and animal welfare organizations",
      color: "from-emerald-500/10 to-emerald-500/5",
      iconColor: "text-emerald-600",
      link: "/partners"
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(#f8f9fa_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="text-orange-600 font-semibold mb-4 block">
            Our Process
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            How We Make a Difference
          </h2>
          <p className="text-gray-600 text-lg">
            From instant reporting to professional care, we ensure every animal gets the help they need.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative group"
            >
              <Link to={feature.link}>
                <div className={`h-full bg-gradient-to-br ${feature.color} border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-all duration-300`}>
                  {/* Icon */}
                  <div className={`${feature.iconColor} bg-white shadow-sm p-4 rounded-xl inline-flex mb-6`}>
                    {feature.icon}
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 line-clamp-2">
                    {feature.description}
                  </p>

                  {/* Learn More Link */}
                  <div className="flex items-center text-sm font-medium text-gray-900 group-hover:text-orange-600 transition-colors">
                    Learn more
                    <svg 
                      className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" 
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
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 grid md:grid-cols-3 gap-8 bg-white rounded-2xl p-8 border border-gray-200"
        >
          {[
            { number: "1000+", label: "Animals Rescued" },
            { number: "24/7", label: "Emergency Support" },
            { number: "50+", label: "Partner NGOs" }
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Features;