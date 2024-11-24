import React, { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading('Logging in...');

    try {
      const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Store the token in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('userRole', data.role);
        
        toast.dismiss(loadingToast);
        toast.success('Login successful!');

        // Redirect based on user role
        if (data.role === 'ngo') {
          navigate('/dashboard');
        } else if (data.role === 'volunteer') {
          navigate('/report-incident');
        } else {
          navigate('/report-incident'); // Default redirect for regular users
        }
      } else {
        toast.dismiss(loadingToast);
        toast.error(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.dismiss(loadingToast);
      toast.error('An error occurred during login');
    }
  };

  return (
    <>
     <Header/>
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">Login</h2>

        <div className="grid grid-cols-1 gap-4">
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
              className="mt-1 block w-full h-12 rounded-lg border-gray-300 shadow-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 p-2"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
        >
          Login
        </button>
      </form>
    </div>
    <Footer/>
    </>
  );
};

export default LoginForm;