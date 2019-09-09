import Vue from 'vue'
import App from './App.vue'
import 'font-awesome/css/font-awesome.min.css'
import router from './router/router'
import VueCookies from 'vue-cookies'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  VueCookies,

}).$mount('#app');
