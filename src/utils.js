import { firestoreAction } from 'vuexfire'
import { auth } from '@/firebaseConfig'

export const getUserData = user => ({
  uid: user.uid,
  email: user.email,
  photoURL: user.photoURL,
  displayName: user.displayName,
})

export const userDataPromise = () =>
  new Promise((resolve, reject) => {
    auth.onAuthStateChanged(user => resolve(user))
  })

export const bindDataActionPromise = (stateKey, dbRef) =>
  firestoreAction(({ bindFirestoreRef }) => {
    return new Promise((resolve, reject) => {
      const unsubscrible = auth.onAuthStateChanged(user => {
        unsubscrible()
        if (user && user.uid) {
          const dataPromise = bindFirestoreRef(stateKey, dbRef)
          resolve(dataPromise)
        } else {
          reject(Error('bindListQuestion error'))
        }
      })
    })
  })
