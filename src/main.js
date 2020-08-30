import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import moment from 'moment'

// 导入通用样式
import './styles/base.less'
import './styles/iconfont.css'

// 导入flexible
import 'amfe-flexible'

// 导入全局组件
import myHeader from './components/myHeader.vue'
import hmLogo from './components/hmLogo.vue'
import HmNavtem from './components/HmNavtem.vue'

// 导入所有组件的方式
import Vant, { Toast } from 'vant'
import 'vant/lib/index.css'

Vue.use(Vant)
axios.defaults.baseURL = 'http://127.0.0.1:3000'
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$axios = axios

// 发送请求之前携带上token
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  config.headers.Authorization = token
  return config
})

// 响应拦截器
axios.interceptors.response.use(response => {
  console.log(response)
  const { message, statusCode } = response.data
  if (statusCode === 401 && message === '用户信息验证失败') {
    Toast(message)
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    router.push('/login')
  } else {
    return response
  }
})

// 按需加载
// import { Button } from 'vant'
// Vue.use(Button)

Vue.component('my-header', myHeader)
Vue.component('hm-logo', hmLogo)
Vue.component('hm-navtem', HmNavtem)

Vue.filter('filterTime', (input, val) => {
  return moment(input).format(val)
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
