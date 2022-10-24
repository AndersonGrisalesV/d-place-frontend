import React, { useEffect } from "react";

const ScrollToTop = (props, { pathname }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <>{props.children}</>;
};

export default ScrollToTop;
