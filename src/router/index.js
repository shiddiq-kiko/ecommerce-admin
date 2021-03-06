import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AdminLogin from '../views/AdminLogin.vue'
import Login from '../views/Login.vue'
import UserLogin from '../views/UserLogin.vue'
import Admin from '../views/Admin.vue'
// import store from '../store/index.js'

Vue.use(VueRouter)

// import './custom.scss'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    children: [
      {
        path: 'login',
        name: 'loginUser',
        component: UserLogin
      },
      {
        path: 'admin',
        name: 'adminLogin',
        component: AdminLogin
      }
    ]
  },
  // {
  //   path: '/admin/login',
  //   name: 'adminLogin',
  //   component: AdminLogin
  // },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    beforeEnter: (to, from, next) => {
      // console.log(store.state.isLogin)
      if (localStorage.token) {
        next()
      } else next('/login')
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
