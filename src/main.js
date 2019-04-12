// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import store from './store/index'

// 引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 样式初始化
import './common/index.css'
import './common/reset.css'



Vue.use(ElementUI);


// 使用HTML5 的 History 路由模式
// const RouterConfig = {
//   mode:'history',
//   routes:Routers,
// }

// const router = new VueRouter(RouterConfig)


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
