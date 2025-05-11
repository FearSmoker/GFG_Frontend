// src/pages/Register.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/User_api';

const Register = () => {
  const [formData, setFormData] = useState({ fullName: '', email: '', username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const body = new FormData();
    body.append("fullName", formData.fullName);
    body.append("email", formData.email);
    body.append("username", formData.username);
    body.append("password", formData.password);

    try {
      await registerUser(body);
      alert('Registered successfully');
      navigate('/signin');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl mb-6 text-green-400 text-center">Register</h2>

        <input className="w-full p-3 mb-4 rounded bg-gray-800" placeholder="Full Name" name="fullName" onChange={handleChange} required />
        <input className="w-full p-3 mb-4 rounded bg-gray-800" placeholder="Email" type="email" name="email" onChange={handleChange} required />
        <input className="w-full p-3 mb-4 rounded bg-gray-800" placeholder="Username" name="username" onChange={handleChange} required />
        <input className="w-full p-3 mb-6 rounded bg-gray-800" placeholder="Password" type="password" name="password" onChange={handleChange} required />

        <button type="submit" className="w-full bg-green-600 hover:bg-green-700 p-3 rounded">Register</button>
      </form>
    </div>
  );
};

export default Register;
