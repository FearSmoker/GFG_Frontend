import * as React from "react";
const EventCardSVGComponent = (props) => (
  <svg
    width={450}
    height={207}
    viewBox="0 0 450 207"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M0 25C0 11.1929 11.1929 0 25 0H425C438.807 0 450 11.1929 450 25V207H0V25Z"
      fill="url(#paint0_linear_2031_668)"
      fillOpacity={0.39}
    />
    <defs>
      <linearGradient
        id="paint0_linear_2031_668"
        x1={225}
        y1={0}
        x2={225}
        y2={207}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#00FFAF" />
        <stop offset={1} stopColor="#002B46" />
      </linearGradient>
    </defs>
  </svg>
);
export default EventCardSVGComponent;
