import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BiSolidReport } from "react-icons/bi";
import { FaHandsHelping } from "react-icons/fa";

function GetInvolved() {
  return (
    <section className="py-24 bg-gradient-to-b from-orange-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Make a Difference Today
          </h2>
          <p className="text-lg text-gray-600">
            Every action counts. Whether you&apos;re reporting an incident or joining our network,
            you&apos;re helping create a better world for street animals.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Report Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl transform transition-transform group-hover:scale-[1.02]" />
            <div className="relative bg-white rounded-2xl p-8 shadow-lg transform transition-transform">
              <div className="bg-orange-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <BiSolidReport className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Report an Incident</h3>
              <p className="text-gray-600 mb-6">
                Spotted an animal in distress? Your quick action could save a life. 
                Our team will respond promptly to help the animal in need.
              </p>
              <Link to="/report-incident">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-orange-500 text-white py-4 px-6 rounded-xl font-semibold 
                           hover:bg-orange-600 transition-colors shadow-lg hover:shadow-orange-200/50
                           flex items-center justify-center gap-2"
                >
                  Report Now
                  <span className="text-xl">→</span>
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Volunteer Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl transform transition-transform group-hover:scale-[1.02]" />
            <div className="relative bg-white rounded-2xl p-8 shadow-lg transform transition-transform">
              <div className="bg-gray-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <FaHandsHelping className="w-8 h-8 text-gray-800" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Join Our Network</h3>
              <p className="text-gray-600 mb-6">
                Become a volunteer and be part of our mission. Help us create a 
                network of compassionate individuals making a real difference.
              </p>
              <Link to="/volunteer">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gray-800 text-white py-4 px-6 rounded-xl font-semibold 
                           hover:bg-gray-900 transition-colors shadow-lg hover:shadow-gray-200/50
                           flex items-center justify-center gap-2"
                >
                  Join Us
                  <span className="text-xl">→</span>
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default GetInvolved;
