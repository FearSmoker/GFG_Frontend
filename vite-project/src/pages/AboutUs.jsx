import React from 'react';

const AboutUs = () => {
  const cardStyle =
    "bg-[#092C4C] text-white p-6 rounded-xl w-full sm:w-[30%]";

  const headingStyle = "text-[#00FFFF] text-2xl font-semibold mb-4 text-center";

  const paragraphStyle = "text-sm text-gray-200 text-justify";

  return (
    <div className="min-h-screen bg-[#071B2B] flex flex-col items-center justify-center px-4 py-10">
      <h2 className="text-4xl font-bold text-[#00FFBF] mb-10">About Us</h2>
      <div className="flex flex-col sm:flex-row gap-6 justify-center items-start w-full max-w-6xl">
        <div className={cardStyle}>
          <h3 className={headingStyle}>Who are we?</h3>
          <p className={paragraphStyle}>
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
            faucibus ex sapien vitae pellentesque sem placerat. In id cursus
            mi pretium tellus duis convallis. Tempus leo eu aenean sed diam
            urna tempor. Pulvinar varius fringilla lacus nec metus bibendum
            egestas. Iaculis massa nisi malesuada lacinia integer nunc posuere.
            Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora
            torquent per conubia nostra inceptos himenaeos.
          </p>
        </div>
        <div className={cardStyle}>
          <h3 className={headingStyle}>Our Vision</h3>
          <p className={paragraphStyle}>
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
            faucibus ex sapien vitae pellentesque sem placerat. In id cursus
            mi pretium tellus duis convallis. Tempus leo eu aenean sed diam
            urna tempor. Pulvinar varius fringilla lacus nec metus bibendum
            egestas. Iaculis massa nisi malesuada lacinia integer nunc posuere.
            Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora
            torquent per conubia nostra inceptos himenaeos.
          </p>
        </div>
        <div className={cardStyle}>
          <h3 className={headingStyle}>Our Mission</h3>
          <p className={paragraphStyle}>
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
            faucibus ex sapien vitae pellentesque sem placerat. In id cursus
            mi pretium tellus duis convallis. Tempus leo eu aenean sed diam
            urna tempor. Pulvinar varius fringilla lacus nec metus bibendum
            egestas. Iaculis massa nisi malesuada lacinia integer nunc posuere.
            Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora
            torquent per conubia nostra inceptos himenaeos.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
