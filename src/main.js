import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import 'lib-flexible/flexible.js'

// import scss
import './scss/index.scss';

// import directive
import './directive';

// import vant
import './vant';

// import createApi
import './createApi';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
