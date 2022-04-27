import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import codesandbox from "@gsimone/codesandbox-vite-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), codesandbox()],
});
