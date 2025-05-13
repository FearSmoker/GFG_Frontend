import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { changePassword } from '../api/User_api';
import useAuth from '../context/AuthContext.jsx';

const ChangePassword = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.currentPassword.trim()) {
      newErrors.currentPassword = 'Current password is required';
    }
    
    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your new password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setMessage({ text: '', type: '' });
    
    try {
      // Call API to change password
      await changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      });
      
      setMessage({
        text: 'Password changed successfully!',
        type: 'success'
      });
      
      // Reset form after successful password change
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      // Optionally redirect back to profile after a delay
      setTimeout(() => {
        navigate('/profile');
      }, 2000);
    } catch (error) {
      setMessage({
        text: error.message || 'Failed to change password. Please try again.',
        type: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const glowStyles = {
    textGlow: {
      textShadow: '0 0 10px rgba(255, 255, 255, 0.6), 0 0 20px rgba(255, 255, 255, 0.5), 0 0 30px rgba(255, 255, 255, 0.3)'
    },
  
    headingGlow: {
      textShadow: '0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.5), 0 0 30px rgba(255, 255, 255, 0.3), 0 0 40px rgba(255, 255, 255, 0.2)'
    },
    
    successGlow: {
      textShadow: '0 0 10px rgba(74, 222, 128, 0.8), 0 0 20px rgba(74, 222, 128, 0.5), 0 0 30px rgba(74, 222, 128, 0.3)'
    },
   
    errorGlow: {
      textShadow: '0 0 10px rgba(248, 113, 113, 0.8), 0 0 20px rgba(248, 113, 113, 0.5), 0 0 30px rgba(248, 113, 113, 0.3)'
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center py-12 px-4"
    style={{
        backgroundImage: "url('src/assets/password.jpg')", 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        fontSize:'1.25rem'
      }}
      >

      <div 
        className="w-full max-w-lg rounded-lg shadow-xl overflow-hidden"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.18)'
        }}
      >
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-6 text-center text-green-300">Change Password</h1>
          
          {message.text && (
            <div className={`mb-6 p-3 rounded ${
              message.type === 'success' ? 'bg-green-900 text-green-300 border border-green-700' : 'bg-red-900 text-red-300 border border-red-700'
            }`}>
              {message.text}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label 
                htmlFor="currentPassword" 
                className="block text-lg font-medium text-green-300 mb-2"
              >
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-black border rounded-md text-white ${
                  errors.currentPassword ? 'border-red-500' : 'border-green-700'
                } focus:outline-none focus:border-green-500`}
              />
              {errors.currentPassword && (
                <p className="mt-1 text-lg text-red-400">{errors.currentPassword}</p>
              )}
            </div>
            
            <div className="mb-5">
              <label 
                htmlFor="newPassword" 
                className="block text-lg font-medium text-green-300 mb-2"
              >
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-black border rounded-md text-white ${
                  errors.newPassword ? 'border-red-500' : 'border-green-700'
                } focus:outline-none focus:border-green-500`}
              />
              {errors.newPassword && (
                <p className="mt-1 text-lg text-red-400">{errors.newPassword}</p>
              )}
            </div>
            
            <div className="mb-6">
              <label 
                htmlFor="confirmPassword" 
                className="block text-lg font-medium text-green-300 mb-2"
              >
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-black border rounded-md text-white ${
                  errors.confirmPassword ? 'border-red-500' : 'border-green-700'
                } focus:outline-none focus:border-green-500`}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-lg text-red-400">{errors.confirmPassword}</p>
              )}
            </div>
            
            <div className="flex flex-col gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-700 text-white py-3 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 transition-colors"
              >
                {isSubmitting ? 'Changing...' : 'Change Password'}
              </button>
              
              <Link 
                to="/profile" 
                className="text-center text-green-400 hover:text-green-300 transition-colors"
              >
                Back to Profile
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;