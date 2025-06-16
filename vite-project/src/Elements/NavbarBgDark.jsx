import * as React from "react";
const NavbarDarkSVGComponent = (props) => (
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
          backdropFilter: "blur(8.45px)",
          clipPath: "url(#bgblur_dark_clip_path)",
          height: "100%",
          width: "100%",
        }}
      />
    </foreignObject>
    <rect
      data-figma-bg-blur-radius={16.9}
      width={1440}
      height={86}
      fill="#011725"
      fillOpacity={0.5}
    />
    <defs>
      <clipPath
        id="bgblur_dark_clip_path"
        transform="translate(16.9 16.9)"
      >
        <rect width={1440} height={86} />
      </clipPath>
    </defs>
  </svg>
);
export default NavbarDarkSVGComponent;
