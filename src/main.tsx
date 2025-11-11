import { StrictMode } from "react";
import "./index.css";
import App from "./App";
import { createRoot } from "react-dom/client";

const rootContainer = document.getElementById("root");
const root = createRoot(rootContainer!);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
