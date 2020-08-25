import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue')
  },

  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue')
  },
  
  {
    path: '/users',
    name: 'users',
    component: () => import('@/views/Users.vue')
  },
  
  {
    path: '/reports',
    name: 'reports',
    component: () => import('@/views/Reports.vue')
  },
  
  {
    path: '/piscicolas',
    name: 'piscicolas',
    component: () => import("@/views/Piscicolas.vue")
  },
  {
    path: "/visualizacion",
    name: "Visualización",
    component: () => import("@/views/visualizacion.vue")
  }
]
const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const logged = store.state.token
 if (to.name == 'login' && logged) next({name:'home'})
  else if (to.name != 'login' && !logged) next({name:'login'})
  else next()
})

export default router
