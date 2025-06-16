import React, { useEffect, useRef } from "react";
import "../css/GradientBackgroundDark.css";

const GradientBackgroundDark = () => {
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

    let curColor = getCSSVarColor("--color1-dark");
    let tgColor = getCSSVarColor("--color1-dark");
    
    const blobColors = [
      getCSSVarColor("--color1-dark"),
      getCSSVarColor("--color2-dark"),
      getCSSVarColor("--color3-dark"),
      getCSSVarColor("--color4-dark"),
      getCSSVarColor("--color5-dark"),
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
    <div className="gradient-bg-dark">
      <svg>
        <filter id="goo-dark">
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

      <div className="gradients-container-dark">
        {["g1-dark", "g2-dark", "g3-dark", "g4-dark", "g5-dark"].map((cls, i) => (
          <div
            key={cls}
            className={cls}
            ref={(el) => (blobRefs.current[i] = el)}
          />
        ))}
        <div className="interactive-dark" ref={interactiveRef}></div>
      </div>
    </div>
  );
};

export default GradientBackgroundDark;