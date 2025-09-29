import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchEventById } from "../api/Events_api";
import {
  registerForEvent,
  getUserRegistrations,
} from "../api/Registration_api.js";
import { RegisterForm } from "../components/EventComponents.jsx";
import useAuth from "../context/AuthContext.jsx";
import OtherPage1 from "../components/OtherPage1.jsx";
import toast from "react-hot-toast";
import "../css/OtherPage1.css";

const EventDetails = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [registrationData, setRegistrationData] = useState({});
  const [isAlreadyRegistered, setIsAlreadyRegistered] = useState(false);
  const [checkingRegistration, setCheckingRegistration] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState(null);

  const [registrationStep, setRegistrationStep] = useState("form");
  const [registrationId, setRegistrationId] = useState(null);

  useEffect(() => {
    if (user) {
      setRegistrationData({
        fullName: user.fullName || user.name || "",
        email: user.email || "",
        enrollmentNo: user.enrollmentNo || user.enrollment || "",
        branch: user.branch || "",
        mobileNo: user.mobileNo || user.phone || user.phoneNumber || "",
      });
    }
  }, [user]);

  const checkRegistrationStatus = useCallback(async () => {
    if (!user || !eventId) return;

    setCheckingRegistration(true);
    try {
      const response = await getUserRegistrations();

      const userRegistrations =
        response.data?.registrations ||
        response.registrations ||
        response.data ||
        response ||
        [];

      if (!Array.isArray(userRegistrations)) {
        console.error("Registrations is not an array:", userRegistrations);
        return;
      }

      const matchingRegistration = userRegistrations.find((reg) => {
        let regEventId;
        if (reg.eventId) {
          if (typeof reg.eventId === "object" && reg.eventId._id) {
            regEventId = reg.eventId._id;
          } else if (typeof reg.eventId === "object" && reg.eventId.id) {
            regEventId = reg.eventId.id;
          } else if (typeof reg.eventId === "string") {
            regEventId = reg.eventId;
          }
        } else if (reg.event) {
          if (typeof reg.event === "object" && reg.event._id) {
            regEventId = reg.event._id;
          } else if (typeof reg.event === "object" && reg.event.id) {
            regEventId = reg.event.id;
          } else if (typeof reg.event === "string") {
            regEventId = reg.event;
          }
        }

        const isNotCancelled =
          !reg.attendanceStatus || reg.attendanceStatus !== "cancelled";

        const idsMatch =
          regEventId &&
          (regEventId.toString() === eventId.toString() ||
            regEventId === eventId);

        return idsMatch && isNotCancelled;
      });

      if (matchingRegistration) {
        setIsAlreadyRegistered(true);
        setRegistrationStatus(
          matchingRegistration.approvalStatus ||
            matchingRegistration.status ||
            "pending"
        );
      } else {
        setIsAlreadyRegistered(false);
        setRegistrationStatus(null);
      }
    } catch (error) {
      console.error("Error checking registration status:", error);
    } finally {
      setCheckingRegistration(false);
    }
  }, [user, eventId]);

  const fetchEventDetails = useCallback(async () => {
    if (!eventId) {
      toast.error("No event ID provided");
      setLoading(false);
      return;
    }

    try {
      const response = await fetchEventById(eventId);
      const eventData = response?.data || response;

      if (eventData && (eventData._id || eventData.id)) {
        setEvent(eventData);
      } else {
        toast.error("Event not found");
        setEvent(null);
      }
    } catch (error) {
      console.error("Error fetching event:", error);
      toast.error(error.message || "Failed to fetch event details");
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

  const getSeatStatus = () => {
    if (!event || !event.maxParticipants) return "available";

    const currentParticipants = event.currentParticipants || 0;
    const maxParticipants = event.maxParticipants;

    return currentParticipants >= maxParticipants ? "full" : "available";
  };

  const getStatusTagStyle = (status, type) => {
    if (type === "event") {
      switch (status) {
        case "upcoming":
          return "bg-green-600 text-white";
        case "completed":
          return "bg-gray-600 text-white";
        case "cancelled":
          return "bg-red-600 text-white";
        default:
          return "bg-blue-600 text-white";
      }
    } else if (type === "seat") {
      switch (status) {
        case "available":
          return "bg-blue-600 text-white";
        case "full":
          return "bg-orange-600 text-white";
        default:
          return "bg-gray-600 text-white";
      }
    }
  };

  const handleRegisterClick = () => {
    if (!user) {
      toast.error("Please login to register for events");
      navigate("/signin");
      return;
    }

    if (!eventId) {
      toast.error("Invalid event ID");
      return;
    }

    if (isAlreadyRegistered) {
      toast.info("You are already registered for this event");
      return;
    }

    if (!isRegistrationOpen()) {
      toast.error("Registration is closed for this event");
      return;
    }

    if (isFull()) {
      toast.error("This event is full");
      return;
    }

    // Directly open the register form
    setShowRegisterForm(true);
    setRegistrationStep("form");
  };

  const handleRegistrationSubmit = async (e, apiRegistrationData = null) => {
    e.preventDefault();

    if (!eventId) {
      toast.error("Invalid event ID");
      return;
    }

    // Use provided API data or fall back to solo registration data
    const dataToSubmit = apiRegistrationData || {
      participationType: "solo",
      fullName: registrationData.fullName,
      email: registrationData.email,
      enrollmentNo: registrationData.enrollmentNo,
      branch: registrationData.branch,
      mobileNo: registrationData.mobileNo,
    };

    setRegistering(true);
    try {
      const result = await registerForEvent(eventId, dataToSubmit);

      let extractedRegistrationId = null;
      if (result.registration && result.registration._id) {
        extractedRegistrationId = result.registration._id;
      } else if (result.data && result.data._id) {
        extractedRegistrationId = result.data._id;
      } else if (result._id) {
        extractedRegistrationId = result._id;
      } else if (result.data?.registrationId) {
        extractedRegistrationId = result.data.registrationId;
      } else if (result.registrationId) {
        extractedRegistrationId = result.registrationId;
      }

      setRegistrationId(extractedRegistrationId);

      const isPaidEvent = parseFloat(event.registrationFee || 0) > 0;

      if (isPaidEvent) {
        setRegistrationStep("payment");
        toast.success(
          `Registration submitted! Please complete the payment process.`
        );
      } else {
        setRegistrationStep("success");
        toast.success(
          `Successfully registered for the event! Registration ID: ${extractedRegistrationId}`
        );
        setIsAlreadyRegistered(true);
        setRegistrationStatus("approved");
        await fetchEventDetails();
      }
    } catch (error) {
      console.error("Registration error:", error);

      if (
        error.message.includes("session has expired") ||
        error.message.includes("log in again")
      ) {
        toast.error(error.message);
        navigate("/signin");
      } else if (error.message.includes("Already registered")) {
        toast.error("You are already registered for this event");
        setIsAlreadyRegistered(true);
        setShowRegisterForm(false);
      } else if (error.message.includes("Event is full")) {
        toast.error("This event is now full");
      } else if (error.message.includes("Registration deadline")) {
        toast.error("Registration deadline has passed");
      } else {
        toast.error(
          error.message || "Failed to register for event. Please try again."
        );
      }
    } finally {
      setRegistering(false);
    }
  };

  const handlePaymentCompleted = async () => {
    setRegistering(true);
    try {
      setRegistrationStep("success");
      toast.success(
        `Payment completed! Registration ID: ${registrationId}. Your enrollment is now pending admin approval.`
      );
      setIsAlreadyRegistered(true);
      setRegistrationStatus("pending");
      await fetchEventDetails();
    } catch (error) {
      console.error("Error updating registration status:", error);
      toast.error(
        "Failed to update registration status. Please contact support."
      );
    } finally {
      setRegistering(false);
    }
  };

  const handleCancelRegistration = () => {
    setShowRegisterForm(false);
    setRegistrationStep("form");
    setRegistrationId(null);

    if (user) {
      setRegistrationData({
        fullName: user.fullName || user.name || "",
        email: user.email || "",
        enrollmentNo: user.enrollmentNo || user.enrollment || "",
        branch: user.branch || "",
        mobileNo: user.mobileNo || user.phone || user.phoneNumber || "",
      });
    }
  };

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

  const isRegistrationOpen = () => {
    if (!event) return false;

    const eventStatus = getEventStatus();
    if (eventStatus !== "upcoming") return false;

    if (event.registrationDeadline) {
      const currentDate = new Date();
      const deadlineDate = new Date(event.registrationDeadline);

      return currentDate < deadlineDate;
    }

    return true;
  };

  const isFull = () => {
    return getSeatStatus() === "full";
  };

  const getRegistrationButtonInfo = () => {
    if (!isAlreadyRegistered) {
      return null;
    }

    const isPaidEvent = parseFloat(event?.registrationFee || 0) > 0;

    if (isPaidEvent) {
      if (registrationStatus === "approved") {
        return {
          text: "✓ Registration Approved",
          style: "bg-green-600 text-white px-6 py-3 rounded-lg font-semibold",
        };
      } else if (
        registrationStatus === "denied" ||
        registrationStatus === "rejected"
      ) {
        return {
          text: "❌ Registration Rejected",
          style: "bg-red-600 text-white px-6 py-3 rounded-lg font-semibold",
        };
      } else {
        return {
          text: "⏳ Pending Admin Approval",
          style: "bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold",
        };
      }
    } else {
      return {
        text: "✓ Successfully Registered",
        style: "bg-green-600 text-white px-6 py-3 rounded-lg font-semibold",
      };
    }
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
              onClick={() => navigate("/events")}
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
  const registrationButtonInfo = getRegistrationButtonInfo();

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
                src={event.image || "/api/placeholder/800/400"}
                alt={event.title || "Event"}
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
                {event.title || "Event Title"}
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
                      <span>
                        {event.currentParticipants || 0}/{event.maxParticipants}{" "}
                        registered
                      </span>
                    </div>
                  )}

                  <div className="flex items-center text-gray-300">
                    <span className="mr-3">💰</span>
                    <span>
                      {(event.registrationFee || 0) > 0
                        ? `₹${event.registrationFee}`
                        : "Free"}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  {/* Two Status Tags in a Row */}
                  <div className="flex items-center gap-3 text-gray-300">
                    <span className="mr-1">🏷️</span>
                    <div className="flex gap-2">
                      {/* Event Status Tag */}
                      <span
                        className={`px-3 py-1 rounded-lg text-sm font-medium ${getStatusTagStyle(
                          eventStatus,
                          "event"
                        )}`}
                      >
                        {eventStatus.toUpperCase()}
                      </span>

                      {/* Seat Status Tag */}
                      {event.maxParticipants && (
                        <span
                          className={`px-3 py-1 rounded-lg text-sm font-medium ${getStatusTagStyle(
                            seatStatus,
                            "seat"
                          )}`}
                        >
                          {seatStatus.toUpperCase()}
                        </span>
                      )}
                    </div>
                  </div>

                  {event.registrationDeadline && (
                    <div className="flex items-center text-gray-300">
                      <span className="mr-3">⏰</span>
                      <span>
                        Registration ends:{" "}
                        {new Date(
                          event.registrationDeadline
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold text-white mb-3">
                  Description
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  {event.description || "No description available."}
                </p>
              </div>

              {/* Registration Section */}
              <div className="border-t border-gray-700 pt-6">
                {user ? (
                  <div className="flex flex-col sm:flex-row gap-4">
                    {checkingRegistration ? (
                      <div className="text-gray-400">
                        Checking registration status...
                      </div>
                    ) : registrationButtonInfo ? (
                      <span className={registrationButtonInfo.style}>
                        {registrationButtonInfo.text}
                      </span>
                    ) : isRegistrationOpen() && !isFull() ? (
                      <button
                        onClick={handleRegisterClick}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
                        disabled={registering}
                      >
                        {registering ? "Registering..." : "Register for Event"}
                      </button>
                    ) : (
                      <div className="text-gray-400">
                        {eventStatus === "completed" && "Event has ended"}
                        {eventStatus === "cancelled" &&
                          "Event has been cancelled"}
                        {!isRegistrationOpen() &&
                          eventStatus === "upcoming" &&
                          "Registration has closed"}
                        {isFull() && "Event is full"}
                      </div>
                    )}

                    <button
                      onClick={() => navigate("/events")}
                      className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
                    >
                      Back to Events
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-gray-300 mb-4">
                      Please login to register for this event
                    </p>
                    <button
                      onClick={() => navigate("/signin")}
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
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full max-h-[calc(100vh-4rem)] overflow-y-auto my-8">
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

            <RegisterForm
              registrationData={registrationData}
              setRegistrationData={setRegistrationData}
              handleRegisterSubmit={handleRegistrationSubmit}
              isLoading={registering}
              onCancel={handleCancelRegistration}
              event={event}
              registrationStep={registrationStep}
              onPaymentCompleted={handlePaymentCompleted}
              registrationId={registrationId}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetails;