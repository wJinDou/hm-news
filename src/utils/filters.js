import Vue from 'vue'

import moment from 'moment'
Vue.filter('filterTime', (input, val) => {
  return moment(input).format(val)
})
