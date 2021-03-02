<template>
  <div class="main-layout">
    <header>
      <Header/>
    </header>
    <div class="container mt-2">
      <router-view/>
    </div>
    <footer>
      <Footer/>
    </footer>
  </div>
</template>

<script>
import Header from "@/components/Header.vue"
import Footer from "@/components/Footer.vue"

export default {
  name: "App",
  components: {Header, Footer},
  beforeCreate() {
    document.body.style.backgroundColor = '#0E1114'
  }
}
</script>

<style scoped>
header {background-color: #181C21;}
.main-layout {}
</style>