import DashboardLayout from '../DashboardCompo/DashboardLayout';
import StatsCards from '../DashboardCompo/StatsCards';
import RecentIncidents from '../DashboardCompo/RecentIncidents';
import IncidentMap from '../DashboardCompo/IncidentMap';

function Dashboard() {
  // Mock data
  const stats = {
    total: 156,
    critical: 23,
    pending: 45,
    resolved: 43
  };

  const recentIncidents = [
    {
      id: "INC001",
      status: "critical",
      location: "Mumbai Central",
      severity: "HIGH",
      createdAt: "2024-02-20",
      animalInfo: {
        type: "Dog",
        description: "Injured stray dog"
      }
    },
    {
      id: "INC002",
      status: "pending",
      location: "Andheri East",
      severity: "MEDIUM",
      createdAt: "2024-02-19",
      animalInfo: {
        type: "Cat",
        description: "Cat stuck in drainage"
      }
    },
    {
      id: "INC003",
      status: "resolved",
      location: "Bandra West",
      severity: "LOW",
      createdAt: "2024-02-18",
      animalInfo: {
        type: "Bird",
        description: "Injured pigeon"
      }
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <StatsCards stats={stats} />
        <RecentIncidents incidents={recentIncidents} />
        <IncidentMap />
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;