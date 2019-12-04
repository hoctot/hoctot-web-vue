export const storeState = {
  isLogin: 'isLogin',
  user: 'user',
  isLoading: 'isLoading',
  isPlaying: 'isPlaying',
  listCollection: 'listCollection',
  listQuestion: 'listQuestion',
  listRoom: 'listRoom',
  listPlayQuestion: 'listPlayQuestion',
  room: 'room',
}

export const storeGetter = {
  roomListUser: 'roomListUser',
}

export const storeActions = {
  checkLogin: 'checkLogin',
  login: 'login',
  signOut: 'signOut',
  bindListCollection: 'bindListCollection',
  bindListQuestion: 'bindListQuestion',
  bindListRoom: 'bindListRoom',
  createRoom: 'createRoom',
  enterRoom: 'enterRoom',
  exitRoom: 'exitRoom',
  deleteRoom: 'deleteRoom',
  updateRoom: 'updateRoom',
  setRoomData: 'setRoomData',
  checkInRoom: 'checkInRoom',
  startRoom: 'startRoom',
  setPlayData: 'setPlayData',
  getListPlayQuestion: 'getListPlayQuestion',
  checkRightAnswer: 'checkRightAnswer',
  test: 'test',
}

export const storeMutations = {
  SET_LOGIN: 'SET_LOGIN',
  SET_USER: 'SET_USER',
  SET_LOADING: 'SET_LOADING',
  SET_ROOM: 'SET_ROOM',
  SET_IS_PLAYING: 'SET_IS_PLAYING',
  CHECK_TO_PLAY_ROOM: 'CHECK_TO_PLAY_ROOM',
  SET_PLAY_DATA: 'SET_PLAY_DATA',
  SET_LIST_PLAY_QUESTION: 'SET_LIST_PLAY_QUESTION',
}

export const routerName = {
  home: 'home',
  about: 'about',
  profile: 'profile',
  play: 'play',
  room: 'room',
  roomWait: 'roomWait',
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
  rooms: {
    root: 'rooms',
  },
}

export const roomType = {
  basic: 'basic',
}

export const roomRule = {
  basic: {
    type: 'score',
    scoreWin: 10,
  },
}

export const roomStatus = {
  wait: 'wait',
  playing: 'playing',
}

export const dataPrefix = {
  user: 'User_',
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
