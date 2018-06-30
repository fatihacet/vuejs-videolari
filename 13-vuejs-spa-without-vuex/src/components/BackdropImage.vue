<script>
export default {
  name: 'BackdropImage',
  props: {
    imageName: {
      type: String,
      required: true
    }
  },
  computed: {
    BackdropPath(){
       return `https://image.tmdb.org/t/p/w1280${this.imageName}`;
    }
  }
}
</script>

<template>
  <div class="bd-wrap">
    <img :src="BackdropPath" class="backdrop">
  </div>
</template>

<style>
.bd-wrap{
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
  top: 0;
  left: 0;
  overflow: hidden;
}
.backdrop{
  width: 100%;
  height: 100%;
  filter:blur(20px);
  overflow: hidden;
  object-fit: cover;
  object-position: center;
  transform: scale(1.1);
}
</style>


