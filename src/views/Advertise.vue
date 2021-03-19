<template>
  <div class="box mb-2 padding-1">
    <div class="mb-1 text-grey font-15">Create a new advertising campaign</div>
    <form v-on:submit.prevent="" class="w-100p flex file-upload-form">
      <input type="text" placeholder="Campaign title" maxlength="50" v-model="advert.title" class="flex1 mr-1">
      <ul class="file-type flex1 flex mr-1">
        <li class="text-grey" v-bind:class="{active : advert.type === 'image'}" v-on:click="setFileType('image')">
          <i class="fas fa-image"></i>
          Image
        </li>
        <li class="text-grey" v-bind:class="{active : advert.type === 'video'}" v-on:click="setFileType('video')">
          <i class="fas fa-video"></i>
          Video
        </li>
      </ul>
      <label for="file-upload" class="file-upload flex1 mr-1">
        <span class="mr-05 text-grey"><i class="fas fa-cloud-upload-alt"></i></span>
        <span v-if="advert.asset">{{advert.asset.name}}</span>
        <span v-else>Choose file</span>
      </label>
      <input id="file-upload" ref="file-upload" type="file" accept="image/*" placeholder="File" v-on:change="onFileChange">
      <button class="button w-10" v-on:click="createAdvert">
        <span v-if="creatingAdvert">
          <span class="text-grey"><i class="fas fa-sync-alt fa-spin"></i></span>
          Uploading
        </span>
        <span v-else>
          <span class="text-grey"><i class="fas fa-file-import"></i></span>
          Create
        </span>
      </button>
    </form>
  </div>
  <div v-for="(item, index) in adverts" v-bind:key="item.id" class="advert box mb-2 padding-1 flex">
    <div v-if="item.asset" class="asset">
      <img v-if="item.type === 'image'" v-bind:src="item.asset.url">
      <video v-else-if="item.type === 'video'" controls muted v-bind:key="item.asset.url" v-on:click="toggleVideoPlayback">
        <source v-bind:src="item.asset.url" type="video/mp4">
      </video>
    </div>
    <div class="w-100p controls ml-15">
      <div v-if="item.status === 'ACTIVE' || item.status === 'REVIEW'" class="active-controls">
        <div class="right-controls">
          <!-- <span class="text-grey mr-05">Activate campaign</span>
          <label class="toggle-switch mr-1">
            <input type="checkbox" v-model="item.status" true-value="ACTIVE" false-value="INACTIVE">
            <span class="slider"></span>
          </label> -->
          <span v-if="item.status === 'REVIEW'" class="tag border-orange text-orange mr-05">Under review</span>
          <span v-else class="tag border-green text-green mr-05">Active</span>
          <a v-on:click="editAdvert(item.id)" title="Edit" class="button round edit-button">
            <span class="font-07"><i class="fas fa-edit"></i></span>
          </a>
        </div>
        <div class="title">{{item.title}}</div>
        <div class="mt-1 mr-2 pr-2 box-separator-right inline">
          <span class="text-grey">Total campaign impressions</span>
          <div class="font-15">
            {{formatImpressions(item.impressionsPerDay * item.duration)}}
          </div>
        </div>
        <div class="mt-1 mr-2 pr-2 box-separator-right inline">
          <span class="text-grey">Campaign duration</span>
          <div class="font-15">
            {{item.duration}} <span class="font-1">days</span>
          </div>
        </div>
        <div class="mt-1 mr-2 pr-2 box-separator-right inline">
          <span class="text-grey">Cost per day</span>
          <div class="font-15">
            ${{formatCost(item.impressionsPerDay * cpm / 1000)}}
          </div>
        </div>
        <div class="inline">
          <span class="text-grey">Total campaign budget</span>
          <div class="font-15">
            ${{formatCost(item.impressionsPerDay * item.duration * cpm / 1000)}}
          </div>
        </div>
        <div v-if="item.status === 'REVIEW'" class="activity mt-2">
          <div class="mb-1">
            <span class="text-grey">Fulfilled impressions</span> 0
            <div class="float-right mr-2">
              7 <span class="text-grey">days to go</span>
            </div>
          </div>
          <!-- {{item.impressions.count}} -->
          <img src="@/assets/images/impressions_graph_review.png">
        </div>
        <div v-else-if="item.status === 'ACTIVE'" class="activity mt-2">
          <div class="mb-1">
            <span class="text-grey">Fulfilled impressions</span> 543,000 (78%)
            <div class="float-right mr-2">
              3 <span class="text-grey">days to go</span>
            </div>
          </div>
          <img src="@/assets/images/impressions_graph_active.png">
        </div>
      </div>
      <div v-else class="inactive-controls">
        <div class="right-controls">
          <!-- <span class="text-grey mr-05">Activate campaign</span>
          <label class="toggle-switch mr-1">
            <input type="checkbox" v-model="item.status" true-value="ACTIVE" false-value="INACTIVE">
            <span class="slider"></span>
          </label> -->
          <span class="tag border-grey text-grey mr-05">Draft</span>
          <a v-on:click="deleteAdvert(item.id)" title="Delete" class="button round delete-button">
            <img src="@/assets/images/cross.png">
          </a>
        </div>
        <div class="title mb-1">{{item.title}}</div>

        <div class="flex" v-on:click="setAdvertToUpdate(index)">
          <tags-input
          class="flex1 mr-1"
          element-id="tags"
          v-model="item.languages"
          :existing-tags="twitchLanguages"
          id-field="short"
          text-field="full"
          :only-existing-tags="true"
          :typeahead="true"
          typeahead-style="dropdown"
          :typeahead-hide-discard="true"
          placeholder="Target languages">
            <template v-slot:selected-tag="{tag, index, removeTag}">
              <span v-html="tag.full"></span>
              <a href="#" class="tags-input-remove" @click.prevent="removeTag(index)">
                <i class="fas fa-times"></i>
              </a>
            </template>
          </tags-input>

          <tags-input
          class="flex1"
          element-id="tags"
          v-model="item.categories"
          :existing-tags="twitchTags"
          id-field="id"
          text-field="title"
          :only-existing-tags="true"
          :typeahead="true"
          typeahead-style="dropdown"
          :typeahead-hide-discard="true"
          placeholder="Target categories">
            <template v-slot:selected-tag="{tag, index, removeTag}">
              <span v-html="tag.title"></span>
              <a href="#" class="tags-input-remove" @click.prevent="removeTag(index)">
                <i class="fas fa-times"></i>
              </a>
            </template>
          </tags-input>
        </div>

        <div class="mt-1">
          {{formatImpressions(item.impressionsPerDay)}} <span class="text-grey">impressions per day</span>
          <span class="float-right">
            ${{formatCost(item.impressionsPerDay * cpm / 1000)}}
            <span class="text-grey">per day</span>
          </span>
          <input type="range" v-bind:min="impressionsMin" v-bind:max="impressionsMax" step="1000" v-model="item.impressionsPerDay" class="slider w-100p">
        </div>
        <div class="mt-1">
          <span class="text-grey">Duration</span>
          <span class="float-right">
            {{item.duration}} <span class="text-grey">days</span>
          </span>
          <input type="range" v-bind:min="durationMin" v-bind:max="durationMax" step="1" v-model="item.duration" class="slider w-100p">
        </div>
        <div class="mt-1 pr-2 box-separator-right inline">
          <span class="text-grey">Total campaign impressions</span>
          <div class="font-15">
            {{formatImpressions(item.impressionsPerDay * item.duration)}}
          </div>
        </div>
        <div class="ml-2 inline">
          <span class="text-grey">Total campaign budget</span>
          <div class="font-15">
            ${{formatCost(item.impressionsPerDay * item.duration * cpm / 1000)}}
          </div>
        </div>
        <div class="bottom-controls flex">
          <button class="button save-button mr-1" v-on:click="updateAdvert(index)">
            <span class="text-grey"><i class="fas fa-save"></i></span>
            Save draft
          </button>
          <button class="button blue launch-button" v-on:click="launchAdvert(index)">
            <span class="text-white"><i class="fas fa-rocket"></i></span>
            Launch
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {API} from 'aws-amplify'
import VoerroTagsInput from '@voerro/vue-tagsinput'
import {getAdvertsByOwner} from '@/graphql/queries'
import {onCreateAdvert, onDeleteAdvert} from '@/graphql/subscriptions'
import StreamMixin from '@/mixins/StreamMixin'

export default {
  name: "Advertise",
  components: {'tags-input': VoerroTagsInput},
  mixins: [StreamMixin],
  data() {
    return {
      subscriptions: [],
      advert: {
        title: '',
        type: 'image',
        asset: null
      },
      adverts: [],
      advertToUpdate: 0,
      creatingAdvert: false
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
    },
    durationMin() {
      return this.$store.getters['advert/durationMin']
    },
    durationMax() {
      return this.$store.getters['advert/durationMax']
    },
    twitchLanguages() {
      return this.$store.getters['stream/twitchLanguages']
    },
    twitchTags() {
      return this.$store.getters['stream/twitchTags']
    }
  },
  async mounted() { 
    await this.getAdverts()
    
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
          // Set asset url
          if (advert.asset) {
            const url = await this.getAssetUrl(advert.asset.key, advert.asset.identity)
            this.adverts[index].asset.url = url
          }
          // Set total impressions count
          let impressions = 0
          if (advert.impressions && advert.impressions.items.length) {
            for (const impression of advert.impressions.items) {
              impressions += impression.impressions
            }
          }
          this.adverts[index].impressions.count = impressions
        }
      } catch (error) {
        console.log(error)
      }
    },
    async processAdverts() {

    },
    async onFileChange(event) {
      if (!event.target || !event.target.files[0]) return

      this.advert.asset = event.target.files[0]
    },
    async createAdvert() {
      this.creatingAdvert = true
      const response = await this.$store.dispatch('advert/createAdvert', this.advert)

      if (response) {
        this.$store.commit('toast/add', {text: 'Successfully created an advert', type: 'success'})
      } else {
        this.$store.commit('toast/add', {text: 'Failed to create an advert', type: 'error'})
      }
      this.advert.asset = null
      this.advert.title = ''
      this.creatingAdvert = false
    },
    deleteAdvert(id) {
      this.$store.dispatch('advert/deleteAdvert', id)
    },
    editAdvert(id) {
      //TODO: implement edit
    },
    updateAdvert(index) {
      console.log(this.adverts[index])
      this.$store.dispatch('advert/updateAdvert', this.adverts[index])
    },
    launchAdvert(index) {
      this.adverts[index].status = 'REVIEW'
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
    },
    setAdvertToUpdate(index) {
      this.advertToUpdate = index
    }
  }
}
</script>

<style scoped>
.file-type {background-color: #0E1114; border: 1px solid #E5E7EB20; border-radius: 0.25rem;}
.file-type li {display: inline-block; padding-top: 0.35rem; flex-grow: 1; text-align: center; cursor: pointer; transition: background-color 0.3s ease;}
.file-type li.active {color: #E5E7EB; background-color: #DBEAFE10; border-radius: 0.2rem;}

.advert .asset {width: 250px; height: 444px;}
.advert img {max-width: 250px; max-height: 444px;}
.advert video {max-width: 250px; max-height: 444px;}
.advert .controls {position: relative;}
.advert .controls .right-controls {position: absolute; top: 0; right: 0;}
.advert .controls .bottom-controls {position: absolute; width: 100%; bottom: 0; right: 0; align-items: stretch;}
.advert .controls .bottom-controls button {flex: 1;}
.advert .controls .edit-button {line-height: 1.2rem;}
.advert .controls .edit-button span {padding-left: 0.2rem;}

.activity img {max-width: none; max-height: auto;}
</style>