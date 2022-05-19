import { createApp } from 'vue'
import router from './routers'
import App from './App.vue'
import store from './stores'

import './styles/index.css'

const app = createApp(App)

app.use(router)

app.use(store)

app.mount('#app')
