import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from '../context/AuthContext';
import { motion } from "framer-motion";
import { FiMail, FiLock } from "react-icons/fi";

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
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
    const loadingToast = toast.loading("Logging in...");

    try {
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (response.ok) {
        // Store all necessary user data
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data._id);
        localStorage.setItem('userRole', data.role);
        localStorage.setItem('userName', data.name);

        // Debug log
        console.log('Login successful:', {
          userId: data._id,
          role: data.role,
          name: data.name
        });

        login({
          token: data.token,
          name: data.name,
          role: data.role,
          id: data._id
        });

        toast.dismiss(loadingToast);
        toast.success("Login successful!");

        // Redirect based on role
        switch (data.role) {
          case "ngo":
            navigate("/dashboard");
            break;
          case "volunteer":
            navigate("/voldash");
            break;
          default:
            navigate("/user-dashboard");
        }
      } else {
        toast.dismiss(loadingToast);
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.dismiss(loadingToast);
      toast.error("An error occurred during login");
    }
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="w-full max-w-4xl p-8 flex shadow-2xl rounded-2xl bg-white m-8">
          {/* Left side - Illustration */}
          <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-8 bg-orange-50 rounded-l-xl">
            <img 
              src="/helpinghand.png" 
              alt="Login" 
              className="w-full max-w-sm"
            />
          </div>

          {/* Right side - Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full lg:w-1/2 p-8"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800">Welcome Back!</h2>
              <p className="text-gray-600 mt-2">Please sign in to your account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10 w-full h-12 rounded-lg border-gray-200 shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 w-full h-12 rounded-lg border-gray-200 shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors duration-200 shadow-md"
              >
                Sign In
              </motion.button>

              <div className="text-center mt-6">
                <p className="text-gray-600">
                  Don't have an account?{" "}
                  <Link to="/register" className="text-orange-500 hover:text-orange-600 font-medium">
                    Sign up
                  </Link>
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginForm;
