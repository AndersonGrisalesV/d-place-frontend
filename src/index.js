import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

//* Remember that BrowserRouter is a router v6 implementation that uses the HTML5 history API
//* (pushstate, replacestate, and popstate events) to keep your UI in sync with the URL.
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
