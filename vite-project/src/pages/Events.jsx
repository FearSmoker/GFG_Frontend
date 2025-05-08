import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Events = () => {
  const events = [
    {
      id: 1,
      title: "My Event",
      description: "Event details go here.",
      image: "https://your-image-url",
    },
    {
      id: 2,
      title: "My Event",
      description: "Event details go here.",
      image: "https://your-image-url",
    },
    {
      id: 3,
      title: "My Event",
      description: "Event details go here.",
      image: "https://your-image-url",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center p-10">
      <h2 className="text-white text-4xl font-bold mb-8 relative">
        EVENTS
        <span className="block w-full h-1 bg-white absolute left-0 bottom-[-10px]"></span>
      </h2>

      <div className="w-80">
        <Slider {...settings}>
          {events.map((event) => (
            <div
              key={event.id}
              className="w-60 h-[300px] bg-gray-800 rounded-lg p-4 flex flex-col items-center justify-center text-white relative"
              style={{
                position: "relative",
                borderRadius: "10px",
                background: "#111",
              }}
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-bold">{event.title}</h3>
              <p className="text-sm mt-2 text-center">{event.description}</p>

              <div
                className="absolute inset-0 rounded-lg border-4"
                style={{
                  borderImage: "linear-gradient(90deg, #00ccff, #00ff99) 1",
                  borderImageSlice: 1,
                }}
              ></div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Events;
