import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'

// https://vitejs.dev/config/
<<<<<<< HEAD
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, 'env')

  return {
    define: {
      global: {},
      'process.env': {}
    },
    plugins: [
      react(),
      legacy({
        targets: ['defaults', 'not IE 11']
      })
    ],
    build: {
      outDir: 'build'
    }
  }
=======
export default defineConfig({
  define: {
    global: {},
    'process.env': {}
  },
  // preview: {
  //   port: 5137
  // },
  plugins: [
    react(),
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ],
  envDir: '../../../../conffiles/'
>>>>>>> ccc1d205d1a51ce8f364a44e036d13dcdff4c4f9
})
