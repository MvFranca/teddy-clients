import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: "clients",
      filename: "remoteEntry.js",
      exposes: {
        "./Clients": "./src/ui/pages/Clients.tsx",
        "./SelectClients": "./src/ui/pages/SelectClients.tsx",

      },
      shared: ["react", "react-dom"],
      
    }),
  ],
  build: {
    target: "esnext",
    cssCodeSplit: false,
  },
  server: {
    port: 5176,
    cors: true,
  },
});
