import { useEffect, useState } from 'react';
import axios from 'axios';
import { FiEdit2, FiLogOut } from 'react-icons/fi';
import { FaRegBell } from 'react-icons/fa';
import { IoIosClose } from 'react-icons/io';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const UserDashboard = () => {
    const navigate=useNavigate();
    const [userIncidents, setUserIncidents] = useState([]);
    const [userName, setUserName] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [openNotifications, setOpenNotifications] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                const userId = localStorage.getItem('userId');

                if (!userId) {
                    throw new Error('User ID is not available. Please log in again.');
                }

                const userResponse = await axios.get(`http://localhost:3000/api/users/profile/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUserName(userResponse.data.name);

                const incidentsResponse = await axios.get(`http://localhost:3000/api/users/my-incidents/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUserIncidents(incidentsResponse.data.data);
            } catch (err) {
                console.error('Error fetching user data:', err);
                setError(err.response ? err.response.data.message : err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/login');
        toast.success("Logout")

    };

    const addNotification = () => {
        const newNotification = {
            id: Date.now().toString(),
            message: "You have a new incident notification!",
            read: false,
            createdAt: new Date().toISOString(),
        };

        setNotifications((prev) => {
            const updatedNotifications = [newNotification, ...prev];
            return updatedNotifications.slice(0, 5); // Limit to 5 notifications
        });
    };

    useEffect(() => {
        const interval = setInterval(() => {
            addNotification();
        }, 10000); // Add new notification every 10 seconds

        return () => clearInterval(interval); // Clear interval on component unmount
    }, []);

    const markAsRead = (notificationId) => {
        setNotifications((prev) =>
            prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n))
        );
    };

    if (loading) return <div className="text-center text-lg">Loading...</div>;
    if (error) return <div className="text-red-500 text-center">{error}</div>;

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Profile Section */}
                <div className="bg-white rounded-lg shadow p-6 mb-8">
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">User Dashboard</h1>
                            <p className="text-gray-600">Welcome, {userName || "Guest"}</p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setOpenNotifications(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                            >
                                <FaRegBell className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                            >
                                <FiEdit2 className="w-4 h-4" />
                                {isEditing ? "Cancel" : "Edit Profile"}
                            </button>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                            >
                                <FiLogOut className="w-4 h-4" />
                                Logout
                            </button>
                        </div>
                    </div>

                    {isEditing ? (
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Username</label>
                                <input
                                    type="text"
                                    value={formData.username}
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                            >
                                Save Changes
                            </button>
                        </form>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-blue-50 p-6 rounded-lg">
                                <h3 className="text-sm text-gray-600">Your Incidents</h3>
                                <p className="text-2xl font-bold text-gray-900">{userIncidents.length}</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Incidents Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold mb-4">Your Incidents</h2>
                        <div className="space-y-4">
                            {userIncidents.length ? (
                                userIncidents.map((incident) => (
                                    <div key={incident._id} className="border rounded-lg p-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-medium text-gray-900">{incident.animalInfo.description}</h3>
                                                <p className="text-sm text-gray-500">{new Date(incident.createdAt).toLocaleDateString()}</p>
                                                <p className="text-sm text-gray-500">Location: {incident.location.address}</p>
                                                <p className="text-sm text-gray-500">Severity: {incident.animalInfo.aiSeverityAssessment.category}</p>
                                            </div>
                                            <span className={`px-2 py-1 text-xs rounded-full ${incident.status === "resolved" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                                                {incident.status}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500">No incidents reported yet.</p>
                            )}
                        </div>
                    </div>

                    {/* Resolved Incidents Section */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold mb-4">Resolved Incidents</h2>
                        <div className="space-y-4">
                            <p className="text-gray-500">Currently, there are no resolved incidents.</p>
                        </div>
                    </div>
                </div>

                {/* Notifications Section */}
                {openNotifications && (
                    <div className="absolute top-[185px] right-10 w-64 bg-white shadow-lg rounded-lg p-4">
                        <div className="flex flex-row items-center justify-between mx-2">
                            <h3 className="text-lg font-semibold mb-2">Notifications</h3>
                            <button
                                onClick={() => setOpenNotifications(false)}
                                className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                            >
                                <IoIosClose size={23} className="w-4 h-4" />
                            </button>
                        </div>
                        <hr className="my-2" />
                        <ul>
                            {notifications.map((notification) => (
                                <li key={notification.id} className={`p-2 mb-2 rounded-lg ${notification.read ? "bg-gray-100" : "bg-blue-50"}`}>
                                    <p>{notification.message}</p>
                                    <small className="block text-gray-500">{new Date(notification.createdAt).toLocaleString()}</small>
                                    {!notification.read && (
                                        <button onClick={() => markAsRead(notification.id)} className="text-blue-500 hover:underline mt-1">
                                            Mark as Read
                                        </button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserDashboard;
