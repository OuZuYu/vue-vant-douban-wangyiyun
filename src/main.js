import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import 'lib-flexible/flexible.js'
import { delLoading } from '@/utils/dom'

import './scss/index.scss';

import './directive';

import './vant';

import './createApi';

// 引入自定义ui组件
import '@/components/my-ui/src';

Vue.config.productionTip = false

// 这个是删除loading指令生成的元素的，现已弃用loading指令，改用loading组件了。
router.beforeEach((to, from, next) => {
  delLoading();
  next();
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
