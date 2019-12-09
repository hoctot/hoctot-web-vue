import { db, fieldValue, auth } from '@/firebaseConfig'
import { storeMutations } from '@/constant'
import { getUserData } from '@/utils'
import { vuexfireMutations, firestoreAction } from 'vuexfire'

const firebaseRef = {
  room: db.collection('rooms'),
}

const roomDataRef = {
  root: 'rooms',
  data: 'data',
}

const roomStatus = {
  waiting: 'waiting',
  playing: 'playing',
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
  },
  getters: {},
  mutations: {
    ...vuexfireMutations,
    SET_ROOM(state, payload) {},
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
        }
        const result = await db.collection(roomDataRef.root).add(addData)
        console.log(`TCL: createRoom -> result`, result)
      } catch (error) {
        console.error(`TCL: createRoom -> error`, error)
      } finally {
        commit(storeMutations.SET_LOADING, false, { root: true })
      }
    },
    async enterRoom({ dispatch, commit }, payload) {},
    async updateRoom({ dispatch, commit }, payload) {},
    async exitRoom({ dispatch, commit }, payload) {},
    async deleteRoom({ dispatch, commit }, collectionId) {
      try {
        commit(storeMutations.SET_LOADING, true, { root: true })
        const result = await firebaseRef.room.doc(collectionId).delete()
        console.log(`TCL: deleteRoom -> result`, result)
      } catch (error) {
        console.error(`TCL: deleteRoom -> error`, error)
      } finally {
        commit(storeMutations.SET_LOADING, false, { root: true })
      }
    },
  },
}
