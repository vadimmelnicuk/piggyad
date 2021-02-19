<template>
  <div class="title">Advertise</div>
  <form v-on:submit.prevent="createAdvert" class="w-full flex">
    <input type="text" placeholder="Title" v-model="advert.title">
    <input type="file" accept="image/*" placeholder="File" class="ml-2" v-on:change="onFileChange">
    <input type="submit" value="Upload" class="flex-none ml-2 w-32">
  </form>
  <div class="title mt-4">Adverts</div>
  <div v-for="advert in adverts" v-bind:key="advert.id">
    {{advert.title}}
    <div v-if="advert.asset">
      <img v-bind:src="advert.asset.url" class="w-60">
    </div>
  </div>
</template>

<script>
import { API, Storage } from 'aws-amplify'
import { listAdverts } from '@/graphql/queries'

export default {
  name: "Advertise",
  data() {
    return {
      advert: {
        title: '',
        asset: null
      },
      adverts: []
    }
  },
  async mounted() {
    await this.getAdverts()
  },
  methods: {
    async getAdverts() {
      try {
        const adverts = await API.graphql({ query: listAdverts })
        this.adverts = adverts.data.listAdverts.items

        for (const [index, advert] of this.adverts.entries()) {
          if (advert.asset) {
            this.getAssetUrl(advert.asset.key, index)
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    async createAdvert() {
      this.$store.dispatch('advert/createAdvert', this.advert)
    },
    async onFileChange(event) {
      if (!event.target || !event.target.files[0]) return

      this.advert.asset = event.target.files[0]
    },
    async getAssetUrl(key, index) {
      try {
        const url = await Storage.get(key, {
          level: 'protected'
        })

        this.adverts[index].asset.url = url
      } catch (error) {
        console.log(error)
        return null
      }
    }
  }
}
</script>

<style scoped>

</style>