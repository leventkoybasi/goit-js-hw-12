import { defineConfig } from "vite";

export default defineConfig({
  define: {
    global: "window",
  },
  root: "./",
  base: "/",
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    open: true,
  },
});
