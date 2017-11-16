import Vue from 'vue'
import Router from 'vue-router'
import OuXueSong from './OuXueSong'
import WeiShiBo from './WeiShiBo'
import ZhaoJiang from './ZhaoJiang'
import YuKaiRui from './YuKariRui'
Vue.use(Router)
YuKaiRui.concat(OuXueSong, WeiShiBo, ZhaoJiang)
export default new Router({
  mode: 'history',
  routes: YuKaiRui
})
