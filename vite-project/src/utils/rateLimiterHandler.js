import { toast } from "react-hot-toast";

export function handleRateLimitError(response) {
  if (!response) return;

  switch (response.code) {
    case "RATE_LIMIT_OTP":
      toast.error(`Too many OTP requests. Please try again after 24 hours.`);
      break;

    case "RATE_LIMIT_REGISTRATION":
      toast.error(`You've hit the registration limit for events. Please try again after 24 hours.`);
      break;

    case "RATE_LIMIT_CONTACT_FORM":
      toast.error(`You're submitting contact forms too quickly. Please try again after 1 hour.`);
      break;

    case "RATE_LIMIT_LOGIN":
      toast.error(`Too many login attempts. Please try again after 24 hours.`);
      break;

    case "RATE_LIMIT_GLOBAL":
      toast.error(`Too many requests. Please slow down. Please try again after 15 minutes.`);
      break;

    default:
      toast.error(`You are being rate-limited. Please try again later.`);
      break;
  }
}