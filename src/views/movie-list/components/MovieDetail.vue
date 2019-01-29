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

            <div class="info-wrap">
                <section class="intro">
                    <h3 class="title">{{ detailData.title }}</h3>
                    <div class="intro-item">
                        {{ detailData.year }}
                        <span v-for="(item, idx) of detailData.genres" :key="item">
                            {{ item }} <template v-if="idx !== detailData.genres.length - 1">/</template>
                        </span>
                    </div>
                    <div class="intro-item">原名: {{ detailData.original_title }}</div>
                    <div class="intro-item">上映时间: {{ pubdate }}</div>
                    <div class="intro-item">片长: {{ detailData.durations && detailData.durations[0] }}</div>
                </section>

                <section class="rate">
                    <h3 class="title">豆瓣评分</h3>
                    <div class="score">{{ detailData.rating && detailData.rating.average }}</div>
                    <van-rate :size="10" readonly v-model="detailData.rating && detailData.rating.stars / 10" />
                    <div class="collect">{{ detailData.collect_count }}人</div>
                </section>
            </div>

            <div class="operate-wrap">
                <van-button class="want-see" size="small" plain :type="isWantSee ? 'warning' : 'primary'" @click="setWantSee">{{ isWantSee ? '已想看' : '想看' }}</van-button>

                <van-button class="have-seen" size="small" plain :type="isHaveSeen ? 'warning' : 'primary'" @click="setHaveSeen">{{ isHaveSeen ? '已看过' : '看过' }}</van-button>
            </div>

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

            <van-tabs color="#42bd56" swipeable>
                <van-tab title="短评">
                    <ul class="comment-list">
                        <li class="comment-item" v-for="comment of detailData.popular_comments" :key="comment.id">
                            <img class="avatar" width="36" height="36" v-lazy="comment.author.avatar"></img>
                            <div class="content">
                                <div class="user-info">
                                    <div class="user-name">{{ comment.author.name }}</div>
                                    <van-rate :size="5" readonly v-model="comment.rating.value" />
                                </div>
                                <div class="comment">{{ comment.content }}</div>
                                <div class="date">{{ comment.created_at }}</div>
                            </div>
                        </li>
                    </ul>
                </van-tab>
                <van-tab title="影评">
                    <ul class="reviews-list">
                        <li class="review-item" v-for="review of detailData.popular_reviews" :key="review.id">
                            <div class="user-info">
                                <img class="avatar" width="36" height="36" v-lazy="review.author.avatar">
                                <div class="name">{{ review.author.name }}</div>
                                <van-rate :size="5" readonly v-model="review.rating.value" />
                            </div>
                            <h3 class="title">{{ review.title }}</h3>
                            <p class="content">{{ review.summary }}</p>
                        </li>
                    </ul>
                </van-tab>
            </van-tabs>
        </div>
    </transition>
</template>

<script>
import { getMovieDetail } from '@/api/douban';
import populMixin from '@/mixins/popup';
import { checkWantSee, checkHaveSeen, setMovieObj } from '@/utils/collect';
import { mapActions } from 'vuex'

const SUMMARY_TEXT_NUM = 65

export default {
    name: 'MovieDetail',

    mixins: [ populMixin ],

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
        },

        pubdate() {
            let pubdate = '暂无信息';
            let dates = this.detailData.pubdates || [];
            for (let date of dates) {
                if (date.indexOf('电影节') === -1) {
                    pubdate = date;
                }
                if (date.indexOf('中国大陆') > -1) {
                    pubdate = date;
                    break;
                }
            }

            return pubdate;
        },
    },

    data () {
        return {
            wantSee: false,
            hasSee: false,
            detailData: {},
            loading: false,
            directorsAndActors: [],
            isSummaryExpand: false,
            isWantSee: false,
            isHaveSeen: false,
            movieObj: null
        }
    },

    methods: {
        ...mapActions(['SetWantSee', 'SetHaveSeen']),

        async init () {
            this.$refs.movieDetail.scrollTop = 0; // 初始化滚动条
            await this.getDetail();
            this.setDirectorsAndActors();
            this.isSummaryExpand = this.detailData.summary.length < SUMMARY_TEXT_NUM; // 初始化剧情简介是否显示展开按钮

            // 初始化是否已看和想看
            let id = this.detailData.id;
            this.isWantSee = checkWantSee(id);
            this.isHaveSeen = checkHaveSeen(id);
        },

        setWantSee () {
            let movieObj = setMovieObj(this.detailData);
            this.SetWantSee(movieObj);
            this.isWantSee = !this.isWantSee;
        },

        setHaveSeen () {
            let movieObj = setMovieObj(this.detailData);
            this.SetHaveSeen(movieObj);
            this.isHaveSeen = !this.isHaveSeen;
        },

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
        }
    }
}
</script>

<style lang="scss" scoped>
$header-bg: rgba(85,85,85,.6);
$poster-bg: #555;
$wrap-padding: 16px;

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

.info-wrap {
    display: flex;
    padding: $wrap-padding;

    .intro {
        flex: 0 0 70%;

        .title {
            font-size: 16px;
            margin-bottom: 14px;
        }

        .intro-item {
            margin-bottom: 10px;
            color: $gray-deep;
        }
    }

    .rate {
        flex: 1;
        text-align: center;
        box-shadow: 0 0 10px 2px #ccc;

        .title {
            margin-top: 10px;
            color: $gray-deep;
        }

        .score {
            font-size: 16px;
            margin: 12px 0;
        }

        .collect {
            margin-top: 10px;
        }
    }
}

.operate-wrap {
    display: flex;
    justify-content: space-between;
    padding: 0 $wrap-padding;

    .want-see {
        flex: 1;
        margin-right: 10px;
    }

    .have-seen {
        flex: 1;
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

.comment-list, .reviews-list {
    padding: $wrap-padding;
}

.comment-item {
    display: flex;
    margin-bottom: 20px;

    .avatar {
        flex: 0 0 40px;
        border-radius: 50%;
    }
    .content {
        flex: 1;
        margin-left: 10px;
        color: #333;

        .user-info {
            display: flex;
            margin-top: 6px;

            .user-name {
                margin-right: 6px;
            }
        }
        .comment {
            font-size: 14px;
            line-height: 18px;
            margin: 8px 0;
        }
        .date {
            color: $gray-deep;
        }
    }
}

.review-item {
    margin-bottom: 20px;
    font-size: 14px;
    color: $gray-deep;

    .user-info {
        display: flex;
        line-height: 36px;

        .avatar {
            border-radius: 50%;
        }

        .name {
            margin: 0 10px;
        }
    }

    .title {
        font-size: 16px;
        color: #333;
        margin: 12px 0 10px;
    }

    .content {
        line-height: 20px;
    }

}
</style>
