import React from "react";
import { Link } from "react-router-dom";

const RegisterCard = ({
  formData,
  avatarPreview,
  registering,
  backendError,
  handleChange,
  handleSubmit,
}) => {
  return (
    <div className="w-full max-w-md p-8 rounded-[45px] shadow-2xl border border-white/20 backdrop-blur-[28px] bg-white/5">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl mb-4 text-green-400 text-center">Register</h2>
        
        {backendError && (
          <div className="mb-4 p-3 bg-red-900 border border-red-500 rounded text-red-300 text-sm">
            {backendError}
          </div>
        )}
        
        {/* Avatar Upload */}
        <div className="flex justify-center mb-6">
          <label htmlFor="avatar-upload" className="cursor-pointer relative group">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-green-400 group-hover:opacity-80 transition">
              {avatarPreview ? (
                <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-transparent border-2 border-dashed border-white/30 flex items-center justify-center text-white/50 text-sm">Upload</div>
              )}
            </div>
            <input 
              id="avatar-upload" 
              type="file" 
              name="avatar" 
              accept="image/*" 
              onChange={handleChange} 
              className="hidden" 
            />
          </label>
        </div>

        <div>
          <label className="block text-white text-sm mb-2">Full Name</label>
          <input
            className="w-full p-3 rounded-lg bg-transparent border-b border-white text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Enter your full name"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-white text-sm mb-2">Email</label>
          <input
            className="w-full p-3 rounded-lg bg-transparent border-b border-white text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Enter your email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-white text-sm mb-2">Username</label>
          <input
            className="w-full p-3 rounded-lg bg-transparent border-b border-white text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Enter your username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-white text-sm mb-2">Password</label>
          <input
            className="w-full p-3 rounded-lg bg-transparent border-b border-white text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Enter your password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-white text-sm mb-2">Mobile No.</label>
          <input
            className="w-full p-3 rounded-lg bg-transparent border-b border-white text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Enter your mobile number"
            name="mobileNo"
            type="tel"
            value={formData.mobileNo}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#00AA75] border-2 border-[#0E86D2] hover:bg-[#00aa75d1] p-3 rounded-full text-white text-lg font-semibold shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={registering}
        >
          {registering ? "Registering..." : "Register"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-400">
        Already have an account?{" "}
        <Link
          to="/signin"
          className="text-green-400 underline hover:text-green-300 transition-colors duration-200"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default RegisterCard;