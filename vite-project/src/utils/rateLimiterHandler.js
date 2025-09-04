import { toast } from "react-hot-toast";

let lastToastTime = 0;
let lastToastMessage = "";

export function handleRateLimitError(response) {
  if (!response) return;

  const now = Date.now();
  const retryAfter = response.retryAfter || "some time";
  
  let message = "";

  switch (response.code) {
    case "RATE_LIMIT_OTP":
      message = `OTP request limit reached. Please try again after ${retryAfter}.`;
      break;

    case "RATE_LIMIT_REGISTRATION":
      message = `Registration limit reached. Please try again after ${retryAfter}.`;
      break;

    case "RATE_LIMIT_CONTACT_FORM":
      message = `Contact form limit reached. Please try again after ${retryAfter}.`;
      break;

    case "RATE_LIMIT_OTP_RESEND":
      message = `OTP resend limit reached. Please try again after ${retryAfter}.`;
      break;

    case "RATE_LIMIT_REGISTRATION_HOURLY":
      message = `Registration limit reached. Please try again after ${retryAfter}.`;
      break;

    case "RATE_LIMIT_CONTACT_FORM_HOURLY":
      message = `Contact form limit reached. Please try again after ${retryAfter}.`;
      break;

    case "RATE_LIMIT_OTP_HOURLY":
      message = `OTP request limit reached. Please try again after ${retryAfter}.`;
      break;

    case "RATE_LIMIT_OTP_VERIFY":
      message = `OTP verification limit reached. Please try again after ${retryAfter}.`;
      break;

    case "RATE_LIMIT_GLOBAL":
      message = `Too many requests. Please try again after ${retryAfter}.`;
      break;

    case "RATE_LIMIT_LOGIN":
      message = `Login attempt limit reached. Please try again after ${retryAfter}.`;
      break;

    default:
      message = `Rate limit reached. Please try again after ${retryAfter}.`;
      break;
  }

  if (now - lastToastTime < 2000 && lastToastMessage === message) {
    return;
  }

  lastToastTime = now;
  lastToastMessage = message;
  toast.error(message);
}