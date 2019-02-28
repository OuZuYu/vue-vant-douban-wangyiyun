<template>
    <div
        class="my-tab-item"
        v-show="this.$parent.curName === this.name">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'MyTabItem',

    props: {
        name: {
            required: true,
            type: String
        }
    },

    // 把this存到父组件，父组件tab导航按钮需要。
    beforeCreate() {
        this.$parent.tabItems.push(this);
    },

    destroyed() {
        this.$parent.tabItems.splice(this.$parent.tabItems.indexOf(this), 1);
    }
}
</script>

<style lang="scss" scoped>

</style>
