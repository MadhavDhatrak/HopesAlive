import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';

// Custom pin marker SVG
const createCustomIcon = (color) => {
  return L.divIcon({
    className: 'custom-div-icon',
    html: `
      <div class="relative">
        <svg viewBox="0 0 24 24" class="w-8 h-8" style="fill: ${color}; filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.3));">
          <path d="M12 0C7.58 0 4 3.58 4 8c0 5.25 8 13 8 13s8-7.75 8-13c0-4.42-3.58-8-8-8zm0 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>
        </svg>
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xs font-bold" style="margin-top: -4px;">
          ${getInitial(color)}
        </div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });
};

// Helper function to get initial based on severity
const getInitial = (color) => {
  switch(color) {
    case '#EF4444': return 'H';
    case '#F59E0B': return 'M';
    case '#10B981': return 'L';
    default: return '';
  }
};

// Nashik center coordinates
const NASHIK_CENTER = [19.9975, 73.7898];

// Demo incident locations in Nashik
const demoLocations = [
  {
    id: 1,
    position: [19.9975, 73.7898],
    title: "Injured Dog",
    description: "Near Central Park",
    severity: "HIGH"
  },
  {
    id: 2,
    position: [20.0061, 73.7895],
    title: "Stray Cat",
    description: "MG Road",
    severity: "MEDIUM"
  },
  {
    id: 3,
    position: [19.9937, 73.7641],
    title: "Injured Bird",
    description: "College Road",
    severity: "LOW"
  },
  {
    id: 4,
    position: [19.9899, 73.7629],
    title: "Stray Dogs",
    description: "Gangapur Road",
    severity: "MEDIUM"
  }
];

const IncidentMap = () => {
  useEffect(() => {
    window.dispatchEvent(new Event('resize'));
  }, []);

  // Get marker icon based on severity
  const getMarkerIcon = (severity) => {
    const color = severity === 'HIGH' ? '#EF4444' : 
                 severity === 'MEDIUM' ? '#F59E0B' : 
                 '#10B981';
    return createCustomIcon(color);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Incident Locations</h2>
      <div className="h-[400px] rounded-lg overflow-hidden">
        <MapContainer
          center={NASHIK_CENTER}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {demoLocations.map((location) => (
            <Marker
              key={location.id}
              position={location.position}
              icon={getMarkerIcon(location.severity)}
            >
              <Popup className="custom-popup">
                <div className="p-3">
                  <h3 className="font-semibold text-lg mb-1">{location.title}</h3>
                  <p className="text-gray-600 mb-2">{location.description}</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                    location.severity === 'HIGH' ? 'bg-red-100 text-red-800' :
                    location.severity === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {location.severity} Priority
                  </span>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      
      {/* Legend */}
      <div className="mt-4 flex gap-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span className="text-sm text-gray-600">High Priority</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <span className="text-sm text-gray-600">Medium Priority</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-sm text-gray-600">Low Priority</span>
        </div>
      </div>
    </div>
  );
};

export default IncidentMap;