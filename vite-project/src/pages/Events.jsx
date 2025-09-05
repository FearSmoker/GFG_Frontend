import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchEvents } from "../api/Events_api.js";
import {
  EventCalendar,
  EventCarousel,
  EventMiniCard,
} from "../components/EventComponents.jsx";
import EventsBg1Component from "../components/EventBgComponent.jsx";
import EventsBg1DarkComponent from "../components/EventBgDarkComponent.jsx";
import useAuth from "../context/AuthContext.jsx";
import useTheme from "../context/ThemeContext.jsx";
import "../css/EventBg.css";
import "../css/EventBgDark.css";
import EventTabs from "../components/EventTab.jsx";

const Events = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { themeMode } = useTheme();
  const isLightTheme = themeMode === "light";
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEventType, setSelectedEventType] = useState("All");
  const [eventDates, setEventDates] = useState([]);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState("");
  const [onPasswordSuccess, setOnPasswordSuccess] = useState(() => () => {});

  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 24;
  const eventsPerRow = 4;

  const correctPassword = "admin123";

  const isAdmin = user?.type === "admin";

  const overlayHeight = 890;

  useEffect(() => {
    async function loadEvents() {
      try {
        setLoading(true);
        const backendEvents = await fetchEvents();
        const formattedEvents = backendEvents.map((e) => ({
          id: e._id || e.id,
          title: e.title,
          description: e.description,
          image: e.image,
          date: new Date(e.date).toDateString(),
          eventType: e.eventType,
          eventPrize: e.eventPrize,
          registrationFee: e.registrationFee,
          maxParticipants: e.maxParticipants,
          currentParticipants: e.currentParticipants,
          registrationDeadline: e.registrationDeadline,
          eventStatus: e.eventStatus,
          _id: e._id,
        }));
        setEvents(formattedEvents);
        const uniqueDates = [
          ...new Set(formattedEvents.map((event) => event.date)),
        ];
        setEventDates(uniqueDates);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    }
    loadEvents();
  }, []);

  const handleDateChange = (date) => setSelectedDate(date);

  const filteredEvents =
    selectedEventType === "All"
      ? events
      : events.filter((event) => {
          if (!event.eventType || event.eventType.trim() === "") {
            return false;
          }

          const eventType = event.eventType.trim();
          const selectedType = selectedEventType;

          switch (selectedType) {
            case "Competitions":
              return eventType === "Competition";
            case "Workshops":
              return eventType === "Workshop";
            case "Seminars":
              return eventType === "Seminar";
            default:
              return eventType === selectedType;
          }
        });

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedEventType]);

  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const startIndex = (currentPage - 1) * eventsPerPage;
  const endIndex = startIndex + eventsPerPage;
  const currentEvents = filteredEvents.slice(startIndex, endIndex);

  const calculateBottomMargin = () => {
    const numberOfEvents = currentEvents.length;
    const numberOfRows = Math.ceil(numberOfEvents / eventsPerRow);

    const baseMargin = 64;
    const isIncompleteRow = numberOfEvents % eventsPerRow !== 0;
    const additionalMargin = isIncompleteRow ? 32 : 0;

    const rowSpacing = numberOfRows > 1 ? (numberOfRows - 1) * 16 : 0;

    return baseMargin + additionalMargin + rowSpacing;
  };

  const triggerPasswordModal = (callback) => {
    setOnPasswordSuccess(() => callback);
    setShowPasswordModal(true);
    setPassword("");
  };

  const confirmPassword = () => {
    if (password === correctPassword) {
      setShowPasswordModal(false);
      onPasswordSuccess();
    } else {
      alert("Incorrect password.");
    }
  };

  const handleDeleteButtonClick = () => {
    triggerPasswordModal(() => {
      navigate("/delete-events");
    });
  };

  const handleAddEventButtonClick = () => {
    triggerPasswordModal(() => {
      navigate("/add-events");
    });
  };

  const handlePaymentApprovalsButtonClick = () => {
    triggerPasswordModal(() => {
      navigate("/admin/registrations");
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    document.querySelector(".event-tabs-section")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const BackgroundComponent =
    themeMode === "dark" ? EventsBg1DarkComponent : EventsBg1Component;


    
  if (loading) {
    return (
      <BackgroundComponent
        className="text-white overflow-hidden"
        overlayHeight={overlayHeight}
      >
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-white text-xl">Loading events...</div>
        </div>
      </BackgroundComponent>
    );
  }
  
  return (
    <BackgroundComponent
      className="text-white overflow-hidden "
      overlayHeight={overlayHeight}
    >
      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-center max-w-sm w-full">
            <h3 className="text-xl font-bold mb-4">Enter Password</h3>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded-md mb-4 bg-gray-800 text-white border border-gray-700 focus:outline-none"
              placeholder="Password"
            />
            <div className="flex justify-between">
              <button
                onClick={confirmPassword}
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md font-bold"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md font-bold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-8 flex flex-col items-center">
        {/* Heading */}
        <h1
          style={{
            marginTop: "5rem",
            marginBottom: "2rem",
            userSelect: "none",
            fontFamily: "Cabin, sans-serif",
          }}
          className="text-center text-4xl md:text-[3rem] mb-4"
        >
          <span
            className={`${isLightTheme ? "text-[#2195DE]" : "text-[#0065A5]"}`}
          >
            &lt;{" "}
          </span>
          <span
            className={`${isLightTheme ? "text-[#0A7956]" : "text-[#00FFAF]"} text-3xl sm:text-5xl`}
          >
            {" "}
            Upcoming Events{" "}
          </span>
          <span
            className={`${isLightTheme ? "text-[#2195DE]" : "text-[#0065A5]"}`}
          >
            &gt;
          </span>
        </h1>

        {/* Carousel and Calendar Section */}
        <div className="flex flex-col lg:flex-row gap-12 items-center justify-center w-full max-w-7xl mb-12">
          {/* Carousel - Left Side */}
          <div className="w-full lg:w-2/3 flex justify-center">
            <div className="w-full max-w-4xl">
              <EventCarousel
                events={events}
                isLoading={false}
                className="event-carousel-large w-full"
              />
            </div>
          </div>

          {/* Calendar - Right Side */}
          <div className="w-full lg:w-1/3 flex flex-col justify-center lg:justify-end lg:pl-8">
            {/* Admin Action Buttons - Above Calendar */}
            {isAdmin && (
              <div className="flex flex-col gap-3 mb-6 w-full max-w-sm">
                {/* Manage Events Button - Full Width */}
                <button
                  onClick={handlePaymentApprovalsButtonClick}
                  className="bg-sky-600 hover:bg-sky-700 px-4 py-3 rounded-md text-white font-bold w-full"
                >
                  Payment Approvals
                </button>

                {/* Delete and Add Events Buttons Row */}
                <div className="flex gap-3">
                  <button
                    onClick={handleDeleteButtonClick}
                    className="bg-red-600 hover:bg-red-700 px-4 py-3 rounded-md text-white font-bold flex-1"
                  >
                    Delete Events
                  </button>
                  <button
                    onClick={handleAddEventButtonClick}
                    className="bg-green-600 hover:bg-green-700 px-4 py-3 rounded-md text-white font-bold flex-1"
                  >
                    Add Event
                  </button>
                </div>
              </div>
            )}

            <div className="w-full max-w-sm">
              <EventCalendar
                selectedDate={selectedDate}
                handleDateChange={handleDateChange}
                eventDates={eventDates}
              />
            </div>
          </div>
        </div>

        {/* Event Tabs - Moved down a bit */}
        <div className="mb-12  mt-6 event-tabs-section">
          <EventTabs 
            selectedEventType={selectedEventType}
            onEventTypeChange={setSelectedEventType}
          />
        </div>

        {/* Pagination Info */}
        {filteredEvents.length > 0 && (
          <div className="mb-6 text-center">
            <span className="text-gray-300 text-sm">
              Showing {startIndex + 1}-
              {Math.min(endIndex, filteredEvents.length)} of{" "}
              {filteredEvents.length} events
            </span>
          </div>
        )}

        {/* Event Mini Cards Section with Dynamic Bottom Margin */}
        <div
          className="w-full max-w-7xl"
          style={{ marginBottom: `${calculateBottomMargin()}px` }}
        >
          <EventMiniCard
            events={currentEvents}
            isLoading={false}
            title=""
            enableImageClick={true}
            className="event-mini-cards-container"
            eventsPerRow={eventsPerRow}
          />
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mb-16">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                currentPage === 1
                  ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              Previous
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              const showPage =
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 2 && page <= currentPage + 2);

              if (!showPage) {
                if (page === currentPage - 3 || page === currentPage + 3) {
                  return (
                    <span key={page} className="px-2 py-2 text-gray-400">
                      ...
                    </span>
                  );
                }
                return null;
              }

              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 rounded-md font-medium transition-colors ${
                    currentPage === page
                      ? "bg-green-600 text-white"
                      : "bg-gray-700 hover:bg-gray-600 text-white"
                  }`}
                >
                  {page}
                </button>
              );
            })}

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                currentPage === totalPages
                  ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </BackgroundComponent>
  );
};

export default Events;
