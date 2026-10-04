import React from "react";
import { createRoot } from "react-dom/client";
import { ConvexReactClient } from "convex/react";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/600.css";
import "@fontsource/dm-sans/700.css";
import App from "./App";
import "./styles.css";
const url = import.meta.env.VITE_CONVEX_URL;
if (!url)
  document.getElementById("root")!.textContent =
    "The app connection is not configured. Run the deployment setup.";
else
  createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <ConvexAuthProvider client={new ConvexReactClient(url)}>
        <App />
      </ConvexAuthProvider>
    </React.StrictMode>,
  );
