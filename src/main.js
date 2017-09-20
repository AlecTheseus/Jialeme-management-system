import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'
import '../static/css/global.css'
import axios from 'axios'
import status from './lib/status'
Vue.config.productionTip = false

Vue.use(status)
//全局请求地址
axios.defaults.baseURL = 'http://ns.huidang2105.com:8899';
console.log(axios.defaults)
// http request 拦截器
axios.interceptors.request.use(config => {
  vm.$store.commit('FETCH_LOADING', true)
  return config
}, err => {
  return Promise.reject(err)
})

// http response 拦截器
axios.interceptors.response.use(response => {
  vm.$store.commit('FETCH_LOADING', false)
  return response
}, err => {
  return Promise.reject(err)
})

/* eslint-disable no-new */
var vm = new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
