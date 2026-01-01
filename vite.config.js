import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/3LOGY/", // 일단 이건 꺼두신 거 맞죠?
  
  // ✨ [여기 추가] 주소를 5173으로 강력 고정!
  server: {
    port: 5173,
    strictPort: true, // "다른 방(5174, 5175) 절대 안 씀" 선언
  },
})