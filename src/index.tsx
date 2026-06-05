import React from "react";
import ReactDOM from "react-dom/client";
// Parcel inlines the compiled Tailwind CSS as a string (see `bundle-text:` in
// the Parcel docs) so it can be injected into each widget's shadow root rather
// than into the host page's global stylesheet.
import css from "bundle-text:./index.css";
import App from "./App";

const elements = document.getElementsByClassName("dxe-donation-thermometer");

Array.from(elements).forEach((element) => {
  // Render inside a shadow root so the widget's styles are fully scoped: they
  // can't leak out onto the host page, and the host page's styles can't leak
  // in. Inheritable properties (font, color) still cross the boundary, so the
  // host site keeps control of its own page and the widget adopts its font.
  const shadowRoot = element.attachShadow({ mode: "open" });

  const style = document.createElement("style");
  style.textContent = css;
  shadowRoot.appendChild(style);

  const mount = document.createElement("div");
  shadowRoot.appendChild(mount);

  ReactDOM.createRoot(mount).render(
    <React.StrictMode>
      <App domElement={element} />
    </React.StrictMode>
  );
});
