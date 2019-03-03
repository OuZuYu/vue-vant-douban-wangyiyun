<template>
    <div
    class="progress-bar"
    ref="progressBar"
    @touchstart.prevent="onTouchStart"
    @touchmove.prevent="onTouchMove"
    @touchend.prevent="onTouchEnd">
        <div class="bar-inner">
            <div class="progress" :style="{ width: displayPercent + '%' }" ref="progress"></div>
            <div
            ref="progressBtn"
            class="progress-btn"
            :style="{ left: displayPercent + '%' }"
            >
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        percent: {
            type: Number,
            default: 0
        }
    },

    computed: {
        displayPercent () {

            // percent 随歌曲currentTime而改变，而拖动时不改变currentTime（如果一直变会有卡带响声），只在touchend改变，所以拖动时不显示percent而是显示newPercent。
            return this.moving ? this.newPercent * 100 : this.percent * 100;
        }
    },

    data () {
        return {
            newPercent: this.percent,
            moving: false
        }
    },

    methods: {
        onTouchStart (e) {
            this.moving = false;
            let touches = e.touches[0];
            let outerBar = this.$refs.progressBar;
            let clientX = touches.clientX;
            let offsetL = outerBar.offsetLeft;
            let barWidth = outerBar.offsetWidth;
            this.newPercent = (clientX - offsetL) / barWidth;
        },

        onTouchMove (e) {
            this.moving = true;
            let touches = e.touches[0];
            let outerBar = this.$refs.progressBar;
            let clientX = touches.clientX;
            let offsetL = outerBar.offsetLeft;
            let barWidth = outerBar.offsetWidth;
            let dis = clientX - offsetL;
            this.newPercent = dis < 0 ? 0 : dis > barWidth ? 1 : (dis / barWidth);
        },

        onTouchEnd () {
            this.moving = false;
            this.$emit('touchEnd', this.newPercent);
        }
    },
}
</script>

<style lang="scss" scoped>
@import '../../scss/mixin';

$progress-height: 30px;
$progress-inner-height: 4px;

.progress-bar {
    display: flex;
    width: 100%;
    height: $progress-height;
    align-items: center;
}

.bar-inner {
    position: relative;
    width: 100%;
    height: $progress-inner-height;
    background:rgba(0,0,0,.3);

    .progress {
        width: 0;
        height: 100%;
        background: $theme-wy;
    }
}

.progress-btn {
    position: absolute;
    left: 0;
    top: -6px;
    width: 16px;
    border-radius: 50%;
    background: $theme-wy;
    box-sizing: border-box;
    border: 5px solid #f1f1f1;
    @include heightLineHeight(16px);
    text-align: center;
    border-radius: 50%;
}
</style>
