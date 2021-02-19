<template>
  <div class="title">
    Stream
  </div>
  <div v-if="profile && profile.stream">
    <b>Your stream: </b>
    {{profile.stream.platform}} -
    {{profile.stream.username}} -
    <span v-if="profile.stream.online" class="text-green-600">online</span>
    <span v-else class="text-red-600">offline</span>
    <a v-on:click="deleteStream(profile.stream.id)" class="ml-2 px-2 bg-gray-100 border cursor-pointer">x</a>
    <div>
      <b>Integration url: </b>
      <a v-bind:href="domain + '/' + profile.stream.urlToken" target="_blank">
        {{domain}}/{{profile.stream.urlToken}}
      </a>
    </div>
    <div v-if="profile.stream.verified">
      Verified
    </div>
    <div v-else>
      <button v-on:click="verifyStream" class="btn mt-4 bg-gray-300">Verify</button>
    </div>
  </div>
  <div v-else>
    <div class="title">Link your Twitch account</div>
    <form v-on:submit.prevent="createStream" class="w-full flex">
      <input type="text" placeholder="Username" v-model="stream.username">
      <input type="submit" value="Link" class="ml-2 w-32">
    </form>
  </div>
</template>

<script>
import { API } from 'aws-amplify'
import { getProfileByOwner } from '@/graphql/queries'
import { deleteStream } from '@/graphql/mutations'
import { onUpdateProfile, onUpdateStream, onDeleteStream } from '@/graphql/subscriptions'

export default {
  name: 'Stream',
  data() {
    return {
      subscriptions: [],
      profile: null,
      stream: {
        username: '',
        platform: 'twitch'
      },
      domain: window.location.href
    }
  },
  computed: {
    user() {
      return this.$store.getters['auth/user']
    }
  },
  mounted() {
    this.getProfile()

    const onUpdateProfileSub = API.graphql({ query: onUpdateProfile }).subscribe({
      next: () => this.getProfile()
    })
    this.subscriptions.push(onUpdateProfileSub)

    const onUpdateStreamSub = API.graphql({ query: onUpdateStream }).subscribe({
      next: () => this.getProfile()
    })
    this.subscriptions.push(onUpdateStreamSub)

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
    async getStream() {
      
    },
    async createStream() {
      this.$store.dispatch('stream/createStream', this.stream)
    },
    async deleteStream(id) {
      await API.graphql({ query: deleteStream, variables: { input: { id: id }}})
    },
    async verifyStream() {
      console.log('Verify stream')

      try {
        const response = await API.post('streamApi', '/stream/verify', { body: {
          id: this.profile.stream.id
        }})
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style scoped>

</style>