<template>
    <div class="welcome" v-if="isWelcomeShow">
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
            console.log(this.second)
            return this.second !== 0;
        }
    },

    data () {
        return {
            second: 3
        }
    },

    methods: {
        autoHideWelcome () {
            let timer = setInterval(() => {
                if (this.second === 0) {
                    clearInterval(timer);
                    return;
                }
                this.second--;
            }, 1000);
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

    .title {
        margin: 120px 0;
        font-size: 50px;
        color: #42bd56;
    }
}

.emoji {
    font-size: 100px;
    color: #42bd56;

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
        background: #42bd56;
        margin: 4px auto 0;
    }
}

.date, .location {
    margin-top: 40px;
    font-size: 30px;
    color: #42bd56;
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
