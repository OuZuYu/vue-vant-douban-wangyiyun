<template>
    <ul class="list-wrap">
        <li @click="handleMovieClick(movie)" class="list-item" v-for="movie of listData" :key="movie.id">
            <img class="img" v-lazy="movie.images.small">
            <div class="title van-ellipsis">{{ movie.title }}</div>
            <div class="rate">
                <van-rate :size="10" readonly v-model="movie.rating.stars / 10" />
                <span class="text">{{ movie.rating.average }}</span>
            </div>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'VerticalList',

    props: {
        listData: {
            type: Array,
            default () {
                return [];
            }
        }
    },

    data () {
        return {

        }
    },

    methods: {
        handleMovieClick (movie) {
            this.$emit('selectMovie', movie);
        }
    }
}
</script>

<style lang="scss" scoped>
.list-wrap {
    height: 200px;
    white-space: nowrap;
    overflow-y: hidden;
    overflow-x: auto;
}

.list-item {
    display: inline-block;
    vertical-align: top;
    width: 100px;
    margin-left: 10px;

    &:first-child {
        margin-left: 0;
    }

    &:last-child {
        margin-right: 10px;
    }

    .img {
        width: 100px;
        height: 142px;
    }

    .title {
        margin: 10px 0;
        font-size: 14px;
        text-align: center;
    }

    .rate {
        display: flex;
        justify-content: space-between;

        /deep/ .van-rate__item {
            font-size: 13px !important;
        }
    }
}


</style>
