import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: "welcome",
      filename: "remoteEntry.js",
      exposes: {
        "./Welcome": "./src/ui/pages/Clients.tsx",
        // "./Welcome": "./src/index.ts",
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
