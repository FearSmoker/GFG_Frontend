import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchEventById } from '../api/Events_api';
import { registerForEvent, getUserRegistrations } from '../api/Registration_api';
import { RegisterForm } from '../components/EventComponents';
import useAuth from '../context/AuthContext';
import OtherPage1 from '../components/OtherPage1';
import toast from 'react-hot-toast';
import "../css/OtherPage1.css"

const EventDetails = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [registrationData, setRegistrationData] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAlreadyRegistered, setIsAlreadyRegistered] = useState(false);
  const [checkingRegistration, setCheckingRegistration] = useState(false);

  useEffect(() => {
    if (user) {
      setRegistrationData({
        fullName: user.fullName || user.name || '',
        email: user.email || '',
        enrollmentNo: user.enrollmentNo || user.enrollment || '',
        branch: user.branch || '',
        mobileNo: user.mobileNo || user.phone || user.phoneNumber || '',
      });
    }
  }, [user]);

  const checkRegistrationStatus = useCallback(async () => {
    if (!user || !eventId) return;
    
    setCheckingRegistration(true);
    try {
      console.log('Checking registration status for eventId:', eventId);
      const response = await getUserRegistrations();
      console.log('User registrations response:', response);
      
      const userRegistrations = response.data?.registrations || response.registrations || response.data || response || [];
      console.log('User registrations array:', userRegistrations);
      
      if (!Array.isArray(userRegistrations)) {
        console.error('Registrations is not an array:', userRegistrations);
        return;
      }
      
      const isRegistered = userRegistrations.some(reg => {
        console.log('Checking registration:', reg);
        
        let regEventId;
        if (reg.eventId) {
        
          if (typeof reg.eventId === 'object' && reg.eventId._id) {
            regEventId = reg.eventId._id;
          } 
        
          else if (typeof reg.eventId === 'object' && reg.eventId.id) {
            regEventId = reg.eventId.id;
          }
        
          else if (typeof reg.eventId === 'string') {
            regEventId = reg.eventId;
          }
        }
        
        else if (reg.event) {
          if (typeof reg.event === 'object' && reg.event._id) {
            regEventId = reg.event._id;
          } else if (typeof reg.event === 'object' && reg.event.id) {
            regEventId = reg.event.id;
          } else if (typeof reg.event === 'string') {
            regEventId = reg.event;
          }
        }
        
        console.log('Comparing regEventId:', regEventId, 'with eventId:', eventId);
        
        const isNotCancelled = !reg.attendanceStatus || reg.attendanceStatus !== 'cancelled';
        
        const idsMatch = regEventId && (
          regEventId.toString() === eventId.toString() ||
          regEventId === eventId
        );
        
        console.log('IDs match:', idsMatch, 'Is not cancelled:', isNotCancelled);
        
        return idsMatch && isNotCancelled;
      });
      
      console.log('Final registration status:', isRegistered);
      setIsAlreadyRegistered(isRegistered);
    } catch (error) {
      console.error('Error checking registration status:', error);
     
    } finally {
      setCheckingRegistration(false);
    }
  }, [user, eventId]);

  const fetchEventDetails = useCallback(async () => {
    if (!eventId) {
      toast.error('No event ID provided');
      setLoading(false);
      return;
    }

    try {
      const response = await fetchEventById(eventId);
      const eventData = response?.data || response;

      if (eventData && (eventData._id || eventData.id)) {
        setEvent(eventData);
      } else {
        toast.error('Event not found');
        setEvent(null);
      }
    } catch (error) {
      console.error('Error fetching event:', error);
      toast.error(error.message || 'Failed to fetch event details');
      setEvent(null);
    } finally {
      setLoading(false);
    }
  }, [eventId]);

  useEffect(() => {
    fetchEventDetails();
  }, [fetchEventDetails]);

  useEffect(() => {
    checkRegistrationStatus();
  }, [checkRegistrationStatus]);

  const getEventStatus = () => {
    if (!event || !event.date) return 'upcoming';
    
    const currentDate = new Date();
    const eventDate = new Date(event.date);
    
    currentDate.setHours(0, 0, 0, 0);
    eventDate.setHours(0, 0, 0, 0);
    
    if (event.eventStatus === 'cancelled') {
      return 'cancelled';
    }
    
    if (eventDate < currentDate) {
      return 'completed';
    }
    
    return 'upcoming';
  };

  const getSeatStatus = () => {
    if (!event || !event.maxParticipants) return 'available';
    
    const currentParticipants = event.currentParticipants || 0;
    const maxParticipants = event.maxParticipants;
    
    return currentParticipants >= maxParticipants ? 'full' : 'available';
  };

  const getStatusTagStyle = (status, type) => {
    if (type === 'event') {
      switch (status) {
        case 'upcoming':
          return 'bg-green-600 text-white';
        case 'completed':
          return 'bg-gray-600 text-white';
        case 'cancelled':
          return 'bg-red-600 text-white';
        default:
          return 'bg-blue-600 text-white';
      }
    } else if (type === 'seat') {
      switch (status) {
        case 'available':
          return 'bg-blue-600 text-white';
        case 'full':
          return 'bg-orange-600 text-white';
        default:
          return 'bg-gray-600 text-white';
      }
    }
  };

  const handleRegisterClick = () => {
    if (!user) {
      toast.error('Please login to register for events');
      navigate('/signin');
      return;
    }

    if (!eventId) {
      toast.error('Invalid event ID');
      return;
    }

    if (isAlreadyRegistered) {
      toast.info('You are already registered for this event');
      return;
    }

    if (!isRegistrationOpen()) {
      toast.error('Registration is closed for this event');
      return;
    }

    if (isFull()) {
      toast.error('This event is full');
      return;
    }

    setShowRegisterForm(true);
  };

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    
    if (!eventId) {
      toast.error('Invalid event ID');
      return;
    }

    const requiredFields = ['fullName', 'email', 'enrollmentNo', 'branch', 'mobileNo'];
    const fieldNames = {
      fullName: 'Full Name',
      email: 'Email',
      enrollmentNo: 'Enrollment Number',
      branch: 'Branch',
      mobileNo: 'Mobile Number'
    };

    const missingFields = requiredFields.filter(field => {
      const value = registrationData[field];
      return !value || value.toString().trim() === '';
    });

    if (missingFields.length > 0) {
      const missingFieldNames = missingFields.map(field => fieldNames[field]).join(', ');
      toast.error(`Please fill in the following required fields: ${missingFieldNames}`);
      setIsEditMode(true);
      return;
    }

    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(registrationData.mobileNo)) {
      toast.error('Please enter a valid 10-digit mobile number');
      return;
    }

    setRegistering(true);
    try {
      const result = await registerForEvent(eventId);
      console.log('Registration result:', result);
      
      toast.success('Successfully registered for the event!');
      setShowRegisterForm(false);
      setIsEditMode(false);
      setIsAlreadyRegistered(true);
      
      await fetchEventDetails();
      
      navigate('/my-registrations');
    } catch (error) {
      console.error('Registration error:', error);
      
      if (error.message.includes('session has expired') || error.message.includes('log in again')) {
        toast.error(error.message);
        navigate('/signin');
      } else if (error.message.includes('Already registered')) {
        toast.error('You are already registered for this event');
        setIsAlreadyRegistered(true);
        setShowRegisterForm(false);
      } else if (error.message.includes('Event is full')) {
        toast.error('This event is now full');
      } else if (error.message.includes('Registration deadline')) {
        toast.error('Registration deadline has passed');
      } else {
        toast.error(error.message || 'Failed to register for event. Please try again.');
      }
    } finally {
      setRegistering(false);
    }
  };

  const handleEditToggle = () => {
    setIsEditMode(!isEditMode);
  };

  const handleCancelRegistration = () => {
    setShowRegisterForm(false);
    setIsEditMode(false);
  
    if (user) {
      setRegistrationData({
        fullName: user.fullName || user.name || '',
        email: user.email || '',
        enrollmentNo: user.enrollmentNo || user.enrollment || '',
        branch: user.branch || '',
        mobileNo: user.mobileNo || user.phone || user.phoneNumber || '',
      });
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Date not available';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'Invalid date';
    }
  };

  const isRegistrationOpen = () => {
    if (!event) return false;
    
    const eventStatus = getEventStatus();
    if (eventStatus !== 'upcoming') return false;
    
    if (event.registrationDeadline) {
      return new Date() < new Date(event.registrationDeadline);
    }
    
    return true;
  };

  const isFull = () => {
    return getSeatStatus() === 'full';
  };

  if (loading) {
    return (
      <div className="relative min-h-screen w-full">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <OtherPage1 />
        </div>
        
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-white text-xl">Loading event details...</div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="relative min-h-screen w-full">
        {/* Background */}
          <OtherPage1 />
        
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="text-white text-xl mb-4">Event not found</div>
            <button
              onClick={() => navigate('/events')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Back to Events
            </button>
          </div>
        </div>
      </div>
    );
  }

  const eventStatus = getEventStatus();
  const seatStatus = getSeatStatus();

  return (
    <div className="relative min-h-screen w-full">
      {/* Background */}
        <OtherPage1 />

      {/* Content */}
      <div className="relative z-10 pt-36 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Event Header */}
          <div className="bg-gray-800/90 backdrop-blur-sm border border-gray-700/50 rounded-lg overflow-hidden shadow-xl">
            <div className="relative">
              <img 
                src={event.image || '/api/placeholder/800/400'} 
                alt={event.title || 'Event'}
                className="w-full h-64 md:h-80 object-cover"
              />
              <div className="absolute top-4 right-4">
                {(event.registrationFee || 0) > 0 ? (
                  <span className="bg-green-500 text-white px-3 py-1 rounded-lg text-lg font-semibold">
                    ₹{event.registrationFee}
                  </span>
                ) : (
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-lg text-lg font-semibold">
                    FREE
                  </span>
                )}
              </div>
            </div>

            <div className="p-6 md:p-8">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {event.title || 'Event Title'}
              </h1>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-3">
                  <div className="flex items-center text-gray-300">
                    <span className="mr-3">📅</span>
                    <span>{formatDate(event.date)}</span>
                  </div>
                  
                  {event.maxParticipants && (
                    <div className="flex items-center text-gray-300">
                      <span className="mr-3">👥</span>
                      <span>{event.currentParticipants || 0}/{event.maxParticipants} registered</span>
                    </div>
                  )}
                  
                  <div className="flex items-center text-gray-300">
                    <span className="mr-3">💰</span>
                    <span>{(event.registrationFee || 0) > 0 ? `₹${event.registrationFee}` : 'Free'}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {/* Two Status Tags in a Row */}
                  <div className="flex items-center gap-3 text-gray-300">
                    <span className="mr-1">🏷️</span>
                    <div className="flex gap-2">
                      {/* Event Status Tag */}
                      <span className={`px-3 py-1 rounded-lg text-sm font-medium ${getStatusTagStyle(eventStatus, 'event')}`}>
                        {eventStatus.toUpperCase()}
                      </span>
                      
                      {/* Seat Status Tag */}
                      {event.maxParticipants && (
                        <span className={`px-3 py-1 rounded-lg text-sm font-medium ${getStatusTagStyle(seatStatus, 'seat')}`}>
                          {seatStatus.toUpperCase()}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {event.registrationDeadline && (
                    <div className="flex items-center text-gray-300">
                      <span className="mr-3">⏰</span>
                      <span>Registration ends: {new Date(event.registrationDeadline).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold text-white mb-3">Description</h2>
                <p className="text-gray-300 leading-relaxed">
                  {event.description || 'No description available.'}
                </p>
              </div>

              {/* Registration Section */}
              <div className="border-t border-gray-700 pt-6">
                {user ? (
                  <div className="flex flex-col sm:flex-row gap-4">
                    {checkingRegistration ? (
                      <div className="text-gray-400">Checking registration status...</div>
                    ) : isAlreadyRegistered ? (
                      <span className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold">
                        ✓ Already Registered
                      </span>
                    ) : isRegistrationOpen() && !isFull() ? (
                      <button
                        onClick={handleRegisterClick}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
                        disabled={registering}
                      >
                        {registering ? 'Registering...' : 'Register for Event'}
                      </button>
                    ) : (
                      <div className="text-gray-400">
                        {eventStatus === 'completed' && 'Event has ended'}
                        {eventStatus === 'cancelled' && 'Event has been cancelled'}
                        {!isRegistrationOpen() && eventStatus === 'upcoming' && 'Registration has closed'}
                        {isFull() && 'Event is full'}
                      </div>
                    )}
                    
                    <button
                      onClick={() => navigate('/events')}
                      className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
                    >
                      Back to Events
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-gray-300 mb-4">Please login to register for this event</p>
                    <button
                      onClick={() => navigate('/signin')}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
                    >
                      Login to Register
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Registration Form Modal */}
      {showRegisterForm && event && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full my-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">
                Register for {event.title}
              </h3>
              <button
                onClick={handleCancelRegistration}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="mb-4">
              <p className="text-gray-300 mb-2">Event Date: {formatDate(event.date || event.eventDate)}</p>
              <p className="text-gray-300 mb-2">
                Fee: {(event.registrationFee || event.fee || 0) > 0 ? `₹${event.registrationFee || event.fee}` : 'Free'}
              </p>
              {event.maxParticipants && (
                <p className="text-gray-300 mb-4">
                  Spots remaining: {event.maxParticipants - (event.currentParticipants || 0)}
                </p>
              )}
            </div>

            {/* Show registration details or edit form */}
            {!isEditMode ? (
              <div className="mb-4">
                <h4 className="text-white font-semibold mb-2">Registration Details:</h4>
                <div className="space-y-2 text-gray-300 text-sm">
                  <p><strong>Name:</strong> {registrationData.fullName || 'Not provided'}</p>
                  <p><strong>Email:</strong> {registrationData.email || 'Not provided'}</p>
                  <p><strong>Enrollment:</strong> {registrationData.enrollmentNo || 'Not provided'}</p>
                  <p><strong>Branch:</strong> {registrationData.branch || 'Not provided'}</p>
                  <p><strong>Mobile:</strong> {registrationData.mobileNo || 'Not provided'}</p>
                </div>
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={handleEditToggle}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                  >
                    Edit Details
                  </button>
                  <button
                    onClick={handleRegistrationSubmit}
                    disabled={registering}
                    className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                  >
                    {registering ? 'Registering...' : 'Confirm Registration'}
                  </button>
                </div>
              </div>
            ) : (
              /* Registration Form */
              <RegisterForm
                registrationData={registrationData}
                setRegistrationData={setRegistrationData}
                handleRegisterSubmit={handleRegistrationSubmit}
                isLoading={registering}
                onCancel={handleCancelRegistration}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetails;