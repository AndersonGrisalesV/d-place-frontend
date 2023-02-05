import React, { useRef, useEffect } from "react";

import "./Map.css";

// Map using the Google Maps API.
const Map = (props) => {
  const mapRef = useRef();

  const { center, zoom } = props;

  // useRef and useEffect update a map instance with a marker on the given center position.
  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: center,
      zoom: zoom,
    });

    new window.google.maps.Marker({ position: center, map: map });
  }, [center, zoom]);

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
    ></div>
  );
};

export default Map;
