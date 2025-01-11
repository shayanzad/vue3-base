import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import vuetify from 'vite-plugin-vuetify'
// import Components from 'unplugin-vue-components/vite'
// import AutoImports from 'unplugin-auto-import/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    vuetify({
      autoImport: true,
    }),
    // Components({
    //   dts: true,
    // }),
    // AutoImports({
    //   imports: [
    //     'vue',
    //     // '@vueuse/core',
    //     'pinia',
    //     'vue-router',
    //   ],
    //   vueTemplate: true,
    //   dirs: [
    //     'src/stores/*.ts',
    //     'src/models/*.ts',
    //     'src/models/**/*.ts',
    //     'src/utils/*.ts',
    //     'src/composables/*.ts',
    //   ],
    //   dts: './auto-imports.d.ts',
    //   // dts:'src/components.d.ts',
    // }),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
