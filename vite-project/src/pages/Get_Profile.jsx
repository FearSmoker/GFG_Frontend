import { useState } from 'react';
import { Camera } from 'lucide-react';

export default function UserProfileScreen() {
  // Profile state
  const [userData, setUserData] = useState({
    username: 'GFG CHAPTER',
    fullName: 'MITS DU',
    email: 'gfg@mitsgwl.ac,in',
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

  // Function to pick an image from gallery
  const pickImage = () => {
    
    setTempAvatar('/api/placeholder/150/150');
  };

  // Save avatar changes
  const saveAvatarChanges = () => {
    if (tempAvatar) {
      setAvatar(tempAvatar);
      setAvatarModalVisible(false);
      showSuccessMessage();
    }
  };

  // Save profile changes
  const saveProfileChanges = () => {
    setUserData(tempUserData);
    setProfileModalVisible(false);
    showSuccessMessage();
  };

  // Show success message temporarily
  const showSuccessMessage = () => {
    setSuccessMessage(true);
    setTimeout(() => {
      setSuccessMessage(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      {/* Success Message */}
      {successMessage && (
        <div className="fixed top-16 left-4 right-4 z-50 bg-green-800 bg-opacity-90 p-4 rounded text-center">
          <p className="text-white font-semibold">Profile updated successfully!</p>
        </div>
      )}

      {/* Header with Update Profile Button */}
      <div className="flex justify-between items-center p-4 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-green-500">My Profile</h1>
        <button 
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white font-semibold transition duration-200"
          onClick={() => {
            setTempUserData({...userData});
            setProfileModalVisible(true);
          }}
        >
          Update Profile
        </button>
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
                  setTempAvatar(avatar);
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
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center p-4 z-50 backdrop-blur-sm">
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

      {/* Avatar Update */}
      {avatarModalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-gray-900 rounded-lg w-full max-w-md p-5 border border-gray-800 shadow-xl" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center border-b border-gray-800 pb-3 mb-4">
              <h3 className="text-xl font-bold text-green-500">Update Profile Picture</h3>
              <button onClick={() => setAvatarModalVisible(false)} className="text-gray-400 text-2xl hover:text-white">
                &times;
              </button>
            </div>

            <div className="flex justify-center my-10">
              <img
                src={tempAvatar || avatar}
    
                className="w-36 h-36 rounded-full border-2 border-green-600 object-cover"
              />
            </div>

            <button
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white font-semibold block mx-auto mb-4 transition duration-200"
              onClick={pickImage}
            >
              Choose Image
            </button>

            <div className="flex justify-end gap-3">
              <button
                className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded text-white font-semibold transition duration-200"
                onClick={() => setAvatarModalVisible(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white font-semibold transition duration-200"
                onClick={saveAvatarChanges}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}