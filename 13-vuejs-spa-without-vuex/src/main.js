import Vue from 'vue';
import VueRouter from 'vue-router';

import routerOptions from './routers/routers';
import App from './App.vue';

// import store from './store/index.js';

Vue.use(VueRouter);

const router = new VueRouter(routerOptions)

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  // data: { 
  //   store
  // }
})