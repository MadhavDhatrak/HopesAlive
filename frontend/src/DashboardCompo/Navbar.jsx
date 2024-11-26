import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Navbar = () => {
  const [ngoName, setNgoName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNgoProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          toast.error('Please login again');
          navigate('/login');
          return;
        }

        console.log('Token:', token);

        const response = await axios.get('http://localhost:3000/api/ngo/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        console.log('Profile Response:', response.data);

        if (response.data && response.data.success) {
          setNgoName(response.data.name);
          toast.success('Welcome ' + response.data.name);
        }
      } catch (error) {
        console.error('Error details:', error.response || error);
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
        toast.error('Failed to load NGO profile');
      }
    };

    fetchNgoProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-semibold text-gray-800 ml-10">
              Animal Rescue Dashboard
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            {ngoName && (
              <div className="flex items-center mr-30 gap-2">
                <span className="text-gray-600">Welcome,</span>
                <span className="font-medium text-blue-600">{ngoName}</span>
              </div>
            )}
            
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <svg 
                className="h-4 w-4 mr-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;