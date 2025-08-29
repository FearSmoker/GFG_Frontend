import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 0);

      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      const mainContainer =
        document.querySelector("main") ||
        document.querySelector("#root") ||
        document.querySelector(".app");
      if (mainContainer) {
        mainContainer.scrollTop = 0;
      }

      const scrollableElements = document.querySelectorAll(
        '[data-scroll="true"], .overflow-auto, .overflow-y-auto, .overflow-scroll'
      );
      scrollableElements.forEach((element) => {
        element.scrollTop = 0;
      });
    };

    scrollToTop();

    const timeoutId = setTimeout(scrollToTop, 100);

    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
