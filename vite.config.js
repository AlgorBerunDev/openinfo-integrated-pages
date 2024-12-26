import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import ViteComponents from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  base: '/openinfo/', // Добавляем базовый путь
  build: {
    assetsDir: 'ef-assets', // Меняем директорию ассетов
    // Можно также настроить имена файлов
    rollupOptions: {
      output: {
        assetFileNames: 'ef-assets/[name]-[hash][extname]',
        chunkFileNames: 'ef-assets/[name]-[hash].js',
        entryFileNames: 'ef-assets/[name]-[hash].js',
      },
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://new-api.openinfo.uz',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api/'),
      },
      '/uzseapi': {
        target: 'https://uzse.uz',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/uzseapi/, ''), // Adjust path accordingly
      },
    },
  },
  plugins: [
    vue(),
    ViteComponents({
      resolvers: [
        AntDesignVueResolver({
          importSass: true,
        }),
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
