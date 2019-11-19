import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './baseComponent'

import 'tailwindcss/dist/tailwind.min.css'
import '@/style/index.scss'

import VueTyperPlugin from 'vue-typer'

import '@/firebaseConfig'

Vue.config.productionTip = false

Vue.use(VueTyperPlugin)

export default new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
