import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer"
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import VolunteerDocuments from "../components/VolunteerDocuments";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiLock, FiPhone, FiMapPin } from "react-icons/fi";
import NgoDocuments from "../components/NgoDocuments";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    city: "",
    phoneNumber: "",
    address: "",
    ngoDetails: { registrationNumber: "", organizationType: "", operatingAreas: "" },
    volunteerDetails: { availability: "", skills: "", experience: "" },
  });
  const [showDocuments, setShowDocuments] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRoleSpecificChange = (e, field) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [field]: { ...prevState[field], [name]: value },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const loadingToast = toast.loading('Registering...');
    console.log(formData);
    
    try {
      // Log the request details
      console.log('Attempting to connect to:', 'http://localhost:3000/api/users/register');
      console.log('With data:', formData);

      const response = await fetch('http://localhost:3000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      }).catch(error => {
        console.error('Fetch error:', error);
        throw new Error(`Network error: ${error.message}`);
      });

      // Check if response exists
      if (!response) {
        throw new Error('No response received from server');
      }

      // Log the response status
      console.log('Response status:', response.status);

      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok) {
        toast.dismiss(loadingToast);
        toast.success('Registration successful!');
        handleRegistrationSuccess(data);
      } else {
        toast.dismiss(loadingToast);
        toast.error(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Detailed error:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
      
      toast.dismiss(loadingToast);
      toast.error(
        error.message === 'Failed to fetch' 
          ? 'Cannot connect to server. Please check if the server is running.'
          : `Registration error: ${error.message}`
      );
    }
  };

  const handleRegistrationSuccess = (data) => {
    // Store the token
    if (data.token) {
        localStorage.setItem('token', data.token);
    }
    
    if (data.requiresDocuments) {
        setShowDocuments(true);
        setUserData(data);
    } else {
        // Redirect based on role
        if (formData.role === 'ngo') {
            navigate('/dashboard');
        } else if (formData.role === 'volunteer') {
            navigate('/volunteer/dashboard');
        } else {
            navigate('/user-dashboard');
        }
    }
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12">
        {!showDocuments ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-5xl mx-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="grid md:grid-cols-5">
                {/* Left side - Form */}
                <div className="p-8 md:col-span-3">
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
                  <p className="text-gray-600 mb-8">Join our community and make a difference</p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Details Grid */}
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Name Input */}
                      <div className="relative">
                        <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          name="name"
                          placeholder="Full Name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="pl-10 w-full h-12 rounded-lg border-gray-200 shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          required
                        />
                      </div>

                      {/* Email Input */}
                      <div className="relative">
                        <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          placeholder="Email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="pl-10 w-full h-12 rounded-lg border-gray-200 shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          required
                        />
                      </div>

                      {/* Password Input */}
                      <div className="relative">
                        <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="password"
                          name="password"
                          placeholder="Password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className="pl-10 w-full h-12 rounded-lg border-gray-200 shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          required
                        />
                      </div>

                      {/* City Input */}
                      <div className="relative">
                        <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          name="city"
                          placeholder="City"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="pl-10 w-full h-12 rounded-lg border-gray-200 shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          required
                        />
                      </div>

                      {/* Phone Number Input */}
                      <div className="relative">
                        <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="tel"
                          name="phoneNumber"
                          placeholder="Phone Number"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          className="pl-10 w-full h-12 rounded-lg border-gray-200 shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          required
                        />
                      </div>

                      {/* Address Input */}
                      <div className="relative">
                        <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          name="address"
                          placeholder="Address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="pl-10 w-full h-12 rounded-lg border-gray-200 shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          required
                        />
                      </div>
                    </div>

                    {/* Role Selection */}
                    <div className="flex gap-4 my-6">
                      {["user", "volunteer", "ngo"].map((role) => (
                        <motion.button
                          key={role}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          type="button"
                          onClick={() => setFormData({ ...formData, role })}
                          className={`flex-1 py-3 rounded-lg font-medium transition-colors duration-200 ${
                            formData.role === role
                              ? "bg-orange-500 text-white"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                        >
                          {role.charAt(0).toUpperCase() + role.slice(1)}
                        </motion.button>
                      ))}
                    </div>

                    {/* Role-specific fields */}
                    {formData.role === "volunteer" && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Availability</label>
                          <input
                            type="text"
                            name="availability"
                            value={formData.volunteerDetails.availability}
                            onChange={(e) => handleRoleSpecificChange(e, "volunteerDetails")}
                            className="mt-1 block w-full h-12 rounded-lg border-gray-300 shadow-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 p-2"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Skills</label>
                          <input
                            type="text"
                            name="skills"
                            value={formData.volunteerDetails.skills}
                            onChange={(e) => handleRoleSpecificChange(e, "volunteerDetails")}
                            className="mt-1 block w-full h-12 rounded-lg border-gray-300 shadow-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 p-2"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Experience</label>
                          <input
                            type="text"
                            name="experience"
                            value={formData.volunteerDetails.experience}
                            onChange={(e) => handleRoleSpecificChange(e, "volunteerDetails")}
                            className="mt-1 block w-full h-12 rounded-lg border-gray-300 shadow-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 p-2"
                          />
                        </div>
                      </>
                    )}

                    {formData.role === "ngo" && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Registration Number</label>
                          <input
                            type="text"
                            name="registrationNumber"
                            value={formData.ngoDetails.registrationNumber}
                            onChange={(e) => handleRoleSpecificChange(e, "ngoDetails")}
                            className="mt-1 block w-full h-12 rounded-lg border-gray-300 shadow-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 p-2"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Organization Type</label>
                          <input
                            type="text"
                            name="organizationType"
                            value={formData.ngoDetails.organizationType}
                            onChange={(e) => handleRoleSpecificChange(e, "ngoDetails")}
                            className="mt-1 block w-full h-12 rounded-lg border-gray-300 shadow-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 p-2"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Operating Areas</label>
                          <input
                            type="text"
                            name="operatingAreas"
                            value={formData.ngoDetails.operatingAreas}
                            onChange={(e) => handleRoleSpecificChange(e, "ngoDetails")}
                            className="mt-1 block w-full h-12 rounded-lg border-gray-300 shadow-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 p-2"
                          />
                        </div>
                      </>
                    )}

                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      type="submit"
                      className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors duration-200 shadow-md"
                    >
                      Create Account
                    </motion.button>
                  </form>
                </div>

                {/* Right side - Illustration/Info */}
                <div className="hidden md:block md:col-span-2 bg-orange-50 p-8">
                  <img 
                    src="/heart.png" 
                    alt="Register" 
                    className="w-full"
                  />
                  <div className="mt-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Why Join Us?</h3>
                    <ul className="space-y-3">
                      <li className="flex items-center text-gray-600">
                        <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                        Make a positive impact in your community
                      </li>
                      {/* Add more benefits */}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <>
            {formData.role === 'ngo' ? (
              <NgoDocuments 
                userId={userData._id} 
                onComplete={() => navigate('/dashboard')} 
              />
            ) : (
              <VolunteerDocuments 
                userId={userData._id} 
                onComplete={() => navigate('/volunteer/dashboard')} 
              />
            )}
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default RegisterForm;