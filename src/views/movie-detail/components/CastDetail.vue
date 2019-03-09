<template>
    <transition name="van-slide-right">
        <div class="cast-detail" v-show="visible" ref="castDetail">
            <topheader @back="hide" class="header">
                <i class="cast-icon iconfont icon-dianyingzhiye-yingrenbang"></i>影人
            </topheader>

            <div class="detail-content">
                <h2 class="name">{{ castData.name }} - {{ castData.name_en }}</h2>

                <div class="info-wrap">
                    <ul class="info">
                        <li class="item van-ellipsis">性别：{{ castData.gender || '暂无信息' }}</li>
                        <li class="item van-ellipsis">星座：{{ castData.constellation || '暂无信息' }}</li>
                        <li class="item van-ellipsis">出生日期：{{ castData.birthday || '暂无信息' }}</li>
                        <li class="item van-ellipsis">出生地：{{ castData.born_place || '暂无信息' }}</li>
                        <li class="item van-ellipsis">更多中文名：<span v-for="name of castData.aka" :key="name" class="name-item">{{ name }}</span></li>
                    </ul>

                    <div class="avatar">
                        <img class="img" v-lazy="castData.avatars && castData.avatars.small" alt="头像">
                    </div>
                </div>

                <div class="operate-wrap">
                    <van-button class="search-btn" type="primary" size="small" @click="goToSearch">搜索</van-button>
                </div>

                <div class="cast-intro">
                    <h3 class="title">影人介绍</h3>
                    <p class="intro">
                        {{ summary }}
                        <span class="btn" @click="isSummaryExpand = true" v-show="!isSummaryExpand">(展开)</span>
                    </p>
                </div>

                <div class="works-wrap">
                    <h3 class="title">代表作品</h3>
                    <horizontallist @selectMovie="handleMovieSelect" class="work-list" :list-data="works"></horizontallist>
                </div>
            </div>

            <my-loading size="medium" color="black" top="42" v-model="loading"></my-loading>
        </div>
    </transition>
</template>

<script>
import populMixin from '@/mixins/popup';
import topheader from '@/components/header';
import { getCastDetail } from '@/api/douban';
import horizontallist from '@/components/horizontal-list';
import showMovieDetailMixin from '@/mixins/showMovieDetail';

const SUMMARY_TEXT_NUM = 65

export default {
    name: 'CastDetail',

    props: {
        cast: {
            type: Object,
            default () { return {} }
        }
    },

    components: {
        topheader,
        horizontallist
    },

    mixins: [ populMixin, showMovieDetailMixin ],

    computed: {
        works () {
            return this.castData.works && this.castData.works.map(val => val.subject);
        },

        summary () {
            let summary = this.castData.summary;
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
            loading: false,
            castData: {},
            isSummaryExpand: false
        }
    },

    methods: {
        goToSearch () {
            this.$router.push({
                path: '/douban/search',
                query: {
                    keyword: this.castData.name
                }
            });
        },

        getCastDetail () {
            this.loading = true;
            return getCastDetail(this.cast.id).then(res => {
                this.castData = res;
                this.loading = false;
            });
        },

        init () {
            this.getCastDetail().then(_ => {
                this.isSummaryExpand = this.castData.summary.length < SUMMARY_TEXT_NUM; // 初始化剧情简介是否显示展开按钮
            });
        }
    },

    beforeCreate() {

        // 组件之间的循环引用，需要这样注册组件。
        this.$options.components.moviedetail = () => import('../index.vue');
    }
}
</script>

<style lang="scss" scoped>
@import '../../../scss/mixin';

.cast-icon {
    font-size: 22px;
}

.cast-detail {
    @include fixedLayout;
    z-index: 2000;
}

.detail-content {
    padding: $wrap-padding;
    margin-top: 38px;
    color: #333;

    .name {
        font-size: 20px;
    }

    .info-wrap {
        display: flex;

        .info {
            flex: 1;
            width: 0;
            margin-top: 24px;

            .item {
                font-size: 14px;
                margin-bottom: 10px;

                .name-item {
                    margin-right: 4px;
                }
            }
        }

        .avatar {
            flex: 0 0 100px;
            .img {
                width: 100%;
            }
        }
    }

    .operate-wrap{
        margin-top: 20px;

        .search-btn {
            width: 100px;
        }
    }

    .cast-intro, .works-wrap {
        margin-top: 20px;
        font-size: 16px;

        .title {
            color: $gray-deep;
        }

    }

    .cast-intro {
        .intro {
            margin-top: 10px;
            line-height: 22px;

            .btn {
                color: $theme;
            }
        }
    }

    .works-wrap {
        .work-list {
            margin-top: 10px;
        }
    }
}
</style>
