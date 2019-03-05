<template>
    <div class="welcome" v-if="isWelcomeShow">
        <van-tag class="close-welcome-btn" round @click.native="hideWelcome" size="large">跳过 {{ second }}</van-tag>
        <h3 class="title">welcome</h3>

        <div class="date">{{ currentDate }}</div>
        <div class="location">您位于：{{ myCity }}</div>
        <div class="logo-wrap">
            <img class="logo" src="../../assets/douban-logo.png" alt="logo">
            <img class="logo" src="../../assets/wangyi-logo.gif" alt="logo">
        </div>
    </div>
</template>

<script>
import locationMixin from '@/mixins/location'; // 定位相关代码

export default {
    mixins: [ locationMixin ],

    computed: {
        currentDate () {
            let date = new Date,
                y = date.getFullYear(),
                m = date.getMonth() + 1,
                d = date.getDate(),
                h = date.getHours(),
                M = date.getMinutes(),
                s = date.getSeconds();
            return `${y}年${m}月${d}日 ${h}:${M}:${s}`;
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
        this.GetCity();
        this.autoHideWelcome();
    }
}
</script>

<style lang="scss" scoped>
.welcome {
    z-index: 10001;
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
        margin: 40px 0;
        font-size: 50px;
        color: $theme;
    }
}

.date, .location {
    margin-top: 40px;
    font-size: 18px;
    color: $theme;
}

.logo-wrap {
    width: 100%;
    position: fixed;
    bottom: 20px;

    .logo {
        max-width: 77px;
        max-width: 77px;
        margin-right: 10px;
    }
}
</style>
