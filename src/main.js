import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import 'lib-flexible/flexible.js'

// import scss
import './scss/index.scss';

// import directive
import './directive';
import { Button, Cell, Row, Col, Notify  } from 'vant';

[Button, Cell, Row, Col, Notify].forEach(component => {
  Vue.use(component);
});
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
