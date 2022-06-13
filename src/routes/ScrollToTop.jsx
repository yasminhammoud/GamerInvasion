import { useEffect } from "react";
import { useLocation } from "react-router";

/**
 * Function that is used to check when the location changes, scroll to the top of the page.
 */
const ScrollToTop = (props) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <>{props.children}</>
};

export default ScrollToTop;