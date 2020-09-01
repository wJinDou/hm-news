import Vue from 'vue'
import moment from 'moment'
Vue.filter('filterTime', (input, val = 'YYYY-MM-DD') => {
  return moment(input).format(val)
})
