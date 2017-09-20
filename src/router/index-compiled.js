import Vue from 'vue';
import Router from 'vue-router';
import home from '@/page/home';
import register from '@/page/register';
import login from '@/page/login';
import editInfo from '@/page/editInfo';
import changePwd from '@/page/changePwd';
import share from '@/page/share';
import favorite from '@/page/favorite';
import setNum from '@/page/setNum';
import friendsList from '@/page/friendsList';
import manageRP from '@/page/manageRP';
import handOut from '@/page/handOut';
import preview from '@/page/preview';
import receive from '@/page/receive';

Vue.use(Router);

export default new Router({
  routes: [{
    path: '/',
    name: 'home',
    component: home
  }, {
    path: '/register',
    name: 'register',
    component: register
  }, {
    path: '/login',
    name: 'login',
    component: login
  }, {
    path: '/editInfo',
    name: 'editInfo',
    component: editInfo
  }, {
    path: '/share',
    name: 'share',
    component: share
  }, {
    path: '/favorite',
    name: 'favorite',
    component: favorite
  }, {
    path: '/setNum',
    name: 'setNum',
    component: setNum
  }, {
    path: '/friendsList',
    name: 'friendsList',
    component: friendsList
  }, {
    path: '/changePwd',
    name: 'changePwd',
    component: changePwd
  }, {
    path: '/manageRP',
    name: 'manageRP',
    component: manageRP
  }, {
    path: '/handOut',
    name: 'handOut',
    component: handOut
  }, {
    path: '/preview',
    name: 'preview',
    component: preview
  }, {
    path: '/receive',
    name: 'receive',
    component: receive
  }]
});

//# sourceMappingURL=index-compiled.js.map