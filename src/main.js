import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import config from './lib/config/config.js'

Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.use(config);
new Vue({
  router,
  store,
  ElementUI,
  render: h => h(App)
}).$mount('#app')
