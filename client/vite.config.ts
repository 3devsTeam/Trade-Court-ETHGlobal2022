import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode, command }) => {
  const isEnvDir =
    command === 'build'
      ? {
          envDir: '../../../../conffiles/'
        }
      : null

  return {
    server: {
      port: 5173
    },
    plugins: [react()],
    build: {
      outDir: 'build'
    },
    isEnvDir
  }
})
