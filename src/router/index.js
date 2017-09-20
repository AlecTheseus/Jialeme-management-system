import Vue from 'vue'
import Router from 'vue-router'
import login from '@/page/login'
import MyInfo from '@/page/My_Info'
import MyStore from '@/page/My_store'
import MyTeam from '@/page/My_team'
import Hello from '../page/Hello'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/My_Team',
      name: 'MyTeam',
      component: MyTeam
    },
    {
      path: '/My_Info',
      name: 'MyInfo',
      component: MyInfo
    },
    {
      path: '/My_Store',
      name: 'MyStore',
      component: MyStore
    },
    {
      path: '/hello',
      name: 'hello',
      component: Hello
    }
  ]
})
