
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
// Import process explicitly to ensure the cwd() method is correctly recognized by TypeScript in Node.js scripts
import process from 'node:process';

export default defineConfig(({ mode }) => {
  // Load env from current directory, including non-prefixed ones
  const env = loadEnv(mode, process.cwd(), '');
  
  // Captures the API key from both standard and VITE-prefixed environment variables.
  // This ensures that whether you use Vercel or Netlify, the key is found.
  const apiKey = env.VITE_GEMINI_API_KEY || 
                 process.env.VITE_GEMINI_API_KEY || 
                 env.API_KEY || 
                 process.env.API_KEY || 
                 "";

  return {
    plugins: [react()],
    define: {
      // Shims 'process.env.API_KEY' so the code in services/gemini.ts 
      // can access it globally in the browser after the build.
      'process.env.API_KEY': JSON.stringify(apiKey)
    },
    build: {
      outDir: 'dist',
      sourcemap: true,
      minify: 'esbuild'
    }
  };
});
