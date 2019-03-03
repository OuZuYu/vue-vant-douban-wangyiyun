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

                <div class="img-lyric-wrap" @click="isLyricShow = !isLyricShow">
                    <transition name="fade">
                    <div class="img-frame" v-show="!isLyricShow">
                        <img class="img" ref="rotateImg" :class="{ rotate: playing, 'pause-rotate': isPause }" width="100%" height="100%" v-lazy="curSong.album && curSong.album.picUrl">
                    </div>
                    </transition>

                    <transition name="fade">
                    <div v-show="isLyricShow" class="lyric-wrap" ref="lyricList">
                        <div class="tip" v-if="lyricTip">{{ lyricTip }}</div>
                        <div v-else>
                            <div
                                ref="lyricItem"
                                :class="['lyric-text', {'active': activeLyricIndex === index}]"
                                v-for="(item, index) in lyricData"
                                :key="index">
                                    {{item.content}}
                            </div>
                        </div>
                    </div>
                    </transition>
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
import { getLyric } from '@/api/wangyi';
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
import { scrollTo } from '@/utils/common';
import { lrc2Json } from '@/utils/song';

const LYRIC_HEIGHT = 30; // 歌词div高度

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
        },

        lyricTip () {
            return this.lyricLoading ? '加载中...' : this.noLyric ? '暂无歌词' : '';
        }
    },

    watch: {
        // 当前歌曲改变时，加载歌词。
        curSong (val) {
            this.getLyric(val.id)
        },

        // 监听歌词高亮index变化
        activeLyricIndex (val) {
            let lyricList = this.$refs.lyricList;

            // 五行以上才开始滚动歌词，每次滚动30px（每个歌词div高度）。
            if (val > 5) {
                scrollTo(lyricList, lyricList.scrollTop, (val - 5) * LYRIC_HEIGHT, 1000);
            } else {
                scrollTo(lyricList, lyricList.scrollTop, 0, 1000);
            }
        }
    },

    data () {
        return {
            songLoading: false,
            songLoadingText: '加载中...',
            playing: false,
            isPause: true,
            playType: 0,
            LIST_LOOP: 0, // 列表循环常量
            SINGLE: 1, // 单曲循环
            RANDOM: 2, // 随机播放
            currentTime: 0,
            duration: 0,
            isLyricShow: false,
            noLyric: false,
            lyricLoading: false,
            activeLyricIndex: 0,
            lyricData: []
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
            this.songLoading = false;
            this.playing = true;
            this.isPause = false;
            this.duration = e.target.duration;
        },

        onEnd () {
            if (this.playType === this.SINGLE) {
                this.$refs.audio.currentTime = 0;
                this.$refs.audio.play();
            } else {
                this.changeTrack('next');
            }
        },

        onError () {
            this.$toast('歌曲加载错误!');
            this.showTip('歌曲加载错误');
        },

        onTimeUpdate (e) {
            this.currentTime = e.target.currentTime;
            let timeStamp = this.currentTime * 1000; // 当前毫秒
            this.activeLyricIndex = this.lyricData.findIndex((item, index) => {
                if (item.ms) {

                    // 找到 当前毫秒比此item大，比下一个item小的index。
                    return item.ms < timeStamp && this.lyricData[index + 1] ? this.lyricData[index + 1].ms > timeStamp : true
                }
            })
        },

        getLyric (id) {
            this.noLyric = false;
            this.lyricLoading = true;
            getLyric(id).then(val => {
                if (val.code === 200) {
                    this.noLyric = !val.lrc;
                    this.lyricLoading = false;

                    if (this.noLyric) return;

                    this.lyricData = lrc2Json(val.lrc.lyric); // 歌词数据处理
                }
            })
        }
    },

    mounted() {
    }
}
</script>

<style lang="scss" scoped>
@import '../../scss/mixin';

$lyric-height: 30px;

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

.img-lyric-wrap {
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

.lyric-wrap {
    width: 100%;
    height: 100%;
    overflow: auto;
    text-align: center;
    color: #d8d8d8;
    font-size: 16px;

    .lyric-text {
        @include heightLineHeight($lyric-height);

        &.active {
            color: $theme-wy;
        }
    }
}
</style>
