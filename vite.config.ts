import path from 'path';
<<<<<<< HEAD
=======
import react from '@vitejs/plugin-react'

>>>>>>> d1a2f920a1c57cba3f47e19dae7a90a91fba6361
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
<<<<<<< HEAD
=======

          base: './',
>>>>>>> d1a2f920a1c57cba3f47e19dae7a90a91fba6361
        }
      }
    };
});
<<<<<<< HEAD
=======

>>>>>>> d1a2f920a1c57cba3f47e19dae7a90a91fba6361
