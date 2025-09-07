import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
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
  eventDates = [],
}) => {
  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const formattedDate = date.toDateString();
      if (eventDates.includes(formattedDate)) {
        return "has-event";
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
      <p className="mt-2 text-center">
        Selected: {selectedDate.toDateString()}
      </p>
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
    const startIndex = Math.max(
      0,
      currentSlide - Math.floor(maxVisibleDots / 2)
    );
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
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
    }
  };

  const handleImageClick = (event) => {
    if (enableImageClick && event) {
      const eventId = event._id || event.id;
      if (eventId) {
        navigate(`/events/${eventId}`);
        // Scroll to top after navigation
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 100);
      }
    }
  };

  const handleLearnMoreClick = (eventId) => {
    if (eventId) {
      navigate(`/events/${eventId}`);
      // Scroll to top after navigation
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
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
                handleLearnMoreClick(eventId);
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
    <div
      className={`event-carousel ${className}`}
      style={{ padding: "12px 0" }}
    >
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
          <p className="text-gray-300 text-lg">Exciting events coming soon 🚀</p>
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
    setNewEvent((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewEvent((prev) => ({
      ...prev,
      imageFile: file,
    }));
  };

  const isPaidEvent = parseFloat(newEvent.registrationFee) > 0;

  // Helper function to add red asterisk for required fields
  const RequiredLabel = ({ children, isRequired = false }) => (
    <label className="block text-sm font-medium text-gray-300 mb-2">
      {children}
      {isRequired && <span className="text-red-500"> *</span>}
    </label>
  );

  return (
    <div className="bg-gray-800 bg-opacity-80 p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-400">
        Create New Event
      </h2>

      <div className="space-y-4">
        {/* Title */}
        <div>
          <RequiredLabel isRequired={true}>Event Title</RequiredLabel>
          <input
            type="text"
            value={newEvent.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:border-green-500 focus:outline-none"
            placeholder="Enter event title"
            required
          />
        </div>

        {/* Description */}
        <div>
          <RequiredLabel isRequired={true}>Event Description</RequiredLabel>
          <textarea
            value={newEvent.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:border-green-500 focus:outline-none resize-vertical"
            placeholder="Enter event description"
            rows="4"
            required
          />
        </div>

        {/* Event Type */}
        <div>
          <RequiredLabel isRequired={true}>Event Type</RequiredLabel>
          <select
            value={newEvent.eventType}
            onChange={(e) => handleInputChange("eventType", e.target.value)}
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
          <RequiredLabel isRequired={true}>Event Date</RequiredLabel>
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
          <RequiredLabel isRequired={true}>Event Image</RequiredLabel>
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
          <RequiredLabel isRequired={false}>Event Prize</RequiredLabel>
          <input
            type="text"
            value={newEvent.eventPrize}
            onChange={(e) => handleInputChange("eventPrize", e.target.value)}
            className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:border-green-500 focus:outline-none"
            placeholder="e.g., Certificates, Cash Prize, Trophy"
          />
        </div>

        {/* Registration Fee */}
        <div>
          <RequiredLabel isRequired={false}>Registration Fee (₹)</RequiredLabel>
          <input
            type="number"
            min="0"
            value={
              newEvent.registrationFee === 0 ? "" : newEvent.registrationFee
            }
            onChange={(e) =>
              handleInputChange(
                "registrationFee",
                parseInt(e.target.value) || 0
              )
            }
            className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:border-green-500 focus:outline-none"
            placeholder="0"
          />
        </div>

        {/* Payment Form Link - Shows only for paid events */}
        {isPaidEvent && (
          <div>
            <RequiredLabel isRequired={true}>Payment Form Link</RequiredLabel>
            <input
              type="url"
              value={newEvent.paymentFormLink || ""}
              onChange={(e) =>
                handleInputChange("paymentFormLink", e.target.value)
              }
              className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:border-green-500 focus:outline-none"
              placeholder="https://forms.google.com/..."
              required={isPaidEvent}
            />
            <p className="text-sm text-yellow-400 mt-1">
              Provide a Google Form link containing QR code for payment and
              proof submission
            </p>
          </div>
        )}

        {/* Max Participants */}
        <div>
          <RequiredLabel isRequired={false}>Maximum Participants</RequiredLabel>
          <input
            type="number"
            min="1"
            value={newEvent.maxParticipants || ""}
            onChange={(e) =>
              handleInputChange(
                "maxParticipants",
                e.target.value ? parseInt(e.target.value) : null
              )
            }
            className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:border-green-500 focus:outline-none"
            placeholder="Leave empty for unlimited"
          />
        </div>

        {/* Registration Deadline */}
        <div>
          <RequiredLabel isRequired={false}>
            Registration Deadline
          </RequiredLabel>
          <input
            type="datetime-local"
            value={
              newEvent.registrationDeadline
                ? new Date(newEvent.registrationDeadline)
                    .toISOString()
                    .slice(0, 16)
                : ""
            }
            onChange={(e) =>
              handleInputChange("registrationDeadline", e.target.value || null)
            }
            className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:border-green-500 focus:outline-none"
          />
        </div>

        {/* Event Status */}
        <div>
          <RequiredLabel isRequired={false}>Event Status</RequiredLabel>
          <select
            value={newEvent.eventStatus}
            onChange={(e) => handleInputChange("eventStatus", e.target.value)}
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
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600 hover:shadow-lg transform hover:scale-[1.02]"
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-black mr-2"></div>
              Adding Event...
            </div>
          ) : (
            "Add Event"
          )}
        </button>
      </div>

      <div className="mt-4 text-xs text-gray-400 text-center">
        <span className="text-red-500">*</span> Required fields
      </div>
    </div>
  );
};

export const RegisterForm = ({
  registrationData,
  setRegistrationData,
  handleRegisterSubmit,
  isLoading = false,
  onCancel,
  event,
  registrationStep = "form",
  onPaymentCompleted,
}) => {
  const branches = [
    "B.Tech Civil Engineering",
    "B.Tech Mechanical Engineering",
    "B.Tech Electrical Engineering",
    "B.Tech Electronics Engineering",
    "B. Architecture",
    "B.Tech Computer Science & Engineering",
    "B.Tech Chemical Engineering",
    "B.Tech Information Technology",
    "B.Tech Electronics & Telecommunication Engineering",
    "B.Tech Information Technology (Artificial Intelligence and Robotics)",
    "B.Tech Internet of Things (IoT)",
    "B.Tech Mathematics and Computing",
    "B.Tech Artificial Intelligence (AI) and Data Science",
    "B.Tech Artificial Intelligence and Machine Learning",
    "B.Tech Computer Science and Design",
    "B.Tech Computer Science & Business Systems",
    "B.Tech Artificial Intelligence (AI)",
    "B.Tech Computer Science and Technology",
    "B.Tech Electrical and Computer Engineering",
    "Other",
  ];

  const isPaidEvent = event && parseFloat(event.registrationFee) > 0;

  if (registrationStep === "form") {
    return (
      <div className="bg-gray-800 rounded-2xl p-6 shadow-2xl backdrop-blur-sm border border-gray-700/50">
        <h3 className="text-xl font-bold text-white mb-6 text-center bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text">
          Event Registration
        </h3>

        <form onSubmit={handleRegisterSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-gray-300 text-xs font-medium mb-2"
            >
              Full Name *
            </label>
            <input
              type="text"
              id="fullName"
              required
              placeholder="Enter your full name"
              value={registrationData.fullName || ""}
              onChange={(e) =>
                setRegistrationData((prev) => ({
                  ...prev,
                  fullName: e.target.value,
                }))
              }
              className="w-full p-3 text-sm rounded-xl bg-gray-700/70 text-white border border-gray-600/50 focus:border-green-400 focus:ring-2 focus:ring-green-400/20 focus:outline-none transition-all duration-300 backdrop-blur-sm"
              disabled={isLoading}
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-gray-300 text-xs font-medium mb-2"
            >
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              required
              placeholder="Enter your email address"
              value={registrationData.email || ""}
              onChange={(e) =>
                setRegistrationData((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
              className="w-full p-3 text-sm rounded-xl bg-gray-700/70 text-white border border-gray-600/50 focus:border-green-400 focus:ring-2 focus:ring-green-400/20 focus:outline-none transition-all duration-300 backdrop-blur-sm"
              disabled={isLoading}
            />
          </div>

          {/* Enrollment Number */}
          <div>
            <label
              htmlFor="enrollmentNo"
              className="block text-gray-300 text-xs font-medium mb-2"
            >
              Enrollment Number *
            </label>
            <input
              type="text"
              id="enrollmentNo"
              required
              placeholder="Enter your enrollment number"
              value={registrationData.enrollmentNo || ""}
              onChange={(e) =>
                setRegistrationData((prev) => ({
                  ...prev,
                  enrollmentNo: e.target.value,
                }))
              }
              className="w-full p-3 text-sm rounded-xl bg-gray-700/70 text-white border border-gray-600/50 focus:border-green-400 focus:ring-2 focus:ring-green-400/20 focus:outline-none transition-all duration-300 backdrop-blur-sm"
              disabled={isLoading}
            />
          </div>

          {/* Branch */}
          <div>
            <label
              htmlFor="branch"
              className="block text-gray-300 text-xs font-medium mb-2"
            >
              Branch *
            </label>
            <select
              id="branch"
              required
              value={registrationData.branch || ""}
              onChange={(e) =>
                setRegistrationData((prev) => ({
                  ...prev,
                  branch: e.target.value,
                }))
              }
              className="w-full p-3 text-sm rounded-xl bg-gray-700/70 text-white border border-gray-600/50 focus:border-green-400 focus:ring-2 focus:ring-green-400/20 focus:outline-none transition-all duration-300 backdrop-blur-sm"
              disabled={isLoading}
            >
              <option value="">Select your branch</option>
              {branches.map((branch) => (
                <option
                  key={branch}
                  value={branch}
                  className="bg-gray-700 text-white"
                >
                  {branch}
                </option>
              ))}
            </select>
          </div>

          {/* Mobile Number */}
          <div>
            <label
              htmlFor="mobileNo"
              className="block text-gray-300 text-xs font-medium mb-2"
            >
              Mobile Number *
            </label>
            <input
              type="tel"
              id="mobileNo"
              required
              placeholder="Enter your mobile number"
              value={registrationData.mobileNo || ""}
              onChange={(e) =>
                setRegistrationData((prev) => ({
                  ...prev,
                  mobileNo: e.target.value,
                }))
              }
              pattern="[0-9]{10}"
              title="Please enter a valid 10-digit mobile number"
              className="w-full p-3 text-sm rounded-xl bg-gray-700/70 text-white border border-gray-600/50 focus:border-green-400 focus:ring-2 focus:ring-green-400/20 focus:outline-none transition-all duration-300 backdrop-blur-sm"
              disabled={isLoading}
            />
            <p className="text-gray-400 text-xs mt-1 ml-1">
              Please enter a 10-digit mobile number
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 bg-gray-600/80 hover:bg-gray-700 text-white font-medium py-3 px-4 text-sm rounded-xl transition-all duration-300 transform hover:scale-105 backdrop-blur-sm border border-gray-500/30"
                disabled={isLoading}
              >
                Cancel
              </button>
            )}

            <button
              type="submit"
              className={`flex-1 font-bold py-3 px-4 text-sm rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${
                isLoading
                  ? "bg-gray-500/80 cursor-not-allowed text-gray-300 border border-gray-400/30"
                  : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-green-500/25"
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-gray-300 mr-2"></div>
                  {isPaidEvent ? "Registering..." : "Registering..."}
                </div>
              ) : isPaidEvent ? (
                "Continue to Payment"
              ) : (
                "Register Now"
              )}
            </button>
          </div>
        </form>
      </div>
    );
  }

  if (registrationStep === "payment" && isPaidEvent) {
    return (
      <div className="bg-gray-800 rounded-2xl p-6 shadow-2xl backdrop-blur-sm border border-gray-700/50">
        <h3 className="text-xl font-bold text-white mb-6 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text">
          Complete Payment
        </h3>

        {/* Registration Summary */}
        <div className="bg-gray-700/60 rounded-xl p-4 mb-6 backdrop-blur-sm border border-gray-600/30">
          <h4 className="text-base font-semibold text-green-400 mb-3">
            Registration Details
          </h4>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center py-1">
              <span className="text-gray-300">Event:</span>
              <span className="text-white font-medium">{event.title}</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-gray-300">Participant:</span>
              <span className="text-white font-medium">
                {registrationData.fullName}
              </span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-gray-300">Email:</span>
              <span className="text-white font-medium">
                {registrationData.email}
              </span>
            </div>
            <div className="border-t border-gray-600/50 pt-3 mt-3">
              <div className="flex justify-between items-center py-1">
                <span className="text-gray-300 text-sm">Registration Fee:</span>
                <span className="text-green-400 font-bold text-xl">
                  ₹{event.registrationFee}
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-gray-300">Payment Status:</span>
              <span className="text-yellow-400 font-medium bg-yellow-400/10 px-2 py-1 rounded-full text-xs">
                Pending
              </span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-gray-300">Approval Status:</span>
              <span className="text-yellow-400 font-medium bg-yellow-400/10 px-2 py-1 rounded-full text-xs">
                Pending
              </span>
            </div>
          </div>
        </div>

        {/* Payment Instructions */}
        <div className="bg-blue-900/30 rounded-xl p-4 mb-6 backdrop-blur-sm border border-blue-500/20">
          <h4 className="text-base font-semibold text-blue-300 mb-3">
            Payment Instructions
          </h4>
          <div className="text-xs text-blue-100 space-y-2">
            <div className="flex items-start">
              <span className="flex-shrink-0 w-5 h-5 bg-blue-500/20 rounded-full flex items-center justify-center text-xs font-bold text-blue-300 mr-2 mt-0.5">
                1
              </span>
              <p>Click on the payment form link below</p>
            </div>
            <div className="flex items-start">
              <span className="flex-shrink-0 w-5 h-5 bg-blue-500/20 rounded-full flex items-center justify-center text-xs font-bold text-blue-300 mr-2 mt-0.5">
                2
              </span>
              <p>Complete the payment using the provided details</p>
            </div>
            <div className="flex items-start">
              <span className="flex-shrink-0 w-5 h-5 bg-blue-500/20 rounded-full flex items-center justify-center text-xs font-bold text-blue-300 mr-2 mt-0.5">
                3
              </span>
              <p>Submit the payment proof in the Google form</p>
            </div>
            <div className="flex items-start">
              <span className="flex-shrink-0 w-5 h-5 bg-blue-500/20 rounded-full flex items-center justify-center text-xs font-bold text-blue-300 mr-2 mt-0.5">
                4
              </span>
              <p>Click "I've Completed Payment" button below to notify admin</p>
            </div>
          </div>
        </div>

        {/* Payment Form Link */}
        <div className="mb-6">
          <a
            href={event.paymentFormLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-4 text-sm rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center group"
          >
            <svg
              className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              ></path>
            </svg>
            Open Payment Form
          </a>
        </div>

        {/* Important Note */}
        <div className="bg-yellow-900/30 rounded-xl p-4 mb-6 backdrop-blur-sm border border-yellow-500/20">
          <h4 className="text-base font-semibold text-yellow-300 mb-2">
            Important Note
          </h4>
          <p className="text-yellow-100 text-xs leading-relaxed">
            Your registration has been submitted successfully with a "Pending
            Approval" status. Please complete the payment through the Google
            form link above, then click the "I've Completed Payment" button
            below to notify the admin. They will verify your payment proof and
            update your approval status accordingly.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-600/80 hover:bg-gray-700 text-white font-medium py-3 px-4 text-sm rounded-xl transition-all duration-300 transform hover:scale-105 backdrop-blur-sm border border-gray-500/30"
          >
            Cancel Registration
          </button>

          <button
            type="button"
            onClick={() => onPaymentCompleted && onPaymentCompleted()}
            className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-4 text-sm rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            I've Completed Payment
          </button>
        </div>
      </div>
    );
  }

  if (registrationStep === "success") {
    return (
      <div className="bg-gray-800 rounded-2xl p-6 shadow-2xl backdrop-blur-sm border border-gray-700/50 text-center">
        <div className="mb-6">
          <div className="text-green-400 mb-4">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-400/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-green-400/20">
              <svg
                className="w-10 h-10"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Registration Successful!
            </h3>
            <p className="text-gray-300 mb-4 text-sm leading-relaxed">
              {isPaidEvent
                ? "Registration submitted successfully. Please complete payment for approval."
                : "You have been successfully registered for the event."}
            </p>
          </div>
        </div>

        <div className="bg-gray-700/60 rounded-xl p-4 mb-6 backdrop-blur-sm border border-gray-600/30">
          <h4 className="text-base font-semibold text-green-400 mb-3">
            Registration Summary
          </h4>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center py-1">
              <span className="text-gray-300">Event:</span>
              <span className="text-white font-medium">{event?.title}</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-gray-300">Participant:</span>
              <span className="text-white font-medium">
                {registrationData.fullName}
              </span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-gray-300">Registration Status:</span>
              <span
                className={`font-bold px-2 py-1 rounded-full text-xs ${
                  isPaidEvent
                    ? "text-yellow-400 bg-yellow-400/10"
                    : "text-green-400 bg-green-400/10"
                }`}
              >
                {isPaidEvent ? "Pending Approval" : "Approved"}
              </span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-gray-300">Payment Status:</span>
              <span
                className={`font-bold px-2 py-1 rounded-full text-xs ${
                  isPaidEvent
                    ? "text-yellow-400 bg-yellow-400/10"
                    : "text-green-400 bg-green-400/10"
                }`}
              >
                {isPaidEvent ? "Pending" : "Not Required"}
              </span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-gray-300">Attendance Status:</span>
              <span className="text-blue-400 font-medium bg-blue-400/10 px-2 py-1 rounded-full text-xs">
                Registered
              </span>
            </div>
            {isPaidEvent && (
              <div className="border-t border-gray-600/50 pt-3 mt-3">
                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-300 text-sm">
                    Registration Fee:
                  </span>
                  <span className="text-green-400 font-bold text-xl">
                    ₹{event?.registrationFee}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {isPaidEvent && (
          <div className="bg-blue-900/30 rounded-xl p-4 mb-6 backdrop-blur-sm border border-blue-500/20">
            <p className="text-blue-100 text-xs leading-relaxed">
              <strong className="text-blue-300">Next Steps:</strong> Please
              complete the payment through the Google form link if you haven't
              already done so. The admin will review your payment proof and
              update your approval status. You will receive a confirmation email
              once your registration is approved.
            </p>
          </div>
        )}

        <button
          type="button"
          onClick={onCancel}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-4 text-sm rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          Back to Events
        </button>
      </div>
    );
  }

  return null;
};

export const Timeline = ({
  events = [],
  isLoading = false,
  title = "Event Timeline",
  maxItems = null,
}) => {
  const navigate = useNavigate();

  const sortedEvents = [...events].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const displayEvents = maxItems
    ? sortedEvents.slice(0, maxItems)
    : sortedEvents;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (eventStatus) => {
    switch (eventStatus) {
      case "upcoming":
        return "text-green-400";
      case "ongoing":
        return "text-yellow-400";
      case "completed":
        return "text-gray-400";
      case "cancelled":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  const getStatusDot = (eventStatus) => {
    switch (eventStatus) {
      case "upcoming":
        return "bg-green-400";
      case "ongoing":
        return "bg-yellow-400";
      case "completed":
        return "bg-gray-400";
      case "cancelled":
        return "bg-red-400";
      default:
        return "bg-gray-400";
    }
  };

  const handleEventClick = (event) => {
    const eventId = event._id || event.id;
    if (eventId) {
      navigate(`/events/${eventId}`);
      // Scroll to top after navigation
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
    }
  };

  const handleViewAllEvents = () => {
    navigate("/events");
    
    // Function to attempt scrolling with retries
    const attemptScroll = (attempts = 0) => {
      if (attempts >= 10) return; // Max 10 attempts
      
      // Try to find the event tabs section first
      const eventTabsSection = document.querySelector(".event-tabs-section");
      
      if (eventTabsSection) {
        // Scroll to show the event tabs at the top
        const offsetTop = eventTabsSection.offsetTop - 100; // 100px offset from top
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth"
        });
        return;
      }
      
      // If not found, try again after a short delay
      setTimeout(() => attemptScroll(attempts + 1), 200);
    };
    
    // Start attempting to scroll after initial page load
    setTimeout(() => attemptScroll(), 300);
  };

  if (isLoading) {
    return (
      <div className="timeline-container">
        {title && (
          <h3 className="text-2xl font-semibold mb-6 text-center text-white">
            {title}
          </h3>
        )}
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-400"></div>
        </div>
      </div>
    );
  }

  if (displayEvents.length === 0) {
    return (
      <div className="timeline-container">
        {title && (
          <h3 className="text-2xl font-semibold mb-6 text-center text-white">
            {title}
          </h3>
        )}
        <div className="bg-gray-800/50 rounded-lg p-8 text-center">
          <p className="text-gray-400 text-lg">Exciting events coming soon 🚀</p>
        </div>
      </div>
    );
  }

  return (
    <div className="timeline-container">
      {title && (
        <h3 className="text-2xl font-semibold mb-6 text-center text-white">
          {title}
        </h3>
      )}

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-600"></div>

        {/* Timeline items */}
        <div className="space-y-6">
          {displayEvents.map((event) => (
            <div
              key={event._id || event.id}
              className="relative flex items-start"
            >
              {/* Timeline dot */}
              <div
                className={`absolute left-2 w-4 h-4 rounded-full border-2 border-gray-900 ${getStatusDot(
                  event.eventStatus
                )} z-10`}
              ></div>

              {/* Event content */}
              <div
                className="ml-12 bg-gray-800/70 rounded-lg p-4 hover:bg-gray-800 transition-colors duration-200 cursor-pointer w-full group"
                onClick={() => handleEventClick(event)}
              >
                {/* Date and time */}
                <div className="flex items-center justify-between mb-2">
                  <div className="text-gray-400 text-sm">
                    <span className="font-medium">
                      {formatDate(event.date)}
                    </span>
                    {event.time && (
                      <span className="ml-2">• {formatTime(event.date)}</span>
                    )}
                  </div>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded ${getStatusColor(
                      event.eventStatus
                    )}`}
                  >
                    {event.eventStatus?.toUpperCase() || "UNKNOWN"}
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
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="mr-1"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      {event.eventType}
                    </span>
                  )}

                  {event.eventPrize && (
                    <span className="flex items-center">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="mr-1"
                      >
                        <path d="M7 5h10l2 2v11c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2V7c0-1.1.9-2 2-2z" />
                      </svg>
                      {event.eventPrize}
                    </span>
                  )}

                  {event.registrationFee !== undefined && (
                    <span className="flex items-center">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="mr-1"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                      {event.registrationFee === 0
                        ? "Free"
                        : `₹${event.registrationFee}`}
                    </span>
                  )}

                  {event.maxParticipants && (
                    <span className="flex items-center">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="mr-1"
                      >
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                      {event.currentParticipants || 0}/{event.maxParticipants}
                    </span>
                  )}
                </div>

                {/* Click indicator */}
                <div className="mt-3 flex items-center text-xs text-gray-500 group-hover:text-green-400 transition-colors duration-200">
                  <span>Click to view details</span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="ml-1"
                  >
                    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
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
              onClick={handleViewAllEvents}
              className="text-green-400 hover:text-green-300 font-medium transition-colors duration-200 flex items-center justify-center gap-2 mx-auto"
            >
              <span>View All Events ({events.length - maxItems} more)</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="transition-transform duration-200 group-hover:translate-x-1"
              >
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
              </svg>
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
  enableImageClick = false,
}) => {
  const navigate = useNavigate();

  const handleRegister = (eventId) => {
    if (eventId) {
      navigate(`/events/${eventId}`);
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
    }
  };

  const handleImageClick = (event) => {
    if (enableImageClick && event) {
      const eventId = event._id || event.id;

      if (eventId) {
        navigate(`/events/${eventId}`);
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 100);
      } else {
        console.error("Event ID not found:", event);
      }
    }
  };

  const handleLearnMoreClick = (eventId) => {
    if (eventId) {
      navigate(`/events/${eventId}`);
      // Scroll to top after navigation
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
    }
  };

  if (isLoading) {
    return (
      <div className={`event-mini-cards ${className}`}>
        {title && (
          <h3 className="text-2xl font-semibold mb-6 text-center">{title}</h3>
        )}
        <div className="flex justify-center items-center h-72">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-400"></div>
        </div>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className={`event-mini-cards ${className}`}>
        {title && (
          <h3 className="text-2xl font-semibold mb-6 text-center">{title}</h3>
        )}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 text-center h-72 flex items-center justify-center">
          <p className="text-gray-300 text-lg">Exciting events coming soon 🚀</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`event-mini-cards ${className}`}>
      {title && (
        <h3 className="text-2xl font-semibold mb-6 text-center">{title}</h3>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {events.map((event) => (
          <div
            key={event._id || event.id}
            className={`relative w-full rounded-xl overflow-hidden transition-all duration-300 group ${
              enableImageClick
                ? "cursor-pointer hover:ring-4 hover:ring-green-400/50 hover:ring-offset-4 hover:ring-offset-transparent hover:scale-[1.02] hover:shadow-2xl hover:shadow-green-400/20"
                : ""
            }`}
            onClick={() => handleImageClick(event)}
          >
            {/* Event Image Background */}
            <div
              className="absolute inset-0 rounded-xl overflow-hidden"
              style={{
                backgroundImage: `url(${event.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
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
                    enableImageClick ? "group-hover:text-green-400" : ""
                  }`}
                  style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
                >
                  {event.title}
                </h3>

                {/* Date with Calendar Icon */}
                <div className="flex items-center">
                  <div className="flex items-center text-green-400 text-sm">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="mr-1"
                    >
                      <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
                    </svg>
                    <span className="font-medium text-xs">
                      {new Date(event.date).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                {/* Participants and Prize Info in a row */}
                <div className="flex items-center justify-between text-xs">
                  {/* Participants Info */}
                  <div className="flex items-center text-gray-200">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="mr-1"
                    >
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                    <span className="font-medium">50+</span>
                  </div>

                  {/* Prize Info */}
                  <div className="flex items-center text-gray-200">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="mr-1"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <span className="font-medium truncate">
                      {event.eventPrize || "No Prize"}
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
                      handleLearnMoreClick(eventId);
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
