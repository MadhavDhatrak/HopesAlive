import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer"
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

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
        setTimeout(() => {
          navigate('/login');
        }, 1500);
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

  return (
     <>
       <Header/>
    <div className="flex items-center justify-center min-h-screen bg-gray-100"  >
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">Create Account</h2>

        {/* Basic Details */}
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full h-12 rounded-lg border-gray-300 shadow-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full h-12 rounded-lg border-gray-300 shadow-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="mt-1 block w-full h-12 rounded-lg border-gray-300 shadow-md input  focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 p-2 "
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="mt-1 block w-full h-12 rounded-lg border-gray-300 shadow-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="mt-1 block w-full h-12 rounded-lg border-gray-300 shadow-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="mt-1 block w-full h-12 rounded-lg border-gray-300 shadow-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="mt-1 block w-full h-12 rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 p-2"
            >
              <option value="user">User</option>
              <option value="volunteer">Volunteer</option>
              <option value="ngo">NGO</option>
            </select>
          </div>
        </div>

        {/* Role-Based Details */}
        {(formData.role === "volunteer" || formData.role === "ngo") && (
          <div className="mt-4">
            <h3 className="text-lg font-bold text-gray-800">
              {formData.role === "volunteer" ? "Volunteer Details" : "NGO Details"}
            </h3>
            <div className="grid grid-cols-1 gap-4">
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
            </div>
          </div>
        )}
        
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
        >
          Register
        </button>
      </form>
    </div>
     <Footer/>
    </>
  );
};

export default RegisterForm;