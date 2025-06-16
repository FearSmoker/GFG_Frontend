import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getEventHistory, getSpendingAnalytics } from '../api/Dashboard_api';
import { cancelRegistration } from '../api/Registration_api';
import useAuth from '../context/AuthContext';
import OtherPage2 from '../components/OtherPage2';
import toast from 'react-hot-toast';
import "../css/OtherPage2.css";

const EventHistory = () => {
  const { user } = useAuth();
  const [historyData, setHistoryData] = useState(null);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(null);
  
  const [filters, setFilters] = useState({
    year: '',
    month: '',
    status: '',
    page: 1,
    limit: 10
  });

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getEventHistory(filters);
      if (response?.data) {
        setHistoryData(response.data);
      }
    } catch (error) {
      toast.error('Failed to fetch event history');
      console.error('Event history error:', error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const fetchAnalytics = useCallback(async () => {
    try {
      const response = await getSpendingAnalytics();
      if (response?.data) {
        setAnalyticsData(response.data);
      }
    } catch (error) {
      console.error('Analytics error:', error);
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user, fetchData]);

  useEffect(() => {
    if (user) {
      fetchAnalytics();
    }
  }, [user, fetchAnalytics]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1
    }));
  };

  const handlePageChange = (newPage) => {
    setFilters(prev => ({
      ...prev,
      page: newPage
    }));
  };

  const handleCancelRegistration = async (registrationId) => {
    if (!window.confirm('Are you sure you want to cancel this registration? No refund will be provided.')) {
      return;
    }

    try {
      setCancelling(registrationId);
      await cancelRegistration(registrationId);
      toast.success('Registration cancelled successfully');
      fetchData();
    } catch (error) {
      toast.error(error.message || 'Failed to cancel registration');
    } finally {
      setCancelling(null);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'registered': return 'bg-blue-600';
      case 'attended': return 'bg-green-600';
      case 'cancelled': return 'bg-red-600';
      case 'absent': return 'bg-gray-600';
      default: return 'bg-gray-600';
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);
  const months = [
    { value: 1, name: 'January' }, { value: 2, name: 'February' }, { value: 3, name: 'March' },
    { value: 4, name: 'April' }, { value: 5, name: 'May' }, { value: 6, name: 'June' },
    { value: 7, name: 'July' }, { value: 8, name: 'August' }, { value: 9, name: 'September' },
    { value: 10, name: 'October' }, { value: 11, name: 'November' }, { value: 12, name: 'December' }
  ];

  if (!user) {
    return (
      <>
        <OtherPage2 />
        <div className="otherpage2-content">
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-white text-xl">Please login to view event history</div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <OtherPage2 />
      <div className="otherpage2-content">
        <div className="min-h-screen py-20 px-4">
          <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 mt-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Event History</h1>
          <p className="text-gray-400">Manage and track all your event registrations</p>
        </div>

        {/* Summary Cards */}
        {historyData?.summary && (
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-2">Total Events</h3>
              <p className="text-3xl font-bold text-blue-400">
                {historyData.summary.totalEvents}
              </p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-2">Total Spent</h3>
              <p className="text-3xl font-bold text-green-400">
                ₹{historyData.summary.totalSpent}
              </p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-2">Average Spent</h3>
              <p className="text-3xl font-bold text-purple-400">
                ₹{Math.round(historyData.summary.avgSpent || 0)}
              </p>
            </div>
          </div>
        )}

        {/* Yearly Spending Overview */}
        {analyticsData?.yearlySpending && analyticsData.yearlySpending.length > 0 && (
          <div className="bg-gray-800 p-6 rounded-lg mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">Yearly Spending Overview</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {analyticsData.yearlySpending.map((year) => (
                <div key={year._id} className="text-center">
                  <p className="text-2xl font-bold text-white">₹{year.totalSpent}</p>
                  <p className="text-gray-400">{year._id}</p>
                  <p className="text-sm text-gray-500">{year.eventCount} events</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">Filter Events</h3>
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="block text-gray-400 mb-2">Year</label>
              <select
                value={filters.year}
                onChange={(e) => handleFilterChange('year', e.target.value)}
                className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
              >
                <option value="">All Years</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-400 mb-2">Month</label>
              <select
                value={filters.month}
                onChange={(e) => handleFilterChange('month', e.target.value)}
                className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
              >
                <option value="">All Months</option>
                {months.map(month => (
                  <option key={month.value} value={month.value}>{month.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-400 mb-2">Status</label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
              >
                <option value="">All Status</option>
                <option value="registered">Registered</option>
                <option value="attended">Attended</option>
                <option value="cancelled">Cancelled</option>
                <option value="absent">Absent</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-400 mb-2">Per Page</label>
              <select
                value={filters.limit}
                onChange={(e) => handleFilterChange('limit', parseInt(e.target.value))}
                className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>
          </div>
        </div>

        {/* Event History List */}
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <div className="p-6 border-b border-gray-700">
            <h3 className="text-xl font-semibold text-white">Event Registrations</h3>
            {historyData && (
              <p className="text-gray-400 mt-1">
                Showing {((filters.page - 1) * filters.limit) + 1} to {Math.min(filters.page * filters.limit, historyData.total)} of {historyData.total} results
              </p>
            )}
          </div>

          {loading ? (
            <div className="p-8 text-center">
              <div className="text-white text-xl">Loading event history...</div>
            </div>
          ) : historyData?.eventHistory && historyData.eventHistory.length > 0 ? (
            <div className="divide-y divide-gray-700">
              {historyData.eventHistory.map((registration) => (
                <div key={registration._id} className="p-6 hover:bg-gray-700 transition-colors duration-200">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      {registration.eventId?.image && (
                        <img 
                          src={registration.eventId.image} 
                          alt={registration.eventId?.title || 'Event'}
                          className="w-16 h-16 object-cover rounded"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      )}
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-white mb-1">
                          {registration.eventId?.title || 'Event Title'}
                        </h4>
                        <p className="text-gray-400 text-sm mb-2">
                          {registration.eventId?.description?.substring(0, 100)}...
                        </p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                          <span>Registered: {formatDate(registration.registrationDate)}</span>
                          <span>Event Date: {registration.eventId?.date ? formatDate(registration.eventId.date) : 'TBD'}</span>
                          <span>Payment: ₹{registration.paymentAmount}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded text-white text-sm font-medium ${getStatusColor(registration.attendanceStatus)}`}>
                        {registration.attendanceStatus?.charAt(0).toUpperCase() + registration.attendanceStatus?.slice(1)}
                      </span>
                      
                      {registration.attendanceStatus === 'registered' && (
                        <button
                          onClick={() => handleCancelRegistration(registration._id)}
                          disabled={cancelling === registration._id}
                          className="bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white px-4 py-2 rounded text-sm font-medium transition-colors duration-200"
                        >
                          {cancelling === registration._id ? 'Cancelling...' : 'Cancel'}
                        </button>
                      )}
                      
                      {registration.eventId?._id && (
                        <Link 
                          to={`/events/${registration.eventId._id}`}
                          className="text-blue-400 hover:text-blue-300 text-sm transition-colors duration-200"
                        >
                          View Event
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-gray-400 mb-4">No event history found</p>
              <Link 
                to="/events" 
                className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
              >
                Browse Events to Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Pagination */}
        {historyData && historyData.totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={() => handlePageChange(filters.page - 1)}
              disabled={filters.page <= 1}
              className="bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed text-white px-4 py-2 rounded transition-colors duration-200"
            >
              Previous
            </button>
            
            <div className="flex gap-2">
              {Array.from({ length: Math.min(5, historyData.totalPages) }, (_, i) => {
                const pageNum = Math.max(1, Math.min(historyData.totalPages - 4, filters.page - 2)) + i;
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-3 py-2 rounded transition-colors duration-200 ${
                      pageNum === filters.page 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-700 hover:bg-gray-600 text-white'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            
            <button
              onClick={() => handlePageChange(filters.page + 1)}
              disabled={filters.page >= historyData.totalPages}
              className="bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed text-white px-4 py-2 rounded transition-colors duration-200"
            >
              Next
            </button>
          </div>
        )}

        {/* Category Spending */}
        {analyticsData?.categorySpending && analyticsData.categorySpending.length > 0 && (
          <div className="bg-gray-800 p-6 rounded-lg mt-8">
            <h3 className="text-xl font-semibold text-white mb-4">Spending by Category</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {analyticsData.categorySpending.map((category, index) => (
                <div key={index} className="bg-gray-700 p-4 rounded">
                  <h4 className="text-white font-semibold mb-2">
                    {category._id || 'Uncategorized'}
                  </h4>
                  <p className="text-2xl font-bold text-green-400 mb-1">
                    ₹{category.totalSpent}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {category.eventCount} events
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
  </>
  );
};

export default EventHistory;