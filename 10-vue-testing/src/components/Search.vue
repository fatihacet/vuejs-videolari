<template>
  <div class="search">
    <input class="search-input" type="text" v-model="query" @keypress.enter="handleSearch" />
    <button class="search-button" @click="handleSearch">Search</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: ''
    }
  },
  methods: {
    handleSearch() {
      this.$emit('SearchRequested', this.query);
    }
  }
}
</script>


<style>
  .search input {
    padding: 10px 20px;
    border: 1px solid #CCC;
    border-radius: 5px;
    width: 400px;
  }
  .search button {
    padding: 5px 15px;
    border: 1px solid #CCC;
    background-color: #4183c4;
    color: #FFF;
    font-size: 16px;
    border-radius: 5px;
  }
</style>
