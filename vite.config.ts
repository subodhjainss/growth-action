import { defineConfig } from "vite";
export default defineConfig({
  envPrefix: "VITE_",
  server: { host: "0.0.0.0", port: 5173 },
  build: { outDir: "dist", sourcemap: false },
});
