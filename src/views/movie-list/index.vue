<template>
    <div>
        <van-row class="list-header">
            <van-col span="4" class="logo-wrap">
                <img width="38" height="38" src="../../assets/douban-logo.png" alt="logo">
            </van-col>
            <van-col span="20" class="search-wrap">
                <div class="search">电影 / 艺人</div>
            </van-col>
        </van-row>

        <div class="city-movie-wrap">
            <van-cell :title="movieData.title" icon="location-o" />
            <ul class="movie-wrap" v-loading="cityMovieLoading">
                <li class="city-movie-item" v-for="movie of movieData.subjects" :key="movie.id">
                    <img class="img" v-lazy="movie.images.small">
                    <div class="title van-ellipsis">{{ movie.title }}</div>
                    <div class="rate">
                        <van-rate :size="10" readonly v-model="movie.rating.stars / 10" />
                        <span class="text">{{ movie.rating.average }}</span>
                    </div>
                </li>
            </ul>
        </div>

        <van-tabs color="#42bd56" class="movie-tabs">
            <van-tab title="Top250">
                <div class="list-wrap" v-loading="top250Loading">
                    <van-list
                        :offset="5"
                        v-model="top250Loading"
                        :finished="isTop250Loaded"
                        finished-text="没有更多了"
                        @load="getTop250Movie">
                        <list :list-data="top250Data"></list>
                    </van-list>
                </div>
            </van-tab>
            <van-tab title="即将上映">
                <div class="list-wrap" v-loading="comingSoonLoading">
                    <van-list
                        :offset="5"
                        v-model="comingSoonLoading"
                        :finished="isComingSoonLoaded"
                        finished-text="没有更多了"
                        @load="getComingSoonMovie">
                            <list :list-data="comingSoonData"></list>
                    </van-list>
                </div>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import {
    getMovie,
    getTop250Movie,
    getComingSoonMovie
} from '@/api/douban';
import { mapState } from 'vuex'
import location from '@/mixins/location.js';
import list from './components/List';

const GET_COUNT = 10;

export default {
    components: { list },

    mixins: [ location ],

    computed: {
        ...mapState({
            myCity: state => state.location.myCity,
            requestLoading: state => state.common.requestLoading
        })
    },

    data () {
        return {
            movieData: {},
            top250Data: [],
            comingSoonData: [],
            top250Loading: false,
            comingSoonLoading: false,
            cityMovieLoading: false,
            isTop250Loaded: false,
            isComingSoonLoaded: false,
            top250Index: 0,
            comingSoonIndex: 0
        }
    },

    methods: {
        getCityMovie () {
            this.cityMovieLoading = true;
            let params = {
                start: 0,
                count: 1000,
                city: this.myCity.slice(0, -1)
            }
            getMovie(params).then(res => {
                this.movieData = res;
                this.cityMovieLoading = false;
            })
        },

        checkMore (res) {
            return (!res.subjects.length || res.start + res.count > res.total);
        },

        getTop250Movie () {
            getTop250Movie(this.top250Index, GET_COUNT).then(res => {
                this.top250Data = [...this.top250Data, ...res.subjects];
                this.top250Index += GET_COUNT;
                this.top250Loading = false;
                this.isTop250Loaded = this.checkMore(res);
            })
        },

        getComingSoonMovie () {
            getComingSoonMovie(this.comingSoonIndex, GET_COUNT).then(res => {
                this.comingSoonData = [...this.comingSoonData, ...res.subjects];
                this.comingSoonIndex += GET_COUNT;
                this.comingSoonLoading = false;
                this.isComingSoonLoaded = this.checkMore(res);
            })
        },

        init () {
            this.getCity().then(_ => {
                this.getCityMovie();
            });
        },
    },

    created () {
        this.init();
    }
}
</script>

<style lang="scss" scoped>
$header-height: 60px;
$city-movie-height: 234px;

.list-header {
    height: $header-height;

    %flex-wrap {
        height: 100%;
        display: flex;
        align-items: center;
    }

    .logo-wrap {
        @extend %flex-wrap;
        justify-content: center;
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

.city-movie-wrap {
    height: $city-movie-height;
    margin-bottom: 10px;
    .movie-wrap {
        height: 200px;
        white-space: nowrap;
        overflow-y: hidden;
        overflow-x: auto;
    }
}


.city-movie-item {
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

.movie-tabs {
    .list-wrap {
        position: fixed;
        top: $city-movie-height + $header-height + 70px;
        bottom: 60px;
        left: 0;
        right: 0;
        overflow-x: hidden;
        overflow-y: auto;
    }
}
</style>
