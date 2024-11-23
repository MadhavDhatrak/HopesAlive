import { Bars3Icon } from '@heroicons/react/24/outline';

function VolunteerNavbar({ onMenuClick }) {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
            <div className="text-2xl font-bold text-orange-500 ml-12">
              Volunteer Dashboard
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default VolunteerNavbar;