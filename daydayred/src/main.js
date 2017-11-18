// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import request from './common/js/requestServerSetting'
import { Swipe, SwipeItem, Field, Toast, Button } from 'mint-ui'
import VueBus from 'vue-bus'
Vue.component(Field.name, Field)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Toast.name, Toast)
Vue.component(Button.name, Button)
Vue.use(VueBus)
Vue.config.productionTip = false
request(Vue)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
