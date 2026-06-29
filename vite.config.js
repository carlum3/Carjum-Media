import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    fs: {
      allow: ['.', '/Volumes/CarJum Box'],
    },
    proxy: {
      '/media': {
        target: 'http://localhost:5174',
        rewrite: path => path.replace(/^\/media/, ''),
        changeOrigin: true,
      },
    },
  },
})
