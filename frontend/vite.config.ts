import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
//import fs from 'fs';
//import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode || 'production', process.cwd()); // ✅ fallback to production
  const API_URL = env.VITE_API_URL || 'https://inventoryproject-72il.onrender.com'; // ✅ hard fallback

  console.log('[vite] mode:', mode);
  console.log('[vite] VITE_API_URL:', API_URL);



  return {
    // 👇 Set base path to match GitHub Pages repo name
    base: '/',

    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.svg', 'robots.txt', 'apple-touch-icon.png'],
        manifest: {
          name: 'Home Inventory App',
          short_name: 'Inventory',
          start_url: '/',
          display: 'standalone',
          background_color: '#ffffff',
          theme_color: '#1d4ed8',
          icons: [
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
          ],
        },
      }),
    ],

    server: {
      host: true,
      port: 5173,
      ...(process.env.NODE_ENV === 'development' && {
        // https: {
        //   key: fs.readFileSync(path.resolve(__dirname, 'cert/key.pem')),
        //   cert: fs.readFileSync(path.resolve(__dirname, 'cert/cert.pem')),
        // },
      }),
    },

    define: {
      'import.meta.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL || 'https://inventoryproject-72il.onrender.com'),
    },

    resolve: {
      alias: {
        '@': '/src',
      },
    },

    build: {
      outDir: 'dist',
    },
  };
});
