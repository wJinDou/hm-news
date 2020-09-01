import Vue from 'vue'
import VueRouter from 'vue-router'
import { Toast } from 'vant'

// 导入组件
import Login from '../views/Login.vue'
import Resgiter from '../views/Resgiter.vue'
import User from '../views/User.vue'
import UserEdit from '../views/UserEdit.vue'
Vue.use(VueRouter)
Vue.use(Toast)
const routes = [
  {
    path: '/login',
    component: Login,
    name: 'login'
  },
  { path: '/resgiter', component: Resgiter, name: 'resgiter' },
  {
    path: '/user',
    component: User,
    name: 'user'
  },
  { path: '/user-edit', component: UserEdit, name: 'user-edit' }
]

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // 简写方式：
  const url = ['user', 'user-edit']
  if (!url.includes(to.name) || localStorage.getItem('token')) {
    next()
  } else {
    Toast('请先登录')
    router.push('/login')
  }
})

export default router
