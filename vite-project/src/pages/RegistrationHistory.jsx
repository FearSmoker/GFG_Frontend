import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getUserRegistrations } from '../api/Registration_api';
import useAuth from '../context/AuthContext';
import toast from 'react-hot-toast';
import GradientBackground from '../components/GradientBackground';

const RegistrationHistory = () => {
  const { user } = useAuth();
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: '',
    year: '',
    month: '',
    search: ''
  });
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0
  });
  const [summary, setSummary] = useState({
    totalEvents: 0,
    totalSpent: 0,
    avgSpent: 0
  });

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);
  const months = [
    { value: 1, label: 'January' }, { value: 2, label: 'February' },
    { value: 3, label: 'March' }, { value: 4, label: 'April' },
    { value: 5, label: 'May' }, { value: 6, label: 'June' },
    { value: 7, label: 'July' }, { value: 8, label: 'August' },
    { value: 9, label: 'September' }, { value: 10, label: 'October' },
    { value: 11, label: 'November' }, { value: 12, label: 'December' }
  ];

  const fetchRegistrationHistory = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const params = { 
        page, 
        limit: 12,
        ...(filters.status && { status: filters.status }),
        ...(filters.year && { year: filters.year }),
        ...(filters.month && { month: filters.month })
      };

      const response = await getUserRegistrations(params);
      if (response?.data) {
        let filteredRegistrations = response.data.registrations;
        
        if (filters.search) {
          filteredRegistrations = filteredRegistrations.filter(reg =>
            reg.eventId?.title?.toLowerCase().includes(filters.search.toLowerCase()) ||
            reg.eventId?.description?.toLowerCase().includes(filters.search.toLowerCase())
          );
        }

        filteredRegistrations.sort((a, b) => {
          let aValue, bValue;
          
          switch (sortBy) {
            case 'date':
              aValue = new Date(a.eventId?.date || a.registrationDate);
              bValue = new Date(b.eventId?.date || b.registrationDate);
              break;
            case 'title':
              aValue = a.eventId?.title?.toLowerCase() || '';
              bValue = b.eventId?.title?.toLowerCase() || '';
              break;
            case 'amount':
              aValue = a.paymentAmount || 0;
              bValue = b.paymentAmount || 0;
              break;
            case 'status':
              aValue = a.attendanceStatus;
              bValue = b.attendanceStatus;
              break;
            default:
              aValue = new Date(a.registrationDate);
              bValue = new Date(b.registrationDate);
          }

          if (sortOrder === 'asc') {
            return aValue > bValue ? 1 : -1;
          } else {
            return aValue < bValue ? 1 : -1;
          }
        });

        setRegistrations(filteredRegistrations);
        setPagination({
          currentPage: response.data.currentPage,
          totalPages: response.data.totalPages,
          total: response.data.total
        });

        const totalSpent = filteredRegistrations.reduce((sum, reg) => sum + (reg.paymentAmount || 0), 0);
        setSummary({
          totalEvents: filteredRegistrations.length,
          totalSpent,
          avgSpent: filteredRegistrations.length > 0 ? totalSpent / filteredRegistrations.length : 0
        });
      }
    } catch (error) {
      toast.error('Failed to fetch registration history');
    } finally {
      setLoading(false);
    }
  }, [filters, sortBy, sortOrder]);

  useEffect(() => {
    if (user) {
      fetchRegistrationHistory();
    }
  }, [user, fetchRegistrationHistory]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const clearFilters = () => {
    setFilters({
      status: '',
      year: '',
      month: '',
      search: ''
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'registered': return 'bg-green-600';
      case 'attended': return 'bg-blue-600';
      case 'absent': return 'bg-yellow-600';
      case 'cancelled': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'registered': return '✓';
      case 'attended': return '👥';
      case 'absent': return '❌';
      case 'cancelled': return '🚫';
      default: return '●';
    }
  };

  if (!user) {
    return (
      <GradientBackground>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-white text-xl">Please login to view your registration history</div>
        </div>
      </GradientBackground>
    );
  }

  return (
    <GradientBackground>
      <div className="min-h-screen py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Registration History
            </h1>
            <p className="text-gray-300">
              Track your event registration journey and spending patterns
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Events</p>
                  <p className="text-2xl font-bold text-white">{summary.totalEvents}</p>
                </div>
                <div className="text-blue-400 text-3xl">🎯</div>
              </div>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Spent</p>
                  <p className="text-2xl font-bold text-green-400">₹{summary.totalSpent.toLocaleString()}</p>
                </div>
                <div className="text-green-400 text-3xl">💰</div>
              </div>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Average per Event</p>
                  <p className="text-2xl font-bold text-purple-400">₹{Math.round(summary.avgSpent).toLocaleString()}</p>
                </div>
                <div className="text-purple-400 text-3xl">📊</div>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-gray-800 p-6 rounded-lg mb-8 border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
              {/* Search */}
              <div className="lg:col-span-2">
                <label className="block text-gray-300 text-sm mb-2">Search Events</label>
                <input
                  type="text"
                  placeholder="Search by event name..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                />
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-gray-300 text-sm mb-2">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                >
                  <option value="">All Status</option>
                  <option value="registered">Registered</option>
                  <option value="attended">Attended</option>
                  <option value="absent">Absent</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              {/* Year Filter */}
              <div>
                <label className="block text-gray-300 text-sm mb-2">Year</label>
                <select
                  value={filters.year}
                  onChange={(e) => handleFilterChange('year', e.target.value)}
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                >
                  <option value="">All Years</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              {/* Month Filter */}
              <div>
                <label className="block text-gray-300 text-sm mb-2">Month</label>
                <select
                  value={filters.month}
                  onChange={(e) => handleFilterChange('month', e.target.value)}
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                >
                  <option value="">All Months</option>
                  {months.map(month => (
                    <option key={month.value} value={month.value}>{month.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Sort and Clear */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <label className="text-gray-300 text-sm">Sort by:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-gray-700 text-white px-3 py-1 rounded border border-gray-600 text-sm"
                  >
                    <option value="date">Event Date</option>
                    <option value="title">Event Title</option>
                    <option value="amount">Amount</option>
                    <option value="status">Status</option>
                  </select>
                </div>
                
                <button
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm transition-colors"
                >
                  {sortOrder === 'asc' ? '↑ Asc' : '↓ Desc'}
                </button>
              </div>

              <button
                onClick={clearFilters}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Results */}
          {loading ? (
            <div className="text-center text-white text-xl py-12">
              Loading registration history...
            </div>
          ) : registrations.length === 0 ? (
            <div className="text-center">
              <div className="bg-gray-800 p-12 rounded-lg border border-gray-700">
                <div className="text-6xl mb-4">📋</div>
                <h3 className="text-xl text-white mb-4">No registrations found</h3>
                <p className="text-gray-400 mb-6">
                  {Object.values(filters).some(f => f) 
                    ? "No registrations match your current filters."
                    : "You haven't registered for any events yet."
                  }
                </p>
                <div className="flex gap-4 justify-center">
                  {Object.values(filters).some(f => f) && (
                    <button
                      onClick={clearFilters}
                      className="bg-gray-600 hover:bg-gray-500 text-white px-6 py-3 rounded-lg transition-colors"
                    >
                      Clear Filters
                    </button>
                  )}
                  <Link
                    to="/events"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
                  >
                    Browse Events
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Table View for larger screens */}
              <div className="hidden lg:block bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-700">
                      <tr>
                        <th className="px-6 py-4 text-left text-gray-300 font-medium">Event</th>
                        <th className="px-6 py-4 text-left text-gray-300 font-medium">Date</th>
                        <th className="px-6 py-4 text-left text-gray-300 font-medium">Status</th>
                        <th className="px-6 py-4 text-left text-gray-300 font-medium">Amount</th>
                        <th className="px-6 py-4 text-left text-gray-300 font-medium">Registered</th>
                        <th className="px-6 py-4 text-left text-gray-300 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {registrations.map((registration) => (
                        <tr key={registration._id} className="hover:bg-gray-700 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-4">
                              <img
                                src={registration.eventId?.image || '/api/placeholder/60/60'}
                                alt={registration.eventId?.title}
                                className="w-12 h-12 rounded-lg object-cover"
                              />
                              <div>
                                <div className="text-white font-medium">
                                  {registration.eventId?.title || 'Event Title'}
                                </div>
                                <div className="text-gray-400 text-sm">
                                  {registration.eventId?.description?.substring(0, 50)}...
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-300">
                            {formatDate(registration.eventId?.date)}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-white text-sm font-medium ${getStatusColor(registration.attendanceStatus)}`}>
                              <span>{getStatusIcon(registration.attendanceStatus)}</span>
                              {registration.attendanceStatus}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`font-medium ${registration.paymentAmount > 0 ? 'text-green-400' : 'text-gray-400'}`}>
                              {registration.paymentAmount > 0 ? `₹${registration.paymentAmount}` : 'Free'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-400 text-sm">
                            {formatDateTime(registration.registrationDate)}
                          </td>
                          <td className="px-6 py-4">
                            <Link
                              to={`/events/${registration.eventId?._id}`}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors"
                            >
                              View Event
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Card View for smaller screens */}
              <div className="lg:hidden space-y-4">
                {registrations.map((registration) => (
                  <div key={registration._id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <div className="flex items-start gap-4 mb-4">
                      <img
                        src={registration.eventId?.image || '/api/placeholder/80/80'}
                        alt={registration.eventId?.title}
                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-medium mb-1 truncate">
                          {registration.eventId?.title || 'Event Title'}
                        </h3>
                        <p className="text-gray-400 text-sm mb-2">
                          {formatDate(registration.eventId?.date)}
                        </p>
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-white text-xs font-medium ${getStatusColor(registration.attendanceStatus)}`}>
                            <span>{getStatusIcon(registration.attendanceStatus)}</span>
                            {registration.attendanceStatus}
                          </span>
                          {registration.paymentAmount > 0 && (
                            <span className="text-green-400 font-medium text-sm">
                              ₹{registration.paymentAmount}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-gray-400 text-sm mb-4">
                      Registered: {formatDateTime(registration.registrationDate)}
                    </div>
                    
                    <Link
                      to={`/events/${registration.eventId?._id}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors inline-block"
                    >
                      View Event
                    </Link>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-8">
                  <button
                    onClick={() => fetchRegistrationHistory(pagination.currentPage - 1)}
                    disabled={pagination.currentPage === 1}
                    className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg disabled:opacity-50 transition-colors"
                  >
                    Previous
                  </button>
                  
                  <div className="flex items-center gap-2">
                    {[...Array(pagination.totalPages)].map((_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => fetchRegistrationHistory(i + 1)}
                        className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                          pagination.currentPage === i + 1
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => fetchRegistrationHistory(pagination.currentPage + 1)}
                    disabled={pagination.currentPage === pagination.totalPages}
                    className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg disabled:opacity-50 transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}

          {/* Back to Registrations Link */}
          <div className="mt-8 text-center">
            <Link
              to="/my-registrations"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              ← Back to My Registrations
            </Link>
            </div>
        </div>
      </div>
    </GradientBackground>
  );
};

export default RegistrationHistory;