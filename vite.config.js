import { defineConfig, loadEnv } from 'vite'
import replace from '@rollup/plugin-replace'

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [
      replace({
        preventAssignment: true,
        'process.env.VITE_API_ID': JSON.stringify(env.VITE_API_ID),
        'process.env.VITE_API_KEY': JSON.stringify(env.VITE_API_KEY),
      }),
    ],
    rollupOptions: {
        input: {
          main: '/js/main.js'
        },
      },
  }
});
