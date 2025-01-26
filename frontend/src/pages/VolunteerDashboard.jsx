// import VolunteerDashboardLayout from '../../components/volunteer/VolunteerDashboardLayout';
// import IncidentList from '../../components/volunteer/IncidentList';
// import ActivitySummary from '../../components/volunteer/ActivitySummary';
// import NotificationsList from '../../components/volunteer/NotificationsList';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import VolunteerDashboardLayout from '../VolunteerDashCompo/VolunteerDashboardLayout';
import IncidentList from '../VolunteerDashCompo/IncidentList';
import ActivitySummary from '../VolunteerDashCompo/ActivitySummary';
import NotificationsList from '../VolunteerDashCompo/NotificationsList';
import axios from 'axios';

const VolunteerDashboard = () => {
  const [incidents, setIncidents] = useState([]);
  const [activityStats, setActivityStats] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const status = params.get('status');
    
    if (status === 'completed') {
      // Clear the URL parameter
      navigate('/voldash', { replace: true });
      // Show success message
      toast.success('Documents signed successfully!');
    }
  }, [location, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Using token:', token?.substring(0, 20) + '...');

        const response = await axios.get('http://localhost:3000/api/volunteer/incidents', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log('Full API Response:', response.data);
        
        if (response.data.success) {
          setIncidents(response.data.data);
          console.log('Set incidents:', response.data.data);
        }

        // Fetch notifications
        const notificationsResponse = await axios.get(
          'http://localhost:3000/api/volunteer/notifications',
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (notificationsResponse.data) {
          setNotifications(notificationsResponse.data);
        }

        setLoading(false);
      } catch (error) {
        console.error('Fetch error:', error.response || error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <VolunteerDashboardLayout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      </VolunteerDashboardLayout>
    );
  }

  if (error) {
    return (
      <VolunteerDashboardLayout>
        <div className="text-red-500 text-center p-4">
          Error: {error}
        </div>
      </VolunteerDashboardLayout>
    );
  }

  return (
    <VolunteerDashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Volunteer Dashboard</h1>
      <IncidentList incidents={incidents} />
      <NotificationsList notifications={notifications} />
    </VolunteerDashboardLayout>
  );
};

export default VolunteerDashboard;