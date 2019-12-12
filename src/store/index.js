import Vue from 'vue'
import Vuex from 'vuex'
import { auth, googleProvider, db } from '@/firebaseConfig'
import roomModule from './room'
import { a, m, s, ref, g } from '@/constant'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import router from '@/router'
import { filter, includes, upperCase } from 'lodash'
import { loadingPlugin } from './plugin'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    [s.isLogin]: null,
    [s.isLoading]: false,
    [s.user]: {},
    [s.listCollection]: [],
    [s.listQuestion]: [],
    [s.search]: '',
  },
  getters: {
    [g.getListSearch]: state => stateName =>
      filter(state[stateName], o =>
        includes(upperCase(o.title || o.question), upperCase(state.search)),
      ),
  },
  mutations: {
    ...vuexfireMutations,
    [m.SET_LOADING](state, payload) {
      state[s.isLoading] = payload
    },
    [m.SET_LOGIN](state, payload) {
      state[s.isLogin] = payload
    },
    [m.SET_USER](state, payload) {
      state[s.user] = payload
    },
    [m.SET_SEARCH](state, payload) {
      state[s.search] = payload
    },
  },
  actions: {
    [a.checkLogin]({ dispatch }) {
      auth.onAuthStateChanged(function(user) {
        store.commit(m.SET_LOGIN, Boolean(user))
        store.commit(m.SET_USER, user)
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
    [a.signOut]() {
      auth.signOut()
    },
    [a.login]() {
      auth.signInWithRedirect(googleProvider)
    },
    // List Question
    [a.bindListQuestion]: firestoreAction(({ bindFirestoreRef }) => {
      return new Promise((resolve, reject) => {
        const unsubscrible = auth.onAuthStateChanged(user => {
          unsubscrible()
          if (user && user.uid) {
            const dataPromise = bindFirestoreRef(
              s.listQuestion,
              db
                .collection(ref.questions.root)
                .doc(user.uid)
                .collection(ref.questions.data),
            )
            resolve(dataPromise)
          } else {
            reject(Error('bindListQuestion error'))
          }
        })
      })
    }),
    // List Collection
    [a.bindListCollection]: firestoreAction(({ bindFirestoreRef }) => {
      return new Promise((resolve, reject) => {
        const unsubscrible = auth.onAuthStateChanged(user => {
          unsubscrible()
          if (user && user.uid) {
            const dataPromise = bindFirestoreRef(
              s.listCollection,
              db
                .collection(ref.collections.root)
                .doc(user.uid)
                .collection(ref.collections.data),
            )
            resolve(dataPromise)
          } else {
            reject(Error('bindListCollection error'))
          }
        })
      })
    }),
    // End actions
  },
  modules: {
    room: roomModule,
  },
  plugins: [createLogger(), loadingPlugin],
})

store.dispatch(a.checkLogin)

export default store
