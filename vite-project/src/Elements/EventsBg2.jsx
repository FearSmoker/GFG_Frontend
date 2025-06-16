import * as React from "react";
const EventBg2SVGComponent = (props) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 1440 505"
    preserveAspectRatio="xMidYMid slice"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M0 0H1440V505H0V0Z"
      fill="url(#paint0_linear_2046_2385)"
      fillOpacity={0.7}
    />
    <defs>
      <linearGradient
        id="paint0_linear_2046_2385"
        x1={720}
        y1={0}
        x2={720}
        y2={505}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#00FFAF" />
        <stop offset={1} stopColor="#002B46" />
      </linearGradient>
    </defs>
  </svg>
);
export default EventBg2SVGComponent;
