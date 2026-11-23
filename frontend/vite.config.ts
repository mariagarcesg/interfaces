import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // En desarrollo, /api se reenvía al backend de Go: así la cookie de sesión
    // queda en el mismo origen y no hace falta configurar CORS.
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
})
