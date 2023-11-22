import Home from '@/layout/index.vue'

export default {
  path: '/article',
  component: Home,
  redirect: '/article/ranking',
  name: 'articleRanking',
  meta: {
    title: 'article',
    icon: 'article',
  },
  children: [
    {
      path: '/article/ranking',
      component: () =>
        import(
          /* webpackChunkName: "article-ranking" */ '@/views/article-ranking/index.vue'
        ),
      meta: {
        title: 'articleRanking',
        icon: 'article-ranking',
      },
    },
  ],
}
