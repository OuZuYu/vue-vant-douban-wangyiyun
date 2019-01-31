<template>
    <div class="operate-wrap">
        <div class="btns">
            <van-button class="btn" size="small" plain :type="wantSeeType" @click="setWantSee">{{ wantSeeText }}</van-button>

            <van-button class="btn" size="small" plain :type="haveSeenType" @click="setHaveSeen">{{ haveSeenText }}</van-button>
        </div>
        <div class="btns">
            <van-button class="btn" plain type="primary" size="small" @click="goToSee('wandou')">去豌豆影视看</van-button>
            <van-button class="btn" plain type="primary" size="small" @click="goToSee('haitu')">去海兔影视看</van-button>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import { checkWantSee, checkHaveSeen, setMovieObj } from '@/utils/collect';

const WANDOU_VIDEO_SEARCH_URL = 'https://www.wandouys.com/video/search/'
const HAITU_VIDEO_SEARCH_URL = 'http://www.haitum.com/search/'

export default {
    props: {
        detailData: {
            type: Object,
            default () { return {} }
        }
    },

    computed: {
        wantSeeComp: {
            get: function () {
                return this.isWantSee;
            },
            set: function (val) {

                // 设置标识，文字，按钮类型
                this.isWantSee = val;

                if (val) {
                    this.wantSeeText = '已想看';
                    this.wantSeeType = 'warning';
                } else {
                    this.wantSeeText = '想看';
                    this.wantSeeType = 'primary';
                }
            }
        },

        haveSeenComp: {
            get: function () {
                return this.isHaveSeen;
            },
            set: function (val) {

                // 设置标识，文字，按钮类型
                this.isHaveSeen = val;

                if (val) {
                    this.haveSeenText = '已看过';
                    this.haveSeenType = 'warning';
                } else {
                    this.haveSeenText = '看过';
                    this.haveSeenType = 'primary';
                }
            }
        }
    },

    data () {
        return {
            isWantSee: false,
            wantSeeText: '想看',
            wantSeeType: 'primary',
            isHaveSeen: false,
            haveSeenText: '看过',
            haveSeenType: 'primary',
        }
    },

    methods: {
        ...mapActions(['SetWantSee', 'SetHaveSeen']),

        goToSee (type) {
            let movieTitle = this.detailData.title,
                url = type === 'wandou' ? WANDOU_VIDEO_SEARCH_URL + movieTitle + '.html' : type === 'haitu' ? HAITU_VIDEO_SEARCH_URL + movieTitle : '';
            window.open(url, '_blank');
        },


        setWantSee () {
            let movieObj = setMovieObj(this.detailData); // 通过工厂函数设置对象
            this.SetWantSee(movieObj); // action
            this.wantSeeComp = !this.wantSeeComp; // 设置标识、文字、按钮类型
        },

        setHaveSeen () {
            let movieObj = setMovieObj(this.detailData); // 通过工厂函数设置对象
            this.SetHaveSeen(movieObj); // action
            this.haveSeenComp = !this.haveSeenComp; // 设置标识、文字、按钮类型
        }
    },

    watch: {

        // 监听到详情数据变化时，重新检查是否点过看过和想看。
        detailData (val) {
            // 是否已在已看或想看的localstorate中。
            this.wantSeeComp = checkWantSee(val.id);
            this.haveSeenComp = checkHaveSeen(val.id);
        }
    }
}
</script>

<style lang="scss" scoped>
.operate-wrap {
    padding: 0 $wrap-padding;
    .btns {
        display: flex;
        justify-content: space-between;
        padding: 0 $wrap-padding;

        &:last-child {
            margin-top: 10px;
        }

        .btn {
            flex: 1;

            &:first-child {
                margin-right: 10px;
            }
        }
    }
}
</style>
