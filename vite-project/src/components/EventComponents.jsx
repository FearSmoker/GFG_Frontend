import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../css/EventComponents.css";
import "../css/Calender.css";

export const EventCalendar = ({ 
  selectedDate, 
  handleDateChange, 
  eventDates = [] 
}) => {
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const formattedDate = date.toDateString();
      if (eventDates.includes(formattedDate)) {
        return 'has-event';
      }
    }
    return null;
  };

  return (
    <div className="calendar-container">
      <Calendar 
        onChange={handleDateChange} 
        value={selectedDate} 
        tileClassName={tileClassName} 
        className="custom-calendar"
      />
      <p className="mt-2 text-center">Selected: {selectedDate.toDateString()}</p>
    </div>
  );
};

export const EventCarousel = ({
  events,
  isLoading = false,
  className = "",
  enableImageClick = false,
}) => {
  const navigate = useNavigate();
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const isLarge = className.includes("event-carousel-large");

  const getVisibleDotIndices = () => {
    const totalEvents = events.length;
    const maxVisibleDots = Math.min(5, totalEvents);
    
    if (totalEvents <= maxVisibleDots) {
      return Array.from({ length: totalEvents }, (_, i) => i);
    }
    
    const visibleIndices = [];
    const startIndex = Math.max(0, currentSlide - Math.floor(maxVisibleDots / 2));
    const endIndex = Math.min(totalEvents - 1, startIndex + maxVisibleDots - 1);
    const actualStart = Math.max(0, endIndex - maxVisibleDots + 1);
    
    for (let i = actualStart; i <= endIndex; i++) {
      visibleIndices.push(i);
    }
    
    return visibleIndices;
  };

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: events.length > 1,
    autoplaySpeed: 3000,
    beforeChange: (oldIndex, newIndex) => {
      setCurrentSlide(newIndex);
    },
    customPaging: (i) => {
      const visibleIndices = getVisibleDotIndices();
      const dotIndex = visibleIndices.indexOf(i);
      
      if (dotIndex === -1) {
        return <div style={{ display: "none" }} />;
      }

      return (
        <button
          className={`rounded-full transition-all duration-500 ease-out mx-1 transform ${
            i === currentSlide
              ? "w-5 h-5 bg-green-400 scale-100 opacity-100"
              : "w-3 h-3 bg-white/30 hover:bg-white/50 scale-75 opacity-60"
          }`}
          style={{
            transform: i === currentSlide ? "scale(1)" : "scale(0.75)",
            opacity: i === currentSlide ? 1 : 0.6,
            transition: "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
          onClick={() => {
            if (sliderRef.current) {
              sliderRef.current.slickGoTo(i);
            }
          }}
        />
      );
    },
    appendDots: (dots) => {
      const visibleIndices = getVisibleDotIndices();
      const visibleDots = dots.filter((_, index) =>
        visibleIndices.includes(index)
      );

      return (
        <div style={{ bottom: isLarge ? "-20px" : "-40px" }}>
          <ul className="flex justify-center items-center space-x-1">
            {visibleDots}
          </ul>
        </div>
      );
    },
  };

  const handleRegister = (eventId) => {
    if (eventId) {
      navigate(`/events/${eventId}`);
    }
  };

  const handleImageClick = (event) => {
    if (enableImageClick && event) {
      const eventId = event._id || event.id;
      if (eventId) {
        navigate(`/events/${eventId}`);
      }
    }
  };

  const EventCard = ({ event }) => (
    <div
      className={`relative w-full rounded-lg overflow-hidden transition-all duration-300 group ${
        enableImageClick
          ? "cursor-pointer hover:ring-4 hover:ring-green-400/50 hover:ring-offset-4 hover:ring-offset-transparent hover:scale-[1.02] hover:shadow-2xl hover:shadow-green-400/20"
          : ""
      }`}
      onClick={() => handleImageClick(event)}
      style={{ margin: "8px 0" }}
    >
      <div
        className="absolute inset-0 rounded-lg overflow-hidden"
        style={{
          backgroundImage: `url(${event.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div
        className={`relative z-10 p-8 flex flex-col justify-between ${
          isLarge ? "h-[500px]" : "h-[400px]"
        } bg-gradient-to-t from-black/85 via-transparent to-transparent rounded-lg`}
      >
        <div className="flex-1" />
        <div className="flex flex-col justify-end space-y-3">
          <h3
            className={`text-white font-bold text-2xl leading-tight transition-colors duration-200 ${
              enableImageClick ? "group-hover:text-green-400" : ""
            }`}
            style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
          >
            {event.title}
          </h3>
          <div className="flex items-center">
            <div className="flex items-center text-green-400 text-base">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="mr-2"
              >
                <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
              </svg>
              <span className="font-medium">
                {new Date(event.date).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-200 text-base">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="mr-2"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
              <span className="font-medium">50+ Registered</span>
            </div>
            <div className="flex items-center text-gray-200 text-base">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="mr-2"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span className="font-medium">
                {event.eventPrize || "No Prize Listed"}
              </span>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                const eventId = event._id || event.id;
                if (eventId) {
                  navigate(`/events/${eventId}`);
                }
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 text-sm"
            >
              Learn More
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRegister(event._id || event.id);
              }}
              className="bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-6 rounded-lg transition-all duration-200 text-sm shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`event-carousel ${className}`} style={{ padding: "12px 0" }}>
      {isLoading ? (
        <div
          className={`flex justify-center items-center ${
            isLarge ? "h-[500px]" : "h-[400px]"
          }`}
        >
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-400"></div>
        </div>
      ) : events.length === 0 ? (
        <div
          className={`bg-white/10 backdrop-blur-sm rounded-lg p-8 text-center ${
            isLarge ? "h-[500px]" : "h-[400px]"
          } flex items-center justify-center`}
        >
          <p className="text-gray-300 text-lg">No events to display</p>
        </div>
      ) : events.length === 1 ? (
        <div style={{ padding: "8px 0" }}>
          <EventCard event={events[0]} />
        </div>
      ) : (
        <div
          className={isLarge ? "pb-6" : "pb-12"}
          style={{ padding: "8px 0 48px 0" }}
        >
          <Slider {...carouselSettings} ref={sliderRef}>
            {events.map((event) => (
              <div
                key={event._id || event.id}
                className="px-2"
                style={{ padding: "0 8px" }}
              >
                <EventCard event={event} />
              </div>
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
};

export const EventForm = ({
  newEvent,
  setNewEvent,
  handleAddEvent,
  isLoading,
  selectedDate,
  setSelectedDate,
}) => {
  const handleInputChange = (field, value) => {
    setNewEvent(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewEvent(prev => ({
      ...prev,
      imageFile: file
    }));
  };

  return (
    <div className="bg-gray-800 bg-opacity-80 p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-400">Create New Event</h2>
      
      <div className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Event Title *
          </label>
          <input
            type="text"
            value={newEvent.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:border-green-500 focus:outline-none"
            placeholder="Enter event title"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Event Description *
          </label>
          <textarea
            value={newEvent.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:border-green-500 focus:outline-none resize-vertical"
            placeholder="Enter event description"
            rows="4"
            required
          />
        </div>

        {/* Event Type */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Event Type *
          </label>
          <select
            value={newEvent.eventType}
            onChange={(e) => handleInputChange('eventType', e.target.value)}
            className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:border-green-500 focus:outline-none"
            required
          >
            <option value="Competition">Competition</option>
            <option value="Workshop">Workshop</option>
            <option value="Seminar">Seminar</option>
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Event Date *
          </label>
          <input
            type="datetime-local"
            value={selectedDate.toISOString().slice(0, 16)}
            onChange={(e) => setSelectedDate(new Date(e.target.value))}
            className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:border-green-500 focus:outline-none"
            required
          />
        </div>

        {/* Image */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Event Image *
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:border-green-500 focus:outline-none"
            required
          />
          {newEvent.imageFile && (
            <p className="text-sm text-green-400 mt-1">
              Selected: {newEvent.imageFile.name}
            </p>
          )}
        </div>

        {/* Event Prize */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Event Prize
          </label>
          <input
            type="text"
            value={newEvent.eventPrize}
            onChange={(e) => handleInputChange('eventPrize', e.target.value)}
            className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:border-green-500 focus:outline-none"
            placeholder="e.g., Certificates, Cash Prize, Trophy"
          />
        </div>

        {/* Registration Fee */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Registration Fee (₹)
          </label>
          <input
            type="number"
            min="0"
            value={newEvent.registrationFee}
            onChange={(e) => handleInputChange('registrationFee', parseInt(e.target.value) || 0)}
            className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:border-green-500 focus:outline-none"
            placeholder="0"
          />
        </div>

        {/* Max Participants */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Maximum Participants
          </label>
          <input
            type="number"
            min="1"
            value={newEvent.maxParticipants || ''}
            onChange={(e) => handleInputChange('maxParticipants', e.target.value ? parseInt(e.target.value) : null)}
            className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:border-green-500 focus:outline-none"
            placeholder="Leave empty for unlimited"
          />
        </div>

        {/* Registration Deadline */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Registration Deadline
          </label>
          <input
            type="datetime-local"
            value={newEvent.registrationDeadline ? new Date(newEvent.registrationDeadline).toISOString().slice(0, 16) : ''}
            onChange={(e) => handleInputChange('registrationDeadline', e.target.value || null)}
            className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:border-green-500 focus:outline-none"
          />
        </div>

        {/* Event Status */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Event Status
          </label>
          <select
            value={newEvent.eventStatus}
            onChange={(e) => handleInputChange('eventStatus', e.target.value)}
            className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:border-green-500 focus:outline-none"
          >
            <option value="upcoming">Upcoming</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleAddEvent}
          disabled={isLoading}
          className={`w-full py-3 px-4 rounded-md font-bold text-black transition-all duration-200 ${
            isLoading
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-600 hover:shadow-lg transform hover:scale-[1.02]'
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-black mr-2"></div>
              Adding Event...
            </div>
          ) : (
            'Add Event'
          )}
        </button>
      </div>

      <div className="mt-4 text-xs text-gray-400 text-center">
        * Required fields
      </div>
    </div>
  );
};

export const RegisterForm = ({
  registrationData,
  setRegistrationData,
  handleRegisterSubmit,
  isLoading = false,
  onCancel
}) => {
  const branches = [
    'Computer Science & Engineering',
    'Information Technology',
    'Electronics & Communication Engineering',
    'Electrical Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Chemical Engineering',
    'Biotechnology',
    'Aerospace Engineering',
    'Other'
  ];

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
      <h3 className="text-2xl font-bold text-white mb-6 text-center">Event Registration</h3>
      
      <form onSubmit={handleRegisterSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-gray-300 text-sm font-medium mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="fullName"
            required
            placeholder="Enter your full name"
            value={registrationData.fullName || ''}
            onChange={(e) =>
              setRegistrationData((prev) => ({ ...prev, fullName: e.target.value }))
            }
            className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-green-400 focus:outline-none transition-colors"
            disabled={isLoading}
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            required
            placeholder="Enter your email address"
            value={registrationData.email || ''}
            onChange={(e) =>
              setRegistrationData((prev) => ({ ...prev, email: e.target.value }))
            }
            className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-green-400 focus:outline-none transition-colors"
            disabled={isLoading}
          />
        </div>

        {/* Enrollment Number */}
        <div>
          <label htmlFor="enrollmentNo" className="block text-gray-300 text-sm font-medium mb-2">
            Enrollment Number *
          </label>
          <input
            type="text"
            id="enrollmentNo"
            required
            placeholder="Enter your enrollment number"
            value={registrationData.enrollmentNo || ''}
            onChange={(e) =>
              setRegistrationData((prev) => ({ ...prev, enrollmentNo: e.target.value }))
            }
            className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-green-400 focus:outline-none transition-colors"
            disabled={isLoading}
          />
        </div>

        {/* Branch */}
        <div>
          <label htmlFor="branch" className="block text-gray-300 text-sm font-medium mb-2">
            Branch *
          </label>
          <select
            id="branch"
            required
            value={registrationData.branch || ''}
            onChange={(e) =>
              setRegistrationData((prev) => ({ ...prev, branch: e.target.value }))
            }
            className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-green-400 focus:outline-none transition-colors"
            disabled={isLoading}
          >
            <option value="">Select your branch</option>
            {branches.map((branch) => (
              <option key={branch} value={branch}>
                {branch}
              </option>
            ))}
          </select>
        </div>

        {/* Mobile Number */}
        <div>
          <label htmlFor="mobileNo" className="block text-gray-300 text-sm font-medium mb-2">
            Mobile Number *
          </label>
          <input
            type="tel"
            id="mobileNo"
            required
            placeholder="Enter your mobile number"
            value={registrationData.mobileNo || ''}
            onChange={(e) =>
              setRegistrationData((prev) => ({ ...prev, mobileNo: e.target.value }))
            }
            pattern="[0-9]{10}"
            title="Please enter a valid 10-digit mobile number"
            className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-green-400 focus:outline-none transition-colors"
            disabled={isLoading}
          />
          <p className="text-gray-400 text-xs mt-1">Please enter a 10-digit mobile number</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
              disabled={isLoading}
            >
              Cancel
            </button>
          )}
          
          <button
            type="submit"
            className={`flex-1 font-bold py-3 px-6 rounded-lg transition-all duration-200 ${
              isLoading 
                ? "bg-gray-500 cursor-not-allowed text-gray-300" 
                : "bg-green-500 hover:bg-green-600 text-black shadow-lg hover:shadow-xl transform hover:scale-105"
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-gray-300 mr-2"></div>
                Registering...
              </div>
            ) : (
              "Register Now"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};


export const Timeline = ({ 
  events = [], 
  isLoading = false, 
  title = "Event Timeline",
  maxItems = null 
}) => {
  const navigate = useNavigate();

  
  const sortedEvents = [...events].sort((a, b) => new Date(b.date) - new Date(a.date));
  
  
  const displayEvents = maxItems ? sortedEvents.slice(0, maxItems) : sortedEvents;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (eventStatus) => {
    switch (eventStatus) {
      case 'upcoming':
        return 'text-green-400';
      case 'ongoing':
        return 'text-yellow-400';
      case 'completed':
        return 'text-gray-400';
      case 'cancelled':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusDot = (eventStatus) => {
    switch (eventStatus) {
      case 'upcoming':
        return 'bg-green-400';
      case 'ongoing':
        return 'bg-yellow-400';
      case 'completed':
        return 'bg-gray-400';
      case 'cancelled':
        return 'bg-red-400';
      default:
        return 'bg-gray-400';
    }
  };

  const handleEventClick = (event) => {
    const eventId = event._id || event.id;
    if (eventId) {
      navigate(`/events/${eventId}`);
    }
  };

  if (isLoading) {
    return (
      <div className="timeline-container">
        {title && <h3 className="text-2xl font-semibold mb-6 text-center text-white">{title}</h3>}
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-400"></div>
        </div>
      </div>
    );
  }

  if (displayEvents.length === 0) {
    return (
      <div className="timeline-container">
        {title && <h3 className="text-2xl font-semibold mb-6 text-center text-white">{title}</h3>}
        <div className="bg-gray-800/50 rounded-lg p-8 text-center">
          <p className="text-gray-400 text-lg">No events to display</p>
        </div>
      </div>
    );
  }

  return (
    <div className="timeline-container">
      {title && <h3 className="text-2xl font-semibold mb-6 text-center text-white">{title}</h3>}
      
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-600"></div>
        
        {/* Timeline items */}
        <div className="space-y-6">
          {displayEvents.map((event) => (
            <div key={event._id || event.id} className="relative flex items-start">
              {/* Timeline dot */}
              <div className={`absolute left-2 w-4 h-4 rounded-full border-2 border-gray-900 ${getStatusDot(event.eventStatus)} z-10`}></div>
              
              {/* Event content */}
              <div className="ml-12 bg-gray-800/70 rounded-lg p-4 hover:bg-gray-800 transition-colors duration-200 cursor-pointer w-full group" onClick={() => handleEventClick(event)}>
                {/* Date and time */}
                <div className="flex items-center justify-between mb-2">
                  <div className="text-gray-400 text-sm">
                    <span className="font-medium">{formatDate(event.date)}</span>
                    {event.time && <span className="ml-2">• {formatTime(event.date)}</span>}
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded ${getStatusColor(event.eventStatus)}`}>
                    {event.eventStatus?.toUpperCase() || 'UNKNOWN'}
                  </span>
                </div>
                
                {/* Event title */}
                <h4 className="text-lg font-semibold text-white group-hover:text-green-400 transition-colors duration-200 mb-2">
                  {event.title}
                </h4>
                
                {/* Event description */}
                {event.description && (
                  <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                    {event.description}
                  </p>
                )}
                
                {/* Event details */}
                <div className="flex flex-wrap gap-4 text-xs text-gray-400">
                  {event.eventType && (
                    <span className="flex items-center">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="mr-1">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                      {event.eventType}
                    </span>
                  )}
                  
                  {event.eventPrize && (
                    <span className="flex items-center">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="mr-1">
                        <path d="M7 5h10l2 2v11c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2V7c0-1.1.9-2 2-2z"/>
                      </svg>
                      {event.eventPrize}
                    </span>
                  )}
                  
                  {event.registrationFee !== undefined && (
                    <span className="flex items-center">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="mr-1">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                      {event.registrationFee === 0 ? 'Free' : `₹${event.registrationFee}`}
                    </span>
                  )}
                  
                  {event.maxParticipants && (
                    <span className="flex items-center">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="mr-1">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                      {event.currentParticipants || 0}/{event.maxParticipants}
                    </span>
                  )}
                </div>
                
                {/* Click indicator */}
                <div className="mt-3 flex items-center text-xs text-gray-500 group-hover:text-green-400 transition-colors duration-200">
                  <span>Click to view details</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="ml-1">
                    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Show more events link if maxItems is set and there are more events */}
        {maxItems && events.length > maxItems && (
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/events')}
              className="text-green-400 hover:text-green-300 font-medium transition-colors duration-200"
            >
              View All Events ({events.length - maxItems} more)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export const EventMiniCard = ({ 
  events, 
  isLoading = false, 
  title = "Events",
  className = "",
  enableImageClick = false
}) => {
  const navigate = useNavigate();

  const handleRegister = (eventId) => {
    console.log(`Register for event: ${eventId}`);
    alert("Registration functionality to be implemented");
  };

  const handleImageClick = (event) => {
    if (enableImageClick && event) {
      const eventId = event._id || event.id;
      
      if (eventId) {
        navigate(`/events/${eventId}`);
      } else {
        console.error('Event ID not found:', event);
      }
    }
  };

  if (isLoading) {
    return (
      <div className={`event-mini-cards ${className}`}>
        {title && <h3 className="text-2xl font-semibold mb-6 text-center">{title}</h3>}
        <div className="flex justify-center items-center h-72">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-400"></div>
        </div>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className={`event-mini-cards ${className}`}>
        {title && <h3 className="text-2xl font-semibold mb-6 text-center">{title}</h3>}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 text-center h-72 flex items-center justify-center">
          <p className="text-gray-300 text-lg">No events to display</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`event-mini-cards ${className}`}>
      {title && <h3 className="text-2xl font-semibold mb-6 text-center">{title}</h3>}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {events.map((event) => (
          <div 
            key={event._id || event.id}
            className={`relative w-full rounded-xl overflow-hidden transition-all duration-300 group ${
              enableImageClick 
                ? 'cursor-pointer hover:ring-4 hover:ring-green-400/50 hover:ring-offset-4 hover:ring-offset-transparent hover:scale-[1.02] hover:shadow-2xl hover:shadow-green-400/20' 
                : ''
            }`}
            onClick={() => handleImageClick(event)}
          >
            {/* Event Image Background */}
            <div 
              className="absolute inset-0 rounded-xl overflow-hidden"
              style={{
                backgroundImage: `url(${event.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
            
            {/* Content Overlay */}
            <div className="relative z-10 p-4 flex flex-col justify-between h-80 bg-gradient-to-t from-black/85 via-transparent to-transparent rounded-xl">
              {/* Top Section - Empty for image visibility */}
              <div className="flex-1"></div>
              
              {/* Bottom Section */}
              <div className="flex flex-col justify-end space-y-2">
                {/* Event Title */}
                <h3 
                  className={`text-white font-bold text-lg leading-tight transition-colors duration-200 ${
                    enableImageClick ? 'group-hover:text-green-400' : ''
                  }`} 
                  style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                >
                  {event.title}
                </h3>
                
                {/* Date with Calendar Icon */}
                <div className="flex items-center">
                  <div className="flex items-center text-green-400 text-sm">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="mr-1">
                      <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                    </svg>
                    <span className="font-medium text-xs">
                      {new Date(event.date).toLocaleDateString('en-US', { 
                        day: 'numeric',
                        month: 'short', 
                        year: 'numeric' 
                      })}
                    </span>
                  </div>
                </div>
                
                {/* Participants and Prize Info in a row */}
                <div className="flex items-center justify-between text-xs">
                  {/* Participants Info */}
                  <div className="flex items-center text-gray-200">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="mr-1">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                    <span className="font-medium">50+</span>
                  </div>
                  
                  {/* Prize Info */}
                  <div className="flex items-center text-gray-200">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="mr-1">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    <span className="font-medium truncate">
                      {event.eventPrize || 'No Prize'}
                    </span>
                  </div>
                </div>
                
                {/* Action Buttons Row */}
                <div className="flex gap-1 pt-2">
                  
                  {/* Learn More Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); 
                      const eventId = event._id || event.id;
                      if (eventId) {
                        navigate(`/events/${eventId}`);
                      }
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-1 px-2 rounded text-xs transition-all duration-200"
                  >
                    Learn More
                  </button>
                  
                  {/* Register Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); 
                      handleRegister(event._id || event.id);
                    }}
                    className="bg-green-500 hover:bg-green-600 text-black font-bold py-1 px-2 rounded text-xs transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};