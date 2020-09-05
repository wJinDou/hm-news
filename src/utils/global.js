import Vue from 'vue'
// 导入全局组件
import hmHeader from '../components/hmHeader.vue'
import hmLogo from '../components/hmLogo.vue'
import HmNavtem from '../components/HmNavtem.vue'
import hmPost from '../components/hmPost.vue'
import hmCommment from '../components/hmCommment.vue'
import hmFloor from '../components/hmFloor.vue'

Vue.component('hm-header', hmHeader)
Vue.component('hm-logo', hmLogo)
Vue.component('hm-navtem', HmNavtem)
Vue.component('hm-post', hmPost)
Vue.component('hm-comment', hmCommment)
Vue.component('hm-floor', hmFloor)
