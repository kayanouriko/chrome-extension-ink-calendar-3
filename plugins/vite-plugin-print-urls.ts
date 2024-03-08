import { Plugin } from 'vite'

// 用于修改打印时候的提示语.

// 关于如何自定义 server 启动时 printUrls 的讨论
// @see https://github.com/vitejs/vite/issues/10994#issuecomment-1321821858

// 关于如何获取 cli 命令参数的讨论
// @see https://github.com/vitejs/vite/issues/7065#issuecomment-1114139804
export function vitePluginPrintUrls(): Plugin {
    let config
    return {
        name: 'vite-plugin-print-urls',
        apply: 'serve',
        configResolved(resolvedConfig) {
            config = resolvedConfig
        },
        configureServer(server) {
            const html = config.mode.includes('popup') ? 'popup.html' : 'option.html'
            const { printUrls } = server
            server.printUrls = () => {
                const { resolvedUrls } = server
                resolvedUrls.local = resolvedUrls.local.map(url => url + html)
                resolvedUrls.network = resolvedUrls.network.map(url => url + html)
                server.resolvedUrls = resolvedUrls
                printUrls()
            }
        }
    }
}
