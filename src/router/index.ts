import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { useLoginStore } from '@/store/user'
import { storeToRefs } from 'pinia'

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect() {
      return {
        path: '/home',
      }
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: "login" */ '@/views/login/index.vue'),
  },
  {
    path: '/home',
    name: 'Home',
    component: () =>
      import(/* webpackChunkName: "home" */ '@/views/home/index.vue'),
  },
  {
    path: '/404',
    component: () =>
      import(/* webpackChunkName: "404" */ '@/views/404/index.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    redirect() {
      return {
        path: '/404',
      }
    },
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return {
      el: '#app',
      top: 0,
      behavior: 'smooth',
    }
  },
})

const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
  const loginStore = useLoginStore()
  const { token, isUserInfoEmpty } = storeToRefs(loginStore)
  const { setUserInfo } = loginStore

  if (token.value) {
    if (to.path === '/login') {
      next('/home')
    } else {
      if (isUserInfoEmpty) {
        await setUserInfo()
      }
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})

export default router
