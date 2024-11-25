import { useState, useEffect } from 'react';
import axios from 'axios';

const RecentIncidents = () => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        // Get token from localStorage
        const token = localStorage.getItem('token');
        
        const response = await axios.get('http://localhost:3000/api/incidents', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log('Incident data:', response.data);
        setIncidents(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching incidents:', err);
        setError('Failed to load incidents');
        setLoading(false);
      }
    };

    fetchIncidents();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Recent Incidents</h2>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Recent Incidents</h2>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Recent Incidents</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {incidents && incidents.map((incident) => (
          <div key={incident._id} className="bg-white rounded-lg overflow-hidden shadow-lg">
            {/* Image/Placeholder with Type Overlay */}
            <div className="relative h-48 bg-gray-200 flex items-center justify-center">
              {incident.animalInfo?.photo && (
                <img
                  src={`http://localhost:3000/api/uploads/${incident.animalInfo.photo}`}
                  alt={incident.animalInfo?.type || 'Animal'}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.log('Image failed to load:', incident.animalInfo.photo);
                    e.target.style.display = 'none';
                  }}
                />
              )}
              {/* Type Badge */}
              <div className="absolute top-2 left-2">
                <span className="bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                  {incident.animalInfo?.type || 'Unknown'}
                </span>
              </div>
              {/* Severity Badge */}
              <div className="absolute top-2 right-2">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold text-white ${
                  incident.animalInfo?.aiSeverityAssessment?.score >= 7 ? 'bg-red-500' :
                  incident.animalInfo?.aiSeverityAssessment?.score >= 4 ? 'bg-yellow-500' :
                  'bg-green-500'
                }`}>
                  {incident.animalInfo?.aiSeverityAssessment?.score >= 7 ? 'High' :
                   incident.animalInfo?.aiSeverityAssessment?.score >= 4 ? 'Medium' :
                   'Low'
                  }:{incident.animalInfo?.aiSeverityAssessment?.score || 0}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              {/* Description */}
              <div className="mb-4">
                <p className="text-gray-700">
                  {incident.animalInfo?.description}
                </p>
              </div>

              {/* Location */}
              <div className="mb-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  </svg>
                  <span>{incident.location?.address}</span>
                </div>
              </div>

              {/* Status */}
              <div className="mb-4">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                  incident.status === 'resolved' ? 'bg-green-100 text-green-800' :
                  incident.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  Status: {incident.status}
                </span>
              </div>

              {/* Reporter Info */}
              <div className="border-t border-gray-200 pt-4 mb-4">
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Reported by:</span> {incident.reporterInfo?.name}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Contact:</span> {incident.reporterInfo?.contactNumber}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Volunteer:</span>{' '}
                    {incident.volunteerActivity?.assignedVolunteer?.name || 'No Volunteer Assigned'}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Date:</span> {
                      new Date(incident.createdAt).toLocaleString('en-US', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })
                    }
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md text-sm font-medium hover:bg-blue-600 transition-colors">
                  View Details
                </button>
                <button className="flex-1 px-4 py-2 bg-green-500 text-white rounded-md text-sm font-medium hover:bg-green-600 transition-colors">
                  Mark Resolved
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentIncidents;