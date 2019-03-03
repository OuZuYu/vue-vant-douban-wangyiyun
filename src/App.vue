<template>
  <div id="app">
    <router-view/>
    <welcome></welcome>
    <musicplayer></musicplayer>
  </div>
</template>

<script>
import welcome from '@/views/welcome';
import musicplayer from '@/views/music-player';

export default {
  components: { welcome, musicplayer },

  data () {
    return {
    }
  },

  created () {
  }
}
</script>

<style lang="scss">
html, body {
  width: 100%;
  height: 100%;
}
</style>
