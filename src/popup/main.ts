import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createAppRouter } from '@/popup/router'
import { createAppI18n } from '@/common/i18n'

import App from './App.vue'

import 'virtual:uno.css'
import '@unocss/reset/tailwind.css'
// splatoon 专用字体
import '@assets/css/fonts.css'

const pinia = createPinia()
const router = createAppRouter()
const i18n = createAppI18n()

const app = createApp(App)
// 使用插件
app.use(pinia).use(router).use(i18n)
// 挂载
app.mount('#app')
