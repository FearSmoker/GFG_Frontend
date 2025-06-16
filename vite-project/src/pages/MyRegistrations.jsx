import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getUserRegistrations, cancelRegistration } from '../api/Registration_api';
import useAuth from '../context/AuthContext';
import toast from 'react-hot-toast';
import OtherPage3 from '../components/OtherPage3';
import "../css/OtherPage3.css"

const MyRegistrations = () => {
  const { user } = useAuth();
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [cancelingId, setCancelingId] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0
  });

  const fetchRegistrations = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const params = { page, limit: 10 };
      if (filter !== 'all') {
        params.status = filter;
      }

      const response = await getUserRegistrations(params);

      const responseData = response?.data || response;
      
      if (responseData) {
        setRegistrations(responseData.registrations || []);
        setPagination({
          currentPage: responseData.currentPage || 1,
          totalPages: responseData.totalPages || 1,
          total: responseData.total || 0
        });
      }
    } catch (error) {
      console.error('Error fetching registrations:', error);
      toast.error(error.message || 'Failed to fetch registrations');
      setRegistrations([]);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    if (user) {
      fetchRegistrations();
    }
  }, [user, fetchRegistrations]);

  const handleCancelRegistration = async (registrationId) => {
    if (!window.confirm('Are you sure you want to cancel this registration?')) {
      return;
    }

    setCancelingId(registrationId);
    try {
      await cancelRegistration(registrationId);
      toast.success('Registration cancelled successfully');
      fetchRegistrations(pagination.currentPage);
    } catch (error) {
      console.error('Cancel registration error:', error);
      toast.error(error.message || 'Failed to cancel registration');
    } finally {
      setCancelingId(null);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Date not available';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch (error) {
      return 'Invalid date';
    }
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

  const getEventId = (registration) => {
    return registration.eventId?._id || registration.eventId?.id || registration.eventId || registration.event?._id || registration.event?.id;
  };

  const getEventData = (registration) => {
    return registration.eventId || registration.event || {};
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <OtherPage3 />
        <div className="text-white text-xl">Please login to view your registrations</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <OtherPage3 />
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 mt-14">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 md:mb-0">
            My Registrations
          </h1>
          
          {/* Filter buttons */}
          <div className="flex gap-2 flex-wrap">
            {['all', 'registered', 'attended', 'cancelled'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  filter === status
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center text-white text-xl">Loading registrations...</div>
        ) : registrations.length === 0 ? (
          <div className="text-center">
            <div className="bg-gray-800 p-8 rounded-lg">
              <h3 className="text-xl text-white mb-4">No registrations found</h3>
              <p className="text-gray-400 mb-6">
                {filter === 'all' 
                  ? "You haven't registered for any events yet."
                  : `No registrations with status "${filter}" found.`
                }
              </p>
              <Link
                to="/events"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-200"
              >
                Browse Events
              </Link>
            </div>
          </div>
        ) : (
          <div>
            {/* Statistics */}
            <div className="bg-gray-800 p-6 rounded-lg mb-8">
              <h3 className="text-lg font-semibold text-white mb-4">Registration Summary</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">{pagination.total}</div>
                  <div className="text-gray-400">Total</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">
                    {registrations.filter(r => r.attendanceStatus === 'registered').length}
                  </div>
                  <div className="text-gray-400">Active</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">
                    {registrations.filter(r => r.attendanceStatus === 'attended').length}
                  </div>
                  <div className="text-gray-400">Attended</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-400">
                    {registrations.filter(r => r.attendanceStatus === 'cancelled').length}
                  </div>
                  <div className="text-gray-400">Cancelled</div>
                </div>
              </div>
            </div>

            {/* Registrations List */}
            <div className="space-y-4">
              {registrations.map((registration) => {
                const eventData = getEventData(registration);
                const eventId = getEventId(registration);
                
                return (
                  <div key={registration._id || registration.id} className="bg-gray-800 rounded-lg overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      {/* Event Image */}
                      <div className="md:w-1/3">
                        <img
                          src={eventData.image || '/api/placeholder/300/200'}
                          alt={eventData.title || 'Event'}
                          className="w-full h-48 md:h-full object-cover"
                        />
                      </div>
                      
                      {/* Event Details */}
                      <div className="md:w-2/3 p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-white mb-2">
                              {eventData.title || 'Event Title'}
                            </h3>
                            <p className="text-gray-400 mb-2">
                              {formatDate(eventData.date)}
                            </p>
                            <p className="text-gray-300 mb-4">
                              {eventData.description ? 
                                (eventData.description.length > 150 ? 
                                  `${eventData.description.substring(0, 150)}...` : 
                                  eventData.description
                                ) : 
                                'No description available'
                              }
                            </p>
                          </div>
                          
                          {/* Status Badge */}
                          <div className="flex flex-col items-end gap-2">
                            <span className={`px-3 py-1 rounded-full text-white text-sm font-medium ${getStatusColor(registration.attendanceStatus)}`}>
                              {registration.attendanceStatus || 'unknown'}
                            </span>
                            {(registration.paymentAmount || 0) > 0 && (
                              <span className="text-green-400 font-semibold">
                                ₹{registration.paymentAmount}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        {/* Registration Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <span className="text-gray-400">Registered on:</span>
                            <div className="text-white">
                              {formatDate(registration.registrationDate)}
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-400">Payment Status:</span>
                            <div className={`font-medium ${
                              registration.paymentStatus === 'completed' ? 'text-green-400' :
                              registration.paymentStatus === 'pending' ? 'text-yellow-400' :
                              'text-red-400'
                            }`}>
                              {registration.paymentStatus || 'unknown'}
                            </div>
                          </div>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex gap-4">
                          {eventId ? (
                            <Link
                              to={`/events/${eventId}`}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                            >
                              View Event
                            </Link>
                          ) : (
                            <span className="text-gray-500 px-4 py-2">
                              Event unavailable
                            </span>
                          )}
                          
                          {registration.attendanceStatus === 'registered' && (
                            <button
                              onClick={() => handleCancelRegistration(registration._id || registration.id)}
                              disabled={cancelingId === (registration._id || registration.id)}
                              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 disabled:opacity-50"
                            >
                              {cancelingId === (registration._id || registration.id) ? 'Cancelling...' : 'Cancel Registration'}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-8">
                <button
                  onClick={() => fetchRegistrations(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 1}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
                >
                  Previous
                </button>
                
                <span className="text-white">
                  Page {pagination.currentPage} of {pagination.totalPages}
                </span>
                
                <button
                  onClick={() => fetchRegistrations(pagination.currentPage + 1)}
                  disabled={pagination.currentPage === pagination.totalPages}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRegistrations;