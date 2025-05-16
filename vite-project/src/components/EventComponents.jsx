import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../css/EventComponents.css";
import "../css/Calender.css";

export const EventCalendar = ({ 
  selectedDate, 
  handleDateChange, 
  eventDates = [] 
}) => {
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const formattedDate = date.toDateString();
      if (eventDates.includes(formattedDate)) {
        return 'has-event';
      }
    }
    return null;
  };

  return (
    <div className="calendar-container">
      <Calendar 
        onChange={handleDateChange} 
        value={selectedDate} 
        tileClassName={tileClassName} 
        className="custom-calendar"
      />
      <p className="mt-2 text-center">Selected: {selectedDate.toDateString()}</p>
    </div>
  );
};

export const EventCarousel = ({ 
  events, 
  isLoading = false, 
  title = "Events",
  className = ""
}) => {
  const carouselSettings = {
    dots: true,
    infinite: events.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: events.length > 1,
    autoplaySpeed: 3000,
    appendDots: dots => (
      <div style={{ bottom: "-30px" }}>
        <ul> {dots} </ul>
      </div>
    )
  };

  const isLarge = className.includes('event-carousel-large');
  
  const imageHeight = isLarge ? "h-80" : "h-40";
  const titleSize = isLarge ? "text-2xl" : "text-lg";
  const descriptionSize = isLarge ? "text-base" : "text-sm";
  const padding = isLarge ? "p-6" : "p-4";
  const marginBottom = isLarge ? "mb-6" : "mb-4";

  return (
    <div className={`event-carousel ${className}`}>
      {title && <h3 className="text-2xl font-semibold mb-6 text-center">{title}</h3>}
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-400"></div>
        </div>
      ) : events.length === 0 ? (
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 text-center">
          <p className="text-gray-300">No events to display</p>
        </div>
      ) : events.length === 1 ? (
        <div
          className={`w-full bg-gray-900/70 rounded-lg ${padding} flex flex-col items-center justify-center text-white relative`}
        >
          <img
            src={events[0].image}
            alt={events[0].title}
            className={`w-full ${imageHeight} object-cover rounded-md ${marginBottom}`}
          />
          <h3 className={`${titleSize} font-bold`}>{events[0].title}</h3>
          <p className="text-gray-300 text-sm mt-1">{events[0].date}</p>
          <p className={`${descriptionSize} mt-2 text-center`}>{events[0].description}</p>
          <div
            className="absolute inset-0 rounded-lg border-2 pointer-events-none"
            style={{
              borderImage: "linear-gradient(90deg, #4ade80, #60a5fa) 1",
              borderImageSlice: 1,
            }}
          ></div>
        </div>
      ) : (
        <Slider {...carouselSettings}>
          {events.map((event) => (
            <div key={event.id} className="px-2">
              <div
                className={`bg-gray-900/70 rounded-lg ${padding} flex flex-col items-center justify-center text-white relative`}
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className={`w-full ${imageHeight} object-cover rounded-md ${marginBottom}`}
                />
                <h3 className={`${titleSize} font-bold`}>{event.title}</h3>
                <p className="text-gray-300 text-sm mt-1">{event.date}</p>
                <p className={`${descriptionSize} mt-2 text-center`}>{event.description}</p>
                <div
                  className="absolute inset-0 rounded-lg border-2 pointer-events-none"
                  style={{
                    borderImage: "linear-gradient(90deg, #4ade80, #60a5fa) 1",
                    borderImageSlice: 1,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export const EventForm = ({
  newEvent,
  setNewEvent,
  handleAddEvent,
  isLoading
}) => {
  return (
    <div className="space-y-2">
      <h4 className="text-lg font-semibold">Add New Event</h4>
      <input
        type="text"
        placeholder="Title"
        value={newEvent.title}
        onChange={(e) =>
          setNewEvent((prev) => ({ ...prev, title: e.target.value }))
        }
        className="w-full p-2 rounded bg-gray-700 text-white"
        disabled={isLoading}
      />
      <textarea
        placeholder="Description"
        value={newEvent.description}
        onChange={(e) =>
          setNewEvent((prev) => ({ ...prev, description: e.target.value }))
        }
        className="w-full p-2 rounded bg-gray-700 text-white"
        disabled={isLoading}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) =>
          setNewEvent((prev) => ({ ...prev, imageFile: e.target.files[0] }))
        }
        className="w-full p-2 rounded bg-gray-700 text-white"
        disabled={isLoading}
      />
      <button
        onClick={handleAddEvent}
        className={`${
          isLoading ? "bg-gray-500 cursor-not-allowed" : "bg-green-500 hover:bg-green-400"
        } text-black font-semibold px-4 py-2 rounded`}
        disabled={isLoading}
      >
        {isLoading ? "Adding..." : "Add Event"}
      </button>
    </div>
  );
};