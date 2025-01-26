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
        const checkUserSession = () => {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');
            const userRole = localStorage.getItem('userRole');

            // Debug log
            console.log('Current session:', {
                hasToken: !!token,
                userId,
                userRole
            });

            if (!token || !userId) {
                toast.error('Please log in to access the dashboard');
                navigate('/login');
                return false;
            }

            if (userRole !== 'user') {
                toast.error('Unauthorized access');
                navigate('/login');
                return false;
            }

            return true;
        };

        const fetchUserData = async () => {
            try {
                if (!checkUserSession()) return;

                const token = localStorage.getItem('token');
                const userId = localStorage.getItem('userId');

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
                
                setUserIncidents(incidentsResponse.data.data || []);
                
            } catch (err) {
                console.error('Error fetching user data:', err);
                const errorMessage = err.response?.data?.message || err.message;
                setError(errorMessage);
                toast.error(errorMessage);
                
                if (err.response?.status === 401) {
                    navigate('/login');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userName');
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
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
                {/* Header Section */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                    <div className="flex flex-col sm:flex-row justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Welcome Back!</h1>
                            <p className="text-lg text-gray-600 mt-2">{userName || "User"}</p>
                        </div>
                        <div className="flex gap-3 mt-4 sm:mt-0">
                            <button
                                onClick={() => setOpenNotifications(true)}
                                className="flex items-center gap-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
                            >
                                <FaRegBell className="w-4 h-4" />
                                <span className="hidden sm:inline">Notifications</span>
                            </button>
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                            >
                                <FiEdit2 className="w-4 h-4" />
                                <span className="hidden sm:inline">Edit Profile</span>
                            </button>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-1 px-3 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors"
                            >
                                <FiLogOut className="w-4 h-4" />
                                <span className="hidden sm:inline">Logout</span>
                            </button>
                        </div>
                    </div>

                    {!isEditing && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
                                <h3 className="text-sm font-medium text-blue-600">Total Incidents</h3>
                                <p className="text-3xl font-bold text-gray-900 mt-1">{userIncidents.length}</p>
                            </div>
                            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
                                <h3 className="text-sm font-medium text-green-600">Active Cases</h3>
                                <p className="text-3xl font-bold text-gray-900 mt-1">
                                    {userIncidents.filter(inc => inc.status === 'in progress').length}
                                </p>
                            </div>
                            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
                                <h3 className="text-sm font-medium text-purple-600">Pending Review</h3>
                                <p className="text-3xl font-bold text-gray-900 mt-1">
                                    {userIncidents.filter(inc => inc.status === 'pending').length}
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Incidents Section */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Your Incidents</h2>
                    <div className="space-y-4">
                        {userIncidents.length > 0 ? (
                            userIncidents.map((incident) => (
                                <div key={incident._id} 
                                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                                >
                                    <div className="flex flex-col md:flex-row justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 flex-wrap">
                                                <h3 className="text-lg font-semibold text-gray-900">
                                                    {incident.animalInfo.description}
                                                </h3>
                                                <span className={`px-2 py-1 text-sm rounded-full ${
                                                    incident.status === 'in progress' 
                                                        ? 'bg-blue-100 text-blue-800'
                                                        : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    {incident.status}
                                                </span>
                                            </div>
                                            <div className="mt-2 space-y-1">
                                                <p className="text-sm text-gray-600">
                                                    <span className="font-medium">Location:</span> {incident.location.address}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    <span className="font-medium">Reported:</span> {
                                                        new Date(incident.createdAt).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric'
                                                        })
                                                    }
                                                </p>
                                                {incident.assignedNGO && (
                                                    <p className="text-sm text-blue-600">
                                                        <span className="font-medium">Assigned to:</span> {incident.assignedNGO.name}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="mt-3 md:mt-0 md:ml-4">
                                            <div className="px-3 py-2 bg-gray-50 rounded-md">
                                                <p className="text-xs font-medium text-gray-500">Severity</p>
                                                <p className={`text-sm font-bold ${
                                                    incident.animalInfo.aiSeverityAssessment.category === 'HIGH' 
                                                        ? 'text-red-600'
                                                        : incident.animalInfo.aiSeverityAssessment.category === 'MODERATE'
                                                        ? 'text-yellow-600'
                                                        : 'text-green-600'
                                                }`}>
                                                    {incident.animalInfo.aiSeverityAssessment.category}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-gray-500">No incidents reported yet.</p>
                                <button 
                                    onClick={() => navigate('/report-incident')}
                                    className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                >
                                    Report New Incident
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
