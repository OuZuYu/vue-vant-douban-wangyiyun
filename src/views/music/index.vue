<template>
    <div class="music">
        <header class="header">
            <i class="iconfont icon-caidan"></i>
            <i class="iconfont icon-sousuo"></i>
        </header>

        <div class="music-content">
            <skeleton v-if="loading"></skeleton>
            <my-tabs v-else v-model="activeTab" background="#58C976" text-color="#fff" activeColor="#e6e6e6">
                <my-tab-item name="推荐">
                    <div class="swipe-wrap">
                        <my-swipe class="swipe" height="160">
                            <my-swipe-item v-for="(item, index) in bannerData" :key="index">
                                <img width="100%" height="100%" v-lazy="item.imageUrl">
                            </my-swipe-item>
                        </my-swipe>
                    </div>

                    <section class="personalized">
                        <h3 class="title">推荐歌单</h3>

                        <ul class="personalized-list">
                            <li @click="handleListSelect(item)" class="personalized-item" v-for="item in personalizedData" :key="item.id">
                                <img v-lazy="item.picUrl" width="112" height="112">
                                <div class="item-title">{{ item.name }}</div>
                                <div class="play-count-wrap">
                                    <i class="iconfont icon-erji"></i>
                                    <span class="count"></span>{{(item.playCount/10000).toFixed(0) }}万
                                </div>
                            </li>
                        </ul>
                    </section>
                </my-tab-item>
                <my-tab-item name="排行">
                    开发中......
                </my-tab-item>
            </my-tabs>
        </div>
    </div>
</template>

<script>
import Skeleton from '@/components/wy-skeleton';
import { getRecommonData } from '@/api/wangyi';

export default {
    components: { Skeleton },

    data () {
        return {
            activeTab: '推荐',
            bannerData: [],
            personalizedData: [],
            loading: true,
            songListComp: null,
            selectedId: '',
            selectedbg: ''
        }
    },

    methods: {
        handleListSelect (item) {
            this.selectedId = item.id;
            this.selectedbg = item.picUrl;
            this.showSongList();
        },

        showSongList () {

            // 创建songlist组件api
            this.songListComp = this.songListComp || this.$createSongList({
                $props: {
                    id: 'selectedId',
                    coverBackground: 'selectedbg'
                }
            })
            this.songListComp.show()
            this.$nextTick(_ => {
                this.songListComp.init()
            })
        },

        getRecommonData () {
            this.loading = true;
            getRecommonData().then(val => {
                let bannerData = val[0];
                let personalizedData = val[1];

                if (bannerData.code === 200) {
                    this.bannerData = bannerData.banners;
                }

                if (personalizedData.code === 200) {
                    this.personalizedData = personalizedData.result;
                }
                this.loading = false;
            });
        }
    },

    mounted () {
        this.getRecommonData();
    }
}
</script>

<style lang="scss" scoped>
$header-height: 46px;

.header {
    display: flex;
    justify-content: space-between;
    height: $header-height;
    line-height: $header-height;
    background: $theme-wy;
    padding: 0 16px;

    .iconfont {
        font-size: 28px;
        color: $white;
    }
}

.music-content {
    position: fixed;
    left: 0;
    right: 0;
    top: $header-height;
    bottom: 60px;
    overflow: auto;

    .swipe-wrap {
        position: relative;
        height: 160px;
        background: $theme-wy;

        .swipe {
            position: absolute;
            bottom: -20px;
            left: 50%;
            transform: translateX(-50%);
            width: 96%;
            border-radius: 6px;
        }
    }
}

.personalized {
    margin-top: 40px;

    .title {
        color: $black-light;
        font-size: 16px;
        text-indent: 6px;
    }
}

.personalized-list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 16px;

    .personalized-item {
        position: relative;
        width: 30.666667%;
        margin: 0 0 10px 2%;

        .item-title {
            margin: 2px;
            font-size: 12px;
            line-height: 16px;
        }

        .play-count-wrap {
            position: absolute;
            right: 10px;
            top: 4px;
            color: #fff;
        }
    }
}
</style>
