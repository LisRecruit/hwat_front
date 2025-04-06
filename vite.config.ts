import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths({
      projects: ['./tsconfig.json'],
    })
  ],
  resolve: {
    alias: {
      validatorjs: 'validatorjs/dist/validator.js', // remove after validatorjs devs fix bug with non worked validation.fails()
    },
  },
})
