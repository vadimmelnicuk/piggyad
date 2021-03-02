<template>
  <div class="title">Admin Panel</div>
  <div>
    <div class="title">Add a secret</div>
    <form v-on:submit.prevent="addSecret">
      <input type="text" placeholder="Name" v-model="secret.name">
      <input type="text" placeholder="Key" v-model="secret.key">
      <input type="submit" value="Add">
    </form>
  </div>
  <div>
    <div class="title">List of secrets</div>
    <div v-for="secret in secrets" v-bind:key="secret.id">
      {{secret.name}} : {{secret.key}}
      <a v-on:click="deleteSecret(secret.id)">x</a>
    </div>
  </div>
</template>

<script>
import { API } from 'aws-amplify'
import { listSecrets, getSecretByName } from '@/graphql/queries'
import { createSecret, deleteSecret } from '@/graphql/mutations'
import { onCreateSecret, onDeleteSecret } from '@/graphql/subscriptions'

export default {
  name: "AdminPanel",
  data() {
    return {
      subscriptions: [],
      secrets: [],
      secret: {
        name: '',
        key: ''
      }
    }
  },
  mounted() {
    this.getSecrets()

    const onCreateSecretSub = API.graphql({ query: onCreateSecret }).subscribe({
      next: () => this.getSecrets()
    })
    this.subscriptions.push(onCreateSecretSub)

    const onDeleteSecretSub = API.graphql({ query: onDeleteSecret }).subscribe({
      next: () => this.getSecrets()
    })
    this.subscriptions.push(onDeleteSecretSub)
  },
  unmounted() {
    if(this.subscriptions.length) {
      this.subscriptions.forEach((subscription) => {
        subscription.unsubscribe()
      })
    }
  },
  methods: {
    async getSecrets() {
      const secrets = await API.graphql({ query: listSecrets })
      this.secrets = secrets.data.listSecrets.items
    },
    async addSecret() {
      const secret = await API.graphql({ query: getSecretByName, variables: {
        name: this.secret.name
      }})

      if (secret.data.getSecretByName.items.length == 0) {
        await API.graphql({ query: createSecret, variables: { input: {
          name: this.secret.name,
          key: this.secret.key
        }}})
      }
    },
    async deleteSecret(id) {
      await API.graphql({ query: deleteSecret, variables: { input: {
        id: id
      }}})
    }
  }
}
</script>

<style scoped>

</style>