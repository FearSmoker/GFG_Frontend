import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  getPendingRegistrations,
  getAllRegistrationsWithStatus,
  approveRegistration,
  denyRegistration,
  getRegistrationStats,
} from "../api/User_api";
import useAuth from "../context/AuthContext";
import useTheme from "../context/ThemeContext";
import toast from "react-hot-toast";
import OtherPage1 from "../components/OtherPage1.jsx";
import "../css/OtherPage1.css";

const AdminRegistrationDashboard = () => {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const { themeMode } = useTheme();
  const navigate = useNavigate();
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("pending");
  const [searchTerm, setSearchTerm] = useState("");
  const [processing, setProcessing] = useState({});
  const [stats, setStats] = useState(null);
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [approvalNotes, setApprovalNotes] = useState("");
  const [actionType, setActionType] = useState("approve");

  const isAdmin = user?.type === "admin";
  const [initialAuthCheck, setInitialAuthCheck] = useState(false);
  const isLightTheme = themeMode === "light";

  useEffect(() => {
    if (!authLoading && !initialAuthCheck) {
      setInitialAuthCheck(true);

      if (!isAuthenticated || !isAdmin) {
        toast.error("Access denied. Admin privileges required.");
        navigate("/");
      }
    }
  }, [isAuthenticated, authLoading, isAdmin, navigate, initialAuthCheck]);

  const fetchRegistrations = useCallback(async () => {
    setLoading(true);
    try {
      let response;
      if (filter === "pending") {
        response = await getPendingRegistrations();
      } else {
        const statusFilter = filter === "rejected" ? "denied" : filter;
        response = await getAllRegistrationsWithStatus({
          approvalStatus: statusFilter,
        });
      }

      console.log("Registrations response:", response);
      const registrationsData =
        response.data?.registrations ||
        response.registrations ||
        response.data ||
        response ||
        [];
      setRegistrations(
        Array.isArray(registrationsData) ? registrationsData : []
      );
    } catch (error) {
      console.error("Error fetching registrations:", error);
      toast.error("Failed to fetch registrations");
      setRegistrations([]);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  const fetchStats = useCallback(async () => {
    try {
      const response = await getRegistrationStats();
      setStats(response.data || response);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated && isAdmin && !authLoading) {
      fetchRegistrations();
      fetchStats();
    }
  }, [fetchRegistrations, fetchStats, isAuthenticated, isAdmin, authLoading]);

  const handleApprovalAction = (registration, action) => {
    setSelectedRegistration(registration);
    setActionType(action);
    setShowApprovalModal(true);
  };

  const processRegistration = async () => {
    if (!selectedRegistration) return;

    const registrationId = selectedRegistration._id || selectedRegistration.id;
    setProcessing((prev) => ({ ...prev, [registrationId]: true }));

    try {
      if (actionType === "approve") {
        await approveRegistration(registrationId, approvalNotes);
        toast.success("Registration approved successfully");
      } else {
        await denyRegistration(registrationId, approvalNotes);
        toast.success("Registration denied successfully");
      }

      setShowApprovalModal(false);
      setSelectedRegistration(null);
      setApprovalNotes("");

      setRegistrations((prevRegistrations) =>
        prevRegistrations.map((reg) => {
          if ((reg._id || reg.id) === registrationId) {
            return {
              ...reg,
              approvalStatus: actionType === "approve" ? "approved" : "denied",
              paymentStatus: actionType === "approve" ? "completed" : "failed",
            };
          }
          return reg;
        })
      );

      await fetchStats();
    } catch (error) {
      console.error("Error processing registration:", error);
      toast.error(error.message || `Failed to ${actionType} registration`);
    } finally {
      setProcessing((prev) => ({ ...prev, [registrationId]: false }));
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Date not available";
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-600 text-white";
      case "approved":
        return "bg-green-600 text-white";
      case "rejected":
      case "denied":
        return "bg-red-600 text-white";
      default:
        return "bg-gray-600 text-white";
    }
  };

  const filteredRegistrations = registrations.filter((registration) => {
    const participantName =
      registration.userDetails?.fullName ||
      registration.userDetails?.name ||
      registration.participantName ||
      registration.user?.fullName ||
      registration.user?.name ||
      "";

    const eventTitle =
      registration.eventDetails?.title ||
      registration.eventTitle ||
      registration.event?.title ||
      "";

    const matchesSearch =
      !searchTerm ||
      participantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      eventTitle.toLowerCase().includes(searchTerm.toLowerCase());

    const registrationStatus =
      registration.approvalStatus || registration.status || "pending";

    let matchesFilter = false;
    if (filter === "rejected") {
      matchesFilter = registrationStatus === "denied";
    } else {
      matchesFilter = registrationStatus === filter;
    }

    return matchesSearch && matchesFilter;
  });

  if (authLoading) {
    return (
      <>
        <OtherPage1 />
        <div className="otherpage1-content min-h-screen text-white flex items-center justify-center">
          <div className="text-white text-xl">Loading...</div>
        </div>
      </>
    );
  }

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  return (
    <>
      <OtherPage1 />
      <div className="otherpage1-content min-h-screen text-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 mt-8">
            <h1
              style={{
                fontFamily: "Cabin, sans-serif",
                textAlign: "center",
                userSelect: "none",
                fontSize: "60px",
              }}
              className="text-center mb-4"
            >
              <span
                className={`${isLightTheme ? "text-[#2195DE]" : "text-[#0065A5]"}`}
              >
                &lt;{" "}
              </span>
              <span
                className={`${isLightTheme ? "text-[#0A7956]" : "text-[#00FFAF]"}`}
              >
                {" "}
                Registration Management{" "}
              </span>
              <span
                className={`${isLightTheme ? "text-[#2195DE]" : "text-[#0065A5]"}`}
              >
                &gt;
              </span>
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Manage event registrations and approve/deny participant requests.
            </p>
          </div>

          {/* Stats Cards */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h3 className="text-gray-400 text-sm font-medium">
                  Total Registrations
                </h3>
                <p className="text-2xl font-bold text-white mt-2">
                  {stats.total || 0}
                </p>
              </div>
              <div className="bg-yellow-900 p-6 rounded-lg border border-yellow-700">
                <h3 className="text-yellow-400 text-sm font-medium">
                  Pending Approval
                </h3>
                <p className="text-2xl font-bold text-white mt-2">
                  {stats.pending || 0}
                </p>
              </div>
              <div className="bg-green-900 p-6 rounded-lg border border-green-700">
                <h3 className="text-green-400 text-sm font-medium">Approved</h3>
                <p className="text-2xl font-bold text-white mt-2">
                  {stats.approved || 0}
                </p>
              </div>
              <div className="bg-red-900 p-6 rounded-lg border border-red-700">
                <h3 className="text-red-400 text-sm font-medium">Rejected</h3>
                <p className="text-2xl font-bold text-white mt-2">
                  {stats.rejected || stats.denied || 0}
                </p>
              </div>
            </div>
          )}

          {/* Search and Filter Bar */}
          <div className="bg-gray-800 p-6 rounded-lg mb-8 border border-gray-700">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search by participant name or event title..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {["pending", "approved", "rejected"].map((status) => (
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
            </div>
          </div>

          {/* Registrations Table */}
          {loading ? (
            <div className="text-center text-white text-xl py-12">
              Loading registrations...
            </div>
          ) : filteredRegistrations.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-gray-800 p-8 rounded-lg max-w-md mx-auto border border-gray-700">
                <h3 className="text-xl text-white mb-4">
                  No registrations found
                </h3>
                <p className="text-gray-400">
                  {searchTerm
                    ? "Try adjusting your search terms."
                    : "No registrations match your current filter."}
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Participant
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Event
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Registration Fee
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Registration Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {filteredRegistrations.map((registration) => {
                      const registrationId = registration._id || registration.id;

                      const participantName =
                        registration.userDetails?.fullName ||
                        registration.userDetails?.name ||
                        registration.participantName ||
                        registration.user?.fullName ||
                        registration.user?.name ||
                        "Unknown";

                      const participantEmail =
                        registration.userDetails?.email ||
                        registration.user?.email ||
                        "";

                      const eventTitle =
                        registration.eventDetails?.title ||
                        registration.eventTitle ||
                        registration.event?.title ||
                        "Unknown Event";

                      const eventDate =
                        registration.eventDetails?.date ||
                        registration.event?.date ||
                        null;

                      const registrationFee =
                        registration.paymentAmount ||
                        registration.eventDetails?.registrationFee ||
                        registration.registrationFee ||
                        registration.event?.registrationFee ||
                        registration.event?.fee ||
                        0;

                      const status =
                        registration.approvalStatus ||
                        registration.status ||
                        "pending";

                      return (
                        <tr key={registrationId} className="hover:bg-gray-750">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-white">
                              {participantName}
                            </div>
                            {participantEmail && (
                              <div className="text-sm text-gray-400">
                                {participantEmail}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-white max-w-xs truncate">
                              {eventTitle}
                            </div>
                            {eventDate && (
                              <div className="text-sm text-gray-400">
                                {formatDate(eventDate)}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-white">
                              {registrationFee > 0
                                ? `₹${registrationFee}`
                                : "Free"}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-300">
                              {formatDate(
                                registration.registrationDate ||
                                  registration.createdAt
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                                status
                              )}`}
                            >
                              {status === "denied"
                                ? "REJECTED"
                                : status.toUpperCase()}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            {status === "pending" ? (
                              <div className="flex gap-2">
                                <button
                                  onClick={() =>
                                    handleApprovalAction(registration, "approve")
                                  }
                                  disabled={processing[registrationId]}
                                  className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white px-3 py-1 rounded text-xs transition-colors duration-200"
                                >
                                  {processing[registrationId]
                                    ? "Processing..."
                                    : "Approve"}
                                </button>
                                <button
                                  onClick={() =>
                                    handleApprovalAction(registration, "deny")
                                  }
                                  disabled={processing[registrationId]}
                                  className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white px-3 py-1 rounded text-xs transition-colors duration-200"
                                >
                                  {processing[registrationId]
                                    ? "Processing..."
                                    : "Reject"}
                                </button>
                              </div>
                            ) : (
                              <span className="text-gray-500 text-xs">
                                {status === "approved"
                                  ? "Already Approved"
                                  : status === "denied"
                                  ? "Already Rejected"
                                  : "Already Processed"}
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Approval/Denial Modal */}
        {showApprovalModal && selectedRegistration && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">
                {actionType === "approve"
                  ? "Approve Registration"
                  : "Reject Registration"}
              </h3>
              <div className="mb-6">
                <div className="bg-gray-700 p-4 rounded-lg mb-4">
                  <p className="text-sm text-gray-300">
                    <strong>Participant:</strong>{" "}
                    {selectedRegistration.userDetails?.fullName ||
                      selectedRegistration.userDetails?.name ||
                      selectedRegistration.participantName ||
                      selectedRegistration.user?.fullName ||
                      selectedRegistration.user?.name ||
                      "Unknown"}
                  </p>
                  <p className="text-sm text-gray-300">
                    <strong>Event:</strong>{" "}
                    {selectedRegistration.eventDetails?.title ||
                      selectedRegistration.eventTitle ||
                      selectedRegistration.event?.title ||
                      "Unknown Event"}
                  </p>
                  <p className="text-sm text-gray-300">
                    <strong>Fee:</strong>{" "}
                    {(selectedRegistration.paymentAmount ||
                      selectedRegistration.eventDetails?.registrationFee ||
                      selectedRegistration.registrationFee ||
                      selectedRegistration.event?.registrationFee ||
                      selectedRegistration.event?.fee ||
                      0) > 0
                      ? `₹${
                          selectedRegistration.paymentAmount ||
                          selectedRegistration.eventDetails?.registrationFee ||
                          selectedRegistration.registrationFee ||
                          selectedRegistration.event?.registrationFee ||
                          selectedRegistration.event?.fee
                        }`
                      : "Free"}
                  </p>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    {actionType === "approve"
                      ? "Approval Notes (Optional)"
                      : "Rejection Reason (Optional)"}
                  </label>
                  <textarea
                    value={approvalNotes}
                    onChange={(e) => setApprovalNotes(e.target.value)}
                    placeholder={
                      actionType === "approve"
                        ? "Add any notes about the approval..."
                        : "Provide reason for rejection..."
                    }
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none resize-none"
                    rows="3"
                  />
                </div>
                {actionType === "approve" ? (
                  <div className="bg-green-900 border border-green-600 rounded-lg p-3 mb-4">
                    <p className="text-green-300 text-sm">
                      This will approve the registration and the participant will
                      be notified.
                    </p>
                  </div>
                ) : (
                  <div className="bg-red-900 border border-red-600 rounded-lg p-3 mb-4">
                    <p className="text-red-300 text-sm">
                      This will reject the registration and the participant will
                      be notified.
                    </p>
                    </div>
                )}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowApprovalModal(false);
                    setSelectedRegistration(null);
                    setApprovalNotes("");
                  }}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={processRegistration}
                  disabled={
                    processing[
                      selectedRegistration._id || selectedRegistration.id
                    ]
                  }
                  className={`flex-1 px-4 py-2 rounded-lg transition-colors duration-200 ${
                    actionType === "approve"
                      ? "bg-green-600 hover:bg-green-700 disabled:bg-gray-600"
                      : "bg-red-600 hover:bg-red-700 disabled:bg-gray-600"
                  } text-white`}
                >
                  {processing[selectedRegistration._id || selectedRegistration.id]
                    ? "Processing..."
                    : `Confirm ${
                        actionType === "approve" ? "Approval" : "Rejection"
                      }`}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminRegistrationDashboard;