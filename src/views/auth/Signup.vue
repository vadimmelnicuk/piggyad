<template>
  <div class="box padding-1 sign-up-box">
    <form v-if="codeConfirm" v-on:submit.prevent="signupConfirm" class="flex sign-up-form">
      <div class="text-center">
        Please check your email for a confirmation code.
      </div>
      <input type="text" placeholder="Code" v-model="code" class="mb-05">
      <input type="submit" value="Confirm" class="button">
    </form>
    <form v-else v-on:submit.prevent="signup" class="flex sign-up-form">
      <input type="text" placeholder="Username" v-model="username" class="mb-05">
      <input type="text" placeholder="Email" v-model="email" class="mb-05">
      <input type="password" placeholder="Password" v-model="password" class="mb-05">
      <input type="password" placeholder="Confirm password" v-model="passwordConfirm" class="mb-05">
      <input type="submit" value="Sign up" class="button">
    </form>
  </div>
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

<style scoped>
.sign-up-box {width: 400px; margin: 0 auto;}
.sign-up-form {flex-direction: column;}
</style>