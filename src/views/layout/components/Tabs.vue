<template>
    <div class="tabs van-hairline--top">
        <router-link tag="div" to="/douban/movie-list" class="tab-item">
            <i class="iconfont icon-fangyingji"></i>
            <!-- <div class="text">电影</div> -->
        </router-link>
        <router-link tag="div" to="/wangyi/music" class="tab-item">
            <i class="iconfont icon-erji1"></i>
            <!-- <div class="text">音乐</div> -->
        </router-link>
        <router-link tag="div" to="/douban/my-profile" class="tab-item">
            <i class="iconfont icon-wode1"></i>
            <!-- <div class="text">收藏</div> -->
        </router-link>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.tabs {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;

    &.van-hairline--top {
        &:after {
            border-color: #42bd56;
        }
    }
    .tab-item {
        display: flex;
        flex: 1;
        height: 60px;
        text-align: center;
        flex-direction: column;
        justify-content: center;
        color: $gray-deep;

        &.router-link-active {
            color: #42bd56;
        }

        .iconfont {
            font-size: 28px;
        }
    }
}
</style>
