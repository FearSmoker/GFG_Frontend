import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/User_api';

const Register = () => {
  const [formData, setFormData] = useState({ fullName: '', email: '', username: '', password: '' , avatar: '' , mobileNo: ''});
  const [ avatarPreview, setAvatarPreview] = useState(null);
  const navigate = useNavigate();

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
    const body = new FormData();
    body.append("fullName", formData.fullName);
    body.append("email", formData.email);
    body.append("username", formData.username);
    body.append("password", formData.password);
    body.append("mobileNo", formData.mobileNo);
    if (formData.avatar) {
    body.append("avatar", formData.avatar);
    }else {
    const response = await fetch("https://cdn-icons-png.flaticon.com/512/149/149071.png");
    const blob = await response.blob();
    const defaultFile = new File([blob], "default-avatar.png", { type: blob.type });
    body.append("avatar", defaultFile);
  }

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
    <form onSubmit={handleSubmit} className="bg-gray-900 p-8 pt-10 rounded shadow-md w-full max-w-md relative">

      <h2 className="text-2xl mb-4 text-green-400 text-center">Register</h2>
      
      <div className="flex justify-center mb-6">
        <label htmlFor="avatar-upload" className="cursor-pointer relative group">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-green-500 group-hover:opacity-80 transition">
            {avatarPreview ? (
              <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gray-700 flex items-center justify-center text-gray-300 text-sm">Upload</div>
            )}
          </div>
          <input id="avatar-upload" type="file" name="avatar" accept="image/*" onChange={handleChange} className="hidden" />
        </label>
      </div>

      <input className="w-full p-3 mb-4 rounded bg-gray-800" placeholder="Full Name" name="fullName" onChange={handleChange} required />
      <input className="w-full p-3 mb-4 rounded bg-gray-800" placeholder="Email" type="email" name="email" onChange={handleChange} required />
      <input className="w-full p-3 mb-4 rounded bg-gray-800" placeholder="Username" name="username" onChange={handleChange} required />
      <input className="w-full p-3 mb-6 rounded bg-gray-800" placeholder="Password" type="password" name="password" onChange={handleChange} required />
      <input className="w-full p-3 mb-6 rounded bg-gray-800" placeholder="Mobile No." type="mobileNo" name="mobileNo" onChange={handleChange} required />

      <button type="submit" className="w-full bg-green-600 hover:bg-green-700 p-3 rounded">Register</button>
    </form>
  </div>
  );
};

export default Register;
