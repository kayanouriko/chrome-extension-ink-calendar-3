import { createApp } from 'vue'
import { useInkI18n } from '../../src/utils/useI18n'
import App from './App.vue'

const app = createApp(App)
app.use(useInkI18n())
app.mount('#app')
