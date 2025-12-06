import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    base: '/',
    define: {
      // Robustly handle environment variables
      'process.env.API_KEY': JSON.stringify(env.API_KEY || ''),
      // Polyfill process.env to prevent "process is not defined" crashes in libraries
      'process.env': JSON.stringify({}) 
    }
  };
});