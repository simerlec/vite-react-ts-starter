import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppComponent from "./App";

const rootContainer = document.getElementById("root");

if (!rootContainer) {
  throw new Error('Root element "#root" not found in index.html');
}

createRoot(rootContainer).render(
  <StrictMode>
    <AppComponent />
  </StrictMode>,
);
