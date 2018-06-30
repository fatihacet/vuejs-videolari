<script>
export default {
  name: 'Poster',
  props: {
    imageName: {
      type: String,
      required: true
    }
  },
  computed: {
    PosterPath(){
       return `https://image.tmdb.org/t/p/w500${this.imageName}`;
    }
  }
}
</script>

<template>
  <img :src="PosterPath" class="img-fluid">
</template>