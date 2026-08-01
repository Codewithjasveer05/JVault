import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Resets the window scroll position to the top every time the route
// (pathname) changes. Without this, React Router keeps whatever scroll
// position you were at on the previous page, so navigating to a new
// page can land you mid-page or at the footer instead of the top.
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
};

export default ScrollToTop;