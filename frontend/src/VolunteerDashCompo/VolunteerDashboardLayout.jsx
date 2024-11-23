import { useState } from 'react';
import VolunteerNavbar from './VolunteerNavbar';
import VolunteerSidebar from './VolunteerSidebar';

function VolunteerDashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <VolunteerNavbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex">
        <VolunteerSidebar isOpen={sidebarOpen} />
        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default VolunteerDashboardLayout;