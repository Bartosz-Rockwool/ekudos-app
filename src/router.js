import Vue from 'vue'
import VueRouter from 'vue-router'
import KudoMain from './components/KudoMain.vue'
import Live from './components/LiveAuthorization.vue'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name : "main",
      component : KudoMain,
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/live',
      name : "live",
      component : Live,
      meta: {
        requireAuth: true
      }
    }
  ]
});