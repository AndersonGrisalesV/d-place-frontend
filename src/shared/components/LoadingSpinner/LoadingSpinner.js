import React from "react";

import "./LoadingSpinner.css";

const LoadingSpinner = (props) => {
  return (
    <div>
      {/* Render the loading spinner, using the className prop to determine
           whether the spinner should be displayed as an overlay or not */}
      <div
        className={`${
          props.asOverlay ? "lds-dual-ring__overlay" : "lds-dual-ring"
        }`}
      ></div>
    </div>
  );
};

export default LoadingSpinner;
