import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
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
    define: {
      'import.meta.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL),
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
