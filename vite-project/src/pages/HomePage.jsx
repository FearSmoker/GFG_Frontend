import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fetchEvents } from "../api/Events_api.js";
import {
  EventCalendar,
  EventCarousel,
  Timeline,
} from "../components/EventComponents.jsx";
import GradientBackground from "../components/GradientBackground.jsx";
import GradientBackgroundDark from "../components/GradientBackgroundDark.jsx";
import useTheme from "../context/ThemeContext.jsx";
import NewLogoLight from "../assets/NewLogoLight.png";
import { Link } from "react-router-dom";
import NationPopup from "../components/NationPopup.jsx";

const HomePage = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [eventDates, setEventDates] = useState([]);
  const [rawEvents, setRawEvents] = useState([]);

  const { themeMode } = useTheme();

  const getEventStatus = (event) => {
    if (!event || !event.date) return "upcoming";

    const currentDate = new Date();
    const eventDate = new Date(event.date);

    currentDate.setHours(0, 0, 0, 0);
    eventDate.setHours(0, 0, 0, 0);

    if (event.eventStatus === "cancelled") {
      return "cancelled";
    }

    if (eventDate < currentDate) {
      return "completed";
    }

    return "upcoming";
  };

  useEffect(() => {
    async function loadEvents() {
      setIsLoading(true);
      try {
        const backendEvents = await fetchEvents();

        const processedEvents = backendEvents.map((event) => ({
          ...event,
          eventStatus: getEventStatus(event),
        }));

        setRawEvents(processedEvents);

        const formattedEvents = backendEvents.map((e) => ({
          id: e._id || e.id,
          title: e.title,
          description: e.description,
          image: e.image,
          date: new Date(e.date).toDateString(),
          eventPrize: e.eventPrize,
          _id: e._id,
        }));

        setEvents(formattedEvents);

        const uniqueDates = [
          ...new Set(formattedEvents.map((event) => event.date)),
        ];
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
    <div className="min-h-screen flex flex-col text-white relative mt-13">
      {themeMode === "dark" ? (
        <GradientBackgroundDark />
      ) : (
        <GradientBackground />
      )}

      
      <NationPopup/>
      
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center flex-grow px-4 md:px-8 text-center min-h-screen">
        {/* Logo Card */}
        <div className="mt-[-3rem] bg-white/20 backdrop-blur-md border-4 border-green-400 rounded-2xl pt-6 md:pt-10 px-6 md:px-10 pb-2 md:pb-3 shadow-lg transition-all duration-500 hover:scale-105">
          <img
            src={NewLogoLight}
            alt="Campus Body"
            className="h-40 md:h-48 mx-auto mb-4"
          />
        </div>
        
        {/* Styled Content Block */}
        <div className={`mt-10 max-w-3xl mx-auto p-6 md:p-8 rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl bg-transparent ${
          themeMode === "dark" 
            ? "text-white" 
            : "text-[#002b46]"
        }`} style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)' }}>
          <p className="text-md md:text-xl leading-relaxed font-semibold">
            We are a student-driven community dedicated to fostering a passion for
            coding, problem-solving, and technology at Madhav Institute of
            Technology and Science. Our mission is to empower students with the
            skills and knowledge needed for success in competitive programming,
            technical interviews, and beyond. Join us for workshops, coding
            challenges, and collaborative learning as we grow together in the
            world of computer science.
          </p>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="w-full">
        <div className="container mx-auto px-4 sm:py-10  sm:mt-0 text-center lg:text-left">
          <h2 className="md:ml-8 text-4xl font-bold mb-12 text-center relative inline-block">
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
                  enableImageClick={true}
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
                  enableImageClick={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="w-full text-center lg:text-left">
        <div className="container mx-auto px-4 py-16">
          <h2 className="md:ml-8 text-4xl font-bold mb-12 text-center relative inline-block">
            <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              EVENT TIMELINE
            </span>
            <span className="block w-full h-1 bg-gradient-to-r from-green-400 to-blue-500 absolute left-0 bottom-[-10px]"></span>
          </h2>

          <div className="max-w-4xl mx-auto">
            <div className="bg-black/30 backdrop-blur-sm p-6 rounded-lg border border-green-400/30">
              <Timeline
                events={rawEvents}
                isLoading={isLoading}
                title=""
                maxItems={5}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;