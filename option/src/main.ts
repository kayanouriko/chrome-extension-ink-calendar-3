import { createApp } from 'vue'
import { initI18n } from '../../src/utils/useI18n'
import App from './App.vue'

const app = createApp(App)
// 国际化插件
const i18n = initI18n()
app.use(i18n)
// 挂载
app.mount('#app')
