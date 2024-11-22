import { motion } from 'framer-motion';

function GetInvolved() {
  const cards = [
    {
      title: "Volunteer Now",
      description: "Join our network of compassionate volunteers",
      icon: "🤝",
      buttonText: "Join Us",
      color: "bg-blue-50"
    },
    {
      title: "Support an NGO",
      description: "Help our partner organizations make a difference",
      icon: "💝",
      buttonText: "Donate",
      color: "bg-orange-50"
    },
    {
      title: "Report an Incident",
      description: "Help us reach animals in need quickly",
      icon: "🐾",
      buttonText: "Report Now",
      color: "bg-green-50"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Get Involved
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`${card.color} rounded-xl p-8 text-center hover:shadow-xl transition-all`}
            >
              <div className="text-4xl mb-4">{card.icon}</div>
              <h3 className="text-xl font-semibold mb-4">{card.title}</h3>
              <p className="text-gray-600 mb-6">{card.description}</p>
              <button className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors">
                {card.buttonText}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default GetInvolved;