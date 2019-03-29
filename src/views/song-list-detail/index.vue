<template>
    <transition name="slide" mode="out-in">
        <div class="song-list-detail" ref="songListDetail" v-show="visible">
            <div class="top">
                <div class="cover-bg" ref="coverBg" :style="{ 'background-image': `url(${ coverBackground })` }"></div>

                <topheader :class="{'header-bg': !changeTopStyle}" @back="hide">{{ !changeTopStyle ? '歌单' : playListData.name }}</topheader>

                <div class="list-name">{{ playListData.name }}</div>
            </div>

            <div class="list-wrap">
                <songlist :list-data="playListData.tracks" @selectSong="handleSongSelect"></songlist>
                <my-loading size="small" v-model="loading"></my-loading>
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
import { mapActions } from 'vuex'
import { throttle } from '@/utils/common';

export default {
    name: 'SongList',

    components: { topheader, songlist },

    mixins: [ populMixin ],

    props: {
        id: Number,

        coverBackground: String
    },

    computed: {
        coverBgHeight () {
            return this.$refs.coverBg.offsetHeight;
        }
    },

    data () {
        return {
            playListData: {},
            loading: false,
            changeTopStyle: false,
            songPlayComp: null
        }
    },

    methods: {
        ...mapActions([
            'SetTracks',
            'SetSongIndex',
            'ChangeIsFullScreen'
        ]),

        init () {
            this.playListData = {};
            this.$refs.songListDetail.scrollTop = 0;
            this.getPlayList(this.id)
        },

        handleSongSelect (index, item) {
            this.SetTracks(this.playListData.tracks);
            this.SetSongIndex(index);

            // 渲染全屏版的播放器
            this.ChangeIsFullScreen(true);
        },

        getPlayList (id) {
            this.loading = true;
            return getPlayList(id).then(val => {
                if (val.code === 200) {
                    this.playListData = setSongData(val.playlist);
                    this.loading = false;
                }
            })
        }
    },

    mounted() {
        this.$refs.songListDetail.addEventListener('scroll', throttle(() => {
            this.changeTopStyle = this.$refs.songListDetail.scrollTop > this.coverBgHeight - 50;
        }, 200), { passive: true })
    }
}
</script>

<style lang="scss" scoped>
@import '../../scss/mixin';
$top-height: 270px;

.slide-enter-active, .slide-leave-active {
    transition: transform .2s;
}

.slide-enter, .slide-leave-to {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
}

.song-list-detail {
    @include fixedLayout;
    z-index: 100;
}

.top {
    position: relative;
    height: $top-height;

    .cover-bg {
        z-index: 1;
        opacity: .8;
        position: relative;
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: 0 30%;

        &:after {
            content: ' ';
            z-index: 1;
            @include absoluteLayout;
            background-color: rgba(0,0,0,.3);
        }
    }

    .header-bg {
        background-color: transparent;
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
    margin-top: -10px;
    background: $white;
    border-radius: 12px 12px 0 0;
}
</style>

