import { db, fieldValue } from '@/firebaseConfig'
import { rn } from '@/constant'
import { getUserData, bindDataActionPromise } from '@/utils'
import router from '@/router'
import { get } from 'lodash'

const dbRef = {
  room: db.collection('rooms'),
}

const roomref = {
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
    test: 'test Room',
    unsubscribe: undefined,
  },
  getters: {
    userInRoom(state, getters, rootState) {
      return get(state.current, 'users.' + get(rootState.user, 'uid'))
    },
    isUserReady(state, getters, rootState) {
      return Boolean(
        get(
          state.current,
          'users.' + get(rootState.user, 'uid') + '.status',
        ) === 'ready',
      )
    },
  },
  mutations: {
    // ...vuexfireMutations,
    SET_STATE(state, payload) {
      state[payload.key] = payload.value
    },
    UPDATE_STATE(state, payload) {
      state[payload.key] = { ...state[payload.key], ...payload }
    },
    RESET_STATE(state, payload) {
      state[payload.key] = payload.value
    },
  },
  actions: {
    bindListRoom: bindDataActionPromise('listRoom', dbRef.room),

    async $createRoom({ state, dispatch, commit, rootState }, payload) {
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
          answerType: [roomAnswerType.input],
          answerMode: roomAnswerMode.score,
          ruleWin: ['score', '>', 20],
          // Room Users
          users: {},
        }
        const result = await db.collection(roomref.root).add(addData)
        dispatch('$enterRoom', result)
      } catch (error) {
        console.log(`TCL: $createRoom -> catch`, error)
      }
    },
    async $enterRoom({ dispatch, commit, rootState }, item) {
      try {
        const userData = {
          ...getUserData(rootState.user),
          status: roomUserStatus.waiting,
          score: 0,
          time: 0,
        }
        await dbRef.room.doc(item.id).update({
          ['users.' + rootState.user.uid]: userData,
        })
        // Config Room
        router.push({
          name: rn.room,
          params: {
            roomId: item.id,
          },
        })

        const unsubscribe = dbRef.room.doc(item.id).onSnapshot(doc => {
          const data = doc.data()
          commit('SET_STATE', { key: 'current', value: data || {} })
          if (!data) {
            router.currentRoute.name !== rn.collections &&
              router.push({ name: rn.collections })
          }
        })

        commit('SET_STATE', { key: 'unsubscribe', value: unsubscribe })
      } catch (error) {
        console.error(`TCL: $enterRoom -> error`, error)
      }
    },
    async $updateRoom({ dispatch, commit, rootState }, payload) {
      try {
        // const userData = getUserData(rootState.user)
        await dbRef.room.doc(payload.roomId).update({
          [`users.${rootState.user.uid}.${payload.key}`]: payload.fieldValue
            ? fieldValue[payload.fieldValue](payload.value)
            : payload.value,
        })
      } catch (error) {
        console.error(`TCL: $updateRoom -> error`, error)
      }
    },

    async $exitRoom({ dispatch, commit, rootState, state }, { roomId }) {
      try {
        await dbRef.room.doc(roomId).update({
          ['users.' + rootState.user.uid]: fieldValue.delete(),
        })
        // Config Room
        router.push({ name: rn.collections })
        commit('RESET_STATE', { key: 'current', value: {} })
        if (state.unsubscribe) {
          state.unsubscribe()
          commit('RESET_STATE', { key: 'unsubscribe', value: undefined })
        }
      } catch (error) {
        console.error(`TCL: exitRoom -> error`, error)
      }
    },
    async $deleteRoom({ dispatch, commit, state }, collectionId) {
      try {
        await dbRef.room.doc(collectionId).delete()
        commit('RESET_STATE', { key: 'current', value: {} })

        if (state.unsubscribe) {
          state.unsubscribe()
          commit('RESET_STATE', { key: 'unsubscribe', value: undefined })
        }
      } catch (error) {
        console.error(`TCL: deleteRoom -> error`, error)
      }
    },
  },
}
