import './assets/main.css'

import { plugin } from '@formkit/vue'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import formkitConfig from '../formkit.config'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia())
app.use(plugin, formkitConfig)

app.mount('#app')
