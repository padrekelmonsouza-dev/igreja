import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/proxy/ecclesia": {
        target: "https://news.ecclesia.org.br",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/proxy\/ecclesia/, ""),
      },
      "/proxy/vatican": {
        target: "https://www.vaticannews.va",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/proxy\/vatican/, ""),
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
        },
      },
    },
  },
});
