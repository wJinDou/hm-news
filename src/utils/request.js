import axios from 'axios'
import Vue from 'vue'
import router from '../router'
import { Toast } from 'vant'

const url = 'http://127.0.0.1:3000'
axios.defaults.baseURL = url
Vue.prototype.$base = url
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
