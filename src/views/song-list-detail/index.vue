<template>
    <transition name="slide">
        <div class="song-list-detail" ref="songListDetail" @scroll="handleListScroll" v-show="visible" @transitionend="handleTransitionEnd">
            <div class="top">
                <div class="cover-bg" ref="coverBg" :style="{ 'background-image': `url(${ coverBackground })` }"></div>

                <topheader :class="{'header-bg': !changeTopStyle}" @back="hide">{{ !changeTopStyle ? '歌单' : playListData.name }}</topheader>

                <img class="top-img" v-lazy="coverBackground" width="130" height="130">

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

        // 过度完成再获取数据，因为如果在过度过程中就获取完了数据，那么过度的过程在手机上实测会卡顿。
        handleTransitionEnd () {
            this.getPlayList(this.id);
        },

        init () {
            this.playListData = {};
            this.$refs.songListDetail.scrollTop = 0;
        },

        handleSongSelect (index, item) {
            this.SetTracks(this.playListData.tracks);
            this.SetSongIndex(index);

            // 渲染全屏版的播放器
            this.ChangeIsFullScreen(true);
        },

        handleListScroll (e) {
            this.changeTopStyle = e.target.scrollTop > this.coverBgHeight - 50;
        },

        getPlayList (id) {
            this.loading = true;
            return getPlayList(id).then(val => {
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

// .slide-enter-active, .slide-leave-active {
//     transition: transform .2s;
// }

.slide-enter, .slide-leave-to {
    transform: translate3d(100%, 0, 0);
}

.song-list-detail {
    @include fixedLayout;
    z-index: 100;
    transition: transform .2s;
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
        border-radius: 4px;
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

