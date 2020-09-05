import Vue from 'vue'
import moment from 'moment'
moment.locale('zh-CN') // 设为中文
Vue.filter('filterTime', (input, val = 'YYYY-MM-DD') => {
  return moment(input).format(val)
})

Vue.filter('fromNow', (input) => {
  return moment(input).fromNow()
})
