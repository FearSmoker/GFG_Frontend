import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchEvents, addEvent, deleteEvent } from "../api/Events_api.js";
import {
  EventCalendar,
  EventCarousel,
  EventForm,
} from "../components/EventComponents.jsx";

const Events = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    imageFile: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [eventDates, setEventDates] = useState([]);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState("");
  const [onPasswordSuccess, setOnPasswordSuccess] = useState(() => () => {});

  const correctPassword = "admin123";

  useEffect(() => {
    async function loadEvents() {
      const backendEvents = await fetchEvents();
      const formattedEvents = backendEvents.map((e) => ({
        id: e._id || e.id,
        title: e.title,
        description: e.description,
        image: e.image,
        date: new Date(e.date).toDateString(),
      }));
      setEvents(formattedEvents);
      const uniqueDates = [
        ...new Set(formattedEvents.map((event) => event.date)),
      ];
      setEventDates(uniqueDates);
    }
    loadEvents();
  }, []);

  const handleDateChange = (date) => setSelectedDate(date);

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

  const handleAddEvent = async () => {
    if (isLoading) return;

    if (!newEvent.title || !newEvent.description || !newEvent.imageFile) {
      alert("Please fill all fields and select an image.");
      return;
    }

    triggerPasswordModal(async () => {
      setIsLoading(true);
      try {
        const formData = new FormData();
        formData.append("title", newEvent.title);
        formData.append("description", newEvent.description);
        formData.append("date", selectedDate.toISOString());
        formData.append("image", newEvent.imageFile);

        const savedEvent = await addEvent(formData);

        if (savedEvent) {
          const formattedNewEvent = {
            id: savedEvent._id || savedEvent.id,
            title: savedEvent.title,
            description: savedEvent.description,
            image: savedEvent.image,
            date: new Date(savedEvent.date).toDateString(),
          };

          setEvents((prev) => {
            if (prev.find((e) => e.id === formattedNewEvent.id)) return prev;
            return [...prev, formattedNewEvent];
          });

          setEventDates((prev) => {
            if (!prev.includes(formattedNewEvent.date)) {
              return [...prev, formattedNewEvent.date];
            }
            return prev;
          });

          setNewEvent({ title: "", description: "", imageFile: null });
          setShowSuccess(true);

          setTimeout(() => setShowSuccess(false), 3000);
        }
      } catch (error) {
        console.error("Error adding event:", error);
        alert("Failed to add event. Please try again.");
      } finally {
        setIsLoading(false);
      }
    });
  };

  const handleDeleteButtonClick = () => {
    triggerPasswordModal(() => {
      navigate("/delete-events");
    });
  };

  const handleDeleteEvent = async (id) => {
    const result = await deleteEvent(id);
    if (result) {
      const deletedEvent = events.find((event) => event.id === id);
      setEvents((prev) => {
        const filtered = prev.filter((event) => event.id !== id);
        const sameDay = filtered.some((e) => e.date === deletedEvent.date);
        if (!sameDay) {
          setEventDates((prev) =>
            prev.filter((date) => date !== deletedEvent.date)
          );
        }
        return filtered;
      });
    }
  };

  return (
    <div className="bg-black min-h-screen text-white p-8 flex flex-col items-center relative">
      {/* Loading Popup */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mb-4"></div>
            <p className="text-lg font-semibold">Adding your event...</p>
          </div>
        </div>
      )}

      {/* Success Popup */}
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-black p-4 rounded-lg shadow-lg z-50 animate-bounce">
          <div className="flex items-center">
            <svg
              className="w-6 h-6 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            <p className="font-semibold">Event added successfully!</p>
          </div>
        </div>
      )}

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

      {/* Heading */}
      <h2 className="text-white text-4xl font-bold mb-8 relative">
        EVENTS
        <span className="block w-full h-1 bg-white absolute left-0 bottom-[-10px]"></span>
      </h2>

      {/* Carousel */}
      <div className="w-full max-w-3xl mb-16">
        <EventCarousel
          events={events}
          isLoading={false}
          className="event-carousel-large"
        />
      </div>

      {/* Calendar + Form */}
      <div className="flex flex-col md:flex-row gap-8 items-start w-full max-w-5xl">
        <div>
          <EventCalendar
            selectedDate={selectedDate}
            handleDateChange={handleDateChange}
            eventDates={eventDates}
          />
        </div>

        <div className="flex-1 mt-0">
          <EventForm
            newEvent={newEvent}
            setNewEvent={setNewEvent}
            handleAddEvent={handleAddEvent}
            isLoading={isLoading}
          />
        </div>
      </div>

      {/* Delete Events Button */}
      <button
        onClick={handleDeleteButtonClick}
        className="absolute top-8 right-8 bg-red-600 hover:bg-red-700 px-5 py-2 rounded-md text-white font-bold z-30"
      >
        Delete Events
      </button>
    </div>
  );
};

export default Events;
