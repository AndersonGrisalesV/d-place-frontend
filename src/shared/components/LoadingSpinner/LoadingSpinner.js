import React from "react";

import "./LoadingSpinner.css";

const LoadingSpinner = (props) => {
  return (
    <div>
      <div
        className={`${
          props.asOverlay ? "lds-dual-ring__overlay" : "lds-dual-ring"
        }`}
      ></div>
    </div>
  );
};

export default LoadingSpinner;
