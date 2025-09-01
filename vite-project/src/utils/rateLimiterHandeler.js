import { toast } from "react-hot-toast";

export function handleRateLimitError(response) {
  if (!response) return;

  switch (response.code) {
    case "RATE_LIMIT_OTP":
      toast.error(`Too many OTP requests. Try again in ${response.retryAfter || 60} seconds.`);
      break;

    case "RATE_LIMIT_REGISTRATION":
      toast.error(`You’ve hit the registration limit for events. Please wait ${response.retryAfter || 3600} seconds before retrying.`);
      break;

    case "RATE_LIMIT_CONTACT_FORM":
      toast.error(`You’re submitting contact forms too quickly. Please wait ${response.retryAfter || 300} seconds.`);
      break;

    case "RATE_LIMIT_LOGIN":
      toast.error(`Too many login attempts. Try again in ${response.retryAfter || 900} seconds.`);
      break;

    case "RATE_LIMIT_GLOBAL":
      toast.error(`Too many requests. Please slow down. Retry in ${response.retryAfter || 60} seconds.`);
      break;

    default:
      toast.error(`You are being rate-limited. Please wait before retrying.`);
      break;
  }
}
