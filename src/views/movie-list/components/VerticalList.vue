<template>
    <ul>
        <li @click="handleMovieClick(movie)" class="movie-item" v-for="movie of listData" :key="movie.id">
            <img class="img" v-lazy="movie.images.small" height="120" width="80">

            <div class="movie-info">
                <h3 class="title">{{ movie.title }}</h3>
                <div class="rate">
                    <van-rate :size="10" readonly v-model="movie.rating.stars / 10" />
                    <span class="text">{{ movie.rating.average }}</span>
                </div>
                <div class="info van-ellipsis">
                    导演: <span v-for="director of movie.directors">{{ director.name }}</span>
                </div>
                <div class="info van-ellipsis">
                    主演: <span v-for="cast of movie.casts">{{ cast.name }}</span>
                </div>
                <div class="has-watched">{{ movie.collect_count }}人看过</div>
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
.movie-item {
    display: flex;
    margin-bottom: 30px;
    padding: 0 10px;

    .img {
        flex: 0 0 80px;
    }

    .movie-info {
        flex: 1;
        margin-left: 10px;

        .title {
            font-size: 16px;
            color: #333;
            margin: 10px 0;
        }

        .rate {
            display: flex;
            margin-bottom: 10px;
            .text {
                margin-left: 4px;
            }
        }

        .info {
            width: 90%;
            color: $gray-deep;
            margin-bottom: 10px;
        }

        .has-watched {
            margin-top: 6px;
        }
    }
}
</style>
