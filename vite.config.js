import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  preview: {
    port: process.env.PORT || 4173,
    host: true,
    allowedHosts: ["codemate-web.onrender.com"],
  },
});
