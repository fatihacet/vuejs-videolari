import Home from '../components/Home.vue';
import MovieDetails from '../components/MovieDetails.vue';

export default {
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/movie/:id',
      component: MovieDetails,
    }
  ],
  mode: 'history',
}
