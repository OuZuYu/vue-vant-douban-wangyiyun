<template>
  <div id="app">
    <router-view/>
    <welcome></welcome>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import welcome from '@/components/welcome';

export default {
  components: { welcome },

  data () {
    return {
    }
  },

  methods: {
    ...mapMutations({
      storeCity: 'SET_CITY'
    }),

    // 直接用百度地图api获取城市
    getCity () {
      let myCity = new BMap.LocalCity();
      myCity.get(res => {
        this.storeCity(res.name);
      })
    },

    /* 获取位置h5版
    getLocationData () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          this.setLocation(position);
        }, error => {
          this.$notify({
            message: '获取位置失败，请稍后再试！',
            duration: 2000,
            background: '#FF8C69'
          });
        });
      } else {
        this.$notify({
          message: '您的设备不支持navigator！',
          duration: 2000,
          background: '#FF8C69'
        });
      }
    },
    setLocation (position) {
      this.SaveLocation(position);
    }*/
  },

  created () {
    this.getCity();
  }
}
</script>

<style lang="scss">
</style>
