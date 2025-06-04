import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "favicon.png",
        "icon512_maskable.png",
        "icon196_rounded.png",
        "image/kelas/*",
        "image/testimonial/*",
        "screenshots/screenshot-desktop.png",
        "screenshots/screenshot-mobile2.png",
        "MeatWatch1(1).png",
        "default-avatar.png",
        "meat3.png",
        "success.png",
        "warning.png",
        "MeatWatch1.svg",
      ],
      manifest: {
        id: "/",
        name: "Meat Watch",
        short_name: "MeatWatch",
        description:
          "Aplikasi untuk mendeteksi dan mengelola informasi kesegaran daging",
        theme_color: "#dc3545",
        background_color: "#ffffff",
        start_url: "/",
        display: "standalone",
        display_override: ["window-controls-overlay", "standalone"],
        icons: [
          {
            src: "icon196_rounded.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icon512_maskable.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        screenshots: [
          {
            src: "screenshots/screenshot-desktop.png",
            sizes: "1368x720",
            type: "image/png",
            form_factor: "wide",
          },
          {
            src: "screenshots/screenshot-mobile2.png",
            sizes: "390x867",
            type: "image/png",
            // form_factor tidak diisi = dianggap mobile
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern:
              /^https:\/\/meatwatch-backend\.up\.railway\.app\/api\/.*$/,
            handler: "NetworkFirst",
            options: {
              cacheName: "backend-api-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 86400, // 1 hari
              },
            },
          },
          {
            urlPattern:
              /^https:\/\/meatwatch-model\.up\.railway\.app\/predict$/,
            handler: "NetworkFirst",
            options: {
              cacheName: "model-api-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 86400, // 1 hari
              },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@context": path.resolve(__dirname, "./src/context"),
    },
  },
});
