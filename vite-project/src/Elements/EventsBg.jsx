import * as React from "react";
const EventSVGComponent = (props) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 1440 1050"
    preserveAspectRatio="xMidYMid slice"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_2061_1412)">
      <rect width={1440} height={1050} fill="#011725" />
      <path
        d="M0 0H1440V505H0V0Z"
        fill="url(#paint0_linear_2061_1412)"
        fillOpacity={0.7}
      />
      <g filter="url(#filter0_f_2061_1412)">
        <ellipse cx={720.5} cy={1011.5} rx={168.5} ry={133.5} fill="#00895E" />
      </g>
    </g>
    <defs>
      <filter
        id="filter0_f_2061_1412"
        x={152}
        y={478}
        width={1137}
        height={1067}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation={200}
          result="effect1_foregroundBlur_2061_1412"
        />
      </filter>
      <linearGradient
        id="paint0_linear_2061_1412"
        x1={720}
        y1={0}
        x2={720}
        y2={505}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#00FFAF" />
        <stop offset={1} stopColor="#002B46" />
      </linearGradient>
      <clipPath id="clip0_2061_1412">
        <rect width={1440} height={1050} fill="white" />
      </clipPath>
    </defs>
  </svg>
);
export default EventSVGComponent;
