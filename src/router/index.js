import Vue from 'vue'
import VueRouter from 'vue-router'
import { Toast } from 'vant'

// 导入组件
const Login = () => import(/* webpackChunkName: "user" */'../views/user/Login.vue')
const Resgiter = () => import(/* webpackChunkName: "user" */'../views/user/Resgiter.vue')
const User = () => import(/* webpackChunkName: "user" */'../views/user/User.vue')
const UserEdit = () => import(/* webpackChunkName: "user" */'../views/user/UserEdit.vue')
const Follow = () => import(/* webpackChunkName: "user" */'../views/user/Follow.vue')
const MyComment = () => import(/* webpackChunkName: "user" */'../views/user/myComment.vue')
const myStar = () => import(/* webpackChunkName: "user" */'../views/user/myStar.vue')
const Index = () => import(/* webpackChunkName: "news" */'../views/index/index.vue')
const Manage = () => import(/* webpackChunkName: "news" */'../views/index/Manage.vue')
const PostDetail = () => import(/* webpackChunkName: "news" */'../views/index/PostDetail.vue')
const Search = () => import(/* webpackChunkName: "news" */'../views/index/Search.vue')
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
  { path: '/user-edit', component: UserEdit, name: 'user-edit' },
  { path: '/follow', component: Follow, name: 'follow' },
  { path: '/mycomment', component: MyComment, name: 'mycomment' },
  { path: '/mystar', component: myStar, name: 'mystar' },
  { path: '/', component: Index, name: '/' },
  { path: '/manage', component: Manage, name: '/manage' },
  { path: '/postdetail/:id', component: PostDetail, name: '/postdetail' },
  { path: '/Search', component: Search, name: '/search' }
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
  const url = ['user', 'user-edit', 'follow', 'mycomment', 'mystar']
  if (!url.includes(to.name) || localStorage.getItem('token')) {
    next()
  } else {
    Toast('请先登录')
    router.push('/login')
  }
})

export default router
