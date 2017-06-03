import service from '../services/service';

const state = {
  movies: [],
  movieDetails: {},
};

const getters = {
  movies(state) {
    return state.movies;
  },
  groupedMovies(state) {
    const grouped = [];

    state.movies.forEach((movie, index) => {
      if (index % 3 === 0) {
        grouped.push([]);
      }

      grouped[grouped.length - 1].push(movie);
    });

    return grouped;
  },
};

const mutations = {
  setMovies(state, movies) {
    state.movies = movies;
  },

  setMovieDetails(state, payload) {
    const { id, data } = payload;

    state.movieDetails[id] = data;
  },
};

const actions = {
  fetchMovies(context) {
    return service.fetchMovies().then((snapshot) => {
      context.commit('setMovies', snapshot.val());
    });
  },

  fetchMovieDetails(context, id) {
    return service.fetchMovieDetails(id).then((snapshot) => {
      context.commit('setMovieDetails', {
        id: id,
        data: snapshot.val(),
      });
    });
  },
};


export default {
  state,
  getters,
  mutations,
  actions,
}
