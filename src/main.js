import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Button, Cell, Row, Col } from 'vant';

// import scss
import './scss/index.scss';
import 'lib-flexible/flexible.js'

[Button, Cell, Row, Col].forEach(component => {
  Vue.use(component);
});
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
