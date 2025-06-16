import React, { useEffect, useRef } from "react";
import "../css/GradientBackground.css";

const GradientBackground = () => {
  const interactiveRef = useRef(null);
  const blobRefs = useRef([]);

  useEffect(() => {
    let curX = 0,
      curY = 0,
      tgX = 0,
      tgY = 0;

    const lerp = (start, end, t) => start + (end - start) * t;
    const lerpColor = (startColor, endColor, t) =>
      startColor.map((c, i) => lerp(c, endColor[i], t));

    const getCSSVarColor = (varName) => {
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue(varName)
        .trim();
      return value.split(",").map((n) => parseInt(n.trim(), 10));
    };

    let curColor = getCSSVarColor("--color1");
    let tgColor = getCSSVarColor("--color1");
    
    const blobColors = [
      getCSSVarColor("--color1"),
      getCSSVarColor("--color2"),
      getCSSVarColor("--color3"),
      getCSSVarColor("--color4"),
      getCSSVarColor("--color5"),
    ];

    const handleMouseMove = (event) => {
      tgX = event.clientX;
      tgY = event.clientY;

      let minDistance = Infinity;
      let closestIndex = 0;

      blobRefs.current.forEach((blob, index) => {
        if (!blob) return;
        const rect = blob.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distance = Math.hypot(centerX - tgX, centerY - tgY);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      tgColor = blobColors[closestIndex];
    };

    const move = () => {
      curX += (tgX - curX) / 20;
      curY += (tgY - curY) / 20;

      curColor = lerpColor(curColor, tgColor, 0.1);

      if (interactiveRef.current) {
        interactiveRef.current.style.transform = `translate(${Math.round(
          curX
        )}px, ${Math.round(curY)}px)`;
        const [r, g, b] = curColor.map((c) => Math.round(c));
        interactiveRef.current.style.background = `radial-gradient(circle at center, rgba(${r}, ${g}, ${b}, 0.8) 0%, rgba(${r}, ${g}, ${b}, 0) 50%)`;
      }

      requestAnimationFrame(move);
    };

    window.addEventListener("mousemove", handleMouseMove);
    move();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="gradient-bg">
      <svg>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="
              1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              0 0 0 20 -10"
            result="goo"
          />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
      </svg>

      <div className="gradients-container">
        {["g1", "g2", "g3", "g4", "g5"].map((cls, i) => (
          <div
            key={cls}
            className={cls}
            ref={(el) => (blobRefs.current[i] = el)}
          />
        ))}
        <div className="interactive" ref={interactiveRef}></div>
      </div>
    </div>
  );
};

export default GradientBackground;
