import React, { useState, useEffect } from "react";
import { fetchEvents } from "../api/Events_api.js";
import { EventCalendar, EventCarousel } from "../components/EventComponents.jsx";

const HomePage = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [eventDates, setEventDates] = useState([]);

  useEffect(() => {
    async function loadEvents() {
      setIsLoading(true);
      try {
        const backendEvents = await fetchEvents();
        const formattedEvents = backendEvents.map((e) => ({
          id: e._id || e.id,
          title: e.title,
          description: e.description,
          image: e.image,
          date: new Date(e.date).toDateString(),
        }));
        
        setEvents(formattedEvents);
        
        const uniqueDates = [...new Set(formattedEvents.map(event => event.date))];
        setEventDates(uniqueDates);
      } catch (error) {
        console.error("Error loading events:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadEvents();
  }, []);

  const handleDateChange = (date) => setSelectedDate(date);

  const eventsForDay = events.filter(
    (event) => event.date === selectedDate.toDateString()
  );

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center text-white"
      style={{ backgroundImage: "url('/src/assets/background.png')" }}
    >
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center flex-grow px-4 md:px-8 text-center h-[42rem]">
        {/* Logo Card */}
        <div className="bg-white/20 backdrop-blur-md border-4 border-green-400 rounded-2xl p-6 md:p-10 shadow-lg transition-all duration-500 hover:scale-105">
          <img
            src="/src/assets/logo.png"
            alt="Student Chapter"
            className="h-24 md:h-32 mx-auto mb-4"
          />
        </div>
        {/* Paragraph */}
        <p className="mt-10 max-w-3xl text-white text-md md:text-xl leading-relaxed font-semibold">
          We are a student-driven community dedicated to fostering a passion for coding, 
          problem-solving, and technology at Madhav Institute of Technology and Science. 
          Our mission is to empower students with the skills and knowledge needed for success 
          in competitive programming, technical interviews, and beyond. Join us for workshops, 
          coding challenges, and collaborative learning as we grow together in the world of 
          computer science.
        </p>
      </div>

      {/* Timeline Section */}
      <div className="w-full">
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold mb-12 text-center relative inline-block">
            <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              UPCOMING EVENTS
            </span>
            <span className="block w-full h-1 bg-gradient-to-r from-green-400 to-blue-500 absolute left-0 bottom-[-10px]"></span>
          </h2>

          <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start justify-center">
            {/* Main Events Carousel */}
            <div className="w-full lg:w-1/3 max-w-md order-2 lg:order-1">
              <div className="bg-black/30 backdrop-blur-sm p-6 rounded-lg border border-green-400/30">
                <EventCarousel 
                  events={events} 
                  isLoading={isLoading}
                  title="Featured Events"
                />
              </div>
            </div>
            
            {/* Calendar Section */}
            <div className="w-full lg:w-1/3 order-1 lg:order-2 flex flex-col items-center">
              <div className="calendar-container bg-black/30 backdrop-blur-sm p-6 rounded-lg border border-green-400/30">
                <EventCalendar 
                  selectedDate={selectedDate}
                  handleDateChange={handleDateChange}
                  eventDates={eventDates}
                />
              </div>
            </div>
            
            {/* Timeline for Selected Date */}
            <div className="w-full lg:w-1/3 max-w-md order-3">
              <div className="bg-black/30 backdrop-blur-sm p-6 rounded-lg border border-green-400/30">
                <EventCarousel 
                  events={eventsForDay} 
                  isLoading={isLoading}
                  title={`Events on ${selectedDate.toDateString()}`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;