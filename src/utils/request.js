import axios from 'axios'
import Vue from 'vue'
import router from '../router'
import { Toast } from 'vant'

const URL = 'http://127.0.0.1:3000'
axios.defaults.baseURL = URL
Vue.prototype.$base = URL
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$axios = axios

// 发送请求之前携带上token
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})

Vue.prototype.$url = function (url) {
  if (url.startsWith('http')) {
    return url
  }
  return URL + url
}

// 响应拦截器
axios.interceptors.response.use(response => {
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
