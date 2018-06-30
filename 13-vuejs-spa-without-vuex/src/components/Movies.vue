<template>
  <div>
    <div class="card-deck mt-4" v-for="group in movies">
      <template class="card" v-for="movie in group">
        <movie-item :movie=movie />
      </template>
    </div>
  </div>
</template>

<script>
import MovieItem from './MovieItem';

export default {
  name: 'Movies',
  props: {
    movies: {
      type: Array,
      required: true
    }
  },
  components: {
    MovieItem
  }
}
</script>
