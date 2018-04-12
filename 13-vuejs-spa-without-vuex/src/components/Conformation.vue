<script>
import Services from '../services/services';
import Loader from './Loader.vue';

export default {
  name: 'Conformation',
  data() {
    return {
      isLoading: true,
      hasListed: false,
      postData: []
    }
  },
  components:{
    Services, Loader
  },
  created(){
    if (this.myTickets) {
      Services.fetchSoldTickets(this.myTickets.id, this.myTickets.time).then( (snapshot) => {
        this.isLoading = false;
        this.hasListed = true;
        if (snapshot.val()!=null) {
          this.postData = snapshot.val();
        }
        this.myTickets.seats.forEach(item => {
          this.postData.push(item);  
        });
        Services.buyTickets(this.myTickets.id, this.myTickets.time, this.postData);
      });
    } else {
       this.$router.replace(`/`);
    }
  },
  computed:{
    myTickets(){
      return this.$route.params.myTickets;
    },
    mySeats(){
      let seats = "";
      this.myTickets.seats.sort();
      this.myTickets.seats.forEach((item, index) => {
        seats += item;
        if (this.myTickets.seats.length > (index+1)) {
          seats += ', ';
        }
      });
      return seats;
    }
  }
}
</script>

<template>
  <div>
    <loader v-if="isLoading" />
    <div class="details" v-if="hasListed">
      <div class="container mt-5">
        <div class="row justify-content-md-center">
          <div class="col-md-5">
            <div class="card text-white bg-success mb-3 text-center">
              <div class="card-body">
                <h4 class="card-title">Your tickets are ready!</h4>
                <p class="card-text">{{myTickets.original_title}}</p>
                <p class="card-text">{{myTickets.hallName}}, {{myTickets.time}}</p>
                <p class="card-text">{{mySeats}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
