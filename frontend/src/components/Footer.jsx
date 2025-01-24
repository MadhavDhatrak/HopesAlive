import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaInstagram, FaFacebook, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { BiSolidHeart } from "react-icons/bi";

function Footer() {
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Report Incident", path: "/report-incident" },
    { name: "Volunteer", path: "/volunteer" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const socialLinks = [
    {
      name: "Instagram",
      icon: <FaInstagram size={24} />,
      url: "#",
    },
    {
      name: "Facebook",
      icon: <FaFacebook size={24} />,
      url: "#",
    },
    {
      name: "Twitter",
      icon: <FaTwitter size={24} />,
      url: "#",
    },
    {
      name: "WhatsApp",
      icon: <FaWhatsapp size={24} />,
      url: "#",
    },
  ];

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Emergency Contact Banner */}
      <div className="bg-orange-500 py-3 text-center">
        <p className="text-white font-medium px-4">
          24/7 Emergency:{" "}
          <a
            href="tel:+911234567890"
            className="underline font-bold hover:text-gray-100"
          >
            1234-567-890
          </a>
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <Link to="/" className="flex-shrink-0">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2"
              >
                <div className="bg-orange-500 rounded-lg p-2">
                  <span className="text-xl font-bold text-white font-serif">
                    HA
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-xl font-bold text-gray-100">Hopes</span>
                  <span className="text-xl font-bold text-orange-500">
                    Alive
                  </span>
                </div>
              </motion.div>
            </Link>
            <p className="text-gray-400 mb-4 max-w-md">
              Making the world a better place for animals, one paw at a time.
            </p>
            <div className="flex space-x-4 mb-8 md:mb-0">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  whileHover={{ scale: 1.1 }}
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-orange-500 transition-colors block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-2">
                <MdEmail size={20} className="text-orange-500" />
                <a
                  href="mailto:help@hopesalive.com"
                  className="hover:text-orange-500 transition-colors"
                >
                  help@hopesalive.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MdPhone size={20} className="text-orange-500" />
                <a
                  href="tel:+911234567890"
                  className="hover:text-orange-500 transition-colors"
                >
                  +91 1234-567-890
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MdLocationOn size={20} className="text-orange-500" />
                <span>Mumbai, India</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for updates and success stories.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-orange-500 text-white"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p className="flex items-center justify-center gap-1 flex-wrap px-4">
            © 2024 HopesAlive. Built with{" "}
            <BiSolidHeart className="text-orange-500" /> for animals
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
