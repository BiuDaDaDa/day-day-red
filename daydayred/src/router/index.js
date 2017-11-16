import Vue from 'vue'
import Router from 'vue-router'
import User from '@/components/tth-User/User'
Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/user',
      name: 'User',
      component: User
    }
  ]
})
