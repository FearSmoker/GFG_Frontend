import { useState, useEffect } from 'react';
import { Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { updateAccountDetails, updateUserAvatar } from '../api/User_api';
import useAuth from '../context/AuthContext.jsx';

export default function UserProfileScreen() {
  const navigate = useNavigate();
  const { user, loading, isAuthenticated, updateUserData } = useAuth();

  const [userData, setUserData] = useState({});
  const [tempUserData, setTempUserData] = useState({});
  const [avatar, setAvatar] = useState('');
  const [tempAvatar, setTempAvatar] = useState(null);

  const [successMessage, setSuccessMessage] = useState(false);
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [avatarModalVisible, setAvatarModalVisible] = useState(false);

  useEffect(() => {
    if (user) {
      setUserData({
        username: user.username || '',
        fullName: user.fullName || '',
        email: user.email || '',
        contact: user.contact || '',
      });
      setAvatar(user.avatar || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y');
    }
  }, [user]);

  const redirectToLogin = () => {
    navigate('/signin');
  };

  const pickImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const previewUrl = URL.createObjectURL(file);
        setTempAvatar({ file, previewUrl });
      }
    };
    input.click();
  };

  const saveAvatarChanges = async () => {
    if (!tempAvatar?.file) return;

    try {
      const formData = new FormData();
      formData.append('avatar', tempAvatar.file);
      const result = await updateUserAvatar(formData);

      if (result.avatar) {
        setAvatar(result.avatar);
        updateUserData({ avatar: result.avatar });
        showSuccessMessage();
      }
      setAvatarModalVisible(false);
    } catch (error) {
      alert('Failed to update avatar: ' + (error.message || 'Unknown error'));
    }
  };

  const saveProfileChanges = async () => {
    try {
      const result = await updateAccountDetails(tempUserData);
      setUserData({ ...tempUserData, ...result });
      updateUserData(result);
      showSuccessMessage();
      setProfileModalVisible(false);
    } catch (error) {
      alert('Failed to update profile: ' + (error.message || 'Unknown error'));
    }
  };

  const showSuccessMessage = () => {
    setSuccessMessage(true);
    setTimeout(() => setSuccessMessage(false), 3000);
  };

  const LoginPrompt = () => (
    <div className="fixed inset-0 backdrop-blur-md flex justify-center items-center p-4 z-50">
      <div className="bg-gray-900 rounded-lg w-full max-w-md p-6 border border-gray-800 shadow-xl text-center">
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-green-500">
        <svg className="animate-spin h-10 w-10" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0..." />
        </svg>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPrompt />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      {successMessage && (
        <div className="fixed top-16 left-4 right-4 z-50 bg-green-800 p-4 rounded text-center">
          Profile updated successfully!
        </div>
      )}

      <div className="flex justify-between items-center p-4 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-green-500">My Profile</h1>
        <div className="flex gap-2">
          <button
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
            onClick={() => {
              setTempUserData({ ...userData });
              setProfileModalVisible(true);
            }}
          >
            Update Profile
          </button>
          <button
            className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded"
            onClick={() => navigate('/change-password')}
          >
            Change Password
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="flex flex-col items-center mb-6">
          <div className="relative mb-4">
            <img
              src={avatar}
              alt="Avatar"
              className="w-36 h-36 rounded-full border-4 border-green-600 object-cover"
            />
            <button
              className="absolute bottom-0 right-0 bg-green-600 hover:bg-green-700 w-10 h-10 rounded-full flex items-center justify-center"
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

        {/* Display profile details */}
        {['username', 'fullName', 'email', 'contact'].map((field) => (
          <div key={field} className="mb-4">
            <p className="text-sm text-gray-400 mb-1">{field.replace(/([A-Z])/g, ' $1')}</p>
            <div className="bg-black bg-opacity-80 p-3 rounded border border-gray-800">
              <p className="text-white">{userData[field]}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Avatar Modal */}
      {avatarModalVisible && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-800">
            <h3 className="text-xl mb-4">Update Avatar</h3>
            {tempAvatar?.previewUrl ? (
              <img src={tempAvatar.previewUrl} className="w-24 h-24 rounded-full mb-4" />
            ) : (
              <p className="text-gray-400 mb-4">No image selected</p>
            )}
            <div className="flex gap-2">
              <button onClick={pickImage} className="bg-green-600 px-4 py-2 rounded">Choose Image</button>
              <button onClick={saveAvatarChanges} className="bg-blue-600 px-4 py-2 rounded">Save</button>
              <button onClick={() => setAvatarModalVisible(false)} className="bg-red-600 px-4 py-2 rounded">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Profile Edit Modal */}
      {profileModalVisible && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-800 w-full max-w-md">
            <h3 className="text-xl mb-4">Edit Profile</h3>
            {['username', 'fullName', 'email', 'contact'].map((field) => (
              <div key={field} className="mb-4">
                <label className="block text-sm text-gray-400 mb-1 capitalize">{field}</label>
                <input
                  type="text"
                  value={tempUserData[field]}
                  onChange={(e) =>
                    setTempUserData((prev) => ({ ...prev, [field]: e.target.value }))
                  }
                  className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
                />
              </div>
            ))}
            <div className="flex gap-2 justify-end mt-4">
              <button onClick={() => setProfileModalVisible(false)} className="bg-red-600 px-4 py-2 rounded">Cancel</button>
              <button onClick={saveProfileChanges} className="bg-green-600 px-4 py-2 rounded">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
