<script>
import Services from '../services/services';

import AppHeader from './AppHeader.vue';
import Loader from './Loader.vue';
import Poster from './Poster.vue';
import BackdropImage from './BackdropImage.vue';

export default {
  name: 'SeatSelections',
  data(){
    return {
      isLoading: true,
      hasListed: false,
      movie: {},
      halls: {},
      myTickets: [],
      soldTickets: [],
      selectedSeat: [],
    }
  },
  components: { 
    Services, AppHeader, Loader, Poster, BackdropImage
  },
  created(){
    this.myTickets = this.$route.params.myTickets;
    if (this.myTickets) {
      Services.fetchMovieDetails(this.movieId).then( (snapshot) => {
        Services.fetchHalls(this.myTickets.hallId).then( (snapshot2) => {
          this.isLoading = false;
          this.hasListed = true;
          this.movie = snapshot.val();
          this.halls = snapshot2.val();
          Services.fetchSoldTickets(this.movieId, this.myTickets.time).then( (snapshot3) => {
            this.soldTickets = snapshot3.val();
          });
        });
      });
    } else {
        this.$router.replace(`/movie/${this.movieId}/tickets`);
    }
  },
  methods: {
    convertSeat(seat){
      return seat ? seat : '&nbsp';
    },
    isSoldSeat(seat, rowIndex){
      if (!seat) {
        return true;
      } else {
        let checked = false;
        let rowSeat = rowIndex+seat;
        if (this.soldTickets!=null) {
          checked = this.soldTickets.some(function (item) {
            return item === rowSeat ? true : false;
          });
        }
        return checked;
      }
    },
    selectSeat(seat, rowIndex){
      const rowSeat = rowIndex+seat;
      this.selectedSeat.includes(rowSeat) ? this.selectedSeat.splice(this.selectedSeat.indexOf(rowSeat), 1) : this.selectedSeat.push(rowSeat);
    }
  },
  computed: {
    movieId(){
      return this.$route.params.id;
    },
    ticketCount(){
      let count = 0;
      this.myTickets.tickets.forEach(item => {
        count += item.count;
      });
      return count;
    },
    isButtonDisabled(){
      return this.selectedSeat.length == this.ticketCount ? false : true;
    },
    buyTickets(){
      Object.assign(this.myTickets, { id: this.movieId, seats: this.selectedSeat, original_title: this.movie.original_title });
      return this.myTickets;
    }
  }
}
</script>

<template>
  <div>
    <app-header />
    <loader v-if="isLoading" />
    <div class="details" v-if="hasListed">
      <div class="container mt-5">
        <div class="row">
          <div class="col-md-4">
            <poster :imageName="movie.poster_path" />
          </div>
          <div class="col-md-8">
            <h2 class="text-center">SCENE</h2>
            <h5>{{this.halls.name}} - {{this.myTickets.time}}</h5>
            <div class="row seat-row" v-for="(row, rowIndex) in this.halls.seating">
              <div class="col">
                <span class="row-name">{{rowIndex}}</span>
                <button class="btn btn-outline-light seat"
                  v-for="seat in row" 
                  v-html="convertSeat(seat)"
                  :disabled="isSoldSeat(seat, rowIndex)"
                  :class="{'btn-danger':isSoldSeat(seat, rowIndex) && seat, active:selectedSeat.includes(rowIndex+seat)}"
                  @click="selectSeat(seat, rowIndex)"
                ></button>
              </div>
            </div>
            <div class="col">
              <router-link class="btn btn-success float-right" 
                :to="{ name: 'conformation', params: { myTickets: buyTickets } }" 
                :disabled="isButtonDisabled"
                tag="button"
              >Buy Tickets</router-link>
            </div>
          </div>
        </div>
      </div>
      <backdrop-image :imageName="movie.backdrop_path" />
    </div>
  </div>
</template>

<style lang="scss">
.row-name{
  display: inline-block;
  width: 20px;
}
.seat-row{
  margin-bottom: 10px;
}
.seat{
  width: 42px;
  padding: 0;
  margin: 0 2px;
  font-size: 14px;
  text-align: center;
  &[disabled="disabled"]{
    background-color:gray;  
  }
  &.btn-danger[disabled="disabled"]{
    background-color:red;  
  }
  &.btn-outline-light{
    &.active{
      color: #fff !important;
      background-color: #28a745 !important;
      border-color: #28a745 !important;
    }
  }
}
</style>

