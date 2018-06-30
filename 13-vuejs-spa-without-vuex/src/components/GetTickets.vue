<script>
import Services from '../services/services';

import AppHeader from './AppHeader.vue';
import Loader from './Loader.vue';
import Poster from './Poster.vue';
import BackdropImage from './BackdropImage.vue';

export default {
  name: 'GetTickets',
  data() {
    return {
      isLoading: true,
      hasListed: false,
      movie: {},
      movieTimes: {},
      ticketPrices: [],
      myTickets: {
        'hallId': 0,
        'hallName': '',
        'time': '',
        'tickets': [],
      },
      currentTime: ''
     }
  },
  components: { 
    AppHeader, Loader, Poster, BackdropImage 
  },
  created(){
    Services.fetchMovieDetails(this.movieId).then( (snapshot) => {
      Services.fetchMovieTimes(this.movieId).then( (snapshot2) => {
        Services.fetchTicketPrices().then( (snapshot3) => {
          this.isLoading = false;
          this.hasListed = true;
          this.movie = snapshot.val();
          this.movieTimes = snapshot2.val();
          this.ticketPrices = snapshot3.val();
          this.myTickets.hallId = this.movieTimes.hallId;
          this.myTickets.hallName = this.movieTimes.hallName;
        });
      });
    });
  },
  methods: {
    pushSelectedProp(index){
      const ticket = this.ticketPrices[index];
      this.myTickets.tickets.push({
        'index': index,
        'label': ticket.label,
        'price': ticket.price,
        'count': 1
      });
    },
    findTicket(index) {
      return {
        findedTicket: this.myTickets.tickets.find( ticket => ticket.index === index ),
        findedIndex: this.myTickets.tickets.findIndex( ticket => ticket.index === index )
      }
    },
    addTicket(index) {
      const { findedTicket, findedIndex } = this.findTicket(index);
      if (findedTicket === undefined){
        this.pushSelectedProp(index);
      } else {
        findedTicket.count++;
        this.myTickets.tickets.splice(findedIndex, 1, findedTicket);
      }
     },
    removeTicket(index) {
      const { findedTicket, findedIndex } = this.findTicket(index);
      if (findedTicket !== undefined){
        findedTicket.count--;
        if (findedTicket.count > 0) {
          this.myTickets.tickets.splice(findedIndex, 1, findedTicket);  
        } else {
          this.myTickets.tickets.splice(findedIndex, 1);
        }
      }
    },
    selectedTicket(index) {
      const { findedTicket, findedIndex } = this.findTicket(index)
      const count = findedTicket ? findedTicket.count : 0;
      return count > 0 ? count : '';
    },
    isRemoveButtonDisabled(index) {
      const { findedTicket, findedIndex } = this.findTicket(index);
      const count = findedTicket ? findedTicket.count : 0;
      return count > 0 ? false : true;
    },
    selectTime(time){
      if (this.myTickets.time === time) {
        this.myTickets.time = '';
      } else {
        this.myTickets.time = time;
      }
      this.currentTime = this.myTickets.time;
    },
  },
  computed: {
    movieId(){
      return this.$route.params.id;
    },
    isButtonDisabled(){
      return (this.currentTime) && (this.myTickets.tickets.length>0) ? false : true
    },
    ticketSelections(){
      return this.myTickets;
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
            <h2>{{movie.original_title}}</h2>
            <div>{{movie.overview}}</div>
            
            <h5 class="mt-4">{{movieTimes.hallName}}</h5>

            <button type="button" 
              v-for="time in movieTimes.times"
              v-bind:key="time"
              v-bind:class="['btn btn-outline-light time', { active: currentTime === time }]"
              v-on:click="selectTime(time)"
            >{{time}}</button>

            <div class="tickets">
              <div class="ticket" v-for="(item, index) in ticketPrices">
                <button type="button" class="btn btn-success rounded-circle" v-bind:disabled="isRemoveButtonDisabled(index)" @click="removeTicket(index)">-</button>
                <div class="display d-inline-block align-middle text-center">
                  <div class="count">{{ selectedTicket(index) }} {{item.label}}</div>
                  <div class="price">{{item.price}}</div>
                </div>
                <button type="button" class="btn btn-success rounded-circle" @click="addTicket(index)">+</button>
              </div>
            </div>

            <router-link class="btn btn-success" 
              :to="{ name: 'seats', params: { id: movieId, myTickets: ticketSelections } }" 
              :disabled="isButtonDisabled"
              tag="button"
            >Select Your Seat</router-link>

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
 // text-shadow: 2px 2px 1px rgba($color: #000000, $alpha: 0.5);
}
.time{
  margin: 0 5px 0 0;
}
.tickets {
  margin: 30px 0 0;
  .ticket {
    margin: 0 0 15px 0;
    .btn {
      width: 40px;
      height: 40px;
    }
    .display{
      max-width: 120px;
      width: 100%;
    }
    .count{
      font-weight: 700;
    }
  }
}
</style>
