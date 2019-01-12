<template>
    <div class="movie-list">
        <van-row class="list-header">
            <van-col span="4" class="logo-wrap">
                <img class="logo" src="../../assets/douban-logo.png" alt="logo">
            </van-col>
            <van-col span="20" class="search-wrap">
                <div class="search">电影 / 艺人</div>
            </van-col>
        </van-row>

        <div class="movie-content">
            <div v-loading="requestLoading">
                <van-cell :title="movieData.title" icon="location-o" />
                <ul class="movie-wrap">
                    <li class="movie-item" v-for="movie of movieData.subjects" :key="movie.id">
                        <img class="img" v-lazy="movie.images.small">
                        <div class="title van-ellipsis">{{ movie.title }}</div>
                        <div class="rate">
                            <van-rate :size="10" readonly class="start" v-model="movie.rating.stars / 10" />
                            <span class="text">{{ movie.rating.average }}</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { getMovie } from '@/api/douban';
import { mapState } from 'vuex'
import location from '@/mixins/location.js';


export default {
    mixins: [ location ],

    computed: {
        ...mapState({
            myCity: state => state.location.myCity,
            requestLoading: state => state.common.requestLoading
        })
    },

    data () {
        return {
            movieData: {}
        }
    },

    methods: {
        getMovie () {
            let city = this.myCity.slice(0, -1);
            getMovie(0, 1000, city).then(res => {
                this.movieData = res;
            })
        },

        init () {
            this.getCity().then(_ => {
                this.getMovie();
            });
        }
    },

    created () {
        this.init();
    }
}
</script>

<style lang="scss" scoped>
.list-header {
    height: 60px;

    %flex-wrap {
        height: 100%;
        display: flex;
        align-items: center;
    }

    .logo-wrap {
        @extend %flex-wrap;
        justify-content: center;
        .logo {
            height: 40px;
            width: 40px;
        }
    }

    .search-wrap {
        @extend %flex-wrap;
        .search {
            width: 96%;
            height: 36px;
            line-height: 36px;
            border-radius: 6px;
            text-align: center;
            background: $gray-light;
            color: #b7b7b7;
            font-size: 14px;
        }
    }
}

.movie-content {
    position: fixed;
    top: 60px;
    bottom: 60px;
    left: 0;
    right: 0;
    overflow-x: hidden;
    overflow-y: auto;
}

.movie-wrap {
    height: 200px;
    white-space: nowrap;
    overflow-y: hidden;
    overflow-x: auto;
}

.movie-item {
    display: inline-block;
    vertical-align: top;
    width: 100px;
    margin-left: 10px;

    &:last-child {
        margin-right: 10px;
    }

    .img {
        width: 100px;
        height: 142px;
    }

    .title {
        margin: 10px 0;
        font-size: 14px;
        text-align: center;
    }

    .rate {
        display: flex;
        justify-content: space-between;
    }
}
</style>
