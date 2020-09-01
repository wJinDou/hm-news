import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'

// 导入通用样式
import './styles/base.less'
import './styles/iconfont.css'

// 处理响应
import './utils/request.js'
// 处理全局组件
import './utils/global'
// 处理过滤器
import './utils/filters'
// 处理vant组件
import './utils/vant'

// 导入flexible
import 'amfe-flexible'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
