<template>
  <nav class="container">
    <div class="menu-links">
      <router-link to="/" class="mr-1">
        <img src="@/assets/images/logo.png" alt="logo" class="logo">
      </router-link>
      <!-- <router-link to="/about" class="menu-link mr-1" v-bind:class="{active : $route.name === 'About'}">About</router-link> -->
      <router-link v-if="user" to="/stream" class="menu-link mr-1" v-bind:class="{active : $route.name === 'Stream'}">Stream</router-link>
      <router-link v-if="user" to="/advertise" class="menu-link mr-1" v-bind:class="{active : $route.name === 'Advertise'}">Advertise</router-link>
      <router-link v-if="isAdmin" to="/admin-panel" class="menu-link" v-bind:class="{active : $route.name === 'Admin'}">Admin</router-link>
    </div>
    <div v-if="!user" class="auth">
      <router-link to="/login" class="button">Login</router-link>
      <!-- <router-link to="/signup" class="button">Sign up</router-link> -->
    </div>
    <div v-else class="auth">
      <a v-on:click="$router.push('/profile/'+user.username)" class="menu-link mr-1" v-bind:class="{active : $route.name === 'Profile'}">{{user.username}}</a>
      <a v-on:click="logout" title="Logout" class="button logout">
        <span class="icon text-grey"><i class="fas fa-sign-out-alt"></i></span>
      </a>
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
nav {height: 100px; display: flex; justify-content: space-between;}

.menu-links {display: flex; align-items: center;}
.logo {width: 9rem; margin-right: 2rem; cursor: pointer; opacity: 0.9;}

.menu-link {display: inline-block; height: 2.25rem; font-weight: 600; cursor: pointer; color: #E5E7EB; padding: 0 1rem; padding-top: 0.35rem; border-radius: 0.5rem; background-color: none; transition: background-color 0.2s; transition: color 0.2s;}
.menu-link.active {color: #FFFFFF; text-decoration: none; background-color: #DBEAFE10;}
.menu-link:hover {color: #FFFFFF; text-decoration: none; background-color: #DBEAFE10;}

.auth {display: flex; align-items: center;}
.logout {padding-right: 0.8rem; padding-top: 0.45rem;}
</style>