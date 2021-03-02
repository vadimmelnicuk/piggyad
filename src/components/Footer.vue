<template>
  <div class="container footer">
    <div class="border">
      © {{year}} Piggyad Limited
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'Footer',
  data() {
    return {
      year: moment().format('YYYY')
    }
  }
}
</script>

<style scoped>
.footer {color: #E5E7EB60; font-size: 0.8rem;}
.border {padding: 2rem 0; margin-top: 2rem; border-top: 1px solid #E5E7EB20;}
</style>