// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: false }) // This will open the report in your browser after a build
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Group all node_modules into a vendor chunk
          if (id.includes('node_modules')) {
            // You can create more specific chunks if needed
            if (id.includes('@google/generative-ai')) {
              return 'vendor-google-ai';
            }
            return 'vendor';
          }
        }
      }
    }
  }
});
