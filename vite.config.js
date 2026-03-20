import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'three-core': ['three'],
          'three-fiber': ['@react-three/fiber', '@react-three/drei'],
          'three-post': ['@react-three/postprocessing', 'postprocessing'],
          'motion': ['framer-motion', 'gsap'],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
})
