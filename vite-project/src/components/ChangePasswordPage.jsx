import React from 'react';
import ChangePasswordBgDarkSVGComponent from '../Elements/ChangePasswordBgDark.jsx'

const ChangePasswordPageDark = ({ children }) => {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* SVG Background */}
      <div className="absolute inset-0 w-full h-full">
        <ChangePasswordBgDarkSVGComponent 
          className="w-full h-full object-cover"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            minHeight: '100vh'
          }}
        />
      </div>
      
      {/* Content Overlay */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-6xl mx-auto flex items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPageDark;