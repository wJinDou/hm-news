import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 导入通用样式
import './styles/base.less'
import './styles/iconfont.css'

// 导入所有组件的方式
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)

// 按需加载
// import { Button } from 'vant'
// Vue.use(Button)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
