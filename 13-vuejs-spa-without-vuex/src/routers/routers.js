import Home from '../components/Home';
import MovieDetails from '../components/MovieDetails';
import GetTickets from '../components/GetTickets';
import SeatSelections from '../components/SeatSelections';
import Conformation from '../components/Conformation';

export default {
    routes: [
      { path: '/', component: Home },
      { path: '/movie/:id', component: MovieDetails },
      { path: '/movie/:id/tickets', component: GetTickets },
      { path: '/movie/:id/seats', component: SeatSelections, name: 'seats' },
      { path: '/conformation', component: Conformation, name: 'conformation' },
    ],
    mode: 'history'
}