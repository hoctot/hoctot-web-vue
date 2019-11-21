import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'

// import { auth } from '@/firebaseConfig'
// import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '@/views/About.vue'),
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/Profile.vue'),
  },
  {
    path: '/play',
    name: 'play',
    component: () => import('@/views/Play.vue'),
  },
  {
    path: '/editor',
    name: 'editor',
    component: () => import('@/views/Editor.vue'),
  },
  {
    path: '/collections',
    name: 'collections',
    component: () => import('@/views/Collections.vue'),
  },
  {
    path: '/collection-data/:id',
    name: 'collection-data',
    component: () => import('@/views/CollectionData.vue'),
  },
  {
    path: '/collection-editor',
    name: 'collection-editor',
    component: () => import('@/views/CollectionEditor.vue'),
  },
  {
    path: '/collection-editor/:id',
    name: 'collection-editor-id',
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
