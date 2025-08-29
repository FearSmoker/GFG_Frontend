import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { registerUser, verifyEmailOTP, resendOTP } from "../api/User_api";
import useAuth from "../context/AuthContext.jsx";
import OtherPage1 from "../components/OtherPage1.jsx";
import RegisterCard from "../components/RegisterCard.jsx";
import VerificationCard from "../components/VerificationCard.jsx";
import "../css/OtherPage1.css";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    avatar: "",
    mobileNo: "",
  });
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [registering, setRegistering] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [otp, setOtp] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [backendError, setBackendError] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      toast.error("User already signed in");
      navigate("/");
    }
  }, [loading, isAuthenticated, navigate]);

  useEffect(() => {
    if (showVerification && !loading && isAuthenticated) {
      toast.error("User already signed in");
      navigate("/");
    }
  }, [showVerification, isAuthenticated, loading, navigate]);

  useEffect(() => {
    const hasRequiredData =
      formData.email && formData.fullName && formData.username;

    if (showVerification && !hasRequiredData) {
      toast.error("Please register first to access verification");
      setShowVerification(false);
      navigate("/register", { replace: true });
    }
  }, [
    showVerification,
    formData.email,
    formData.fullName,
    formData.username,
    navigate,
  ]);

  if (loading || isAuthenticated) {
    return null;
  }

  const maskEmail = (email) => {
    const [localPart, domain] = email.split("@");
    const maskedLocal = localPart.substring(0, 4) + "xxx";
    return `${maskedLocal}@${domain}`;
  };

  const handleChange = (e) => {
    if (e.target.name === "avatar") {
      const file = e.target.files[0];
      setFormData({ ...formData, avatar: file || "" });

      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setAvatarPreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setAvatarPreview(null);
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
    setBackendError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRegistering(true);

    const body = new FormData();
    body.append("fullName", formData.fullName);
    body.append("email", formData.email);
    body.append("username", formData.username);
    body.append("password", formData.password);
    body.append("mobileNo", formData.mobileNo);

    if (formData.avatar) {
      body.append("avatar", formData.avatar);
    } else {
      const response = await fetch(
        "https://cdn-icons-png.flaticon.com/512/149/149071.png"
      );
      const blob = await response.blob();
      const defaultFile = new File([blob], "default-avatar.png", {
        type: blob.type,
      });
      body.append("avatar", defaultFile);
    }

    try {
      await registerUser(body);
      toast.success(`OTP sent successfully to ${maskEmail(formData.email)}`);
      setShowVerification(true);
    } catch (err) {
      toast.error(err.message || "Registration failed. Please try again.");
    } finally {
      setRegistering(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setVerifying(true);
    setBackendError("");

    try {
      await verifyEmailOTP(formData.email, otp);
      toast.success("Registration completed successfully!");
      navigate("/signin");
    } catch (err) {
      setBackendError(err.message || "OTP verification failed");
      toast.error("Registration failed. Invalid or expired OTP.");
    } finally {
      setVerifying(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      await resendOTP(formData.email);
      toast.success(`OTP sent successfully to ${maskEmail(formData.email)}`);
      setOtp("");
      setBackendError("");
    } catch (err) {
      toast.error(err.message || "Failed to resend OTP");
    }
  };

  return (
    <>
      <OtherPage1 />
      <div className="otherpage1-content min-h-screen flex items-center justify-center p-8 py-32">
        {!showVerification ? (
          <RegisterCard
            formData={formData}
            avatarPreview={avatarPreview}
            registering={registering}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        ) : (
          <VerificationCard
            otp={otp}
            verifying={verifying}
            backendError={backendError}
            handleChange={handleOtpChange}
            handleSubmit={handleOtpSubmit}
            handleResendOtp={handleResendOtp}
            userEmail={maskEmail(formData.email)}
          />
        )}
      </div>
    </>
  );
};

export default Register;
