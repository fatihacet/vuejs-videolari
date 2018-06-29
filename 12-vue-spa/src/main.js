import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import routerOptions from './router/routerOptions.js';
import storeOptions from './stores/Store.js';
import App from './App.vue';

Vue.use(Vuex);
Vue.use(VueRouter);

const { state, getters, mutations, actions } = storeOptions;
const router = new VueRouter(routerOptions);
const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
});

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
});
