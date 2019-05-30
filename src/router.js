import Vue from 'vue'
import Router from 'vue-router'
import Signin from './pages/signin.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/signin',
      name: 'signin',
      component: Signin
    }
  ]
})