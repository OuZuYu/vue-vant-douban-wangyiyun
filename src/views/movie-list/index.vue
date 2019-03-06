<template>
    <div>
        <van-row class="list-header">
            <van-col span="4" class="logo-wrap">
                <img width="38" height="38" src="../../assets/douban-logo.png" alt="logo">
            </van-col>
            <van-col span="20" class="search-wrap">
                <div class="search" @click="search">电影 / 艺人</div>
            </van-col>
        </van-row>

        <div class="city-movie-wrap">
            <van-cell icon="location-o">
                <template slot="title">
                    <span>{{ movieData.title }}</span>
                    <span @click="reposition" class="reposition">重新定位</span>
                </template>
            </van-cell>
            <horizontallist class="movie-list" v-loading="cityMovieLoading" :listData="movieData.subjects" @selectMovie="handleMovieSelect"></horizontallist>
        </div>

        <van-tabs swipeable color="#42bd56" class="movie-tabs">
            <van-tab title="即将上映">
                <div class="list-wrap" v-loading="comingSoonLoading">
                    <van-list
                        :offset="0"
                        v-model="comingSoonLoading"
                        :finished="isComingSoonLoaded"
                        finished-text="没有更多了"
                        @load="getComingSoonMovie">
                            <verticallist :list-data="comingSoonData" @selectMovie="handleMovieSelect"></verticallist>
                    </van-list>
                </div>
            </van-tab>
            <van-tab title="Top250">
                <div class="list-wrap" v-loading="top250Loading">
                    <van-list
                        :offset="0"
                        v-model="top250Loading"
                        :finished="isTop250Loaded"
                        finished-text="没有更多了"
                        @load="getTop250Movie">
                        <verticallist :list-data="top250Data" @selectMovie="handleMovieSelect"></verticallist>
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
import locationMixin from '@/mixins/location';
import showMovieDetailMixin from '@/mixins/showMovieDetail'; // 显示电影详情相关代码
import verticallist from '@/components/vertical-list';
import horizontallist from '@/components/horizontal-list';

const GET_COUNT = 10;

export default {
    components: { verticallist, horizontallist },

    mixins: [ locationMixin,  showMovieDetailMixin ],

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
        reposition () {
            this.getMovie().then(_ => {
                this.$toast.success('已重新定位');
            });
        },

        getMovie () {
            return this.GetCity().then(_ => { // 定位
                this.getCityMovie();
            });
        },

        search () {
            this.$router.push('/douban/search');
        },

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
            this.getMovie();
        }
    },

    mounted () {
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

    .movie-list {
        padding-left: 10px;
    }

    .reposition {
        margin-left: 10px;
        color: #3977ff;
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
