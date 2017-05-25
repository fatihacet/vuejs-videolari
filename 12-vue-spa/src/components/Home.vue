<script>
import { mapGetters } from 'vuex';
import AppHeader from './AppHeader.vue';
import Loader from './Loader.vue';
import Movie from './Movie.vue';

export default {
  name: 'Home',
  data() {
    return {
      isLoading: true,
    }
  },
  components: {
    AppHeader,
    Loader,
    Movie,
  },
  computed: {
    ...mapGetters([
      'movies',
      'groupedMovies',
    ])
  },
  created() {
    this.$store.dispatch('fetchMovies').then(() => {
      this.isLoading = false;
    });
  },
}
</script>

<template>
  <section>
    <app-header />
    <loader v-if="isLoading" />
    <section class="container py-5">
      <div v-for="group in groupedMovies" class="card-deck">
        <movie v-for="movie in group" key="movie.id" :movie="movie" />
      </div>
    </section>
  </section>
</template>
