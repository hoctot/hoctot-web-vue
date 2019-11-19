// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/functions'
import 'firebase/messaging'
import 'firebase/performance'
import 'firebase/remote-config'

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_APIKEY,
  authDomain: 'hoctot-app.firebaseapp.com',
  databaseURL: 'https://hoctot-app.firebaseio.com',
  projectId: 'hoctot-app',
  storageBucket: 'hoctot-app.appspot.com',
  messagingSenderId: '610004924961',
  appId: '1:610004924961:web:07be83c2df6d3b4f97c160',
  measurementId: 'G-DW5ZCZV362',
}

firebase.initializeApp(firebaseConfig)
firebase.analytics()
firebase.auth().languageCode = 'vi'

const auth = firebase.auth()
const db = firebase.firestore()
const googleProvider = new firebase.auth.GoogleAuthProvider()
const firebaseStorage = firebase.storage()
const messaging = firebase.messaging()

Notification.requestPermission().then(permission => {
  if (permission === 'granted') {
    console.log('Notification permission granted.')
    // TODO(developer): Retrieve an Instance ID token for use with FCM.
    // ...
  } else {
    console.log('Unable to get permission to notify.')
  }
})

export { auth, db, googleProvider, firebaseStorage, messaging }

if (process.env.NODE_ENV !== 'production') {
  window.fb = firebase
}
