<template>
  <div class="stream-link">
    <div v-if="stream">
      <div v-if="stream.verified">
        <div class="advert">Advert</div>
      </div>
      <div v-else class="verify-banner" v-bind:class="{'active' : showBanner}">
        <img src="@/assets/images/logo.png" alt="Logo" class="logo">
        <div class="code">
          {{verificationToken[1]}}<br/>
          {{verificationToken[2]}}<br/>
          {{verificationToken[3]}}
        </div>
      </div>
    </div>
    <div v-else>
      Loading
    </div>
  </div>
</template>

<script>
import {API} from 'aws-amplify'
import {getStreamByToken} from '@/graphql/queries'
import {onUpdateStreamById} from '@/graphql/subscriptions'

export default {
  name: 'StreamLink',
  data() {
    return {
      subscriptions: [],
      stream: null,
      advertJob: null
    }
  },
  computed: {
    getStreamLinkWidth() {
      let height = window.innerHeight
      return height / 16 * 9
    },
    verificationToken() {
      return this.stream.verificationToken.split('-')
    }
  },
  async mounted() {
    await this.getStream()

    this.subscriptions.push(
      API.graphql({query: onUpdateStreamById, variables: {
        id: this.stream.id
      }}).subscribe({
        next: () => this.getStream()
      })
    )
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
        const stream = await API.graphql({query: getStreamByToken, authMode: 'AWS_IAM', variables: {
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

<style scoped>
.stream-link {height: 100vh; width: 56.25vh; margin: 0 auto;}

.advert {position: relative; height: 100vh; width: 100%; border: 2vh solid #6B7280; background-color: #181C21; font-size: 10vh; font-weight: 600; text-align: center;}

.verify-banner {position: relative; height: 100vh; width: 100%; border: 2vh solid #6B7280; background-color: #181C21;}
.verify-banner .logo {position: absolute; bottom: 2%; width: 60%; left: 50%; transform: translateX(-50%); opacity: 0.9;}
.verify-banner .code {margin-top: 3vh; font-size: 18vh; font-weight: 600; text-align: center;}
</style>