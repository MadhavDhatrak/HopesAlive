import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import ConfirmationModal from './ConfirmationModel';

function IncidentList() {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [assigningId, setAssigningId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [assignedIncidents, setAssignedIncidents] = useState([]);

  // Fetch both available and assigned incidents
  useEffect(() => {
    fetchIncidents();
    fetchAssignedIncidents(); // New function to fetch assigned incidents
  }, []);

  const fetchIncidents = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/volunteer/incidents', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data && response.data.data) {
        // Filter out already assigned incidents
        const availableIncidents = response.data.data.filter(
          incident => !incident.volunteerActivity?.assignedVolunteer
        );
        setIncidents(availableIncidents);
      }
      setLoading(false);
    } catch (err) {
      console.error('Error fetching incidents:', err);
      toast.error(err.message || 'Failed to load incidents');
      setLoading(false);
    }
  };

  // New function to fetch assigned incidents
  const fetchAssignedIncidents = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/volunteer/my-assignments', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data && response.data.data) {
        setAssignedIncidents(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching assigned incidents:', err);
    }
  };

  // Handle opening confirmation modal
  const handleAssignClick = (incident) => {
    console.log("Selected incident for assignment:", incident); // Debug log
    console.log("Incident ID:", incident.id || incident._id); // Debug log for ID
    setSelectedIncident(incident);
    setShowModal(true);
  };

  // Handle actual assignment after confirmation
  const handleAssignIncident = async () => {
    const incidentId = selectedIncident?.id || selectedIncident?._id;
    
    if (!incidentId) {
      toast.error('Invalid incident ID');
      return;
    }

    try {
      setAssigningId(incidentId);
      const token = localStorage.getItem('token');

      const response = await axios.put(
        `http://localhost:3000/api/volunteer/incidents/${incidentId}/volunteer/update`,
        {
          volunteer_status: "On the way",
          status_update: "Volunteer is heading to the location"
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.message === "Status updated successfully") {
        toast.success("Successfully assigned to incident!");
        
        // Remove the incident from available incidents
        setIncidents(prevIncidents => 
          prevIncidents.filter(incident => 
            (incident.id !== incidentId && incident._id !== incidentId)
          )
        );

        // Add to assigned incidents
        setAssignedIncidents(prev => [...prev, selectedIncident]);
      }
    } catch (error) {
      console.error('Error assigning incident:', error);
      toast.error(error.response?.data?.message || 'Failed to assign incident');
    } finally {
      setAssigningId(null);
      setShowModal(false);
      setSelectedIncident(null);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Available Incidents */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-4 py-5 sm:px-6 border-b flex justify-between items-center">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Available Incidents
          </h3>
          <button 
            onClick={fetchIncidents}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reporter Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Severity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {incidents.map((incident) => (
                <tr key={incident.id || incident._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {(incident.id || incident._id)?.substring(0, 8)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {incident.location?.address || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {incident.animalInfo?.description || 'No description'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {incident.reporterInfo?.name || 'Anonymous'}
                    </div>
                    <div className="text-sm text-gray-500">
                      {incident.reporterInfo?.contactNumber || 'No phone'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      incident.animalInfo?.aiSeverityAssessment?.category === 'HIGH' 
                        ? 'bg-red-100 text-red-800' 
                        : incident.animalInfo?.aiSeverityAssessment?.category === 'MODERATE'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {incident.animalInfo?.aiSeverityAssessment?.category || 'N/A'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={() => handleAssignClick(incident)}
                      disabled={assigningId === (incident.id || incident._id)}
                      className={`px-4 py-2 rounded-md ${
                        assigningId === (incident.id || incident._id)
                          ? 'bg-gray-300 cursor-not-allowed'
                          : 'bg-orange-500 hover:bg-orange-600 text-white'
                      }`}
                    >
                      {assigningId === (incident.id || incident._id) 
                        ? 'Assigning...' 
                        : 'Assign to Me'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Assigned Incidents */}
      {assignedIncidents.length > 0 && (
        <div className="bg-white rounded-lg shadow">
          <div className="px-4 py-5 sm:px-6 border-b">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              My Assigned Incidents
            </h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reporter Info
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Severity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {assignedIncidents.map((incident) => (
                  <tr key={incident.id || incident._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {(incident.id || incident._id)?.substring(0, 8)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {incident.location?.address || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {incident.animalInfo?.description || 'No description'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {incident.reporterInfo?.name || 'Anonymous'}
                      </div>
                      <div className="text-sm text-gray-500">
                        {incident.reporterInfo?.contactNumber || 'No phone'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        incident.animalInfo?.aiSeverityAssessment?.category === 'HIGH' 
                          ? 'bg-red-100 text-red-800' 
                          : incident.animalInfo?.aiSeverityAssessment?.category === 'MODERATE'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {incident.animalInfo?.aiSeverityAssessment?.category || 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <span className="px-4 py-2 rounded-md bg-green-500 text-white">
                        Assigned to You
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <ConfirmationModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedIncident(null);
        }}
        onConfirm={handleAssignIncident}
        incidentDetails={selectedIncident}
      />
    </div>
  );
}

export default IncidentList;