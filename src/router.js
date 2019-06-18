import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Reservation from './components/Reservation'
import {store} from './store'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/reservation',
      name: 'reservation',
      component: Reservation,
      beforeEnter: (to, from, next) => {
        if (store.getters.authenticated) {
          next()
          return
        }
        next('/')
      }
    }
  ]
})
