import React from 'react';
import useTheme from '../context/ThemeContext';
import OtherPageBg3SVGComponent from '../Elements/OtherPageBg3';
import OtherPageBg3DarkSVGComponent from '../Elements/OtherPageBg3Dark';

const OtherPage3 = () => {
  const { themeMode } = useTheme();

  return (
    <div className="otherpage3-background">
      <div className="otherpage3-background-layer">
        {themeMode === 'dark' ? (
          <OtherPageBg3DarkSVGComponent />
        ) : (
          <OtherPageBg3SVGComponent />
        )}
      </div>
    </div>
  );
};

export default OtherPage3;