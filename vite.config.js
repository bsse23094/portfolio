import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        home: 'index.html',
        projects: 'projects.html',
        privacy: 'privacy.html',
        terms: 'terms.html',
      },
    },
  },
});
