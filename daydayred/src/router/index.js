import Vue from 'vue'
import Router from 'vue-router'
import OuXueSong from './OuXueSong'
import WeiShiBo from './WeiShiBo'
import ZhaoJiang from './ZhaoJiang'
import YuKaiRui from './YuKariRui'
Vue.use(Router)
let routes = []
routes.concat(OuXueSong, WeiShiBo, ZhaoJiang, YuKaiRui)
export default new Router({
  mode: 'history',
  routes: routes
})
