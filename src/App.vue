<template>
  <div id="app">
    <router-view/>
    <welcome></welcome>
    <music-player></music-player>
  </div>
</template>

<script>
import Welcome from '@/views/welcome';
import MusicPlayer from '@/views/music-player';

export default {
  components: { Welcome, MusicPlayer },

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
