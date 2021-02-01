<template>
  <form v-if="codeConfirm" v-on:submit.prevent="signupConfirm" class="mt-12 w-80 mx-auto">
    <div class="text-center">
      Please check your email for a confirmation code.
    </div>
    <input type="text" placeholder="Code" v-model="code">
    <input type="submit" value="Confirm">
  </form>
  <form v-else v-on:submit.prevent="signup" class="mt-12 w-80 mx-auto">
    <input type="text" placeholder="Username" v-model="username">
    <input type="text" placeholder="Email" v-model="email">
    <input type="password" placeholder="Password" v-model="password">
    <input type="password" placeholder="Confirm password" v-model="passwordConfirm">
    <input type="submit" value="Sign up">
  </form>
</template>

<script>
export default {
  name: "Signup",
  data() {
    return {
      username: "",
      password: "",
      passwordConfirm: "",
      email: "",
      code: "",
      codeConfirm: false,
      error: ""
    }
  },
  computed: {
    user() {
      return this.$store.getters["auth/user"]
    }
  },
  methods: {
    async signup() {
      if (!this.email || !this.password || this.password !== this.passwordConfirm) return

      try {
        await this.$store.dispatch("auth/signup", {
          username: this.username,
          password: this.password,
          email: this.email
        })
        this.codeConfirm = true
      } catch (error) {
        console.log(error)
        this.error = error
      }
    },
    async signupConfirm() {
      if (!this.username || !this.code) return

      try {
        await this.$store.dispatch("auth/signupConfirm", {
          username: this.username,
          code: this.code
        })
        await this.$store.dispatch("auth/login", {
          username: this.username,
          password: this.password
        })
        this.$router.push("/")
      } catch (error) {
        console.log(error)
        this.error = error
      }
    }
  }
}
</script>

<style>

</style>