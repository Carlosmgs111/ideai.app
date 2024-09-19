import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    minify: "terser",
    sourcemap: true,
    commonjsOptions: {
      esmExternals: true,
    },
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
      },
      output: {
        // Similar a 'filename: "[name].[contenthash].js"' en Webpack
        entryFileNames: "[name].[hash].js",
        chunkFileNames: "[name].[hash].js",
        assetFileNames: "[name].[hash].[ext]",
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          utils: ["axios", "flatted", "pluralize", "uuid"],
          "socket-io": ["socket.io-client"],
        },
      },
    },
  },
});
