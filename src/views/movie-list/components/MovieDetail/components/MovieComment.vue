<template>
    <van-tabs color="#42bd56" swipeable>
        <van-tab title="短评">
            <ul class="comment-list">
                <li class="comment-item" v-for="comment of comments" :key="comment.id">
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
                <li class="review-item" v-for="review of reviews" :key="review.id">
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
</template>

<script>
export default {
    props: {
        comments: {
            type: Array,
            default () { return [] }
        },

        reviews: {
            type: Array,
            default () { return [] }
        }
    }
}
</script>

<style lang="scss" scoped>
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
