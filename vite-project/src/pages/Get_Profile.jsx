import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { updateAccountDetails, updateUserAvatar } from "../api/User_api";
import useAuth from "../context/AuthContext.jsx";
import OtherPage3 from "../components/OtherPage3.jsx";
import ProfileCard from "../components/ProfileCard.jsx";
import UpdateProfileCard from "../components/UpdateProfileCard.jsx";
import UpdateAvatarCard from "../components/UpdateAvatarCard.jsx";
import "../css/OtherPage3.css";

export default function GetProfile() {
  const navigate = useNavigate();
  const { user, loading, isAuthenticated, fetchAndUpdateUserData } = useAuth();

  const [userData, setUserData] = useState({});
  const [tempUserData, setTempUserData] = useState({});
  const [avatar, setAvatar] = useState("");
  const [tempAvatar, setTempAvatar] = useState(null);

  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [avatarModalVisible, setAvatarModalVisible] = useState(false);
  const [imageZoomVisible, setImageZoomVisible] = useState(false);

  useEffect(() => {
    if (user) {
      setUserData({
        username: user.username || "",
        fullName: user.fullName || "",
        email: user.email || "",
        mobileNo: user.mobileNo || "",
      });
      setAvatar(
        user.avatar ||
          "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
      );
    }
  }, [user]);

  const redirectToLogin = () => {
    navigate("/signin");
  };

  const pickImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
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
      formData.append("avatar", tempAvatar.file);
      const result = await updateUserAvatar(formData);

      if (result?.data?.avatar) {
        setAvatar(result.data.avatar);
        fetchAndUpdateUserData({ avatar: result.data.avatar });
        toast.success("Avatar updated successfully!");
      }
      setAvatarModalVisible(false);
    } catch (error) {
      toast.error(
        "Failed to update avatar: " + (error.message || "Unknown error")
      );
    }
  };

  const saveProfileChanges = async () => {
    try {
      const { fullName, email, mobileNo } = tempUserData;
      const result = await updateAccountDetails({ fullName, email, mobileNo });
      setUserData({ ...tempUserData, ...result });
      fetchAndUpdateUserData(result);
      toast.success("Profile updated successfully!");
      setProfileModalVisible(false);
    } catch (error) {
      toast.error(
        "Failed to update profile: " + (error.message || "Unknown error")
      );
    }
  };

  const handleUpdateProfile = () => {
    setTempUserData({ ...userData });
    setProfileModalVisible(true);
  };

  const handleChangePassword = () => {
    navigate("/change-password");
  };

  const handleUpdateAvatar = () => {
    setTempAvatar(null);
    setAvatarModalVisible(true);
  };

  const handleAvatarClick = () => {
    setImageZoomVisible(true);
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setTempUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const LoginPrompt = () => (
    <div className="fixed inset-0 backdrop-blur-md flex justify-center items-center p-4 z-50">
      <div className="bg-gray-900 rounded-lg w-full max-w-md p-6 border border-gray-800 shadow-xl text-center">
        <h3 className="text-xl font-bold text-white mb-2">Access Restricted</h3>
        <p className="text-gray-300 mb-6">
          You need to be logged in to view your profile. Please sign in to
          continue.
        </p>
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
      <>
        <OtherPage3 />
        <div className="min-h-screen flex items-center justify-center text-green-500">
          <svg
            className="animate-spin h-10 w-10"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0..."
            />
          </svg>
        </div>
      </>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <OtherPage3 />
        <LoginPrompt />
      </>
    );
  }

  return (
    <>
      <OtherPage3 />
      <div className="otherpage3-content min-h-screen flex items-center justify-center p-4 pt-32 pb-16">
        <ProfileCard
          userData={userData}
          avatar={avatar}
          onUpdateProfile={handleUpdateProfile}
          onChangePassword={handleChangePassword}
          onUpdateAvatar={handleUpdateAvatar}
          onAvatarClick={handleAvatarClick}
        />

        {/* Image Zoom Modal */}
        {imageZoomVisible && (
          <div
            className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50 p-4"
            onClick={() => setImageZoomVisible(false)}
          >
            <div className="relative max-w-2xl max-h-2xl">
              <img
                src={avatar}
                alt="Avatar"
                className="max-w-full max-h-full rounded-lg shadow-2xl"
              />
              <button
                onClick={() => setImageZoomVisible(false)}
                className="absolute -top-3 -right-3 bg-black bg-opacity-70 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-90 shadow-lg"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Update Profile Modal */}
        {profileModalVisible && (
          <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50 p-4 pt-32 pb-16">
            <UpdateProfileCard
              tempUserData={tempUserData}
              onCancel={() => setProfileModalVisible(false)}
              onSave={saveProfileChanges}
              onChange={handleProfileChange}
            />
          </div>
        )}

        {/* Update Avatar Modal */}
        {avatarModalVisible && (
          <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50 p-4 py-16">
            <UpdateAvatarCard
              tempAvatar={tempAvatar}
              onCancel={() => setAvatarModalVisible(false)}
              onSave={saveAvatarChanges}
              onChooseImage={pickImage}
            />
          </div>
        )}
      </div>
    </>
  );
}