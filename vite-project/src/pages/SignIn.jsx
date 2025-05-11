// src/pages/SignIn.jsx
// src/pages/SignIn.jsx
import React, { useState } from 'react';
import { loginUser } from '../api/User_api';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

const SignIn = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { token } = await loginUser(formData);
      localStorage.setItem('token', token);
      alert('Login successful!');
      navigate('/');
    } catch (error) {
      alert('Login failed');
    }
  };

  const handleGoogleSuccess = credentialResponse => {
    console.log('Google Token:', credentialResponse.credential);
    // You should send this to your backend for verification
    alert('Google login successful!');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl mb-6 text-green-400 text-center">Sign In</h2>

        <input className="w-full p-3 mb-4 rounded bg-gray-800" placeholder="Email" name="email" type="email" onChange={handleChange} required />
        <input className="w-full p-3 mb-6 rounded bg-gray-800" placeholder="Password" name="password" type="password" onChange={handleChange} required />

        <button type="submit" className="w-full bg-green-600 hover:bg-green-700 p-3 rounded">Sign In</button>

        <div className="my-4 text-center text-gray-400">or</div>

        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => alert('Google login failed')}
        />
      </form>
    </div>
  );
};

export default SignIn;
