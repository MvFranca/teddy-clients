import "./index.css";
import "@teddy/design-system/dist/style.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ClientsScreen from "./ui/pages/Clients";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClientsScreen />;
  </StrictMode>
);
