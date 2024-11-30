import { motion } from 'framer-motion'; // You'll need to install framer-motion
import { Link } from 'react-router-dom';

function HeroSection() {
  return (
    <div className="relative h-[85vh] flex items-center">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('https://th.bing.com/th/id/R.44e69d418107311e3337d49c206f028f?rik=vFmYDocfDntAIw&riu=http%3a%2f%2fgetwallpapers.com%2fwallpaper%2ffull%2fa%2fe%2f0%2f845125-cute-puppy-wallpapers-for-desktop-2560x1600-for-macbook.jpg&ehk=4tjwRmF1u%2f7MQL5M0FYBvlawr%2byTI1%2fNOu6SKllifSI%3d&risl=&pid=ImgRaw&r=0')",
          backgroundColor: 'rgba(0,0,0,0.65)',
          backgroundBlendMode: 'multiply'
        }}
      />
      
      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            See Them, Save Them,{" "}
            <span className="text-orange-400 block mt-2">Care for Them</span>
          </h1>
          
          <p className="text-xl text-gray-200 mb-12 leading-relaxed max-w-2xl mx-auto">
            Join us in creating a safe and loving world for animals in need. 
            Together, we can make a difference.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
             <Link to="/register">
            <button className="px-8 py-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transform hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-xl font-medium">
              Register 
            </button>
            </Link>
             <Link to="/login">
            <button  className="px-8 py-4 bg-white text-orange-500 rounded-lg hover:bg-gray-50 transform hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-xl font-medium">
              Login 
            </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-[1]"></div>
    </div>
  );
}

export default HeroSection;