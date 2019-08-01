import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import firebase from 'firebase'
import Login from './views/Login.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/create-account',
      name: 'nova-conta',
      component: () => import(/* webpackChunkName: "login" */ './views/CreateAccount.vue'),
      meta: {
        requiresAuth: false
      }   
    },
  ]
})
router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !currentUser) next('login');
  else if (!requiresAuth && currentUser) next('sarakin');
  else next();
})

export default router