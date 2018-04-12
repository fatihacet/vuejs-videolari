export default {
  fetchMovies(){
    return firebase.database().ref('/movies').once('value');
  },
  fetchMovieDetails(id){
    return firebase.database().ref(`/movieDetails/${id}`).once('value');
  },
  fetchMovieTimes(id){
    return firebase.database().ref(`/movieTimes/${id}`).once('value');
  },
  fetchTicketPrices(){
    return firebase.database().ref(`/ticketPrices`).once('value');
  },
  fetchHalls(id){
    return firebase.database().ref(`/halls/${id}`).once('value');
  },
  fetchSoldTickets(id, id2){
    return firebase.database().ref(`/soldTickets/${id}/${id2}`).once('value');
  },
  buyTickets(id, id2, postData){
    return firebase.database().ref(`/soldTickets/${id}/${id2}/`).set(postData);
  },
}