import { resolve } from 'path'
import { defineConfig, Rollup } from 'vite'
import vue from '@vitejs/plugin-vue'
import unocss from 'unocss/vite'
import { vitePluginFakeServer } from 'vite-plugin-fake-server'
import { vitePluginPrintUrls } from './plugins/vite-plugin-print-urls'

// 各种资源的整理
const assetFileNames = (chunkInfo: Rollup.PreRenderedAsset) => {
    let ext = chunkInfo.name.split('.').pop()
    // 将各种图片, 字体分别归为一类, 其余的作为一类
    if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
        ext = 'images'
    } else if (/woff|woff2/i.test(ext)) {
        ext = 'fonts'
    }
    return `assets/${ext}/[name].[hash][extname]`
}
const fileNames = 'assets/js/[name].[hash].js'

// https://vitejs.dev/config/
export default defineConfig({
    define: {
        // vue-i18n csp issue fixed
        // https://vue-i18n.intlify.dev/guide/advanced/optimization#jit-compilation
        // https://github.com/intlify/vue-i18n-next/issues/1457
        __INTLIFY_JIT_COMPILATION__: true
    },
    plugins: [vue(), unocss(), vitePluginFakeServer(), vitePluginPrintUrls()],
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
            '@assets': resolve(__dirname, './src/assets'),
            '@common': resolve(__dirname, './src/common'),
            '@popup': resolve(__dirname, './src/popup'),
            '@option': resolve(__dirname, './src/option')
        }
    },
    build: {
        emptyOutDir: true,
        rollupOptions: {
            input: {
                popup: resolve(__dirname, 'popup.html'),
                option: resolve(__dirname, 'option.html')
            },
            output: {
                assetFileNames,
                chunkFileNames: fileNames,
                entryFileNames: fileNames
            }
        }
    }
})
