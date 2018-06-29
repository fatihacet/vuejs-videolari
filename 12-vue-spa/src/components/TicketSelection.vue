<template>
  <div>
    <loader v-if="isLoading" />
    <section v-if="hasTicketingInfo">
      <img :src="backdropPath" class="backdrop" />
      <div class="container pt-5">
        <div class="row">
          <div class="col-sm-4">
            <img :src="posterPath" class="poster" />
          </div>
          <div class="col-sm-8">
            <div class="movie-details">
              <h2 class="movie-title">{{details.original_title}}</h2>
              <p>{{details.overview}}</p>
              <div class="movie-times">
                <h5>{{movieTimes.hallName}}</h5>
                <p
                  v-for="time in movieTimes.times"
                  @click="selectTime(time)"
                  :class="{ selected: time === selectedTime }">
                  {{time}}
                </p>
              </div>
              <div class="ticket-types">
                <div v-for="ticket in ticketPrices">
                  <p
                    @click="removeTicket(ticket.label)"
                    :class="{ disabled: !selectedTickets[ticket.label]}">-</p>
                  <div class="text">
                    <span class="label">
                      <span class="count" v-if="selectedTickets[ticket.label] > 0">
                        {{selectedTickets[ticket.label]}}
                      </span>
                      {{ticket.label}}
                    </span>
                    <span class="price">{{parseInt(ticket.price, 10).toFixed(2)}} TL</span>
                  </div>
                  <p @click="addTicket(ticket.label)">+</p>
                </div>
              </div>
              <button
                @click="navigateToSeatSelection"
                :disabled="!isTimeAndTicketCountSelected"
                type="button"
                class="btn btn-success">Select Your Seat</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import MovieDetails from './MovieDetails.vue';

export default {
  mixins: [ MovieDetails ],
  data() {
    return {
      selectedTime: null,
      selectedTickets: {},
      hasTicketingInfo: false,
    }
  },
  computed: {
    movieTimes() {
      return this.$store.state.movieTimes[this.movieId];
    },
    ticketPrices() {
      return this.$store.state.ticketPrices;
    },
    seatSelectionPath() {
      return `/movie/${this.movieId}/seat-selection`;
    },
    isTimeAndTicketCountSelected() {
      let selected = false;

      for (const key in this.selectedTickets) {
        if (this.selectedTickets[key] > 0) {
          selected = true;
        }
      }

      return selected && this.selectedTime;
    }
  },
  created() {
    this.movieId = this.$route.params.id;
    this.$store.commit('setSelectedMovieId', this.movieId);
    this.$store.dispatch('fetchTicketingInfo', this.movieId).then(() => {
      this.hasTicketingInfo = true;
      this.setTicketTypes();
    });
  },
  methods: {
    selectTime(time) {
      this.selectedTime = time;
    },
    addTicket(type) {
      this.selectedTickets[type] = ++this.selectedTickets[type];
    },
    removeTicket(type) {
      this.selectedTickets[type] = Math.max(--this.selectedTickets[type], 0);
    },
    setTicketTypes() {
      const types = {};

      this.ticketPrices.forEach((ticket) => {
        types[ticket.label] = 0;
      });

      this.selectedTickets = types;
    },
    navigateToSeatSelection() {
      this.$store.commit('setSelectedTime', this.selectedTime);
      this.$store.commit('setSelectedTicketOptions', this.selectedTickets);
      this.$store.commit('setSelectedMovieHallId', this.movieTimes.hallId);
      this.$router.push(this.seatSelectionPath);
    },
  }
}
</script>

<style>
.movie-times p {
  display: inline-block;
  padding: 5px 20px;
  border: 1px solid #FFF;
  border-radius: 20px;
  margin-right: 10px;
  cursor: pointer;
}
.movie-times p.selected,
.movie-times p:hover,
.ticket-types p:not(.disabled):hover {
  background-color: #FFF;
  color: #000;
}
.ticket-types {
  margin-top: 30px;
}
.ticket-types p {
  font-size: 22px;
  width: 40px;
  height: 40px;
  border-radius: 40px;
  border: 2px solid #FFF;
  display: inline-block;
  text-align: center;
  cursor: pointer;
  user-select: none;
  position: relative;
  top: -15px;
}
.ticket-types p.disabled {
  opacity: .33;
}
.ticket-types .text {
  display: inline-block;
  width: 175px;
  text-align: center;
}
.ticket-types .label {
  display: block;
  font-size: 24px;
  font-weight: bold;
}
</style>
