import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  BellIcon,
  ChartBarIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

function Sidebar({ isOpen }) {
  const location = useLocation();
  const navigate = useNavigate();
  
  const menuItems = [
    {
      title: 'Dashboard',
      icon: <HomeIcon className="w-6 h-6" />,
      path: '/dashboard',
      status: 'active'
    },
    {
      title: 'Incidents',
      icon: <ClipboardDocumentListIcon className="w-6 h-6" />,
      path: '/dashboard/incidents',
      status: 'active'
    },
    {
      title: 'Notifications',
      icon: <BellIcon className="w-6 h-6" />,
      path: '/dashboard/notifications',
      status: 'active'
    },
    {
      title: 'Analytics',
      icon: <ChartBarIcon className="w-6 h-6" />,
      path: '/dashboard/analytics',
      status: 'coming-soon'
    },
    {
      title: 'Settings',
      icon: <Cog6ToothIcon className="w-6 h-6" />,
      path: '/dashboard/settings',
      status: 'under-development'
    }
  ];

  const handleItemClick = (item) => {
    if (item.status !== 'active') {
      navigate(`${item.path}?maintenance=true&title=${item.title}`);
    }
  };

  return (
    <aside className={`
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      lg:translate-x-0
      fixed lg:relative
      inset-y-0 left-0
      w-64
      bg-white
      border-r
      shadow-lg lg:shadow-none
      transform
      transition-transform
      duration-300
      ease-in-out
      z-30
    `}>
      <div className="h-20 flex items-center justify-center border-b">
        <h2 className="text-xl font-bold text-orange-500">NGO Dashboard</h2>
      </div>

      <nav className="mt-6">
        <div className="px-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            
            return (
              <div
                key={item.title}
                onClick={() => item.status !== 'active' && handleItemClick(item)}
                className={`
                  flex items-center px-4 py-3 rounded-lg cursor-pointer
                  transition-colors duration-200
                  ${isActive ? 'bg-orange-50 text-orange-600' : 'text-gray-900'}
                  ${item.status === 'active' 
                    ? 'hover:bg-gray-50 hover:text-gray-900' 
                    : 'opacity-60 hover:bg-gray-50'}
                `}
              >
                <div className="flex items-center gap-4">
                  {item.icon}
                  <span className="font-medium">{item.title}</span>
                </div>
              </div>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;