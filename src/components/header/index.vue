<template>
    <header class="header">
        <i class="iconfont icon-fanhui back-btn" @click="back"></i>
        <h3 class="title"><slot></slot></h3>
    </header>
</template>

<script>
export default {
    methods: {
        back () {
            this.$emit('back');
        }
    }
}
</script>

<style lang="scss" scoped>
$header-bg: rgba(85,85,85,.6);

.header {
    z-index: 100;
    position: fixed;
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: $header-bg;
    color: $white;

    .back-btn {
        position: absolute;
        left: 14px;
        top: -6px;
        font-size: 20px;
        padding: 6px;
    }

    .title {
        font-size: 20px;

        .movie-icon {
            font-size: 22px;
            margin-right: 6px;
        }
    }
}
</style>
