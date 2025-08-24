import React, { useState, useEffect } from 'react';
import { toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/User_api';
import useAuth from '../context/AuthContext.jsx';
import RegisterCard from '../components/RegisterCard.jsx';

const Register = () => {
  const [formData, setFormData] = useState({ 
    fullName: '', 
    email: '', 
    username: '', 
    password: '', 
    avatar: '', 
    mobileNo: '' 
  });
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [registering, setRegistering] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = e => {
    if (e.target.name === 'avatar') {
      const file = e.target.files[0];
      setFormData({ ...formData, avatar: file || '' });

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

  const handleSubmit = async e => {
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
      const response = await fetch("https://cdn-icons-png.flaticon.com/512/149/149071.png");
      const blob = await response.blob();
      const defaultFile = new File([blob], "default-avatar.png", { type: blob.type });
      body.append("avatar", defaultFile);
    }

    try {
      await registerUser(body);
      toast.success('Registered successfully');
      navigate('/signin');
    } catch (err) {
      // Since your API function already extracts the backend message,
      // just use err.message which contains the backend error message
      toast.error(err.message || 'Registration failed. Please try again.');
    } finally {
      setRegistering(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center">
      <RegisterCard
        formData={formData}
        avatarPreview={avatarPreview}
        registering={registering}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Register;