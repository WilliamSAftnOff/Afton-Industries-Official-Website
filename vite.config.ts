import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env from current directory, including non-prefixed ones
  const env = loadEnv(mode, process.cwd(), '');
  
  // On Vercel, environment variables are available in process.env during build.
  // We check multiple common naming conventions to ensure the key is captured.
  const apiKey = env.VITE_GEMINI_API_KEY || 
                 process.env.VITE_GEMINI_API_KEY || 
                 env.API_KEY || 
                 process.env.API_KEY || 
                 "";

  return {
    plugins: [react()],
    define: {
      // This shim allows 'process.env.API_KEY' to be used in client code.
      // Vite replaces every instance of this string with the actual key value during build.
      'process.env.API_KEY': JSON.stringify(apiKey)
    },
    build: {
      outDir: 'dist',
      sourcemap: true,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: false
        }
      }
    }
  };
});