import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getDashboardData } from "../api/Dashboard_api";
import useAuth from "../context/AuthContext";
import useTheme from "../context/ThemeContext";
import toast from "react-hot-toast";
import OtherPage2 from "../components/OtherPage2";
import "../css/OtherPage2.css";

const Dashboard = () => {
  const { user } = useAuth();
  const { themeMode } = useTheme();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isLightTheme = themeMode === "light";

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      setError(null);
      const response = await getDashboardData();
      
      // Validate response structure
      if (response && response.data) {
        setDashboardData(response.data);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
      setError(error.message || "Failed to fetch dashboard data");
      toast.error(error.message || "Failed to fetch dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const handleBrowseEvents = () => {
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

  const handleMyRegistrations = () => {
    navigate("/my-registrations");

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 100);
  };

  const handleViewHistory = () => {
    navigate("/event-history");

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 100);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Date TBD";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch (e) {
      return "Invalid Date";
    }
  };

  // Safe data accessors with fallbacks
  const getUserStats = () => dashboardData?.userStats || {};
  const getRegistrationStats = () => dashboardData?.registrationStats || [];
  const getApprovalStats = () => dashboardData?.approvalStats || [];
  const getRecentRegistrations = () => dashboardData?.recentRegistrations || [];
  const getUpcomingEvents = () => dashboardData?.upcomingEvents || [];

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <OtherPage2 />
        <div className="text-white text-xl">Please login to view dashboard</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <OtherPage2 />
        <div className="text-white text-xl">Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col">
        <OtherPage2 />
        <div className="text-red-400 text-xl mb-4">Error: {error}</div>
        <button
          onClick={fetchDashboardData}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <OtherPage2 />
      <div className="max-w-6xl mx-auto">
        <h1
          className="text-4xl md:text-5xl font-bold tracking-wide mb-8 text-center mt-14"
          style={{ fontFamily: "Cabin, sans-serif" }}
        >
          <span
            className={`${isLightTheme ? "text-[#2195DE]" : "text-[#0065A5]"}`}
          >
            &lt;
          </span>
          <span
            className={`${
              isLightTheme ? "text-[#0A7956]" : "text-[#00FFAF]"
            } mx-2`}
          >
            Dashboard
          </span>
          <span
            className={`${isLightTheme ? "text-[#2195DE]" : "text-[#0065A5]"}`}
          >
            &gt;
          </span>
        </h1>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-2">
              Confirmed Events
            </h3>
            <p className="text-3xl font-bold text-blue-400">
              {getUserStats().totalEventsRegistered || 0}
            </p>
            <p className="text-xs text-gray-400 mt-1">Free + Approved Paid</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-2">
              Pending Events
            </h3>
            <p className="text-3xl font-bold text-yellow-400">
              {getUserStats().pendingRegistrations || 0}
            </p>
            <p className="text-xs text-gray-400 mt-1">Awaiting Approval</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-2">
              Total Spent
            </h3>
            <p className="text-3xl font-bold text-green-400">
              ₹{getUserStats().totalMoneySpent || 0}
            </p>
            <p className="text-xs text-gray-400 mt-1">Approved Payments Only</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-2">
              All Registrations
            </h3>
            <p className="text-3xl font-bold text-purple-400">
              {getUserStats().registrationCount || 0}
            </p>
            <p className="text-xs text-gray-400 mt-1">Total Attempts</p>
          </div>
        </div>

        {/* Registration Status */}
        {getRegistrationStats().length > 0 && (
          <div className="bg-gray-800 p-6 rounded-lg mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">
              Registration Status
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {getRegistrationStats().map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-2xl font-bold text-white">
                    {stat.count || 0}
                  </p>
                  <p className="text-gray-400 capitalize">{stat._id || "Unknown"}</p>
                  {(stat.totalAmount || 0) > 0 && (
                    <p className="text-xs text-green-400 mt-1">
                      ₹{stat.totalAmount}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Approval Status for Paid Events */}
        {getApprovalStats().length > 0 && (
          <div className="bg-gray-800 p-6 rounded-lg mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">
              Paid Events Approval Status
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {getApprovalStats().map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-2xl font-bold text-white">
                    {stat.count || 0}
                  </p>
                  <p
                    className={`capitalize ${
                      stat._id === "approved"
                        ? "text-green-400"
                        : stat._id === "pending"
                        ? "text-yellow-400"
                        : stat._id === "denied" || stat._id === "rejected"
                        ? "text-red-400"
                        : "text-gray-400"
                    }`}
                  >
                    {stat._id || "Pending"}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    ₹{stat.totalAmount || 0}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Registrations */}
        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-white">
              Recent Registrations
            </h3>
            <button
              onClick={handleMyRegistrations}
              className="text-blue-400 hover:text-blue-300 transition-colors duration-200 cursor-pointer"
            >
              View All
            </button>
          </div>

          {getRecentRegistrations().length > 0 ? (
            <div className="space-y-3">
              {getRecentRegistrations()
                .slice(0, 5)
                .map((registration) => {
                  const eventData = registration.eventId || {};
                  const fee = registration.participationType === "team" 
                    ? (eventData.teamRegistrationFee || 0)
                    : (eventData.registrationFee || 0);
                  
                  return (
                    <div
                      key={registration._id}
                      className="flex items-center justify-between bg-gray-700 p-3 rounded hover:bg-gray-600 transition-colors duration-200"
                    >
                      <div className="flex items-center flex-1">
                        {eventData.image && (
                          <img
                            src={eventData.image}
                            alt={eventData.title || "Event"}
                            className="w-12 h-12 object-cover rounded mr-3"
                            onError={(e) => {
                              e.target.style.display = "none";
                            }}
                          />
                        )}
                        <div className="flex-1">
                          <p className="text-white font-medium">
                            {eventData.title || "Event Title"}
                          </p>
                          <p className="text-gray-400 text-sm">
                            {formatDate(registration.registrationDate)}
                          </p>
                          {/* Show status badges */}
                          <div className="flex flex-wrap gap-1 mt-1">
                            {/* Show approval status for paid events */}
                            {fee > 0 && (
                              <span
                                className={`text-xs px-2 py-1 rounded ${
                                  registration.approvalStatus === "approved"
                                    ? "bg-green-600 text-white"
                                    : registration.approvalStatus === "pending" ||
                                      !registration.approvalStatus
                                    ? "bg-yellow-600 text-white"
                                    : registration.approvalStatus === "denied" ||
                                      registration.approvalStatus === "rejected"
                                    ? "bg-red-600 text-white"
                                    : "bg-gray-600 text-white"
                                }`}
                              >
                                {(registration.approvalStatus || "Pending")
                                  .charAt(0)
                                  .toUpperCase() +
                                  (
                                    registration.approvalStatus || "Pending"
                                  ).slice(1)}{" "}
                                Approval
                              </span>
                            )}

                            {/* Show cancelled status */}
                            {registration.attendanceStatus === "cancelled" && (
                              <span className="text-xs px-2 py-1 rounded bg-red-600 text-white">
                                Cancelled
                              </span>
                            )}

                            {/* Show completed status if event date has passed */}
                            {eventData.date &&
                              new Date(eventData.date) < new Date() &&
                              registration.attendanceStatus !== "cancelled" && (
                                <span className="text-xs px-2 py-1 rounded bg-gray-600 text-white">
                                  Completed
                                </span>
                              )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-green-400 font-semibold">
                          ₹{fee}
                        </span>
                        {fee === 0 && (
                          <p className="text-xs text-gray-400">Free Event</p>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-400 mb-4">No recent registrations</p>
              <button
                onClick={handleBrowseEvents}
                className="text-blue-400 hover:text-blue-300 transition-colors duration-200 cursor-pointer"
              >
                Browse Events to Get Started
              </button>
            </div>
          )}
        </div>

        {/* Upcoming Events */}
        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">
            Upcoming Events
          </h3>

          {getUpcomingEvents().length > 0 ? (
            <div className="grid md:grid-cols-2 gap-4">
              {getUpcomingEvents().map((registration) => {
                const eventData = registration.eventId || {};
                const fee = registration.participationType === "team"
                  ? (eventData.teamRegistrationFee || 0)
                  : (eventData.registrationFee || 0);
                
                return (
                  <div
                    key={registration._id}
                    className="bg-gray-700 p-4 rounded hover:bg-gray-600 transition-colors duration-200"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-white font-semibold flex-1 mr-2">
                        {eventData.title || "Event Title"}
                      </h4>
                      <div className="text-right">
                        <span className="text-green-400 font-semibold">
                          ₹{fee}
                        </span>
                        {fee === 0 && (
                          <p className="text-xs text-gray-400">Free</p>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm mb-3">
                      {formatDate(eventData.date)}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex flex-wrap gap-1">
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            registration.attendanceStatus === "registered"
                              ? "bg-blue-600 text-white"
                              : registration.attendanceStatus === "attended"
                              ? "bg-green-600 text-white"
                              : registration.attendanceStatus === "absent"
                              ? "bg-red-600 text-white"
                              : registration.attendanceStatus === "cancelled"
                              ? "bg-gray-600 text-white"
                              : "bg-gray-600 text-white"
                          }`}
                        >
                          {registration.attendanceStatus || "Registered"}
                        </span>

                        {/* Show approval status for paid events */}
                        {fee > 0 && (
                          <span
                            className={`px-2 py-1 rounded text-xs ${
                              registration.approvalStatus === "approved"
                                ? "bg-green-600 text-white"
                                : registration.approvalStatus === "pending" ||
                                  !registration.approvalStatus
                                ? "bg-yellow-600 text-white"
                                : registration.approvalStatus === "denied" ||
                                  registration.approvalStatus === "rejected"
                                ? "bg-red-600 text-white"
                                : "bg-gray-600 text-white"
                            }`}
                          >
                            {(registration.approvalStatus || "Pending")
                              .charAt(0)
                              .toUpperCase() +
                              (registration.approvalStatus || "Pending").slice(
                                1
                              )}{" "}
                            Approval
                          </span>
                        )}

                        {/* Show cancelled status */}
                        {registration.attendanceStatus === "cancelled" && (
                          <span className="px-2 py-1 rounded text-xs bg-red-600 text-white">
                            Cancelled
                          </span>
                        )}

                        {/* Show completed status if event date has passed */}
                        {eventData.date &&
                          new Date(eventData.date) < new Date() &&
                          registration.attendanceStatus !== "cancelled" && (
                            <span className="px-2 py-1 rounded text-xs bg-gray-600 text-white">
                              Completed
                            </span>
                          )}
                      </div>
                      {eventData._id && (
                        <Link
                          to={`/events/${eventData._id}`}
                          className="text-blue-400 hover:text-blue-300 text-sm transition-colors duration-200"
                        >
                          View Details
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-400 mb-4">No upcoming events</p>
              <button
                onClick={handleBrowseEvents}
                className="text-blue-400 hover:text-blue-300 transition-colors duration-200 cursor-pointer"
              >
                Discover Events
              </button>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <button
            onClick={handleBrowseEvents}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            Browse Events
          </button>
          <button
            onClick={handleMyRegistrations}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            My Registrations
          </button>
          <button
            onClick={handleViewHistory}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            View History
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;