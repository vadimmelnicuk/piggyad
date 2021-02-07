<template>
  <div v-if="user">
    <div class="title">
      Add new note
    </div>
    <form v-on:submit.prevent="createNote" class="w-full flex">
      <input type="text" placeholder="Body" v-model="note.body">
      <input type="submit" value="Create" class="ml-2 w-32">
    </form>
  </div>
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
import { API } from 'aws-amplify'
import { listNotes } from '@/graphql/queries'
import { createNote, deleteNote } from '@/graphql/mutations'
import { onCreateNote, onDeleteNote } from '@/graphql/subscriptions'

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
    const createNoteSub = API.graphql({ query: onCreateNote, authMode: 'AWS_IAM' }).subscribe({
      next: () => this.getNotes()
    })
    this.subscriptions.push(createNoteSub)

    const deleteNoteSub = API.graphql({ query: onDeleteNote, authMode: 'AWS_IAM' }).subscribe({
      next: () => this.getNotes()
    })
    this.subscriptions.push(deleteNoteSub)
  },
  unmounted() {
    if(this.subscriptions.length) {
      this.subscriptions.forEach((subscription) => {
        subscription.unsubscribe()
      })
    }
  },
  computed: {
    user() {
      return this.$store.getters["auth/user"]
    }
  },
  methods: {
    async getNotes() {
      const notes = await API.graphql({ query: listNotes, authMode: 'AWS_IAM' })
      this.notes = notes.data.listNotes.items
    },
    async createNote() {
      await API.graphql({ query: createNote, variables: {input: this.note}})
    },
    async deleteNote(id) {
      await API.graphql({ query: deleteNote, variables: { input: { id: id }}})
    }
  }
}
</script>
