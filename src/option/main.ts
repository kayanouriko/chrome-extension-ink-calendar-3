import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createAppI18n } from '@/common/i18n'

import App from './App.vue'

import 'virtual:uno.css'
import '@unocss/reset/tailwind.css'
// splatoon 专用字体
import '@assets/css/fonts.css'

const pinia = createPinia()
const i18n = createAppI18n()

const app = createApp(App)
app.use(pinia).use(i18n)
app.mount('#app')
