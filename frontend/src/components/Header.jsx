import { useState, useEffect } from 'react';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Report Incident', href: '/report' },
    { name: 'Volunteer', href: '/volunteer' },
    { name: 'Contact Us', href: '/contact' },
  ];

  return (
    <div className='flex justify-between items-center bg-white shadow-lg h-20'>
        <div>
            <p className='text-2xl font-bold text-orange-500 ml-10'>HopesAlive</p>
        </div>
         <div className='flex justify-between items-center gap-8 mr-4'>
            <p className='text-black hover:text-orange-400 font-bold cursor-pointer'  >Home</p>
            <p className='text-black hover:text-orange-400 font-bold cursor-pointer'>About Us</p>
            <p className='text-black hover:text-orange-400 font-bold cursor-pointer'>Report Incident</p>
            <p className="text-black hover:text-orange-400 font-bold cursor-pointer">Volunteer</p>
            <p className='text-black hover:text-orange-400 font-bold cursor-pointer'>Contact Us</p>
         </div>
    </div>
  );
}

export default Header;