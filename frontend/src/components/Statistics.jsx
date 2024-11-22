import { useState } from 'react';
import { motion } from 'framer-motion';

function Statistics() {
  const [activeCity, setActiveCity] = useState(null);

  const cityStats = [
    { city: "Mumbai", incidents: 156, resolved: 142 },
    { city: "Delhi", incidents: 134, resolved: 120 },
    { city: "Bangalore", incidents: 98, resolved: 89 },
    { city: "Nashik", incidents: 45, resolved: 35 },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Our Impact Across Cities
        </h2>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Map Visualization */}
          <div className="relative h-[400px] bg-white rounded-xl shadow-lg p-4">
            {/* Add your map component here */}
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              Interactive Map Coming Soon
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-2 gap-4">
            {cityStats.map((stat) => (
              <motion.div
                key={stat.city}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-xl shadow-lg"
              >
                <h3 className="text-xl font-semibold mb-2">{stat.city}</h3>
                <div className="text-orange-500 text-2xl font-bold mb-1">
                  {stat.incidents}
                </div>
                <p className="text-gray-600 text-sm">Total Incidents</p>
                <div className="mt-2 text-green-500">
                  {Math.round((stat.resolved / stat.incidents) * 100)}% Resolved
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <button className="bg-orange-500 text-white px-8 py-3 rounded-full hover:bg-orange-600 transition-colors">
            Help Us Improve These Numbers
          </button>
        </div>
      </div>
    </section>
  );
}

export default Statistics;