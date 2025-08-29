import React, { useState } from "react";
import ContactUsComponent from "../components/ContactUsBackground.jsx";

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

  const handleSubmit = (e) => {
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

    const form = document.createElement("form");
    form.action =
      "https://docs.google.com/forms/d/e/1FAIpQLSfmPUIo9414HCOxThoFRXl8XeLz0yOBAtwXMaVRoktkJCsK8Q/formResponse";
    form.method = "POST";
    form.target = "hidden_iframe";

    const addField = (name, value) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      input.value = value;
      form.appendChild(input);
    };

    addField("entry.2005620554", formData.name);
    addField("entry.1045781291", formData.email);
    addField("entry.1166974658", formData.phone);
    addField("entry.839337160", formData.message);

    const submitBtn = document.createElement("button");
    submitBtn.type = "submit";
    submitBtn.style.display = "none";
    form.appendChild(submitBtn);

    document.body.appendChild(form);
    submitBtn.click();
    document.body.removeChild(form);

    setTimeout(() => {
      setSubmitMessage(
        "Message sent successfully! We'll get back to you soon."
      );
      setFormData({ name: "", email: "", phone: "", message: "" });
      setIsSubmitting(false);
    }, 1000);

    setTimeout(() => setSubmitMessage(""), 8000);
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

      {/* Hidden iframe for Google Form submission */}
      <iframe
        name="hidden_iframe"
        id="hidden_iframe"
        style={{ display: "none" }}
      />
    </>
  );
};

export default ContactUs;
