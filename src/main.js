import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import 'lib-flexible/flexible.js'
import { delLoading } from '@/utils/dom'

// import scss
import './scss/index.scss';

// import directive
import './directive';

// import vant
import './vant';

// import createApi
import './createApi';

// 引入自定义ui组件
import '@/components/my-ui/src';

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  delLoading();
  next();
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
