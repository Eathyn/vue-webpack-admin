import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { useLoginStore } from '@/store/user'
import { storeToRefs } from 'pinia'
import { getItem } from '@/utils/storage'
import { TOKEN } from '@/constant'
import userRoutes from '@/router/modules/user'
import roleListRoutes from '@/router/modules/roleList'
import permissionListRoutes from '@/router/modules/permissionList'
import articleRoutes from '@/router/modules/article'
import Layout from '@/layout/index.vue'

const publicRoutes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: 'login' */ '@/views/login/index.vue'),
  },
  {
    path: '/',
    component: Layout,
    redirect: '/profile',
    children: [
      {
        path: '/profile',
        name: 'profile',
        component: () =>
          import(/* webpackChunkName: 'profile' */ '@/views/profile/index.vue'),
        meta: {
          title: 'profile',
          icon: 'personnel',
        },
      },
      {
        path: '/chart',
        name: 'chart',
        component: () =>
          import(/* webpackChunkName: 'chart' */ '@/views/chart/index.vue'),
        meta: {
          title: 'chart',
          icon: 'chart',
        },
      },
      {
        path: '/404',
        name: '404',
        component: () =>
          import(/* webpackChunkName: '404' */ '@/views/404/index.vue'),
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
    ],
  },
]

const privateRoutes = [
  userRoutes,
  roleListRoutes,
  permissionListRoutes,
  articleRoutes,
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...publicRoutes, ...privateRoutes],
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
  const { isUserInfoEmpty, token } = storeToRefs(loginStore)
  const { setUserInfo } = loginStore
  const storageToken = getItem(TOKEN)

  if (storageToken) {
    if (to.path === '/login') {
      next('/')
    } else {
      if (token.value === '') {
        token.value = storageToken
      }
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
