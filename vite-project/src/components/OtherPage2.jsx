import React from 'react';
import useTheme from '../context/ThemeContext';
import OtherPageBg2SVGComponent from '../Elements/OtherPageBg2';
import OtherPageBg2DarkSVGComponent from '../Elements/OtherPageBg2Dark';

const OtherPage2 = () => {
  const { themeMode } = useTheme();

  return (
    <div className="otherpage2-background">
      <div className="otherpage2-background-layer">
        {themeMode === 'dark' ? (
          <OtherPageBg2DarkSVGComponent />
        ) : (
          <OtherPageBg2SVGComponent />
        )}
      </div>
    </div>
  );
};

export default OtherPage2;