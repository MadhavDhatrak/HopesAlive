function Footer() {
    return (
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <img src="/logo-white.svg" alt="HopesAlive" className="h-8 mb-4" />
              <p className="text-gray-400">
                Making the world a better place for animals, one paw at a time.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {['Home', 'About', 'Volunteer', 'NGOs', 'Contact Us'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
  
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Email: help@carepaws.com</li>
                <li>Phone: +91 1234567890</li>
              </ul>
            </div>
  
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <span className="sr-only">{social}</span>
                     
                  </a>
                ))}
              </div>
            </div>
          </div>
  
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>Built with ❤️ by HopesAlive Team</p>
          </div>
        </div>
      </footer>
    );
  }
  
  export default Footer;