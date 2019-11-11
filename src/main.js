import Vue from 'vue'
import Buefy from 'buefy'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'buefy/dist/buefy.min.css'
import './baseComponent'
import '@/style/index.scss'

import 'tailwindcss/dist/utilities.min.css'

// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from 'firebase/app'
// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import 'firebase/analytics'
// Add the Firebase products that you want to use
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAeswcVyMU3Cuu1nhEIG1J_oLbUrVUuBEo',
  authDomain: 'hoctot-app.firebaseapp.com',
  databaseURL: 'https://hoctot-app.firebaseio.com',
  projectId: 'hoctot-app',
  storageBucket: 'hoctot-app.appspot.com',
  messagingSenderId: '610004924961',
  appId: '1:610004924961:web:07be83c2df6d3b4f97c160',
  measurementId: 'G-DW5ZCZV362'
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

// For test
// window.firebase = firebase;

Vue.config.productionTip = false
Vue.use(Buefy)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
