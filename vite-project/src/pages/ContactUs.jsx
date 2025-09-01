import React, { useState } from "react";
import ContactUsComponent from "../components/ContactUsBackground.jsx";
import { submitContactForm } from "../api/Contact_api.js";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.message
    ) {
      setSubmitMessage("Please fill in all fields.");
      setTimeout(() => setSubmitMessage(""), 3000);
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const result = await submitContactForm(formData);

      if (result.success) {
        setSubmitMessage(result.message);
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setSubmitMessage(result.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitMessage(""), 8000);
    }
  };

  return (
    <>
      <ContactUsComponent
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitMessage={submitMessage}
      />
    </>
  );
};

export default ContactUs;