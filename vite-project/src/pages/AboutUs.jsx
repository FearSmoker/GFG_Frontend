import React from "react";

const AboutUs = () => {
  const cardData = [
    {
      title: "Who are we?",
      text: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos."
    },
    {
      title: "Our Vision",
      text: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos."
    },
    {
      title: "Our Mission",
      text: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos."
    }
  ];

  return (
    <div>
      <div className="bg-[#000000] min-h-screen text-white flex flex-col items-center gap-10 py-20 px-4 justify-center">
        {/* About Us Heading */}
        <div
          style={{
            color: "#00FFAF",
            fontSize: "60px",
            fontFamily: "Cabin",
            fontWeight: 700,
            wordWrap: "break-word",
            textAlign: "center",
          }}
        >
          About Us
        </div>

        {/* Cards Section */}
        <div className="flex flex-col lg:flex-row gap-6 justify-center items-stretch w-full max-w-[1400px] px-4">
          {cardData.map((card, index) => (
            <div
              key={index}
              className="flex-1 min-w-[280px] max-w-[420px] bg-[#002B46] rounded-[20px] border border-[#004C7C] p-6 flex flex-col"
              style={{ height: "374px" }}
            >
              <h2 className="text-[#00FFF2] text-[32px] font-bold font-[Cabin] mb-4">
                {card.title}
              </h2>
              <p className="text-white text-[16px] font-[Cabin] font-normal overflow-y-auto">
                {card.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
