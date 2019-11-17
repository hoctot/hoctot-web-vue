<template>
  <div>

    <div>
      <div id="firebaseui-auth-container"></div>
    </div>

    <div class="container mx-auto text-center mt-2">
      <div class="mb-8">
        <vue-typer :shuffle='true' class="title-app" :text="['Ôn tập kiến thức','Thi đấu trực tuyến','Chia sẻ câu hỏi', 'Và nhiều tiện ích khác ...']" ></vue-typer>
      </div>
      <div>
        <router-link to="collections">
          <BaseButton>Bắt đầu ngay</BaseButton>
        </router-link>
        <br />
        <router-link to="about">
          <button class="text-blue-500 mt-5">Giới thiệu</button>
        </router-link>
      </div>
    </div>

    <div>
      <div>
        <img class="mx-auto" src="/img/undraw/learn.png" width="50%" />
      </div>
    </div>
  </div>
</template>

<script>
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/firestore'

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
firebase.auth().languageCode = 'vi';

export default {
  beforeMount() {

  },
}
</script>

<style scoped>
  .title-app {
    font-size: 2rem;
  }
</style>
