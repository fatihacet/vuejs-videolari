<template>
  <div class="container text-center">
    <div class="row">
      <div class="col-md-3"></div>
      <div class="card card-inverse card-success mt-5 col-md-6">
        <div class="card-block">
          <h2 class="card-title">Your tickets are ready!</h2>
          <p class="card-text">{{$store.state.movieDetails[$store.state.selectedMovieId].original_title}}</p>
          <p class="card-text">{{$store.state.halls[$store.state.selectedMovieHallId].name}}, {{$store.state.selectedTime}}</p>
          <p class="card-text">{{$store.state.selectedSeats.join(', ')}}</p>
        </div>
      </div>
      <div class="col-md-3"></div>
    </div>
  </div>
</template>
