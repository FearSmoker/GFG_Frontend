import { useState, useEffect } from 'react';
import { Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { updateAccountDetails, updateUserAvatar } from '../api/User_api';
import { useAuth } from '../context/AuthContext';

export default function UserProfileScreen() {
  const navigate = useNavigate();
  const { user, loading, isAuthenticated, logout, updateUserData } = useAuth();
  
  // Profile state
  const [userData, setUserData] = useState({
    username: 'GFG CHAPTER',
    fullName: 'MITS DU',
    email: 'gfg@mitsgwl.ac.in',
    contact: '+91 8989898978'
  });

  // Avatar state
  const [avatar, setAvatar] = useState('https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y');
  const [tempAvatar, setTempAvatar] = useState(null);

  // Modal states
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [avatarModalVisible, setAvatarModalVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  // Temporary profile data while editing
  const [tempUserData, setTempUserData] = useState({ ...userData });
  
  // Add login-related states
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  // Check login status when component mounts
  useEffect(() => {
    checkLoginStatus();
  }, []);

  // Function to check login status
  const checkLoginStatus = async () => {
    try {
      // Check for token in localStorage
      const token = localStorage.getItem('token');
      
      if (token) {
        // If token exists, user is logged in
        setIsLoggedIn(true);
        
        // Optional: Fetch user data from API using the token
        try {
          // Example API call to get user profile data
          // const response = await fetch('/api/user/profile', {
          //   headers: {
          //     'Authorization': `Bearer ${token}`
          //   }
          // });
          // const userData = await response.json();
          // setUserData(userData);
        } catch (profileError) {
          console.error('Error fetching profile:', profileError);
        }
      } else {
        // No token, user is not logged in
        setIsLoggedIn(true);
        setShowLoginPrompt(true);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setIsLoggedIn(false);
      setShowLoginPrompt(true);
    }
  };

  // Update local state when user data is loaded from context
  useEffect(() => {
    if (user) {
      setUserData({
        username: user.username || userData.username,
        fullName: user.fullName || userData.fullName,
        email: user.email || userData.email,
        contact: user.contact || userData.contact
      });
      
      if (user.avatar) {
        setAvatar(user.avatar);
      }
    }
  }, [user]);
  
  
  
  // Function to redirect to login page
  const redirectToLogin = () => {
    window.location.href = '/login';
  }

  // Navigate to change password page
  const navigateToChangePassword = () => {
    navigate('/change-password');
  };

  // Function to handle file selection for avatar
  const pickImage = (e) => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        // Create a preview URL for the UI
        const previewUrl = URL.createObjectURL(file);
        setTempAvatar({ file, previewUrl });
      }
    };
    fileInput.click();
  };

  // Save avatar changes
  const saveAvatarChanges = async () => {
    if (tempAvatar) {
      try {
        const formData = new FormData();
        // For actual file uploads from device
        if (tempAvatar.file) {
          formData.append('avatar', tempAvatar.file);
          
          // Call API to update avatar
          const result = await updateUserAvatar(formData);
          
          // Update avatar in state
          if (result.avatar) {
            setAvatar(result.avatar);
            // Also update in auth context
            updateUserData({ avatar: result.avatar });
          }
        } else {
          // For static avatar changes
          setAvatar(tempAvatar);
        }
        
        setAvatarModalVisible(false);
        showSuccessMessage();
      } catch (error) {
        console.error('Failed to update avatar:', error);
        // Show error message
        setSuccessMessage(false);
        alert('Failed to update avatar: ' + (error.message || 'Unknown error'));
      }
    }
  };

  // Save profile changes
  const saveProfileChanges = async () => {
    try {
      // Call API to update profile
      const result = await updateAccountDetails(tempUserData);
      
      // Update user data in state
      setUserData({
        ...tempUserData,
        ...result
      });
      
      // Update user data in auth context
      updateUserData(result);
      
      setProfileModalVisible(false);
      showSuccessMessage();
    } catch (error) {
      console.error('Failed to update profile:', error);
      // Show error message
      setSuccessMessage(false);
      alert('Failed to update profile: ' + (error.message || 'Unknown error'));
    }
  };

  // Show success message temporarily
  const showSuccessMessage = () => {
    setSuccessMessage(true);
    setTimeout(() => {
      setSuccessMessage(false);
    }, 3000);
  };
  
  // Login prompt modal
  const LoginPrompt = () => (
    <div className="fixed inset-0 backdrop-blur-md flex justify-center items-center p-4 z-50">
      <div className="bg-gray-900 rounded-lg w-full max-w-md p-6 border border-gray-800 shadow-xl text-center">
        <div className="text-green-500 mb-4">
          <svg className="mx-auto h-16 w-16" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Access Restricted</h3>
        <p className="text-gray-300 mb-6">You need to be logged in to view your profile. Please sign in to continue.</p>
        <button 
          onClick={redirectToLogin}
          className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg text-white font-semibold transition duration-200 w-full"
        >
          Sign In
        </button>
      </div>
    </div>
  );
  
  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex justify-center items-center">
        <div className="text-green-500">
          <svg className="animate-spin h-10 w-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      </div>
    );
  }
  
  // If not logged in, show only the login prompt
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
        {showLoginPrompt && <LoginPrompt />}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      {/* Success Message */}
      {successMessage && (
        <div className="fixed top-16 left-4 right-4 z-50 bg-green-800 bg-opacity-90 p-4 rounded text-center">
          <p className="text-white font-semibold">Profile updated successfully!</p>
        </div>
      )}

      {/* Header with Update Profile and Change Password Buttons */}
      <div className="flex justify-between items-center p-4 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-green-500">My Profile</h1>
        <div className="flex space-x-2">
          <button 
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white font-semibold transition duration-200"
            onClick={() => {
              setTempUserData({...userData});
              setProfileModalVisible(true);
            }}
          >
            Update Profile
          </button>
          <button 
            className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded text-white font-semibold transition duration-200"
            onClick={navigateToChangePassword}
          >
            Change Password
          </button>
          
        </div>
      </div>

      <div className="p-4">
        <div className="w-full">
          {/* Avatar Section */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative mb-4">
              <div className="w-36 h-36 rounded-full border-4 border-green-600 overflow-hidden">
                <img 
                  src={avatar} 
                  alt="Avatar"
                  className="w-full h-full object-cover" 
                />
              </div>
              <button 
                className="absolute bottom-0 right-0 bg-green-600 hover:bg-green-700 w-10 h-10 rounded-full flex items-center justify-center transition duration-200"
                onClick={() => {
                  setTempAvatar(null);
                  setAvatarModalVisible(true);
                }}
              >
                <Camera size={20} />
              </button>
            </div>
            <h2 className="text-2xl font-bold mb-1">{userData.fullName}</h2>
            <p className="text-gray-400">@{userData.username}</p>
          </div>

          {/* Profile Details Section */}
          <div className="bg-gray-900 bg-opacity-90 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gray-800">
            <h3 className="text-lg font-bold text-green-500 mb-4">Profile Information</h3>
            
            <div className="mb-4">
              <p className="text-sm text-gray-400 mb-1">Username</p>
              <div className="bg-black bg-opacity-80 p-3 rounded border border-gray-800">
                <p className="text-white">{userData.username}</p>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-400 mb-1">Full Name</p>
              <div className="bg-black bg-opacity-80 p-3 rounded border border-gray-800">
                <p className="text-white">{userData.fullName}</p>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-400 mb-1">Email</p>
              <div className="bg-black bg-opacity-80 p-3 rounded border border-gray-800">
                <p className="text-white">{userData.email}</p>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-400 mb-1">Contact Number</p>
              <div className="bg-black bg-opacity-80 p-3 rounded border border-gray-800">
                <p className="text-white">{userData.contact}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {profileModalVisible && (
        <div className="fixed inset-0 backdrop-blur-md flex justify-center items-center p-4 z-50">
          <div className="bg-gray-900 rounded-lg w-full max-w-md p-5 border border-gray-800 shadow-xl" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center border-b border-gray-800 pb-3 mb-4">
              <h3 className="text-xl font-bold text-green-500">Edit Profile</h3>
              <button onClick={() => setProfileModalVisible(false)} className="text-gray-400 text-2xl hover:text-white">
                &times;
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto">
              <div className="mb-4">
                <label className="text-sm text-gray-400 block mb-1">Username</label>
                <input
                  className="w-full bg-black bg-opacity-50 p-3 rounded text-white border border-gray-800 focus:border-green-500 focus:outline-none"
                  value={tempUserData.username}
                  onChange={(e) => setTempUserData({...tempUserData, username: e.target.value})}
                />
              </div>

              <div className="mb-4">
                <label className="text-sm text-gray-400 block mb-1">Full Name</label>
                <input
                  className="w-full bg-black bg-opacity-50 p-3 rounded text-white border border-gray-800 focus:border-green-500 focus:outline-none"
                  value={tempUserData.fullName}
                  onChange={(e) => setTempUserData({...tempUserData, fullName: e.target.value})}
                />
              </div>

              <div className="mb-4">
                <label className="text-sm text-gray-400 block mb-1">Email</label>
                <input
                  className="w-full bg-black bg-opacity-50 p-3 rounded text-white border border-gray-800 focus:border-green-500 focus:outline-none"
                  value={tempUserData.email}
                  onChange={(e) => setTempUserData({...tempUserData, email: e.target.value})}
                  type="email"
                />
              </div>

              <div className="mb-4">
                <label className="text-sm text-gray-400 block mb-1">Contact Number</label>
                <input
                  className="w-full bg-black bg-opacity-50 p-3 rounded text-white border border-gray-800 focus:border-green-500 focus:outline-none"
                  value={tempUserData.contact}
                  onChange={(e) => setTempUserData({...tempUserData, contact: e.target.value})}
                  type="tel"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button
                className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded text-white font-semibold transition duration-200"
                onClick={() => setProfileModalVisible(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white font-semibold transition duration-200"
                onClick={saveProfileChanges}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Avatar Update Modal */}
      {avatarModalVisible && (
        <div className="fixed inset-0 backdrop-blur-md flex justify-center items-center p-4 z-50">
          <div className="bg-gray-900 rounded-lg w-full max-w-md p-5 border border-gray-800 shadow-xl" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center border-b border-gray-800 pb-3 mb-4">
              <h3 className="text-xl font-bold text-green-500">Update Avatar</h3>
              <button onClick={() => setAvatarModalVisible(false)} className="text-gray-400 text-2xl hover:text-white">
                &times;
              </button>
            </div>

            <div className="flex flex-col items-center justify-center p-4">
              <div className="w-40 h-40 rounded-full border-4 border-green-600 overflow-hidden mb-6">
                <img 
                  src={tempAvatar ? tempAvatar.previewUrl : avatar} 
                  alt="Avatar Preview"
                  className="w-full h-full object-cover" 
                />
              </div>

              <div className="grid grid-cols-2 gap-3 w-full">
                <button
                  className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 p-3 rounded text-white font-semibold transition duration-200"
                  onClick={pickImage}
                >
                  <Camera size={20} className="mr-2" />
                  Select Image
                </button>
                
                <button
                  className="bg-green-600 hover:bg-green-700 p-3 rounded text-white font-semibold transition duration-200"
                  onClick={saveAvatarChanges}
                  disabled={!tempAvatar}
                >
                  Save Avatar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}