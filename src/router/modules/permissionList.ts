import Home from '@/layout/index.vue'

export default {
  path: '/user',
  component: Home,
  redirect: '/user/manage',
  name: 'permissionList',
  meta: {
    title: 'user',
    icon: 'personnel',
  },
  children: [
    {
      path: '/user/permission',
      component: () =>
        import(
          /* webpackChunkName: "permission-list" */ '@/views/permission-list/index.vue'
        ),
      meta: {
        title: 'permissionList',
        icon: 'permission',
      },
    },
  ],
}
