import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { createVuetify } from 'vuetify'
import 'vuetify/styles' // استایل‌های Vuetify
import '@mdi/font/css/materialdesignicons.css' // آیکون‌های MDI
import './assets/main.css'

const vuetify = createVuetify()
const app = createApp(App)
app.use(vuetify)

app.use(createPinia())
app.use(router)

app.mount('#app')
