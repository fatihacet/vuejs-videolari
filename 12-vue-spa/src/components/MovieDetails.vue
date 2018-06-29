<template>
  <div>
    <loader v-if="isLoading" />
    <section v-if="hasDetails">
      <img :src="backdropPath" class="backdrop" />
      <div class="container pt-5">
        <div class="row">
          <div class="col-sm-4">
            <img :src="posterPath" class="poster" />
          </div>
          <div class="col-sm-8">
            <div class="movie-details">
              <h2 class="movie-title">
                {{details.original_title}}
                <a :href="ticketsPath" type="button" class="btn btn-success buy-btn">Get Tickets</a>
              </h2>
              <p>{{details.overview}}</p>
              <span>Runtime: {{runtime}}</span><br/>
              <span>Average Rating: {{details.vote_average.toFixed(1)}}</span><br/>
              <span>Production Company: {{details.production_companies[0].name}}</span><br/>
              <span>Release Date: {{details.release_date}}</span><br/>
              <h4 class="pt-3">Cast</h4>
              <img :src="castAvatar(person.profile_path)" v-for="person in details.cast" class="cast-avatar" />
              <h4 class="pt-3">Trailers</h4>
              <a :href="trailer.url" v-for="trailer in trailers" target="_blank" class="trailer-link">
                <div class="play-icon" />
                <img :src="trailer.thumbnail" class="thumbnail" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Loader from './Loader.vue';

export default {
  components: {
    Loader,
  },
  data() {
    return {
      isLoading: true,
      hasDetails: false,
    }
  },
  created() {
    this.movieId = this.$route.params.id;
    this.$store.dispatch('fetchMovieDetails', this.movieId).then(() => {
      this.isLoading = false;
      this.hasDetails = true;
    });
  },
  methods: {
    castAvatar(path) {
      return `https://image.tmdb.org/t/p/w45${path}`;
    }
  },
  computed: {
    details() {
      return this.$store.state.movieDetails[this.movieId];
    },
    backdropPath() {
      return `https://image.tmdb.org/t/p/w1280${this.details.backdrop_path}`;
    },
    posterPath() {
      return `https://image.tmdb.org/t/p/w500${this.details.poster_path}`;
    },
    trailers() {
      const trailers = [];
      this.details.videos.results.forEach((video) => {
        if (video.type === 'Trailer') {
          trailers.push({
            thumbnail: `https://i.ytimg.com/vi/${video.key}/sddefault.jpg`,
            url: `https://youtube.com/watch?v=${video.key}`,
          });
        }
      });
      return trailers;
    },
    runtime() {
      const { runtime } = this.details;
      const hours = Math.floor(runtime / 60);

      return `${hours}h ${runtime - (hours * 60)}m`;
    },
    ticketsPath() {
      return `/movie/${this.details.id}/tickets`;
    }
  },
}
</script>

<style>
.movie-title {
  position: relative;
}
img.backdrop {
  width: 100%;
  height: 100vh;
  filter: blur(30px);
  position: absolute;
  top: 0;
  left: 0;
  transform: scale(1.1);
}
img.poster {
  width: 100%;
  border-radius: 6px;
}
.movie-details {
  float: left;
  color: #FFF;
  max-width: 700px;
}
.thumbnail {
  width: 150px;
  height: 110px;
}
.trailer-link {
  width: 150px;
  height: 110px;
  display: inline-block;
  margin-right: 20px;
  position: relative;
}
.play-icon {
  background-image: url(http://f.acet.me/LXIk.png);
  background-size: 75px 75px;
  position: absolute;
  width: 75px;
  height: 75px;
  top: 18px;
  left: 36px;
}
.cast-avatar {
  width: 45px;
  height: 45px;
  border-radius: 45px;
  border: 2px solid #FFF;
  margin-right: 10px;
}
.buy-btn {
  position: absolute;
  right: 0;
  top: -3px;
}
</style>
