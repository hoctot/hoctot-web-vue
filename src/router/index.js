import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import { rn, m } from '@/constant'
import store from '@/store'
// import { auth } from '@/firebaseConfig'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: rn.home,
    component: Home,
  },
  {
    path: '/about',
    name: rn.about,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '@/views/About.vue'),
  },
  {
    path: '/profile',
    name: rn.profile,
    component: () => import('@/views/Profile.vue'),
  },
  {
    path: '/editor',
    name: rn.editor,
    component: () => import('@/views/Editor.vue'),
  },
  {
    path: '/collections',
    name: rn.collections,
    component: () => import('@/views/Collections.vue'),
  },
  {
    path: '/collection-data/:id',
    name: rn.collectionData,
    component: () => import('@/views/CollectionData.vue'),
  },
  {
    path: '/collection-editor',
    name: rn.collectionEditor,
    component: () => import('@/views/CollectionEditor.vue'),
  },
  {
    path: '/collection-editor/:id',
    name: rn.collectionEditorId,
    component: () => import('@/views/CollectionEditor.vue'),
  },
  {
    path: '/room/:roomId',
    name: rn.room,
    component: () => import('@/views/Room.vue'),
  },
  {
    path: '*',
    name: 'notfound',
    component: Home,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  // TODO: Optimize router check
  // const { isPlaying, room } = store.state

  // const isInRoom = Boolean(store.state.room && room.collectionId)
  // if (isInRoom) {
  //   next(false)
  // } else {
  //   next()
  // }
  store.commit(m.SET_SEARCH, '')

  next()

  // ...
  // console.debug(to, from)
  // let isAuthenticated = store.state.isLogin
  // isAuthenticated = !true
  // if (isAuthenticated) {
  //   // Login
  //   if (['/'].includes(to.path)) next('/collections')
  //   else next()
  // } else {
  //   // No login
  //   if (['/login', '/about'].includes(to.path)) next()
  //   else next('/login')
  // }
})

export default router
