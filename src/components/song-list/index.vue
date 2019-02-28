<template>
    <div class="song-list">
        <ul class="song-list-ul">
            <li class="song-list-li" v-for="(item, index) in listData" :key="item.id">
                <span class="index">{{ index + 1 }}</span>
                <div class="info">
                    <div class="song-name">{{ item.name }}</div>
                    <div class="singer"><span class="singer-item" v-for="artist in item.artists" :key="artist.id">{{ artist.name }}</span></div>
                </div>
                <div class="icon">
                    <i class="iconfont icon-bofang"></i>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        listData: {
            type: Array,
            default () { return [] }
        }
    },

    data () {
        return {

        }
    },

    methods: {

    }
}
</script>

<style lang="scss" scoped>
@import '../../scss/mixin';

$item-height: 56px;

.song-list-ul {
    .song-list-li {
        display: flex;
        height: $item-height;

        .index, .icon {
            flex: 1.2;
            text-align: center;
            line-height: $item-height;
        }

        .index {
            font-size: 16px;
            color: #999;
            font-weight: 550;
        }

        .info {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            flex: 6;
            width: 0;
            padding: 10px 0;

            .song-name {
                @include textEllipsis();
                font-size: 18px;
            }

            .singer {
                @include textEllipsis();
                color: #888;

                .singer-item {
                    margin-right: 2px;
                }
            }
        }

        .icon {
            color: #aaaaaa;

            .iconfont {
                display: inline-block;
                width: 22px;
                @include heightLineHeight(22px);
                border: 1px solid #aaa;
                border-radius: 50%;
                font-size: 10px;
            }
        }
    }
}
</style>
