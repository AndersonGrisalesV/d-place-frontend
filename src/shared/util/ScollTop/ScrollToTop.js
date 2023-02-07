import React, { useEffect } from "react";

//* ScrollToTop component that scrolls to top of the page whenever the pathname changes
const ScrollToTop = (props, { pathname }) => {
  // useEffect hook that listens for changes in the pathname and executes a scroll to top function
  useEffect(() => {
    // scrolls to the top of the page when pathname changes
    window.scrollTo(0, 0);
  }, [pathname]);

  return <>{props.children}</>;
};

export default ScrollToTop;
