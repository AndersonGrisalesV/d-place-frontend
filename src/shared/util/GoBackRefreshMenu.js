import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { LoginContext } from "../context/login-context";

const GoBackRefreshMenu = (props) => {
  const login = useContext(LoginContext);

  const { pathname } = useLocation();

  const [entry] = performance.getEntriesByType("navigation");
  // Show it in a nice table in the developer console
  console.table(entry.toJSON());

  return <>{props.children}</>;
};

export default GoBackRefreshMenu;
