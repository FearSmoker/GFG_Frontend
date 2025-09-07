import * as React from "react";
import EventBg1DarkSVGComponent from '../Elements/EventsBg1Dark.jsx';
import EventBg2DarkSVGComponent from '../Elements/EventsBg2Dark.jsx';

const EventsBg1DarkComponent2 = ({ 
  overlayHeight = 1205,
  children, 
  className = "",
  shiftDown = 70,
  ...props 
}) => {
  return (
    <div 
      className={`relative w-full min-h-screen ${className}`}
      {...props}
    >
      {/* Full page background */}
      <div className="absolute inset-0 w-full h-full">
        <EventBg1DarkSVGComponent />
      </div>
      
      {/* Overlay with dynamic height and shifted down */}
      <div 
        className="absolute left-0 w-full"
        style={{ height: `${overlayHeight}px`, top: `${shiftDown}px` }}
      >
        <EventBg2DarkSVGComponent />
      </div>
      
      {/* Content layer */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default EventsBg1DarkComponent2;
