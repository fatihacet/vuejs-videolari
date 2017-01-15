import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

import App from './App.vue'
import Home from './components/Home.vue'
import UserProfile from './components/UserProfile.vue'
import UserPosts from './components/UserPosts.vue'

const router = new VueRouter({
  routes: [
    { path: '/', component: Home, name: 'home' },
    { path: '/user/:id', component: UserProfile, name: 'userProfile' },
    { path: '/user/:userId/posts', component: UserPosts }
  ],
  mode: 'history'
})

new Vue({
  el: '#app',
  render: h => h(App),
  router
})
