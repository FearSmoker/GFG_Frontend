import React from "react";
import useTheme from "../context/ThemeContext.jsx";

const UpdateAvatarCard = ({
  tempAvatar,
  onCancel,
  onSave,
  onChooseImage
}) => {
  const { themeMode } = useTheme();
  
  const textColor = themeMode === "dark" ? "text-white" : "text-[#002b46]";
  
  return (
    <div className="w-full max-w-lg p-8 rounded-[45px] shadow-2xl border border-white/20 backdrop-blur-[28px] bg-white/10">
      <div className="space-y-6">
        <h2 className="text-2xl mb-4 text-green-400 text-center">Update Avatar</h2>
        
        {/* Avatar Preview */}
        <div className="flex justify-center mb-6">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-green-400">
            {tempAvatar?.previewUrl ? (
              <img 
                src={tempAvatar.previewUrl} 
                alt="Avatar Preview" 
                className="w-full h-full object-cover" 
              />
            ) : (
              <div className={`w-full h-full bg-transparent border-2 border-dashed border-white/30 flex items-center justify-center ${textColor}/50 text-sm`}>
                No Image
              </div>
            )}
          </div>
        </div>

        <div className="space-y-3 mt-8">
          <button
            onClick={onChooseImage}
            className="w-full bg-[#00AA75] border-2 border-[#0E86D2] hover:bg-[#00aa75d1] p-3 rounded-full text-white text-lg font-semibold shadow-md transition-all duration-200"
          >
            Choose Image
          </button>
          
          <button
            onClick={onSave}
            className="w-full bg-transparent border-2 border-blue-600 hover:border-blue-500 hover:bg-blue-600/20 p-3 rounded-full text-blue-400 hover:text-white text-lg font-semibold shadow-md transition-all duration-200"
            disabled={!tempAvatar?.file}
          >
            Save Avatar
          </button>
          
          <button
            onClick={onCancel}
            className="w-full bg-transparent border-2 border-gray-500 hover:border-gray-400 hover:bg-gray-500/20 p-3 rounded-full text-gray-500 hover:text-gray-300 text-lg font-semibold shadow-md transition-all duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateAvatarCard;