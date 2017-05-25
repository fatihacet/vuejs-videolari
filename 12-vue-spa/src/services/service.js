export default {
  fetchMovies(cb) {
    return firebase.database().ref('/movies').once('value');
  },
}
