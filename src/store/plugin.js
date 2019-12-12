import { m } from '@/constant'

export const loadingPlugin = store => {
  // called when the store is initialized
  store.subscribeAction({
    before: (action, state) => {
      // console.log(`before action ${action.type} , ${action.payload}`)
      const isLoading = String(action.type).includes('$')
      if (isLoading) {
        store.commit(m.SET_LOADING, true)
      }
    },
    after: (action, state) => {
      // console.log(`after action ${action.type} , ${action.payload}`)
      const isLoading = String(action.type).includes('$')
      if (isLoading) {
        store.commit(m.SET_LOADING, false)
      }
    },
  })
}
