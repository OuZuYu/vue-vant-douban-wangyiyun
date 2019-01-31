<template>
    <transition name="van-slide-right">
        <div v-loading="loading" class="movie-detail" v-show="visible" ref="movieDetail">
            <header class="header">
                <i class="iconfont icon-fanhui back-btn" @click="hide"></i>
                <h3 class="title"><i class="movie-icon iconfont icon-dianying"></i>电影</h3>
            </header>

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
                    <li class="cast-item" v-for="item of directorsAndActors" :key="item.id">
                        <img v-lazy="item.avatars.small" width="90" height="120">
                        <div class="name van-ellipsis">{{ item.name }}</div>
                        <div class="role">{{ item.isDirector ? '导演' : '演员' }}</div>
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

const SUMMARY_TEXT_NUM = 65

export default {
    name: 'MovieDetail',

    mixins: [ populMixin ],

    components: { operate, movieinfo, moviecomment },

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
            movieObj: null
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
$header-bg: rgba(85,85,85,.6);
$poster-bg: #555;

.movie-detail {
    z-index: 1000;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: $white;
    overflow: auto;
}

.header {
    z-index: 100;
    position: fixed;
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: $header-bg;
    color: $white;

    .back-btn {
        position: absolute;
        left: 14px;
        top: -6px;
        font-size: 20px;
        padding: 6px;
    }

    .title {
        font-size: 20px;

        .movie-icon {
            font-size: 22px;
            margin-right: 6px;
        }
    }
}

.poster-wrap {
    padding: 50px 0 20px;
    background: $poster-bg;
    text-align: center;

    .poster {
        width: 50%;
    }
}

.summary-wrap, .casts-wrap {
    margin: $wrap-padding;
    padding-top: $wrap-padding;

    .title {
        margin-bottom: 10px;
        color: $gray-deep;
    }
}

.summary-wrap {
    .content {
        font-size: 14px;
        line-height: 24px;

        .btn {
            color: $theme;
        }
    }
}

.casts-wrap {
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
