<template>
  <div id="app">
    <router-view/>
    <welcome></welcome>
  </div>
</template>

<script>
import welcome from '@/views/welcome';

export default {
  components: { welcome },

  data () {
    return {
    }
  },

  created () {
  }
}
</script>

<style lang="scss">
</style>
