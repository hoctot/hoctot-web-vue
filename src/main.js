import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './baseComponent'
import 'tailwindcss/dist/tailwind.min.css'
import '@/style/index.scss'

// For test
// window.firebase = firebase;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
