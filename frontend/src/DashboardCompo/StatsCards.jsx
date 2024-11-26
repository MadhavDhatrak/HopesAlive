import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const StatsCards = forwardRef((props, ref) => {
  const [stats, setStats] = useState({
    total: 0,
    critical: 0,
    pending: 0,
    resolved: 0
  });

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await axios.get('http://localhost:3000/api/ngo/overview', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data && response.data.stats) {
        setStats({
          total: response.data.stats.total || 0,
          critical: response.data.stats.critical || 0,
          pending: response.data.stats.pending || 0,
          resolved: response.data.stats.resolved || 0
        });
      }
    } catch (err) {
      console.error('Error fetching stats:', err);
      toast.error('Failed to load statistics');
    }
  };

  useImperativeHandle(ref, () => ({
    refreshStats: fetchStats
  }));

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-gray-500 text-sm">Total Cases</h3>
        <div className="flex items-center justify-between mt-2">
          <p className="text-2xl font-semibold text-blue-600">{stats.total}</p>
          <div className="p-2 bg-blue-100 rounded-full">
            <span className="text-blue-500">📋</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-gray-500 text-sm">Critical Cases</h3>
        <div className="flex items-center justify-between mt-2">
          <p className="text-2xl font-semibold text-red-600">{stats.critical}</p>
          <div className="p-2 bg-red-100 rounded-full">
            <span className="text-red-500">⚠️</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-gray-500 text-sm">Pending</h3>
        <div className="flex items-center justify-between mt-2">
          <p className="text-2xl font-semibold text-yellow-600">{stats.pending}</p>
          <div className="p-2 bg-yellow-100 rounded-full">
            <span className="text-yellow-500">⏳</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-gray-500 text-sm">Resolved</h3>
        <div className="flex items-center justify-between mt-2">
          <p className="text-2xl font-semibold text-green-600">{stats.resolved}</p>
          <div className="p-2 bg-green-100 rounded-full">
            <span className="text-green-500">✅</span>
          </div>
        </div>
      </div>
    </div>
  );
});

export default StatsCards;