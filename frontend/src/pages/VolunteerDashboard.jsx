// import VolunteerDashboardLayout from '../../components/volunteer/VolunteerDashboardLayout';
// import IncidentList from '../../components/volunteer/IncidentList';
// import ActivitySummary from '../../components/volunteer/ActivitySummary';
// import NotificationsList from '../../components/volunteer/NotificationsList';
import { useEffect, useState } from 'react';
import VolunteerDashboardLayout from '../VolunteerDashCompo/VolunteerDashboardLayout';
import IncidentList from '../VolunteerDashCompo/IncidentList';
import ActivitySummary from '../VolunteerDashCompo/ActivitySummary';
import NotificationsList from '../VolunteerDashCompo/NotificationsList';

const VolunteerDashboard = () => {
  const [incidents, setIncidents] = useState([]);
  const [activityStats, setActivityStats] = useState({});
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch incidents, activity stats, and notifications from your API
    const fetchData = async () => {
      try {
        const incidentsResponse = await fetch('/api/volunteer/incidents');
        const statsResponse = await fetch('/api/volunteer/activity-stats');
        const notificationsResponse = await fetch('/api/volunteer/notifications');

        const incidentsData = await incidentsResponse.json();
        const statsData = await statsResponse.json();
        const notificationsData = await notificationsResponse.json();

        setIncidents(incidentsData);
        setActivityStats(statsData);
        setNotifications(notificationsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <VolunteerDashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Volunteer Dashboard</h1>
      <ActivitySummary stats={activityStats} />
      <IncidentList incidents={incidents} />
      <NotificationsList notifications={notifications} />
    </VolunteerDashboardLayout>
  );
};

export default VolunteerDashboard;