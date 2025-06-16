import * as React from "react";
const EventBg1SVGComponent = (props) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 1440 1050"
    preserveAspectRatio="xMidYMid slice"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_2046_2384)">
      <rect width={1440} height={1050} fill="#F3FAFF" />
      <g filter="url(#filter0_f_2046_2384)">
        <ellipse cx={720.5} cy={1011.5} rx={168.5} ry={133.5} fill="#53FFC9" />
      </g>
    </g>
    <defs>
      <filter
        id="filter0_f_2046_2384"
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
          result="effect1_foregroundBlur_2046_2384"
        />
      </filter>
      <clipPath id="clip0_2046_2384">
        <rect width={1440} height={1050} fill="white" />
      </clipPath>
    </defs>
  </svg>
);
export default EventBg1SVGComponent;
