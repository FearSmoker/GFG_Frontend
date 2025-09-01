import { handleRateLimitError } from "../utils/rateLimiterHandler.js";

const REGISTRATION_BASE_URL =
  "https://gfg-backend-rjtn.onrender.com/api/v1/registrations";

// Helper function to get auth headers with proper token validation
const getRegistrationAuthHeaders = () => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    console.error("No access token found for registration");
    throw new Error("Please log in to register for events");
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

// Register for an event
export const registerForEvent = async (eventId) => {
  try {
    const headers = getRegistrationAuthHeaders();

    const response = await fetch(
      `${REGISTRATION_BASE_URL}/register/${eventId}`,
      {
        method: "POST",
        headers,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      if (data?.code?.startsWith("RATE_LIMIT")) {
        handleRateLimitError(data);
      }

      const error = new Error(data.message || "Failed to register for event");
      error.response = {
        status: response.status,
        data: data,
      };
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Registration error:", error);

    if (
      error.message.includes("jwt malformed") ||
      error.message.includes("invalid token")
    ) {
      localStorage.removeItem("access_token");
      throw new Error("Your session has expired. Please log in again.");
    }

    throw error;
  }
};

// Cancel registration using MongoDB _id
export const cancelRegistration = async (registrationId) => {
  try {
    const headers = getRegistrationAuthHeaders();

    const response = await fetch(
      `${REGISTRATION_BASE_URL}/cancel/${registrationId}`,
      {
        method: "PUT",
        headers,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      if (data?.code?.startsWith("RATE_LIMIT")) {
        handleRateLimitError(data);
      }

      const error = new Error(data.message || "Failed to cancel registration");
      error.response = {
        status: response.status,
        data: data,
      };
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Cancel registration error:", error);

    if (
      error.message.includes("jwt malformed") ||
      error.message.includes("invalid token")
    ) {
      localStorage.removeItem("access_token");
      throw new Error("Your session has expired. Please log in again.");
    }

    throw error;
  }
};

// Get user's registrations
export const getUserRegistrations = async (params = {}) => {
  try {
    const headers = getRegistrationAuthHeaders();
    const queryParams = new URLSearchParams(params).toString();
    const url = queryParams
      ? `${REGISTRATION_BASE_URL}/my-registrations?${queryParams}`
      : `${REGISTRATION_BASE_URL}/my-registrations`;

    const response = await fetch(url, {
      method: "GET",
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      if (data?.code?.startsWith("RATE_LIMIT")) {
        handleRateLimitError(data);
      }

      const error = new Error(data.message || "Failed to fetch registrations");
      error.response = {
        status: response.status,
        data: data,
      };
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Fetch user registrations error:", error);

    if (
      error.message.includes("jwt malformed") ||
      error.message.includes("invalid token")
    ) {
      localStorage.removeItem("access_token");
      throw new Error("Your session has expired. Please log in again.");
    }

    throw error;
  }
};

// Get registration details using MongoDB _id
export const getRegistrationDetails = async (registrationId) => {
  try {
    const headers = getRegistrationAuthHeaders();

    const response = await fetch(
      `${REGISTRATION_BASE_URL}/details/${registrationId}`,
      {
        method: "GET",
        headers,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      if (data?.code?.startsWith("RATE_LIMIT")) {
        handleRateLimitError(data);
      }

      const error = new Error(
        data.message || "Failed to fetch registration details"
      );
      error.response = {
        status: response.status,
        data: data,
      };
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Fetch registration details error:", error);

    if (
      error.message.includes("jwt malformed") ||
      error.message.includes("invalid token")
    ) {
      localStorage.removeItem("access_token");
      throw new Error("Your session has expired. Please log in again.");
    }

    throw error;
  }
};
