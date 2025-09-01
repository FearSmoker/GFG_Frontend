import { handleRateLimitError } from "../utils/rateLimiterHandler.js";

const CONTACT_BASE_URL = "https://gfg-backend-rjtn.onrender.com/api/v1/contact";

// Submit contact form
export const submitContactForm = async (contactData) => {
  const response = await fetch(`${CONTACT_BASE_URL}/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contactData),
  });

  const data = await response.json();

  if (!response.ok) {
    if (data?.code?.startsWith("RATE_LIMIT")) {
      handleRateLimitError(data);
    }

    const error = new Error(data.message || "Failed to submit contact form");
    error.response = {
      status: response.status,
      data: data,
    };
    throw error;
  }

  return data;
};
