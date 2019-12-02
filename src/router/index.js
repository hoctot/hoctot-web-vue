import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import { routerName } from '@/constant'
import store from '@/store'
// import { auth } from '@/firebaseConfig'
// import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: routerName.home,
    component: Home,
  },
  {
    path: '/about',
    name: routerName.about,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '@/views/About.vue'),
  },
  {
    path: '/profile',
    name: routerName.profile,
    component: () => import('@/views/Profile.vue'),
  },
  {
    path: '/play',
    name: routerName.play,
    component: () => import('@/views/Play.vue'),
  },
  {
    path: '/room',
    name: routerName.room,
    component: () => import('@/views/Room.vue'),
  },
  {
    path: '/room-wait',
    name: routerName.roomWait,
    component: () => import('@/views/RoomWait.vue'),
  },
  {
    path: '/editor',
    name: routerName.editor,
    component: () => import('@/views/Editor.vue'),
  },
  {
    path: '/collections',
    name: routerName.collections,
    component: () => import('@/views/Collections.vue'),
  },
  {
    path: '/collection-data/:id',
    name: routerName.collectionData,
    component: () => import('@/views/CollectionData.vue'),
  },
  {
    path: '/collection-editor',
    name: routerName.collectionEditor,
    component: () => import('@/views/CollectionEditor.vue'),
  },
  {
    path: '/collection-editor/:id',
    name: routerName.collectionEditorId,
    component: () => import('@/views/CollectionEditor.vue'),
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
  if (to.path !== '/') {
    const buildTime = document.getElementById('build')
    if (buildTime) {
      buildTime.remove()
    }
  }
  // TODO: Optimize router check
  const isInRoom = Boolean(store.state.room && store.state.room.collectionId)
  if (isInRoom) {
    return false
  } else {
    next()
  }
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
