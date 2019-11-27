import Vue from 'vue'
import Vuex from 'vuex'
import { auth, googleProvider, db } from '@/firebaseConfig'
import { storeActions, storeMutations, storeState, dataRef } from '@/constant'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import router from '@/router'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    [storeState.isLogin]: null,
    [storeState.isLoading]: false,
    [storeState.user]: {},
    [storeState.listCollection]: [],
    [storeState.listQuestion]: [],
  },
  mutations: {
    ...vuexfireMutations,
    [storeMutations.SET_LOADING](state, payload) {
      state[storeState.isLoading] = payload
      console.log('SET_LOADING', payload)
    },
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
    // Firebase
    [storeActions.bindListQuestion]: firestoreAction(({ bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return new Promise((resolve, reject) => {
        const unsubscrible = auth.onAuthStateChanged(user => {
          unsubscrible()
          if (user && user.uid) {
            const dataPromise = bindFirestoreRef(
              storeState.listQuestion,
              db
                .collection(dataRef.questions.root)
                .doc(user.uid)
                .collection(dataRef.questions.data),
            )
            resolve(dataPromise)
          } else {
            reject(Error('bindListQuestion error'))
          }
        })
      })
    }),
    [storeActions.bindListCollection]: firestoreAction(
      ({ bindFirestoreRef }) => {
        // return the promise returned by `bindFirestoreRef`
        return new Promise((resolve, reject) => {
          const unsubscrible = auth.onAuthStateChanged(user => {
            unsubscrible()
            if (user && user.uid) {
              console.log(user.uid, dataRef.collections.root)
              const dataPromise = bindFirestoreRef(
                storeState.listCollection,
                db
                  .collection(dataRef.collections.root)
                  .doc(user.uid)
                  .collection(dataRef.collections.data),
              )
              resolve(dataPromise)
            } else {
              reject(Error('bindListCollection error'))
            }
          })
        })
      },
    ),
  },
  modules: {},
})

store.dispatch(storeActions.checkLogin)

export default store
