import { useState } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import indianCities from "../data/indianCities";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function ReportIncident() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    description: "",
    location: {
      type: "Point",
      coordinates: [],
      address: "",
    },
    animalInfo: {
      description: "",
      aiSeverityAssessment: {
        score: 0,
        category: "PENDING",
        assessmentDetails: "",
      },
    },
    city: "",
  });

  const [error, setError] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleCityChange = (e) => {
    const selectedCity = e.target.value.toLowerCase();
    const cityData = indianCities[selectedCity];

    if (cityData) {
      setFormData((prev) => ({
        ...prev,
        city: cityData.name,
        location: {
          ...prev.location,
          type: "Point",
          coordinates: cityData.coordinates,
        },
      }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError("File size should be less than 10MB");
        return;
      }

      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading("Submitting report...");

    try {
      const formDataToSend = new FormData();

      if (imageFile) {
        formDataToSend.append("animalPhoto", imageFile);
      }

      formDataToSend.append(
        "data",
        JSON.stringify({
          description: formData.description,
          location: formData.location,
          animalInfo: {
            description: formData.animalInfo.description,
            aiSeverityAssessment: formData.animalInfo.aiSeverityAssessment,
          },
          city: formData.city,
        })
      );

      const token = localStorage.getItem("token");
      const userRole = localStorage.getItem("userRole"); // Get user role

      const response = await fetch(
        "http://localhost:3000/api/incidents/create",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataToSend,
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.dismiss(loadingToast);
        toast.success("Incident reported successfully!");

        // Redirect based on user role
        const role = userRole?.toLowerCase();
        switch (role) {
          case "volunteer":
            navigate("/voldash");
            break;
          case "ngo":
            navigate("/dashboard");
            break;
          case "user":
            navigate("/user-dashboard");
            break;
          default:
            navigate("/user-dashboard");
            break;
        }
      } else {
        throw new Error(data.message || "Failed to submit report");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.dismiss(loadingToast);
      toast.error(error.message || "Failed to submit report");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />

      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <a
                  href="/"
                  className="text-orange-500 hover:text-orange-600 transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </li>
              <li className="text-gray-700">Report Incident</li>
            </ol>
          </nav>

          {/* Form Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100"
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Report an Incident
            </h1>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl">
                {error}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Incident Description */}
                  <div className="space-y-2">
                    <h2 className="text-lg font-semibold text-gray-900">
                      Basic Information
                    </h2>
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Incident Description *
                      </label>
                      <textarea
                        rows={3}
                        className="w-full rounded-xl bg-white shadow-sm transition-all text-sm border-gray-200 outline-none placeholder:text-gray-400 p-2"
                        placeholder="Describe what happened (e.g., Stray cat found injured)"
                        value={formData.description}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                        required
                      />
                    </div>
                  </div>

                  {/* Location Section */}
                  <div className="space-y-2">
                    <h2 className="text-lg font-semibold text-gray-900">
                      Location Details
                    </h2>
                    <div className="bg-gray-50 p-4 rounded-xl space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          City *
                        </label>
                        <select
                          className="w-full rounded-xl bg-white shadow-sm transition-all text-sm border-gray-200 outline-none p-2 placeholder:text-gray-400"
                          onChange={handleCityChange}
                          value={formData.city.toLowerCase()}
                          required
                        >
                          <option value="">Select a city</option>
                          {Object.values(indianCities).map((city) => (
                            <option
                              key={city.name}
                              value={city.name.toLowerCase()}
                            >
                              {city.name}, {city.state}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Detailed Address *
                        </label>
                        <input
                          type="text"
                          className="w-full rounded-xl p-2 bg-white shadow-sm transition-all text-sm border-gray-200 outline-none placeholder:text-gray-400"
                          placeholder="Enter specific location"
                          value={formData.location.address}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              location: {
                                ...prev.location,
                                address: e.target.value,
                              },
                            }))
                          }
                          required
                        />
                      </div>

                      {formData.location.coordinates.length > 0 && (
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Longitude
                            </label>
                            <input
                              type="text"
                              className="w-full rounded-xl p-2 bg-white shadow-sm transition-all text-sm border-gray-200 outline-none placeholder:text-gray-400"
                              value={formData.location.coordinates[0]}
                              readOnly
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Latitude
                            </label>
                            <input
                              type="text"
                              className="w-full rounded-xl p-2 bg-white shadow-sm transition-all text-sm border-gray-200 outline-none placeholder:text-gray-400"
                              value={formData.location.coordinates[1]}
                              readOnly
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-2">
                    <h2 className="text-lg font-semibold text-gray-900">
                      Contact Information
                    </h2>
                    <div className="bg-gray-50 p-4 rounded-xl space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Reporter's Contact Info */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Your Name (Optional)
                          </label>
                          <input
                            type="text"
                            className="w-full rounded-xl p-2 bg-white shadow-sm transition-all text-sm border-gray-200 outline-none placeholder:text-gray-400"
                            placeholder="Enter your name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Contact Number (Optional)
                          </label>
                          <input
                            type="tel"
                            className="w-full rounded-xl p-2 bg-white shadow-sm transition-all text-sm border-gray-200 outline-none placeholder:text-gray-400"
                            placeholder="Enter phone number"
                          />
                        </div>
                      </div>

                      {/* Emergency Contact Toggle */}
                      <div>
                        <label className="flex items-center space-x-2 text-sm text-gray-700">
                          <input
                            type="checkbox"
                            className="rounded text-orange-500 focus:ring-orange-500"
                          />
                          <span>
                            This is an emergency - Immediate attention required
                          </span>
                        </label>
                      </div>

                      {/* Additional Notes */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Additional Notes (Optional)
                        </label>
                        <textarea
                          rows={2}
                          className="w-full rounded-xl p-2 bg-white shadow-sm transition-all text-sm border-gray-200 outline-none placeholder:text-gray-400"
                          placeholder="Any other relevant information..."
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Animal Information */}
                  <div className="space-y-2">
                    <h2 className="text-lg font-semibold text-gray-900">
                      Animal Details
                    </h2>
                    <div className="bg-gray-50 p-4 rounded-xl space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Animal Description *
                        </label>
                        <textarea
                          rows={3}
                          className="w-full rounded-xl p-2 bg-white shadow-sm transition-all text-sm border-gray-200 outline-none placeholder:text-gray-400"
                          placeholder="Describe the animal's condition"
                          value={formData.animalInfo.description}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              animalInfo: {
                                ...prev.animalInfo,
                                description: e.target.value,
                              },
                            }))
                          }
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Severity Category *
                          </label>
                          <select
                            className="w-full rounded-xl p-2 bg-white shadow-sm transition-all text-sm border-gray-200 outline-none placeholder:text-gray-400"
                            value={
                              formData.animalInfo.aiSeverityAssessment.category
                            }
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                animalInfo: {
                                  ...prev.animalInfo,
                                  aiSeverityAssessment: {
                                    ...prev.animalInfo.aiSeverityAssessment,
                                    category: e.target.value,
                                  },
                                },
                              }))
                            }
                            required
                          >
                            <option value="PENDING">Select severity</option>
                            <option value="LOW">Low</option>
                            <option value="MODERATE">Moderate</option>
                            <option value="HIGH">High</option>
                            <option value="CRITICAL">Critical</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Severity Score (1-10) *
                          </label>
                          <input
                            type="number"
                            min="1"
                            max="10"
                            className="w-full rounded-xl p-2 bg-white shadow-sm transition-all text-sm border-gray-200 outline-none placeholder:text-gray-400"
                            value={
                              formData.animalInfo.aiSeverityAssessment.score
                            }
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                animalInfo: {
                                  ...prev.animalInfo,
                                  aiSeverityAssessment: {
                                    ...prev.animalInfo.aiSeverityAssessment,
                                    score: parseInt(e.target.value),
                                  },
                                },
                              }))
                            }
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Assessment Details *
                        </label>
                        <textarea
                          rows={2}
                          className="w-full rounded-xl p-3 bg-white shadow-sm transition-all text-sm border-gray-200 outline-none placeholder:text-gray-400"
                          placeholder="Provide details about the severity assessment"
                          value={
                            formData.animalInfo.aiSeverityAssessment
                              .assessmentDetails
                          }
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              animalInfo: {
                                ...prev.animalInfo,
                                aiSeverityAssessment: {
                                  ...prev.animalInfo.aiSeverityAssessment,
                                  assessmentDetails: e.target.value,
                                },
                              },
                            }))
                          }
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Photo Evidence Section - Updated styling */}
                  <div className="space-y-3">
                    <h2 className="text-lg font-semibold text-gray-900">
                      Photo Evidence
                    </h2>
                    <div className="bg-gray-50 p-4 rounded-xl space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Upload Photo
                        </label>
                        <div
                          className="min-h-[200px] flex flex-col justify-center items-center px-4 py-6 border-2 border-gray-200 border-dashed rounded-xl bg-white hover:border-orange-500 transition-colors cursor-pointer"
                          onClick={() =>
                            document.getElementById("photo-upload").click()
                          }
                        >
                          {imagePreview ? (
                            <div className="relative w-full h-full flex flex-col items-center">
                              <img
                                src={imagePreview}
                                alt="Preview"
                                className="max-h-[160px] object-contain mx-auto rounded-lg shadow-md"
                              />
                              <div className="mt-4 text-sm text-gray-600">
                                Click to change image
                              </div>
                            </div>
                          ) : (
                            <div className="text-center">
                              <svg
                                className="mx-auto h-12 w-12 text-gray-400 mb-4"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 48 48"
                              >
                                <path
                                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <div className="text-sm text-gray-600 mb-2">
                                Drop image here, or click to select
                              </div>
                              <p className="text-xs text-gray-500">
                                PNG, JPG up to 10MB
                              </p>
                            </div>
                          )}
                          <input
                            id="photo-upload"
                            name="photo-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageUpload}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-orange-500 text-white py-3 rounded-xl hover:bg-orange-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-medium text-base shadow-lg hover:shadow-xl"
                >
                  Submit Report
                </button>
                <button
                  type="button"
                  className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-medium text-base"
                  onClick={() => window.history.back()}
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default ReportIncident;
