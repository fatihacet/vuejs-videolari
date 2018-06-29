<template>
  <div class="card">
    <router-link :to="movieDetailsPath">
      <img class="card-img-top" :src="posterPath" :alt="movie.original_title">
    </router-link>
    <div class="card-block">
      <router-link :to="movieDetailsPath">
        <h4 class="card-title">{{movie.original_title}}</h4>
      </router-link>
      <p class="card-text">{{movie.overview}}</p>
    </div>
    <div class="card-footer">
      <small class="text-muted text-right">Average rating: {{movie.vote_average.toFixed(1)}}</small>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    movie: { type: Object, required: true }
  },
  computed: {
    posterPath() {
      return `https://image.tmdb.org/t/p/w500${this.movie.poster_path}`;
    },
    movieDetailsPath() {
      return `/movie/${this.movie.id}`;
    }
  }
}
</script>

<style>
.card {
  margin-bottom: 30px;
  min-width: 200px;
}
.card img {
  width: 100%;
}
</style>
