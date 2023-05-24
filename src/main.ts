import './assets/main.css'
import './assets/tui/tuicss.min.css'
import './assets/tui/tuicss.min.js'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
