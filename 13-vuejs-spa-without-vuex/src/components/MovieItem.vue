<script>
export default {
  name: 'MovieItem',
  props: {
    movie: {
      type: Object,
      required: true
    }
  },
  computed: {
    Poster(){
      return `https://image.tmdb.org/t/p/w500${this.movie.poster_path}`;
    },
    MovieDetailLink(){
      return `/movie/${this.movie.id}`;
    }
  }
}
</script>

<template>
  <div class="card">
    <router-link :to="MovieDetailLink">
      <img class="card-img-top" :src="Poster" :alt="movie.original_title">
    </router-link>
    <div class="card-body">
      <h5 class="card-title">{{movie.original_title}}</h5>
      <p class="card-text">{{movie.overview}}</p>
    </div>
    <div class="card-footer">
      <small class="text-muted">Puan: {{movie.vote_average.toFixed(1)}}</small>
    </div>
  </div>
</template>