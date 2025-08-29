import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { changePassword } from "../api/User_api";
import useAuth from "../context/AuthContext.jsx";
import ChangePasswordCard from "../components/ChangePasswordCard.jsx";
import OtherPage3 from "../components/OtherPage3.jsx";
import "../css/OtherPage3.css";

const ChangePassword = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please login to access this page");
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    if (!formData.currentPassword.trim()) {
      toast.error("Current password is required");
      return false;
    }

    if (!formData.newPassword) {
      toast.error("New password is required");
      return false;
    } else if (formData.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return false;
    }

    if (!formData.confirmNewPassword) {
      toast.error("Please confirm your new password");
      return false;
    } else if (formData.newPassword !== formData.confirmNewPassword) {
      toast.error("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await changePassword({
        oldPassword: formData.currentPassword,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmNewPassword,
      });

      const successMessage =
        response.message || "Password changed successfully!";
      toast.success(successMessage);

      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });

      setTimeout(() => {
        navigate("/get-profile");
      }, 1500);
    } catch (error) {
      toast.error(
        error.message || "Failed to change password. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <OtherPage3 />
      <div className="otherpage3-content min-h-screen flex items-center justify-center p-4 pt-32 pb-16">
        <ChangePasswordCard
          formData={formData}
          changingPassword={isSubmitting}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </>
  );
};

export default ChangePassword;
