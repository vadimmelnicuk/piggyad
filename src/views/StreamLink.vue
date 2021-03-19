<template>
  <div class="stream-link">
    <div v-if="stream">
      <div v-if="stream.status === 'ONLINE' || stream.status === 'OFFLINE'">
        <transition name="fade">
          <div v-if="advertJobToShow" class="advert">
            <img
            v-if="advertJobToShow.advert.type === 'image'"
            v-bind:src="advertJobToShow.advert.asset.url">
            <video
            v-else-if="advertJobToShow.advert.type === 'video'"
            autoplay
            muted
            v-bind:key="advertJobToShow.advert.asset.url"
            v-on:ended="videoEnded">
              <source v-bind:src="advertJobToShow.advert.asset.url" type="video/mp4">
            </video>
          </div>
        </transition>
      </div>
      <div v-else-if="stream.status === 'UNVERIFIED'" class="verify-banner">
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
import {getStreamByToken, getAdvertJobByStreamer} from '@/graphql/queries'
import {onStreamResolverByOwner, onAdvertJobResolverByStreamer} from '@/graphql/subscriptions'
import StreamMixin from '@/mixins/StreamMixin'

export default {
  name: 'StreamLink',
  mixins: [StreamMixin],
  data() {
    return {
      subscriptions: [],
      stream: null,
      advertJobs: [],
      advertJobToShow: null,
      showingAdvert: false
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
    await this.getAdvertJobs(this.stream.owner)

    if (this.stream) {
      this.subscriptions.push(
        API.graphql({query: onStreamResolverByOwner, authMode: 'API_KEY', variables: {
          owner: this.stream.owner
        }}).subscribe({
          next: () => this.getStream()
        })
      )

      this.subscriptions.push(
        API.graphql({query: onAdvertJobResolverByStreamer, authMode: 'API_KEY', variables: {
          streamer: this.stream.owner
        }}).subscribe({
          next: () => this.getAdvertJobs(this.stream.owner)
        })
      )
    }
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
        const stream = await API.graphql({query: getStreamByToken, authMode: 'API_KEY', variables: {
          urlToken: this.$route.params.token
        }})

        if (stream.data.getStreamByToken.items.length) {
          this.stream = stream.data.getStreamByToken.items[0]
        } else {
          this.stream = null
        }
      } catch (error) {
        console.log(error)
      }
    },
    async getAdvertJobs(streamer) {      
      try {
        const advertJobs = await API.graphql({query: getAdvertJobByStreamer, authMode: 'API_KEY', variables: {
          streamer: streamer
        }})

        if (advertJobs.data.getAdvertJobByStreamer.items.length) {
          this.advertJobs = advertJobs.data.getAdvertJobByStreamer.items

          for (const [index, advertJob] of this.advertJobs.entries()) {
            if (advertJob.advert.asset) {
              const url = await this.getAssetUrl(advertJob.advert.asset.key, advertJob.advert.asset.identity)
              this.advertJobs[index].advert.asset.url = url
            }
          }

          if (!this.advertJobToShow) {
            this.advertJobToShow = this.advertJobs[0]
          }
        } else {
          this.advertJobs = []
        }
      } catch (error) {
        if (error.data.getAdvertJobByStreamer.items.length) {
          this.advertJobs = error.data.getAdvertJobByStreamer.items

          for (const [index, advertJob] of this.advertJobs.entries()) {
            if (advertJob.advert.asset) {
              const url = await this.getAssetUrl(advertJob.advert.asset.key, advertJob.advert.asset.identity)
              this.advertJobs[index].advert.asset.url = url
            }
          }

          if (!this.advertJobToShow) {
            this.advertJobToShow = this.advertJobs[0]
          }
        } else {
          this.advertJobs = []
        }
      }
    },
    async videoEnded(event) {
      console.log('advert video ended')
      const advertJobId = this.advertJobToShow.id
      this.advertJobToShow = null

      try {
        const response = await API.post('streamApi', '/advert-job/fulfill', {body: {
          id: advertJobId
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
.stream-link {height: 100vh; width: 56.25vh; margin: 0 auto;}

.advert {position: relative; height: 100vh; width: 100%; font-size: 10vh; font-weight: 600; text-align: center; line-height: 100vh;}
.advert video {width: 100%;}

.verify-banner {position: relative; height: 100vh; width: 100%; border: 2vh solid #6B7280; background-color: #181C21;}
.verify-banner .logo {position: absolute; bottom: 2%; width: 60%; left: 50%; transform: translateX(-50%); opacity: 0.9;}
.verify-banner .code {margin-top: 3vh; font-size: 18vh; font-weight: 600; text-align: center;}
</style>