import Vue from 'vue';
import Router from 'vue-router';
import Signin from './pages/signin.vue';
import Statistics from './pages/statistics.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/statistics',
      name: 'statistics',
      component: Statistics,
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin,
    },
  ],
});
