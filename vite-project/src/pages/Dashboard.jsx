import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDashboardData } from '../api/Dashboard_api';
import useAuth from '../context/AuthContext';
import toast from 'react-hot-toast';
import OtherPage2 from '../components/OtherPage2';
import "../css/OtherPage2.css"

const Dashboard = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      const response = await getDashboardData();
      if (response?.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      toast.error('Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <OtherPage2 />
        <div className="text-white text-xl">Please login to view dashboard</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <OtherPage2 />
        <div className="text-white text-xl">Loading dashboard...</div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <OtherPage2 />
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center mt-14">
          Dashboard
        </h1>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-2">Total Events</h3>
            <p className="text-3xl font-bold text-blue-400">
              {dashboardData?.userStats?.totalEventsRegistered || 0}
            </p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-2">Total Spent</h3>
            <p className="text-3xl font-bold text-green-400">
              ₹{dashboardData?.userStats?.totalMoneySpent || 0}
            </p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-2">Registrations</h3>
            <p className="text-3xl font-bold text-purple-400">
              {dashboardData?.userStats?.registrationCount || 0}
            </p>
          </div>
        </div>

        {/* Registration Status */}
        {dashboardData?.registrationStats && dashboardData.registrationStats.length > 0 && (
          <div className="bg-gray-800 p-6 rounded-lg mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">Registration Status</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {dashboardData.registrationStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-2xl font-bold text-white">{stat.count}</p>
                  <p className="text-gray-400 capitalize">{stat._id}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Registrations */}
        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-white">Recent Registrations</h3>
            <Link 
              to="/my-registrations" 
              className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
            >
              View All
            </Link>
          </div>
          
          {dashboardData?.recentRegistrations?.length > 0 ? (
            <div className="space-y-3">
              {dashboardData.recentRegistrations.map((registration) => (
                <div key={registration._id} className="flex items-center justify-between bg-gray-700 p-3 rounded hover:bg-gray-600 transition-colors duration-200">
                  <div className="flex items-center">
                    {registration.eventId?.image && (
                      <img 
                        src={registration.eventId.image} 
                        alt={registration.eventId?.title || 'Event'}
                        className="w-12 h-12 object-cover rounded mr-3"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    )}
                    <div>
                      <p className="text-white font-medium">
                        {registration.eventId?.title || 'Event Title'}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {formatDate(registration.registrationDate)}
                      </p>
                    </div>
                  </div>
                  <span className="text-green-400 font-semibold">
                    ₹{registration.paymentAmount || 0}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-400 mb-4">No recent registrations</p>
              <Link 
                to="/events" 
                className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
              >
                Browse Events to Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Upcoming Events */}
        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">Upcoming Events</h3>
          
          {dashboardData?.upcomingEvents?.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-4">
              {dashboardData.upcomingEvents.map((registration) => (
                <div key={registration._id} className="bg-gray-700 p-4 rounded hover:bg-gray-600 transition-colors duration-200">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-white font-semibold flex-1 mr-2">
                      {registration.eventId?.title || 'Event Title'}
                    </h4>
                    <span className="text-green-400 font-semibold">
                      ₹{registration.paymentAmount || 0}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-3">
                    {registration.eventId?.date ? formatDate(registration.eventId.date) : 'Date TBD'}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className={`px-2 py-1 rounded text-xs ${
                      registration.status === 'confirmed' ? 'bg-green-600 text-white' :
                      registration.status === 'pending' ? 'bg-yellow-600 text-white' :
                      'bg-gray-600 text-white'
                    }`}>
                      {registration.status || 'Registered'}
                    </span>
                    {registration.eventId?._id && (
                      <Link 
                        to={`/events/${registration.eventId._id}`}
                        className="text-blue-400 hover:text-blue-300 text-sm transition-colors duration-200"
                      >
                        View Details
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-400 mb-4">No upcoming events</p>
              <Link 
                to="/events" 
                className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
              >
                Discover Events
              </Link>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Link 
            to="/events" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            Browse Events
          </Link>
          <Link 
            to="/my-registrations" 
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            My Registrations
          </Link>
          <Link 
            to="/event-history"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            View History
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;