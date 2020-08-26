import Vue from 'vue'
import VueRouter from 'vue-router'

// 导入组件
import Login from '../views/Login.vue'
import Resgiter from '../views/Resgiter.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/login', component: Login },
  { path: '/resgiter', component: Resgiter }
]

const router = new VueRouter({
  routes
})

export default router
