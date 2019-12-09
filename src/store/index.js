import Vue from 'vue'
import Vuex from 'vuex'
import { auth, googleProvider, db } from '@/firebaseConfig'
import roomModule from './room'
import {
  storeActions,
  storeMutations,
  storeState,
  dataRef,
  storeGetter,
} from '@/constant'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import router from '@/router'
import { filter, includes, upperCase } from 'lodash'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    [storeState.isLogin]: null,
    [storeState.isLoading]: false,
    [storeState.user]: {},
    [storeState.listCollection]: [],
    [storeState.listQuestion]: [],
    [storeState.search]: '',
  },
  getters: {
    [storeGetter.getListSearch]: state => stateName =>
      filter(state[stateName], o =>
        includes(upperCase(o.title || o.question), upperCase(state.search)),
      ),
  },
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
    [storeMutations.SET_SEARCH](state, payload) {
      state[storeState.search] = payload
      console.log('💎 SET_SEARCH', payload)
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
  modules: {
    room: roomModule,
  },
})

store.dispatch(storeActions.checkLogin)

export default store
