<template>
    <transition name="van-slide-right">
        <div v-loading="loading" class="movie-detail" v-show="visible" ref="movieDetail">
            <topheader @back="hide">
                <i class="movie-icon iconfont icon-dianying"></i>电影
            </topheader>

            <div class="poster-wrap">
                <img class="poster" v-lazy="detailData.images && detailData.images.medium">
            </div>

            <movieinfo :detail-data="detailData"></movieinfo>

            <operate :detail-data="detailData"></operate>

            <section class="summary-wrap van-hairline--top">
                <h3 class="title">剧情简介</h3>
                <div class="content">
                    &nbsp;&nbsp;&nbsp;&nbsp;{{ summary }}
                    <span class="btn" @click="isSummaryExpand = true" v-show="!isSummaryExpand">(展开)</span>
                </div>
            </section>

            <section class="casts-wrap van-hairline--top">
                <h3 class="title">影人</h3>
                <ul class="casts-list">
                    <li class="cast-item" v-for="cast of directorsAndActors" :key="cast.id" @click="handleCastSelect(cast)">
                        <img v-lazy="cast.avatars && cast.avatars.small" width="90" height="120">
                        <div class="name van-ellipsis">{{ cast.name }}</div>
                        <div class="role">{{ cast.isDirector ? '导演' : '演员' }}</div>
                    </li>
                </ul>
            </section>

            <moviecomment :comments="detailData.popular_comments" :reviews="detailData.popular_reviews"></moviecomment>
        </div>
    </transition>
</template>

<script>
import { getMovieDetail } from '@/api/douban';
import populMixin from '@/mixins/popup';
import operate from './components/Operate';
import movieinfo from './components/MovieInfo';
import moviecomment from './components/MovieComment';
import topheader from '@/components/header';

const SUMMARY_TEXT_NUM = 65

export default {
    name: 'MovieDetail',

    mixins: [ populMixin ],

    components: { operate, movieinfo, moviecomment, topheader },

    props: {
        movie: Object
    },

    computed: {
        summary () {
            let summary = this.detailData.summary;
            if (!summary) return;
            if (!this.isSummaryExpand) {
                return summary.slice(0, SUMMARY_TEXT_NUM) + '...';
            } else {
                return summary;
            }
        }
    },

    data () {
        return {
            wantSee: false,
            hasSee: false,
            detailData: {},
            loading: false,
            directorsAndActors: [],
            isSummaryExpand: false,
            movieObj: null,
            castDetailComp: null,
            selectedCast: {}
        }
    },

    methods: {
        getDetail () {
            this.loading = true;
            return getMovieDetail(this.movie.id).then(res => {
                this.detailData = res;
                this.loading = false;
            })
        },

        // 合并导演和演员
        setDirectorsAndActors () {
            let detailData = this.detailData;
            let directorsWithMark = detailData.directors.map(item => {
                item.isDirector = true;
                return item;
            })
            this.directorsAndActors = [...directorsWithMark, ...detailData.casts];
        },

        handleCastSelect(cast) {
            this.selectedCast = cast;
            this.showCastDetail();
        },

        showCastDetail () {

            // 调用castDetail组件api
            this.castDetailComp = this.castDetailComp || this.$createCastDetail({
                $props: {
                    cast: 'selectedCast'
                }
            })
            this.castDetailComp.show()
            this.$nextTick(_ => {
                this.castDetailComp.init()
            })
        },

        async init () {
            this.$refs.movieDetail.scrollTop = 0; // 初始化滚动条
            await this.getDetail();
            this.setDirectorsAndActors();
            this.isSummaryExpand = this.detailData.summary.length < SUMMARY_TEXT_NUM; // 初始化剧情简介是否显示展开按钮
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../scss/mixin';
$poster-bg: #555;

.movie-detail {
    @include fixedLayout;
    z-index: 1000;
}

.poster-wrap {
    padding: 50px 0 20px;
    background: $poster-bg;
    text-align: center;

    .poster {
        width: 50%;
    }
}

.summary-wrap {
    margin: $wrap-padding;
    padding-top: $wrap-padding;

    .title {
        margin-bottom: 10px;
        color: $gray-deep;
    }
    .content {
        font-size: 14px;
        line-height: 24px;

        .btn {
            color: $theme;
        }
    }
}

.casts-wrap {
    margin: $wrap-padding;
    padding-top: $wrap-padding;

    .title {
        margin-bottom: 10px;
        color: $gray-deep;
    }

    .casts-list {
        display: flex;
        padding-bottom: 12px;
        overflow-x: auto;
        overflow-y: hidden;

        .cast-item {
            margin-right: 10px;
            text-align: center;

            .name {
                width: 90px;
                padding: 8px 0 4px;
            }

            .role {
                color: $gray-deep;
            }
        }
    }
}
</style>
