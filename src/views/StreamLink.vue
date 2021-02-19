<template>
  <div>
    <div v-if="stream">
      <div v-if="stream.verified">
        Adverts
      </div>
      <div v-else>
        <div class="verify-banner" v-bind:class="{ 'opacity-0' : !showBanner }">
          <div class="absolute bottom-0 ml-2">
            <img src="@/assets/img/adstr-logo.png" alt="Logo" class="h-28 opacity-30">
          </div>
          <div class="mb-12 text-9xl text-gray-300 verify-code">
            {{verificationToken[1]}}<br/>
            {{verificationToken[2]}}<br/>
            {{verificationToken[3]}}
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      Loading
    </div>
  </div>
</template>

<script>
import { API } from 'aws-amplify'
import { getStreamByToken } from '@/graphql/queries'
import { onUpdateStream, onDeleteStream } from '@/graphql/subscriptions'

export default {
  name: 'StreamLink',
  data() {
    return {
      subscriptions: [],
      stream: null,
      showBanner: true
    }
  },
  computed: {
    verificationToken() {
      return this.stream.verificationToken.split('-')
    }
  },
  mounted() {
    this.getStream()

    const onUpdateStreamSub = API.graphql({ query: onUpdateStream, authMode: 'AWS_IAM' }).subscribe({
      next: () => this.getStream()
    })
    this.subscriptions.push(onUpdateStreamSub)

    const onDeleteStreamSub = API.graphql({ query: onDeleteStream, authMode: 'AWS_IAM' }).subscribe({
      next: () => this.getStream()
    })
    this.subscriptions.push(onDeleteStreamSub)

    // let self = this
    // setInterval(() => {
    //   self.showBanner = !self.showBanner
    // }, 1000)
  },
  unmounted() {
    if(this.subscriptions.length) {
      this.subscriptions.forEach((subscription) => {
        subscription.unsubscribe()
      })
    }
  },
  methods: {
    async getStream() {
      try {
        const stream = await API.graphql({ query: getStreamByToken, authMode: 'AWS_IAM', variables: {
          urlToken: this.$route.params.token
        }})

        if (stream.data.getStreamByToken.items.length) {
          this.stream = stream.data.getStreamByToken.items[0]
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style>
.verify-banner {@apply h-screen w-1/2 mx-auto border-8 border-gray-300 border-opacity-30 bg-black text-white text-center items-center justify-center flex flex-col transition-opacity duration-1000;}
</style>