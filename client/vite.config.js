import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
 publicDir: "public",
  server: {
    proxy: {
      "/api": {
        target: "https://quickshowmovies-1.onrender.com",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
