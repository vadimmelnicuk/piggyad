<template>
  <div class="box">
    <div v-if="stream">
      <div class="stream-details padding-1">
        <span v-if="stream.platform === 'twitch'" class="mr-05"><i class="fab fa-twitch"></i></span>
        <a v-bind:href="'https://www.twitch.tv/' + stream.username" target="_blank" class="mr-05">{{stream.username}}</a>

        <span v-if="stream.online" class="tag border-green text-green">online</span>
        <span v-else class="tag border-red text-red">offline</span>

        <a v-on:click="deleteStream(stream.id)" class="button round ml-1 float-right">
          <img src="@/assets/images/cross.png">
        </a>
      </div>
      <div class="box-separator"></div>
      <div class="integration-link padding-1">
        <div class="mb-05">
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
      <div v-if="stream.verified" class="padding-1">
        Stream verified
      </div>
      <div v-else class="verification-step padding-1">
        <div class="mb-05">Please verify your streaming account</div>
        <button v-on:click="verifyStream" class="button w-100p">
          <span v-if="streamVerifying" class="mr-05 text-grey"><i class="fas fa-sync-alt fa-spin"></i></span>
          <span v-else class="mr-05 text-grey"><i class="fas fa-user-check"></i></span>
          <span v-if="streamVerifying">Verifying</span>
          <span v-else>Verify</span>
        </button>
      </div>
    </div>
    <div v-else class="link-account-step padding-1">
      <div class="mb-05">Link your Twitch account</div>
      <form v-on:submit.prevent="createStream" class="create-stream-form flex">
        <input type="text" placeholder="Username" v-model="createStreamData.username" class="username mr-1">
        <input type="submit" value="Link" class="button w-10">
      </form>
    </div>
  </div> 
</template>

<script>
import {API} from 'aws-amplify'
import {getStreamByOwner} from '@/graphql/queries'
import {deleteStream} from '@/graphql/mutations'
import {onStreamByIdResolver} from '@/graphql/subscriptions'

export default {
  name: 'Stream',
  data() {
    return {
      subscriptions: [],
      stream: null,
      streamVerifying: false,
      createStreamData: {
        username: '',
        platform: 'twitch'
      },
      domain: window.location.href,
      showIntegrationUrl: false
    }
  },
  computed: {
    user() {
      return this.$store.getters['auth/user']
    }
  },
  async mounted() {
    await this.getStream()

    this.subscriptions.push(
      API.graphql({query: onStreamByIdResolver, authMode: 'API_KEY', variables: {
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
      const stream = await API.graphql({query: getStreamByOwner, variables: {
        owner: this.user.username
      }})

      if (stream.data.getStreamByOwner.items.length) {
        this.stream = stream.data.getStreamByOwner.items[0]
      }
    },
    async createStream() {
      this.$store.dispatch('stream/createStream', this.createStreamData)
    },
    async deleteStream(id) {
      await API.graphql({query: deleteStream, variables: { input: { id: id }}})
    },
    async verifyStream() {
      this.streamVerifying = true

      try {
        const response = await API.post('streamApi', '/stream/verify', { body: {
          id: this.stream.id
        }})
        this.streamVerifying = false
        console.log(response)
      } catch (error) {
        console.log(error)
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

      //TODO: display an acknowledgement of a copy action
    }
  }
}
</script>

<style scoped>
.fa-twitch {color: #9246ff;}

.url-field {display: inline-block; height: 2.25rem; padding: 0 0.5rem; padding-top: 0.35rem; border: 1px solid #E5E7EB20; border-radius: 0.25rem; background-color: #0E1114; cursor: pointer;}
.url-field:hover {text-decoration: none;}

.create-stream-form {flex-direction: row;}
.create-stream-form .username {flex-grow: 1;}
</style>