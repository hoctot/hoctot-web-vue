import Vue from 'vue'
import Vuex from 'vuex'
import { auth, googleProvider, db, serverTimestamp } from '@/firebaseConfig'
import {
  storeActions,
  storeMutations,
  storeState,
  dataRef,
  routerName,
  roomStatus,
} from '@/constant'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import router from '@/router'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    [storeState.isLogin]: null,
    [storeState.isLoading]: false,
    [storeState.user]: {},
    [storeState.room]: {},
    [storeState.listCollection]: [],
    [storeState.listQuestion]: [],
    [storeState.listRoom]: [],
    [storeState.listRoomUser]: [],
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
    [storeMutations.SET_ROOM](state, payload) {
      console.log('SET_ROOM', payload)
      state[storeState.room] = { ...state[storeState.room], ...payload }
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
    // List User in room
    [storeActions.bindRoomListUser]: firestoreAction(({ bindFirestoreRef }) => {
      return new Promise((resolve, reject) => {
        const unsubscrible = auth.onAuthStateChanged(user => {
          unsubscrible()
          if (user && user.uid) {
            const dataPromise = bindFirestoreRef(
              storeState.listRoomUser,
              db.collection(dataRef.roomListUser.root),
            )
            resolve(dataPromise)
          } else {
            reject(Error('bindListCollection error'))
          }
        })
      })
    }),
    // Create Room
    [storeActions.createRoom]({ commit }, payload) {
      console.log('Create room', payload)
      commit(storeMutations.SET_LOADING, true)
      const { host, collectionId } = payload
      const roomData = {
        collectionId,
        hostInfo: {
          displayName: host.displayName,
          email: host.email,
          uid: host.uid,
          photoURL: host.photoURL,
        },
        status: roomStatus.waitOpen,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      }

      db.collection(dataRef.rooms.root)
        .add(roomData)
        .then(async snapshot => {
          try {
            // const doc = await snapshot.get()
            // commit(storeMutations.SET_ROOM, doc.data())
            router.push({
              name: routerName.roomWait,
              query: {
                roomId: snapshot.id,
                collectionId: payload.collectionId,
              },
            })
          } catch (error) {
            console.error(error)
          }
        })
        .finally(() => {
          commit(storeMutations.SET_LOADING, false)
        })
    },
    async [storeActions.deleteRoom]({ commit }, payload) {
      console.log('Delete room', payload)
      commit(storeMutations.SET_LOADING, true)
      try {
        await db
          .collection(dataRef.rooms.root)
          .doc(payload)
          .delete()
        await db
          .collection(dataRef.roomListUser.root)
          .doc(payload)
          .delete()
        router
          .push({
            name: routerName.room,
          })
          .catch(() => {})
      } catch (error) {
        console.error(error)
      } finally {
        commit(storeMutations.SET_LOADING, false)
      }
    },
    [storeActions.updateRoom]({ commit }, payload) {
      console.log('updateRoom room', payload)
      commit(storeMutations.SET_LOADING, true)
      db.collection(dataRef.rooms.root)
        .doc(payload.roomId)
        .set(payload.data, { merge: true })
        .then(() => {})
        .finally(() => {
          commit(storeMutations.SET_LOADING, false)
        })
    },
    [storeActions.enterRoom]({ commit, state }, payload) {
      console.log('enterRoom room', payload)
      commit(storeMutations.SET_LOADING, true)
      const { displayName, uid, photoURL, email } = state.user
      const enterRoomData = {
        displayName,
        uid,
        photoURL,
        email,
      }
      db.collection(dataRef.roomListUser.root)
        .doc(payload.roomId)
        .set(enterRoomData)
        .then(() => {
          router.push({
            name: routerName.roomWait,
            query: {
              roomId: payload.roomId,
              collectionId: payload.collectionId,
            },
          })
        })
        .finally(() => {
          commit(storeMutations.SET_LOADING, false)
        })
    },
    async [storeActions.setRoomData]({ commit }, payload) {
      console.log('setRoomData room', payload)
      commit(storeMutations.SET_LOADING, true)
      try {
        const docRoom = await db
          .collection(dataRef.rooms.root)
          .doc(payload.roomId)
          .get()
        const data = docRoom.data()
        commit(storeMutations.SET_ROOM, { ...data, roomId: docRoom.id })

        const unsub = db
          .collection(dataRef.rooms.root)
          .doc(payload.roomId)
          .onSnapshot({ includeMetadataChanges: true }, doc => {
            console.log(doc)
            if (!doc.exists) {
              unsub()
              router
                .push({
                  name: routerName.collections,
                })
                .catch(() => {})
            }
          })
      } catch (error) {
        console.error(error)
      } finally {
        commit(storeMutations.SET_LOADING, false)
      }
    },
  },
  modules: {},
})

store.dispatch(storeActions.checkLogin)

export default store
