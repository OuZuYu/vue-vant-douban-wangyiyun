<template>
    <div class="skeleton">
        <ul class="tabs">
            <li class="tab" v-for="i in 2"></li>
        </ul>
        <div class="swipe"></div>
        <ul class="list">
            <li class="list-item" v-for="i in 9" :key="i"></li>
        </ul>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
$skeleton-bg: linear-gradient(to left, #ececec, #f3f3f3);

.skeleton {
    z-index: 100;
    padding: 10px 0;
}

.tabs {
    display: flex;
    padding: 0 4px;

    .tab {
        flex: 1;
        height: 44px;
        background: $skeleton-bg;

        &:last-child {
            margin-left: 8px;
        }
    }
}

.swipe {
    background: $skeleton-bg;
    width: 330px;
    height: 160px;
    margin: 20px auto 0;
}

.list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;

    .list-item {
        background: $skeleton-bg;
        width: 30.666667%;
        height: 150px;
        margin: 0 0 10px 2%;
    }
}
</style>
