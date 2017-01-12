<template>
  <div id="app">
    <search v-on:SearchRequested="handleSearch"></search>
    <p v-if="isLoading">Loading</p>
    <preview :gifs=gifs></preview>
  </div>
</template>

<script>
import Search from './components/Search.vue'
import Preview from './components/Preview.vue'

export default {
  name: 'app',
  components: { Search, Preview },
  data() {
    return {
      isLoading: true,
      gifs: []
    }
  },
  methods: {
    doQuery(url) {
      fetch(url)
      .then((res) => { return res.json() } )
      .then((res) => {
        this.gifs = res.data;
        this.isLoading = false;
      })
    },
    handleSearch(query) {
      this.gifs = [];
      this.isLoading = true;
      const url = `http://api.giphy.com/v1/gifs/search?q=${query}&api_key=dc6zaTOxFJmzC`;
      this.doQuery(url);
    }
  },
  created() {
    const url = 'http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC';
    this.doQuery(url);
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
