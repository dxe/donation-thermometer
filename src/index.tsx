import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const elements = document.getElementsByClassName("dxe-donation-thermometer");

Array.from(elements).forEach((element) => {
  ReactDOM.createRoot(element).render(
    <React.StrictMode>
      <App domElement={element} />
    </React.StrictMode>
  );
});
