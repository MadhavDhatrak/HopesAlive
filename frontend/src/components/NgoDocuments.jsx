import { useState } from "react";
import api from "../utils/axios";
import { toast } from "react-toastify";

const NgoDocuments = ({ userId, onComplete }) => {
  const [loading, setLoading] = useState(false);

  const initiateDocuSignProcess = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Authentication token not found");
        return;
      }

      setLoading(true);
      const response = await api.post("/api/docusign/create-ngo-signing-url", {
        userId,
        documentType: "ngo-onboarding",
      });

      window.location.href = response.data.redirectUrl;
    } catch (error) {
      toast.error("Failed to initiate document signing");
      console.error("Error details:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4">Required NGO Documents</h3>
      <p className="text-gray-600 mb-4">
        Please review and sign the following documents:
        <ul className="list-disc ml-5 mt-2">
          <li>NGO Partnership Agreement</li>
          <li>Terms of Service</li>
          <li>Data Protection Agreement</li>
        </ul>
      </p>
      <button
        onClick={initiateDocuSignProcess}
        disabled={loading}
        className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:bg-gray-300"
      >
        {loading ? "Processing..." : "Sign Documents"}
      </button>
    </div>
  );
};

export default NgoDocuments; 