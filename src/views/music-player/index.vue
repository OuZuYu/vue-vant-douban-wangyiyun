<template>
    <div v-if="curSong" class="player">
        <transition name="fade">
            <div v-show="isFullScreen" class="fullscreen-player">
                <div class="music-play-bg" :style="{ 'background-image': `url(${ curSong.album && curSong.album.picUrl })`}"></div>

                <header ref="coverBg" class="header">
                    <i class="iconfont icon-icon-arrow-bottom2" @click="setFullscreen(false)"></i>

                    <div class="song-info">
                        <span class="name">{{ curSong.name }}</span>
                        <span class="singer">
                            <span v-for="item in curSong.artists" class="singer-item" :key="item.id">{{ item.name }}</span>
                        </span>
                    </div>
                </header>

                <div class="song-img-wrap">
                    <div class="img-frame">
                        <img class="img" ref="rotateImg" :class="{ rotate: playing, 'pause-rotate': isPause }" width="100%" height="100%" v-lazy="curSong.album && curSong.album.picUrl">
                    </div>
                </div>

                <div class="control-wrap">
                    <div class="play-tip" v-show="songLoading">{{ songLoadingText }}</div>
                    <div class="song-progress">
                        <span class="cur-time">{{ formatTime(currentTime) }}</span>
                        <progressbar class="progress-bar" :percent="percent" @touchEnd="handleProgressTouchEnd"></progressbar>
                        <span class="song-during">{{ formatTime(duration) }}</span>
                    </div>
                    <div class="btns-wrap">
                        <i class="iconfont" :class="{
                            'icon-xunhuanbofang': playType === LIST_LOOP,
                            'icon-danquxunhuan': playType === SINGLE,
                            'icon-suijibofang': playType === RANDOM
                        }" @click="changePlayType"></i>

                        <i class="iconfont bigger-icon icon-shangyiqu" @click="changeTrack('prev')"></i>

                        <i class="iconfont bigger-icon" :class="{ 'icon-ai07': !isPause, 'icon-bofang': isPause }" @click="playAndPause"></i>

                        <i class="iconfont bigger-icon icon-xiayiqu" @click="changeTrack('next')"></i>

                        <i class="iconfont icon-caidan" @click="$toast('开发中...');"></i>
                    </div>
                </div>
            </div>
        </transition>

        <transition name="fade">
        <div v-show="!isFullScreen" class="mini-player-wrap" v-drag>
            <div class="song-info" @click="setFullscreen(true)">
                <span class="name">{{ curSong.name }}</span>
                <span class="singer">
                    <span v-for="item in curSong.artists" class="singer-item" :key="item.id">{{ item.name }}</span>
                </span>
            </div>
            <div class="mini-btns">
                <i class="iconfont" :class="{ 'icon-ai07': !isPause, 'icon-bofang': isPause }" @click="playAndPause"></i>
            </div>
        </div>
        </transition>

        <audio
            ref="audio"
            :src="songSrc"
            autoplay
            @loadstart="onLoadStart"
            @canplay="onCanplay"
            @ended="onEnd"
            @error="onError"
            @timeupdate="onTimeUpdate">
        </audio>
    </div>
</template>

<script>
import populMixin from '@/mixins/popup';
import progressbar from '@/components/progress';
import { getMusicUrl } from '@/api/wangyi';
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';

export default {
    name: 'MusicPlay',

    mixins: [ populMixin ],

    components: { progressbar },

    computed: {
        ...mapGetters([
            'curSong',
        ]),

        isFullScreen () {
            return this.$store.state.song.isFullscreen;
        },

        songSrc () {
            if (this.curSong) {
            return `https://music.163.com/song/media/outer/url?id=${this.curSong.id}`;
            }
        },

        percent () {
            return this.currentTime / this.duration;
        }
    },

    watch: {

    },

    data () {
        return {
            songLoading: false,
            songLoadingText: '加载中...',
            playing: false,
            isPause: true,
            playType: 0,
            LIST_LOOP: 0, // 列表循环常量
            SINGLE: 1, // 单曲循环常量
            RANDOM: 2, // 随机播放常量
            currentTime: 0,
            duration: 0
        }
    },

    methods: {
        ...mapActions([
            'ChangeTrack',
            'ChangeIsFullScreen'
        ]),

        handleProgressTouchEnd (percent) {
            this.$refs.audio.currentTime = this.duration * percent;
        },

        setFullscreen (isFull) {
            this.ChangeIsFullScreen(isFull);
        },

        formatTime (interval) {
            interval = interval | 0
            let minute = interval / 60 | 0
            let second = interval % 60
            if (second < 10) {
                second = '0' + second
            }
            return minute + ':' + second
        },

        playAndPause () {
            let audio = this.$refs.audio;
            if (this.isPause) {
                audio.play();
                if(audio.readyState === 0) {
                    this.$toast('歌曲加载失败!');
                }
            } else {
                this.$refs.audio.pause();
            }
            this.isPause = !this.isPause;
        },

        changePlayType () {
            let type = ++this.playType;
            this.playType = type === 3 ? 0 : type;
        },

        // 切换歌曲 type：下一曲或上一曲
        changeTrack (type) {
            this.ChangeTrack({
                direction: type,
                random: this.playType === this.RANDOM
            });
        },

        showTip (text = "加载中...") {
            this.songLoading = true;
            this.songLoadingText = text;
        },

        onLoadStart () {
            this.showTip('加载中...');
        },

        onCanplay (e) {
            console.log(1231123)
            this.songLoading = false;
            this.playing = true;
            this.isPause = false;
            this.duration = e.target.duration;
        },

        onEnd () {
            this.changeTrack('next');
        },

        onError () {
            this.$toast('歌曲加载错误!');
            this.showTip('歌曲加载错误');
        },

        onTimeUpdate (e) {
            this.currentTime = e.target.currentTime
        }
    },

    mounted() {
    }
}
</script>

<style lang="scss" scoped>
@import '../../scss/mixin';

.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}

.fullscreen-player {
    z-index: 200;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: #fff;
}

.music-play-bg {
    z-index: -1;
    opacity: .6;
    @include absoluteLayout;
    background-size: cover;
    filter: blur(30px);

    &:after {
        content: ' ';
        @include absoluteLayout;
        background-color: rgba(0, 0, 0, .5);
    }
}

.header {
    display: flex;

    .iconfont {
        display: inline-block;
        width: 60px;
        @include heightLineHeight(50px);
        text-align: center;
        color: #fff;
        font-size: 18px;
    }
}

.song-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 7px 0 7px 16px;
    color: #fff;

    .name {
        font-size: 18px;
    }

    .singer {
        color: $gray-light;

        .singer-item {
            margin-right: 6px;
        }
    }
}

.song-img-wrap {
    @include absoluteLayout(80px, 0, 170px, 0);

    .img-frame {
        @include absoluteLayout(50%, 0, 0, 50%);
        transform: translate3d(-50%, -50%, 0);
        display: flex;
        justify-content: center;
        align-items: center;
        width: 288px;
        height: 288px;
        background: rgba(150, 147, 145, .3);
        border-radius: 50%;

        .img {
            max-width: 90%;
            max-height: 90%;
            border-radius: 50%;

            &.rotate {
                animation: rotate 20s linear infinite;
            }

            &.pause-rotate {
                animation-play-state: paused;
            }
        }
    }
}

.control-wrap {
    position: absolute;
    bottom: 60px;
    left: 0;
    right: 0;

    .play-tip {
        font-size: 14px;
        color: #fff;
        text-align: center;
    }

    .song-progress {
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 0 24px;
        color: #fff;

        .progress-bar {
            margin: 0 20px;
        }
    }

    .btns-wrap {
        display: flex;
        justify-content: space-around;
        margin-top: 10px;

        .iconfont {
            font-size: 30px;
            color: #d6d6d6;

            &.bigger-icon {
                font-size: 32px;
            }
        }
    }
}

.mini-player-wrap {
    display: flex;
    z-index: 200;
    position: fixed;
    bottom: 60px;
    right: 0;
    height: 50px;
    width: 70%;
    background: rgba(0, 0, 0, .8);
    border-radius: 4px;

    .song-info {
        flex: 1;
        white-space: nowrap;
        overflow: hidden;
    }

    .mini-btns {
        flex: 0 0 50px;

        .iconfont {
            display: inline-block;
            width: 100%;
            @include heightLineHeight(50px);
            text-align: center;
            color: #fff;
            font-size: 18px;
        }
    }
}
</style>
