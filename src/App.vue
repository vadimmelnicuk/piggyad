<template>
  <router-view/>
</template>

<script>

export default {
  name: 'App',
  mounted() {
    this.$store.dispatch("auth/loginCheck")
  }
}
</script>

<style>
#app {@apply font-sans subpixel-antialiased;}

.btn {@apply inline-flex items-center px-4 py-2 rounded-md font-semibold cursor-pointer;}
.btn-login {@apply mr-4 text-indigo-100 hover:bg-gray-900 hover:text-white transition ease-in duration-100;}
.btn-signup {@apply bg-yellow-500 text-gray-800 hover:bg-gray-900 hover:text-white transition ease-in duration-100;}

.title {@apply mb-2 text-xl font-semibold;}

input {@apply block w-full h-12 border border-gray-300 placeholder-gray-500 focus:outline-none;}
input[type=text] {@apply px-3 py-2 mb-2;}
input[type=password] {@apply px-3 py-2 mb-2;}
input[type=submit] {@apply border-none hover:bg-gray-300 cursor-pointer;}
</style>
