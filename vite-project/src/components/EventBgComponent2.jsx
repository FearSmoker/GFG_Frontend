import * as React from "react";
import EventBg1SVGComponent from '../Elements/EventsBg1.jsx';
import EventBg2SVGComponent from '../Elements/EventsBg2.jsx';

const EventsBg1Component2 = ({ 
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
        <EventBg1SVGComponent />
      </div>
      
      {/* Overlay with dynamic height and shifted down */}
      <div 
        className="absolute left-0 w-full"
        style={{ height: `${overlayHeight}px`, top: `${shiftDown}px` }}
      >
        <EventBg2SVGComponent />
      </div>
      
      {/* Content layer */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default EventsBg1Component2;
