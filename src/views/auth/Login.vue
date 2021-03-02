<template>
  <div class="box padding-1 login-box">
    <form v-if="!user" v-on:submit.prevent="login" class="flex login-form">
      <input type="text" placeholder="Username" v-model="username" class="mb-05">
      <input type="password" placeholder="Password" v-model="password" class="mb-05">
      <input type="submit" value="Login" class="button">
    </form>
  </div>
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
.login-box {width: 400px; margin: 0 auto;}
.login-form {flex-direction: column;}
</style>