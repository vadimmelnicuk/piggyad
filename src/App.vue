<template>
  <nav class="bg-gray-800 mb-4">
    <div class="container mx-auto py-6 px-4 text-white flex justify-between items-center">
      <div class="flex items-center">
        <router-link to="/">
          <img src="@/assets/img/adstr-logo.png" alt="Logo" class="mr-10 h-16">
        </router-link>
        <router-link to="/" class="menu-link">Home</router-link>
        <router-link to="/about" class="menu-link">About</router-link>
      </div>
      <div class="flex items-center">
        <router-link to="/login" class="btn btn-login">Login</router-link>
        <router-link to="/signup" class="btn btn-signup">Signup</router-link>
      </div>
      
    </div>
  </nav>
  <div class="container mx-auto px-4">
    <router-view/>
  </div>
</template>

<style>
#app {@apply font-sans subpixel-antialiased;}

.btn {@apply inline-flex items-center px-4 py-2 rounded-md font-semibold;}
.btn-login {@apply mr-4 text-indigo-100 hover:bg-gray-900 hover:text-white transition ease-in duration-100;}
.btn-signup {@apply bg-yellow-500 text-gray-800 hover:bg-gray-900 hover:text-white transition ease-in duration-100;}
</style>

<style scoped>
.menu-link {@apply px-4 py-2 mr-4 text-indigo-100 rounded-md font-semibold hover:text-white hover:bg-gray-900 transition ease-in duration-100;}
</style>
