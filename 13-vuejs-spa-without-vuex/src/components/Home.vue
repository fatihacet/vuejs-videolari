<script>
import Services from '../services/services';

import AppHeader from './AppHeader.vue';
import Loader from './Loader.vue';
import Movies from './Movies.vue';

export default {
  name: 'Home',
  data(){
    return{
      isLoading: true,
      hasListed: false,
      movies: []
    }
  },
  components: {
    Services, AppHeader, Loader, Movies
  },
  created() {
    Services.fetchMovies().then( (snapshot)=> {
      this.isLoading = false;
      this.hasListed = true;
      this.movies = snapshot.val();
    });
  },
  computed: {
    groupedMovies(){
      const grouped = [];
      this.movies.forEach((movie, index) => {
        if (index % 3 === 0) {
          grouped.push([]);
        }
        grouped[grouped.length - 1].push(movie);
      });
      return grouped;
    }
  },
}
</script>

<template>
  <div>
    <app-header />
    <section class="container">
      <loader v-if="isLoading" />
      <movies v-if="hasListed" :movies=groupedMovies />
    </section>
  </div>
</template>
