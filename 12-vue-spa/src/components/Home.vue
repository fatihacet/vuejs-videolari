<template>
  <div>
    <app-header />
    <loader v-if="isLoading" />
    <section class="movies container py-5">
      <div v-for="group in groupedMovies" class="card-deck">
        <movie v-for="movie in group" :movie="movie" :key="movie.id" />
      </div>
  </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Loader from './Loader.vue';
import AppHeader from './AppHeader.vue';
import Movie from './Movie.vue';

export default {
  data() {
    return {
      isLoading: true,
    }
  },
  computed: {
    ...mapGetters([
      'groupedMovies',
    ])
  },
  components: {
    AppHeader,
    Movie,
    Loader,
  },
  created() {
    this.$store.dispatch('fetchMovies').then(() => {
      this.isLoading = false;
    });
  }
};
</script>
