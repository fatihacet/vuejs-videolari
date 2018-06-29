import Home from '../components/Home.vue';
import MovieDetails from '../components/MovieDetails.vue';
import TicketSelection from '../components/TicketSelection.vue';
import SeatSelection from '../components/SeatSelection.vue';
import Confirmation from '../components/Confirmation.vue';

export default {
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/movie/:id',
      component: MovieDetails,
    },
    {
      path: '/movie/:id/tickets',
      component: TicketSelection,
    },
    {
      path: '/movie/:id/seat-selection',
      component: SeatSelection,
    },
    {
      path: '/confirmation',
      component: Confirmation,
    }
  ],
  mode: 'history',
}
