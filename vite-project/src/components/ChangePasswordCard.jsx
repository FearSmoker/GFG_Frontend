import React from "react";

const ChangePasswordCard = ({
  formData,
  changingPassword,
  handleChange,
  handleSubmit,
}) => {
  return (
    <div className="w-full max-w-md p-8 rounded-[45px] shadow-2xl border border-white/20 backdrop-blur-[28px] bg-white/5">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-white text-sm mb-2">Current Password</label>
          <input
            className="w-full p-3 rounded-lg bg-transparent border-b border-white text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Enter your current password"
            name="currentPassword"
            type="password"
            value={formData.currentPassword}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-white text-sm mb-2">New Password</label>
          <input
            className="w-full p-3 rounded-lg bg-transparent border-b border-white text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Enter your new password"
            name="newPassword"
            type="password"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-white text-sm mb-2">Confirm New Password</label>
          <input
            className="w-full p-3 rounded-lg bg-transparent border-b border-white text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Confirm your new password"
            name="confirmNewPassword"
            type="password"
            value={formData.confirmNewPassword}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#00AA75] border-2 border-[#0E86D2] hover:bg-[#00aa75d1] p-3 rounded-full text-white text-lg font-semibold shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={changingPassword}
        >
          {changingPassword ? "Changing Password..." : "Change Password"}
        </button>
      </form>
    </div>
  );
};

export default ChangePasswordCard;