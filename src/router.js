import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/douban'
    },
    {
      path: '/douban',
      component: () => import('@/views/layout/index.vue'),
      redirect: '/douban/movie-list',
      children: [{
        path: 'movie-list',
        component: () => import('@/views/movie-list/index.vue')
      },
      {
        path: 'movie-rank',
        component: () => import('@/views/rank/index.vue')
      },
      {
        path: 'my-profile',
        component: () => import('@/views/user/index.vue')
      }]
    }
  ]
})
