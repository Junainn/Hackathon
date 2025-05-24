import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
  // --- ADD THIS PROXY CONFIGURATION ---
  server: {
    proxy: {
      '/api': { // Any request starting with /api
        target: 'http://localhost:8080', // Proxy to your backend server
        changeOrigin: true, // Needed for virtual hosted sites
        // rewrite: (path) => path.replace(/^\/api/, ''), // Remove /api prefix when forwarding
        // You might need to add configure: (proxy, options) => { proxy.on('error', (err, req, res) => console.log(err)); } for debugging
      },
    },
  },
  // --- END ADDITION ---
});
