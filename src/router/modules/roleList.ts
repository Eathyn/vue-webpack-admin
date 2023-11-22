import Home from '@/layout/index.vue'

export default {
  path: '/user',
  component: Home,
  redirect: '/user/manage',
  name: 'roleList',
  meta: {
    title: 'user',
    icon: 'personnel',
  },
  children: [
    {
      path: '/user/role',
      component: () =>
        import(
          /* webpackChunkName: "role-list" */ '@/views/role-list/index.vue'
        ),
      meta: {
        title: 'roleList',
        icon: 'role',
      },
    },
  ],
}
