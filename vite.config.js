import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  publicDir: 'public',
  base: './',
  server: {
    port: 5173,
    open: false
  },
  build: {
    outDir: 'dist'
  }
})
