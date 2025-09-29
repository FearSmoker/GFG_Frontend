import { handleRateLimitError } from "../utils/rateLimiterHandler.js";

const TEAM_BASE_URL = "https://gfg-backend-rjtn.onrender.com/api/v1/teams";

// Helper function to get auth headers with proper token validation
const getTeamAuthHeaders = () => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    console.error("No access token found for team operations");
    throw new Error("Please log in to manage teams");
  }

  const cleanToken = token.replace(/^["']|["']$/g, "").trim();

  if (!cleanToken.includes(".") || cleanToken.split(".").length !== 3) {
    console.error("Invalid token format:", cleanToken);
    localStorage.removeItem("access_token");
    throw new Error("Invalid authentication token. Please log in again.");
  }

  return {
    Authorization: `Bearer ${cleanToken}`,
    "Content-Type": "application/json",
  };
};
export const createTeam = async (teamData) => {
  try {
    const headers = getTeamAuthHeaders();

    const payload = {
      teamName: teamData.teamName,
      teamSize: teamData.teamSize,
      description: teamData.description || "",
      members: teamData.members || [],
      ...(teamData.leaderDetails && {
        leaderDetails: {
          mobile: teamData.leaderDetails.mobile,
          course: teamData.leaderDetails.course,
          year: teamData.leaderDetails.year,
        },
      }),
    };

    const response = await fetch(`${TEAM_BASE_URL}/create`, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      if (data.errors && Array.isArray(data.errors)) {
        console.error("=== VALIDATION ERRORS ===");
        data.errors.forEach((error, index) => {
          console.error(`Error ${index + 1}:`, error);
        });
      }

      if (data?.code?.startsWith("RATE_LIMIT")) {
        handleRateLimitError(data);
        return;
      }

      const error = new Error(data.message || "Failed to create team");
      error.response = {
        status: response.status,
        data: data,
      };
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Create team error:", error);

    if (
      error.message.includes("jwt malformed") ||
      error.message.includes("invalid token") ||
      error.response?.status === 401
    ) {
      localStorage.removeItem("access_token");
      throw new Error("Your session has expired. Please log in again.");
    }

    throw error;
  }
};

// Create team basic (step-by-step process)
export const createTeamBasic = async (teamData) => {
  try {
    const headers = getTeamAuthHeaders();

    const payload = {
      teamName: teamData.teamName,
      teamSize: teamData.teamSize,
      description: teamData.description || "",
    };

    const response = await fetch(`${TEAM_BASE_URL}/create-basic`, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      if (data?.code?.startsWith("RATE_LIMIT")) {
        handleRateLimitError(data);
        return;
      }

      const error = new Error(data.message || "Failed to create team");
      error.response = {
        status: response.status,
        data: data,
      };
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Create team basic error:", error);

    if (
      error.message.includes("jwt malformed") ||
      error.message.includes("invalid token") ||
      error.response?.status === 401
    ) {
      localStorage.removeItem("access_token");
      throw new Error("Your session has expired. Please log in again.");
    }

    throw error;
  }
};

// Add members to team (step 2 of basic flow)
export const addMembersToTeam = async (teamId, membersData) => {
  try {
    const headers = getTeamAuthHeaders();

    const payload = {
      members: membersData.members || membersData,
    };

    const response = await fetch(`${TEAM_BASE_URL}/${teamId}/add-members`, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      if (data?.code?.startsWith("RATE_LIMIT")) {
        handleRateLimitError(data);
        return;
      }

      const error = new Error(data.message || "Failed to add members");
      error.response = {
        status: response.status,
        data: data,
      };
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Add members to team error:", error);

    if (
      error.message.includes("jwt malformed") ||
      error.message.includes("invalid token") ||
      error.response?.status === 401
    ) {
      localStorage.removeItem("access_token");
      throw new Error("Your session has expired. Please log in again.");
    }

    throw error;
  }
};

// Complete leader details (step 3 of basic flow)
export const completeLeaderDetails = async (teamId, leaderDetails) => {
  try {
    const headers = getTeamAuthHeaders();

    const payload = {
      mobile: leaderDetails.mobile,
      course: leaderDetails.course,
      year: leaderDetails.year,
    };

    const response = await fetch(
      `${TEAM_BASE_URL}/${teamId}/complete-leader-details`,
      {
        method: "PUT",
        headers,
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      if (data?.code?.startsWith("RATE_LIMIT")) {
        handleRateLimitError(data);
        return;
      }

      const error = new Error(
        data.message || "Failed to complete leader details"
      );
      error.response = {
        status: response.status,
        data: data,
      };
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Complete leader details error:", error);

    if (
      error.message.includes("jwt malformed") ||
      error.message.includes("invalid token") ||
      error.response?.status === 401
    ) {
      localStorage.removeItem("access_token");
      throw new Error("Your session has expired. Please log in again.");
    }

    throw error;
  }
};

// Get user's teams with optional filtering
export const getUserTeams = async (params = {}) => {
  try {
    const headers = getTeamAuthHeaders();
    const queryParams = new URLSearchParams(params).toString();

    const url = queryParams
      ? `${TEAM_BASE_URL}/my-teams?${queryParams}`
      : `${TEAM_BASE_URL}/my-teams`;

    const response = await fetch(url, {
      method: "GET",
      headers,
    });

    const contentType = response.headers.get("content-type");

    if (!contentType || !contentType.includes("application/json")) {
      const textResponse = await response.text();
      console.error(
        `Received non-JSON response:`,
        textResponse.substring(0, 200)
      );
      throw new Error(
        `Server returned non-JSON response: ${textResponse.substring(0, 100)}`
      );
    }

    const data = await response.json();

    if (!response.ok) {
      if (data?.code?.startsWith("RATE_LIMIT")) {
        handleRateLimitError(data);
        return;
      }

      const error = new Error(data.message || "Failed to fetch teams");
      error.response = {
        status: response.status,
        data: data,
      };
      throw error;
    }

    if (data.data && data.data.teams) {
      data.data.teams = data.data.teams.map((team) => ({
        ...team,

        leaderId: team.leaderDetails?._id || team.leaderId,
        leaderDetails: team.leaderDetails || null,

        members:
          team.membersDetails?.map((member) => ({
            ...member,
            userId: member.userDetails?._id || member.userId,
            userDetails: member.userDetails || null,

            username: member.username,
            email: member.email,
            fullName: member.fullName,
            mobile: member.mobile,
            course: member.course,
            year: member.year,
            isLeader: member.isLeader,
            invitationStatus: member.invitationStatus,
            detailsCompleted: member.detailsCompleted,
            joinedAt: member.joinedAt,
          })) ||
          team.members ||
          [],

        activityLog:
          team.activityLog?.map((log) => ({
            ...log,
            performedBy: log.performedByDetails?._id || log.performedBy,
            performedByDetails: log.performedByDetails || null,
            targetMember: log.targetMemberDetails?._id || log.targetMember,
            targetMemberDetails: log.targetMemberDetails || null,
          })) || [],
      }));
    }

    return data;
  } catch (error) {
    console.error("=== GETUSERTEAMS API ERROR ===");
    console.error("Error details:", {
      message: error.message,
      response: error.response,
      status: error.response?.status,
      stack: error.stack,
    });

    if (
      error.message.includes("jwt malformed") ||
      error.message.includes("invalid token") ||
      error.response?.status === 401
    ) {
      localStorage.removeItem("access_token");
      throw new Error("Your session has expired. Please log in again.");
    }

    throw error;
  }
};

// Get pending team invitations
export const getPendingInvitations = async () => {
  try {
    const headers = getTeamAuthHeaders();

    const response = await fetch(`${TEAM_BASE_URL}/invitations/pending`, {
      method: "GET",
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      if (data?.code?.startsWith("RATE_LIMIT")) {
        handleRateLimitError(data);
        return;
      }

      const error = new Error(
        data.message || "Failed to fetch pending invitations"
      );
      error.response = {
        status: response.status,
        data: data,
      };
      throw error;
    }

    if (data.data && Array.isArray(data.data)) {
      data.data = data.data.map((invitation) => ({
        ...invitation,

        leader: invitation.leader || { _id: invitation.leaderId },
      }));
    }

    return data;
  } catch (error) {
    console.error("Fetch pending invitations error:", error);

    if (
      error.message.includes("jwt malformed") ||
      error.message.includes("invalid token") ||
      error.response?.status === 401
    ) {
      localStorage.removeItem("access_token");
      throw new Error("Your session has expired. Please log in again.");
    }

    throw error;
  }
};

// Respond to team invitation
export const respondToInvitation = async (teamId, responseData) => {
  try {
    const headers = getTeamAuthHeaders();

    const payload = {
      action: responseData.action,
      ...(responseData.action === "accept" &&
        responseData.memberDetails && {
          memberDetails: {
            mobile: responseData.memberDetails.mobile,
            course: responseData.memberDetails.course,
            year: responseData.memberDetails.year,
          },
        }),
    };

    const response = await fetch(
      `${TEAM_BASE_URL}/invitations/${teamId}/respond`,
      {
        method: "PUT",
        headers,
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      if (data?.code?.startsWith("RATE_LIMIT")) {
        handleRateLimitError(data);
        return;
      }

      const error = new Error(
        data.message || "Failed to respond to invitation"
      );
      error.response = {
        status: response.status,
        data: data,
      };
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Respond to invitation error:", error);

    if (
      error.message.includes("jwt malformed") ||
      error.message.includes("invalid token") ||
      error.response?.status === 401
    ) {
      localStorage.removeItem("access_token");
      throw new Error("Your session has expired. Please log in again.");
    }

    throw error;
  }
};

// Get team details
export const getTeamDetails = async (teamId) => {
  try {
    const headers = getTeamAuthHeaders();

    const response = await fetch(`${TEAM_BASE_URL}/${teamId}`, {
      method: "GET",
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      if (data?.code?.startsWith("RATE_LIMIT")) {
        handleRateLimitError(data);
        return;
      }

      const error = new Error(data.message || "Failed to fetch team details");
      error.response = {
        status: response.status,
        data: data,
      };
      throw error;
    }

    if (data.data) {
      data.data = {
        ...data.data,

        leaderId: data.data.leaderDetails || { _id: data.data.leaderId },
        members:
          data.data.membersDetails?.map((member) => ({
            ...member,
            userId: member.userDetails || { _id: member.userId },
          })) || data.data.members,

        activityLog:
          data.data.activityLog?.map((log) => ({
            ...log,
            performedBy: log.performedByDetails || { _id: log.performedBy },
            targetMember:
              log.targetMemberDetails ||
              (log.targetMember ? { _id: log.targetMember } : null),
          })) || [],
      };
    }

    return data;
  } catch (error) {
    console.error("Fetch team details error:", error);

    if (
      error.message.includes("jwt malformed") ||
      error.message.includes("invalid token") ||
      error.response?.status === 401
    ) {
      localStorage.removeItem("access_token");
      throw new Error("Your session has expired. Please log in again.");
    }

    throw error;
  }
};

// Update member details
export const updateMemberDetails = async (teamId, memberDetails) => {
  try {
    const headers = getTeamAuthHeaders();

    const payload = {
      mobile: memberDetails.mobile,
      course: memberDetails.course,
      year: memberDetails.year,
    };

    const response = await fetch(`${TEAM_BASE_URL}/${teamId}/members/details`, {
      method: "PUT",
      headers,
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      if (data?.code?.startsWith("RATE_LIMIT")) {
        handleRateLimitError(data);
        return;
      }

      const error = new Error(
        data.message || "Failed to update member details"
      );
      error.response = {
        status: response.status,
        data: data,
      };
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Update member details error:", error);

    if (
      error.message.includes("jwt malformed") ||
      error.message.includes("invalid token") ||
      error.response?.status === 401
    ) {
      localStorage.removeItem("access_token");
      throw new Error("Your session has expired. Please log in again.");
    }

    throw error;
  }
};

// Add member to team
export const addMember = async (teamId, memberData) => {
  try {
    const headers = getTeamAuthHeaders();

    const payload = {};
    if (memberData.username) {
      payload.username = memberData.username;
    }
    if (memberData.email) {
      payload.email = memberData.email;
    }

    const response = await fetch(`${TEAM_BASE_URL}/${teamId}/members`, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      if (data?.code?.startsWith("RATE_LIMIT")) {
        handleRateLimitError(data);
        return;
      }

      const error = new Error(data.message || "Failed to add member");
      error.response = {
        status: response.status,
        data: data,
      };
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Add member error:", error);

    if (
      error.message.includes("jwt malformed") ||
      error.message.includes("invalid token") ||
      error.response?.status === 401
    ) {
      localStorage.removeItem("access_token");
      throw new Error("Your session has expired. Please log in again.");
    }

    throw error;
  }
};

// Remove member from team
export const removeMember = async (teamId, memberId) => {
  try {
    const headers = getTeamAuthHeaders();

    const response = await fetch(
      `${TEAM_BASE_URL}/${teamId}/members/${memberId}`,
      {
        method: "DELETE",
        headers,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      if (data?.code?.startsWith("RATE_LIMIT")) {
        handleRateLimitError(data);
        return;
      }

      const error = new Error(data.message || "Failed to remove member");
      error.response = {
        status: response.status,
        data: data,
      };
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Remove member error:", error);

    if (
      error.message.includes("jwt malformed") ||
      error.message.includes("invalid token") ||
      error.response?.status === 401
    ) {
      localStorage.removeItem("access_token");
      throw new Error("Your session has expired. Please log in again.");
    }

    throw error;
  }
};

// Disband team
export const disbandTeam = async (teamId) => {
  try {
    const headers = getTeamAuthHeaders();

    const response = await fetch(`${TEAM_BASE_URL}/${teamId}/disband`, {
      method: "DELETE",
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      if (data?.code?.startsWith("RATE_LIMIT")) {
        handleRateLimitError(data);
        return;
      }

      const error = new Error(data.message || "Failed to delete team");
      error.response = {
        status: response.status,
        data: data,
      };
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Delete team error:", error);

    if (
      error.message.includes("jwt malformed") ||
      error.message.includes("invalid token") ||
      error.response?.status === 401
    ) {
      localStorage.removeItem("access_token");
      throw new Error("Your session has expired. Please log in again.");
    }

    throw error;
  }
};

// Get verified teams for registration
export const getVerifiedTeamsForUser = async () => {
  try {
    const headers = getTeamAuthHeaders();

    const response = await fetch(`${TEAM_BASE_URL}/verified/for-registration`, {
      method: "GET",
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      if (data?.code?.startsWith("RATE_LIMIT")) {
        handleRateLimitError(data);
        return;
      }

      const error = new Error(data.message || "Failed to fetch verified teams");
      error.response = {
        status: response.status,
        data: data,
      };
      throw error;
    }

    if (data.data && Array.isArray(data.data)) {
      data.data = data.data.map((team) => ({
        ...team,
        leader: team.leader || { _id: team.leaderId },
      }));
    }

    return data;
  } catch (error) {
    console.error("Fetch verified teams error:", error);

    if (
      error.message.includes("jwt malformed") ||
      error.message.includes("invalid token") ||
      error.response?.status === 401
    ) {
      localStorage.removeItem("access_token");
      throw new Error("Your session has expired. Please log in again.");
    }

    throw error;
  }
};

// Get user's leader teams
export const getUserLeaderTeams = async (params = {}) => {
  try {
    const headers = getTeamAuthHeaders();
    const queryParams = new URLSearchParams(params).toString();
    const url = queryParams
      ? `${TEAM_BASE_URL}/leader-teams?${queryParams}`
      : `${TEAM_BASE_URL}/leader-teams`;

    const response = await fetch(url, {
      method: "GET",
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      if (data?.code?.startsWith("RATE_LIMIT")) {
        handleRateLimitError(data);
        return;
      }

      const error = new Error(data.message || "Failed to fetch leader teams");
      error.response = {
        status: response.status,
        data: data,
      };
      throw error;
    }

    if (data.data && data.data.teams) {
      data.data.teams = data.data.teams.map((team) => ({
        ...team,

        leaderId: team.leaderDetails?._id || team.leaderId,
        leaderDetails: team.leaderDetails || null,
        members:
          team.membersDetails?.map((member) => ({
            ...member,
            userId: member.userDetails?._id || member.userId,
            userDetails: member.userDetails || null,
            username: member.username,
            email: member.email,
            fullName: member.fullName,
            mobile: member.mobile,
            course: member.course,
            year: member.year,
            isLeader: member.isLeader,
            invitationStatus: member.invitationStatus,
            detailsCompleted: member.detailsCompleted,
            joinedAt: member.joinedAt,
          })) ||
          team.members ||
          [],
      }));
    }

    return data;
  } catch (error) {
    console.error("Fetch leader teams error:", error);

    if (
      error.message.includes("jwt malformed") ||
      error.message.includes("invalid token") ||
      error.response?.status === 401
    ) {
      localStorage.removeItem("access_token");
      throw new Error("Your session has expired. Please log in again.");
    }

    throw error;
  }
};

// Get team enrollment status for event
export const getUserTeamEnrollmentStatus = async (eventId) => {
  try {
    const headers = getTeamAuthHeaders();

    const response = await fetch(
      `${TEAM_BASE_URL}/enrollment-status/${eventId}`,
      {
        method: "GET",
        headers,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      if (data?.code?.startsWith("RATE_LIMIT")) {
        handleRateLimitError(data);
        return;
      }

      const error = new Error(
        data.message || "Failed to fetch enrollment status"
      );
      error.response = {
        status: response.status,
        data: data,
      };
      throw error;
    }

    if (data.data) {
      if (data.data.verifiedTeams) {
        data.data.verifiedTeams = data.data.verifiedTeams.map((team) => ({
          ...team,
          leader: team.leader || { _id: team.leaderId },
        }));
      }

      if (data.data.teamRegistrations) {
        data.data.teamRegistrations = data.data.teamRegistrations.map(
          (reg) => ({
            ...reg,
            registeredBy: reg.registeredBy || { _id: reg.userId },
          })
        );
      }
    }

    return data;
  } catch (error) {
    console.error("Fetch enrollment status error:", error);

    if (
      error.message.includes("jwt malformed") ||
      error.message.includes("invalid token") ||
      error.response?.status === 401
    ) {
      localStorage.removeItem("access_token");
      throw new Error("Your session has expired. Please log in again.");
    }

    throw error;
  }
};

// Get team statistics
export const getTeamStats = async () => {
  try {
    const headers = getTeamAuthHeaders();

    const response = await fetch(`${TEAM_BASE_URL}/stats`, {
      method: "GET",
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      if (data?.code?.startsWith("RATE_LIMIT")) {
        handleRateLimitError(data);
        return;
      }

      const error = new Error(
        data.message || "Failed to fetch team statistics"
      );
      error.response = {
        status: response.status,
        data: data,
      };
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Fetch team stats error:", error);

    if (
      error.message.includes("jwt malformed") ||
      error.message.includes("invalid token") ||
      error.response?.status === 401
    ) {
      localStorage.removeItem("access_token");
      throw new Error("Your session has expired. Please log in again.");
    }

    throw error;
  }
};

export const leaveTeam = async (teamId) => {
  try {
    const headers = getTeamAuthHeaders();

    const response = await fetch(`${TEAM_BASE_URL}/${teamId}/leave`, {
      method: "POST",
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      if (data?.code?.startsWith("RATE_LIMIT")) {
        handleRateLimitError(data);
        return;
      }

      const error = new Error(data.message || "Failed to leave team");
      error.response = {
        status: response.status,
        data: data,
      };
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Leave team error:", error);

    if (
      error.message.includes("jwt malformed") ||
      error.message.includes("invalid token") ||
      error.response?.status === 401
    ) {
      localStorage.removeItem("access_token");
      throw new Error("Your session has expired. Please log in again.");
    }

    throw error;
  }
};

export const hideTeamFromView = async (teamId) => {
  try {
    const headers = getTeamAuthHeaders();

    const response = await fetch(`${TEAM_BASE_URL}/${teamId}/hide`, {
      method: "POST",
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      if (data?.code?.startsWith("RATE_LIMIT")) {
        handleRateLimitError(data);
        return;
      }

      const error = new Error(data.message || "Failed to hide team");
      error.response = {
        status: response.status,
        data: data,
      };
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Hide team error:", error);

    if (
      error.message.includes("jwt malformed") ||
      error.message.includes("invalid token") ||
      error.response?.status === 401
    ) {
      localStorage.removeItem("access_token");
      throw new Error("Your session has expired. Please log in again.");
    }

    throw error;
  }
};
