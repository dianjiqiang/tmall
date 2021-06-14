import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
const attachFastClick = require('fastclick')

attachFastClick.attach(document.body)

createApp(App)
  .use(store)
  .use(router)
  .mount('#app')

