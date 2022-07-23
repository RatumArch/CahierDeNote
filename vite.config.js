import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";
import path from 'path'


// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          indexx: [ './src/App.vue' ],
          noteEditor: [ './src/components/NoteEditor.vue' ],
          laTexNode: [ './src/components/LatexNode.vue' ]
        }
      }
    }
  },
  envDir: '.',
  plugins: [
    vue(),
    VitePWA({
      mode: "development",
      base: "/",
      srcDir: "src",
      filename: "sw.ts",
      includeAssets: ["/icon-240.png"],
      strategies: "injectManifest",
      manifest: {
        name: "Cahier de Notes",
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
            src: "/icon-240.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "icon-240.png",
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
      { find: /^@\/constants\/(.*)/, replacement:  path.resolve(__dirname, "src/constants/$1") },
      { find: /^@\/utils\/(.*)/, replacement: path.resolve(__dirname, "src/utils/$1")  },
      { find: /^@\/styles\/(.*)/, replacement: path.resolve(__dirname, "src/styles/$1")  }
    ],
    extensions: [ '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  }
});
