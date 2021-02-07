<template>
  <div class="title">
    Stream
  </div>
  <div v-if="profile && profile.stream">
    <div class="title">Your Twitch</div>
    <b>Your stream:</b>
    {{profile.stream.platform}} -
    {{profile.stream.username}} -
    <span v-if="profile.stream.online" class="text-green-600">online</span>
    <span v-else class="text-red-600">offline</span>
    <a v-on:click="deleteStream(profile.stream.id)" class="ml-2 px-2 bg-gray-100 border cursor-pointer">x</a>
  </div>
  <div v-else>
    <div class="title">Link your Twitch account</div>
    <form v-on:submit.prevent="createStream" class="w-full flex">
      <input type="text" placeholder="Username" v-model="stream.username">
      <input type="submit" value="Link" class="ml-2 w-32">
    </form>
  </div>

  <div class="mt-8">
    Varify account ownership & Integrate adverts
  </div>
  <div>
    Settings
  </div>
</template>

<script>
import { API } from 'aws-amplify'
import { getProfileByOwner } from '@/graphql/queries'
import { onUpdateProfile, onDeleteStream } from '@/graphql/subscriptions'
import { createStream, deleteStream, updateProfile } from '@/graphql/mutations'

export default {
  name: "Stream",
  data() {
    return {
      subscriptions: [],
      profile: null,
      stream: {
        username: "",
        platform: "twitch"
      }
    }
  },
  computed: {
    user() {
      return this.$store.getters["auth/user"]
    }
  },
  mounted() {
    this.getProfile()

    const onUpdateProfileSub = API.graphql({ query: onUpdateProfile }).subscribe({
      next: () => this.getProfile()
    })
    this.subscriptions.push(onUpdateProfileSub)

    const onDeleteStreamSub = API.graphql({ query: onDeleteStream }).subscribe({
      next: () => this.getProfile()
    })
    this.subscriptions.push(onDeleteStreamSub)
  },
  unmounted() {
    if(this.subscriptions.length) {
      this.subscriptions.forEach((subscription) => {
        subscription.unsubscribe()
      })
    }
  },
  methods: {
    async getProfile() {
      const profile = await API.graphql({ query: getProfileByOwner, variables: { owner: this.user.username }})

      if (profile.data.getProfileByOwner.items.length) {
        this.profile = profile.data.getProfileByOwner.items[0]
      }
    },
    async createStream() {
      const stream = await API.graphql({ query: createStream, variables: { input: {
        username: this.stream.username,
        platform: this.stream.platform,
        varified: false,
        online: false
      }}})

      await API.graphql({ query: updateProfile, variables: { input: {
        id: this.profile.id,
        profileStreamId: stream.data.createStream.id
      }}})
    },
    async deleteStream(id) {
      await API.graphql({ query: deleteStream, variables: { input: { id: id }}})
    }
  }
}
</script>

<style scoped>

</style>