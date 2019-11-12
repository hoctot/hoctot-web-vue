import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './baseComponent'
import 'tailwindcss/dist/tailwind.min.css'
import '@/style/index.scss'

// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/firestore'

const env = process.env;

const firebaseConfig = {
  apiKey: env.VUE_APP_FIREBASE_APIKEY,
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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
