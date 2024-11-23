import { format } from 'date-fns';

function NotificationsList({ notifications = [] }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-4 py-5 sm:px-6 border-b">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Notifications
        </h3>
      </div>
      
      <div className="divide-y divide-gray-200">
        {notifications.map((notification) => (
          <div 
            key={notification.id} 
            className={`p-4 hover:bg-gray-50 transition-colors duration-150 ${
              notification.isRead ? 'bg-white' : 'bg-blue-50'
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="text-sm text-gray-900">{notification.message}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {format(new Date(notification.createdAt), 'MMM dd, yyyy HH:mm')}
                </p>
              </div>
              {!notification.isRead && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  New
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotificationsList;