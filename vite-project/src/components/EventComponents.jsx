import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Slider from "react-slick";
import { getUserTeams } from "../api/Team_api";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../css/EventComponents.css";
import "../css/Calender.css";
import { registerForEvent } from "../api/Registration_api";

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
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 100);
      }
    }
  };

  const handleLearnMoreClick = (eventId) => {
    if (eventId) {
      navigate(`/events/${eventId}`);
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
          <p className="text-gray-300 text-lg">
            Exciting events coming soon 🚀
          </p>
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

  const handleParticipationModeChange = (mode) => {
    setNewEvent((prev) => {
      let allowedTeamSizes = [];

      if (mode === "solo") {
        allowedTeamSizes = ["solo"];
      } else if (mode === "team") {
        allowedTeamSizes = ["duo", "trio", "quad", "five"];
      } else if (mode === "both") {
        allowedTeamSizes = ["solo", "duo", "trio", "quad", "five"];
      }

      return {
        ...prev,
        participationMode: mode,
        allowedTeamSizes,

        maxTeams: mode === "solo" ? null : prev.maxTeams,
      };
    });
  };

  const handleTeamSizeChange = (size, isChecked) => {
    setNewEvent((prev) => {
      const currentSizes = prev.allowedTeamSizes || [];
      let newSizes;

      if (isChecked) {
        newSizes = [...currentSizes, size];
      } else {
        newSizes = currentSizes.filter((s) => s !== size);
      }

      return {
        ...prev,
        allowedTeamSizes: newSizes,
      };
    });
  };

  const isPaidEvent = parseFloat(newEvent.registrationFee) > 0;
  const participationMode = newEvent.participationMode || "solo";
  const allowsTeams =
    participationMode === "team" || participationMode === "both";

  const formatDateForInput = (date) => {
    if (!date) return "";
    const d = new Date(date);
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 16);
  };

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

        {/* Participation Mode */}
        <div>
          <RequiredLabel isRequired={true}>Participation Mode</RequiredLabel>
          <select
            value={participationMode}
            onChange={(e) => handleParticipationModeChange(e.target.value)}
            className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:border-green-500 focus:outline-none"
            required
          >
            <option value="solo">Solo Only</option>
            <option value="team">Team Only</option>
            <option value="both">Both Solo and Team</option>
          </select>
        </div>

        {/* Allowed Team Sizes - Show only when teams are allowed */}
        {allowsTeams && (
          <div>
            <RequiredLabel isRequired={true}>Allowed Team Sizes</RequiredLabel>
            <div className="bg-gray-700 p-4 rounded-md border border-gray-600">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {participationMode === "both" && (
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newEvent.allowedTeamSizes?.includes("solo")}
                      onChange={(e) =>
                        handleTeamSizeChange("solo", e.target.checked)
                      }
                      className="form-checkbox text-green-500 bg-gray-600 border-gray-500"
                    />
                    <span className="text-white text-sm">Solo (1)</span>
                  </label>
                )}
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newEvent.allowedTeamSizes?.includes("duo")}
                    onChange={(e) =>
                      handleTeamSizeChange("duo", e.target.checked)
                    }
                    className="form-checkbox text-green-500 bg-gray-600 border-gray-500"
                  />
                  <span className="text-white text-sm">Duo (2)</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newEvent.allowedTeamSizes?.includes("trio")}
                    onChange={(e) =>
                      handleTeamSizeChange("trio", e.target.checked)
                    }
                    className="form-checkbox text-green-500 bg-gray-600 border-gray-500"
                  />
                  <span className="text-white text-sm">Trio (3)</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newEvent.allowedTeamSizes?.includes("quad")}
                    onChange={(e) =>
                      handleTeamSizeChange("quad", e.target.checked)
                    }
                    className="form-checkbox text-green-500 bg-gray-600 border-gray-500"
                  />
                  <span className="text-white text-sm">Quad (4)</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newEvent.allowedTeamSizes?.includes("five")}
                    onChange={(e) =>
                      handleTeamSizeChange("five", e.target.checked)
                    }
                    className="form-checkbox text-green-500 bg-gray-600 border-gray-500"
                  />
                  <span className="text-white text-sm">Five (5)</span>
                </label>
              </div>
              <p className="text-gray-400 text-xs mt-2">
                Select the team sizes allowed for this event
              </p>
            </div>
          </div>
        )}

        {/* Date */}
        <div>
          <RequiredLabel isRequired={true}>Event Date</RequiredLabel>
          <input
            type="datetime-local"
            value={formatDateForInput(selectedDate)}
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
            className="w-full p-3 rounded-md bg-gray-900 text-white border-2 border-gray-500 focus:border-green-500 focus:outline-none file:mr-3 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-bold file:bg-gray-700 file:text-white hover:file:bg-gray-600 cursor-pointer"
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

        {/* Max Participants (for solo registrations) */}
        <div>
          <RequiredLabel isRequired={false}>
            Maximum Solo Participants
          </RequiredLabel>
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
          <p className="text-sm text-gray-400 mt-1">
            Maximum number of individual participants (for solo registrations)
          </p>
        </div>

        {/* Max Teams - Show only when teams are allowed */}
        {allowsTeams && (
          <div>
            <RequiredLabel isRequired={false}>Maximum Teams</RequiredLabel>
            <input
              type="number"
              min="1"
              value={newEvent.maxTeams || ""}
              onChange={(e) =>
                handleInputChange(
                  "maxTeams",
                  e.target.value ? parseInt(e.target.value) : null
                )
              }
              className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:border-green-500 focus:outline-none"
              placeholder="Leave empty for unlimited"
            />
            <p className="text-sm text-gray-400 mt-1">
              Maximum number of teams allowed to register
            </p>
          </div>
        )}

        {/* Registration Deadline */}
        <div>
          <RequiredLabel isRequired={false}>
            Registration Deadline
          </RequiredLabel>
          <input
            type="datetime-local"
            value={
              newEvent.registrationDeadline
                ? formatDateForInput(newEvent.registrationDeadline)
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
  const [userTeams, setUserTeams] = useState([]);
  const [loadingTeams, setLoadingTeams] = useState(false);
  const [participationType, setParticipationType] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [teamRegistering, setTeamRegistering] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const selectedTeam = useMemo(() => {
    return userTeams.find((team) => team._id === registrationData.teamId);
  }, [userTeams, registrationData.teamId]);

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

  const getApplicableFee = useCallback(() => {
    if (participationType === 'team') {
      return parseFloat(event?.teamRegistrationFee || 0);
    }
    return parseFloat(event?.registrationFee || 0);
  }, [participationType, event]);

  const applicableFee = getApplicableFee();
  const isPaidEvent = applicableFee > 0;

  const participationMode = event?.participationMode || "both";
  const allowedTeamSizes = useMemo(() => {
    if (!event?.allowedTeamSizes || event.allowedTeamSizes.length === 0) {
      return ["solo", "duo", "trio", "quad"];
    }
    return event.allowedTeamSizes;
  }, [event?.allowedTeamSizes]);

  const canRegisterSolo = allowedTeamSizes.includes("solo");
  const canRegisterTeam =
    participationMode === "team" || participationMode === "both";

  const showToastNotification = (message, type = "error") => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      setToastMessage("");
    }, 3000);
  };

  const fetchUserLeaderTeams = useCallback(async () => {
    try {
      setLoadingTeams(true);

      const response = await getUserTeams({
        status: "verified",
        role: "leader",
        limit: 100,
      });

      if (response?.success && response?.data?.teams) {
        setUserTeams(response.data.teams);
      } else {
        setUserTeams([]);
      }
    } catch (error) {
      console.error("Error fetching leader teams:", error);

      try {
        const fallbackResponse = await getUserTeams({
          status: "verified",
          limit: 100,
        });

        if (fallbackResponse?.success && fallbackResponse?.data?.teams) {
          const leaderTeams = fallbackResponse.data.teams.filter((team) => {
            return team.userRole === "leader";
          });

          setUserTeams(leaderTeams);
        } else {
          setUserTeams([]);
        }
      } catch (fallbackError) {
        console.error("Fallback approach failed:", fallbackError);
        setUserTeams([]);
      }
    } finally {
      setLoadingTeams(false);
    }
  }, []);

  // Initialize participation type based on event mode
  useEffect(() => {
    if (participationMode === "solo") {
      setParticipationType("solo");
    } else if (participationMode === "team") {
      setParticipationType("team");
    }
    // For "both" mode, don't set initially - let user choose
  }, [participationMode]);

  useEffect(() => {
    if (canRegisterTeam) {
      fetchUserLeaderTeams();
    }
  }, [canRegisterTeam, fetchUserLeaderTeams]);

  const formatDate = (dateString) => {
    if (!dateString) return "Date not available";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      return "Invalid date";
    }
  };

  const getTeamSizeString = (memberCount) => {
    switch (memberCount) {
      case 1:
        return "solo";
      case 2:
        return "duo";
      case 3:
        return "trio";
      case 4:
        return "quad";
      case 5:
        return "five";
      default:
        return "unknown";
    }
  };

  const isTeamEligible = (team) => {
    const teamMemberCount =
      team.currentMemberCount ?? team.members?.length ?? 1;
    const teamSizeString = getTeamSizeString(teamMemberCount);
    return allowedTeamSizes.includes(teamSizeString);
  };

  const handleParticipationTypeChange = (type) => {
    setParticipationType(type);
    setIsEditMode(false); // Reset edit mode when changing participation type
    setRegistrationData((prev) => ({
      ...prev,
      participationType: type,
      teamId: type === "solo" ? null : prev.teamId,
    }));
  };

  const handleTeamSelection = (teamId) => {
    setRegistrationData((prev) => ({ ...prev, teamId }));
  };

  const handleEditToggle = () => {
    setIsEditMode(!isEditMode);
  };

  const validateSoloForm = () => {
    const { fullName, email, enrollmentNo, branch, mobileNo } =
      registrationData;

    if (participationType !== "solo" && participationMode !== "solo") {
      return true;
    }

    if (!fullName?.trim()) {
      showToastNotification("Please enter your full name.");
      return false;
    }

    if (!email?.trim()) {
      showToastNotification("Please enter your email address.");
      return false;
    }

    if (!enrollmentNo?.trim()) {
      showToastNotification("Please enter your enrollment number.");
      return false;
    }

    if (!branch?.trim()) {
      showToastNotification("Please select your branch.");
      return false;
    }

    if (!mobileNo?.trim()) {
      showToastNotification("Please enter your mobile number.");
      return false;
    }

    if (!/^[0-9]{10}$/.test(mobileNo.trim())) {
      showToastNotification("Please enter a valid 10-digit mobile number.");
      return false;
    }

    return true;
  };

  const handleSoloRegister = (e) => {
    e.preventDefault();

    if (!validateSoloForm()) {
      return;
    }

    const apiRegistrationData = {
      participationType: "solo",
      ...registrationData,
    };

    handleRegisterSubmit(e, apiRegistrationData);
  };

  const handleTeamRegister = async (e) => {
    e.preventDefault();

    if (!registrationData.teamId) {
      showToastNotification("Please select a team first.");
      return;
    }

    if (!selectedTeam) {
      showToastNotification("Selected team data not found. Please try again.");
      return;
    }

    if (
      !selectedTeam.members ||
      selectedTeam.members.length !== selectedTeam.currentMemberCount
    ) {
      showToastNotification(
        "Team member data is incomplete. Please try again."
      );
      return;
    }

    const apiRegistrationData = {
      participationType: "team",
      teamId: registrationData.teamId,
    };

    setTeamRegistering(true);
    showToastNotification("Registering team...", "info");

    try {
      const response = await registerForEvent(event._id, apiRegistrationData);

      if (response.success) {
        setRegistrationData((prev) => ({
          ...prev,
          ...apiRegistrationData,
        }));

        showToastNotification(
          `Registration successful! Email sent to all ${selectedTeam.currentMemberCount} team members.`,
          "success"
        );

        if (isPaidEvent) {
          setTimeout(() => {
            onPaymentCompleted && onPaymentCompleted(response);
          }, 1500);
        } else {
          setTimeout(() => {
            onCancel();
          }, 2000);
        }
      }
    } catch (error) {
      console.error("Team registration failed:", error);
      showToastNotification(
        error.message || "Team registration failed. Please try again."
      );
    } finally {
      setTeamRegistering(false);
    }
  };

  if (registrationStep === "form") {
    return (
      <>
        {showToast && (
          <div
            className={`fixed top-4 right-4 z-50 text-white px-4 py-2 rounded-lg shadow-lg ${
              toastMessage.includes("successful") ||
              toastMessage.includes("Registering")
                ? "bg-green-600"
                : "bg-red-600"
            }`}
          >
            {toastMessage}
          </div>
        )}

        <div className="bg-gray-800 rounded-2xl p-6 shadow-2xl backdrop-blur-sm border border-gray-700/50">
          {/* Event Details Section */}
          <div className="mb-6">
            <p className="text-gray-300 mb-2">
              Event Date: {formatDate(event.date || event.eventDate)}
            </p>
            
            {/* Dynamic Fee Display based on participation type */}
            {participationType === "solo" && (
              <p className="text-gray-300 mb-2">
                Solo Registration Fee:{" "}
                {(event.registrationFee || 0) > 0
                  ? `₹${event.registrationFee}`
                  : "Free"}
              </p>
            )}
            
            {participationType === "team" && (
              <p className="text-gray-300 mb-2">
                Team Registration Fee:{" "}
                {(event.teamRegistrationFee || 0) > 0
                  ? `₹${event.teamRegistrationFee}`
                  : "Free"}
              </p>
            )}

            {/* Show both fees if no participation type selected yet */}
            {!participationType && participationMode === "both" && (
              <>
                {canRegisterSolo && (
                  <p className="text-gray-300 mb-1">
                    Solo Fee:{" "}
                    {(event.registrationFee || 0) > 0
                      ? `₹${event.registrationFee}`
                      : "Free"}
                  </p>
                )}
                {canRegisterTeam && (
                  <p className="text-gray-300 mb-2">
                    Team Fee:{" "}
                    {(event.teamRegistrationFee || 0) > 0
                      ? `₹${event.teamRegistrationFee}`
                      : "Free"}
                  </p>
                )}
              </>
            )}

            {event.maxParticipants && (
              <p className="text-gray-300 mb-4">
                Spots remaining:{" "}
                {event.maxParticipants - (event.currentParticipants || 0)}
              </p>
            )}
          </div>

          <h3 className="text-xl font-bold text-white mb-6 text-center">
            Event Registration
          </h3>

          {/* Show participation type selection FIRST for "both" mode */}
          {participationMode === "both" && !participationType && (
            <div className="mb-6">
              <label className="block text-gray-300 text-xs font-medium mb-2">
                Participation Type *
              </label>
              <div className="bg-gray-700/70 p-3 rounded-xl border border-gray-600/50">
                <div className="flex gap-4">
                  {canRegisterSolo && (
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="participationType"
                        value="solo"
                        checked={participationType === "solo"}
                        onChange={(e) =>
                          handleParticipationTypeChange(e.target.value)
                        }
                        className="form-radio text-green-500"
                      />
                      <span className="text-white text-sm">
                        Solo {event.registrationFee > 0 && `(₹${event.registrationFee})`}
                      </span>
                    </label>
                  )}
                  {canRegisterTeam && (
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="participationType"
                        value="team"
                        checked={participationType === "team"}
                        onChange={(e) =>
                          handleParticipationTypeChange(e.target.value)
                        }
                        className="form-radio text-green-500"
                      />
                      <span className="text-white text-sm">
                        Team {event.teamRegistrationFee > 0 && `(₹${event.teamRegistrationFee})`}
                      </span>
                    </label>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Show solo registration details card first (if solo selected) */}
          {(participationType === "solo" || participationMode === "solo") && !isEditMode && (
            <div className="mb-6">
              <h4 className="text-white font-semibold mb-4 text-center">
                Registration Details:
              </h4>
              <div className="bg-gray-700/60 rounded-xl p-4 space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Name:</span>
                  <span className="text-white font-medium">
                    {registrationData.fullName || "Not provided"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Email:</span>
                  <span className="text-white font-medium">
                    {registrationData.email || "Not provided"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Enrollment:</span>
                  <span className="text-white font-medium">
                    {registrationData.enrollmentNo || "Not provided"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Branch:</span>
                  <span className="text-white font-medium">
                    {registrationData.branch || "Not provided"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Mobile:</span>
                  <span className="text-white font-medium">
                    {registrationData.mobileNo || "Not provided"}
                  </span>
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleEditToggle}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm"
                >
                  Edit Details
                </button>
                <button
                  onClick={handleSoloRegister}
                  disabled={isLoading}
                  className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium"
                >
                  {isLoading ? "Registering..." : "Confirm Registration"}
                </button>
              </div>
            </div>
          )}

          {/* Show solo form only when in edit mode or initially */}
          {(participationType === "solo" || participationMode === "solo") && isEditMode && (
            <form onSubmit={handleSoloRegister} className="space-y-4">
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
                  placeholder="Enter your full name"
                  value={registrationData.fullName || ""}
                  onChange={(e) =>
                    setRegistrationData((prev) => ({
                      ...prev,
                      fullName: e.target.value,
                    }))
                  }
                  className="w-full p-3 text-sm rounded-xl bg-gray-700/70 text-white border border-gray-600/50 focus:border-green-400 focus:ring-2 focus:ring-green-400/20 focus:outline-none transition-all duration-300"
                  disabled={isLoading}
                />
              </div>
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
                  placeholder="Enter your email"
                  value={registrationData.email || ""}
                  onChange={(e) =>
                    setRegistrationData((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  className="w-full p-3 text-sm rounded-xl bg-gray-700/70 text-white border border-gray-600/50 focus:border-green-400 focus:ring-2 focus:ring-green-400/20 focus:outline-none transition-all duration-300"
                  disabled={isLoading}
                />
              </div>
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
                  placeholder="Enter enrollment number"
                  value={registrationData.enrollmentNo || ""}
                  onChange={(e) =>
                    setRegistrationData((prev) => ({
                      ...prev,
                      enrollmentNo: e.target.value,
                    }))
                  }
                  className="w-full p-3 text-sm rounded-xl bg-gray-700/70 text-white border border-gray-600/50 focus:border-green-400 focus:ring-2 focus:ring-green-400/20 focus:outline-none transition-all duration-300"
                  disabled={isLoading}
                />
              </div>
              <div>
                <label
                  htmlFor="branch"
                  className="block text-gray-300 text-xs font-medium mb-2"
                >
                  Branch *
                </label>
                <select
                  id="branch"
                  value={registrationData.branch || ""}
                  onChange={(e) =>
                    setRegistrationData((prev) => ({
                      ...prev,
                      branch: e.target.value,
                    }))
                  }
                  className="w-full p-3 text-sm rounded-xl bg-gray-700/70 text-white border border-gray-600/50 focus:border-green-400 focus:ring-2 focus:ring-green-400/20 focus:outline-none transition-all duration-300"
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
                  placeholder="Enter 10-digit mobile number"
                  value={registrationData.mobileNo || ""}
                  onChange={(e) =>
                    setRegistrationData((prev) => ({
                      ...prev,
                      mobileNo: e.target.value,
                    }))
                  }
                  pattern="[0-9]{10}"
                  className="w-full p-3 text-sm rounded-xl bg-gray-700/70 text-white border border-gray-600/50 focus:border-green-400 focus:ring-2 focus:ring-green-400/20 focus:outline-none transition-all duration-300"
                  disabled={isLoading}
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsEditMode(false)}
                  className="flex-1 bg-gray-600/80 hover:bg-gray-700 text-white font-medium py-3 rounded-xl transition-colors"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition-colors"
                  disabled={isLoading}
                >
                  {isLoading
                    ? "Processing..."
                    : isPaidEvent
                    ? "Continue to Payment"
                    : "Register Now"}
                </button>
              </div>
            </form>
          )}

          {/* Show team selection only after team is selected OR if mode is team-only */}
          {(participationType === "team" || participationMode === "team") && (
            <div>
              <label className="block text-gray-300 text-xs font-medium mb-2">
                Select Your Team *
              </label>
              {loadingTeams && (
                <p className="text-gray-300 text-center py-4">
                  Loading your teams...
                </p>
              )}

              {!loadingTeams && userTeams.length > 0 && (
                <div className="space-y-2 mb-6">
                  {userTeams.map((team) => {
                    const isEligible = isTeamEligible(team);
                    const memberCount =
                      team.currentMemberCount ?? team.members?.length ?? 1;

                    return (
                      <div
                        key={team._id}
                        onClick={() =>
                          isEligible && handleTeamSelection(team._id)
                        }
                        className={`border rounded-xl p-4 transition-all ${
                          registrationData.teamId === team._id
                            ? "border-green-500 bg-green-500/10"
                            : isEligible
                            ? "border-gray-600/50 bg-gray-700/70 hover:border-green-400/50 cursor-pointer"
                            : "border-gray-700 bg-gray-800 opacity-50 cursor-not-allowed"
                        }`}
                      >
                        <h4 className="font-medium text-white mb-2">
                          {team.teamName}
                        </h4>
                        <div className="space-y-1 text-xs">
                          <p className="text-gray-400">
                            {memberCount} / {team.teamSize} Members
                          </p>
                        </div>
                        {!isEligible && (
                          <p className="text-xs text-yellow-400 mt-2">
                            Team size not eligible for this event.
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {selectedTeam && (
                <div className="bg-gray-700/50 p-4 rounded-xl border border-gray-600/50 mt-4">
                  <h4 className="text-white font-bold mb-3">
                    Team Registration Summary
                  </h4>
                  <div className="mb-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Team Name:</span>
                      <span className="text-white font-semibold">
                        {selectedTeam.teamName}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Members:</span>
                      <span className="text-white font-semibold">
                        {selectedTeam.currentMemberCount}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Team Fee:</span>
                      <span className="text-green-400 font-bold text-lg">
                        ₹{event.teamRegistrationFee || 0}
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h5 className="text-gray-300 font-medium mb-2 text-sm">
                      Team Members:
                    </h5>
                    <div className="space-y-1">
                      {selectedTeam.members?.map((member, index) => {
                        const memberData = member._doc;
                        if (!memberData) return null;

                        return (
                          <div
                            key={memberData.userId || index}
                            className="flex justify-between items-center text-xs"
                          >
                            <span className="text-gray-400">
                              {memberData.fullName}{" "}
                              {memberData.isLeader && "(Leader)"}
                            </span>
                            <div className="flex items-center gap-1">
                              <span className="px-2 py-1 rounded-full text-green-400 bg-green-400/10">
                                Ready
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="bg-blue-900/20 rounded-lg p-3 mb-4">
                    <p className="text-xs text-blue-100">
                      <strong>Important:</strong> All members of "
                      {selectedTeam.teamName}" will be automatically registered
                      for this event using their verified profile details. Each
                      member will receive individual registration confirmations.
                    </p>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={onCancel}
                      className="flex-1 bg-gray-600/80 hover:bg-gray-700 text-white font-medium py-3 rounded-xl transition-colors"
                      disabled={isLoading}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleTeamRegister}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-50"
                      disabled={isLoading || teamRegistering}
                    >
                      {teamRegistering
                        ? "Registering Team..."
                        : isLoading
                        ? "Processing..."
                        : isPaidEvent
                        ? "Continue with Team"
                        : "Register Entire Team"}
                    </button>
                  </div>
                </div>
              )}

              {!loadingTeams && userTeams.length === 0 && (
                <div className="text-center text-gray-400 p-4 bg-gray-700/50 rounded-xl">
                  You are not a leader of any verified teams.{" "}
                  <Link to="/teams" className="text-green-400 hover:underline">
                    Create a team
                  </Link>{" "}
                  to participate.
                </div>
              )}
            </div>
          )}

          {/* Cancel button for when no participation type is selected */}
          {participationMode === "both" && !participationType && (
            <div className="flex justify-center pt-4">
              <button
                type="button"
                onClick={onCancel}
                className="bg-gray-600/80 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-xl transition-colors"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </>
    );
  }

  // Payment step
  if (registrationStep === "payment" && isPaidEvent) {
    return (
      <div className="bg-gray-800 rounded-2xl p-6 shadow-2xl backdrop-blur-sm border border-gray-700/50">
        <h3 className="text-xl font-bold text-white mb-6 text-center">
          Complete Payment
        </h3>
        <div className="bg-gray-700/60 rounded-xl p-4 mb-6">
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
                {registrationData.participationType === "team"
                  ? `${selectedTeam?.teamName} (${selectedTeam?.currentMemberCount} members)`
                  : registrationData.fullName}
              </span>
            </div>
            <div className="border-t border-gray-600/50 pt-3 mt-3">
              <div className="flex justify-between items-center py-1">
                <span className="text-gray-300 text-sm">Registration Fee:</span>
                <span className="text-green-400 font-bold text-xl">
                  ₹{applicableFee}
                </span>
              </div>
              {registrationData.participationType === "team" && (
                <p className="text-gray-400 text-xs mt-1">
                  Team registration fee for {selectedTeam?.currentMemberCount} members
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="bg-blue-900/30 rounded-xl p-4 mb-6">
          <p className="text-blue-100 text-xs">
            Please complete payment using the form link below and click "I've
            Completed Payment" to notify the admin for approval.
          </p>
        </div>
        <div className="mb-6">
          <a
            href={event.paymentFormLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center transition-colors"
          >
            Open Payment Form
          </a>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-600/80 hover:bg-gray-700 text-white font-medium py-3 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onPaymentCompleted}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl transition-colors"
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
            <div className="w-16 h-16 mx-auto mb-4 bg-green-400/10 rounded-full flex items-center justify-center">
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
            <p className="text-gray-300 text-sm">
              {isPaidEvent
                ? `Your ${
                    registrationData.participationType === "team"
                      ? "team"
                      : "solo"
                  } registration is submitted and pending payment approval.`
                : `You have been successfully registered for the event ${
                    registrationData.participationType === "team"
                      ? "as a team"
                      : "individually"
                  }.`}
            </p>
          </div>
        </div>
        <div className="bg-gray-700/60 rounded-xl p-4 mb-6">
          <h4 className="text-base font-semibold text-green-400 mb-3">
            Registration Summary
          </h4>
          <div className="space-y-2 text-xs text-left">
            <div className="flex justify-between">
              <span className="text-gray-400">Event:</span>
              <span className="text-white font-medium">{event?.title}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Participant:</span>
              <span className="text-white font-medium">
                {registrationData.participationType === "team"
                  ? `${selectedTeam?.teamName} (${selectedTeam?.currentMemberCount} members)`
                  : registrationData.fullName}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Fee Paid:</span>
              <span className="text-green-400 font-bold">
                ₹{applicableFee}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Status:</span>
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
          </div>
        </div>
        {isPaidEvent && (
          <div className="bg-blue-900/30 rounded-xl p-4 mb-6">
            <p className="text-blue-100 text-xs">
              <strong>Next Steps:</strong> Please complete the payment if you
              haven't. An admin will review and approve your registration.
            </p>
          </div>
        )}
        {registrationData.participationType === "team" && (
          <div className="bg-green-900/20 rounded-xl p-4 mb-6">
            <p className="text-green-100 text-xs">
              <strong>Team Registration:</strong> All{" "}
              {selectedTeam?.currentMemberCount} team members have been
              registered automatically. Each member will receive individual
              confirmation emails.
            </p>
          </div>
        )}
        <button
          type="button"
          onClick={onCancel}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition-colors"
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

  const getActualEventStatus = (event) => {
    if (!event || !event.date) return "upcoming";

    const currentDate = new Date();
    const eventDate = new Date(event.date);

    if (event.eventStatus === "cancelled") {
      return "cancelled";
    }

    if (eventDate < currentDate) {
      return "completed";
    }

    return "upcoming";
  };

  const getStatusColor = (event) => {
    const actualStatus = getActualEventStatus(event);
    switch (actualStatus) {
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

  const getStatusDot = (event) => {
    const actualStatus = getActualEventStatus(event);
    switch (actualStatus) {
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
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
    }
  };

  const handleViewAllEvents = () => {
    navigate("/events");

    const attemptScroll = (attempts = 0) => {
      if (attempts >= 10) return;

      const eventTabsSection = document.querySelector(".event-tabs-section");

      if (eventTabsSection) {
        const offsetTop = eventTabsSection.offsetTop - 100;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
        return;
      }

      setTimeout(() => attemptScroll(attempts + 1), 200);
    };

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
          <p className="text-gray-400 text-lg">
            Exciting events coming soon 🚀
          </p>
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
              {/* Timeline dot - now using time-aware status */}
              <div
                className={`absolute left-2 w-4 h-4 rounded-full border-2 border-gray-900 ${getStatusDot(
                  event
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
                      event
                    )}`}
                  >
                    {getActualEventStatus(event).toUpperCase()}
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
          <p className="text-gray-300 text-lg">
            Exciting events coming soon 🚀
          </p>
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
