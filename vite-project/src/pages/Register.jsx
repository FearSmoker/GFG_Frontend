import React, { useState, useEffect } from 'react';
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
  const [backendError, setBackendError] = useState('');
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

      if (backendError) {
        setBackendError('');
      }
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
      setBackendError('');
      await registerUser(body);
      alert('Registered successfully');
      navigate('/signin');
    } catch (err) {
      console.error('Full error object:', err);
      console.log('Error response:', err.response);
      console.log('Error response data:', err.response?.data);
      
      let errorMessage = 'Registration failed. Please try again.';
      
      if (err.response?.data) {
        const { data } = err.response;
        
        if (data.message) {
          errorMessage = data.message;
        } else if (data.errors && Array.isArray(data.errors) && data.errors.length > 0) {
          errorMessage = data.errors.join(', ');
        } else if (data.error) {
          errorMessage = data.error;
        } else if (typeof data === 'string') {
          if (data.includes('<!DOCTYPE html>')) {
            errorMessage = 'Server encountered an unexpected error. Please try again later.';
          } else {
            errorMessage = data;
          }
        } else if (data.success === false) {
          errorMessage = 'Registration failed. Please check your information and try again.';
        }
      } else if (err.message) {
        if (err.message.includes('Network Error')) {
          errorMessage = 'Network error. Please check your internet connection.';
        } else if (err.code === 'ECONNREFUSED') {
          errorMessage = 'Unable to connect to server. Please try again later.';
        } else {
          errorMessage = err.message;
        }
      }
      
      setBackendError(errorMessage);
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
        backendError={backendError}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Register;