import { useEffect } from "react";

const ScrollToTop = () => {
  // Extracts pathname property(key) from an object

  // Automatically scrolls to top whenever pathname changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
};

export default ScrollToTop;
