import { db, fieldValue, auth } from '@/firebaseConfig'
import { storeMutations, routerName } from '@/constant'
import { getUserData } from '@/utils'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import router from '@/router'

const firebaseRef = {
  room: db.collection('rooms'),
}

// const roomPrefix = {
//   user: 'User_',
// }

const roomDataRef = {
  root: 'rooms',
  data: 'data',
}

const roomStatus = {
  waiting: 'waiting',
  playing: 'playing',
}

const roomUserStatus = {
  waiting: 'waiting',
  ready: 'ready',
}

const roomAnswerType = {
  correct: 'correct',
  input: 'input',
  match: 'match',
}

const roomAnswerMode = {
  pk: 'pk',
  score: 'score',
  time: 'time',
  wait: 'wait',
}

export default {
  namespaced: true,
  state: {
    current: {},
    listRoom: [],
    listQuestion: [],
    test: 'test',
    unsubscribe: undefined,
  },
  getters: {},
  mutations: {
    ...vuexfireMutations,
    SET_STATE(state, payload) {
      console.log('📩 SET_STATE', payload)
      state[payload.key] = payload.value
    },
    UPDATE_STATE(state, payload) {
      console.log('🆗 UPDATE_STATE', payload)
      state[payload.key] = { ...state[payload.key], ...payload }
    },
    RESET_STATE(state, payload) {
      console.log('🧨 RESET_STATE', payload)
      state[payload.key] = payload.value
    },
  },
  actions: {
    bindListRoom: firestoreAction(({ bindFirestoreRef }) => {
      console.log('bindListRoom')
      return new Promise((resolve, reject) => {
        const unsubscrible = auth.onAuthStateChanged(user => {
          unsubscrible()
          if (user && user.uid) {
            const dataPromise = bindFirestoreRef('listRoom', firebaseRef.room)
            resolve(dataPromise)
          } else {
            reject(Error('bindListQuestion error'))
          }
        })
      })
    }),
    async createRoom({ state, dispatch, commit, rootState }, payload) {
      commit(storeMutations.SET_LOADING, true, { root: true })
      try {
        const { collectionId, collection = {} } = payload
        const addData = {
          // Room info
          title: 'Room ' + Date.now(),
          desc: '...',
          collectionId,
          collection,
          hostInfo: getUserData(rootState.user),
          status: roomStatus.waiting,
          createdAt: fieldValue.serverTimestamp(),
          updatedAt: fieldValue.serverTimestamp(),
          // Room Config
          score: 0,
          time: 0,
          answerType: [roomAnswerType.input],
          answerMode: roomAnswerMode.score,
          ruleWin: ['score', '>', 20],
          // Room Users
          users: {},
        }
        const result = await db.collection(roomDataRef.root).add(addData)
        console.log(`TCL: createRoom -> result`, result)
        dispatch('enterRoom', result)
      } catch (error) {
        console.error(`TCL: createRoom -> error`, error)
      } finally {
        commit(storeMutations.SET_LOADING, false, { root: true })
      }
    },
    async enterRoom({ dispatch, commit, rootState }, item) {
      try {
        commit(storeMutations.SET_LOADING, true, { root: true })
        const userData = {
          ...getUserData(rootState.user),
          status: roomUserStatus.waiting,
          score: 0,
          time: 0,
        }
        await firebaseRef.room.doc(item.id).update({
          ['users.' + rootState.user.uid]: userData,
        })
        // Config Room
        router.push({
          name: routerName.room,
          params: {
            roomId: item.id,
          },
        })

        const unsubscribe = firebaseRef.room.doc(item.id).onSnapshot(doc => {
          const source = doc.metadata.hasPendingWrites ? 'Local' : 'Server'
          const data = doc.data()
          console.log(source, ' data: ', data)
          commit('SET_STATE', {
            key: 'current',
            value: data || {},
          })
          if (!data) {
            router.currentRoute.name !== routerName.collections &&
              router.push({ name: routerName.collections })
          }
        })

        commit('SET_STATE', {
          key: 'unsubscribe',
          value: unsubscribe,
        })
      } catch (error) {
        console.error(`TCL: enterRoom -> error`, error)
      } finally {
        commit(storeMutations.SET_LOADING, false, { root: true })
      }
    },
    async updateRoom({ dispatch, commit, rootState }, payload) {
      try {
        commit(storeMutations.SET_LOADING, true, { root: true })
        // const userData = getUserData(rootState.user)
        const result = await firebaseRef.room.doc(payload.roomId).update({
          ['users.' + rootState.user.uid + '.score']: fieldValue.increment(1),
        })
        console.log(`TCL: enterRoom -> result`, result)
      } catch (error) {
        console.error(`TCL: enterRoom -> error`, error)
      } finally {
        commit(storeMutations.SET_LOADING, false, { root: true })
      }
    },

    async exitRoom({ dispatch, commit, rootState, state }, { roomId }) {
      try {
        commit(storeMutations.SET_LOADING, true, { root: true })
        const result = await firebaseRef.room.doc(roomId).update({
          ['users.' + rootState.user.uid]: fieldValue.delete(),
        })
        // Config Room
        router.push({ name: routerName.collections })
        commit('RESET_STATE', {
          key: 'current',
          value: {},
        })
        if (state.unsubscribe) {
          state.unsubscribe()
          commit('RESET_STATE', {
            key: 'unsubscribe',
            value: undefined,
          })
        }

        console.log(`TCL: exitRoom -> result`, result)
      } catch (error) {
        console.error(`TCL: exitRoom -> error`, error)
      } finally {
        commit(storeMutations.SET_LOADING, false, { root: true })
      }
    },
    async deleteRoom({ dispatch, commit, state }, collectionId) {
      try {
        commit(storeMutations.SET_LOADING, true, { root: true })
        const result = await firebaseRef.room.doc(collectionId).delete()
        console.log(`TCL: deleteRoom -> result`, result)
        commit('RESET_STATE', {
          key: 'current',
          value: {},
        })

        if (state.unsubscribe) {
          state.unsubscribe()
          commit('RESET_STATE', {
            key: 'unsubscribe',
            value: undefined,
          })
        }
      } catch (error) {
        console.error(`TCL: deleteRoom -> error`, error)
      } finally {
        commit(storeMutations.SET_LOADING, false, { root: true })
      }
    },
  },
}
