import Vue from 'vue'
import Vuex from 'vuex'
import { auth, googleProvider } from '@/firebaseConfig'
import { storeActions, storeMutations, storeState } from '@/constant'
import router from '@/router'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    [storeState.isLogin]: null,
    [storeState.user]: {},
  },
  mutations: {
    [storeMutations.SET_LOGIN](state, payload) {
      state[storeState.isLogin] = payload
      console.log('SET_LOGIN', payload)
    },
    [storeMutations.SET_USER](state, payload) {
      state[storeState.user] = payload
      console.log('SET_USER', payload)
    },
  },
  actions: {
    [storeActions.checkLogin]() {
      console.log('checkLogin')

      auth.onAuthStateChanged(function(user) {
        store.commit(storeMutations.SET_LOGIN, Boolean(user))
        store.commit(storeMutations.SET_USER, user)
        if (user) {
          // User is signed in.
        } else {
          // No user is signed in.
          if (router.currentRoute.path !== '/') {
            router.push('/')
          }
        }
      })
    },
    [storeActions.signOut]() {
      auth.signOut()
    },
    [storeActions.login]() {
      auth.signInWithRedirect(googleProvider)
    },
  },
  modules: {},
})

store.dispatch(storeActions.checkLogin)

export default store
