import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './baseComponent'
import 'tailwindcss/dist/tailwind.min.css'
import '@/style/index.scss'
import VueTyperPlugin from 'vue-typer'

// For test
// window.firebase = firebase;

Vue.config.productionTip = false

Vue.use(VueTyperPlugin)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
