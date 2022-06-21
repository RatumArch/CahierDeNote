import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";
const path = require('path')


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      mode: "development",
      base: "/",
      srcDir: "src",
      filename: "sw.ts",
      includeAssets: ["/favicon.png"],
      strategies: "injectManifest",
      manifest: {
        name: "Test Project",
        short_name: "Test",
        theme_color: "#ffffff",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        icons: [
          {
            src: "icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      devOptions: {
        enabled: true,
        /* when using generateSW the PWA plugin will switch to classic */
        type: 'module',
        navigateFallback: 'index.html',
      },
    }),
  ],
  resolve: {
    alias: [
      { find: /^@\/(.*)/, replacement: path.resolve("src/$1") },
      { find: /^@\/components\/(.*)/, replacement: path.resolve("src/components/$1") },
      { find: /^@\/assets\/(.*)/, replacement:  path.resolve("src/assets/$1", "assets/$1") },
      { find: /^@\/constants\/(.*)/, replacement:  path.resolve("src/constants") },
      { find: /^@\/utils\/(.*)/, replacement: path.resolve("utils/$1")  }
    ],
    extensions: [ '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  }
});
