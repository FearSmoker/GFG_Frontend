import React from 'react';
import useTheme from '../context/ThemeContext';
import OtherPageBg1SVGComponent from '../Elements/OtherPageBg1';
import OtherPageBg1DarkSVGComponent from '../Elements/OtherPageBg1Dark';

const OtherPage1 = () => {
  const { themeMode } = useTheme();

  return (
    <div className="otherpage1-background">
      <div className="otherpage1-background-layer">
        {themeMode === 'dark' ? (
          <OtherPageBg1DarkSVGComponent />
        ) : (
          <OtherPageBg1SVGComponent />
        )}
      </div>
    </div>
  );
};

export default OtherPage1;