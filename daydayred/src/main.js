// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import router from './router'
import request from './common/js/requestServerSetting'
import { Swipe, SwipeItem, Field, Toast, Button, Tabbar, TabItem, MessageBox, Popup, Picker, Navbar, DatetimePicker } from 'mint-ui'
import VueBus from 'vue-bus'
import 'mint-ui/lib/style.css'
import '../src/common/css/animate.css'
import isLogin from './common/js/isLogin'
isLogin()
Vue.use(Vuex)
Vue.component(DatetimePicker.name, DatetimePicker)
Vue.component(Navbar.name, Navbar)
Vue.component(Picker.name, Picker)
Vue.component(Popup.name, Popup)
Vue.component(Tabbar.name, Tabbar)
Vue.component(TabItem.name, TabItem)
Vue.component(Field.name, Field)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Toast.name, Toast)
Vue.component(MessageBox.name, MessageBox)
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
