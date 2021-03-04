<template>
  <div class="box mb-2 padding-1">
    <form v-on:submit.prevent="createAdvert" class="w-100p flex file-upload-form">
      <input type="text" placeholder="Title" maxlength="50" v-model="advert.title" class="mr-1">
      <ul class="file-type flex mr-1">
        <li class="text-grey" v-bind:class="{active : advert.type === 'image'}" v-on:click="setFileType('image')">
          <i class="fas fa-image"></i>
          Image
        </li>
        <li class="text-grey" v-bind:class="{active : advert.type === 'video'}" v-on:click="setFileType('video')">
          <i class="fas fa-video"></i>
          Video
        </li>
      </ul>
      <label for="file-upload" class="file-upload mr-1">
        <span class="mr-05 text-grey"><i class="fas fa-cloud-upload-alt"></i></span>
        <span v-if="advert.asset">{{advert.asset.name}}</span>
        <span v-else>Choose file</span>
      </label>
      <input id="file-upload" ref="file-upload" type="file" accept="image/*" placeholder="File" v-on:change="onFileChange">
      <input type="submit" value="Upload" class="button">
    </form>
  </div>
  <div v-for="(item, index) in adverts" v-bind:key="item.id" class="advert box mb-2 padding-1 flex">
    <div v-if="item.asset" class="mr-1">
      <img v-if="item.type === 'image'" v-bind:src="item.asset.url">
      <video v-else-if="item.type === 'video'" controls muted v-bind:key="item.asset.url" v-on:click="toggleVideoPlayback">
        <source v-bind:src="item.asset.url" type="video/mp4">
      </video>
    </div>
    <div class="w-100p controls">
      <a v-on:click="deleteAdvert(item.id)" class="button round delete-button">
        <img src="@/assets/images/cross.png">
      </a>
      <div class="title">{{item.title}}</div>
      <div class="mt-1">
        <label class="toggle-switch mr-05">
          <input type="checkbox" v-model="item.status" true-value="ACTIVE" false-value="INACTIVE">
          <span class="slider"></span>
        </label>
        <span class="text-grey">Activate campaign</span>
      </div>
      <div class="mt-1">
        {{formatImpressions(item.impressions)}} <span class="text-grey">Maximum impressions / hour</span>
        <span class="float-right">
          £{{formatCost(item.impressions * cpm / 1000)}}
          <span class="text-grey">/ hour</span>
        </span>
        <input type="range" v-bind:min="impressionsMin" v-bind:max="impressionsMax" step="1000" v-model="item.impressions" class="slider w-100p">
      </div>
      <button class="button save-button w-100p" v-on:click="updateAdvert(index)">
        <span class="text-grey"><i class="fas fa-save"></i></span>
        Save
      </button>
    </div>
  </div>
</template>

<script>
import {API, Storage} from 'aws-amplify'
import {getAdvertsByOwner} from '@/graphql/queries'
import {onCreateAdvert, onDeleteAdvert} from '@/graphql/subscriptions'

export default {
  name: "Advertise",
  data() {
    return {
      subscriptions: [],
      advert: {
        title: '',
        type: 'image',
        asset: null
      },
      adverts: []
    }
  },
  computed: {
    user() {
      return this.$store.getters['auth/user']
    },
    cpm() {
      return this.$store.getters['advert/cpm']
    },
    impressionsMin() {
      return this.$store.getters['advert/impressionsMin']
    },
    impressionsMax() {
      return this.$store.getters['advert/impressionsMax']
    }
  },
  mounted() { 
    this.getAdverts()
    
    this.subscriptions.push(
      API.graphql({query: onCreateAdvert, authMode: 'API_KEY'}).subscribe({
        next: () => this.getAdverts()
      })
    )

    this.subscriptions.push(
      API.graphql({query: onDeleteAdvert, authMode: 'API_KEY'}).subscribe({
        next: () => this.getAdverts()
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
    async getAdverts() {
      try {
        const adverts = await API.graphql({query: getAdvertsByOwner, variables: {
          owner: this.user.username
        }})
        this.adverts = adverts.data.getAdvertsByOwner.items

        for (const [index, advert] of this.adverts.entries()) {
          if (advert.asset) {
            this.getAssetUrl(advert.asset.key, advert.asset.identity, index)
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    async onFileChange(event) {
      if (!event.target || !event.target.files[0]) return

      this.advert.asset = event.target.files[0]
    },
    async getAssetUrl(key, identity, index) {
      try {
        const url = await Storage.get(key, {
          level: 'protected',
          identityId: identity
        })

        this.adverts[index].asset.url = url
      } catch (error) {
        console.log(error)
        return null
      }
    },
    createAdvert() {
      this.$store.dispatch('advert/createAdvert', this.advert)
    },
    deleteAdvert(id) {
      this.$store.dispatch('advert/deleteAdvert', id)
    },
    updateAdvert(index) {
      this.$store.dispatch('advert/updateAdvert', this.adverts[index])
    },
    setFileType(type) {
      let file = this.$refs['file-upload']
      this.advert.type = type

      if (type === 'image') {
        file.accept = 'image/jpeg, image/png'
      } else if (type === 'video') {
        file.accept = 'video/mp4'
      }
    },
    toggleVideoPlayback(event) {
      event.target.play()
    },
    formatCost(value) {
      let newValue = value.toFixed(2)
      return newValue
    },
    formatImpressions(value) {
      var newValue = new Intl.NumberFormat()
      return newValue.format(value)
    }
  }
}
</script>

<style scoped>
.file-type {flex-direction: row; background-color: #0E1114; border: 1px solid #E5E7EB20; border-radius: 0.25rem;}
.file-type li {display: inline-block; padding-top: 0.35rem; flex-grow: 1; text-align: center; cursor: pointer; transition: background-color 0.3s ease;}
.file-type li.active {color: #E5E7EB; background-color: #DBEAFE10; border-radius: 0.2rem;}

.file-upload-form {flex-direction: row; align-items: stretch;}
.file-upload-form * {flex-grow: 1;}

.advert {flex-direction: row;}
.advert img {max-width: 250px;}
.advert video {max-width: 250px;}
.advert .controls {position: relative;}
.advert .controls .delete-button {position: absolute; top: 0; right: 0;}
.advert .controls .save-button {position: absolute; bottom: 0; right: 0;}
</style>