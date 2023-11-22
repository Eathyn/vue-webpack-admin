import Home from '@/layout/index.vue'

export default {
  path: '/user',
  component: Home,
  redirect: '/user/manage',
  name: 'userManage',
  meta: {
    title: 'user',
    icon: 'personnel',
  },
  children: [
    {
      path: '/user/manage',
      component: () =>
        import(
          /* webpackChunkName: "user-manage" */ '@/views/user-manage/index.vue'
        ),
      meta: {
        title: 'userManage',
        icon: 'personnel-manage',
      },
    },
  ],
}
