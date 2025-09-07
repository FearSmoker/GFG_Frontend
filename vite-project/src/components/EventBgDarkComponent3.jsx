import * as React from "react";
import EventBg1DarkSVGComponent from '../Elements/EventsBg1Dark.jsx';
import EventBg2DarkSVGComponent from '../Elements/EventsBg2Dark.jsx';

const EventsBg1DarkComponent3 = ({ 
  overlayHeight = 505, 
  children, 
  className = "",
  ...props 
}) => {
  return (
    <div 
      className={`relative w-full min-h-screen ${className}`}
      {...props}
    >
      {/* Full page dark background */}
      <div className="absolute inset-0 w-full h-full">
        <EventBg1DarkSVGComponent />
      </div>
      
      {/* Light gradient overlay with customizable height */}
      <div className="absolute top-0 left-0 w-full  h-[1205px] sm:h-[500px] md:h-[700px] lg:h-[830px]" >
        <EventBg2DarkSVGComponent />
      </div>
      
      {/* Content layer */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default EventsBg1DarkComponent3;