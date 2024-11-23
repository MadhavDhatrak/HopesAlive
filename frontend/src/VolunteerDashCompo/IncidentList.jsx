import { useState } from 'react';
import { format } from 'date-fns';

const sampleIncidents = [
  {
    id: 'INC001',
    location: 'Central Park',
    status: 'pending',
    severity: 'High',
    createdAt: '2024-02-20',
  },
  {
    id: 'INC002',
    location: 'Downtown',
    status: 'in-progress',
    severity: 'Medium',
    createdAt: '2024-02-19',
  },
  {
    id: 'INC003',
    location: 'Uptown',
    status: 'resolved',
    severity: 'Low',
    createdAt: '2024-02-18',
  },
];

function IncidentList() {
  const [incidents, setIncidents] = useState(sampleIncidents);

  const handleAssignIncident = (id) => {
    // Logic to assign the incident to the volunteer
    // This could involve updating the state or making an API call
    alert(`You have assigned yourself to incident ${id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-4 py-5 sm:px-6 border-b">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Incident List
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
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Severity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {incidents.map((incident) => (
              <tr key={incident.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {incident.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {incident.location}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${incident.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                      incident.status === 'in-progress' ? 'bg-blue-100 text-blue-800' : 
                      'bg-green-100 text-green-800'}`}>
                    {incident.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {incident.severity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {format(new Date(incident.createdAt), 'MMM dd, yyyy')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    className="text-orange-600 hover:text-orange-900"
                    onClick={() => handleAssignIncident(incident.id)}
                  >
                    Assign
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default IncidentList;