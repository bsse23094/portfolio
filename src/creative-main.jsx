import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import CreativeApp from "./CreativeApp";
import "./creative.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CreativeApp />
  </StrictMode>,
);
