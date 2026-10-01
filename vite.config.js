import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
<<<<<<< HEAD

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
=======
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss()],
>>>>>>> bc97c92 (Initial commit)
})
