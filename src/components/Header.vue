<template>
  <nav class="bg-gray-800 mb-4">
    <div class="container mx-auto py-6 px-4 text-white flex justify-between items-center">
      <div class="flex items-center">
        <router-link to="/">
          <img src="@/assets/img/adstr-logo.png" alt="Logo" class="mr-10 h-16">
        </router-link>
        <router-link v-if="user" to="/stream" class="menu-link">Stream</router-link>
        <router-link v-if="user" to="/advertise" class="menu-link">Advertise</router-link>
        <router-link to="/about" class="menu-link">About</router-link>
        <router-link v-if="isAdmin" to="/admin-panel" class="menu-link">Admin</router-link>
      </div>
      <div v-if="!user" class="flex items-center">
        <router-link to="/login" class="btn btn-login">Login</router-link>
        <router-link to="/signup" class="btn btn-signup">Sign up</router-link>
      </div>
      <div v-else class="flex items-center">
        <a v-on:click="$router.push('/profile/'+user.username)" class="menu-link">{{user.username}}</a>
        <a v-on:click="logout" class="btn btn-login cursor-pointer">Logout</a>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      error: ''
    }
  },
  computed: {
    user() {
      return this.$store.getters['auth/user']
    },
    isAdmin() {
      const groups = this.$store.getters['auth/groups']
      return groups.includes('Admin')
    }
  },
  methods: {
    async logout() {
      try {
        await this.$store.dispatch('auth/logout')
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
.menu-link {@apply px-4 py-2 mr-4 text-indigo-100 rounded-md font-semibold hover:text-white hover:bg-gray-900 transition ease-in duration-100 cursor-pointer;}
</style>