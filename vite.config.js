import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      generateScopedName: "[name]__[local]__[hash:hex:5]",
    },
  },
});
