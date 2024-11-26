import DashboardLayout from '../DashboardCompo/DashboardLayout';
import StatsCards from '../DashboardCompo/StatsCards';
import RecentIncidents from '../DashboardCompo/RecentIncidents';
import IncidentMap from '../DashboardCompo/IncidentMap';
import { useRef } from 'react';

function Dashboard() {
  const statsRef = useRef();

  const handleStatusUpdate = () => {
    // Refresh stats when incident status changes
    statsRef.current?.refreshStats();
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <StatsCards ref={statsRef} />
        <RecentIncidents onStatusUpdate={handleStatusUpdate} />
        <IncidentMap />
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;