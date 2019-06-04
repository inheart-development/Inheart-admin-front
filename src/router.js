import Vue from 'vue';
import Router from 'vue-router';
import Signin from './pages/signin.vue';
import Statistics from './pages/statistics.vue';
import Content from './pages/content.vue';
import Faq from './pages/faq.vue';
import Survey from './pages/survey.vue';
import User from './pages/user.vue';

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
      alias: '/',
    },
    {
      path: '/content',
      name: 'content',
      component: Content,
    },
    {
      path: '/survey',
      name: 'survey',
      component: Survey,
    },
    {
      path: '/faq',
      name: 'faq',
      component: Faq,
    },
    {
      path: '/user',
      name: 'user',
      component: User,
    },
  ],
});
