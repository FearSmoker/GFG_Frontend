import { toast } from "react-hot-toast";

export function handleRateLimitError(response) {
  if (!response) return;

  const retryAfter = response.retryAfter;
  const dynamicMessage = retryAfter ? `Please try again after ${retryAfter}.` : "Please try again later.";

  switch (response.code) {
    case "RATE_LIMIT_OTP":
      toast.error(response.message || `Daily OTP request limit reached. ${dynamicMessage}`);
      break;

    case "RATE_LIMIT_REGISTRATION":
      toast.error(response.message || `Daily registration limit reached. ${dynamicMessage}`);
      break;

    case "RATE_LIMIT_CONTACT_FORM":
      toast.error(response.message || `Daily contact form limit reached. ${dynamicMessage}`);
      break;

    case "RATE_LIMIT_OTP_RESEND":
      toast.error(response.message || `OTP resend limit reached. ${dynamicMessage}`);
      break;

    case "RATE_LIMIT_REGISTRATION_HOURLY":
      toast.error(response.message || `Too many registration attempts. ${dynamicMessage}`);
      break;

    case "RATE_LIMIT_CONTACT_FORM_HOURLY":
      toast.error(response.message || `Contact form submitted too frequently. ${dynamicMessage}`);
      break;

    case "RATE_LIMIT_OTP_HOURLY":
      toast.error(response.message || `Too many OTP requests. ${dynamicMessage}`);
      break;

    case "RATE_LIMIT_OTP_VERIFY":
      toast.error(response.message || `Too many OTP verification attempts. ${dynamicMessage}`);
      break;

    // Global and other limits
    case "RATE_LIMIT_GLOBAL":
      toast.error(response.message || `Too many requests. ${dynamicMessage}`);
      break;

    case "RATE_LIMIT_LOGIN":
      toast.error(response.message || `Too many login attempts. ${dynamicMessage}`);
      break;

    default:
      toast.error(response.message || `You are being rate-limited. ${dynamicMessage}`);
      break;
  }
}