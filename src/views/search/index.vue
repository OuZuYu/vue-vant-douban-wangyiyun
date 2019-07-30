<template>
    <div>
        <div class="input-wrap">
            <van-field left-icon="search" v-model="keyword" clearable border placeholder="电影 / 影人" class="input" @keyup.enter="searchKeyword" />

            <van-button @click="back">取消</van-button>
        </div>

        <div class="tag-wrap">
            <div class="tag-item van-hairline--bottom">
                <van-tag @click.native="searchTag(tag)" class="tag" size="large" type="success" v-for="tag in doubanTag" :key="tag">{{ tag }}</van-tag>
            </div>
            <div class="tag-item van-hairline--bottom">
                <van-tag @click.native="searchTag(tag)" class="tag" size="large" type="success" v-for="tag in typeTag" :key="tag">{{ tag }}</van-tag>
            </div>
            <div class="tag-item van-hairline--bottom">
                <van-tag @click.native="searchTag(tag)" class="tag" size="large" type="success" v-for="tag in countryTag" :key="tag">{{ tag }}</van-tag>
            </div>
        </div>

        <div class="history-wrap">
            <header class="header">
                <h3 class="title">搜索历史</h3>
                <van-icon class="icon" name="delete" @click="clearHistory" />
            </header>

            <div class="content" v-if="searchHistory.length">
                <div class="history-item" v-for="item of searchHistory" :key="item">
                    <span class="text van-ellipsis">{{ item }}</span>
                    <span class="del" @click="delHistoryItem(item)">×</span>
                </div>
            </div>

            <div v-else class="tip">--- 暂无记录 ---</div>
        </div>

        <transition name="van-fade">
            <div class="result-list" v-show="keyword || tag">
                <van-list
                    :offset="0"
                    v-model="searchLoading"
                    :finished="isSearchLoaded"
                    finished-text="没有更多了"
                    @load="getSearchResult">
                    <vertical-list :list-data="searchResultData" @selectMovie="handleMovieSelect"></vertical-list>
                </van-list>
                <my-loading size="medium" v-model="searchLoading"></my-loading>
            </div>
        </transition>
    </div>
</template>

<script>
import { searchMovie } from '@/api/douban';
import showMovieDetailMixin from '@/mixins/showMovieDetail';
import VerticalList from '@/components/vertical-list';
import { mapActions } from 'vuex'

const GET_COUNT = 10;

export default {
    mixins: [ showMovieDetailMixin ],

    components: { VerticalList },

    computed: {
        searchHistory () {
            return this.$store.state.searchHistory.history;
        }
    },

    data () {
        return {
            searchResultData: [],
            doubanTag: ['经典', '豆瓣高分', '冷门佳片'],
            typeTag: ['剧情', '爱情', '喜剧', '科幻', '动作', '悬疑', '治愈', '青春', '文艺', '成长', '动画 ', '华语'],
            countryTag: ['欧美', '日本', '韩国'],
            keyword: '',
            tag: '',
            searching: false,
            searchLoading: false,
            isSearchLoaded: false,
            searchIndex: 0
        }
    },

    methods: {
        ...mapActions([
            'SetSearchHistory',
            'DelSearchHistory',
            'ClearSearchHistory'
        ]),

        clearHistory () {
            this.ClearSearchHistory();
        },

        delHistoryItem (keyword) {
            this.DelSearchHistory(keyword);
        },

        back () {
            this.$router.back();
        },

        clearSearchResult () {
            this.searchIndex = 0;
            this.searchResultData = [];
        },

        searchTag (tag) {
            this.clearSearchResult();
            this.tag = tag;
            this.keyword = '';
            this.getSearchResult();
        },

        searchKeyword () {

            // 每一次搜索初始化一下，不在原始数组上叠加。
            this.clearSearchResult();
            this.tag = '';
            this.getSearchResult();
            this.SetSearchHistory(this.keyword); // 搜索历史记录
        },

        getSearchResult () {
            this.searchLoading = true;
            searchMovie(this.keyword, this.tag, this.searchIndex, GET_COUNT).then(res => {
                this.searchResultData = [...this.searchResultData, ...res.subjects];
                this.searchIndex += GET_COUNT;
                this.searchLoading = false;
                this.isSearchLoaded = this.checkMore(res);
            })
        },

        checkMore (res) {
            return (!res.subjects.length || res.start + res.count > res.total);
        }
    },

    created () {
        this.keyword = this.$route.query.keyword || '';
    }
}
</script>

<style lang="scss" scoped>
@import '../../scss/mixin';

.input-wrap {
    display: flex;
    justify-content: space-between;
    background: $theme;
    padding: 12px;

    .input {
        width: 80%;
    }
}

.tag-wrap {
    padding: $wrap-padding $wrap-padding 0;

    .tag-item {
        margin-bottom: 20px;

        .tag {
            margin: 0 10px 20px 0;
            padding: 10px 20px;
            background: $theme !important;
        }
    }
}

.history-wrap {
    padding: 0 $wrap-padding;

    .header {
        font-size: 20px;
        display: flex;
        justify-content: space-between;

        .title {
            color: #2ba03e;
        }

        .icon {
            color: $red;
        }
    }

    .content {
        font-size: 18px;
        margin-top: 14px;
        height: 180px;
        overflow: auto;

        .history-item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            height: 20px;
            line-height: 20px;

            .text {
                flex: 0 0 88%;
            }

            .del {
                flex: 1;
                font-size: 28px;
                text-align: right;
            }
        }
    }

    .tip {
        margin-top: 16px;
        color: $gray-deep;
        text-align: center;
    }
}

.result-list {
    z-index: 10;
    @include fixedLayout(68px, 0, 0, 0);
    padding-top: 10px;
}
</style>
