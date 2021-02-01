<template>
  <div class="title">
    Profile
  </div>
  <div>
    Profile: {{profile}}
  </div>
  <div>
    User: {{user}}
  </div>
</template>

<script>
export default {
  name: "Profile",
  data() {
    return {
      profile: null
    }
  },
  async mounted() {
    const profile = await this.$store.dispatch("auth/getProfile", {user: this.$route.params.id})
    console.log(profile)
  },
  computed: {
    user() {
      return this.$store.getters["auth/user"]
    }
  },
}
</script>

<style>

</style>