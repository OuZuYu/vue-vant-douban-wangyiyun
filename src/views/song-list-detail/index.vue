<template>
    <transition name="slide">
        <div class="song-list-detail" ref="songListDetail" @scroll="handleListScroll" v-loading="loading" v-show="visible">
            <div class="top">
                <div class="cover-bg" ref="coverBg" :style="{ 'background-image': `url(${ songListImg })` }"></div>

                <topheader :class="{'header-bg': !changeTopStyle}" @back="hide">{{ !changeTopStyle ? '歌单' : playListData.name }}</topheader>

                <img class="top-img" v-lazy="songListImg" width="130" height="130">

                <div class="list-name">{{ playListData.name }}</div>
            </div>

            <div class="list-wrap">
                <songlist :list-data="playListData.tracks"></songlist>
            </div>
        </div>
    </transition>
</template>

<script>
import populMixin from '@/mixins/popup';
import { getPlayList } from '@/api/wangyi';
import topheader from '@/components/header';
import songlist from '@/components/song-list';
import { setSongData } from '@/utils/song';

export default {
    name: 'SongList',

    components: { topheader, songlist },

    mixins: [ populMixin ],

    props: {
        id: Number
    },

    computed: {
        songListImg () {
            return this.playListData.coverImgUrl;
        },

        coverBgHeight () {
            return this.$refs.coverBg.scrollHeight;
        }
    },

    data () {
        return {
            playListData: {},
            loading: false,
            changeTopStyle: false
        }
    },

    methods: {
        init () {
            this.getPlayList(this.id);
        },

        handleListScroll (e) {
            this.changeTopStyle = e.target.scrollTop > this.coverBgHeight - 50;
        },

        getPlayList (id) {
            this.loading = true;
            getPlayList(id).then(val => {
                if (val.code === 200) {
                    this.playListData = setSongData(val.playlist);
                }

                this.loading = false;
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../scss/mixin';
$top-height: 270px;

.slide-enter-active, .slide-leave-active {
  transition: transform .4s;
}

.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}

.song-list-detail {
    @include fixedLayout;
    z-index: 1000;
}

.top {
    position: relative;
    height: $top-height;

    .cover-bg {
        z-index: 1;
        position: relative;
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: 0 30%;
        filter: blur(20px);

        &:after {
            content: ' ';
            z-index: 1;
            @include absoluteLayout;
            background-color: rgba(0,0,0,.25);
        }
    }

    .header-bg {
        background-color: transparent;
    }

    .top-img {
        z-index: 2;
        @include absoluteLayout(50%, auto, auto, 50%);
        transform: translate3d(-50%, -50%, 0);
    }

    .list-name {
        z-index: 2;
        @include absoluteLayout(auto, auto, 8%, 50%);
        width: 100%;
        transform: translate3d(-50%, 0, 0);
        text-align: center;
        font-size: 16px;
        color: $white;
    }
}

.list-wrap {
    z-index: 3;
    @include absoluteLayout($top-height);
    background: $white;
    border-radius: 10px 10px 0 0;
}
</style>

