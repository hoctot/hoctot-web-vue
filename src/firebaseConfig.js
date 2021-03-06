// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from 'firebase/app'
// import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/firestore'
// import 'firebase/storage'
import 'firebase/functions'
// import 'firebase/performance'
// import 'firebase/remote-config'
// import 'firebase/messaging' // safari not support

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
firebase.auth().languageCode = 'vi'
// firebase.analytics()
// const firebaseStorage = firebase.storage()

const auth = firebase.auth()
const db = firebase.firestore()
const googleProvider = new firebase.auth.GoogleAuthProvider()

const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp

const deleteField = firebase.firestore.FieldValue.delete
const fieldValue = firebase.firestore.FieldValue
// let messaging
// if (firebase.messaging.isSupported()) {
//   messaging = firebase.messaging()
// }
export { auth, db, googleProvider, serverTimestamp, deleteField, fieldValue }

if (process.env.NODE_ENV !== 'production') {
  window.fb = firebase
}
