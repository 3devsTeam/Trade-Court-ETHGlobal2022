import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    global: {},
    'process.env': {}
  },
  plugins: [
    react(),
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ]
})
