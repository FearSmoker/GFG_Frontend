import * as React from "react";

const NavbarSVGComponent = (props) => (
  <svg
    width={1440}
    height={86}
    viewBox="0 0 1440 86"
    preserveAspectRatio="xMidYMid slice"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <foreignObject x={-16.9} y={-16.9} width={1473.8} height={119.8}>
      <div
        xmlns="http://www.w3.org/1999/xhtml"
        style={{
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          background: "rgba(255, 255, 255, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          borderRadius: "8px",
          height: "100%",
          width: "100%",
        }}
      />
    </foreignObject>
    <rect
      data-figma-bg-blur-radius={16.9}
      width={1440}
      height={86}
      fill="url(#glassGradient)"
    />
    <defs>
      <linearGradient id="glassGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#bbeFDE" stopOpacity="0.5" />
      </linearGradient>
      <clipPath
        id="bgblur_0_76_2088_clip_path"
        transform="translate(16.9 16.9)"
      >
        <rect width={1440} height={86} />
      </clipPath>
    </defs>
  </svg>
);

export default NavbarSVGComponent;
