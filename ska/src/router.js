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
    {
      path: '/sarakin',
      name:'sarakin',
      component : Index,
      meta: {
        requiresAuth: true
      }    
    },
    {
      path: '/sarakin/depositar',
      name: 'deposito',
      component: () => import(/* webpackChunkName: "login" */ './views/Depositar.vue'),
      meta: {
        requiresAuth: true
      }  
    },
    {
      path: '/sarakin/pagar',
      name: 'pagamento',
      component: () => import(/* webpackChunkName: "login" */ './views/Pagar.vue'),
      meta: {
        requiresAuth: true
      }  
    },
    {
      path: '/sarakin/transferir',
      name: 'transferir',
      component: () => import(/* webpackChunkName: "login" */ './views/Transferir.vue'),
      meta: {
        requiresAuth: true
      }  
    }
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