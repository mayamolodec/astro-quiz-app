import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import { defineConfig } from "vite";

dotenv.config(); 

export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      generateScopedName: "[name]__[local]__[hash:hex:5]",
    },
  },
  server: {
    proxy: {
      "/quizes": {
        target: process.env.BACKEND,
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
