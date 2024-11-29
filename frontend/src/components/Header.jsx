import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userRole, setUserRole] = useState(null);

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    // Retrieve the user role from localStorage
    const role = localStorage.getItem('userRole');
    setUserRole(role);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Define common nav links
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact Us', href: '/contact' },
  ];

  // Add role-based links
  if (userRole === 'user') {
    navLinks.push({ name: 'User Dashboard', href: '/user-dashboard' });
  } else if (userRole === 'volunteer') {
    navLinks.push({ name: 'Volunteer Dashboard', href: '/voldash' });
  } else if (userRole === 'ngo') {
    navLinks.push({ name: 'NGO Dashboard', href: '/dashboard' });
  }

  return (
    <div
      className={`flex justify-between items-center ${
        scrolled ? 'bg-white shadow-lg' : 'bg-transparent'
      } h-20`}
    >
      <div>
        <p className="text-2xl font-bold text-orange-500 ml-10">HopesAlive</p>
      </div>
      <div className="flex justify-between items-center gap-8 mr-4">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.href}
            className="text-black hover:text-orange-400 font-bold cursor-pointer"
          >
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Header;
