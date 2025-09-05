import * as React from "react";
import EventBg1SVGComponent from '../Elements/EventsBg1.jsx';
import EventBg2SVGComponent from '../Elements/EventsBg2.jsx';

const EventsBg1Component = ({ 
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
        <EventBg1SVGComponent />
      </div>
      
      {/* Light gradient overlay with customizable height */}
      <div className="absolute top-0 left-0 w-full h-[1260px] sm:h-[500px] md:h-[700px] lg:h-[890px]" >
        <EventBg2SVGComponent />
      </div>
      
      {/* Content layer */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default EventsBg1Component;