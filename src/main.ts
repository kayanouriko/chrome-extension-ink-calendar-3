import { createApp } from 'vue'
import { useInkI18n } from './utils/useI18n'
import { useRouter } from './router/router'

import App from './App.vue'

const app = createApp(App)
app.use(useRouter())
app.use(useInkI18n())
app.mount('#app')
