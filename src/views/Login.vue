<template>
  <form v-if="!user" v-on:submit.prevent="login" class="mt-12 w-80 mx-auto">
    <input type="text" placeholder="Username" v-model="username">
    <input type="password" placeholder="Password" v-model="password">
    <input type="submit" value="Login">
  </form>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      error: ''
    }
  },
  mounted() {
    const user = this.$store.getters['auth/user']
    if (user) {
      this.$router.push('/')
    }
  },
  computed: {
    user() {
      return this.$store.getters['auth/user']
    }
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch('auth/login', {
          username: this.username,
          password: this.password
        })
        
        this.$router.go()
      } catch (error) {
        console.log(error)
        this.error = error
      }
    }
  }
}
</script>

<style scoped>

</style>