<template>
  <div>
    <template v-for="user in users">
      <user-item :user=user></user-item>
    </template>
  </div>
</template>


<script>
import UserItem from './UserItem.vue'

export default {
  name: 'Home',
  data() {
    return {
      users: []
    }
  },
  created() {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((res) => { return res.json() })
    .then((users) => { this.users = users; })
  },
  components: { UserItem }
}
</script>
