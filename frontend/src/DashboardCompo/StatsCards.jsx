import { useState, useEffect } from 'react';

function StatsCards() {
  const [stats, setStats] = useState({
    total: 0,
    critical: 0,
    pending: 0,
    resolved: 0
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await fetch('http://localhost:3000/api/ngo/overview', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Stats data:', data); // Debug log

        setStats({
          total: data.stats.total || 0,
          critical: data.stats.critical || 0,
          pending: data.stats.pending || 0,
          resolved: data.stats.resolved || 0
        });
        setLoading(false);
      } catch (err) {
        console.error('Error fetching stats:', err);
        setError(err.message || 'Failed to load statistics');
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="animate-pulse">Loading stats...</div>;
  }

  if (error) {
    return (
      <div className="text-red-500">
        {error}
        <button 
          onClick={() => window.location.reload()} 
          className="ml-2 text-blue-500 underline"
        >
          Retry
        </button>
      </div>
    );
  }

  const cards = [
    {
      title: 'Total Cases',
      value: stats.total,
      icon: '📋',
      color: 'bg-blue-500',
      textColor: 'text-blue-600'
    },
    {
      title: 'Critical Cases',
      value: stats.critical,
      icon: '🚨',
      color: 'bg-red-500',
      textColor: 'text-red-600'
    },
    {
      title: 'Pending',
      value: stats.pending,
      icon: '⏳',
      color: 'bg-yellow-500',
      textColor: 'text-yellow-600'
    },
    {
      title: 'Resolved',
      value: stats.resolved,
      icon: '✅',
      color: 'bg-green-500',
      textColor: 'text-green-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => (
        <div key={card.title} className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">{card.title}</p>
              <h3 className={`text-2xl font-bold mt-2 ${card.textColor}`}>
                {card.value}
              </h3>
            </div>
            <div className={`${card.color} p-3 rounded-full text-white`}>
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;