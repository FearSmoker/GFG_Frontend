import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchEvents } from '../api/Events_api';
import { registerForEvent } from '../api/Registration_api';
import useAuth from '../context/AuthContext';
import toast from 'react-hot-toast';

const EventRegistration = () => {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [registering, setRegistering] = useState({});
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [registrationNotes, setRegistrationNotes] = useState('');

  useEffect(() => {
    console.log('isAuthenticated:', isAuthenticated);
    console.log('user:', user);
    console.log('token exists:', !!localStorage.getItem('access_token'));
  }, [authLoading, isAuthenticated, user]);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      toast.error('Please sign in to access event registration');
      navigate('/signin');
    }
  }, [isAuthenticated, authLoading, navigate]);

  const fetchAllEvents = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetchEvents();
      console.log('API Response:', response);
      
      if (Array.isArray(response)) {
        setEvents(response);
      } else if (response?.data) {
        setEvents(response.data);
      } else if (response?.events) {
        setEvents(response.events);
      } else {
        console.log('Unexpected response structure:', response);
        setEvents([]);
      }
    } catch (error) {
      console.error('Failed to fetch events:', error);
      toast.error('Failed to fetch events');
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      fetchAllEvents();
    }
  }, [fetchAllEvents, isAuthenticated, authLoading]);

  const handleRegisterClick = (event) => {
    const hasToken = localStorage.getItem('access_token');
    
    const isLoggedIn = (user && isAuthenticated) || hasToken;
    
    if (!isLoggedIn) {
      console.log('Auth check failed - Details:', { 
        user: !!user, 
        isAuthenticated, 
        hasToken: !!hasToken,
        userAndAuth: !!(user && isAuthenticated),
        finalCheck: isLoggedIn
      });
      toast.error('Please login to register for events');
      navigate('/signin');
      return;
    }
    

    if (!isRegistrationOpen(event)) {
      toast.error('Registration is closed for this event');
      return;
    }

    if (isEventFull(event)) {
      toast.error('This event is full');
      return;
    }

    setSelectedEvent(event);
    setShowRegistrationModal(true);
  };

  const handleRegistration = async () => {
    if (!selectedEvent) return;

    const hasToken = localStorage.getItem('access_token');
    
    if (!isAuthenticated || !hasToken) {
      toast.error('Your session has expired. Please log in again.');
      navigate('/signin');
      return;
    }

    setRegistering(prev => ({ ...prev, [selectedEvent._id]: true }));
    
    try {
      console.log('Current user:', user);
      console.log('Token exists:', !!hasToken);
      
      const result = await registerForEvent(selectedEvent._id);
      console.log('Registration result:', result);
      
      toast.success(`Successfully registered for ${selectedEvent.title}!`);
      setShowRegistrationModal(false);
      setSelectedEvent(null);
      setRegistrationNotes('');
      
      await fetchAllEvents();
    } catch (error) {
      console.error('Registration error:', error);
      
      if (error.message.includes('session has expired') || error.message.includes('log in again')) {
        toast.error(error.message);
        navigate('/signin');
      } else if (error.message.includes('Already registered')) {
        toast.error('You are already registered for this event');
      } else if (error.message.includes('Event is full')) {
        toast.error('This event is now full');
      } else if (error.message.includes('Registration deadline')) {
        toast.error('Registration deadline has passed');
      } else {
        toast.error(error.message || 'Failed to register for event. Please try again.');
      }
    } finally {
      setRegistering(prev => ({ ...prev, [selectedEvent._id]: false }));
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Date not available';
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isRegistrationOpen = (event) => {
    if (event.registrationDeadline) {
      return new Date() < new Date(event.registrationDeadline);
    }
    return event.eventStatus === 'upcoming' || event.status === 'upcoming';
  };

  const isEventFull = (event) => {
    return event.maxParticipants && event.currentParticipants >= event.maxParticipants;
  };

  const getEventStatusColor = (status) => {
    switch (status) {
      case 'upcoming': return 'bg-green-600';
      case 'ongoing': return 'bg-yellow-600';
      case 'completed': return 'bg-gray-600';
      case 'cancelled': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = !searchTerm || 
      event.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filter === 'all' || 
      event.eventStatus === filter || 
      event.status === filter;

    return matchesSearch && matchesFilter;
  });

  if (authLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Event Registration
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Discover and register for exciting events. Join our community and expand your horizons.
          </p>
          {user && (
            <p className="text-blue-400 mt-2">
              Welcome back, {user.name || user.username || 'User'}!
            </p>
          )}
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
              />
            </div>
            
            <div className="flex gap-2 flex-wrap">
              {['all', 'upcoming', 'ongoing', 'completed'].map((status) => (
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
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="text-center text-white text-xl py-12">
            Loading events...
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-gray-800 p-8 rounded-lg max-w-md mx-auto">
              <h3 className="text-xl text-white mb-4">No events found</h3>
              <p className="text-gray-400">
                {searchTerm ? 'Try adjusting your search terms.' : 'No events match your current filter.'}
              </p>
              {events.length === 0 && !searchTerm && (
                <p className="text-gray-500 mt-2 text-sm">
                  No events are currently available.
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredEvents.map((event) => (
              <div key={event._id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                {/* Event Image */}
                <div className="relative">
                  <img
                    src={event.image || event.imageUrl || '/api/placeholder/400/200'}
                    alt={event.title || 'Event Image'}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x200/374151/9CA3AF?text=Event+Image';
                    }}
                  />
                  <div className="absolute top-4 right-4">
                    {(event.registrationFee || event.fee || 0) > 0 ? (
                      <span className="bg-green-500 text-white px-2 py-1 rounded text-sm font-semibold">
                        ₹{event.registrationFee || event.fee}
                      </span>
                    ) : (
                      <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm font-semibold">
                        FREE
                      </span>
                    )}
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium text-white ${getEventStatusColor(event.eventStatus || event.status)}`}>
                      {(event.eventStatus || event.status || 'upcoming').toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Event Details */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                    {event.title || 'Untitled Event'}
                  </h3>
                  
                  <p className="text-gray-400 text-sm mb-3">
                    {formatDate(event.date || event.eventDate)}
                  </p>

                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                    {event.description || 'No description available.'}
                  </p>

                  {/* Participant Info */}
                  {event.maxParticipants && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-400 mb-1">
                        <span>Participants</span>
                        <span>{event.currentParticipants || 0}/{event.maxParticipants}</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${Math.min(100, ((event.currentParticipants || 0) / event.maxParticipants) * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Registration Deadline */}
                  {event.registrationDeadline && (
                    <p className="text-yellow-400 text-xs mb-4">
                      Registration ends: {new Date(event.registrationDeadline).toLocaleDateString()}
                    </p>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Link
                      to={`/events/${event._id}`}
                      className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-center transition-colors duration-200 no-underline"
                    >
                      View Details
                    </Link>
                    
                    {isRegistrationOpen(event) && !isEventFull(event) ? (
                      <button
                        onClick={() => handleRegisterClick(event)}
                        disabled={registering[event._id]}
                        className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                      >
                        {registering[event._id] ? 'Registering...' : 'Register'}
                      </button>
                    ) : (
                      <button
                        disabled
                        className="flex-1 bg-gray-600 text-gray-400 px-4 py-2 rounded-lg cursor-not-allowed"
                      >
                        {!isRegistrationOpen(event) ? 'Closed' : 'Full'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )} 
      </div>

      {/* Registration Modal */}
      {showRegistrationModal && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-white mb-4">
              Register for {selectedEvent.title}
            </h3>
            
            <div className="mb-4">
              <p className="text-gray-300 mb-2">Event Date: {formatDate(selectedEvent.date || selectedEvent.eventDate)}</p>
              <p className="text-gray-300 mb-2">
                Fee: {(selectedEvent.registrationFee || selectedEvent.fee || 0) > 0 ? `₹${selectedEvent.registrationFee || selectedEvent.fee}` : 'Free'}
              </p>
              {selectedEvent.maxParticipants && (
                <p className="text-gray-300 mb-4">
                  Spots remaining: {selectedEvent.maxParticipants - (selectedEvent.currentParticipants || 0)}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Registration Notes (Optional)
              </label>
              <textarea
                value={registrationNotes}
                onChange={(e) => setRegistrationNotes(e.target.value)}
                placeholder="Any special requirements or notes..."
                className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none resize-none"
                rows="3"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowRegistrationModal(false);
                  setSelectedEvent(null);
                  setRegistrationNotes('');
                }}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleRegistration}
                disabled={registering[selectedEvent._id]}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                {registering[selectedEvent._id] ? 'Registering...' : 'Confirm Registration'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventRegistration;