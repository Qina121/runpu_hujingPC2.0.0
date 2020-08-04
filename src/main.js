import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import config from './lib/config/config.js' //api全局接口
import { Loading } from 'element-ui'


Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.use(config);
Vue.prototype.openLoading = function() {
  const loading = this.$loading({           // 声明一个loading对象
    lock: true,                             // 是否锁屏
    text: '正在加载...',                     // 加载动画的文字
    spinner: 'el-icon-loading',             // 引入的loading图标
    background: 'rgba(0, 0, 0, 0.2)',       // 背景颜色
    target: '.sub-main',                    // 需要遮罩的区域
    body: true,                              
    customClass: 'mask'                     // 遮罩层新增类名
  })
  setTimeout(function () {                  // 设定定时器，超时5S后自动关闭遮罩层，避免请求失败时，遮罩层一直存在的问题
    loading.close();                        // 关闭遮罩层
  },5000)
  return loading;
}
// 验证
router.beforeEach((to, from, next) => {

  if (to.matched.some(record => record.meta.requiresAuth)) {
      //这里判断用户是否登录，验证本地存储是否有userInfo
      if (!localStorage.userInfo) { // 判断当前的userInfo是否存在
          next({
              path: '/',
              query: { redirect: to.fullPath }
          })
      } else {
          next()
      }
  } else {
      next() // 确保一定要调用 next()
  }
})
new Vue({
  router,
  store,
  ElementUI,
  render: h => h(App)
}).$mount('#app')
