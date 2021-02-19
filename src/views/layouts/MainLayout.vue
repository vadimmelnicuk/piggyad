<template>
  <Header/>
  <div class="container mx-auto px-4">
    <router-view/>
  </div>
</template>

<script>
import Header from "@/components/Header.vue"

export default {
  name: "App",
  components: { Header }
}
</script>