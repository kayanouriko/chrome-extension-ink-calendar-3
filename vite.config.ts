import { fileURLToPath, URL } from 'url'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueI18n from '@intlify/unplugin-vue-i18n/vite'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueI18n({
            include: resolve(__dirname, './src/assets/i18n/**')
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        proxy: {
            '/api': {
                target: 'https://splatoon3.ink',
                changeOrigin: true,
                rewrite: path => path.replace(/^\/api/, '')
            }
        }
    },
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                option: resolve(__dirname, 'option/index.html')
            },
            output: {
                assetFileNames: assetInfo => {
                    let extType = assetInfo.name.split('.').at(1)
                    if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
                        // 图片的和 public 的位置合并在一起
                        return `images/[name].[hash][extname]`
                    } else if (/woff|woff2/i.test(extType)) {
                        extType = 'fonts'
                    }
                    return `assets/${extType}/[name].[hash][extname]`
                },
                chunkFileNames: 'assets/js/[name].[hash].js',
                entryFileNames: 'assets/js/[name].[hash].js'
            }
        },
        emptyOutDir: true,
        chunkSizeWarningLimit: 1000
    }
})
