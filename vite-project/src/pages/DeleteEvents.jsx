import React, { useEffect, useState } from "react";
import { fetchEvents, deleteEvent } from "../api/Events_api.js";
import { useNavigate } from "react-router-dom";
import EventsBg1Component from "../components/EventBgComponent.jsx";
import EventsBg1DarkComponent from "../components/EventBgDarkComponent.jsx";
import useTheme from "../context/ThemeContext.jsx";
import "../css/EventBg.css";
import "../css/EventBgDark.css";

const DeleteEvents = () => {
  const [events, setEvents] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const { themeMode } = useTheme();

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        const allEvents = await fetchEvents();
        const formatted = allEvents.map((e) => ({
          id: e._id || e.id,
          title: e.title,
          date: new Date(e.date).toDateString(),
        }));
        setEvents(formatted);
      } catch (error) {
        console.error("Error loading events:", error);
        alert("Failed to load events. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(events.length / eventsPerPage);

  const calculateOverlayHeight = () => {
    const baseHeight = 160;
    const eventItemHeight = 80; 
    const paginationHeight = totalPages > 1 ? 80 : 0; 
    const deleteButtonHeight = 60;
    const marginBuffer = 100;
    
    const currentEventsHeight = currentEvents.length * eventItemHeight;
    
    return baseHeight + currentEventsHeight + paginationHeight + deleteButtonHeight + marginBuffer;
  };

  const overlayHeight = calculateOverlayHeight();

  const handleCheckboxChange = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = async () => {
    if (selectedIds.length === 0) {
      alert("Please select at least one event to delete.");
      return;
    }

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${selectedIds.length} event(s)? This action cannot be undone.`
    );

    if (!confirmDelete) return;

    try {
      for (const id of selectedIds) {
        await deleteEvent(id);
      }

      const updated = events.filter(e => !selectedIds.includes(e.id));
      setEvents(updated);
      setSelectedIds([]);
      
      const newTotalPages = Math.ceil(updated.length / eventsPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      } else if (newTotalPages === 0) {
        setCurrentPage(1);
      }
      
      setSuccessMessage("Selected events deleted successfully.");
    } catch (error) {
      console.error("Error deleting events:", error);
      alert("Failed to delete some events. Please try again.");
    }
  };

  const handleBackToEvents = () => {
    navigate("/events");
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const BackgroundComponent = themeMode === "dark" ? EventsBg1DarkComponent : EventsBg1Component;

  if (loading) {
    return (
      <BackgroundComponent 
        className="text-white overflow-hidden flex items-center justify-center"
        overlayHeight={800}
      >
        <div className="text-xl">Loading events...</div>
      </BackgroundComponent>
    );
  }

  return (
    <BackgroundComponent 
      className="text-white overflow-hidden"
      overlayHeight={overlayHeight}
    >
      {/* Success Message  */}
      {successMessage && (
        <div className="fixed top-28 right-6 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-pulse">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            {successMessage}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-8 flex flex-col items-center mt-8">
        {/* Back Button */}
        <button
          onClick={handleBackToEvents}
          className="absolute top-32 left-8 bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-md text-white font-bold z-30 flex items-center gap-2 transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            ></path>
          </svg>
          Back to Events
        </button>

        {/* Heading */}
        <div
          style={{
            marginTop: "5rem",
            marginBottom: "3rem",
            userSelect: "none",
          }}
        >
          <span
            style={{
              color: "#0E86D2",
              fontSize: "48px",
              fontFamily: "Cabin, sans-serif",
              fontWeight: 700,
              wordWrap: "break-word",
            }}
          >
            &lt;
          </span>
          <span
            style={{
              color: "#00FFAF",
              fontSize: "48px",
              fontFamily: "Cabin, sans-serif",
              fontWeight: 700,
              wordWrap: "break-word",
            }}
          >
            Delete Events
          </span>
          <span
            style={{
              color: "#0E86D2",
              fontSize: "48px",
              fontFamily: "Cabin, sans-serif",
              fontWeight: 700,
              wordWrap: "break-word",
            }}
          >
            &gt;
          </span>
        </div>

        {/* Events List */}
        <div className="w-full max-w-4xl mb-48">
          {events.length === 0 ? (
            <div className="text-center text-gray-400 text-xl">
              No events found to delete.
            </div>
          ) : (
            <>
              <div className="grid gap-4 mb-6">
                {currentEvents.map((event) => (
                  <label
                    key={event.id}
                    className="flex items-center gap-4 bg-gray-800 bg-opacity-70 p-4 rounded shadow hover:bg-gray-700 hover:bg-opacity-70 transition cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(event.id)}
                      onChange={() => handleCheckboxChange(event.id)}
                      className="w-5 h-5 cursor-pointer"
                    />
                    <span className="font-medium flex-grow">{event.title}</span>
                    <span className="text-sm text-gray-400">({event.date})</span>
                  </label>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mb-6">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-2 bg-gray-700 rounded disabled:opacity-50 hover:bg-gray-600 transition-colors disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => paginate(index + 1)}
                      className={`px-3 py-2 rounded transition-colors ${
                        currentPage === index + 1
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 bg-gray-700 rounded disabled:opacity-50 hover:bg-gray-600 transition-colors disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              )}

              <div className="text-center">
                <button
                  onClick={handleDeleteSelected}
                  disabled={selectedIds.length === 0}
                  className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-md text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Delete Selected Events ({selectedIds.length})
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="flex justify-center items-start px-8 pb-20 -mt-24">
        <div className="max-w-2xl text-center">
          <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg">
            <h3 className="text-xl font-bold mb-3 text-green-400">Instructions</h3>
            <ul className="text-left space-y-1 text-gray-300">
              <li>• Select the events you want to delete by checking the boxes</li>
              <li>• You can select multiple events at once for bulk deletion</li>
              <li>• Use pagination to navigate through multiple pages of events</li>
              <li>• Review your selection carefully before proceeding</li>
              <li>• Click "Delete Selected Events" to permanently remove them</li>
              <li>• This action cannot be undone, so make sure you're certain</li>
            </ul>
          </div>
        </div>
      </div>
    </BackgroundComponent>
  );
};

export default DeleteEvents;