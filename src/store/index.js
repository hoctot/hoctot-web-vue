import Vue from 'vue'
import Vuex from 'vuex'
import {
  auth,
  googleProvider,
  db,
  serverTimestamp,
  deleteField,
} from '@/firebaseConfig'
import {
  storeActions,
  storeMutations,
  storeState,
  dataRef,
  routerName,
  roomStatus,
  dataPrefix,
  storeGetter,
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
  },
  getters: {
    [storeGetter.roomListUser]: state => {
      const a = state.room
      return Object.keys(a)
        .filter(i => i.includes(dataPrefix.user))
        .map(i => a[i])
    },
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
    [storeMutations.SET_ROOM](state, payload) {
      console.log('💎 SET_ROOM', payload)
      state[storeState.room] = payload
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
          // Check in room
          dispatch(storeActions.checkInRoom)
        } else {
          // No user is signed in.
          if (router.currentRoute.path !== '/') {
            router.push('/')
          }
        }
      })
    },
    [storeActions.checkInRoom]({ state, dispatch }) {
      db.collection(dataRef.rooms.root)
        // .where('hostInfo.uid', '==', state.user.uid)
        .where(dataPrefix.user + state.user.uid + '.uid', '==', state.user.uid)
        .get()
        .then(s => {
          if (s.size) {
            // const room = s.docs[0].data()
            const roomId = s.docs[0].id
            dispatch(storeActions.enterRoom, { roomId })
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
    // Create Room
    [storeActions.createRoom]({ commit, state }, payload) {
      console.log('⌛ Create room', payload)
      commit(storeMutations.SET_LOADING, true)
      const { host, collectionId } = payload
      const { displayName, uid, photoURL, email } = state.user
      const enterRoomData = {
        displayName,
        uid,
        photoURL,
        email,
      }
      const roomData = {
        collectionId,
        collection: payload.item,
        hostInfo: {
          displayName: host.displayName,
          email: host.email,
          uid: host.uid,
          photoURL: host.photoURL,
        },
        [dataPrefix.user + uid]: enterRoomData,
        status: roomStatus.wait,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      }

      db.collection(dataRef.rooms.root)
        .add(roomData)
        .then(async snapshot => {
          try {
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
      console.log('⌛ Delete room', payload)
      commit(storeMutations.SET_LOADING, true)
      try {
        await db
          .collection(dataRef.rooms.root)
          .doc(payload.roomId)
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
      console.log('⌛ updateRoom room', payload)
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
      console.log('⌛ enterRoom room', payload)
      commit(storeMutations.SET_LOADING, true)
      const { displayName, uid, photoURL, email } = state.user
      const enterRoomData = {
        displayName,
        uid,
        photoURL,
        email,
      }
      db.collection(dataRef.rooms.root)
        .doc(payload.roomId)
        .set(
          {
            [dataPrefix.user + uid]: enterRoomData,
          },
          { merge: true },
        )
        .then(() => {
          router.push({
            name: routerName.roomWait,
            query: {
              roomId: payload.roomId,
            },
          })
        })
        .finally(() => {
          commit(storeMutations.SET_LOADING, false)
        })
    },
    async [storeActions.setRoomData]({ commit, state }, payload) {
      console.log('⌛ setRoomData room', payload)
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
          .onSnapshot(doc => {
            console.group('🎉 [NEW_DATA]')
            console.log(doc.data())
            console.groupEnd()

            commit(storeMutations.SET_ROOM, doc.data())
            if (!doc.exists) {
              unsub()
              // Reset
              commit(storeMutations.SET_ROOM, {})
              router.push({
                name: routerName.collections,
              })
            }
          })
      } catch (error) {
        console.error(error)
      } finally {
        commit(storeMutations.SET_LOADING, false)
      }
    },
    async [storeActions.exitRoom]({ commit, state }, payload) {
      commit(storeMutations.SET_LOADING, true)
      try {
        const { uid } = state.user
        await db
          .collection(dataRef.rooms.root)
          .doc(payload.roomId)
          .set(
            {
              [dataPrefix.user + uid]: deleteField(),
            },
            { merge: true },
          )
        commit(storeMutations.SET_ROOM, {})
        router.back()
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
