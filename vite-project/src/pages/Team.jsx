import React, { useState, useEffect } from "react";
import {
  getUserTeams,
  disbandTeam,
  leaveTeam,
  hideTeamFromView,
  respondToInvitation,
  getTeamDetails,
} from "../api/Team_api";
import useAuth from "../context/AuthContext";
import useTheme from "../context/ThemeContext";
import toast from "react-hot-toast";
import OtherPage2 from "../components/OtherPage2";
import TeamRegisterCard from "../components/TeamRegisterCard.jsx";
import {
  Plus,
  Trash2,
  Users,
  Crown,
  User,
  Eye,
  AlertCircle,
  CheckCircle,
  Clock,
  Loader,
  Check,
  X,
  UserX,
} from "lucide-react";
import "../css/OtherPage2.css";

const Teams = () => {
  const { user } = useAuth();
  const { themeMode } = useTheme();
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showDeleteMode, setShowDeleteMode] = useState(false);
  const [selectedTeamsToDelete, setSelectedTeamsToDelete] = useState([]);
  const [deletingTeams, setDeletingTeams] = useState(new Set());
  const [respondingToInvitations, setRespondingToInvitations] = useState(
    new Set()
  );
  const [showTeamDetails, setShowTeamDetails] = useState(false);
  const [selectedTeamDetails, setSelectedTeamDetails] = useState(null);
  const [loadingTeamDetails, setLoadingTeamDetails] = useState(false);
  const [showMemberDetailsModal, setShowMemberDetailsModal] = useState(false);
  const [selectedInvitationTeamId, setSelectedInvitationTeamId] =
    useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0,
    hasNext: false,
    hasPrev: false,
  });

  const isLightTheme = themeMode === "light";

  useEffect(() => {
    if (user) {
      fetchTeams();
    }
  }, [user]);

  const fetchTeams = async (page = 1, status = "") => {
    try {
      setLoading(true);
      const params = { page, limit: 12 };
      if (status) params.status = status;

      const response = await getUserTeams(params);

      if (response?.success && response?.data) {
        const teamsData = response.data.teams || [];
        setTeams(teamsData);

        if (response.data.pagination) {
          setPagination(response.data.pagination);
        } else {
          setPagination({
            currentPage: page,
            totalPages: Math.ceil((teamsData.length || 0) / 12),
            total: teamsData.length || 0,
            hasNext: false,
            hasPrev: page > 1,
          });
        }
      } else {
        const teamsData =
          response?.data?.teams || response?.teams || response?.data || [];
        setTeams(Array.isArray(teamsData) ? teamsData : []);
      }
    } catch (error) {
      console.error("Fetch teams error:", error);

      if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
      } else if (error.response?.status === 500) {
        toast.error("Server error. Please try again later.");
      } else if (error.message.includes("Network Error")) {
        toast.error("Network error. Please check your connection.");
      } else {
        toast.error(error.message || "Failed to fetch teams");
      }

      setTeams([]);
      setPagination({
        currentPage: 1,
        totalPages: 1,
        total: 0,
        hasNext: false,
        hasPrev: false,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTeam = async (teamId) => {
    const team = teams.find((t) => t._id === teamId);
    if (!team) {
      toast.error("Team not found");
      return;
    }

    // Confirmation dialog based on role
    let confirmMessage = "";
    if (team.userRole === "leader") {
      confirmMessage = `Are you sure you want to permanently DELETE the team "${team.teamName}"?\n\nThis action cannot be undone and will remove the team from the database.`;
    } else if (team.teamStatus === "disbanded") {
      confirmMessage = `Remove "${team.teamName}" from your view?\n\nYou can always access this team again later if needed.`;
    } else {
      confirmMessage = `Are you sure you want to LEAVE the team "${team.teamName}"?\n\nLeaving will cause the team to be disbanded. This action cannot be undone.`;
    }

    if (!window.confirm(confirmMessage)) {
      return;
    }

    try {
      setDeletingTeams((prev) => new Set(prev).add(teamId));

      let response;
      let successMessage;

      if (team.userRole === "leader") {
        response = await disbandTeam(teamId);
        successMessage = "Team permanently deleted";
      } else {
        if (team.teamStatus === "disbanded") {
          response = await hideTeamFromView(teamId);
          successMessage = "Team removed from view";
        } else {
          response = await leaveTeam(teamId);
          successMessage = "You left the team. Team has been disbanded.";
        }
      }

      if (response?.success || response?.data) {
        toast.success(successMessage);
        setTeams((prevTeams) => prevTeams.filter((t) => t._id !== teamId));
        setSelectedTeamsToDelete((prev) => prev.filter((id) => id !== teamId));
        setPagination((prev) => ({
          ...prev,
          total: Math.max(0, prev.total - 1),
        }));
      } else {
        toast.error("Failed to perform action");
      }
    } catch (error) {
      console.error("Team action error:", error);

      if (error.response?.status === 403) {
        toast.error("You don't have permission to perform this action");
      } else if (error.response?.status === 404) {
        toast.error("Team not found");
      } else if (error.response?.status === 400) {
        toast.error(error.message || "Cannot perform this action");
      } else {
        toast.error(error.message || "Failed to perform action");
      }
    } finally {
      setDeletingTeams((prev) => {
        const newSet = new Set(prev);
        newSet.delete(teamId);
        return newSet;
      });
    }
  };

  const handleInvitationResponse = async (
    teamId,
    action,
    memberDetails = null
  ) => {
    try {
      setRespondingToInvitations((prev) => new Set(prev).add(teamId));
      const payload = { action };
      if (action === "accept" && memberDetails) {
        payload.memberDetails = memberDetails;
      }

      const response = await respondToInvitation(teamId, payload);

      if (response?.success || response?.data) {
        toast.success(`Invitation ${action}ed successfully!`);
        fetchTeams(pagination.currentPage);
      } else {
        toast.error(`Failed to ${action} invitation`);
      }
    } catch (error) {
      console.error(`${action} invitation error:`, error);

      if (error.response?.status === 400) {
        toast.error(error.message || `Cannot ${action} invitation`);
      } else if (error.response?.status === 404) {
        toast.error("Team or invitation not found");
      } else {
        toast.error(error.message || `Failed to ${action} invitation`);
      }
    } finally {
      setRespondingToInvitations((prev) => {
        const newSet = new Set(prev);
        newSet.delete(teamId);
        return newSet;
      });
    }
  };

  const handleViewTeamDetails = async (teamId) => {
    try {
      setLoadingTeamDetails(true);
      const response = await getTeamDetails(teamId);

      if (response?.success && response?.data) {
        setSelectedTeamDetails(response.data);
        setShowTeamDetails(true);
      } else {
        toast.error("Failed to fetch team details");
      }
    } catch (error) {
      console.error("Fetch team details error:", error);
      toast.error(error.message || "Failed to fetch team details");
    } finally {
      setLoadingTeamDetails(false);
    }
  };

  const handleAcceptInvitation = (teamId) => {
    setSelectedInvitationTeamId(teamId);
    setShowMemberDetailsModal(true);
  };

  const handleMemberDetailsSubmit = async (memberDetails) => {
    if (selectedInvitationTeamId) {
      await handleInvitationResponse(
        selectedInvitationTeamId,
        "accept",
        memberDetails
      );
      setShowMemberDetailsModal(false);
      setSelectedInvitationTeamId(null);
    }
  };

  const MemberDetailsModal = () => {
    const [memberDetails, setMemberDetails] = useState({
      mobile: "",
      course: "",
      year: "",
    });

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

    const handleSubmit = (e) => {
      e.preventDefault();
      if (
        !memberDetails.mobile ||
        !memberDetails.course ||
        !memberDetails.year
      ) {
        toast.error("Please fill all required fields");
        return;
      }
      handleMemberDetailsSubmit(memberDetails);
    };

    const handleClose = () => {
      setShowMemberDetailsModal(false);
      setSelectedInvitationTeamId(null);
      setMemberDetails({ mobile: "", course: "", year: "" });
    };

    if (!showMemberDetailsModal) return null;

    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-gray-800 rounded-2xl p-6 shadow-2xl backdrop-blur-sm border border-gray-700/50 w-full max-w-md">
          <h3 className="text-xl font-bold text-white mb-4">
            Complete Your Details
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Mobile Number *
              </label>
              <input
                type="tel"
                required
                placeholder="Enter 10-digit mobile number"
                pattern="[0-9]{10}"
                maxLength={10}
                value={memberDetails.mobile}
                onChange={(e) =>
                  setMemberDetails((prev) => ({
                    ...prev,
                    mobile: e.target.value,
                  }))
                }
                className="w-full p-3 text-sm rounded-xl bg-gray-700/70 text-white border border-gray-600/50 focus:border-green-400 focus:ring-2 focus:ring-green-400/20 focus:outline-none transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Course *
              </label>
              <select
                required
                value={memberDetails.course}
                onChange={(e) =>
                  setMemberDetails((prev) => ({
                    ...prev,
                    course: e.target.value,
                  }))
                }
                className="w-full p-3 text-sm rounded-xl bg-gray-700/70 text-white border border-gray-600/50 focus:border-green-400 focus:ring-2 focus:ring-green-400/20 focus:outline-none transition-all duration-300"
              >
                <option value="">Select course</option>
                {branches.map((branch) => (
                  <option key={branch} value={branch}>
                    {branch}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Year *
              </label>
              <select
                required
                value={memberDetails.year}
                onChange={(e) =>
                  setMemberDetails((prev) => ({
                    ...prev,
                    year: e.target.value,
                  }))
                }
                className="w-full p-3 text-sm rounded-xl bg-gray-700/70 text-white border border-gray-600/50 focus:border-green-400 focus:ring-2 focus:ring-green-400/20 focus:outline-none transition-all duration-300"
              >
                <option value="">Select year</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>
            </div>
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 bg-gray-600/80 hover:bg-gray-700 text-white font-medium py-3 px-4 text-sm rounded-xl transition-all duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-4 text-sm rounded-xl transition-all duration-300"
              >
                Accept & Join
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const getTeamStatusBadge = (team) => {
    const statusConfig = {
      forming: {
        color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
        text: "Forming",
        icon: Clock,
      },
      leader_pending_details: {
        color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
        text: "Leader Details Pending",
        icon: AlertCircle,
      },
      members_pending: {
        color: "bg-orange-500/20 text-orange-400 border-orange-500/30",
        text: "Members Pending",
        icon: Clock,
      },
      verified: {
        color: "bg-green-500/20 text-green-400 border-green-500/30",
        text: "Team Verified",
        icon: CheckCircle,
      },
      disbanded: {
        color: "bg-red-500/20 text-red-400 border-red-500/30",
        text: "Team Disbanded",
        icon: AlertCircle,
      },
    };

    const config = statusConfig[team.teamStatus] || statusConfig.forming;
    const IconComponent = config.icon;

    // Check if current user has specific member status for additional badges
    const currentUserMember =
      team.userMemberInfo ||
      team.members?.find(
        (member) =>
          member.userId === user?._id ||
          member.userId?.toString() === user?._id?.toString()
      );

    return (
      <div className="flex flex-wrap gap-1">
        <span
          className={`px-2 py-1 rounded-full text-xs border flex items-center gap-1 ${config.color}`}
        >
          <IconComponent size={12} />
          {config.text}
        </span>

        {/* Additional member-specific status badges */}
        {currentUserMember &&
          currentUserMember.invitationStatus === "declined" && (
            <span className="px-2 py-1 rounded-full text-xs border bg-red-600/20 text-red-400 border-red-600/30 flex items-center gap-1">
              <X size={10} />
              Declined
            </span>
          )}

        {currentUserMember && currentUserMember.hasLeftTeam && (
          <span className="px-2 py-1 rounded-full text-xs border bg-gray-600/20 text-gray-400 border-gray-600/30 flex items-center gap-1">
            <UserX size={10} />
            Left
          </span>
        )}

        {team.teamStatus === "disbanded" && team.disbandedReason && (
          <span className="px-2 py-1 rounded-full text-xs border bg-orange-600/20 text-orange-400 border-orange-600/30 flex items-center gap-1">
            <AlertCircle size={10} />
            {team.disbandedReason === "member_left"
              ? "Member Left"
              : "Disbanded"}
          </span>
        )}
      </div>
    );
  };

  const getNextActionMessage = (team) => {
    const actionMessages = {
      add_members: "Add team members to continue",
      complete_details: "Complete your profile details",
      respond_invitation: "Respond to team invitation",
      team_ready: "Team is ready for events",
      none: "",
    };
    return actionMessages[team.nextAction] || "";
  };

  const handleTeamCreated = () => {
    fetchTeams(1);
    setShowCreateForm(false);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchTeams(newPage);
    }
  };

  const canPerformTeamAction = (team) => {
    if (team.userRole === "leader") {
      return {
        canAct: true,
        action: "delete",
        actionText: "Delete Team",
        actionIcon: Trash2,
        actionColor: "red",
        description: "Permanently delete team from database",
      };
    }

    if (team.userRole === "member") {
      if (team.teamStatus === "disbanded") {
        return {
          canAct: true,
          action: "hide",
          actionText: "Remove from View",
          actionIcon: UserX,
          actionColor: "gray",
          description: "Hide this disbanded team from your list",
        };
      } else {
        return {
          canAct: true,
          action: "leave",
          actionText: "Leave Team",
          actionIcon: UserX,
          actionColor: "orange",
          description: "Leave team (will disband the team)",
        };
      }
    }

    return {
      canAct: false,
      action: null,
      actionText: "",
      actionIcon: null,
      actionColor: null,
      description: "",
    };
  };

  const getLeaderInfo = (team) => {
    if (team.leaderDetails) return team.leaderDetails;
    else if (team.leaderId && typeof team.leaderId === "object")
      return team.leaderId;
    return {
      _id: team.leaderId,
      username: "Unknown",
      fullName: "Unknown Leader",
    };
  };

  const getMemberCount = (team) => {
    if (team.currentMemberCount !== undefined) return team.currentMemberCount;
    if (team.members && Array.isArray(team.members)) {
      return team.members.filter(
        (member) => member.invitationStatus === "accepted"
      ).length;
    }
    return 1;
  };

  const hasPendingInvitation = (team) => {
    if (team.userRole !== "member") return false;
    const userMember =
      team.userMemberInfo ||
      team.members?.find(
        (member) =>
          member.userId === user?._id ||
          member.userId?.toString() === user?._id?.toString()
      );
    return userMember?.invitationStatus === "pending";
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <OtherPage2 />
        <div className="text-white text-xl">Please login to view teams</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <OtherPage2 />
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-400 mb-4"></div>
          <div className="text-white text-xl">Loading teams...</div>
        </div>
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
            My Teams
          </span>
          <span
            className={`${isLightTheme ? "text-[#2195DE]" : "text-[#0065A5]"}`}
          >
            &gt;
          </span>
        </h1>

        {teams.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-800/50 rounded-xl p-4 backdrop-blur-sm border border-gray-700/50">
              <h3 className="text-gray-400 text-sm">Total Teams</h3>
              <p className="text-2xl font-bold text-white">
                {pagination.total}
              </p>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-4 backdrop-blur-sm border border-gray-700/50">
              <h3 className="text-gray-400 text-sm">As Leader</h3>
              <p className="text-2xl font-bold text-yellow-400">
                {teams.filter((team) => team.userRole === "leader").length}
              </p>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-4 backdrop-blur-sm border border-gray-700/50">
              <h3 className="text-gray-400 text-sm">As Member</h3>
              <p className="text-2xl font-bold text-blue-400">
                {teams.filter((team) => team.userRole === "member").length}
              </p>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-4 backdrop-blur-sm border border-gray-700/50">
              <h3 className="text-gray-400 text-sm">Verified</h3>
              <p className="text-2xl font-bold text-green-400">
                {teams.filter((team) => team.teamStatus === "verified").length}
              </p>
            </div>
          </div>
        )}

        <div className="flex gap-4 mb-8 justify-center">
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2 shadow-lg hover:shadow-green-500/25"
          >
            <Plus size={20} />
            Create Team
          </button>
          <button
            onClick={() => setShowDeleteMode(!showDeleteMode)}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2 shadow-lg ${
              showDeleteMode
                ? "bg-red-600 hover:bg-red-700 text-white hover:shadow-red-500/25"
                : "bg-gray-600 hover:bg-gray-700 text-white hover:shadow-gray-500/25"
            }`}
          >
            <Trash2 size={20} />
            {showDeleteMode ? "Cancel" : "Manage Teams"}
          </button>
        </div>

        {teams.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {teams.map((team) => {
                const leaderInfo = getLeaderInfo(team);
                const memberCount = getMemberCount(team);
                const isDeleting = deletingTeams.has(team._id);
                const isRespondingToInvitation = respondingToInvitations.has(
                  team._id
                );
                const hasPendingInv = hasPendingInvitation(team);
                const teamAction = canPerformTeamAction(team);

                return (
                  <div
                    key={team._id}
                    className={`bg-gray-800 rounded-2xl p-6 shadow-2xl backdrop-blur-sm border border-gray-700/50 transition-all duration-300 hover:transform hover:scale-105 hover:border-gray-600/50 ${
                      selectedTeamsToDelete.includes(team._id)
                        ? "ring-2 ring-red-500 border-red-500/50"
                        : ""
                    } ${
                      isDeleting || isRespondingToInvitation ? "opacity-50" : ""
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <h3
                          className="text-xl font-bold text-white truncate"
                          title={team.teamName}
                        >
                          {team.teamName}
                        </h3>
                        {team.userRole === "leader" ? (
                          <Crown
                            size={18}
                            className="text-yellow-400 flex-shrink-0"
                            title="Team Leader"
                          />
                        ) : (
                          <User
                            size={18}
                            className="text-blue-400 flex-shrink-0"
                            title="Team Member"
                          />
                        )}
                      </div>

                      {showDeleteMode && teamAction.canAct && (
                        <div className="relative group">
                          <button
                            onClick={() => {
                              if (selectedTeamsToDelete.includes(team._id)) {
                                setSelectedTeamsToDelete((prev) =>
                                  prev.filter((id) => id !== team._id)
                                );
                              } else {
                                setSelectedTeamsToDelete((prev) => [
                                  ...prev,
                                  team._id,
                                ]);
                              }
                            }}
                            disabled={isDeleting}
                            className={`p-2 rounded-lg transition-all duration-200 flex-shrink-0 ${
                              selectedTeamsToDelete.includes(team._id)
                                ? `bg-${teamAction.actionColor}-600 text-white`
                                : `bg-gray-700 text-gray-400 hover:bg-${teamAction.actionColor}-600 hover:text-white`
                            } ${
                              isDeleting ? "cursor-not-allowed opacity-50" : ""
                            }`}
                            title={teamAction.actionText}
                          >
                            {isDeleting ? (
                              <Loader size={16} className="animate-spin" />
                            ) : (
                              <teamAction.actionIcon size={16} />
                            )}
                          </button>

                          <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block z-10">
                            <div className="bg-gray-900 text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap shadow-xl border border-gray-700">
                              <p className="font-semibold">
                                {teamAction.actionText}
                              </p>
                              <p className="text-gray-400 text-[10px] mt-1">
                                {teamAction.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">Role:</span>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1 ${
                            team.userRole === "leader"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-blue-500/20 text-blue-400"
                          }`}
                        >
                          {team.userRole === "leader" ? (
                            <>
                              <Crown size={12} />
                              Leader
                            </>
                          ) : (
                            <>
                              <User size={12} />
                              Member
                            </>
                          )}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">Status:</span>
                        {getTeamStatusBadge(team)}
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">Size:</span>
                        <span className="text-white font-medium flex items-center gap-1">
                          <Users size={14} />
                          {memberCount}/{team.teamSize}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">Team ID:</span>
                        <span className="text-green-400 font-mono font-bold text-sm bg-green-500/10 px-2 py-1 rounded">
                          {team._id.slice(-8).toUpperCase()}
                        </span>
                      </div>

                      {team.userRole === "member" && leaderInfo && (
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400 text-sm">Leader:</span>
                          <span className="text-yellow-400 text-sm font-medium">
                            {leaderInfo.fullName ||
                              leaderInfo.username ||
                              "Unknown"}
                          </span>
                        </div>
                      )}

                      {team.description && (
                        <div className="mt-3">
                          <span className="text-gray-400 text-sm">
                            Description:
                          </span>
                          <p className="text-gray-300 text-sm mt-1 line-clamp-2">
                            {team.description}
                          </p>
                        </div>
                      )}

                      {team.nextAction &&
                        team.nextAction !== "none" &&
                        team.nextAction !== "team_ready" && (
                          <div className="mt-3 p-2 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                            <p className="text-blue-400 text-xs flex items-center gap-1">
                              <AlertCircle size={12} />
                              {getNextActionMessage(team)}
                            </p>
                          </div>
                        )}
                    </div>

                    <div className="space-y-2">
                      {hasPendingInv ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              handleInvitationResponse(team._id, "decline")
                            }
                            disabled={isRespondingToInvitation}
                            className={`flex-1 py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg ${
                              isRespondingToInvitation
                                ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                                : "bg-red-600 hover:bg-red-700 text-white hover:shadow-red-500/25"
                            }`}
                          >
                            {isRespondingToInvitation ? (
                              <Loader size={16} className="animate-spin" />
                            ) : (
                              <X size={16} />
                            )}
                            Decline
                          </button>
                          <button
                            onClick={() => handleAcceptInvitation(team._id)}
                            disabled={isRespondingToInvitation}
                            className={`flex-1 py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg ${
                              isRespondingToInvitation
                                ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                                : "bg-green-600 hover:bg-green-700 text-white hover:shadow-green-500/25"
                            }`}
                          >
                            <Check size={16} />
                            Accept
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleViewTeamDetails(team._id)}
                          disabled={
                            isDeleting ||
                            isRespondingToInvitation ||
                            loadingTeamDetails
                          }
                          className={`w-full py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg ${
                            isDeleting ||
                            isRespondingToInvitation ||
                            loadingTeamDetails
                              ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                              : "bg-blue-600 hover:bg-blue-700 text-white hover:shadow-blue-500/25"
                          }`}
                        >
                          {loadingTeamDetails ? (
                            <Loader size={16} className="animate-spin" />
                          ) : (
                            <Eye size={16} />
                          )}
                          {loadingTeamDetails ? "Loading..." : "View Details"}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {pagination.totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={!pagination.hasPrev || loading}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    pagination.hasPrev && !loading
                      ? "bg-gray-700 hover:bg-gray-600 text-white"
                      : "bg-gray-800 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Previous
                </button>

                <div className="flex items-center gap-1">
                  {Array.from(
                    { length: Math.min(5, pagination.totalPages) },
                    (_, i) => {
                      let pageNum;
                      if (pagination.totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (pagination.currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (
                        pagination.currentPage >=
                        pagination.totalPages - 2
                      ) {
                        pageNum = pagination.totalPages - 4 + i;
                      } else {
                        pageNum = pagination.currentPage - 2 + i;
                      }

                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          disabled={loading}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                            pagination.currentPage === pageNum
                              ? "bg-green-600 text-white"
                              : "bg-gray-700 hover:bg-gray-600 text-white"
                          } ${loading ? "cursor-not-allowed opacity-50" : ""}`}
                        >
                          {pageNum}
                        </button>
                      );
                    }
                  )}
                </div>

                <button
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={!pagination.hasNext || loading}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    pagination.hasNext && !loading
                      ? "bg-gray-700 hover:bg-gray-600 text-white"
                      : "bg-gray-800 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <div className="bg-gray-800/30 rounded-2xl p-8 backdrop-blur-sm border border-gray-700/30 max-w-md mx-auto">
              <Users size={64} className="text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                No Teams Yet
              </h3>
              <p className="text-gray-400 mb-6">
                Create your first team to get started with collaborative events
                and competitions!
              </p>
              <button
                onClick={() => setShowCreateForm(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto shadow-lg hover:shadow-green-500/25"
              >
                <Plus size={20} />
                Create Your First Team
              </button>
            </div>
          </div>
        )}

        {showDeleteMode && selectedTeamsToDelete.length > 0 && (
          <div className="fixed bottom-6 right-6 bg-gray-800 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-4 backdrop-blur-sm border border-gray-700/50 z-50">
            <span className="font-medium">
              {selectedTeamsToDelete.length} team(s) selected
            </span>
            <button
              onClick={() => {
                const selectedTeams = teams.filter((team) =>
                  selectedTeamsToDelete.includes(team._id)
                );
                const leaderDeletes = selectedTeams.filter(
                  (team) => team.userRole === "leader"
                ).length;
                const memberLeaves = selectedTeams.filter(
                  (team) =>
                    team.userRole === "member" &&
                    team.teamStatus !== "disbanded"
                ).length;
                const memberHides = selectedTeams.filter(
                  (team) =>
                    team.userRole === "member" &&
                    team.teamStatus === "disbanded"
                ).length;

                let confirmMessage =
                  "Are you sure you want to perform these actions?\n\n";
                if (leaderDeletes > 0)
                  confirmMessage += `• Permanently DELETE ${leaderDeletes} team(s) as leader\n`;
                if (memberLeaves > 0)
                  confirmMessage += `• LEAVE ${memberLeaves} team(s) (will disband them)\n`;
                if (memberHides > 0)
                  confirmMessage += `• Hide ${memberHides} disbanded team(s) from view\n`;
                confirmMessage +=
                  "\nNote: Leader deletions and team leaves cannot be undone.";

                if (window.confirm(confirmMessage)) {
                  Promise.all(
                    selectedTeamsToDelete.map((teamId) =>
                      handleDeleteTeam(teamId)
                    )
                  ).then(() => {
                    setSelectedTeamsToDelete([]);
                    setShowDeleteMode(false);
                  });
                }
              }}
              disabled={selectedTeamsToDelete.some((id) =>
                deletingTeams.has(id)
              )}
              className={`px-5 py-2.5 rounded-lg transition-all duration-200 font-semibold flex items-center gap-2 ${
                selectedTeamsToDelete.some((id) => deletingTeams.has(id))
                  ? "bg-gray-600/50 cursor-not-allowed opacity-50"
                  : "bg-red-600 hover:bg-red-700 shadow-lg hover:shadow-red-500/25"
              }`}
            >
              {selectedTeamsToDelete.some((id) => deletingTeams.has(id)) ? (
                <>
                  <Loader size={16} className="animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Trash2 size={16} />
                  Execute Actions
                </>
              )}
            </button>
          </div>
        )}

        <TeamRegisterCard
          isOpen={showCreateForm}
          onClose={() => setShowCreateForm(false)}
          user={user}
          onTeamCreated={handleTeamCreated}
        />

        {showTeamDetails && selectedTeamDetails && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-2xl p-6 shadow-2xl backdrop-blur-sm border border-gray-700/50 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text">
                  Team Details
                </h3>
                <button
                  onClick={() => {
                    setShowTeamDetails(false);
                    setSelectedTeamDetails(null);
                  }}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-700/30 rounded-xl p-6 backdrop-blur-sm border border-gray-600/20">
                  <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <Users size={20} />
                    Team Information
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="text-gray-400 text-sm">Team Name:</span>
                      <p className="text-white font-semibold text-lg">
                        {selectedTeamDetails.teamName}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Team Size:</span>
                      <p className="text-white font-semibold">
                        {selectedTeamDetails.currentMemberCount ||
                          getMemberCount(selectedTeamDetails)}
                        /{selectedTeamDetails.teamSize}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Status:</span>
                      <div className="mt-1">
                        {getTeamStatusBadge(selectedTeamDetails)}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Team ID:</span>
                      <p className="text-green-400 font-mono font-bold bg-green-500/10 px-2 py-1 rounded inline-block mt-1">
                        {selectedTeamDetails._id.slice(-8).toUpperCase()}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Your Role:</span>
                      <span
                        className={`px-2 py-1 rounded text-sm font-medium flex items-center gap-1 w-fit mt-1 ${
                          selectedTeamDetails.userRole === "leader"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-blue-500/20 text-blue-400"
                        }`}
                      >
                        {selectedTeamDetails.userRole === "leader" ? (
                          <>
                            <Crown size={14} />
                            Leader
                          </>
                        ) : (
                          <>
                            <User size={14} />
                            Member
                          </>
                        )}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Created At:</span>
                      <p className="text-white font-medium">
                        {new Date(
                          selectedTeamDetails.createdAt
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  {selectedTeamDetails.description && (
                    <div className="mt-4">
                      <span className="text-gray-400 text-sm">
                        Description:
                      </span>
                      <p className="text-white mt-1 p-3 bg-gray-800/50 rounded-lg">
                        {selectedTeamDetails.description}
                      </p>
                    </div>
                  )}
                </div>

                <div className="bg-gray-700/30 rounded-xl p-6 backdrop-blur-sm border border-gray-600/20">
                  <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <Users size={20} />
                    Team Members (
                    {selectedTeamDetails.members
                      ? selectedTeamDetails.members.length
                      : 0}
                    )
                  </h4>

                  <div className="space-y-4">
                    {selectedTeamDetails.members &&
                      selectedTeamDetails.members.map((member, index) => (
                        <div
                          key={member.userId || index}
                          className="bg-gray-800/50 rounded-lg p-4"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                  member.isLeader
                                    ? "bg-yellow-500/20 text-yellow-400"
                                    : "bg-blue-500/20 text-blue-400"
                                }`}
                              >
                                {member.isLeader ? (
                                  <Crown size={20} />
                                ) : (
                                  <User size={20} />
                                )}
                              </div>

                              <div>
                                <h5 className="text-white font-semibold">
                                  {member.fullName ||
                                    member.username ||
                                    (member.userDetails &&
                                      member.userDetails.username) ||
                                    "Name"}
                                </h5>
                                <p className="text-gray-400 text-sm">
                                  {member.isLeader &&
                                  selectedTeamDetails.members.filter(
                                    (m) => m.isLeader
                                  ).length === 1
                                    ? "Team Leader"
                                    : !member.isLeader &&
                                      selectedTeamDetails.members.filter(
                                        (m) => m.isLeader
                                      ).length >= 1
                                    ? "Team Member"
                                    : index === 0
                                    ? "Team Leader"
                                    : "Team Member"}
                                </p>
                              </div>
                            </div>

                            {member.invitationStatus === "pending" && (
                              <div className="text-right">
                                <span className="px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 border bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                                  <Clock size={14} />
                                  Pending
                                </span>
                              </div>
                            )}
                          </div>

                          {member.invitationStatus === "accepted" && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                              {member.mobile && (
                                <div>
                                  <span className="text-gray-400">Mobile:</span>
                                  <p className="text-white font-medium">
                                    {member.mobile}
                                  </p>
                                </div>
                              )}
                              {member.course && (
                                <div>
                                  <span className="text-gray-400">Course:</span>
                                  <p className="text-white font-medium">
                                    {member.course}
                                  </p>
                                </div>
                              )}
                              {member.year && (
                                <div>
                                  <span className="text-gray-400">Year:</span>
                                  <p className="text-white font-medium">
                                    {member.year}
                                  </p>
                                </div>
                              )}
                            </div>
                          )}

                          {member.email && (
                            <div className="mt-2 text-sm">
                              <span className="text-gray-400">Email:</span>
                              <p className="text-white font-medium">
                                {member.email}
                              </p>
                            </div>
                          )}

                          {member.joinedAt && (
                            <div className="mt-2 text-sm">
                              <span className="text-gray-400">Joined:</span>
                              <p className="text-white font-medium">
                                {new Date(member.joinedAt).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  }
                                )}
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                </div>

                {selectedTeamDetails.nextAction &&
                  selectedTeamDetails.nextAction !== "none" &&
                  selectedTeamDetails.nextAction !== "team_ready" && (
                    <div className="bg-blue-900/20 rounded-xl p-4 backdrop-blur-sm border border-blue-500/20">
                      <h5 className="text-blue-400 font-medium mb-2 flex items-center gap-2">
                        <AlertCircle size={16} />
                        Next Action Required
                      </h5>
                      <p className="text-blue-300 text-sm">
                        {getNextActionMessage(selectedTeamDetails)}
                      </p>
                    </div>
                  )}
              </div>
            </div>
          </div>
        )}

        <MemberDetailsModal />
      </div>
    </div>
  );
};

export default Teams;
