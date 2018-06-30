<script>
import Services from '../services/services';

import AppHeader from './AppHeader.vue';
import Loader from './Loader.vue';
import Poster from './Poster.vue';
import BackdropImage from './BackdropImage';

export default {
  name: 'MovieDetails',
  data() {
    return{
      isLoading: true,
      hasListed: false,
      movie: {}
    }
  },
  components: {
    AppHeader, Loader, Poster, BackdropImage
  },
  created(){
    Services.fetchMovieDetails(this.movieId).then((snapshot)=>{
      this.isLoading = false;
      this.hasListed = true;
      this.movie = snapshot.val();
    });
  },
  methods: {
    castAvatar(imageName){
      return `https://image.tmdb.org/t/p/w45${imageName}`;
    }
  },
  computed: {
    movieId(){
      return this.$route.params.id;
    },
    runtime(){
      const runtime = this.movie.runtime;
      const hour = Math.floor(runtime / 60);
      const minute = runtime - (hour * 60);
      return `${hour}h ${minute}m`;
    },
    trailers(){
      const trailers = [];
      this.movie.videos.results.forEach(item => {
        if (item.type === 'Trailer') {
          trailers.push({
            'thumbnail': `http://img.youtube.com/vi/${item.key}/mqdefault.jpg`,
            'url': `http://www.youtube.com/watch?v=${item.key}`
          });
        }
      });
      return trailers;
    },
    getTickets(){
      return `/movie/${this.movie.id}/tickets`;
    }
  },
}
</script>

<template>
  <div>
    <app-header />
    <loader v-if="isLoading" />
    <div class="details" v-if="hasListed">
      <section class="container mt-4">
        <div class="row">
          <div class="col-md-4">
            <poster :imageName=movie.poster_path />
          </div>
          <div class="col-md-8">
            <router-link :to="getTickets" class="btn btn-success float-right">Get Tickets</router-link>
            <h2>{{movie.original_title}}</h2>
            <div>{{movie.overview}}</div>
            <div class="mt-2">Runtime: {{runtime}}</div>
            <div>Average Rating: {{movie.vote_average.toFixed(1)}}</div>
            <h6 class="mt-2">Production Companies</h6>
            <ul>
              <li v-for="company in movie.production_companies">{{company.name}}</li>
            </ul>
            <div>Release Date: {{movie.release_date}}</div>
            <h4 class="mt-3">Cast</h4>
            <img :src="castAvatar(person.profile_path)" v-for="person in movie.cast" class="castAvatar" />
            <h4 class="mt-3">Trailers</h4>
            <a :href="trailer.url" v-for="trailer in trailers" target="_blank" class="trailer">
              <div class="play">
                <img src="../assets/youtube.svg" class="svg">
              </div>
              <img :src="trailer.thumbnail" class="thumbnail"/>
            </a>
          </div>
        </div>
      </section>
      <backdrop-image :imageName=movie.backdrop_path />
    </div>
  </div>
</template>

<style lang="scss">
.details{
  color:#fff;
  text-shadow: 2px 2px 1px rgba($color: #000000, $alpha: 0.5);
}
.castAvatar{
  width: 45px;
  height: 45px; 
  margin-right: 10px;
  border-radius: 45px;
  object-fit: cover;
  object-position: top center;
  border: 2px solid #fff;
  box-sizing: border-box;
  overflow: hidden;
}
.trailer{
  position: relative;
  display: inline-block;
  margin-right: 15px;
  margin-bottom: 15px;
  .play{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .svg{
      width: 30px;
    }
  }
  .thumbnail{
    width: 150px;
  }
}
</style>

