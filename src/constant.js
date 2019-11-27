export const storeState = {
  isLogin: 'isLogin',
  user: 'user',
  isLoading: 'isLoading',
  listCollection: 'listCollection',
  listQuestion: 'listQuestion',
}

export const storeActions = {
  checkLogin: 'checkLogin',
  login: 'login',
  signOut: 'signOut',
  bindListCollection: 'bindListCollection',
  bindListQuestion: 'bindListQuestion',
}

export const storeMutations = {
  SET_LOGIN: 'SET_LOGIN',
  SET_USER: 'SET_USER',
  SET_LOADING: 'SET_LOADING',
}

export const routerName = {
  home: 'home',
  about: 'about',
  profile: 'profile',
  play: 'play',
  editor: 'editor',
  collections: 'collections',
  collectionData: 'collectionData',
  collectionEditor: 'collectionEditor',
  collectionEditorId: 'collectionEditorId',
}

export const dataRef = {
  collections: {
    root: 'collections',
    data: 'data',
  },
  questions: {
    root: 'questions',
    data: 'data',
  },
}

export const dataSample = {
  listColor: [
    '3f51b5',
    '673ab7',
    'e91e63',
    'ffc107',
    '03a9f4',
    '00bcd4',
    '009688',
    '795548',
    '607d8b',
    'f44336',
    'ffc107',
  ],
  listColorHex: [
    '#3f51b5',
    '#673ab7',
    '#e91e63',
    '#ffc107',
    '#03a9f4',
    '#00bcd4',
    '#009688',
    '#4CAF50',
    '#795548',
    '#f44336',
    '#FF5722',
    '#607d8b',
    '#000',
    '#fff',
  ],
}
