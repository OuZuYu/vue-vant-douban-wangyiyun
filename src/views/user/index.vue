<template>
    <div>
      <header class="header">
        <img class="avatar" width="100" height="100" src="../../assets/avatar.jpeg">
        <span class="name">欧企鹅</span>
      </header>

      <van-tabs swipeable  color="#42bd56" class="tab-wrap">
        <van-tab title="想看">
          <div class="list-wrap" v-if="wantSeeMovies.length">
            <verticallist :list-data="wantSeeMovies" @selectMovie="handleMovieSelect"></verticallist>
          </div>
          <div class="tip" v-else>
            <div class="tip-item">--没有想看的电影--</div>
            <div class="tip-item">--请先到电影详情中点"想看"--</div>
          </div>
        </van-tab>

        <van-tab title="看过">
          <div class="list-wrap" v-if="haveSeenMovies.length">
            <verticallist :list-data="haveSeenMovies" @selectMovie="handleMovieSelect"></verticallist>
          </div>
          <div class="tip" v-else>
            <div class="tip-item">--没有看过的电影--</div>
            <div class="tip-item">--请先到电影详情中点"看过"--</div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
</template>

<script>
import verticallist from '@/views/movie-list/components/VerticalList';
import { mapState } from 'vuex'
import showMovieDetailMixin from '@/mixins/showMovieDetail';

export default {
  components: { verticallist },

  mixins: [ showMovieDetailMixin ],

  computed: {
    ...mapState({
      wantSeeMovies: state => state.collect.wantSeeMovies,
      haveSeenMovies: state => state.collect.haveSeenMovies
    })
  },

  data() {
    return {
    };
  },

  methods: {
  }
}
</script>

<style lang="scss" scoped>
$header-height: 180px;

.header {
  display: flex;
  align-items: center;
  justify-content: center;
  height: $header-height;
  background: linear-gradient($theme, #9ad57f);

  .avatar {
    border-radius: 50%;
  }

  .name {
    font-size: 28px;
    color: #404040;
    margin-left: 20px;
  }
}

.tab-wrap {
  .list-wrap {
    position: fixed;
    top: $header-height + 60px;
    bottom: 60px;
    left: 0;
    right: 0;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .tip {
    text-align: center;
    font-size: 14px;
    color: $gray-deep;

    .tip-item {
      margin-top: 10px;
    }
  }
}
</style>
