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
  getters: {},
  mutations: {
    ...vuexfireMutations,
    [storeMutations.SET_LOADING](state, payload) {
      state[storeState.isLoading] = payload
      console.log('💎 SET_LOADING', payload)
    },
    [storeMutations.SET_LOGIN](state, payload) {
      state[storeState.isLogin] = payload
      console.log('💎 SET_LOGIN', payload)
    },
    [storeMutations.SET_USER](state, payload) {
      state[storeState.user] = payload
      console.log('💎 SET_USER', payload)
    },
  },
  actions: {
    [storeActions.checkLogin]({ dispatch }) {
      console.log('⌛ checkLogin')
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
    // List Question
    [storeActions.bindListQuestion]: firestoreAction(({ bindFirestoreRef }) => {
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
    // List Collection
    [storeActions.bindListCollection]: firestoreAction(
      ({ bindFirestoreRef }) => {
        return new Promise((resolve, reject) => {
          const unsubscrible = auth.onAuthStateChanged(user => {
            unsubscrible()
            if (user && user.uid) {
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
    // Rooms
    [storeActions.bindListRoom]: firestoreAction(({ bindFirestoreRef }) => {
      return new Promise((resolve, reject) => {
        const unsubscrible = auth.onAuthStateChanged(user => {
          unsubscrible()
          if (user && user.uid) {
            const dataPromise = bindFirestoreRef(
              storeState.listRoom,
              db.collection(dataRef.rooms.root),
            )
            resolve(dataPromise)
          } else {
            reject(Error('bindListCollection error'))
          }
        })
      })
    }),
    // Template
    async [storeActions.test]({ commit, state }, payload) {
      commit(storeMutations.SET_LOADING, true)
      try {
        await db
          .collection(dataRef.rooms.root)
          .doc(payload.roomId)
          .set({}, { merge: true })
      } catch (error) {
        console.error(error)
      } finally {
        commit(storeMutations.SET_LOADING, false)
      }
    },
    // End actions
  },
  modules: {},
})

store.dispatch(storeActions.checkLogin)

export default store
