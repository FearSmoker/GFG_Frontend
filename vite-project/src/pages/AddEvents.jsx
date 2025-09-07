import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { addEvent } from "../api/Events_api.js";
import { EventForm } from "../components/EventComponents.jsx";
import EventsBg1Component from "../components/EventBgComponent.jsx";
import EventsBg1DarkComponent from "../components/EventBgDarkComponent.jsx";
import useAuth from "../context/AuthContext.jsx";
import useTheme from "../context/ThemeContext.jsx";
import "../css/EventBg.css";
import "../css/EventBgDark.css";

const AddEvents = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const { themeMode } = useTheme();
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    imageFile: null,
    eventType: "Competition",
    eventPrize: "Certificates",
    registrationFee: 0,
    maxParticipants: null,
    registrationDeadline: null,
    eventStatus: "upcoming",
    paymentFormLink: "",
  });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [initialAuthCheck, setInitialAuthCheck] = useState(false);

  const isAdmin = user?.type === "admin";

  const overlayHeight = 1500;

  useEffect(() => {
    if (!authLoading && !initialAuthCheck) {
      setInitialAuthCheck(true);

      if (!isAuthenticated || !isAdmin) {
        toast.error("Access denied. Admin privileges required.");
        navigate("/");
      }
    }
  }, [isAuthenticated, authLoading, isAdmin, navigate, initialAuthCheck]);

  const handleAddEvent = async () => {
    if (isLoading) return;

    if (
      !newEvent.title ||
      !newEvent.description ||
      !newEvent.imageFile ||
      !newEvent.eventType
    ) {
      toast.error(
        "Please fill all required fields: Title, Description, Event Type, and Image."
      );
      return;
    }

    if (parseFloat(newEvent.registrationFee) > 0 && !newEvent.paymentFormLink) {
      toast.error("Payment form link is required for paid events.");
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", newEvent.title);
      formData.append("description", newEvent.description);
      formData.append("date", selectedDate.toISOString());
      formData.append("image", newEvent.imageFile);

      formData.append("eventType", newEvent.eventType);
      formData.append("eventPrize", newEvent.eventPrize);
      formData.append("registrationFee", newEvent.registrationFee.toString());
      formData.append("eventStatus", newEvent.eventStatus);

      if (
        parseFloat(newEvent.registrationFee) > 0 &&
        newEvent.paymentFormLink
      ) {
        formData.append("paymentFormLink", newEvent.paymentFormLink);
      }

      if (
        newEvent.maxParticipants !== null &&
        newEvent.maxParticipants !== ""
      ) {
        formData.append("maxParticipants", newEvent.maxParticipants.toString());
      }

      if (newEvent.registrationDeadline) {
        formData.append(
          "registrationDeadline",
          new Date(newEvent.registrationDeadline).toISOString()
        );
      }

      const savedEvent = await addEvent(formData);

      if (savedEvent) {
        setNewEvent({
          title: "",
          description: "",
          imageFile: null,
          eventType: "Competition",
          eventPrize: "Certificates",
          registrationFee: 0,
          maxParticipants: null,
          registrationDeadline: null,
          eventStatus: "upcoming",
          paymentFormLink: "",
        });
        setSelectedDate(new Date());
        setShowSuccess(true);

        setTimeout(() => {
          setShowSuccess(false);
          navigate("/events");
        }, 2000);
      }
    } catch (error) {
      console.error("Error adding event:", error);
      toast.error("Failed to add event. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToEvents = () => {
    navigate("/events");
  };

  const BackgroundComponent =
    themeMode === "dark" ? EventsBg1DarkComponent : EventsBg1Component;

  if (authLoading) {
    return (
      <BackgroundComponent
        className="text-white overflow-hidden flex items-center justify-center"
        overlayHeight={800}
      >
        <div className="text-xl">Loading...</div>
      </BackgroundComponent>
    );
  }

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  return (
    <BackgroundComponent
      className="text-white overflow-hidden"
      overlayHeight={overlayHeight}
    >
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
        <div className="fixed top-28 right-4 bg-green-500 text-black p-4 rounded-lg shadow-lg z-50 animate-bounce">
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
            <p className="font-semibold">
              Event added successfully! Redirecting...
            </p>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-8 flex flex-col items-center">
        {/* Back Button */}
        <button
          onClick={handleBackToEvents}
          className="absolute top-32 left-8 bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-md text-white font-bold z-30 flex items-center gap-2"
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
            className={
              themeMode === "light" ? "text-[#2195DE]" : "text-[#0065A5]"
            }
            style={{
              fontSize: "48px",
              fontFamily: "Cabin, sans-serif",
              fontWeight: 700,
              wordWrap: "break-word",
            }}
          >
            &lt;
          </span>

          <span
            className={
              themeMode === "light" ? "text-[#0A7956]" : "text-[#00FFAF]"
            }
            style={{
              fontSize: "48px",
              fontFamily: "Cabin, sans-serif",
              fontWeight: 700,
              wordWrap: "break-word",
            }}
          >
            Add New Event
          </span>
          <span
            className={
              themeMode === "light" ? "text-[#2195DE]" : "text-[#0065A5]"
            }
            style={{
              fontSize: "48px",
              fontFamily: "Cabin, sans-serif",
              fontWeight: 700,
              wordWrap: "break-word",
            }}
          >
            &gt;
          </span>
        </div>

        {/* Form Section */}
        <div className="flex justify-center w-full max-w-4xl mb-40">
          <div className="w-full max-w-2xl">
            <EventForm
              newEvent={newEvent}
              setNewEvent={setNewEvent}
              handleAddEvent={handleAddEvent}
              isLoading={isLoading}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="flex justify-center px-8 pb-24 -mt-16">
        <div className="max-w-4xl text-center">
          <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4 text-green-400">
              Instructions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div>
                <h4 className="font-semibold text-white mb-2">
                  Required Fields:
                </h4>
                <ul className="space-y-1 text-gray-300 text-sm">
                  <li>• Event Title</li>
                  <li>• Event Description</li>
                  <li>• Event Type (Competition/Workshop/Seminar)</li>
                  <li>• Event Date</li>
                  <li>• Event Image</li>
                  <li>• Payment Form Link (for paid events)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">
                  Optional Fields:
                </h4>
                <ul className="space-y-1 text-gray-300 text-sm">
                  <li>• Event Prize (default: Certificates)</li>
                  <li>• Registration Fee (default: Free)</li>
                  <li>• Max Participants</li>
                  <li>• Registration Deadline</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-400">
              <p>
                Make sure to select the correct event type for proper
                categorization in the events page.
              </p>
              <p className="mt-1 text-yellow-400">
                <strong>Note:</strong> For paid events, provide a Google Form
                link containing QR code for payment and proof submission.
              </p>
            </div>
          </div>
        </div>
      </div>
    </BackgroundComponent>
  );
};

export default AddEvents;
