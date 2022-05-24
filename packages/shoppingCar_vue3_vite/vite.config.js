import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      { find: '@', replacement: resolve(__dirname, 'src')} // 配置路径
    ]
  },
  server: {
    host: '0.0.0.0',
    port: 3006,
    https: false
  }
})
