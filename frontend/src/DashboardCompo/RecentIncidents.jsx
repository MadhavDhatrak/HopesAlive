const demoIncidents = [
  {
    id: 1,
    animalInfo: {
      photo: "https://images.unsplash.com/photo-1543466835-00a7907e9de1",
      description: "Injured German Shepherd with limping front leg",
      type: "Dog"
    },
    severity: "HIGH",
    aiSeverityAssessment: { score: 8 },
    location: "Near Central Park, Nashik",
    status: "pending",
    user: {
      name: "Rahul Sharma",
      phone: "+91 98765 43210"
    },
    createdAt: "2024-03-20T10:30:00Z"
  },
  {
    id: 2,
    animalInfo: {
      photo: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba",
      description: "Stray cat with minor injuries",
      type: "Cat"
    },
    severity: "MEDIUM",
    aiSeverityAssessment: { score: 5 },
    location: "MG Road, Nashik",
    status: "resolved",
    user: {
      name: "Priya Patel",
      phone: "+91 87654 32109"
    },
    createdAt: "2024-03-19T15:45:00Z"
  },
  {
    id: 2,
    animalInfo: {
      photo: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba",
      description: "Stray cat with minor injuries",
      type: "Cat"
    },
    severity: "MEDIUM",
    aiSeverityAssessment: { score: 5 },
    location: "MG Road, Nashik",
    status: "resolved",
    user: {
      name: "Priya Patel",
      phone: "+91 87654 32109"
    },
    createdAt: "2024-03-19T15:45:00Z"
  },

 
];

const RecentIncidents = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Recent Incidents</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {demoIncidents && demoIncidents.map((incident) => (
          <div key={incident.id} className="bg-white rounded-lg overflow-hidden shadow-lg">
            {/* Image with Type Overlay */}
            <div className="relative h-48">
              <img
                src={incident.animalInfo?.photo}
                alt={incident.animalInfo?.type}
                className="w-full h-full object-cover"
              />
              {/* Type Badge */}
              <div className="absolute top-2 left-2">
                <span className="bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                  {incident.animalInfo?.type}
                </span>
              </div>
              {/* Severity Badge */}
              <div className="absolute top-2 right-2">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  incident.severity === 'HIGH' ? 'bg-red-500 text-white' :
                  incident.severity === 'MEDIUM' ? 'bg-yellow-500 text-white' :
                  'bg-green-500 text-white'
                }`}>
                  {incident.severity} - Score: {incident.aiSeverityAssessment?.score}
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
                  <span>{incident.location}</span>
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
                    <span className="font-medium">Reported by:</span> {incident.user?.name}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Contact:</span> {incident.user?.phone}
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