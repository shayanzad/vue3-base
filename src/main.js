import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { createVuetify } from 'vuetify'
import 'vuetify/styles' // استایل‌های Vuetify
import '@mdi/font/css/materialdesignicons.css' // آیکون‌های MDI
import './assets/main.css'
// استایل پیش‌فرض
import 'vue-toastification/dist/index.css'
import Toast from 'vue-toastification'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
// تنظیمات پیش‌فرض
const options = {
  timeout: 2000,
  position: 'bottom-left',
  hideProgressBar: false,
}
const vuetify = createVuetify()
const app = createApp(App)
app.use(vuetify)
app.use(Toast, options)
app.use(createPinia())
app.use(router)
app.use(VueSweetalert2)

app.mount('#app')
