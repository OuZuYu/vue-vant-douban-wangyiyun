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
                    <i @click="reposition" class="iconfont icon-refresh-1-copy"></i>
                    <i @click="editCity" class="iconfont icon-edit"></i>
                </template>
            </van-cell>
            <horizontallist class="movie-list" :listData="movieData.subjects" @selectMovie="handleMovieSelect"></horizontallist>
            <my-loading v-model="cityMovieLoading"></my-loading>
        </div>

        <van-tabs swipeable color="#42bd56" class="movie-tabs">
            <van-tab title="即将上映">
                <div class="list-wrap">
                    <van-list
                        :offset="0"
                        v-model="comingSoonLoading"
                        :finished="isComingSoonLoaded"
                        finished-text="没有更多了"
                        @load="getComingSoonMovie">
                            <verticallist :list-data="comingSoonData" @selectMovie="handleMovieSelect"></verticallist>
                    </van-list>
                    <my-loading v-model="comingSoonLoading"></my-loading>
                </div>
            </van-tab>
            <van-tab title="Top250">
                <div class="list-wrap">
                    <van-list
                        :offset="0"
                        v-model="top250Loading"
                        :finished="isTop250Loaded"
                        finished-text="没有更多了"
                        @load="getTop250Movie">
                        <verticallist :list-data="top250Data" @selectMovie="handleMovieSelect"></verticallist>
                    </van-list>
                    <my-loading v-model="top250Loading"></my-loading>
                </div>
            </van-tab>
        </van-tabs>

        <van-dialog show-cancel-button v-model="cityPopup" @confirm="onConfirm">
            <van-field label="城市名" v-model="city" class="city-field" placeholder="例:广州或广州市"/>
        </van-dialog>
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
            comingSoonIndex: 0,
            cityPopup: false,
            city: ''
        }
    },

    methods: {
        reposition () {
            this.locateAndGetMovie().then(_ => {
                this.$toast('已重新定位');
            });
        },

        editCity () {
            this.city = '';
            this.cityPopup = true;
        },

        onConfirm () {
            if (!this.city) {
                this.locateAndGetMovie();
                return;
            }

            if (/^.+市$/.test(this.city)) { // 切掉"市"
                this.city = this.city.slice(0, -1);
            }

            this.setCity(this.city);
            this.getCityMovie(this.myCity);
        },

        locateAndGetMovie () {
            return this.GetCity().then(_ => { // 定位
                this.getCityMovie(this.myCity);
            });
        },

        search () {
            this.$router.push('/douban/search');
        },

        getCityMovie (city) {
            this.cityMovieLoading = true;
            let params = {
                start: 0,
                count: 1000, // 间接获取全部电影
                city: city
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
            if (this.myCity !== '定位中...') { // 已定位
                this.getCityMovie(this.myCity);
            } else { // 未定位的话定位再获取某城市电影
                this.locateAndGetMovie();
            }
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

    .iconfont {
        margin-left: 14px;
        color: #4a82ff;
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

.city-field {
    margin: 10px 0;
}
</style>
