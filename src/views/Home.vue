<template>
  <div class="title">
    Add new note
  </div>
  <form v-on:submit.prevent="createNote" class="w-full flex">
    <input type="text" placeholder="Body" v-model="note.body">
    <input type="submit" value="Create" class="ml-2 w-32">
  </form>
  <div class="title">
    Notes
  </div>
  <div v-for="note in notes" v-bind:key="note.id">
    {{note.body}} - 
    <a v-on:click="$router.push('/profile/'+note.owner)" class="cursor-pointer">{{note.owner}}</a>
    <a v-on:click="deleteNote(note.id)" class="ml-2 px-2 bg-gray-100 border cursor-pointer">x</a>
  </div>
</template>

<script>
import { DataStore } from '@aws-amplify/datastore'
import { Notes } from '@/models'

export default {
  name: 'Home',
  data() {
    return {
      subscriptions: [],
      notes: [],
      note: {
        body: ""
      }
    }
  },
  mounted() { 
    this.getNotes()
    const subscription = DataStore.observe(Notes).subscribe(() => {
      this.getNotes()
    })
    this.subscriptions.push(subscription)
  },
  unmounted() {
    if(this.subscriptions.length > 0) {
      this.subscriptions.forEach((subscription) => {
        subscription.unsubscribe()
      })
    }
  },
  methods: {
    async getNotes() {
        this.notes = await DataStore.query(Notes)
    },
    async createNote() {
      await DataStore.save(
        new Notes({
          body: this.note.body
        })
      )
    },
    async deleteNote(id) {
      const note = await DataStore.query(Notes, id)
      DataStore.delete(note)
    }
  }
}
</script>
