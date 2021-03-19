<template>
  <div class="box">
    <div v-if="stream">
      <div class="stream-details padding-1">
        <span v-if="stream.platform === 'twitch'" class="mr-05"><i class="fab fa-twitch"></i></span>
        <a v-bind:href="'https://www.twitch.tv/' + stream.username" target="_blank" class="mr-05">{{stream.username}}</a>

        <span v-if="stream.status === 'ONLINE' || stream.status === 'OFFLINE'" class="tag border-green text-green mr-05">Verified</span>
        <span v-else class="tag border-red text-red">Unverified</span>
        <span v-if="stream.status === 'ONLINE'" class="tag border-green text-green">Online</span>
        <span v-else-if="stream.status === 'OFFLINE'" class="tag border-red text-red">Offline</span>

        <a v-on:click="deleteStream(stream.id)" class="button round ml-1 float-right">
          <img src="@/assets/images/cross.png">
        </a>
      </div>
      <div class="box-separator"></div>
      <div class="integration-link padding-1">
        <div class="mb-1 text-grey font-15">
          Integration url (keep this private)
        </div>
        <div class="url-field text-white w-100p" v-on:click="copyIntegrationUrl">
          <a class="mr-05 text-grey" v-on:click="toggleShowIntegrationUrl">
            <span v-bind:class="{hidden : showIntegrationUrl}">
              <i class="far fa-eye"></i>
            </span>
            <span v-bind:class="{hidden : !showIntegrationUrl}">
              <i class="far fa-eye-slash"></i>
            </span>
          </a>
          <span v-if="showIntegrationUrl" class="url">
            {{domain}}/{{stream.urlToken}}
          </span>
          <span v-else class="url">
            ●●●●●●●●●●●●●●●●●●●●
          </span>
          <input type="hidden" ref="integration-url" v-bind:value="domain + '/' + stream.urlToken">
          <span class="float-right text-grey">
            <i class="far fa-copy"></i>
          </span>
        </div>
      </div>
      <div v-if="stream.status === 'ONLINE' || stream.status === 'OFFLINE'" class="padding-1 mb-1">
        <div class="mb-1 text-grey font-15">
          Streaming activity
        </div>
        <div class="pt-1">
          <div class="graph inline mr-2">
            <img v-if="stream.status === 'ONLINE'" src="@/assets/images/paid_hours_online.png">
            <img v-else-if="stream.status === 'OFFLINE'" src="@/assets/images/paid_hours_offline.png">
          </div>
          <div v-if="stream.status === 'ONLINE'" class="va-top inline mt-1">
            <div class="inline mr-2 pr-2 box-separator-right">
              <div class="text-grey">Earnings (last 7 days)</div>
              <div class="font-15">$122.80</div>
            </div>
            <div class="inline mr-2">
              <div class="text-grey">Total balance</div>
              <div class="font-15">$347.30</div>
            </div>
            <div class="withdraw va-top inline">
              <button class="button">
                <span class="text-grey"><i class="far fa-credit-card"></i></span>
                Withdraw
              </button>
            </div>
            <div>
              <div class="text-grey mt-1">Average views (last 7 days)</div>
              <div class="font-15">237</div>
            </div>
          </div>
          <div v-else-if="stream.status === 'OFFLINE'" class="va-top inline mt-1">
            <div class="inline mr-2 pr-2 box-separator-right">
              <div class="text-grey">Earnings (last 7 days)</div>
              <div class="font-15">$0.00</div>
            </div>
            <div class="inline mr-2">
              <div class="text-grey">Total balance</div>
              <div class="font-15">$0.00</div>
            </div>
            <div class="withdraw va-top inline">
              <button class="button">
                <span class="text-grey"><i class="far fa-credit-card"></i></span>
                Withdraw
              </button>
            </div>
            <div>
              <div class="text-grey mt-1">Average views (last 7 days)</div>
              <div class="font-15">0</div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="verification-step padding-1">
        <div class="mb-1 text-grey font-15">Please verify your streaming account</div>
        <button v-on:click="verifyStream" class="button w-100p">
          <span v-if="streamVerifying" class="mr-05 text-grey"><i class="fas fa-sync-alt fa-spin"></i></span>
          <span v-else class="mr-05 text-grey"><i class="fas fa-user-check"></i></span>
          <span v-if="streamVerifying">Verifying</span>
          <span v-else>Verify</span>
        </button>
      </div>
    </div>
    <div v-else class="link-account-step padding-1">
      <div class="mb-1 text-grey font-15">Link your streaming account</div>
      <form v-on:submit.prevent="" class="create-stream-form flex">
        <select v-model="createStreamData.platform" class="platform mr-1" required>
          <option disabled value="">Choose platform</option>
          <option v-for="(item, index) in platforms" v-bind:key="index">{{item}}</option>
        </select>
        <input type="text" placeholder="Username" v-model="createStreamData.username" class="username mr-1">
        <button class="button w-10" v-on:click="createStream">
          <span class="text-grey"><i class="fas fa-link"></i></span>
          Link
        </button>
      </form>
    </div>
  </div> 
</template>

<script>
import {API} from 'aws-amplify'
import {getStreamByOwner} from '@/graphql/queries'
import {deleteStream} from '@/graphql/mutations'
import {onStreamResolverByOwner, onStreamByOwner} from '@/graphql/subscriptions'

export default {
  name: 'Stream',
  data() {
    return {
      subscriptions: [],
      stream: null,
      streamVerifying: false,
      createStreamData: {
        username: '',
        platform: ''
      },
      domain: window.location.href,
      showIntegrationUrl: false
    }
  },
  computed: {
    user() {
      return this.$store.getters['auth/user']
    },
    platforms() {
      return this.$store.getters['stream/platforms']
    }
  },
  async mounted() {
    await this.getStream()

    this.subscriptions.push(
      API.graphql({query: onStreamResolverByOwner, authMode: 'API_KEY', variables: {
        owner: this.user.username
      }}).subscribe({
        next: () => this.getStream()
      })
    )

    this.subscriptions.push(
      API.graphql({query: onStreamByOwner, variables: {
        owner: this.user.username
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
      const stream = await API.graphql({query: getStreamByOwner, variables: {
        owner: this.user.username
      }})

      if (stream.data.getStreamByOwner.items.length) {
        this.stream = stream.data.getStreamByOwner.items[0]
      } else {
        this.stream = null
      }
    },
    async createStream() {
      try {
        this.$store.dispatch('stream/createStream', this.createStreamData)
        this.$store.commit('toast/add', {text: 'Stream account linked', type: 'success'})
      } catch (error) {
        this.$store.commit('toast/add', {text: error})
      }
    },
    async deleteStream(id) {
      try {
        await API.graphql({query: deleteStream, variables: {input: {id: id}}})
        this.$store.commit('toast/add', {text: 'Stream account removed'})
      } catch (error) {
        this.$store.commit('toast/add', {text: error})
      }
    },
    async verifyStream() {
      this.streamVerifying = true

      const response = await API.post('streamApi', '/stream/verify', { body: {
        id: this.stream.id
      }})
      this.streamVerifying = false
      if (response.error) {
        this.$store.commit('toast/add', {text: response.error, type: 'error'})
      } else {
        this.$store.commit('toast/add', {text: 'Stream account successfully verified', type: 'success'})
      }
    },
    toggleShowIntegrationUrl() {
      // this.showUrl = false
      this.showIntegrationUrl = !this.showIntegrationUrl
    },
    copyIntegrationUrl() {
      let textToCopy = this.$refs['integration-url']

      textToCopy.setAttribute('type', 'text')
      textToCopy.select()
      document.execCommand('copy')
      textToCopy.setAttribute('type', 'hidden')

      this.$store.commit('toast/add', {text: 'Link copied to clipboard'})
    }
  }
}
</script>

<style scoped>
.fa-twitch {color: #9246ff;}

.url-field {display: inline-block; height: 2.25rem; padding: 0 0.5rem; padding-top: 0.35rem; border: 1px solid #E5E7EB20; border-radius: 0.25rem; background-color: #0E1114; cursor: pointer;}
.url-field:hover {text-decoration: none;}

.create-stream-form .platform {flex-grow: 1;}
.create-stream-form .username {flex-grow: 1;}

.withdraw {margin-top: 1.25rem;}
</style>