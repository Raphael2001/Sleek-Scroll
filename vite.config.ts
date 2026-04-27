import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  root: "demo",
  resolve: {
    alias: [
      {
        find: /.*\/styles\/scrollbar\.css$/,
        replacement: path.resolve(__dirname, "src/styles/Scrollbar.scss"),
      },
    ],
  },
});
