<template>
  <div class="title">Profile</div>
  <div class="mb-8">
    <b>Profile:</b> {{profile}}<br/>
    <b>Current user:</b> {{user}}<br/>
  </div>
</template>

<script>
import { API } from 'aws-amplify'
import { getProfileByOwner } from '@/graphql/queries'
import { onUpdateProfile } from '@/graphql/subscriptions'
import { updateProfile } from '@/graphql/mutations'

export default {
  name: "Profile",
  data() {
    return {
      subscriptions: [],
      profile: null
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
      const profile = await API.graphql({ query: getProfileByOwner, variables: { owner: this.$route.params.username }})

      if (profile.data.getProfileByOwner.items.length) {
        this.profile = profile.data.getProfileByOwner.items[0]
      }
    },
    async setTwitchUsername() {
      await API.graphql({ query: updateProfile, variables: {input: {
        id: this.user.attributes.sub,
        twitchUsername: this.twitchUsername
      }}})
    }
  }
}
</script>

<style>

</style>