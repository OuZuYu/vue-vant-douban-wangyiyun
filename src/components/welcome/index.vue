<template>
    <div class="welcome" v-if="isWelcomeShow">
        <van-tag class="close-welcome-btn" round @click.native="hideWelcome">跳过 {{ second }}</van-tag>
        <h3 class="title">welcome</h3>

        <div class="emoji">
            <div class="eyes">
                <span class="left-eye">^</span>
                <span class="right-eye">^</span>
            </div>
            <div class="mouth"></div>
        </div>

        <div class="date">{{ currentDate }}</div>
        <div class="location">您位于：{{myCity}}</div>
        <div class="douban-logo-wrap">
            <img class="logo" src="./douban-logo.png" alt="logo">
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    computed: {
        ...mapState({
            myCity: state => state.location.myCity,
        }),

        currentDate () {
            let date = new Date,
                y = date.getFullYear(),
                m = date.getMonth() + 1,
                d = date.getDate(),
                h = date.getHours(),
                M = date.getMinutes(),
                s = date.getSeconds();
            return `${y}年${m}月${d}日 ${h}:${M}:${d}`;
        },

        isWelcomeShow () {
            return this.second !== 0;
        }
    },

    data () {
        return {
            timer: null,
            second: 3
        }
    },

    methods: {
        autoHideWelcome () {
            this.timer = setInterval(() => {
                if (this.second === 0) {
                    clearInterval(this.timer);
                    return;
                }
                this.second--;
            }, 1000);
        },

        hideWelcome () {
            clearInterval(this.timer);
            this.second = 0;
        }
    },

    created () {
        this.autoHideWelcome();
    }
}
</script>

<style lang="scss" scoped>
.welcome {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: #fff;
    text-align: center;

    .close-welcome-btn {
        position: absolute;
        right: 10px;
        top: 10px;
    }

    .title {
        margin: 120px 0;
        font-size: 50px;
        color: $theme;
    }
}

.emoji {
    font-size: 100px;
    color: $theme;

    .eyes {
        text-align: center;
        .left-eye, .right-eye {
            display: inline-block;
            width: 100px;
        }
    }

    .mouth {
        width: 40px;
        height: 6px;
        background: $theme;
        margin: 4px auto 0;
    }
}

.date, .location {
    margin-top: 40px;
    font-size: 30px;
    color: $theme;
}

.douban-logo-wrap {
    position: fixed;
    left: 50%;
    bottom: 100px;
    transform: translateX(-50%);

    .logo {
        width: 130px;
    }
}
</style>
