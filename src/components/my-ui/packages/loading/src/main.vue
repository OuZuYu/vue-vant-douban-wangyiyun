<template>
    <transition name="fade">
        <div
            v-show="value"
            ref="myLoading"
            class="my-loading-wrap"
            :class="[fullscreen ? 'my-loading-fullscreen' : '', {
                'black-bg': color === 'black',
                'white-bg': color === 'white'
            }]"
            :style="style">
            <div class="loading">
                <div class="lds-css ng-scope">
                    <div class="lds-spinner" :class="size">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import { getStyle } from '@/utils/dom';

const POSITION_CLASS = 'my-loading-parent';

export default {
    name: 'MyLoading',

    props: {
        value: Boolean,

        top: String,

        bottom: String,

        right: String,

        left: String,

        color: { // black white
            type: String,
            default: 'white'
        },

        size: { // small medium large
            type: String,
            default: 'small'
        },

        fullscreen: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            parent: null
        }
    },

    computed: {
        style () {
            return {
                left: this.left + 'px',
                top: this.top + 'px',
                bottom: this.bottom + 'px',
                right: this.right + 'px',
            }
        }
    },

    methods: {
        setPrentPosition () {
            let originalPosition = getStyle(this.parent, 'position');

            if (originalPosition !== 'absolute' && originalPosition !== 'fixed') {
                this.parent.classList.add(POSITION_CLASS)
            }
        }
    },

    mounted () {
        this.parent = this.$refs.myLoading.parentNode;
        this.setPrentPosition();
    },

    destroyed() {
        let classList = this.parent.classList;

        if (classList.contains(POSITION_CLASS)) {
            classList.remove(POSITION_CLASS);
        }
    },

    watch: {
        value (val) {
            if (val) {
                this.setPrentPosition();
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
@keyframes lds-spinner {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@-webkit-keyframes lds-spinner {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.lds-spinner {
  position: relative;
}
.lds-spinner div {
  left: 94px;
  top: 48px;
  position: absolute;
  -webkit-animation: lds-spinner linear 1s infinite;
  animation: lds-spinner linear 1s infinite;
  background: #399e33;
  width: 12px;
  height: 24px;
  border-radius: 40%;
  -webkit-transform-origin: 6px 52px;
  transform-origin: 6px 52px;
}
.lds-spinner div:nth-child(1) {
  -webkit-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-animation-delay: -0.916666666666667s;
  animation-delay: -0.916666666666667s;
}
.lds-spinner div:nth-child(2) {
  -webkit-transform: rotate(30deg);
  transform: rotate(30deg);
  -webkit-animation-delay: -0.833333333333333s;
  animation-delay: -0.833333333333333s;
}
.lds-spinner div:nth-child(3) {
  -webkit-transform: rotate(60deg);
  transform: rotate(60deg);
  -webkit-animation-delay: -0.75s;
  animation-delay: -0.75s;
}
.lds-spinner div:nth-child(4) {
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
  -webkit-animation-delay: -0.666666666666667s;
  animation-delay: -0.666666666666667s;
}
.lds-spinner div:nth-child(5) {
  -webkit-transform: rotate(120deg);
  transform: rotate(120deg);
  -webkit-animation-delay: -0.583333333333333s;
  animation-delay: -0.583333333333333s;
}
.lds-spinner div:nth-child(6) {
  -webkit-transform: rotate(150deg);
  transform: rotate(150deg);
  -webkit-animation-delay: -0.5s;
  animation-delay: -0.5s;
}
.lds-spinner div:nth-child(7) {
  -webkit-transform: rotate(180deg);
  transform: rotate(180deg);
  -webkit-animation-delay: -0.416666666666667s;
  animation-delay: -0.416666666666667s;
}
.lds-spinner div:nth-child(8) {
  -webkit-transform: rotate(210deg);
  transform: rotate(210deg);
  -webkit-animation-delay: -0.333333333333333s;
  animation-delay: -0.333333333333333s;
}
.lds-spinner div:nth-child(9) {
  -webkit-transform: rotate(240deg);
  transform: rotate(240deg);
  -webkit-animation-delay: -0.25s;
  animation-delay: -0.25s;
}
.lds-spinner div:nth-child(10) {
  -webkit-transform: rotate(270deg);
  transform: rotate(270deg);
  -webkit-animation-delay: -0.166666666666667s;
  animation-delay: -0.166666666666667s;
}
.lds-spinner div:nth-child(11) {
  -webkit-transform: rotate(300deg);
  transform: rotate(300deg);
  -webkit-animation-delay: -0.083333333333333s;
  animation-delay: -0.083333333333333s;
}
.lds-spinner div:nth-child(12) {
  -webkit-transform: rotate(330deg);
  transform: rotate(330deg);
  -webkit-animation-delay: 0s;
  animation-delay: 0s;
}
.lds-spinner {
    &.small {
        width: 80px !important;
        height: 80px !important;
        -webkit-transform: translate(-40px, -40px) scale(0.4) translate(40px, 40px);
        transform: translate(-40px, -40px) scale(0.4) translate(40px, 40px);
    }

    &.medium {
        width: 148px !important;
        height: 148px !important;
        -webkit-transform: translate(-74px, -74px) scale(0.74) translate(74px, 74px);
        transform: translate(-74px, -74px) scale(0.74) translate(74px, 74px);
    }

    &.large {
        width: 200px !important;
        height: 200px !important;
        -webkit-transform: translate(-100px, -100px) scale(1) translate(100px, 100px);
        transform: translate(-100px, -100px) scale(1) translate(100px, 100px);
    }
}

.my-loading-wrap {
    position: absolute;
    z-index: 10000;
    margin: 0;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    &.my-loading-fullscreen {
        position: fixed !important;
    }

    &.black-bg {
        background: rgba(0, 0, 0, .3)
    }

    &.white-bg {
        background: rgba(255, 255, 255, .9)
    }

    .loading {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center
    }
}
</style>

<style>
.my-loading-parent {
  position: relative !important;
}
</style>
