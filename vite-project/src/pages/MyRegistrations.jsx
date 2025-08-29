import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  getUserRegistrations,
  cancelRegistration,
} from "../api/Registration_api";
import { fetchEvents } from "../api/Events_api";
import useAuth from "../context/AuthContext";
import useTheme from "../context/ThemeContext";
import toast from "react-hot-toast";
import OtherPage3 from "../components/OtherPage3";
import "../css/OtherPage3.css";

const MyRegistrations = () => {
  const { user } = useAuth();
  const { themeMode } = useTheme();
  const isLightTheme = themeMode === "light";
  const [registrations, setRegistrations] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [cancelingId, setCancelingId] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0,
  });

  const fetchEventsData = useCallback(async () => {
    try {
      const backendEvents = await fetchEvents();
      const formattedEvents = backendEvents.map((e) => ({
        id: e._id || e.id,
        title: e.title,
        description: e.description,
        image: e.image,
        date: e.date,
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
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  }, []);

  const fetchRegistrations = useCallback(
    async (page = 1) => {
      setLoading(true);
      try {
        const params = { page, limit: 10 };
        if (filter !== "all") {
          params.status = filter;
        }

        const response = await getUserRegistrations(params);

        const responseData = response?.data || response;

        if (responseData) {
          setRegistrations(responseData.registrations || []);
          setPagination({
            currentPage: responseData.currentPage || 1,
            totalPages: responseData.totalPages || 1,
            total: responseData.total || 0,
          });
        }
      } catch (error) {
        console.error("Error fetching registrations:", error);
        toast.error(error.message || "Failed to fetch registrations");
        setRegistrations([]);
      } finally {
        setLoading(false);
      }
    },
    [filter]
  );

  useEffect(() => {
    if (user) {
      fetchEventsData();
      fetchRegistrations();
    }
  }, [user, fetchEventsData, fetchRegistrations]);

  const getEventData = (registration) => {
    const eventId =
      registration.eventId?._id ||
      registration.eventId?.id ||
      registration.eventId ||
      registration.event?._id ||
      registration.event?.id;

    const registrationEventData =
      registration.eventId || registration.event || {};

    const fetchedEvent = events.find(
      (event) => event._id === eventId || event.id === eventId
    );

    return fetchedEvent || registrationEventData || {};
  };

  const handleCancelRegistration = async (registrationId) => {
    if (!window.confirm("Are you sure you want to cancel this registration?")) {
      return;
    }

    setCancelingId(registrationId);
    try {
      await cancelRegistration(registrationId);
      toast.success("Registration cancelled successfully");
      fetchRegistrations(pagination.currentPage);
    } catch (error) {
      console.error("Cancel registration error:", error);
      toast.error(error.message || "Failed to cancel registration");
    } finally {
      setCancelingId(null);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Date not available";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch (error) {
      return "Invalid date";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "registered":
        return "bg-green-600";
      case "attended":
        return "bg-blue-600";
      case "absent":
        return "bg-yellow-600";
      case "cancelled":
        return "bg-red-600";
      default:
        return "bg-gray-600";
    }
  };

  const getEventId = (registration) => {
    return (
      registration.eventId?._id ||
      registration.eventId?.id ||
      registration.eventId ||
      registration.event?._id ||
      registration.event?.id
    );
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <OtherPage3 />
        <div className="text-white text-xl">
          Please login to view your registrations
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <OtherPage3 />
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 mt-14 text-center">
          <h1
            style={{
              fontFamily: "Cabin, sans-serif",
              fontSize: "48px",
            }}
            className="mb-4"
          >
            <span
              className={`${
                isLightTheme ? "text-[#2195DE]" : "text-[#0065A5]"
              }`}
            >
              &lt;{" "}
            </span>
            <span
              className={`${
                isLightTheme ? "text-[#0A7956]" : "text-[#00FFAF]"
              }`}
            >
              {" "}
              My Registrations{" "}
            </span>
            <span
              className={`${
                isLightTheme ? "text-[#2195DE]" : "text-[#0065A5]"
              }`}
            >
              &gt;
            </span>
          </h1>
        </div>

        {loading ? (
          <div className="text-center text-white text-xl">
            Loading registrations...
          </div>
        ) : registrations.length === 0 ? (
          <div className="text-center">
            <div className="bg-gray-800 p-8 rounded-lg">
              <h3 className="text-xl text-white mb-4">
                No registrations found
              </h3>
              <p className="text-gray-400 mb-6">
                {filter === "all"
                  ? "You haven't registered for any events yet."
                  : `No registrations with status "${filter}" found.`}
              </p>
              <Link
                to="/events"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-200"
              >
                Browse Events
              </Link>
            </div>
          </div>
        ) : (
          <div>
            {/* Statistics */}
            <div className="bg-gray-800 p-6 rounded-lg mb-8">
              <h3 className="text-lg font-semibold text-white mb-4">
                Registration Summary
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">
                    {pagination.total}
                  </div>
                  <div className="text-gray-400">Total</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">
                    {
                      registrations.filter(
                        (r) => r.attendanceStatus === "registered"
                      ).length
                    }
                  </div>
                  <div className="text-gray-400">Active</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">
                    {
                      registrations.filter(
                        (r) => r.attendanceStatus === "attended"
                      ).length
                    }
                  </div>
                  <div className="text-gray-400">Attended</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-400">
                    {
                      registrations.filter(
                        (r) => r.attendanceStatus === "cancelled"
                      ).length
                    }
                  </div>
                  <div className="text-gray-400">Cancelled</div>
                </div>
              </div>
            </div>

            {/* Filter buttons */}
            <div className="flex justify-center gap-2 flex-wrap mb-8">
              {["all", "registered", "attended", "cancelled"].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    filter === status
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>

            {/* Registrations List */}
            <div className="space-y-4">
              {registrations.map((registration) => {
                const eventData = getEventData(registration);
                const eventId = getEventId(registration);

                return (
                  <div
                    key={registration._id || registration.id}
                    className="bg-gray-800 rounded-lg overflow-hidden"
                  >
                    <div className="flex flex-col md:flex-row">
                      {/* Event Image - Using EventMiniCard approach with better fallback */}
                      <div className="md:w-1/3 relative">
                        <div
                          className="w-full h-48 md:h-full rounded-l-lg"
                          style={{
                            backgroundImage: eventData.image
                              ? `url(${eventData.image})`
                              : "none",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            minHeight: "200px",
                            backgroundColor: eventData.image
                              ? "transparent"
                              : "#374151",
                          }}
                        >
                          {/* Fallback content when no image */}
                          {!eventData.image && (
                            <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center rounded-l-lg">
                              <div className="text-center">
                                <svg
                                  className="mx-auto h-12 w-12 text-gray-400 mb-2"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                  />
                                </svg>
                                <span className="text-gray-400 text-sm">
                                  No Image Available
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Event Details */}
                      <div className="md:w-2/3 p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-white mb-2">
                              {eventData.title || "Event Title Not Available"}
                            </h3>

                            {/* Date with Calendar Icon - Using same format as Events.jsx */}
                            <div className="flex items-center mb-2">
                              <div className="flex items-center text-green-400 text-sm">
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="mr-2"
                                >
                                  <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
                                </svg>
                                <span className="font-medium">
                                  {eventData.date
                                    ? new Date(
                                        eventData.date
                                      ).toLocaleDateString("en-US", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                      })
                                    : "Date not available"}
                                </span>
                              </div>
                            </div>

                            {/* Event Type and Prize Info */}
                            <div className="flex items-center gap-4 mb-3">
                              {eventData.eventType && (
                                <div className="flex items-center text-blue-400 text-sm">
                                  <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="mr-1"
                                  >
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                  </svg>
                                  <span className="font-medium">
                                    {eventData.eventType}
                                  </span>
                                </div>
                              )}

                              {eventData.eventPrize && (
                                <div className="flex items-center text-yellow-400 text-sm">
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
                                    {eventData.eventPrize}
                                  </span>
                                </div>
                              )}
                            </div>

                            <p className="text-gray-300 mb-4 leading-relaxed">
                              {eventData.description
                                ? eventData.description.length > 200
                                  ? `${eventData.description.substring(
                                      0,
                                      200
                                    )}...`
                                  : eventData.description
                                : "No description available for this event."}
                            </p>
                          </div>

                          {/* Status Badge */}
                          <div className="flex flex-col items-end gap-2">
                            <span
                              className={`px-3 py-1 rounded-full text-white text-sm font-medium ${getStatusColor(
                                registration.attendanceStatus
                              )}`}
                            >
                              {registration.attendanceStatus || "unknown"}
                            </span>
                            {(registration.paymentAmount || 0) > 0 && (
                              <span className="text-green-400 font-semibold">
                                ₹{registration.paymentAmount}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Registration Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <span className="text-gray-400">
                              Registered on:
                            </span>
                            <div className="text-white">
                              {formatDate(registration.registrationDate)}
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-400">
                              Payment Status:
                            </span>
                            <div
                              className={`font-medium ${
                                registration.paymentStatus === "completed"
                                  ? "text-green-400"
                                  : registration.paymentStatus === "pending"
                                  ? "text-yellow-400"
                                  : "text-red-400"
                              }`}
                            >
                              {registration.paymentStatus || "unknown"}
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4">
                          {eventId ? (
                            <Link
                              to={`/events/${eventId}`}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                            >
                              View Event
                            </Link>
                          ) : (
                            <span className="text-gray-500 px-4 py-2">
                              Event unavailable
                            </span>
                          )}

                          {registration.attendanceStatus === "registered" && (
                            <button
                              onClick={() =>
                                handleCancelRegistration(
                                  registration._id || registration.id
                                )
                              }
                              disabled={
                                cancelingId ===
                                (registration._id || registration.id)
                              }
                              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 disabled:opacity-50"
                            >
                              {cancelingId ===
                              (registration._id || registration.id)
                                ? "Cancelling..."
                                : "Cancel Registration"}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-8">
                <button
                  onClick={() => fetchRegistrations(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 1}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
                >
                  Previous
                </button>

                <span className="text-white">
                  Page {pagination.currentPage} of {pagination.totalPages}
                </span>

                <button
                  onClick={() => fetchRegistrations(pagination.currentPage + 1)}
                  disabled={pagination.currentPage === pagination.totalPages}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRegistrations;