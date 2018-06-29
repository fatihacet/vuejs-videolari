<template>
  <div>
    <loader v-if="isLoading" />
    <section v-if="hasSeatingInfo">
      <img :src="backdropPath" class="backdrop" />
      <div class="container pt-5">
        <div class="row">
          <div class="col-sm-4">
            <img :src="posterPath" class="poster" />
          </div>
          <div class="col-sm-8">
            <div class="movie-details">
              <div class="seating">
                <p class="scene">SCENE</p>
                <div class="seats" v-for="(seats, row) in seatMap">
                  <span class="row-title">{{row}}</span>
                  <div class="row">
                    <span
                      @click="toggleSeat(row, seat)"
                      v-for="seat in seats"
                      :class="{
                        'not-allowed': !seat,
                        'not-available': isSeatSold(row, seat),
                        'selected': isSeatSelected(row, seat)
                      }">
                      {{seat}}
                    </span>
                  </div>
                </div>
                <button
                  @click="navigateToSuccessPage"
                  :disabled="selectedTicketCount != selectedSeatCount"
                  class="btn btn-success">Buy Tickets</button>
              </div>
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
      hasSeatingInfo: false,
      selectedSeats: [],
    }
  },
  computed: {
    seatMap() {
      const { halls, selectedMovieHallId } = this.$store.state;
      return halls[selectedMovieHallId].seating;
    },
    soldTickets() {
      const movieId = this.$route.params.id;
      const { soldTickets, selectedTime } = this.$store.state;
      if (soldTickets && soldTickets[movieId] && soldTickets[movieId][selectedTime]) {
        return soldTickets[movieId][selectedTime];
      }

      return [];
    },
    selectedTicketCount() {
      let count = 0;

      for (let key in this.$store.state.selectedTicketCounts) {
        count += this.$store.state.selectedTicketCounts[key];
      }

      return count;
    },
    selectedSeatCount() {
      return this.selectedSeats.length;
    },
  },
  created() {
    const options = {
      movieId: this.$route.params.id,
      time: this.$store.state.selectedTime,
      hallId: this.$store.state.selectedMovieHallId,
    };

    if (!options.time || !options.hallId) {
      return this.$router.push(`/movie/${options.movieId}/tickets`);
    }

    this.$store.dispatch('fetchSeatingInfo', options).then(() => {
      this.hasSeatingInfo = true;
    });
  },
  methods: {
    isSeatSold(row, seat) {
      return this.soldTickets.indexOf(`${row}${seat}`) > -1;
    },
    isSeatSelected(row, seat) {
      return this.selectedSeats.indexOf(`${row}${seat}`) > -1;
    },
    toggleSeat(row, seat) {
      const key = `${row}${seat}`;
      if (this.selectedSeats.indexOf(key) > -1) {
        this.selectedSeats.splice(this.selectedSeats.indexOf(key), 1);
      } else {
        this.selectedSeats.push(key);
      }
    },
    navigateToSuccessPage() {
      this.$store.commit('setSelectedSeats', this.selectedSeats);
      this.$router.push('/confirmation');
    },
  },
}
</script>

<style>
.seating {
  width: 694px;
  position: relative;
}
.seating .scene {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
}
.seating .row-title {
  float: left;
  font-weight: bold;
  width: 50px;
}
.seating .row {
  display: inline-block;
}
.seating .row span {
  float: left;
  width: 40px;
  height: 25px;
  border: 1px solid #FFF;
  text-align: center;
  margin: 0 2px;
  cursor: pointer;
}
.seating .row span:not(.not-allowed):not(.not-available):hover {
  background: #FFF;
  color: #000;
}
.seating .row span.not-allowed {
  background: #9d9d9d;
  cursor: not-allowed;
}
.seating .row span.not-available {
  background: #E4112B;
  cursor: not-allowed;
}
.seating .row span.selected {
  background: #5cb85c;
}
.seating .btn-success {
  cursor: pointer;
  margin-top: 10px;
  position: absolute;
  right: 0;
}
</style>
