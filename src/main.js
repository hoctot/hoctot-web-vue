import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './baseComponent'

import 'tailwindcss/dist/tailwind.min.css'
import '@/style/index.scss'

import VueTyperPlugin from 'vue-typer'
import { firestorePlugin } from 'vuefire'
import { Promised } from 'vue-promised'

import '@/firebaseConfig'

Vue.config.productionTip = false

Vue.component('Promised', Promised)
Vue.use(VueTyperPlugin)
Vue.use(firestorePlugin)

const vm = new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

window.vm = vm
export default vm
