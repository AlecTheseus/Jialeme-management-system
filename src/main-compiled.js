
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store/';
import './lib/AUI/script/api';
import './lib/AUI/css/aui.css';
import './lib/AUI/css/aui-pull-refresh.css';
import '../static/css/global.css';

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  store: store,
  router: router,
  template: '<App/>',
  components: { App: App }
});

//# sourceMappingURL=main-compiled.js.map