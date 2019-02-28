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
      component: () => import('@/views/layout/index.vue'), // layout component
      redirect: '/douban/movie-list',
      children: [{
        path: 'movie-list',
        component: () => import('@/views/movie-list/index.vue')
      },
      {
        path: 'my-profile',
        component: () => import('@/views/user/index.vue')
      }]
    },
    {
      path: '/douban/search', // 为了配合服务器配置
      component: () => import('@/views/search/index.vue')
    },
    {
      path: '/wangyi',
      component: () => import('@/views/layout/index.vue'),
      children: [{
        path: 'music',
        component: () => import('@/views/music/index.vue')
      }]
    }
  ]
})
