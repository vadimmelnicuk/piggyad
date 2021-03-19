<template>
  <div class="toasts mt-1">
    <transition-group name="slide-fade">
    <div v-for="item in toasts" v-bind:key="item" class="toast mb-1" v-bind:class="{error : item.type === 'error', success : item.type === 'success'}">
      {{item.text}}
    </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  computed: {
    toasts() {
      return this.$store.getters['toast/get']
    }
  }
}
</script>

<style scoped>
.toasts {position: absolute; right: 3rem;}
.toast {display: flex; background: #181C21; width: 200px; height: auto; padding: 1rem; border-radius: 0.25rem; align-items:center; justify-content:center; text-align: center;}
.toast.error {background-color: #991B1B;}
.toast.success {background-color: #065F46;}
</style>