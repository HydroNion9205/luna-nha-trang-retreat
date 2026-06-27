import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    watch: {
      // Bỏ qua file tạm (.~tmp) để tránh lỗi EBUSY khi copy ảnh
      ignored: ['**/*.~tmp', '**/*.tmp', '**/~*'],
    },
  },
})
