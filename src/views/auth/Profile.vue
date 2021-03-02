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

    // this.subscriptions.push(
    //   API.graphql({query: onUpdateProfile, authMode: 'AMAZON_COGNITO_USER_POOLS'}).subscribe({
    //     next: () => this.getProfile()
    //   })
    // )
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
      try {
        const profile = await API.graphql({query: getProfileByOwner, variables: {
          owner: this.$route.params.username
        }})

        if (profile.data.getProfileByOwner.items.length) {
          this.profile = profile.data.getProfileByOwner.items[0]
        }
      } catch (error) {
        if (error.data.getProfileByOwner.items.length) {
          this.profile = error.data.getProfileByOwner.items[0]
        }
      }
    }
  },
  watch: {
    $route(to, from) {
      // Make sure data gets updated on params change
      if (from.name === to.name) {
        this.getProfile()
      }
    }
  }
}
</script>

<style>

</style>