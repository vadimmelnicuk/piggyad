<template>
  <div class="home">
    Home
  </div>
  Authors
  <div v-for="author in authors" :key="author.id">
    {{author.firstName}} {{author.lastName}}
  </div>
</template>

<script>
import { DataStore } from '@aws-amplify/datastore'
import { Authors } from '@/models'

export default {
  name: 'Home',
  data() {
    return {
      authorsSubscription: null,
      authors: []
    }
  },
  mounted() {
    this.getAuthors()
    this.authorsSubscription = DataStore.observe(Authors).subscribe(() => {
      this.getAuthors()
    })
  },
  unmounted() {
    if(this.authorsSubscription) {
      this.authorsSubscription.unsubscribe()
      console.log('unsubscribed')
    }
  },
  methods: {
    async getAuthors() {
      this.authors = await DataStore.query(Authors);
    }
  }
}
</script>
