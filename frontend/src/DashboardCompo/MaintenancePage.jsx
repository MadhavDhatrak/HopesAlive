import { WrenchScrewdriverIcon } from '@heroicons/react/24/outline';
import { useSearchParams } from 'react-router-dom';

function MaintenancePage() {
  const [searchParams] = useSearchParams();
  const title = searchParams.get('title');

  return (
    <div className="flex-1 h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center px-4">
        <div className="mb-8">
          <WrenchScrewdriverIcon className="w-24 h-24 mx-auto text-orange-500" />
        </div>
        
        <h2 className="mb-4 text-3xl font-bold text-gray-900">
          {title} Feature Coming Soon
        </h2>
        
        <p className="mb-8 text-lg text-gray-600">
          We're working hard to bring you this feature. Please check back later!
        </p>
        
        <div className="w-64 h-2 mx-auto bg-gray-200 rounded-full overflow-hidden">
          <div className="w-1/3 h-full bg-orange-500 animate-pulse"></div>
        </div>
        
        <p className="mt-4 text-sm text-gray-500">
          Currently Under Development
        </p>
      </div>
    </div>
  );
}

export default MaintenancePage;