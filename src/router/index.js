import Vue from 'vue'
import VueRouter from 'vue-router'

// 导入组件
import Login from '../views/Login.vue'
import Resgiter from '../views/Resgiter.vue'
import User from '../views/User.vue'
Vue.use(VueRouter)

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
    // beforeEnter: (to, from, next) => {
    //   console.log(1)
    //   if (localStorage.getItem('token')) {
    //     next()
    //   } else {
    //     // Vue.$router.push('/login')
    //     // window.location.hash = '/login'
    //   }
    // }
  }
]

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // if (to.name === 'user') {
  //   if (localStorage.getItem('token')) {
  //     next()
  //   } else {
  //     router.push('/login')
  //   }
  // } else {
  //   next()
  // }
  // 简写方式：
  if (to.name !== 'user' || localStorage.getItem('token')) {
    next()
  } else {
    router.push('/login')
  }
})

// router.afterEach((to, from) => {
//   console.log('之后')
//   console.log(to)
//   console.log(from)
// })

export default router
