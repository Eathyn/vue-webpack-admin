import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import '@/styles/index.scss'
import i18n from '@/i18n'
import '@/icon/index'
import SvgIcon from '@/component/SvgIcon.vue'

const app = createApp(App)
const pinia = createPinia()

app.component('SvgIcon', SvgIcon)

app.use(router)
app.use(pinia)
app.use(ElementPlus)
app.use(i18n)
app.mount('#app')
