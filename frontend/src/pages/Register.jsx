import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer"
const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    city: "",
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
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="mt-1 block w-full h-12 rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 p-2"
            >
              <option value="user">User</option>
              <option value="volunteer">Volunteer</option>
              <option value="NGO">NGO</option>
            </select>
          </div>
        </div>

        {/* Role-Based Details */}
        {(formData.role === "volunteer" || formData.role === "NGO") && (
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

              {formData.role === "NGO" && (
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