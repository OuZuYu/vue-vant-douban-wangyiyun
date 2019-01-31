<template>
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
</template>

<script>
export default {
    props: {
        detailData: {
            type: Object,
            default () { return {} }
        }
    },

    computed: {
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
        }
    }
}
</script>

<style lang="scss" scoped>
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
</style>
